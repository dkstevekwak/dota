'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'
    });
});

app.controller('HomeController', function($scope){
    $scope.fillingSource=null;
    $scope.setImage = function(ally){
        if(ally.image) ally.image = null;
        else ally.image = $scope.fillingSource;

    };
    $scope.setPhoto = function(src){
        $scope.fillingSource=src;
    };

    $scope.allies = [
        {name: 'a', image:null},
        {name: 'b', image:null},
        {name: 'c', image:null},
        {name: 'd', image:null},
        {name: 'e', image:null}
    ];
    $scope.enemies = [
        {name: 'a', image:null},
        {name: 'b', image:null},
        {name: 'c', image:null},
        {name: 'd', image:null},
        {name: 'e', image:null}
    ];
    $scope.choices = [
        {
            heroName: 'Earthshaker',
            heroImage: null,

        },
        {
            name: 'Sven',
            source: 'http://cdn.dota2.com/apps/dota2/images/heroes/sven_hphover.png'
        },
        {
            name: 'Tiny',
            source: 'http://cdn.dota2.com/apps/dota2/images/heroes/tiny_hphover.png'
        },
        {
            name: 'Kukka',
            source: 'http://cdn.dota2.com/apps/dota2/images/heroes/kunkka_hphover.png'
        }
    ];

})