import { ObjectId } from "mongoose"
import { IJwtService } from "../entities/IJwtSecret"
import { IUserRepository } from "../entities/repository/IuserRepository"
import { comparePassword, hashPassword } from "../framework/services/passwordService"
import AppError from "../framework/utils/appError"
import { IUser } from "../entities/user"
import { IGenerateOtp } from "../entities/IGenerateOtp"


interface Dependency{
    repository: {
        userRepository : IUserRepository
        
    },
    service :{
        jwtService :IJwtService,
         generateOtp :IGenerateOtp
    }
    
}



export class UserService {
    private userRepository 
    private jwtService
    constructor(dependancy:Dependency){
        this.userRepository = dependancy.repository.userRepository
        this.jwtService = dependancy.service.jwtService

    }

    async register(email:string , name:string, password:string){
        try {
            const hashedPassword = await hashPassword(password);
            const isExisting = await this.userRepository.findByEmail(email)
            if(isExisting){
                console.log(isExisting , "isExising")
                throw AppError.validation("user Already Registered")
            }
            const createUser = await this.userRepository.create({name, password:hashedPassword , email}) as unknown as IUser<ObjectId>
            if(!createUser){
                throw AppError.conflict("Error creating the User")
            }
            const AccessToken =  this.jwtService.generateAccesSToken(createUser._id );
            const RefreshToken = this.jwtService.generateRefreshToken(createUser._id);

            return {AccessToken, RefreshToken , createUser}
              
            
        } catch (error) {
            throw error
            
        }
    }

    async login(email:string, password:string){
        try {
            const user = await this.userRepository.findByEmail(email)
            if(!user){
                throw AppError.authentication("Email Id is not Registered")
            }
            const hashedPassword = await hashPassword(password)
            const comparedPassword = await comparePassword(password , hashedPassword)
            if(!comparedPassword){
                throw AppError.authentication("Incorrect Password")
            }
            const AccessToken =  this.jwtService.generateAccesSToken(user._id );
            const RefreshToken = this.jwtService.generateRefreshToken(user._id);
            return {AccessToken, RefreshToken , user}

            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}