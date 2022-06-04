const authenticateToken = require('../../middleware/authorization');
const GroupService = require('../../services/groupService');
const { isUserEligibleToJoin } = require('../../middleware/groupValidations');
const { createScoreRow } = require('../../services/scoreService');
const router = require('express').Router();

router.post('/', authenticateToken, isUserEligibleToJoin, async (req, res) => {
    try {
        //req.group is received after isUserEligibleToJoin and req.user is received after authenticateToken
        await GroupService.addGroupMembers(req.group.id, [req.user.id]);
        await createScoreRow(0, req.user.id, req.group.id);
        res.json(req.group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;