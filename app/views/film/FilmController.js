const _ = require('lodash');
const moment = require('moment');

angular.module('homeApp')
  .controller('FilmController', filmController);

filmController.$inject = ['Popeye'];

function filmController (Popeye) {
  const vm = this;

  vm.addFilm = function () {
    // Open a modal to show the selected user profile
    var modal = Popeye.openModal({
      templateUrl: "./views/modals/add-film.html",
      controller: "AddFilmController as vm"
    });
  };
};
