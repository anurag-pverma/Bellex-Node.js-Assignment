
import { v4 as uuidv4 } from 'uuid'
import *   as middleware from "../Middleware/auth.js";
import User from "../Models/User.js";
import Orders from "../Models/productSchema.js";
import Role from "../Models/roleSchema.js";

export const index = async (req, res) => {
  try {
  
    const userDetails = (middleware.decode) 
    const orders = await Orders.find(
      {username: userDetails.user.username}, {username:0});
    // res.json(orders);
    return res.status(201).send({
      orders,
    })
  } catch (error) {
    return res.status(401).send({
      success:false,
      message:`Unauthorized`
    })
  }
};

export const create = async (req, res) => {
  

  try {
    const { product_name, product_price, quantity } = req.body;
    if(product_name.length <3 || product_name.length >10 ){
       return res.status(400).send({
        success: false,
        message: "product_name  with character between 3 to 10"
       })
    }

    if(product_price < 100 ||  product_price > 1000){
      return res.status(400).send({
        success: false,
        message: "product_price should be between 100 to 1000"
      })
    }

    if (quantity < 1  || quantity >10){
      return res.status(400).send({
        success: false,
        message: "quantity should be between 1 to 10"
      })
    }

    const userDeatails = (middleware.decode);
    // console.log(userDeatails)
    const saveOrders = await Orders.create({
      order_id: uuidv4(),
      product_name,
      product_price,
      quantity,
      status: "new",
      username: userDeatails.user.username,
    });

    return res.status(201).send({
      // success:true,
    saveOrders
      // message:'created successfully'
    })


  } catch (error) {
    return res.status(401).send({
      success:false,
      message:'Unauthorized'
    })
  }
};

