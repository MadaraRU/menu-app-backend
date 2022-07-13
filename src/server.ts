import express from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import { connectDB } from "./config/db";
import cors from "cors";
import "colors";

import userRoutes from "./routes/userRoutes";
import menuRoutes from "./routes/menuRoutes";
import itemRoutes from "./routes/itemRoutes";

import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/items", itemRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
