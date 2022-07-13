import { ObjectId } from "mongodb";
import mongoose from "mongoose";

interface IItems {
  _id?: String;
  name: string;
  price: number;
  description: string;
}
type category = {
  categoryName: string;
  items?: [IItems];
}[];

interface IMenu {
  user: {
    type: ObjectId;
    required: boolean;
    ref: string;
  };
  category: category;
}

const itemSchema = new mongoose.Schema<IItems>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
  },
  {
    timestamps: true,
  }
);

const menuSchema = new mongoose.Schema<IMenu>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: [
      {
        menuId: {
          type: ObjectId,
        },
        categoryName: {
          type: String,
          required: [true, "Please add a category name"],
        },
        items: [itemSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);
export const Items = mongoose.model("Items", itemSchema);

export default Menu;
