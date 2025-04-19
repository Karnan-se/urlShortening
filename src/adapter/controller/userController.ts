import { NextFunction, Request, Response } from "express";
import { UserService } from "../../useCase/userService";
import { HttpStatus } from "../../framework/utils/statusCodes";
import { attachTokenCookie } from "../../framework/utils/attachTokenCookie";
import { clearTokenCookie } from "../../framework/utils/clearTokenCookie";

export class UserController {
  private userService;
  constructor(dependency: UserService) {
    this.userService = dependency;
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;
      const {
        AccessToken,
        RefreshToken,
        createUser,
      } = await this.userService.register(email, password, name);
      attachTokenCookie("AccessToken", AccessToken, res);
      attachTokenCookie("RefreshToken", RefreshToken, res);
      res
        .status(HttpStatus.CREATED)
        .json({ user:createUser, message: "Registered Successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

login = async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {email , password} = req.body;
    const {AccessToken , RefreshToken , user} = await this.userService.login(email , password)
    attachTokenCookie("AccessToken",AccessToken , res )
    attachTokenCookie("RefreshToken",RefreshToken , res )
    res.status(HttpStatus.OK).json({user , message : "LoggedIN SuccessFully"})
    
  } catch (error) {
    console.log(error)
    next(error)
    
  }

}

logout = async(req:Request , res:Response , next:NextFunction)=>{
  try {
    clearTokenCookie("AccessToken", res);
    clearTokenCookie("RefreshToken", res);
    res.status(HttpStatus.OK).json({message : "session cleared"})   
      
  } catch (error) {
    console.log(error)
    next(error)
      
  }
}

};
