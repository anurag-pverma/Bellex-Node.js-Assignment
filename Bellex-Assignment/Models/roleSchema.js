import mongoose from "mongoose";
const { Schema } = mongoose;

const roleSchema = new Schema({
  name: String,
});
export default new mongoose.model("Role", roleSchema, "Role")