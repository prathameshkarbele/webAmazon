import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String
})

export const  Products = new mongoose.model("productdata",ProductsSchema)