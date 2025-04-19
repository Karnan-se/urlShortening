import bcrypt  from "bcrypt"
export const hashPassword =  async(password :string) =>{
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword

}

export const comparePassword = async(password :string, savedPassword:string) =>{
    const hashedPassword = await bcrypt.compare(password , savedPassword)
    return hashedPassword
}