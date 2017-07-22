'use strict';

angular.module('adf.widget.nucleon', ['adf.provider','chart.js'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('nucleon', {
        title: 'nucleon',
        description: 'Show report for nucleon',
        templateUrl: '{widgetsPath}/nucleon/src/view.html',
        controller: 'nucleonVisulizationController',
        controllerAs: 'nucleon',
        edit: {
          templateUrl: '{widgetsPath}/nucleon/src/edit.html'
        }
      });
  })  
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }])
  .controller('nucleonVisulizationController', ['$scope','$rootScope','$timeout','$sce',function($scope,$rootScope,$timeout,$sce, config){
	    $scope.myController = this;

	    $rootScope.$on('EVENT_GlobalSetting_TimeRangeFilters' , function(event,date){
	        $scope.myController.fromTime = date.startDate;
	        $scope.myController.toTime = date.endDate;
	        console.log("nucleonVisulizationController New start Date Set " + $scope.myController.fromTime.toISOString());
	        console.log("nucleonVisulizationController New end Date Set " + $scope.myController.toTime.toISOString());
	    });
	    $scope.closeFilterAlert = function() {
	    	$scope.myController.fromTime = null;
	    	$scope.myController.toTime = null;
	    };
		
	    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	    $scope.series = ['Series A', 'Series B'];
	    $scope.data = [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90]
	    ];
	    $scope.onClick = function (points, evt) {
	      console.log(points, evt);
	    };
	    
	    // Simulate async data update
	    $timeout(function () {
	      $scope.data = [
	        [28, 48, 40, 19, 86, 27, 90],
	        [65, 59, 80, 81, 56, 55, 40]
	      ];
	    }, 3000);
}]);;
