import User  from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export const signup = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, saltRounds);
  // const data = { ...req.body, password };
  const {name, email, role}= req.body
  const users = await new User({
    name,
    email,
    password: password,
    role
  })
  // const user = await User.create(data);
  users.save(( error, success)=>{
    try {
      res.status(201).send({message: "success true", status: true
    })
    } catch (error) {
      res.status(400).send({message: " error occured", status: false})

    }
  })
  // res.json({ user });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const token = await jwt.sign({ user }, "fake-jwt-secret");
  res.json({ user, access_token: token });
};
