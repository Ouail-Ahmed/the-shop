import express from "express";
import handleExpress from "../handleExpress.mjs";
import postRegister from "../controller/auth/postRegister.mjs";
import postLogin from "../controller/auth/postLogin.mjs";

const authRouter = express.Router();

authRouter.post("/register", handleExpress(postRegister));
authRouter.post("/login", handleExpress(postLogin));

export default authRouter;
