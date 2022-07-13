import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { RequestHandler } from "express";

interface JwtPayload {
  id: string;
}

const protect: RequestHandler = asyncHandler(
  async (req: Request | any, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        // Get user from the token
        req.user = await User.findById(id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
