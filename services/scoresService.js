const scoresDbHandler = require('../models/actions/scores');

class ScoresService {
    constructor() {
    }

    static getAllUserScoresByGroupId = async (groupId) => {
        const group = await scoresDbHandler.getScoresByGroupId(groupId);
        return group.rows;
    }

    static getTotalScoresByGroupId = async (groupId) => {
        const group = await scoresDbHandler.getScoresByGroupId(groupId);
        totalScores = 0;
        for (const user in group) {
            totalScores += parseInt(user.score);
        }

        return totalScores;
    }

    static getAllScoresByUserId = async (userId) => {
        const scores = await scoresDbHandler.getScoresByUserId(userId);
        return scores.rows;
    }

    static getTotalScoresByUserId = async (userId) => {
        const user = await scoresDbHandler.getScoresByUserId(userId);
        totalScores = 0;
        for (const scores in user) {
            totalScores += parseInt(scores.score);
        }

        return totalScores;
    }

    static getSpecificScoresByUserIdAndGroupId = async (userId, groupId) => {
        const respond = await scoresDbHandler.getScoresByUserIdAndGroupId(userId, groupId);
        return respond.rows[0].score;
    }

    static checkIfUserAlreadyCreatedInGroup = async (userId, groupId) => {
        return await scoresDbHandler.isUserAlreadyCreatedInGroup(userId, groupId);
    }

    static createScoreRow = async (score, userId, groupId) => {
        const isCreated = await scoresDbHandler.isUserAlreadyCreatedInGroup(userId, groupId);
        if (isCreated) {
            return scoresDbHandler.updateScoreByUserId(score, userId, groupId);
        }
        return await scoresDbHandler.createScoresByUserId(score, userId, groupId);
    }

    static updateScoreRow = async (score, userId, groupId) => {
        await scoresDbHandler.updateScoreByUserId(score, userId, groupId);
    }
}

module.exports = ScoresService;