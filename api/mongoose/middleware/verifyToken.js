import jwt from "jsonwebtoken";
import { promisify } from "util";

const verifyJwt = promisify(jwt.verify);

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.session_token;

  if (!token) {
    return res.status(401).json({ message: "Session expired or no token found!" });
  }

  try {
    const payload = await verifyJwt(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired, please log in again." });
    }
    return res.status(403).json({ message: "Token is not valid!" });
  }
};