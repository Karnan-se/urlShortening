import express, { Router } from  "express"
import { UserDataSanitzer } from "../middleware/userValidation"
import { userController } from "../dependency/userDependency"
import { urlController } from "../dependency/urlDependency"
import jwtAuth from "../middleware/authentication"

const userRouter = express.Router()



userRouter.post("/register", UserDataSanitzer , (req, res, next)=>userController.register(req,res,next) )
userRouter.post("/login", (req, res, next)=>userController.login(req, res, next))
userRouter.post("/url", jwtAuth ,  (req, res, next) => urlController.createUrl(req, res, next));
userRouter.get("/url/:urlId",  (req, res, next) => urlController.getOrigUrl(req, res, next));
userRouter.get("/logout", (req , res , next)=> userController.logout(req, res, next))




export default userRouter

