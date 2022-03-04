# Todo-Bom API
## Quick Start
1. Take a look at the README.md file in the /postgres directory and configure your postgres database
2. Run `npm install`
3. Run `app.js` to start the app

## How to use the API
1. First register a new client using the `/api/register` route. <br />
You will then receive an access token and a refresh token. <br />
Save them both somewhere safe in the client side app.
2. On every request you send to the API make sure you add the access token the a header called `Authorization`. <br />
    * When the access token expires the user needs to login again. You can do that using the `/auth/login` route.
3. In order to refresh your access token without logging in you need to send the refresh token to the `/auth/refresh_token` route.
4. A basic swagger can be found in the `/docs` route.