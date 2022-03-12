const jwt = require('jsonwebtoken');

//Generate an access token and a refresh token for this database user
const jwtTokens = ({ id, email }) => {
  const user = { id, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
  return ({accessToken, refreshToken});
}

module.exports = { jwtTokens };