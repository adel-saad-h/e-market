import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 3001;
mongoose.connect("mongodb://localhost:27017/e-market")
    .then(() => console.log("Mongo connected..."))
    .catch((err) => console.log("failed to connect!", err));

app.listen(port, () => { console.log(`Server is running at : http://localhost:${port}`) });
