import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
    req.user = decode;
    next();
  });
};

//decode = {
// id: xxxxxxxx,
// iat: ********,
// exp: ---------
//}
