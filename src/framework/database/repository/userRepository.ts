import { BaseRepository } from "../../../entities/baseRepository/baseRepository"
import { IUserRepository } from "../../../entities/repository/IuserRepository"
import { IUser } from "../../../entities/user"
import { userModal } from "../modals/userModal"
import { ObjectId } from "mongoose"

export class UserRepository  extends BaseRepository<IUser> implements IUserRepository {
    constructor(){
        super(userModal) 

    }
    async findByEmail(email:string):Promise<IUser<ObjectId>>{
        try {
            const user = await userModal.findOne({email :email}).lean()
            return user as unknown as IUser<ObjectId>
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }


}