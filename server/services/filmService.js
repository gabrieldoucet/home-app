const _ = require('lodash');
const moment = require('moment');
const path = require('path');

const dbService = require(path.join(__dirname, '..', 'services', 'dbService'));
const logger = require(path.join(__dirname, '..', 'helpers', 'logger'));

const RENEWAL_DATE = 21;

const toEarliestMoment = function (date) {
  const newMoment = moment(date).hour(0).minute(0).second(0).millisecond(0);
  return newMoment;
};

// const toLatestMoment = function (date) {
//   const newMoment = moment(date).hour(23).minute(59).second(59).millisecond(999);
//   return newMoment;
// };

const getLowerSummaryBoundFromDate = function (date) {
  const filmMoment = moment(date);
  const filmDay = filmMoment.get('date');
  let lowerBound;
  if (filmDay >= RENEWAL_DATE) {
    lowerBound = filmMoment.date(RENEWAL_DATE);
  } else {
    lowerBound = filmMoment.subtract(1, 'month').date(RENEWAL_DATE);
  }
  return toEarliestMoment(lowerBound);
};

const createSummary = function (startDate, filmIds, id) {
  const endDate = moment(startDate).add(1, 'month').date(RENEWAL_DATE - 1).format('YYYY-MM-DD');
  const summary = {
    start: startDate,
    end: endDate,
    films: filmIds,
    id: id
  };
  return summary;
};

const addSummary = function (summaryData) {
  return dbService.addSummary(summaryData);
};

const deleteFilmById = function (filmId) {
  return dbService.deleteFilmById(filmId);
};

const findSummary = function (options) {
  return dbService.findSummary(options);
};

const getFilms = function (options) {
  const searchOptions = options || {};
  return dbService.getFilms(searchOptions);
};

const getSummaries = function (options) {
  return dbService.getSummaries(options);
};

const updateSummaryById = function (summaryId, valuesToUpdate) {
  return dbService.updateSummaryById(summaryId, valuesToUpdate);
};

/* ---------------------
-- Compound functions --
------------------------ */
const createSummaries = function (newFilmLowerBound, newFilmId) {
  return getSummaries({}).then(function (summaries) {
    const existingStartDates = _.map(summaries, function (summary) {
      return _.get(summary, ['start']);
    });
    const lastSummaryId = _.parseInt(_.get(_.last(summaries), ['id']));
    const lastExistingStartDate = _.last(existingStartDates);
    let followingStartDate = moment(lastExistingStartDate).add(1, 'month').date(RENEWAL_DATE).format('YYYY-MM-DD');
    const startDatesForCreation = [];
    while (!_.isEqual(newFilmLowerBound, followingStartDate)) {
      startDatesForCreation.push(followingStartDate);
      followingStartDate = moment(followingStartDate).add(1, 'month').date(RENEWAL_DATE).format('YYYY-MM-DD');
    }
    startDatesForCreation.push(newFilmLowerBound);
    const addSummaryPromises = _.map(startDatesForCreation, function (startDate, index) {
      let filmIds = [];
      const id = lastSummaryId + (index + 1);
      if (_.isEqual(startDate, newFilmLowerBound)) {
        filmIds = [newFilmId];
      }
      const newSummary = createSummary(startDate, filmIds, id);
      return addSummary(newSummary);
    });
    return Promise.all(addSummaryPromises);
  });
};

const updateSummaries = function (newFilm) {
  const { _id: newFilmId, date } = newFilm;
  // Get the summary lower bound based on the date the film was viewed
  const lowerBound = getLowerSummaryBoundFromDate(date).format('YYYY-MM-DD');
  // Get the matching summary form the database
  return findSummary({ start: lowerBound }).then(function (summary) {
    if (!_.isNil(summary)) {
      const { _id: summaryId, films: filmIds } = summary;
      filmIds.push(newFilmId);
      return updateSummaryById(summaryId, { films: filmIds });
    } else {
      // If summary does not exist, create the summary
      return createSummaries(lowerBound, newFilmId);
    }
  }).catch(function (error) {
    logger.error(error);
    return false;
  });
};

const addFilm = function (filmData) {
  return dbService.addFilm(filmData).then(function (doc) {
    const { unlimited } = doc;
    if (unlimited) {
      return updateSummaries(doc);
    } else {
      return doc;
    };
  });
};

module.exports = {
  addFilm: addFilm,
  addSummary: addSummary,
  findSummary: findSummary,
  getFilms: getFilms,
  getSummaries: getSummaries,
  deleteFilmById: deleteFilmById,
  updateSummaryById: updateSummaryById
};
