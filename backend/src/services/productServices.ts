import { ProductModel } from "../models/productModel"

export const getAllProducts = async () => {
    try {
        const productData = await ProductModel.find()
        if (!productData) {
            return { data: "No products founded", statusCode: 200 }
        }
        return { data: productData, statusCode: 200 }
    } catch (err) {
        return { data: await err, statusCode: 500 }

    }
}

interface AddNewProductParams {
    title: string;
    image: string;
    stoke: number;
    price: number;
}
export const addNewProduct = async ({ title, image, stoke, price }: AddNewProductParams) => {
    try {
        const newProduct = await ProductModel.create({ title, image, stoke, price });
        newProduct.save();
        return { data: newProduct, statusCode: 200 }
    } catch (err) {
        return { data: await err, statusCode: 500 }

    }
}