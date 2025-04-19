import { ConfigKeys } from "../../config";
import { Response } from "express";
import { CookieOptions } from "express";

const attachTokenCookie = (cookieName: string, Token: string, res: Response) => {
    const cookieOption :CookieOptions = {
        httpOnly: true,
        secure: ConfigKeys.NODE_ENV === "production",
        signed: false,
        maxAge: cookieName === "AccessToken" ? ConfigKeys.ACCESS_TOKEN_EXPIRES_IN : ConfigKeys.REFRESH_TOKEN_EXPIRES_IN,
        sameSite: ConfigKeys.NODE_ENV === "production" ? "none" : "lax", 
    };

    try {
        res.cookie(cookieName, Token, cookieOption);
        console.log("Cookie Attached");
    } catch (error) {
        console.error(error);
    }
};

export { attachTokenCookie };
