import { IBaseRepository } from "../baseRepository/IbaseRepository";
import { IUser } from "../user";
import { ObjectId } from "mongoose";

export interface IUserRepository extends IBaseRepository<IUser> {   
 findByEmail(email:string):Promise<IUser<ObjectId> |  null>
}