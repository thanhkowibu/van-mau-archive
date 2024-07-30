import db from "../db/index";
import bcrypt from "bcryptjs";

export const checkUserExistence = async (username: string, email: string) => {
  const query = `SELECT * FROM vm_users WHERE username = $1 OR email = $2`;
  const data = await db.query(query, [username, email]);
  return data.rows.length > 0;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO vm_users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const data = await db.query(query, [username, email, hashedPassword]);
  return data.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const query = `SELECT * FROM vm_users WHERE email = $1`;
  const data = await db.query(query, [email]);
  return data.rows[0];
};

export const validatePassword = async (
  inputPassword: string,
  storedPassword: string
) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};
