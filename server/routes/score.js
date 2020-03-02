const express = require('express');
const _ = require('lodash');
const router = new express.Router();
const path = require('path');

const scoreService = require(path.join(__dirname, '..', 'services', 'scoreService'));
const logger = require(path.join(__dirname, '..', 'helpers', 'logger'));

router.get('/', function (req, res) {
  scoreService.getScores({}).then(function (scores) {
    res.status(200).json(scores);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

router.post('/', function (req, res) {
  const score = _.get(req, ['body']);
  scoreService.addScore(score).then(function (data) {
    res.status(200).json(data);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

router.delete('/:id', function (req, res) {
  const scoreId = _.get(req, ['params', 'id']);
  scoreService.deleteScoreById(scoreId).then(function (data) {
    res.status(200).json(data);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

module.exports = router;
