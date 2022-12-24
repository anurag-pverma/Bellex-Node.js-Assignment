import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  role: String,
});
export default new mongoose.model("User", UserSchema, "User");
