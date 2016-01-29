'use strict';

/**
 * @ngdoc overview
 * @name testAngularNvd3App
 * @description
 * # testAngularNvd3App
 *
 * Main module of the application.
 */
angular
  .module('testAngularNvd3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/nvd3_chart.html',
        controller: 'Nvd3Ctrl',
        controllerAs: 'ndv3'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
