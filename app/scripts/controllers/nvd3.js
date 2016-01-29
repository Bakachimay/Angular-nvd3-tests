'use strict';

/**
 * @ngdoc function
 * @name testAngularNvd3App.controller:Nvd3Ctrl
 * @description
 * # Nvd3Ctrl
 * Controller of the testAngularNvd3App
 */
angular.module('testAngularNvd3App')
  .controller('Nvd3Ctrl', ["$scope", "$http", function ($scope, $http) {
      /* Chart options */
      $scope.options = {
          chart: {
              type: 'discreteBarChart',
              height: 450,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 60,
                  left: 55
              },
              x: function (d) { return d.label; },
              y: function (d) { return d.value; },
              showValues: true,
              valueFormat: function (d) {
                  return d3.format(',.4f')(d);
              },
              transitionDuration: 500,
              xAxis: {
                  axisLabel: 'Test label X Axis'
              },
              yAxis: {
                  axisLabel: 'Y Axis',
                  axisLabelDistance: 30
              }
          }
      }

      /* Chart data */
      $scope.data = [{
          key: "Cumulative Return",
          values: [
              { "label": "A", "value": -29.765957771107 },
              { "label": "B", "value": 0 },
              { "label": "C", "value": 32.807804682612 },
              { "label": "D", "value": 196.45946739256 },
              { "label": "E", "value": 0.19434030906893 },
              { "label": "F", "value": -98.079782601442 },
              { "label": "G", "value": -13.925743130903 },
              { "label": "H", "value": -5.1387322875705 }
          ]
      }]

      $scope.options2 = {
          chart: {
              type: 'lineChart',
              height: 450,
              margin: {
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 55
              },
              x: function (d) { return d.x; },
              y: function (d) { return d.y; },
              useInteractiveGuideline: true,
              dispatch: {
                  stateChange: function (e) { console.log("stateChange"); },
                  changeState: function (e) { console.log("changeState"); },
                  tooltipShow: function (e) { console.log("tooltipShow"); },
                  tooltipHide: function (e) { console.log("tooltipHide"); }
              },
              xAxis: {
                  axisLabel: 'Months',
                  tickFormat: function (d) {
                      return new Date(parseInt(d)).getMonth();
                  }
              },
              yAxis: {
                  axisLabel: 'Sightings',
                  tickFormat: function (d) {
                      return d;
                  },
                  axisLabelDistance: -10
              },
              callback: function (chart) {
                  console.log("!!! lineChart callback !!!");
              }
          },
          title: {
              enable: true,
              text: 'Title for Line Chart'
          },
          subtitle: {
              enable: true,
              text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
              css: {
                  'text-align': 'center',
                  'margin': '10px 13px 0px 7px'
              }
          },
          caption: {
              enable: true,
              html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
              css: {
                  'text-align': 'justify',
                  'margin': '10px 13px 0px 7px'
              }
          }
      };

      $http.get('data/sightings.json').success(function (result) {
          $scope.sightings = result;
          var datas = _(result)
            .chain()
            .countBy(function (sighting) { return sighting.sightedAt.$date; })
            .pairs()
            .map(function (pair) {
                return {
                    x: pair[0],
                    y: pair[1]
                };
            })
            .sortBy(function (dateCount) { return dateCount.x; })
            .value();
          $scope.data2 = [
            { 
                values: datas,
                key: 'UFO sightings',
                color: '#ff7f0e'
            }
          ]

      })
  }]);