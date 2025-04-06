import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/productRoute"

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => console.log("Mongo connected..."))
    .catch((err) => console.log("failed to connect!", err));

app.use("/products", productRouter)

app.listen(port, () => { console.log(`Server is running at : http://localhost:${port}`) });
