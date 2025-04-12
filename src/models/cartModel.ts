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
    status: "active" | "completed"

}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }

})
const cartSchema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: CartStatusEnum, default: "active" }
})
export const cartModel = mongoose.model<ICart>("cart", cartSchema);