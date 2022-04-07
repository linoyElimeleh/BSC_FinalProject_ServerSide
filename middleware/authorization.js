const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwtUtils");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "Null token" });
  }
  verifyToken(token, res, (_, user) => {
    req.user = user;
    next();
  })
};

module.exports = authenticateToken;
