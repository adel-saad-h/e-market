import express from "express";
import { addItemToCart, clearActiveCartForUser, deleteItemFromCart, getActiveCartForUser, updateItemInCart } from "../services/cartServices";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
})
router.delete("/", validateJWT, async (req: ExtendRequest, res)=>{
    const userId = req.user._id;
    const cart = await clearActiveCartForUser({ userId });
    res.status(200).send(cart);
})
router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const { data, statusCode } = await addItemToCart({ userId, productId, quantity });
    res.status(statusCode).send(data);
})
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const { data, statusCode } = await updateItemInCart({ userId, productId, quantity });
    res.status(statusCode).send(data);
})
router.delete("/items", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId } = req.body;
    const { data, statusCode } = await deleteItemFromCart({userId,productId});
    res.status(statusCode).send(data);
})

export default router;