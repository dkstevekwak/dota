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
        console.log(heroes);
    });
    $scope.colors = {
      0: "blue",
      1: "red",
      2: "purple",
      3: "pink"
    };
    $rootScope.playerList1 = [
        {user:'player A', selectedHero: null},
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
    $scope.calculateAdvantage = function(){
      var winRate = 0.5;
      var count = 0;
      $rootScope.playerList1.forEach(function(player){
        if (player.selectedHero) {
          player.selectedHeroDetails = findHero(player);
        }
      })
    };
    function findHero(heroName, heroArr){
      for (var hero in heroArr ){
        if (hero.name == heroName) return hero;
      }
    };
    $scope.fillingSource = null;
    $scope.fillingHero = null;
    $scope.currentCategory = 'all';
    $scope.query = null;
    $scope.setChoice = function(player){
        if(player.selectedHero) player.selectedHero = null;
        else {
            player.selectedHero = $scope.fillingHero;
            var found = false;
            player.proficiency.forEach(function(each){
                var uniformName = each.name.replace(" ","-").toLowerCase();
                if (uniformName === player.selectedHero.heroName) {
                    console.log(each, player)
                    found = true;
                    player.tempHeroName = each.name;
                    player.tempGames = each.games;
                    player.tempKda = each.kda;
                    player.tempWinRate = Number(each.winRate);
                    console.log('here is tempWinRate', typeof player.tempWinRate, player.tempWinRate)
                    if(player.tempMessage) player.tempMessage = null;
                }
            });
            if (!found) {
                player.tempMessage = 'The player has no record of playing this hero';
                player.tempHeroName = null;
                player.tempGames = null;
                player.tempKda = null;
                player.tempWinRate = null;
            }
        }
    };


    $scope.getPercentage = function(w,l){
        return Math.round(parseInt(w)/(parseInt(w)+parseInt(l))*10000)/100 + "%"
    };

    $scope.editInfo = function(hero){
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
    $scope.setHero = function(hero){
        $scope.fillingHero = hero;
    };

    $scope.setCategory = function(category){
        $scope.currentCategory = category;
    };

    $scope.allies = $rootScope.playerList;
    $scope.enemies = $rootScope.playerList;
    $scope.choices = [];
        //{
        //    heroName: 'Earthshaker',
        //    heroImage: 'http://cdn.dota2.com/apps/dota2/images/heroes/earthshaker_hphover.png',
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Sven',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Tiny',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Kunkka',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Beastmaster',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Clockwerk',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Omniknight',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Huskar',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Alchemist',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Brewmaster',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Treantprotector',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Io',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Centaurwarrunner',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Timbersaw',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Bristleback',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Tusk',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Eldertitan',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Legioncommander',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Earthspirit',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Axe',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Phoenix',
        //    heroImage: null,
        //    heroType: 'strength',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Anti-mage',
        //    heroImage: null,
        //    heroType: 'agility',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //},
        //{
        //    heroName: 'Crystalmaiden',
        //    heroImage: null,
        //    heroType: 'intelligence',
        //    categories: [],
        //    statType: null,
        //    proficiency: []
        //}


});