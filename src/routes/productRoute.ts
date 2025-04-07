import express from "express";
import { addNewProduct, getAllProducts } from "../services/productServices";


const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send("Something is wrong " + err)
    }
});

router.post("/addNewProduct", async (req, res) => {
    try {
        const { title, image, stoke, price } = req.body;
        const { statusCode, data } = await addNewProduct({ title, image, stoke, price });
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something is wrong " + err)
    }
})

export default router;