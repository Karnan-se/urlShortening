import mongoose  from "mongoose";
import { IUrl } from "../../../entities/IUrl";

const UrlSchema = new mongoose.Schema<IUrl>({
    urlId: {
      type: String,
      required: true,
    },
    origUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clicks:{
      type:Number,
    }
    
  },{timestamps : true});


  export const UrlModal =  mongoose.model("url", UrlSchema)