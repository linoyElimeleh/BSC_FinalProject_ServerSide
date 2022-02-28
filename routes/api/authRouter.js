const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dbHandler = require('../../handlers/dbHandler');
const { jwtTokens } = require('../../utils/jwtUtils');
const { validatePassword } = require('../../utils/authenticationUtils');

router.post('/login', async (req, res) => {
    try {
        console.log(req.cookies, req.get('origin'));
        const { email, password } = req.body;
        const users = await dbHandler.getUserByEmail(email);
        if (users.rows.length === 0) return res.status(401).json({ error: "Email is incorrect" });
        //PASSWORD CHECK
        const validPassword = await validatePassword(password, users.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
        //JWT
        const tokens = jwtTokens(users.rows[0]);//Gets access and refresh tokens
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

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        console.log(req.cookies);
        if (refreshToken === null) return res.sendStatus(401);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let tokens = jwtTokens(user);
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

router.delete('/refresh_token', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'Refresh token deleted.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});



module.exports = router;