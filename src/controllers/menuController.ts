import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";

import Menu from "../models/menuModel";
import User from "../models/userModel";

// @desc    Get Menus
// @route   GET /api/Menu
// @access  Private
export const getMenus: RequestHandler = asyncHandler(async (req: any, res) => {
  const menu = await Menu.find({ user: req.user.id });

  res.status(200).json(menu);
});

// @desc    Get Menus
// @route   GET /api/Menu
// @access  Private
export const getMenuById: RequestHandler = asyncHandler(async (req, res) => {
  const params = req.params.id;
  const menu = await Menu.findById(params);

  if (!menu) {
    res.status(404);
    throw new Error("Menu not found");
  }

  res.status(200).json(menu);
});

// @desc    create a new menu
// @route   POST /api/menus
// @access  Private

export const setMenu: RequestHandler = asyncHandler(async (req: any, res) => {
  const { categoryName } = req.body as { categoryName: string };

  // check if a category exists

  const existedCategory = await Menu.findOne({
    "category.categoryName": categoryName,
  });

  if (existedCategory) {
    console.log(existedCategory);
    res.status(400);
    throw new Error("Category already exists");
  }

  // create a new Menu
  const newMenu = await Menu.create({
    user: req.user.id,
  });

  // create a new category
  const createdCategory: {
    categoryName: string;
    menuId: ObjectId;
  } = { categoryName, menuId: newMenu._id };

  // push the created cateogry to the newly created menu
  newMenu.category.push(createdCategory);

  await newMenu.save();

  res.status(201).json(newMenu);
});

// @desc    Delete menu
// @route   DELETE /api/menus/:id
// @access  Private

export const deleteMenu: RequestHandler = asyncHandler(
  async (req: any, res) => {
    const menu = await Menu.findById(req.params.id);

    // check for existed menu
    if (!menu) {
      res.status(400);
      throw new Error("Menu not found");
    }

    // check for user
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // make sure the logged in user matches the menu user
    if (menu.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await menu.remove();

    res.status(200).json({ message: "Menu removed!" });
  }
);
