const scores = {
    "hard": 200,
    "medium": 100,
    "easy": 50,
    "default": 50
};

const getScoreByLevel = (level) => {
    if (!level || typeof level !== "string") return scores["default"];
    return scores[level.toLowerCase()] || scores["default"];
};

module.exports = {
    getScoreByLevel
}