const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dbHandler = require('../../models/actions/users');
const { jwtTokens, verifyToken } = require('../../utils/jwtUtils');
const { validatePassword } = require('../../utils/authenticationUtils');
const UserService = require('../../services/userService');

/**
 * Login request
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await dbHandler.getUserByEmail(email);
        if (users.rows.length === 0) return res.status(400).json({ error: "Email or password are incorrect" });
        //PASSWORD CHECK
        const user = users.rows[0];
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Email or password are incorrect" });
        //JWT
        const tokens = jwtTokens(user); //Gets access and refresh tokens
        await UserService.addUserRefreshToken(user.id, tokens.refreshToken);
        res.cookie('refresh_token', tokens.refreshToken, {
            ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }

});

/**
 * Return the refresh and access token
 */
router.post('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        if (refreshToken === null) return res.sendStatus(401);
        verifyToken(refreshToken, res, async (_, user) => {
            const userDetails = await UserService.getCurrentRefreshTokenIndex(user.id, refreshToken);
            if (!userDetails) return res.status(401).json({ error: "Token not found. Please relog." })
            let tokens = jwtTokens(user);
            await UserService.refreshUserToken(user.id, userDetails.position, tokens.refreshToken);
            res.cookie('refresh_token',
                tokens.refreshToken,
                {
                    ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });
            return res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

/**
 * Delete the refresh token
 */
router.delete('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        if (refreshToken === null) return res.status(404).json({ error: "Please send a refresh token." });
        verifyToken(refreshToken, res, async (_, user) => {
            await UserService.deleteUserRefreshToken(user.id, refreshToken);
            res.clearCookie('refresh_token');
            return res.status(200).json({ message: 'Refresh token deleted.' });
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;