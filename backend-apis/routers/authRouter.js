import express from 'express'
import * as authController from '../controllers/authController.js'

const authRouter = express.Router()
authRouter.post("/signup", authController.signup)
authRouter.post("/login", authController.login)
authRouter.put("/updateUser/:id", authController.updateSignup);
authRouter.get("/signup", authController.fetchSignups)
authRouter.delete("/delete/:id", authController.deleteSignups)
export default authRouter;