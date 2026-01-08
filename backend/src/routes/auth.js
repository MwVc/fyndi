import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/authController";
import verifyToken from "../middleware/verifyToken";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", verifyToken, (req, res) =>
  res.status(200).json({ success: "true" })
);

export default router;
