import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import User from "../Models/User.js";
import Role from "../Models/roleSchema.js"


export let  decode;
export  const auth = async (req, res, next) => {

  if(!req.headers){
    return res.status(401).send({
      success: false,
      message: "Unauthorized"
    })
  }
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1]
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      decode = await jwt.verify(token, "fake-jwt-secret");

      // const user = await User.findOne({ _id: ObjectId(decode.user._id) });
      // const user = await User.findOne({ username: req.body.username });
      let username;
      username= decode.username;
      req.body.username = username;



      if (!username) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
};

export const  authorization  = async (req, res, next)=>{
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


