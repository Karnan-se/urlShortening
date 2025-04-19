import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtService } from "../services/JwtService";
import { attachTokenCookie } from "../utils/attachTokenCookie";
import { HttpStatus } from "../utils/statusCodes";
import { ObjectId } from "mongoose";

const jwtService = new JwtService();

const jwtAuth :RequestHandler = async (req:Request, res: Response, next : any) => {
  const accessToken = req.cookies["AccessToken"];
  const refreshToken = req.cookies["RefreshToken"];

  if (!refreshToken) {
    console.log("token is missing");
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ err: "Token is Missing", name: "TokenMissingError" });
  }

  try {
    if (accessToken) {
      const { userId } = jwtService.verifyAccessToken(accessToken);

     

      if (userId ) {

        (req as any)["userId"] = userId;

        return next();
      }
    }
  } catch (err: any) {
    console.log("Access token verification failed:", err.message);
  }

  try {
    const refreshTokenResponse = jwtService.verifyRefreshToken(refreshToken);

    const { userId } = refreshTokenResponse;
    console.log(`User ID: ${userId}`);



    const newAccessToken = jwtService.generateAccesSToken(
      refreshTokenResponse.userId,
    
    );

    attachTokenCookie("AccessToken", newAccessToken, res);
    console.log("accessTOken is expired but we has refreshTOken");

    (req as any)["userId"] = refreshTokenResponse.userId;
    return next();
  } catch (error: any) {
    console.log("Refresh token verification failed:", error.message);
    return res.status(HttpStatus.FORBIDDEN).json({ err: "Refresh Token is Invalid" });
  }
};

export default jwtAuth;
