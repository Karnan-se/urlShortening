import dotenv from "dotenv"

dotenv.config();

export const ConfigKeys = {
    PORT  : process.env.PORT,
    MONGOURL: process.env.MONGOURL,
    JWT_SECRET:process.env.JWT_ACCESSTOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.JWT_REFRESHTOKEN_SECRET,
    NODE_ENV:process.env.NODE_ENV!,
    ACCESS_TOKEN_EXPIRES_IN :15 * 60 * 1000,
    REFRESH_TOKEN_EXPIRES_IN : 7 * 24 * 60 * 60 * 1000,
    CLIENT_ORGIN : process.env.NODE_ENV == "development" ? "http://localhost:5173" : "https://url-shortening-react.vercel.app",
    Email : process.env.Email,
    Mail_password : process.env.Mail_password,
    BASE_URL: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://urlshort.vingle.shop"
}