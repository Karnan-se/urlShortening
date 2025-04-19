import { UserService } from "../../useCase/userService";
import { UserController } from "../../adapter/controller/userController";
import { UserRepository } from "../database/repository/userRepository";
import { JwtService } from "../services/JwtService";
import { GenerteOtp } from "../services/generateOtp";

const repository = {
    userRepository : new UserRepository()
}
const service = {
    jwtService: new JwtService(),
    generateOtp : new GenerteOtp()
}


const userService = new UserService({repository , service});
export const userController = new UserController(userService)