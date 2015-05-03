'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('tutorial', {
        url: '/tutorial',
        templateUrl: 'js/tutorial/tutorial.html',
        controller: 'TutorialController'
    });
});

app.controller('TutorialController', function($modalInstance, $http, $scope, Main){

});