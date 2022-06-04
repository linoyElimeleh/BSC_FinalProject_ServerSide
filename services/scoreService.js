const scoresDbHandler = require('../models/actions/scores');

class ScoreService {
    constructor() {
    }

    static getAllUserScoresByGroupId = async (groupId) => {
        const group = await scoresDbHandler.getScoresByGroupId(groupId);
        return group.rows;
    }

    static getTotalScoresByGroupId = async (groupId) => {
        const group = await scoresDbHandler.getScoresByGroupId(groupId);
        let totalScores = 0;
        for (let i = 0; i < group.rows.length; i++) {
            totalScores += parseInt(group.rows[i].score);
        }
        return totalScores;
    }

    static getAllScoresByUserId = async (userId) => {
        const scores = await scoresDbHandler.getScoresByUserId(userId);
        return scores.rows;
    }

    static getTotalScoresByUserId = async (userId) => {
        const user = await scoresDbHandler.getScoresByUserId(userId);
        let totalScores = 0;
        for (let i = 0; i < user.rows.length; i++) {
            totalScores += parseInt(user.rows[i].score);
        }

        return totalScores;
    }

    static getUserScoreByGroup = async (userId, groupId) => {
        const response = await scoresDbHandler.getUserScoreByGroup(userId, groupId);
        return response?.rows[0]?.score;
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

module.exports = ScoreService;