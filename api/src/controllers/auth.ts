import { Request, Response } from "express";
import {
  checkUserExistence,
  createUser,
  findUserByEmail,
  validatePassword,
} from "../services/authServices";
import { signAccessToken, signRefreshToken } from "../services/jwtServices";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (await checkUserExistence(username, email)) {
      return res.status(409).json("User or email already exists");
    }

    const user = await createUser(username, email, password);
    const { password: _, ...safeInfo } = user;

    const newAccessToken = await signAccessToken({ id: safeInfo.id });
    const newRefreshToken = signRefreshToken({ id: safeInfo.id });

    return res.status(200).json({
      data: safeInfo,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      message: "Register successfully",
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json("Email not found");
    }

    if (!(await validatePassword(password, user.password))) {
      return res.status(400).json("Password incorrect");
    }

    const { password: _, ...safeInfo } = user;

    const newAccessToken = await signAccessToken({ id: safeInfo.id });
    const newRefreshToken = signRefreshToken({ id: safeInfo.id });

    return res.status(200).json({
      data: safeInfo,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      message: "Login successfully",
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
