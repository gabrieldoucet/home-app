const _ = require('lodash');
const moment = require('moment');

angular.module('homeApp')
  .controller('AddFilmController', AddFilmController);

AddFilmController.$inject = ['$state', 'dataService', 'Popeye'];

function AddFilmController ($state, dataService, Popeye) {
  const vm = this;

  vm.newFilm = {
    date: new Date(),
    unlimited: false
  };

  vm.addFilm = function () {
    const newFilm = _.clone(vm.newFilm);
    const date = _.get(newFilm, ['date']);
    _.set(newFilm, ['date'], moment(date).format('YYYY-MM-DD'));
    dataService.addFilm(newFilm).then(function (res) {
      Popeye.closeCurrentModal();
      $state.go('root.film.all', {}, { reload: true });
    }).catch(function (err) {
    });
  };

  vm.close = function () {
    Popeye.closeCurrentModal();
  }
};
