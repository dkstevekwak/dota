'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('survey', {
        url: '/survey',
        templateUrl: 'js/playerPopulate/survey.html',
        controller: 'SurveyController'
    });
});

app.controller('SurveyController', function($modalInstance, $http, $scope, Main){
});