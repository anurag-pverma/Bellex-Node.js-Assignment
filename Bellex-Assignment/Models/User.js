import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String, min:3, max:10,
    required: true,
  },
  password: {
    type: String,  min:8, max:15, uppercase:true,
    required: true,
  },
  role: {
    type: String,
  },
});


export default new mongoose.model("User", UserSchema, "User");
