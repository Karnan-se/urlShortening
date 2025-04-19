import { ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IJwtService {
  generateAccesSToken(userId: ObjectId | string | undefined): string;
  generateRefreshToken(userId: ObjectId | string | undefined): string;
  verifyAccessToken(token: string): JwtPayload & { userId: string };
  verifyRefreshToken(token: string): JwtPayload & { userId: string };
}
