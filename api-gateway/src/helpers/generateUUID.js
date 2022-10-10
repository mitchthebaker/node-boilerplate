const { v4 } = require("uuid");

const generateUUID = () => v4();

module.exports = generateUUID;