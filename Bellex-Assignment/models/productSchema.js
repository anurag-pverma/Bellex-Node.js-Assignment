import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema =  new Schema({
    order_id : {type:String},
    product_name:{type:String},
    product_price:{type:Number},
    quantity : {type:Number},
    userId : {type:String},
    status : {type:String, default:"new"},
    "username" : {type:String}

})

export default new mongoose.model("Orders", productSchema);
