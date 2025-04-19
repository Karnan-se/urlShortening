import mongoose from "mongoose"
import { ConfigKeys } from "../../../config"

export const connectDB=  async()=>{
    try {
        const connect  = await mongoose.connect(ConfigKeys.MONGOURL as string)
        console.log("Database Connected")
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}