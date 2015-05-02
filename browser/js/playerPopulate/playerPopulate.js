'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('playerPopulate', {
        url: '/playerPopulate',
        templateUrl: 'js/playerPopulate/playerPopulate.html',
        controller: 'PlayerPopulateController'
    });
});

app.controller('PlayerPopulateController', function($modalInstance, $http, $scope, Main){
    $scope.playerLog = null;
    $scope.sendLog = function(log){
        Main.getPlayerPopulate(log).then(function(res){
            $modalInstance.close();
        });
    }
});