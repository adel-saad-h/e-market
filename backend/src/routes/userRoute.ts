/*
The endpoints use the logic from the services file
*/
import express from "express";
import { login, register } from "../services/userServices";


const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, address } = req.body;
        const { statusCode, data } = await register({ firstName, lastName, email, password, address });
        res.status(statusCode).json(data);
    } catch (err) {
        res.status(500).send("Something is wrong ")
    }

})
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { statusCode, data } = await login({ email, password });
        res.status(statusCode).json(data);
    } catch (err) {
        res.status(500).send("Something is wrong ")
    }

})


export default router;