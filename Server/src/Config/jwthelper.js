import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { 
    //expiresIn: "1d"
     });
  return token;
};

export default generateToken;
