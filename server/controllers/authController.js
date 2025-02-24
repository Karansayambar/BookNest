import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password, role, contactDetails } = req.body;

  try {
    //check if email is alredy register
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email alredy exist",
      });
    }

    //hased tjhe password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      contactDetails,
    });

    await newUser.save();
    const userResponse = { ...newUser.toObject(), password: undefined };

    const token = jwt.sign(
      {
        _id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(201).json({
      message: "User Created Successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //check user alredy exist
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // decrypt the password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //generate a jwt token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "User Successfully Login",
      user: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { register, login };
