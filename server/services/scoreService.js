const path = require('path');

const dbService = require(path.join(__dirname, '..', 'services', 'dbService'));

const getScores = function (options) {
  return dbService.getScores(options);
};

const addScore = function (score) {
  return dbService.addScore(score);
};

const deleteScoreById = function (scoreId) {
  return dbService.deleteScoreById(scoreId);
};

module.exports = {
  getScores: getScores,
  addScore: addScore,
  deleteScoreById: deleteScoreById
};
