const scores = {
    "hard": 200,
    "medium": 100,
    "easy": 50,
    "default": 50
};

const getScoreByLevel = (level) => {
    if (!level) return scores["default"];
    return scores[level.toLowercase()] || scores["default"];
};

module.exports = {
    getScoreByLevel
}