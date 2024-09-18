import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verify.js";
const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);
router.post("/createuser", verifyToken, createUser);
router.get("/:userId", getUser);

export default router;
