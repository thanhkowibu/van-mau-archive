// authorizeToken.ts
import { Request, Response, NextFunction } from "express";
import {
  invalidateAccessToken,
  signAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../services/jwtServices";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
}

export const authorizeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  const refreshToken = req.headers["x-refresh-token"] as string | undefined;

  if (!accessToken) {
    res.status(401).json("You are not authenticated");
    return;
  }

  try {
    const userInfo = await verifyAccessToken(accessToken);
    // @ts-ignore
    req.user = userInfo;
    next();
  } catch (err: any) {
    console.log(err.message);
    // Access token is expired or invalid
    if (err.message === "jwt expired" && refreshToken) {
      try {
        const userInfo = verifyRefreshToken(refreshToken);
        const accessTokenInfo = jwt.decode(accessToken) as JwtPayload;

        if (accessTokenInfo.id !== userInfo.id) {
          throw new Error(
            "Access token user ID does not match refresh token user ID"
          );
        }

        // Invalidate the old access token
        await invalidateAccessToken(accessToken);

        // Create new access token
        const newAccessToken = await signAccessToken({ id: userInfo.id });

        // Set new access token in response headers
        res.setHeader("authorization", `Bearer ${newAccessToken}`);
        // @ts-ignore
        req.user = await verifyAccessToken(newAccessToken);
        next();
      } catch (err) {
        res.status(403).json("Invalid refresh token");
      }
    } else {
      res.status(403).json("Invalid access token");
    }
  }
};
