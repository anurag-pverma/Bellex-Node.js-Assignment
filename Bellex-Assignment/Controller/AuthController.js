import User from "../Models/User.js";
import Role from "../Models/roleSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const saltRounds = 10;

export const signup = async (req, res) => {
  const { username, role, password } = req.body;
  console.log(password);
  if (username.length < 3 || username.length > 10) {
    return res
      .status(400)
      .send({
        success: false,
        message: "username character must be between 3 to 10",
      });
  }
  if (password.length > 14 || password.length < 8) {
    return res
      .status(400)
      .send({ success: false, message: " password  with character 8 to 15" });
  } else if (/[a-z]/.test(password) == false) {
    return res
      .status(400)
      .send({
        success: false,
        message: " password  with atleast one lower character character",
      });
  } else if (/[A-Z]/.test(password) == false) {
    return res
      .status(400)
      .send({
        success: false,
        message: " password  with atleast one upper character character",
      });
  } else if (/[0-9]/.test(password) == false) {
    return res
      .status(400)
      .send({
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

const  authorization  = async (req, res, next)=>{
  const {username} = req.body;
  const user = await  User.findOne({username});
  const userRole = await Role.findOne({_id: user.role})
  if(userRole.name !== "admin"){
    return res.status(402).send({
      success:false,
      message:"Forbidden"
    })
  }
  else{
    next();
  }
}