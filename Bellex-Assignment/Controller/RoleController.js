import Role from "../Models/roleSchema.js";
export const roledata = async (req, res) => {
  try {
    const { name } = req.body;
    const existRole = await Role.findOne({ name });
    if (existRole) {
      return res.status(400).send({
        success: false,
        message: `Role with ${name}  already present`,
      });
    }
    if (name !== "user" && name !== "admin") {
      return res.status(400).send({
        success: false,
        message: `Role ${name} is invalid`,
      });
    }
    const role = await Role.create({
      name: name,
    });
    return res.status(201).send({
      success: true,
      message: "Role created successfully",
      id:role._id,
    });
  } catch (error) {
    res.send(error);
  }
};
