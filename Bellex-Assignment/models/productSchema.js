import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema =  new Schema({
    product_name: {type: String || Number, min:3, max:10},
    product_price: {type:Number , min:100, max:1000},
    quantity:{type : Number , min: 1, max: 10}
})

export default new mongoose.model("Orders", productSchema);
