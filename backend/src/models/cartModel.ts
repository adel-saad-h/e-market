/*
we want 2 git all data for the product and additional info
we can make discount on the price so we can't use the product price
*/

import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IProduct } from "./productModel";

const CartStatusEnum = ["active", "completed"]
export interface ICartItem {
    product: IProduct;
    quantity: number;
    price: number;
}
export interface ICart extends Document {
    userId: ObjectId | string;
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed" //we want to save the cart history

}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }

})
const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: CartStatusEnum, default: "active" }
})
export const cartModel = mongoose.model<ICart>("cart", cartSchema);