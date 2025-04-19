import { Document } from "mongoose";

export interface IUrl extends Document {
  urlId: string;
  origUrl: string;
  shortUrl: string;
  clicks :number;
  createdAt?: Date;
  updatedAt?: Date;
}
