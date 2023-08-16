import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jws.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //Es asyncrono porque bcrypt usa su propia api y tengo q esperar a q lo traiga para usarlo
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      message: "User registered successfully",
      id: userSaved._id,
      email: userSaved.email,
      username: userSaved.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credential" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.send(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "Can't logout with out account" });
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });
  return res.json(userFound);
};

export const deleteProfile = async (req, res) => {
  const userFound = await User.findByIdAndDelete(req.user.id);
  res.cookie("token", "");
  if (!userFound) return res.status(400).json({ message: "User not found" });
  return res.send("Account Deleted");
};
