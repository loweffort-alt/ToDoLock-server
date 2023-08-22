import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_KEY, (err, decode) => {
    req.user = decode;
    next();
  });
};

//decode = {
// id: xxxxxxxx,
// iat: ********,
// exp: ---------
//}
