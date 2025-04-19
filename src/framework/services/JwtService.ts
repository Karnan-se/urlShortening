import { ObjectId } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ConfigKeys } from "../../config";
import { IJwtService } from "../../entities/IJwtSecret";

 
const JWT_SECRET = ConfigKeys.JWT_SECRET;
const REFRESH_TOKEN_SECRET = ConfigKeys.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export class JwtService implements IJwtService {
  generateAccesSToken(userId: ObjectId | undefined | string ): string {
    return jwt.sign({ userId  }, JWT_SECRET as string, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  }

  generateRefreshToken(userId: ObjectId | undefined | string ): string {
    return jwt.sign({ userId  }, REFRESH_TOKEN_SECRET as string, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  }

  verifyAccessToken(token: string): JwtPayload & { userId: string } {
    try {
      const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload & { userId: string };
   
      return decoded;
    } catch (error) {
      throw new Error("Invalid Access Token");
    }
  }

  verifyRefreshToken(token: string): JwtPayload & { userId: string } {
    try {
      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as JwtPayload & { userId: string };
    
      return decoded;
    } catch (error) {
      throw new Error("Invalid Refresh Token");
    }
  }
}
