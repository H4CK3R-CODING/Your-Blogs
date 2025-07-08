import express from "express";
import { useLogin, useRegister } from "../controllers/auth.controller.js";

const userRouter = express.Router();

userRouter.post("/register", useRegister);
userRouter.post("/login", useLogin);

export default userRouter;