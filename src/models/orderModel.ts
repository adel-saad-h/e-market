import mongoose, { Document, Schema } from "mongoose";
/*
Here we save each order for the user ,
we can depend on the cart status by make it completed,
but if the product is deleted we will lose the order information
so we will store all the data that we want for the product
*/
export interface IOrderItem {
    productTitle: string
    productImage: string
    unitPrice: number
    quantity: number
}

export interface IOrder extends Document {
    orderItems: IOrderItem[]
    total: number
    address: string
    userId: object | string
}

const orderItemsSchema = new Schema<IOrderItem>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const orderSchema = new Schema<IOrder>({
    orderItems: [orderItemsSchema],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
})

export const orderModel = mongoose.model<IOrder>("order", orderSchema);