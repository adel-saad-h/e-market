import { cartModel } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import { ProductModel } from "../models/productModel";


interface CreateCart {
    userId: string;
}
const createCart = async ({ userId }: CreateCart) => {

    const cart = await cartModel.create({ userId, items: [], totalAmount: 0 });
    cart.save();
    return cart;
}

interface GetActiveCartForUser {
    userId: string;
}
export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    try {
        let cart = await cartModel.findOne({ userId, status: "active" });
        if (!cart) {
            cart = await createCart({ userId });
        }
        return cart;
    } catch (err) {
        throw err;
    }
}

interface ClearActiveCartForUser {
    userId: string;
}
export const clearActiveCartForUser = async ({ userId }: ClearActiveCartForUser) => {
    try {
        const cart = await cartModel.findOne({ userId, status: "active" });
        if (!cart) {
            return { data: "No items in your cart", statusCode: 400 }
        }
        cart.items = [];
        cart.totalAmount = 0;
        const updatedCart = await cart.save();
        return { data: updatedCart, statusCode: 200 }
    } catch (err) {
        return { data: "Something is wrong : " + err, statusCode: 500 }
    }
}

interface AddItemToCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const addItemToCart = async ({ userId, productId, quantity }: AddItemToCart) => {
    try {
        const cart = await getActiveCartForUser({ userId });
        const existsInCart = cart.items.find((p) => p.product === productId);
        if (existsInCart) {
            return { data: "Item already in your cart", statusCode: 400 }
        }
        const product = await ProductModel.findById({ _id: productId })
        if (!product) {
            return { data: "Product not found", statusCode: 400 }
        }
        if (product.stoke < quantity) {
            return { data: "Low stock", statusCode: 400 }
        }
        cart.items.push({ product: productId, quantity, price: product.price });

        cart.totalAmount += product.price * quantity;
        const updatedCart = await cart.save();
        return { data: updatedCart, statusCode: 200 }
    } catch (err) {
        return { data: "Something is wrong : " + err, statusCode: 500 }
    }

}
interface UpdateItemInCart {
    userId: string;
    productId: any;
    quantity: number;
}
export const updateItemInCart = async ({ userId, productId, quantity }: UpdateItemInCart) => {
    try {
        const cart = await getActiveCartForUser({ userId });
        const existsInCart = cart.items.find((p) => p.product === productId);
        if (!existsInCart) {
            return { data: "Item not in your cart", statusCode: 400 }
        }
        const product = await ProductModel.findById({ _id: productId })
        if (!product) {
            return { data: "Product not found", statusCode: 400 }
        }
        if (product.stoke < quantity) {
            return { data: "Low stock", statusCode: 400 }
        }
        cart.totalAmount -= existsInCart.quantity * product.price
        existsInCart.quantity = quantity;
        cart.totalAmount += product.price * quantity;

        const updatedCart = await cart.save();
        return { data: updatedCart, statusCode: 200 }
    } catch (err) {
        return { data: "Something is wrong : " + err, statusCode: 500 }
    }
}
interface DeleteItemFromCart {
    userId: string;
    productId: any;
}
export const deleteItemFromCart = async ({ userId, productId }: DeleteItemFromCart) => {
    try {
        const cart = await getActiveCartForUser({ userId });
        const existsInCart = cart.items.find((p) => p.product === productId);
        if (!existsInCart) {
            return { data: "Item not in your cart", statusCode: 400 }
        }
        const product = await ProductModel.findById({ _id: productId })
        if (!product) {
            return { data: "Product not found", statusCode: 400 }
        }
        cart.totalAmount -= existsInCart.quantity * product.price
        const otherItemInCart = cart.items.filter((p) => p.product !== productId)
        cart.items = otherItemInCart;
        const updatedCart = await cart.save();
        return { data: updatedCart, statusCode: 200 }
    } catch (err) {
        return { data: "Something is wrong : " + err, statusCode: 500 }
    }
}

interface Checkout {
    userId: string;
    userAddress: string;
}
export const checkout = async ({ userId, userAddress }: Checkout) => {
    try {
        const cart = await getActiveCartForUser({ userId });
        const existsItemsInCart = cart.items;
        if (!existsItemsInCart) {
            return { data: "No products found in you cart", statusCode: 400 }
        }
        const orderItems: IOrderItem[] = []
        for (const item of cart.items) {
            const product = await ProductModel.findById(item.product);
            if (!product) {
                return { data: "No products found ", statusCode: 400 }
            }
            const orderItem: IOrderItem = {
                productTitle: product.title,
                productImage: product.image,
                quantity: item.quantity,
                unitPrice: product.price
            };
            orderItems.push(orderItem);
        }
        const order = await orderModel.create({
            orderItems,
            total: cart.totalAmount,
            address: userAddress,
            userId
        });

        await order.save()
        cart.status = "completed";
        await cart.save()
        return { data: order, statusCode: 200 }
    } catch (err) {
        return { data: "Something is wrong : " + err, statusCode: 500 }
    }
}