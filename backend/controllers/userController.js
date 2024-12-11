import { User } from "../db/schema/user.js";
import jwt from "jsonwebtoken";
import { codeSchema } from "../db/schema/code.js";
import { MedicalStuffRegex } from "../lib/constants.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../db/firebase/firebase.js";
import { Appointment } from "../db/schema/appointment.js";

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({})
  try {

    if(!users) {
      return res.status(404).json({message:"There is No Users"})
    }
    
     return res.status(200).json({users})
  } catch (error) {
    return next(error)
  }
}

export const getUser =  async(req, res, next) => {
  const { id } = req.params;

  const existingUser = await User.findById(id);

  try {

    if(!existingUser){
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({existingUser})
  } catch (error) {
    return next(error);
  }
}

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
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender ||
    !code ||
    !birthDate ||
    !phone
  ) {
    const error = new Error("Some Fields Are Missing Out");
    error.status = 404;
    return next(error);
  }
  if (password !== confirmPassword) {
    return res.status(403).json({ msg: "Passwords Must Match" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ msg: "user already exists" });
    }

    const stateToDetermineRole = await codeSchema.findOne({ code });

    if (!stateToDetermineRole) {
      return res.status(404).json({ msg: "Invalid Code Supported" });
    }

    const existingCode = await User.findOne({ code });
    if (existingCode) {
      return res.status(409).json({ msg: "This Code is Used" });
    }

    const newUser = new User({
      name,
      email,
      password,
      gender,
      phone,
      birthDate,
      role: stateToDetermineRole.role,
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

    await newUser.save();

    return res.status(201).json({
      msg: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ msg: "Some Fields Are Missing Out" });
  }
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
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
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

  console.log(code);
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

export const AddAddtionalInformation = async (req, res, next) => {
  const { id } = req.params;
  const { height, weight, occupation, country, address, bio ,profileState} = req.body;

  const profileImg = req.file;
  const requiredInformation = {
    profileState,
    height,
    weight,
    occupation,
    country,
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
          `Doctors/${existingUser.name}/${existingUser._id}`
        );

        const SnapShot = await uploadBytes(StorageBucket, profileImg.buffer, {
          contentType: profileImg.mimetype,
        });

        const downloadUrl = await getDownloadURL(SnapShot.ref);

      await  existingUser.updateOne({
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
    return res
      .status(200)
      .json({ msg: `Information Added Successfully`, existingUser });
  } catch (error) {
    const errMsg = error;
    return next(errMsg);
  }
};


export const deleteUser = async (req, res,next) => {
  const { id } = req.params;
  const existingUser = await User.findById(id);

   const userAppointments = await Appointment.find({user: id})
  try {
    
    if(!existingUser){
      return res.status(404).json({message: "User Not Found"})

    }

     userAppointments.map(async(app ) => await app.deleteOne())


     await existingUser.deleteOne()

    return res.status(200).json({message: "User deleted successfully",userAppointments})
  } catch (error) {
    
    return next(error);
  }
}