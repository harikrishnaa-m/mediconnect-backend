const jwt = require("jsonwebtoken");
const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  try {
    const tokenVerify = jwt.verify(token, "superkey2025");
    req.payload = tokenVerify;
    next();
  } catch (err) {
    console.log(err);
  }
};
