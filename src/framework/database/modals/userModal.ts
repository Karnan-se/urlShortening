import mongoose , { Schema } from "mongoose";

const userSchema = new Schema({
    email:{type:String, required: true},
    password:{type:String},
    name:{type:String}
})

export const userModal = mongoose.model("user", userSchema)