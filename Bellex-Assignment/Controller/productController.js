
import Orders from "../Models/productSchema.js";

export const index = async (req, res) => {
  try {
    const { userId, role } = req.params;

    const orders = await Orders.find({
      userId: userId,
      role: role,
    });
    res.json(orders);
  } catch (error) {
    res.status(402).json(error.errors);
  }
};

export const create = async (req, res) => {
  const { userId, role } = req.params;

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

    if (quantity < 0  || quantity >10){
      return res.status(400).send({
        success: false,
        message: "quantity should be between 1 to 10"
      })
    }
    const saveOrders = new Orders({
      product_name,
      product_price,
      quantity,
      userId: req.params.userId,
      role,
    });
    await saveOrders.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(400).json(error.errors);
  }
};

// export const destroy = async (req, res) => {
//   await Orders.deleteOne({ _id: req.params.id });
//   res.json({ message: "success" });
// };

export const update = async (req, res) => {
  try {
    await Orders.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(404).json(error.errors);
  }
};
