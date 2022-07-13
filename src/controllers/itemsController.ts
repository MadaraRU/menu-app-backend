import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import Menu from "../models/menuModel";

// @desc Add items
// @route /api/items
// access private

export const addItem: RequestHandler = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body as {
    name: string;
    price: number;
    description: string;
  };

  const menuId = req.body.menuId as string;

  // create a new item
  const newItem = {
    name,
    price,
    description,
  };

  // find menu by id
  const menu = await Menu.findById({ _id: menuId });

  // push the new item to items array
  if (menu) {
    menu.category[0].items!.push(newItem);
    await menu.save();
  } else {
    res.status(400);
  }

  res.status(201).json(menu);
});

// @desc Delete items
// @route /api/items/delete
// access private

export const deleteItem: RequestHandler = asyncHandler(async (req, res) => {
  const menuId = req.body.menuId as string;
  const itemId = req.body.itemId as string;

  const menu = await Menu.updateOne(
    { _id: menuId },
    {
      $pull: {
        "category.0.items": { _id: itemId },
      },
    }
  );

  if (!menu) {
    res.status(404);
    throw new Error("Item not found");
  }

  res.status(200).json({ message: "Item deleted" });
});

// @desc update items
// @route /api/items/update
// access private

export const updateItem: RequestHandler = asyncHandler(async (req, res) => {
  const { menuId, updatedName, updatedPrice, updatedDescription } =
    req.body as {
      menuId: string;
      updatedName: string;
      updatedPrice: number;
      updatedDescription: string;
    };

  const itemId = req.body.itemId as string;

  const menu = await Menu.findOneAndUpdate(
    { _id: menuId },
    {
      $set: {
        "category.0.items.$[i].name": updatedName,
        "category.0.items.$[i].price": updatedPrice,
        "category.0.items.$[i].description": updatedDescription,
      },
    },
    {
      arrayFilters: [{ "i._id": itemId }],
    }
  );
  if (!menu) {
    res.status(404);
    throw new Error("Item not found");
  }
  res.status(200).json({ message: "Item updated" });
});
