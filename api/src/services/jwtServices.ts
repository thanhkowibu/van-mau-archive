// jwtServices.ts
import jwt from "jsonwebtoken";
import db from "../db";

interface JwtPayload {
  id: number;
}

export const signAccessToken = async (payload: JwtPayload): Promise<string> => {
  const token = jwt.sign(payload, process.env.JWT_KEY_ACCESS as string, {
    expiresIn: "5s",
  });

  const tokenExpiry = new Date(Date.now() + 5 * 1000); //expired in 5s

  const q =
    "INSERT INTO vm_user_tokens (user_id, access_token, token_expiry) VALUES ($1, $2, $3)";
  await db.query(q, [payload.id, token, tokenExpiry]);

  return token;
};

export const signRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_KEY_REFRESH as string, {
    expiresIn: "1y",
  });
};

export const verifyAccessToken = async (token: string): Promise<JwtPayload> => {
  try {
    const q = "SELECT token_expiry FROM vm_user_tokens WHERE access_token = $1";
    const result = await db.query(q, [token]);

    if (!result.rows.length) {
      console.log("Token not found in the database");
      throw new Error("Token is not valid");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY_ACCESS as string
    ) as JwtPayload;

    // if (decoded.id !== result.rows[0].user_id) {
    //   console.log("Token user ID does not match");
    //   throw new Error("Token is not valid");
    // }

    return decoded;
  } catch (err) {
    throw err;
  }
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_KEY_REFRESH as string) as JwtPayload;
};

export const invalidateAccessToken = async (token: string): Promise<void> => {
  await db.query("DELETE FROM vm_user_tokens WHERE access_token = $1", [token]);
};
