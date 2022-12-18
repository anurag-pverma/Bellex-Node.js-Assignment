import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    product_name:  {type:String || Number , min:3, max:10}, // String is shorthand for {type: String}
    product_price: { type: Number, min: 100, max: 1000 },
    quantity:   { type: Number, min: 1, max: 10 },

});


