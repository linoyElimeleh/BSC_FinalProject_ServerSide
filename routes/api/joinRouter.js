const authenticateToken = require('../../middleware/authorization');
const GroupService = require('../../services/groupService');
const { isUserEligibleToJoin } = require('../../middleware/groupValidations');
const router = require('express').Router();

router.post('/', authenticateToken, isUserEligibleToJoin, async (req, res) => {
    try {
        //req.group is received after isUserEligibleToJoin and req.user is received after authenticateToken
        await GroupService.addGroupMembers(req.group.id, [req.user.id]);
        res.json(req.group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;