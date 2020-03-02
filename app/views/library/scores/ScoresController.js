angular.module('homeApp')
  .controller('ScoresController', scoresController);

scoresController.$inject = ['dataService', 'scores'];

function scoresController (dataService, scores) {
  const vm = this;
  vm.scores = scores;

  vm.addScore = function () {
    
  };

  vm.deleteScore = function (scoreId) {
//    dataService.deleteScoreById(scoreId);
  };
};
