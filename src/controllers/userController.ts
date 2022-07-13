import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import User from "../models/userModel";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

export const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body as {
    email: string;
    password: string;
    name: string;
  };

  const userExists = await User.findOne({ email });

  // check if user exist
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password,

    // password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

export const authUser: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });

  // if (user && (await bcrypt.compare(password, user.password))) {
  //   res.json({
  //     _id: user._id,
  //     email: user.email,
  //     token: generateToken(user._id),
  //   });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
