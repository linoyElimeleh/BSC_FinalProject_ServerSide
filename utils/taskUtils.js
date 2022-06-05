const scores = {
    "HARD": 200,
    "MEDIUM:": 100,
    "EASY": 50,
    "DEFAULT": 50
};

const getScoreByLevel = (level) => {
    return scores[level] || scores["DEFAULT"];
};

module.exports = {
    getScoreByLevel
}