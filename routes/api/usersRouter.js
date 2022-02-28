const authenticateToken = require('../../middleware/authorization');
const dbHandler = require('../../services/models/actions/users');
const { jwtTokens } = require('../../utils/jwtUtils');
const router = require('express').Router();

router.post('/register', async (req, res) => {
    try {
        const newUser = await dbHandler.createUser(req.body);
        res.json(jwtTokens(newUser));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authenticateToken, async (req, res) => {
    try {
        await dbHandler.updateUser(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;