import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import User from "../Models/User.js";

const auth = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1]
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = await jwt.verify(token, "fake-jwt-secret");
      const user = await User.findOne({ _id: ObjectId(decode.user._id) });
      if (!user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
};

export default auth;
