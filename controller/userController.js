const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const users = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new users({ name, email, password: hashedPassword });
    await newUser.save();
    const { password: _, ...regUser } = newUser._doc;
    res.status(200).json(regUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      if (await bcrypt.compare(password, existingUser.password)) {
        const { password: _, ...loggedUser } = existingUser._doc;
        const token = jwt.sign({ email: existingUser.email }, "superkey2025");
        res.status(200).json({ loggedUser, token });
      } else {
        res.status(400).json("Incorrect Password");
      }
    } else {
      res.status(400).json("User dont exist.Kindly register");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.googleLogin = async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      const newUser = new users({
        name,
        email,
        password: await bcrypt.hash("googlepwd", 10),
      });
      await newUser.save();
      const token = jwt.sign({ email: newUser.email }, "superkey2025");
      const { password: _, ...userdata } = newUser._doc;
      res.status(200).json({ userdata, token });
    } else {
      const token = jwt.sign({ email: existingUser.email }, "superkey2025");
      const { password: _, ...userdata } = existingUser._doc;
      res.status(200).json({ userdata, token });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
