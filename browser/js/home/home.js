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
        if(!$scope.fillingSource) $scope.fillingSource = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco';
        else ally.image = $scope.fillingSource;
    };
    $scope.setPhoto = function(src){
        $scope.fillingSource=src;
    };

    $scope.allies = [
        {name: 'a', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'b', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'c', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'd', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'e', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'}
        ];
    $scope.enemies = [
        {name: 'a', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'b', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'c', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'd', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'},
        {name: 'e', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rYcZZ-h7M0cnzgg1Psb-TuerzrZjYDyHruOduTafZi_Rcjco'}
    ];
    $scope.choices = [
        {
            name: 'Earthshaker',
            source:'http://cdn.dota2.com/apps/dota2/images/heroes/earthshaker_hphover.png'
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