import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jws.js";
import { TOKEN_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //Es asyncrono porque bcrypt usa su propia api y tengo q esperar a q lo traiga para usarlo

    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["Email is already taken"]);

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
    if (!userFound) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json(["Invalid Password"]);

    if (req.cookies.token)
      return res.status(400).json(["Close current session to login"]);

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
  const returnData = {
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
  };
  return res.json(returnData);
};

export const deleteProfile = async (req, res) => {
  const userFound = await User.findByIdAndDelete(req.user.id);
  res.cookie("token", "");
  if (!userFound) return res.status(400).json({ message: "User not found" });
  return res.send("Account Deleted");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_KEY, async (err, decode) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await User.findById(decode.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
