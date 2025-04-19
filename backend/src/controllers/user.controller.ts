import { NextFunction, Request, Response } from "express";
import {
  AddAdditionalInterface,
  ChangeEmailInterface,
  ChangePasswordInterface,
  ChangeProfilePictureInterface,
  ChangeUserInterface,
  CheckOtpInterface,
  CheckTokenExistanceInterface,
  CreateUserInterface,
  ResetPasswordInterface,
  ResetPasswordNewInterface,
  SendEmailVerificationInterface,
} from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import {
  createUser,
  findUser,
  getAllUsers,
  updateUser,
  validatePassword,
} from "../services/user.service";
import { findCode, updateCode } from "../services/code.service";

import mongoose from "mongoose";
import {
  generateOtp,
  generateRandomToken,
  hashPassword,
  sendEmail,
  systemNotifications,
} from "../utils/backevents";
import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  format,
  formatDate,
  getDate,
} from "date-fns";
import { addToHash, checkHash, createHash, DelHash } from "../utils/redis";
import { signJwt, verifyJwt } from "../utils/jwt.sign";
import { UserDocument } from "../models/user.model";
import { get } from "lodash";
import { reIssueAccessToken } from "../services/session.service";
import { initiator } from "../server";
import { createNotification } from "../services/notifications.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const code = req.body.code;

    // Check if the user already exists
    const existingUser = await findUser({ email });

    if (existingUser) {
      res.status(403).json({ message: "User already exists" });
      return;
    }

    // Check if the code has already been used
    const ExistingUserWithusedCode = await findUser({ code });

    if (ExistingUserWithusedCode) {
      res.status(409).json({ message: "This Code is Used" });
      return;
    }

    // Check if the code exists
    const preCode = await findCode({ code });

    if (!preCode) {
      res.status(404).json({ message: "Invalid Code Provided" });
      return;
    }

    const Postcode = await updateCode(
      { _id: preCode._id },
      { used: true },
      { new: true, runValidators: true }
    );

    if (!Postcode) {
      res.status(404).json({ message: "Invalid Code Supported" });
      return;
    }
    // Create the user
    const user = await createUser({ ...req.body, role: Postcode.role });

    const SupportedInfo = {
      profileState: user.profileState,
    };
    res.status(201).json({
      message: "User registered successfully",
      SupportedInfo,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const AddAdditionlHandler = async (
  req: Request<
    AddAdditionalInterface["params"],
    {},
    AddAdditionalInterface["body"]
  >,
  res: Response
) => {
  try {
    const id = req.params.id;

    const existingUser = await findUser({ _id: id });

    if (!existingUser) {
      res.status(404).json({ message: "user doesn't exist" });
      return;
    }
    const image = req.file as Express.Multer.File;

    const profileImg = await uploadImageToFirebase({
      image,
      path: "doctors",
      userId: existingUser._id as string,
    });

    const code = await findCode({ code: existingUser.code });

    if (!code) {
      res.status(403).json({ message: "something went wrong with the code" });
      return;
    }

    await updateCode(
      { _id: code._id },
      { user: existingUser._id },
      { new: true, runValidators: true }
    );

    const updatedUser = await updateUser(
      { _id: id },
      { ...req.body, profileImg },
      { new: true, runValidators: true }
    );

    const HashName = `verifyEmail:${existingUser._id}`;

    const token = await signJwt(
      { _id: existingUser._id },
      "VerTokenPrivateKey",
      "HS512",
      {
        expiresIn: "1h",
      }
    );

    await createHash({ HashName, content: { token }, expire: 3600 });

    const link = `http://localhost:3000/dashboard/verify/${token}`;

    await sendEmail({
      to: existingUser.email,
      link,
      templateName: "emailVerification.hbs",
      health: "healthcare",
      year: new Date().getFullYear(),
    });

    const notification = systemNotifications("emailVerification", existingUser);

    initiator.emit(`EmailVerification${existingUser._id}`, notification);

    await createNotification({
      ...notification,
      user: existingUser._id,
      assignedBy: "system",
    });

    res
      .status(203)
      .json({ message: "information added successfully", updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const sendEmailVerificationHandler = async (
  req: Request<SendEmailVerificationInterface["params"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const existingUser = await findUser({ _id: id });

    if (!existingUser) {
      res.status(404).json({ message: "user doesn't exist" });
      return;
    }

    const verified = existingUser.verified

    if(verified){
      res.status(400).json({message:"email already verified"})
      return
    }

    const HashName = `verifyEmail:${existingUser._id}`;

    const ExitingToken = await checkHash(HashName, "token");

    if (ExitingToken) {
      res.status(400).json({ message: "verification email already has sent" });
      return;
    }

    const token = await signJwt(
      { _id: existingUser._id },
      "VerTokenPrivateKey",
      "HS512",
      {
        expiresIn: "1h",
      }
    );

    await createHash({ HashName, content: { token }, expire: 3600 });

    const link = `http://localhost:3000/dashboard/verify/${token}`;

    await sendEmail({
      to: existingUser.email,
      link,
      templateName: "emailVerification.hbs",
      health: "healthcare",
      year: new Date().getFullYear(),
    });

    res
      .status(201)
      .json({ message: "A verification email has sent to your email" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmailHandler = async (
  req: Request<SendEmailVerificationInterface["params"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const existingUser = await findUser({ _id: id });

    if (!existingUser) {
      res.status(404).json({ message: "user doesn't exist" });
      return;
    }

    const HashName = `verifyEmail:${existingUser._id}`;

    const token = await checkHash(HashName,"token")

    if(!token) {
      res.status(404).json({message:"token has expiredd",state:false})
      return
    }

    const { valid } = await verifyJwt(
      token,
      "VerTokenPrivateKey",
      "HS512"
    );

    if (!valid) {
      res.status(403).json({ message: "invalid token", state: false });
      return;
    }

    await updateUser(
      { _id: existingUser._id },
      { verified: true },
      { runValidators: true, new: true }
    );

    await DelHash(HashName, "token");

    res
      .status(201)
      .json({ message: "email verified successfully", state: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (
  req: Request<AddAdditionalInterface["params"], {}>,
  res: Response
) => {
  try {
    const existingUser = await findUser({ _id: req.params.id });

    if (!existingUser) {
      res.status(404).json({ message: "user doesn't exist" });
    }

    res.status(200).json({ existingUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsersHandler = async (
  req: Request<ChangeUserInterface["params"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const user = await findUser({ _id: id });

    if (!user) {
      res.status(403).json({ message: "forbidden" });
      return;
    }
    const users = await getAllUsers({
      _id: { $ne: user._id },
      role: {
        $nin: [
          "Charge Nurse",
          "Head Nurse",
          "Head Secretary",
          "Charge Secretary",
        ],
      },
    });

    if (users.length < 1) {
      res.status(404).json({ message: "No Doctors" });
      return;
    }

    res.status(200).json({ message: "success", users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const ChangeUserInformationHandler = async (
  req: Request<ChangeUserInterface["params"], {}, ChangeUserInterface["body"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const user = await findUser({ _id: id });

    const data = {
      name: req.body.name,
      occupation: req.body.occupation || user?.occupation,
      gender: req.body.gender || user?.gender,
      height: req.body.height || user?.height,
      weight: req.body.weight || user?.weight,
    };

    if (!user) {
      res.status(404).json({ message: "user doesn't exist" });
      return;
    }
    const changed = Object.entries(data).every(
      ([key, value]) => user[key as keyof typeof user] === value
    );

    if (changed) {
      res.status(200).json({ message: "No Changes", state: true });
      return;
    }
    const updatedUser = await updateUser(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "information changed successfully", updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const changePasswordHandler = async (
  req: Request<
    ChangePasswordInterface["params"],
    {},
    ChangePasswordInterface["body"]
  >,
  res: Response
) => {
  try {
    const id = req.params.id;
    const password = req.body.password;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid id provided" });
      return;
    }
    const existingUser = await findUser({ _id: id });

    const currDate = new Date(existingUser?.passwordUpdatedAt as Date);
    const AllowedDateToChange = addWeeks(currDate, 2);

    if (!existingUser || !id) {
      res.status(403).json({ message: "forbidden" });
      return;
    }
    if (password === req.body.newPassword) {
      res.status(400).json({ message: "No changes" });
      return;
    }

    const email = existingUser.email;

    const confirmUser = await validatePassword({ email, password });

    if (!confirmUser) {
      res.status(403).json({ message: "invalid password" });
      return;
    }

    if (AllowedDateToChange > new Date()) {
      res.status(400).json({ message: "Too Many Changes at a short time" });
      return;
    }
    const hashedPassword = await hashPassword({
      password: req.body.newPassword,
    });

    await updateUser(
      { email },
      { password: hashedPassword, passwordUpdatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "password has changed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const SendResetEmailHandler = async (
  req: Request<{}, {}, ResetPasswordInterface["body"]>,
  res: Response
) => {
  try {
    const email = req.body.email;
    const id = req.body.id;
    const currDate = new Date();

    const existingUser = await findUser({ email });

    if (!existingUser) {
      res
        .status(403)
        .json({ message: "there is no account associated with this email" });
      return;
    }

    const HashName = `${existingUser.name}:${existingUser._id}`;

    const lastEmail = await checkHash(`${HashName}:1`, "content");

    const tomorrow = addDays(existingUser.passwordUpdatedAt as Date, 3);

    const existingToken = await checkHash(HashName, "token");

    if (addHours(currDate, 2) < tomorrow) {
      res.status(400).json({
        message: "can't reset password right now",
      });
      return;
    }

    if (existingToken) {
      res.status(400).json({
        message: "email already sent",
      });
      return;
    }
    const token = await signJwt(
      { _id: existingUser._id, email: existingUser.email },
      "VerTokenPrivateKey",
      "HS512",
      {
        expiresIn: "1h",
      }
    );

    let link;

    if (id === "undefined") {
      link = `http://localhost:3000/reset/${token}`;
    } else {
      link = `http://localhost:3000/dashboard/settings/setting/reset/${token}`;
    }
    const sent = await sendEmail({
      to: existingUser.email,
      templateName: "passwordreset.hbs",
      link,
    });

    if (!sent) {
      res
        .status(404)
        .json({ message: "error occurred sending verification email" });
      return;
    }

    const content = {
      content: addHours(currDate, 2).toISOString(),
    };

    await addToHash({
      HashName,
      token: { token },
      channel: "events",
      expire: 3600,
      content,
    });

    res.status(200).json({ message: "email sent successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const CheckTokenHandler = async (
  req: Request<CheckTokenExistanceInterface["params"]>,
  res: Response
) => {
  try {
    const token = req.params.token;
    const HashName = req.params.hashname;

    const { decoded, valid } = await verifyJwt(
      token,
      "VerTokenPrivateKey",
      "HS512"
    );

    if (!valid) {
      res.status(403).json({ message: "invalid token", state: false });
      return;
    }

    const user = decoded as UserDocument;

    const existingUser = await findUser({ _id: user._id });

    if (!existingUser) {
      res.status(403).json({ message: "forbidden" });
      return;
    }

    const existingToken = await checkHash(HashName, "token");

    if ((existingToken && token !== existingToken) || !existingToken) {
      res.status(404).json({ message: "invalid token", state: false });
      return;
    }
    res.status(200).json({ message: "valid token", state: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const ResetPasswordHandler = async (
  req: Request<
    ResetPasswordNewInterface["params"],
    {},
    ResetPasswordNewInterface["body"]
  >,
  res: Response
) => {
  try {
    const token = req.params.token;

    const { decoded, valid } = await verifyJwt(
      token,
      "VerTokenPrivateKey",
      "HS512"
    );

    if (!valid) {
      res.status(403).json({ message: "invalid token" });
      return;
    }

    const user = decoded as UserDocument;
    const existingUser = await findUser({ _id: user._id });

    if (!existingUser) {
      res.status(403).json({ message: "forbidden" });
      return;
    }

    const HashName = `${existingUser.name}:${existingUser._id}`;

    const existingToken = await checkHash(HashName, "token");

    if (!existingToken) {
      res.status(404).json({ message: "invalid token", state: false });
      return;
    }

    const hashedPassword = await hashPassword({
      password: req.body.newPassword,
    });

    await updateUser(
      { email: existingUser.email },
      { password: hashedPassword, passwordUpdatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    await DelHash(HashName, "token");
    res.status(200).json({ message: "password has changed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const SendChangeEmailHandler = async (
  req: Request<
    ChangeEmailInterface["params"],
    {},
    ChangeEmailInterface["body"]
  >,
  res: Response
) => {
  try {
    const id = req.params.id;
    const newEmail = req.body.email;
    let token = null;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid id provided" });
      return;
    }
    const existingUser = await findUser({ _id: id });
    const userWithEmail = await findUser({ email: newEmail });

    if (
      !existingUser ||
      !id ||
      existingUser.email === newEmail ||
      userWithEmail
    ) {
      res.status(403).json({ message: "can't make changes" });
      return;
    }

    const HashName = `newEmail:otp:${existingUser._id}`;

    const lastEmail = await checkHash(`${HashName}:1`, "content");

    const fiveMinutes = addMinutes(new Date(lastEmail as string), 5);

    const month = addMonths(new Date(lastEmail as string), 1);

    const existingOtp = await checkHash(HashName, "otp");

    const existingToken = await checkHash(`${HashName}:token`, "token");

    if (fiveMinutes < month) {
      res.status(400).json({ message: "can't change email right now" });
      return;
    }
    if (new Date(lastEmail as string) < fiveMinutes) {
      if (existingOtp) {
        res.status(400).json({ message: "email already sent" });
        return;
      }
    }

    const otp = generateOtp({ length: 8, type: "number" });

    if (!existingToken) {
      token = await signJwt(
        { _id: existingUser._id, email: newEmail },
        "VerTokenPrivateKey",
        "HS512",
        {
          expiresIn: "1h",
        }
      );
    }

    const sent = await sendEmail({
      to: newEmail,
      templateName: "changeEmail.hbs",
      otp,
      health: "healthcare",
      year: new Date().getFullYear(),
    });

    if (!sent) {
      res
        .status(404)
        .json({ message: "error occurred sending verification email" });
      return;
    }

    await createHash({
      HashName,
      content: { otp },
      expire: 300,
    });

    await createHash({
      HashName: `${HashName}:token`,
      content: { token: token },
      expire: 3600,
    });

    res.status(200).json({
      message: "verification email sent",
      token: token || existingToken,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const checkOtpEmailChangeHandler = async (
  req: Request<CheckOtpInterface["params"], {}, CheckOtpInterface["body"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid id provided" });
      return;
    }

    const existingUser = await findUser({ _id: id });

    if (!existingUser) {
      res.status(403).json({ message: "forbidden" });
      return;
    }
    const HashName = `newEmail:otp:${existingUser._id}`;
    const existingOtp = await checkHash(HashName, "otp");

    const token = await checkHash(`${HashName}:token`, "token");

    if (!existingOtp || !token || existingOtp !== req.body.otp) {
      res.status(404).json({ message: "invalid code", state: false });
      return;
    }

    const { decoded, valid } = await verifyJwt(
      token,
      "VerTokenPrivateKey",
      "HS512"
    );

    if (!valid) {
      res.status(403).json({ message: "invalid token", state: false });
      return;
    }

    interface userSchema {
      _id: string;
      email: string;
    }

    const user = decoded as userSchema;
    console.log(user);
    await updateUser(
      {
        _id: user._id,
      },
      { email: user.email },
      { new: true, runValidators: true }
    );

    await createHash({
      HashName: `${HashName}:1`,
      content: { content: addHours(new Date(), 2).toISOString() },
    });

    await DelHash(HashName, "otp");
    await DelHash(`${HashName}:token`, "token");

    res
      .status(201)
      .json({ message: "email has changed successfully", state: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const changeProfilePictureHandler = async (
  req: Request<ChangeProfilePictureInterface["params"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const image = req.file as Express.Multer.File;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid id provided" });
      return;
    }

    const existingUser = await findUser({ _id: id });

    if (!existingUser) {
      res.status(403).json({ message: "forbidden" });
      return;
    }
    const HashName = `profilePicture:${existingUser._id}:change`;

    const lastTimeChanged = await checkHash(HashName, "content");

    if (lastTimeChanged) {
      res
        .status(400)
        .json({ message: "can't change profile picture right now" });
      return;
    }

    const profileImg = await uploadImageToFirebase({
      image,
      path: "doctors",
      userId: existingUser._id as string,
    });

    const update = await updateUser(
      { _id: id },
      { profileImg },
      { new: true, runValidators: true }
    );
    if (!update) {
      res.status(404).json({
        message: "something went wrong while changing the profile picture",
      });
      return;
    }

    const content = addHours(
      update.profileImg?.uploadedAt as Date,
      2
    ).toISOString();

    await createHash({ HashName, content: { content }, expire: 3600 * 24 * 3 });
    res.status(201).json({ message: "profile picture updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const reIssueAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const refreshToken = get(req, "headers.x-refresh") as string;

    const accessToken = await reIssueAccessToken(refreshToken);

    if (!accessToken) {
      res
        .status(403)
        .json({ message: "session has expired", sessionState: false });
      return;
    }

    if (accessToken) {
      res.setHeader("Authorization", `${accessToken}`);
    }

    res.status(200).json({ accessToken, sessionState: true, refreshToken });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
