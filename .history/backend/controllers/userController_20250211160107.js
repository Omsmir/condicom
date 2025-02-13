import { User } from "../db/schema/user.js";
import jwt from "jsonwebtoken";
import { codeSchema } from "../db/schema/code.js";
import { MedicalStuffRegex } from "../lib/constants.js";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../db/firebase/firebase.js";
import { Appointment } from "../db/schema/appointment.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Notifications } from "../db/schema/notification.js";
import { io } from "../server.js";
import mongoose from 'mongoose'
dotenv.config();

const generateRandomToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

export const sendVerificationEmail = async (to, verificationToken) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "omarsamir232@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });
  const verificationLink = `http://localhost:8080/emailVerification?token=${verificationToken}`;
  const from = "HealthCare";
  const subject = " HealthCare Email Verification";
  const html = `
    <p>Hello, ${to},</p>
    <p>Please use This Link To Verify Yout Email</p>
    <a href="${verificationLink}">Click Here</a>
    <p>Thank you</p>
    `;
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
      console.log(info);
    });
  });
};

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  try {
    if (!users) {
      return res.status(404).json({ message: "There is No Users" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};



export const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const existingUser = await User.findById(id);
  try {
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ existingUser });
  } catch (error) {
    return next(error.message);
  }
};

export const register = async (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    code,
    phone,
    birthDate,
    gender,
  } = req.body;


  const requiredFields = {name,email,password,confirmPassword,gender,code,birthDate,phone}

  try {
    for(let [value,key] of Object.entries(requiredFields)){
      if(!value){
        return res.status(404).json({ msg: `Some Fields Are Missing Out` });

      }
    }

    if (password !== confirmPassword) {
      return res.status(403).json({ msg: "Passwords Must Match" });
    }
  
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ msg: "user already exists" });
    }

    const Code = await codeSchema.findOne({ code });

    if (!Code) {
      return res.status(404).json({ msg: "Invalid Code Supported" });
    }

    const existingCode = await User.findOne({ code });
    if (existingCode) {
      return res.status(409).json({ msg: "This Code is Used" });
    }

    Code.used = true

    const newUser = new User({
      name,
      email,
      password,
      gender,
      phone,
      birthDate,
      role: Code.role,
      code: code,
      verified: false,
      profileImg: "",
      weight: 0,
      height: 0,
      counrty: "",
      bio: "",
      occupation: "",
      address: "",
    });
    await Code.save()

    await newUser.save();

    return res.status(201).json({
      msg: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const AddAddtionalInformation = async (req, res, next) => {
  const { id } = req.params;
  const { height, weight, occupation, country, address, bio, profileState } =
    req.body;

  const profileImg = req.file;
  const nonToken = generateRandomToken();
  const token = crypto.createHash("sha256").update(nonToken).digest("hex");
  const expireToken = Date.now() + 1 * 24 * 60 * 60 * 1000;

  const requiredInformation = {
    profileState,
    height,
    weight,
    occupation,
    country,
    token,
    expireToken,
  };

  const optionalInformation = { bio, address };
  const existingUser = await User.findById(id);

  try {
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    for (const [key, value] of Object.entries(requiredInformation)) {
      if (!value) {
        return res.status(404).json({ msg: `Some Fields Are Missing Out` });
      }
    }

    for (const [key, value] of Object.entries(optionalInformation)) {
      if (value) {
        existingUser[key] = value;
      }
    }


    for (const [key, value] of Object.entries(requiredInformation)) {
      existingUser[key] = value;
    }

    if (profileImg) {
      const imageToUpload = async () => {
        const StorageBucket = ref(
          storage,
          `Doctors/${existingUser._id}/${existingUser._id}`
        );

        const SnapShot = await uploadBytes(StorageBucket, profileImg.buffer, {
          contentType: profileImg.mimetype,
        });

        const downloadUrl = await getDownloadURL(SnapShot.ref);

        await existingUser.updateOne({
          profileImg: {
            filename: profileImg.originalname,
            url: downloadUrl,
            contentType: profileImg.mimetype,
            path: StorageBucket.fullPath,
          },
        });
      };

      imageToUpload();
    }

    await existingUser.save();

    await sendVerificationEmail(existingUser.email, nonToken);

    return res.status(200).json({ msg: `Information Added Successfully`, existingUser });
  } catch (error) {
    const errMsg = error;
    return next(errMsg);
  }finally{
    const Notification = {
      type: "Email Verification",
      description: "Please Verify Your Email",
      title: "System Administration",
      assignedTo: "All",
      eventId: existingUser._id,
    };
   const systemNotification = new Notifications(Notification);

    await systemNotification.save();

    io.emit(`EmailVerification${existingUser._id}`, systemNotification);

  }
};
export const Login = async (req, res, next) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Account doesn't exists" });
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        profileImg: user.profileImg.url,
        name: user.name,
        verified: user.verified,
        code:user.code
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
     next(error);
     return res.status(500).json({message:error.message})
  }
};

export const codeGenerator = async (req, res, next) => {
  const { numbers = [], character = [], fiveNumbers = [] } = req.body;

  const generateCode = () => {
    let code;
    const firstLetter = "B";

    const lastFiveNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    code = firstLetter + numbers[Math.floor(Math.random() * numbers.length)];

    code += fiveNumbers[Math.floor(Math.random() * fiveNumbers.length)];

    code += character[Math.floor(Math.random() * character.length)];

    for (let i = 5; i < lastFiveNumbers.length; i++) {
      code +=
        lastFiveNumbers[Math.floor(Math.random() * lastFiveNumbers.length)];
    }
    return code;
  };
  const code = generateCode();

  try {
    if (numbers.length < 1 && character.length < 1 && fiveNumbers.length < 1) {
      return res
        .status(400)
        .json({ msg: "At least one type of code is required" });
    }
    let role;

    MedicalStuffRegex.map((element) => {
      if (element.regex.test(code)) {
        role = element.role;
        console.log(role);
      }
    });

    const existingCode = await codeSchema.findOne({ code });
    if (existingCode) {
      return res.status(409).json({ msg: "Code already exists" });
    }

    const generatedCode = new codeSchema({ code, role });
    await generatedCode.save();

    return res.status(201).json({
      msg: "Code created successfully",
      code: generatedCode,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "An error occurred while generating the code",
      error: error.message,
    });
  }
};



export const verifyUser = async (req, res, next) => {
  const { token } = req.query;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const existingUser = await User.findOne({
    token: hashedToken,
    expireToken: { $gt: Date.now() },
  });

  try {
   
    if (!existingUser) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    existingUser.verified = true;
    existingUser.token = undefined;
    existingUser.expireToken = undefined;

  
    await existingUser.save();
    return res
      .status(201)
      .json({ message: "User has been verified successfully" });
  } catch (error) {
    return next(error);
  }finally{

    const Notification = {
      type: "Email Verified",
      description: "Email Verified Successfully",
      title: "System Administration",
      assignedTo: "All",
      eventId: existingUser._id,
    };
   const systemNotification = new Notifications(Notification);

    await systemNotification.save();

    io.emit(`EmailVerification${existingUser._id}`, Notification);
  }
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const existingUser = await User.findById(id);

  const userAppointments = await Appointment.find({ user: id });
  const userNotifications = await Notifications.find({$or:[{user:id},{eventId:id}]})
  const userCode = await codeSchema.findOne({code:existingUser.code})
  try {
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    userAppointments.map(async (app) => await app.deleteOne());

    userNotifications.map(async(notification) => await notification.deleteOne())

    userCode.used = false

    // const storageRef = ref(storage, existingUser.profileImg.path);
    // if (storageRef) {
    //   await deleteObject(storageRef);
    // }

    await userCode.save()
    await existingUser.deleteOne();
    

    return res
      .status(200)
      .json({ message: "User deleted successfully", userAppointments });
  } catch (error) {
    return next(error);
  }
};


