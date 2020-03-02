const _ = require('lodash');
const path = require('path');

const FilmModel = require(path.join(__dirname, '..', 'models', 'filmModel'));
const ScoreModel = require(path.join(__dirname, '..', 'models', 'scoreModel'));
const SummaryModel = require(path.join(__dirname, '..', 'models', 'summaryModel'));

const logger = require(path.join(__dirname, '..', 'helpers', 'logger'));

const addFilm = function (filmData) {
  const newFilm = new FilmModel(filmData);
  return newFilm.save().then(function (doc) {
    return doc;
  }).catch(function (error) {
    logger.error(error);
    return false;
  });
};

const addSummary = function (summaryData) {
  const newSummary = new SummaryModel(summaryData);
  return newSummary.save().then(function (doc) {
    return doc;
  }).catch(function (error) {
    logger.error(error);
    return false;
  });
};

const addScore = function (score) {
  const newScore = new ScoreModel(score);
  return newScore.save().then(function (doc) {
    return true;
  }).catch(function (error) {
    logger.error(error);
    return false;
  });
};

const deleteFilmById = function (filmId) {
  return FilmModel.deleteOne({ _id: filmId }).exec().then(function (response) {
    return true;
  }).catch(function (error) {
    logger.error(error);
    return false;
  });
};

const deleteScoreById = function (id) {
  return ScoreModel.deleteOne({ _id: id }).exec().then(function (response) {
    return true;
  }).catch(function (error) {
    logger.error(error);
    return false;
  });
};

const findSummary = function (options) {
  return SummaryModel.findOne(options).exec().then(function (doc) {
    return doc;
  }).catch(function (error) {
    logger.error(error);
    return null;
  });
};

const getFilms = function (searchOptions) {
  return FilmModel.find(searchOptions).exec().then(function (films) {
    films = _.sortBy(films, ['date', 'title']);
    return films;
  }).catch(function (err) {
    logger.error(err);
    return [];
  });
};

const getScores = function (options) {
  const searchOptions = options || {};
  return ScoreModel.find(searchOptions).exec().then(function (scores) {
    scores = _.sortBy(scores, ['composer', 'title']);
    return scores;
  }).catch(function (err) {
    logger.error(err);
    return [];
  });
};

const getSummaries = function (options) {
  const searchOptions = options;
  _.set(searchOptions, ['films'], { $exists: true });
  const pipeline = [
    { $match: searchOptions },
    {
      $lookup: {
        from: 'films',
        localField: 'films',
        foreignField: '_id',
        as: 'films'
      }
    }
  ];
  return SummaryModel.aggregate(pipeline).exec().then(function (summaries) {
    summaries = _.sortBy(summaries, ['start']);
    _.forEach(summaries, function (summary) {
      const filmCount = _.size(_.get(summary, ['films']));
      _.set(summary, ['filmCount'], filmCount);
    });
    return summaries;
  }).catch(function (err) {
    logger.error(err);
    return [];
  });
};

const updateSummaryById = function (summaryId, valuesToUpdate) {
  return SummaryModel.updateOne({ _id: summaryId }, valuesToUpdate).exec().then(function (doc) {
    return doc;
  }).catch(function (error) {
    logger.error(error);
    return false;
  });
};

module.exports = {
  addFilm: addFilm,
  addScore: addScore,
  addSummary: addSummary,
  deleteFilmById: deleteFilmById,
  deleteScoreById: deleteScoreById,
  findSummary: findSummary,
  getFilms: getFilms,
  getScores: getScores,
  getSummaries: getSummaries,
  updateSummaryById: updateSummaryById
};
