import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
}
export const register = async ({ firstName, lastName, email, password, address }: RegisterParams) => {
    try {
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            return { data: "User already exists", statusCode: 400 }
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ firstName, lastName, email, password: hashPassword, address });
        newUser.save();
        return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 }
    } catch (err) {
        return { data: await err, statusCode: 500 }
    }
}

interface LoginParams {
    email: string;
    password: string;
}
export const login = async ({ email, password }: LoginParams) => {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
        return { data: "In correct data", statusCode: 400 }
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
        return { data: "In correct data", statusCode: 400 }
    }
    return { data: generateJWT({ email, firstName: findUser.firstName }), statusCode: 200 }
}

const generateJWT = (data: any) => {
    return jwt.sign(data, process.env.JWT_SECRET || "")
}
