'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'
    });
});

app.controller('HomeController', function($http, $rootScope, $scope, Main){
    Main.getHeroes().then(function(heroes){
        $scope.choices = heroes;
    });

    $rootScope.playerList1 = [
        {user:'player A'},
        {user:'player B'},
        {user:'player C'},
        {user:'player D'},
        {user:'player E'}
    ];
    $rootScope.playerList2 = [
        {user:'player F'},
        {user:'player G'},
        {user:'player H'},
        {user:'player I'},
        {user:'player J'}
    ];
    $scope.fillingSource = null;
    $scope.currentCategory = 'all';
    $scope.query = null;
    $scope.setImage = function(ally){
        if(ally.image) ally.image = null;
        else ally.image = $scope.fillingSource;

    };

    $scope.editInfo = function(hero){
        console.log('typeof hero.categories', typeof hero.categories);
        console.log(hero.categories);
        hero.categories = hero.categories.toString().split(',');
        $http.put('/api/main/'+hero._id, hero).then(function(hero){

        });
    };
    $scope.search = function (hero){
        if(!$scope.query) return true;
        //query box has a string
        var lowercaseQuery = $scope.query.toLowerCase();
        var lowercaseName = hero.heroName.toLowerCase();
        var categoriesStr = hero.heroType;
        //var lowercaseCategories = categoriesStr.toLowerCase();
        //|| lowercaseCategories.indexOf(lowercaseQuery) > -1

        if (lowercaseName.indexOf(lowercaseQuery) > -1) {
            return true;
        }
        return false;
    };
    $scope.setPhoto = function(src){
        $scope.fillingSource=src;
        console.log(Main.playerList.slice(0,5));
        console.log($rootScope.playerList);
        console.log($scope.allies);
    };

    $scope.setCategory = function(category){
        $scope.currentCategory = category;
    };

    $scope.allies = $rootScope.playerList;
    $scope.enemies = $rootScope.playerList;
    $scope.choices = [
        {
            heroName: 'Earthshaker',
            heroImage: 'http://cdn.dota2.com/apps/dota2/images/heroes/earthshaker_hphover.png',
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Sven',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Tiny',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Kunkka',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Beastmaster',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Clockwerk',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Omniknight',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Huskar',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Alchemist',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Brewmaster',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Treantprotector',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Io',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Centaurwarrunner',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Timbersaw',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Bristleback',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Tusk',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Eldertitan',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Legioncommander',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Earthspirit',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Axe',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Phoenix',
            heroImage: null,
            heroType: 'strength',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Anti-mage',
            heroImage: null,
            heroType: 'agility',
            categories: [],
            statType: null,
            proficiency: []
        },
        {
            heroName: 'Crystalmaiden',
            heroImage: null,
            heroType: 'intelligence',
            categories: [],
            statType: null,
            proficiency: []
        }
    ];

})