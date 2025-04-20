import { UserService } from "../../useCase/userService";
import { UserController } from "../../adapter/controller/userController";
import { UserRepository } from "../database/repository/userRepository";
import { JwtService } from "../services/JwtService";
import { GenerteOtp } from "../services/generateOtp";
import { UrlRepository } from "../database/repository/urlRepository";

const repository = {
    userRepository : new UserRepository(),
    urlRepository : new UrlRepository()
}
const service = {
    jwtService: new JwtService(),
    generateOtp : new GenerteOtp()
}


const userService = new UserService({repository , service});
export const userController = new UserController(userService)