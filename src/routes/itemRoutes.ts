import { Router } from "express";
import { validate } from "express-validation";
import {
  addItem,
  deleteItem,
  updateItem,
} from "../controllers/itemsController";
import { protect } from "../middleware/authMiddleware";
import { itemValidator } from "../validations/itemValidation";

const router = Router();

router.post("/", validate(itemValidator), protect, addItem);
router.put("/delete", protect, deleteItem);
router.put("/update", protect, updateItem);

export default router;
