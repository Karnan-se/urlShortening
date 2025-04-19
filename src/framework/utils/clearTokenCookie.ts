import { CookieOptions } from "express";
import { ConfigKeys } from "../../config";
import { Response } from "express";


export const clearTokenCookie = (cookieName: string, res: Response) => {
    const cookieOption: CookieOptions = {
        httpOnly: true,
        secure: ConfigKeys.NODE_ENV === "production",
        signed: false,
        sameSite: ConfigKeys.NODE_ENV === "production" ? "none" : "lax",
    };

    try {
        res.clearCookie(cookieName, cookieOption);
        console.log(`${cookieName} cleared`);
    } catch (error) {
        console.error(`Failed to clear ${cookieName}:`, error);
    }
};
