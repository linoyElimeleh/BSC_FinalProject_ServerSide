const { v4 } = require("uuid");

const generateUuid = () => {
  return v4();
};

module.exports = {
  generateUuid,
};
