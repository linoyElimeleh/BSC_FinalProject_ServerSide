const authenticateToken = require('../../middleware/authorization');
const ScoreService = require('../../services/scoresService');
const {groupValidation, adminValidation, isUserEligibleToJoin} = require('../../middleware/groupValidations');
const TaskService = require('../../services/taskService');
const {taskOwnerValidation, taskReporterValidation} = require('../../middleware/taskValidation');
const router = require('express').Router();

/**
 * Return the group data by group id
 * Group data as scores and users
 */
router.get('/:group_id/usersScores', authenticateToken, groupValidation, async (req, res) => {
    try {
        const members = await ScoreService.getAllUserScoresByGroupId(req.params.group_id);
        res.json({...req.group_id, members});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Return the total scores by group id
 */
router.get('/:group_id/groupTotalScores', authenticateToken, groupValidation, async (req, res) => {
    try {
        const totalScores = await ScoreService.getTotalScoresByGroupId(req.params.group_id);
        res.json({...req.group_id, totalScores});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Return the total scores by user id
 */
router.get('/:user_id/userTotalScores', authenticateToken, groupValidation, async (req, res) => {
    try {
        const totalScores = await ScoreService.getTotalScoresByUserId(req.params.user_id);
        res.json({...req.user_id, totalScores});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Return the user scores in all his groups by user id
 */
router.get('/:user_id/groupsScores', authenticateToken, groupValidation, async (req, res) => {
    try {
        const totalScores = await ScoreService.getAllScoresByUserId(req.params.user_id);
        res.json({...req.user_id, totalScores});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Return the user scores in current group by user id and group id
 */
router.get('/:group_id/:user_id/scores', authenticateToken, groupValidation, async (req, res) => {
    try {
        const totalScores = await ScoreService.getSpecificScoresByUserIdAndGroupId(req.params.user_id, req.params.group_id);
        res.json({...req.user_id, ...req.group_id, totalScores});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * Return true if the user already created in group with scores or false if doesnt
 */
router.get('/:group_id/:user_id/isExist', authenticateToken, groupValidation, async (req, res) => {
    try {
        const isExist = await ScoreService.checkIfUserAlreadyCreatedInGroup(req.params.user_id, req.params.group_id);
        res.json({...req.user_id, ...req.group_id, isExist});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * This request adds new score row by group id and members
 */
router.post('/:group_id/:user_id/createdScore', authenticateToken, groupValidation, async (req, res) => {
    try {
        const groupId = req.params.group_id;
        const userId = req.params.user_id;
        const score = req.body.score;
        await ScoreService.createScoreRow(score, userId, groupId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * This request update new score row by group id and members
 */
router.put('/:group_id/:user_id/updateScore', authenticateToken, groupValidation, async (req, res) => {
    try {
        const groupId = req.params.group_id;
        const userId = req.params.user_id;
        const score = req.body.score;
        await ScoreService.updateScoreRow(score, userId, groupId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

/**
 * This request initialize new score row by group id and members
 */
router.put('/:group_id/:user_id/updateScore', authenticateToken, groupValidation, async (req, res) => {
    try {
        const groupId = req.params.group_id;
        const userId = req.params.user_id;
        await ScoreService.updateScoreRow(0, userId, groupId);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;