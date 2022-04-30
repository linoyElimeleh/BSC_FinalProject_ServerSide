const authenticateToken = require('../../middleware/authorization');
const UserService = require('../../services/userService');
const router = require('express').Router();
const {encryptPassword, validatePassword} = require("../../utils/authenticationUtils");

/**
 * Return the user details by email
 */
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await UserService.getCurrentUserDetails(userId);
        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Return the user task in the group by userId and groupId
 */
router.get('/me/tasks', authenticateToken, async (req, res) => {
    try {
        const groupId = req.query.groupId;
        const userId = req.user.id;
        const tasks = await UserService.getCurrentUserTasks(userId, groupId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * This request returns the groups of the user
 */
router.get('/me/groups', authenticateToken, async (req, res) => {
    try {
        const groups = await UserService.getCurrentUserGroups(req.user.id);
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Register to our app request with body contains email,password, display_name, birth_date, image
 */
router.post('/register', async (req, res) => {
    try {
        const newUser = await UserService.registerUser(req.body);
        res.json(newUser);
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ error: 'Email already exist.' });
            return;
        }
        res.status(500).json({ error: error.message });
    }
});

/**
 * This request update user by body contains : id, display_name, image
 */
router.put('/', authenticateToken, async (req, res) => {
    try {
        await UserService.updateUser(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Thie request changing password by userId, and body contains oldPassword and newPassword.
 */
router.put('/changePassword', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const body = req.body;

        // check validation
        const oldPassword = await UserService.getCurrentPassword(userId);
        const validPassword = await validatePassword(body.oldPassword, oldPassword);
        if (!validPassword) return res.status(400).json({error: "Password is incorrect"});

        // update password
        const userDetails = await UserService.changePassword(userId, body);

        res.json(userDetails);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;