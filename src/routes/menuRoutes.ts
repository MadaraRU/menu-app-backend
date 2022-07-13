import { Router } from "express";
import { validate } from "express-validation";
import {
  deleteMenu,
  getMenuById,
  getMenus,
  setMenu,
} from "../controllers/menuController";
import { protect } from "../middleware/authMiddleware";
import { categoryNameValidator } from "../validations/menuValidation";

const router = Router();

router
  .route("/")
  .post(validate(categoryNameValidator), protect, setMenu)
  .get(protect, getMenus);
router.route("/:id").get(protect, getMenuById).delete(protect, deleteMenu);

export default router;
