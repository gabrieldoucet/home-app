const express = require('express');
const _ = require('lodash');
const router = new express.Router();
const path = require('path');

const filmService = require(path.join(__dirname, '..', 'services', 'filmService'));
const logger = require(path.join(__dirname, '..', 'helpers', 'logger'));

router.get('/', function (req, res) {
  filmService.getFilms({}).then(function (data) {
    res.status(200).json(data);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

router.post('/', function (req, res) {
  const film = _.get(req, ['body']);
  filmService.addFilm(film).then(function (data) {
    res.status(200).json(true);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

router.delete('/:id', function (req, res) {
  const filmId = _.get(req, ['params', 'id']);
  filmService.deleteFilmById(filmId).then(function (data) {
    res.status(200).json(data);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

router.get('/summary', function (req, res) {
  filmService.getSummaries({}).then(function (summaries) {
    res.status(200).json(summaries);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

router.patch('/summary/:id', function (req, res) {
  const summaryId = _.get(req, ['params', 'id']);
  const summaryData = _.get(req, ['body']);
  filmService.updateSummaryById(summaryId, summaryData).then(function (data) {
    res.status(200).json(data);
  }).catch(function (err) {
    logger.error(err);
    res.status(500).json([]);
  });
});

module.exports = router;
