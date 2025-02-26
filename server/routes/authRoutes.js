const express = require("express");
const { signUp, signIn } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", (req, res) => res.send({ message: "Sign Out" }));

module.exports = authRouter;

 
