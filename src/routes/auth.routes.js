import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  deleteProfile,
} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authRequired, logout);

router.get("/profile", authRequired, profile);

router.delete("/profile", authRequired, deleteProfile);

export default router;
