const jwt = require('jsonwebtoken');

//Generate an access token and a refresh token for this database user
const jwtTokens = ({ id, email }) => {
  const user = { id, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
  return ({ accessToken, refreshToken });
}

const verifyToken = (token, res, callback) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
    if (error) {
      return res
        .status(error instanceof jwt.TokenExpiredError ? 401 : 403)
        .json({ error: error.message });
    }
    await callback(error, user);
  })
}

module.exports = {
  jwtTokens,
  verifyToken
};