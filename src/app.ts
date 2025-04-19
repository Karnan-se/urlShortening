import express from "express"
import { ConfigKeys } from "./config"
import cookieParser from "cookie-parser"
import { connectDB } from "./framework/services/database/database"
import userRouter from "./framework/router/userRouter"
import errorHandler from "./framework/middleware/errorHandler"
import cors from "cors"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true} ))


connectDB()

app.use(cors({
    credentials:true,
    origin:[ConfigKeys.CLIENT_ORGIN],
}))

app.use("/", userRouter)







app.use(errorHandler)

app.listen(ConfigKeys.PORT , ()=> {
console.log("server Created")  })