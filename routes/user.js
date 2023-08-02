import express from "express";
const router = express.Router();
import {register, login, profile, logout} from "../controller/user.js"
import {auth} from "../middleware/auth.js"

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, profile);
router.get("/logout", logout);

export default router;