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

    function findHero(heroName, heroArr){
      //console.log('heroArr: ', heroArr);
      //console.log('scope choices ' , $scope.choices);
      for (var hero in heroArr ){
        //console.log('hero', ' ', heroArr[hero]);
        if (heroArr[hero].heroName.replace(" ","-").toLowerCase() == heroName.toLowerCase()) return heroArr[hero];
      }
    };
    $scope.fillingSource = null;
    $scope.fillingHero = null;
    $scope.currentCategory = 'all';
    $scope.query = null;
    $scope.setChoice = function(player){
      $scope.winRate = 0;
        if(player.selectedHero) {
          player.selectedHero = null;
          player.tempHeroName = null;
        }
        else {
            player.selectedHero = $scope.fillingHero;
            var found = false;
            player.proficiency.forEach(function(each){
                console.log('here is each', each);
                if (each.name) {
                  var uniformName = each.name.replace(" ","-").toLowerCase();
                  if (uniformName === player.selectedHero.heroName) {
                    //console.log(each, player)
                    found = true;
                    player.tempHeroName = each.name;
                    player.tempGames = each.games;
                    player.tempKda = each.kda;
                    player.tempWinRate = Number(each.winRate);
                    //console.log('here is tempWinRate', typeof player.tempWinRate, player.tempWinRate)
                    if(player.tempMessage) player.tempMessage = null;
                  }
                }//error handling for bad data

            });
            if (!found) {
              $scope.choices.forEach(function(each){
                  //console.log('scope.choices causing error');
                  var uniformName = each.heroName.replace(" ","-").toLowerCase();
                  if (uniformName === player.selectedHero.heroName) {
                    //console.log(each, player)
                    found = false;
                    //console.log(each, player);
                    player.tempMessage = 'The player has no record of playing this hero, replacing with average data';
                    player.tempHeroName = each.heroName;
                    player.tempGames = "not applicable"
                    player.tempKda = each.kda;
                    //console.log(each.winRate, each.winRate == true);
                    player.tempWinRate = (each.winRate)? Number(each.winRate) : null;
                    if(player.tempMessage) player.tempMessage = null;
                  }
              });

            }

        }
        $scope.calculateAdvantage();
    };
    $scope.calculateAdvantage = function(){
      $scope.winRate = 0;
      var count = 0;
      $rootScope.playerList1.forEach(function(player1){
        if (player1.tempHeroName) {//if user chose already
          //console.log(player1.tempHeroName);
          player1.selectedHeroDetails = findHero(player1.tempHeroName, $scope.choices);
          //console.log('selectedHeroDetails', player1.selectedHeroDetails);

          $rootScope.playerList2.forEach(function(player2){
            if (player2.tempHeroName) {
              console.log('player 2 tempHeroName', player2.tempHeroName);
              for (var hero in player1.selectedHeroDetails.proficiency){
                console.log('hero.name in player1.selectedHeroProficiency', player1.selectedHeroDetails.proficiency[hero].name, ' ', player2.tempHeroName);
                if (player1.selectedHeroDetails.proficiency[hero].name.replace(" ","-").toLowerCase() == player2.tempHeroName.replace(" ","-").toLowerCase()){
                  $scope.winRate += Number(player1.selectedHeroDetails.proficiency[hero].advantage);
                }
              }
            }
          })
          console.log('the current running advantage: ', $scope.winRate);
        }
      })
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