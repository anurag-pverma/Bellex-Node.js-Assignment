import User from "../Models/User.js";
import Role from "../Models/roleSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { body, validationResult } from "express-validator";
import Orders from "../Models/productSchema.js";
const saltRounds = 10;
import * as middleWare from "../Middleware/auth.js";
let checkauth = middleWare.auth;
let getAuth = middleWare.authorization;

export const signup = async (req, res) => {
  const { username, role, password } = req.body;
  console.log(password);
  if (username.length < 3 || username.length > 10) {
    return res.status(400).send({
      success: false,
      message: "username character must be between 3 to 10",
    });
  }
  if (password.length > 14 || password.length < 8) {
    return res
      .status(400)
      .send({ success: false, message: " password  with character 8 to 15" });
  } else if (/[a-z]/.test(password) == false) {
    return res.status(400).send({
      success: false,
      message: " password  with atleast one lower character character",
    });
  } else if (/[A-Z]/.test(password) == false) {
    return res.status(400).send({
      success: false,
      message: " password  with atleast one upper character character",
    });
  } else if (/[0-9]/.test(password) == false) {
    return res.status(400).send({
      success: false,
      message: " password  with atleast one number character character",
    });
  }

  const existRole = await Role.findOne({ name: role });
  let checkrole;
  if (role === "user") {
    checkrole = existRole._id;
  } else if (role === "admin") {
    checkrole = existRole._id;
  } else {
    res.send("enter valid role");
  }

  if (!(username && password && role)) {
    res.status(400).send("All parameters are required");
  }
  const hashpassword = await bcrypt.hash(password, saltRounds);
  const users = await new User({
    username,
    password: hashpassword,
    role: checkrole,
  });
  users.save((error, success) => {
    try {
      res.status(201).send({ message: "successfull singup", success: true });
    } catch (error) {
      res.status(400).send({
        message: `Username ${username.username} already present`,
        success: false,
      });
    }
  });
};
//Role Login Parl
export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).send({
      success: false,
      message: "Username/Password is invalid",
    });
    return;
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    res
      .status(404)
      .send({ success: false, message: "Username/Password is invalid" });
    return;
  }
  const token = await jwt.sign({ user }, "fake-jwt-secret");
  res.json({ user, access_token: token });
};

//************************************** */
// **************************************************

// /admin/orders  api call
export const getadmin =
  (checkauth,
  getAuth,
  async (req, res) => {
    try {
      const role = await Role.findOne({ name: "user" });
      const user = await User.find({ role: role.id });
      const data = await Orders.find({});
      // console.log(data);
      console.log(user)
      const obj = {};
      user.map((el) => {
        obj[el.username] = [];
      });
      console.log(obj);
      data.map((item) => {
        obj[item.username].push({
          order_id: item.order_id,
          product_name: item.product_name,
          product_price: item.product_price,
          quantity: item.quantity,
          status: item.status,
        });
      });

      // console.log(obj);
      return res.status(200).send({ 
        success:true,
        obj

       });
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  });

// **************************************************
// put request  / admin/orders/:order_id

export const update =
  (checkauth,
  getAuth,
  async (req, res) => {
    try {
      const { order_id } = req.params;
      const { status, product_name, product_price, quantity, username } =
        req.body;

      const order = await Orders.findOne({ order_id: order_id });
      if (order == null) {
        return res.status(404).send({
          success: false,
          message: `Order ${order_id} not found`,
        });
      }
      if (order.status !== "new") {
        return res.status(404).send({
          success: false,
          message: `Order status ${order.status} is invalid`,
        });
      }

      const updateOrder = await Orders.updateOne(
        { order_id },
        {
          order_id,
          product_name,
          product_price,
          quantity,
          status: status,
          username,
        }
      );
      return res.status(200).send({
        status: status,
        updateOrder,
      });
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
       }
  });

// **********************************************
// Get all summury  => /admin/orders/summary
export const getallsummary =
  (checkauth,
  getAuth,
  async (req, res) => {
    try {
      const role = await Role.findOne({ name: "user" });
      const user = await User.find({ role: role.id });
      const data = await Orders.find({});
      let obj = {};
      user.map((item) => {
        obj[item.username] = [];
      });
      data.map((item) => {
        obj[item.username].push(item.product_price * item.quantity);
      });
      Object.keys(obj).forEach((key) => {
        obj[key] = obj[key].reduce((acc, curr) => {
          return acc + curr;
        }, 0);
      });
      return res.status(200).send({
        obj,
      });
    } catch (error) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  });
