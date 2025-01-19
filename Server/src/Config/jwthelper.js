import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export default function generateToken(user) {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    //{ expiresIn: "1d" }
  );
}
