import { User } from "../db/schema/user.js";
import jwt from "jsonwebtoken";
import { codeSchema } from "../db/schema/code.js";

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

    if(!user){
      return res.status(400).json({msg:"Account doesn't exists"})
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
};
export const codeGenerator = async (req, res, next) => {



 
const generateCode = () => {
  let code;
  const firstLetter = "B"

  const twoNumbers = [1,2]

  const FiveNumbers = [0,1,2,3,4]

  const threeCharacters = ["C","D","E"]

  const lastFiveNumbers = [0,1,2,3,4,5,6,7,8,9]

  code =  firstLetter + twoNumbers[Math.floor(Math.random() * twoNumbers.length)]

  code += FiveNumbers[Math.floor(Math.random() * FiveNumbers.length)]

  code += threeCharacters[Math.floor(Math.random() * threeCharacters.length)]
  
  for(let i = 5; i < lastFiveNumbers.length; i++){
    code += lastFiveNumbers[Math.floor(Math.random() * lastFiveNumbers.length)]
  }
  return code

}
const code = generateCode()
  try {
    // Step 2: Validate the code format
    let role;
    if (code.startsWith("B1")) {
      role = "admin";
    } else if (code.startsWith("B2")) {
      role = "user";
    } else {
      return res.status(400).json({ msg: "Invalid code format" });
    }

    // Step 3: Check for duplicate code
    const existingCode = await codeSchema.findOne({ code });
    if (existingCode) {
      return res.status(409).json({ msg: "Code already exists" });
    }

    // Step 4: Create and save the new code
    const generatedCode = new codeSchema({ code, role });
    await generatedCode.save();

    // Step 5: Send the response
    return res.status(201).json({
      msg: "Code created successfully",
      code: generatedCode,
    });
  } catch (error) {
    // Step 6: Handle server errors
    return res.status(500).json({
      msg: "An error occurred while generating the code",
      error: error.message,
    });
  }
};
