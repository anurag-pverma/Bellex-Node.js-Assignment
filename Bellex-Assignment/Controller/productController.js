import one   from "../Models/User.js";
import Orders from "../Models/productSchema.js";

export const index = async (req, res) => {
   try {

      const {userId, role}= req.params

    const orders = await Orders.find({
      userId : userId,
      role:role
    });
    res.json(orders);
   } catch (error) {
    res.status(402).json(error.errors);
   }
};

export const create = async (req, res) => {
   const {userId, role}= req.params
 try {
    const { product_name, product_price, quantity } = req.body;
    const  saveOrders = new Orders({
      product_name,
      product_price,
      quantity,
      userId:req.params.userId,
      role


    });
    await saveOrders.save();
    res.status(201).json({ message: "Success" });
 } catch (error) {
    res.status(400).json(error.errors);
 }
};

export const destroy = async (req, res) => {
  await Orders.deleteOne({ _id: req.params.id });
  res.json({ message: "success" });
};

export const update = async (req, res) => {
 try {
    await Orders.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json({ message: "success" });
 } catch (error) {
    res.status(404).json(error.errors);
 }
};
