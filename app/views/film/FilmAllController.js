const _ = require('lodash');
const moment = require('moment');

angular.module('homeApp')
  .controller('FilmAllController', filmAllController);

filmAllController.$inject = ['$state', 'dataService', 'films', 'summaries', 'Popeye'];

function filmAllController ($state, dataService, films, summaries, Popeye) {
  const vm = this;

  const NUMBER_FILMS_PER_MONTH = 2;

  vm.films = _.map(films, function (film) {
    const date = _.get(film, ['date']);
    _.set(film, ['date'], moment(date, 'YYYY-MM-DD'));
    return film;
  });

  vm.summaries = _.map(summaries, function (summary) {
    summary.start = moment(summary.start, 'YYYY-MM-DD');
    summary.end = moment(summary.end, 'YYYY-MM-DD');
    return summary;
  });

  let totalFilmCount = 0;
  _.forEach(vm.summaries, function (summary) {
    const films = _.get(summary, ['films']);
    totalFilmCount += _.size(films);
    _.set(summary, ['totalFilmCount'], totalFilmCount);

    var averageOK = (summary.id) * NUMBER_FILMS_PER_MONTH <= totalFilmCount;
    _.set(summary, ['averageOK'], averageOK);
  });

  vm.lastSummary = _.last(summaries);

  const getRemainingNumberFilmsToSee = function () {

    vm.unlimitedData = {};
    let nbSummaries = vm.summaries.length;
    let lastSummary = _.last(vm.summaries);

    // Computes the number of films remaining to see this month
    var remainingFilms = NUMBER_FILMS_PER_MONTH * nbSummaries - lastSummary.totalFilmCount;
    vm.unlimitedData.value = remainingFilms < 0 ? 0 : remainingFilms;
  };

  getRemainingNumberFilmsToSee();

  vm.show = {
    filmSummary: true,
    filmList: false,
    unlimitedSummary: true
  };

  vm.dropdownMap = {};

  vm.toggleFilmSummary = function () {
    vm.show.filmSummary = !vm.show.filmSummary;
  };

  vm.toggleFilmList = function () {
    vm.show.filmList = !vm.show.filmList;
  };


  vm.toggleUnlimitedSummary = function () {
    vm.show.unlimitedSummary = !vm.show.unlimitedSummary;
  };

  vm.toggle = function (id) {
    vm.dropdownMap[id] = !vm.dropdownMap[id];
  }

  vm.deleteFilm = function (_id) {
    dataService.deleteFilmById(_id).then(function (res) {
      console.log('success');
      $state.go('root.film.all', {}, { reload: true });
    }).catch(function (err) {

    })
  };
};
