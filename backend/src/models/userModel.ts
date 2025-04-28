/*
 The data that we want to collect and save to DB
 and the model that we will be use in the other code
*/
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true }
})

export const userModel = mongoose.model<IUser>("user", userSchema)