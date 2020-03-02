angular.module('homeApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService ($http) {
  const addFilm = function (newFilm) {
    return $http({
      url: 'api/film',
      method: 'POST',
      data: newFilm
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      return error;
    });
  };

  const addScore = function (newScore) {
    return $http({
      url: 'api/score',
      method: 'POST',
      data: newScore
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      return error;
    });
  };

  const deleteFilmById = function (id) {
    return $http({
      url: 'api/film/' + id,
      method: 'DELETE',
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      return error;
    });
  };

  const deleteScoreById = function (id) {
    return $http({
      url: 'api/score/' + id,
      method: 'DELETE',
    }).then(function (res) {
      return res.data;
    }).catch(function (error) {
      return error;
    });
  };

  let getFilms = function () {
    return $http({
      url: 'api/film',
      method: 'GET'
    }).then(function (res) {
      console.log(res.data);
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  };

  let getScores = function () {
    return $http({
      url: 'api/score',
      method: 'GET'
    }).then(function (res) {
      console.log(res.data);
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  };

  let getSummaries = function () {
    return $http({
      url: 'api/film/summary',
      method: 'GET'
    }).then(function (res) {
      console.log(res.data);
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  };

  return {
    addFilm: addFilm,
    addScore: addScore,
    deleteFilmById: deleteFilmById,
    deleteScoreById: deleteScoreById,
    getFilms: getFilms,
    getSummaries: getSummaries,
    getScores: getScores
  };
};
