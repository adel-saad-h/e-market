import mongoose, { Schema, Document } from "mongoose";
export interface IProduct extends Document {
    title: string;
    image: string;
    stoke: number;
    price: number;
}
const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    stoke: { type: Number, required: true },
    price: { type: Number, required: true },
});

export const ProductModel = mongoose.model<IProduct>("products", productSchema);