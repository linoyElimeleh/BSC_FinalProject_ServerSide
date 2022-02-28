const jwt = require('jsonwebtoken');

//Generate an access token and a refresh token for this database user
const jwtTokens = ({ id, display_name, email }) => {
  const user = { id, display_name, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60m' });
  return ({ accessToken, refreshToken });
}

module.exports = { jwtTokens };