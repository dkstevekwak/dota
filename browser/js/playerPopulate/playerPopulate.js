'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('playerPopulate', {
        url: '/playerPopulate',
        templateUrl: 'js/playerPopulate/playerPopulate.html',
        controller: 'PlayerPopulateController'
    });
});

app.controller('PlayerPopulateController', function($modalInstance, $http, $scope, Main, $rootScope){
    $scope.playerLog = {
        content:'THIS IS JUST AN EXAMPLE. REPLACE THIS TO GET YOUR OWN DATA! 05/03/2015 - 22:27:26: =[A:1:3889796098:5450] (Lobby 24002029482067449 DOTA_GAMEMODE_AP 0:[U:1:224542810] 1:[U:1:209562277] 2:[U:1:8217205] 3:[U:1:27072270] 4:[U:1:209893205] 5:[U:1:132394434] 6:[U:1:35868425] 7:[U:1:85435507] 8:[U:1:107920660] 9:[U:1:80457091]) (Party 24002029470229550 0:[U:1:209562277] 1:[U:1:8217205] 2:[U:1:27072270] 3:[U:1:209893205])'
    };
    $scope.loading = false;
    $scope.sendLog = function(log){
        console.log('this should fire!');
        $scope.loading = true;
        $rootScope.serverLogs = log;
        Main.getPlayerPopulate(log).then(function(res){
            $scope.loading = false;
            $modalInstance.close();
        });
    };
    if ($rootScope.serverLogs) {
      $scope.sendLog($rootScope.serverLogs);
    };
});