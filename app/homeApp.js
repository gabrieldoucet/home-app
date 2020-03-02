require('angular-ui-router');
require('angular-popeye');
require('jquery');
require('popper.js');
require('bootstrap');
require('lodash');
require('moment');
const angular = require('angular');
angular.module('homeApp', ['ui.router', 'pathgather.popeye']);

// Config
require('./scripts/config.js');

// Controllers
require('./views/entertainment/EntertainmentController.js');

require('./views/film/FilmController.js');
require('./views/film/FilmAllController.js');

require('./views/kitchen/KitchenController.js');

require('./views/library/LibraryController.js');
require('./views/library/scores/ScoresController.js');

require('./views/pharmacy/PharmacyController.js');

require('./views/modals/AddFilmController.js');

require('./scripts/MainController.js');

// Services
require('./scripts/services/dataService.js');

// Directives
