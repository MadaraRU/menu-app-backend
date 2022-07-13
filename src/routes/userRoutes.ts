import { Router } from "express";
import { authUser, registerUser } from "../controllers/userController";
import { validate } from "express-validation";
import {
  regiserValidator,
  loginValidator,
} from "../validations/userValidation";

const router = Router();

router.post("/", validate(regiserValidator), registerUser);
router.post("/login", validate(loginValidator), authUser);
router.post("/profile");

export default router;
