'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'
    });
});

app.controller('HomeController', function($http, $rootScope, $scope, Main, $location, $modal){

    Main.getHeroes().then(function(heroes){
        $scope.choices = heroes;
    }); //retrieves master hero list from server

    $scope.colors = {
      0: "blue",
      1: "red",
      2: "purple",
      3: "pink"
    }; //not necessary
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
      for (var hero in heroArr ){
        console.log('hero', ' ', heroArr[hero]);
        if (parseName(heroArr[hero].heroName) == parseName(heroName)) return heroArr[hero];
      }
    };

    $scope.winRate = 0;
    $scope.weightFactor1 = 0;
    $scope.fillingHero = null;
    $scope.currentCategory = 'all';
    $scope.query = null;
    $scope.truncateName = function(name){
        if(name.length>10) return name.substr(0,10)+"..";
        else return name;
    };
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
                if (each.name) {
                  var uniformName = parseName(each.name);
                  if (uniformName === player.selectedHero.heroName) {
                    //console.log(each, player)
                    found = true;
                    player.tempHeroName = each.name;
                    player.tempGames = each.games;
                    player.tempKda = each.kda;
                    player.tempWinRate = Number(each.winRate);
                    player.tempWeightedWinRate = (each.games >= 5) ? (player.tempWinRate * 0.15) : (0.05);
                    //console.log('here is tempWinRate', typeof player.tempWinRate, player.tempWinRate)
                    if(player.tempMessage) player.tempMessage = null;
                  }
                }// TODO error handling for bad data

            });
            if (!found) {
              $scope.choices.forEach(function(each){
                  //console.log('scope.choices causing error');
                  var uniformName = parseName(each.heroName);
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
                    player.tempWeightedWinRate = (each.games >= 5) ? (player.tempWinRate * 0.15) : (0.05);
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
          console.log(player1.tempHeroName);
          console.log($scope.choices);
          player1.selectedHeroDetails = findHero(player1.tempHeroName, $scope.choices);
          console.log('selectedHeroDetails', player1.selectedHeroDetails);

          $rootScope.playerList2.forEach(function(player2){
            if (player2.tempHeroName) {
              for (var hero in player1.selectedHeroDetails.proficiency){
                //console.log('hero.name in player1.selectedHeroProficiency', player1.selectedHeroDetails.proficiency[hero].name, ' ', player2.tempHeroName);
                if (parseName(player1.selectedHeroDetails.proficiency[hero].name) == parseName(player2.tempHeroName)){
                  $scope.winRate += Number(player1.selectedHeroDetails.proficiency[hero].advantage);
                }
              }
            }
          })
          //console.log('the current running advantage: ', $scope.winRate);
        }
      })
      $scope.calculateWeightedAdvantage();
    };
    $scope.calculateWeightedAdvantage = function(){
    $scope.weightFactor1 = 0;
    $rootScope.playerList1.forEach(function(player1){
      if (player1.tempHeroName) {//if user chose already
        console.log('p1', player1.tempWeightedWinRate);
        $scope.weightFactor1 += Number(player1.tempWeightedWinRate);
      };
    });
    $rootScope.playerList2.forEach(function(player2){
      if (player2.tempHeroName) {
        console.log('p2', player2.tempWeightedWinRate);
        $scope.weightFactor1 -= Number(player2.tempWeightedWinRate);
      };
    });
      console.log('wf1', $scope.weightFactor1);
      console.log('wr', $scope.winRate);
      $scope.weightFactor1 += Number($scope.winRate);
  };

    $scope.getPercentage = function(w,l){
        return Math.round(parseInt(w)/(parseInt(w)+parseInt(l))*10000)/100 + "%"
    };

    $scope.editInfo = function(hero){
        hero.categories = hero.categories.toString().split(',');
        $http.put('/api/main/'+hero._id, hero).then(function(hero){

        });
    };// was used to edit server side stuff
    $scope.search = function (hero){
        if(!$scope.query) return true;
        //query box has a string
        var lowercaseQuery = $scope.query.toLowerCase();
        var lowercaseName = hero.heroName.toLowerCase();
        var categoriesStr = hero.heroType;
        if (lowercaseName.indexOf(lowercaseQuery) > -1) {
            return true;
        }
        return false;
    };
    $scope.setHero = function(hero){
        $scope.fillingHero = (typeof hero === "object") ? hero : findHero(hero, $scope.choices);
    };

    $scope.setCategory = function(category){
        $scope.currentCategory = category;
        console.log($scope.currentCategory);
    };

    $scope.choices = [];
    $scope.clearHero = function(){
      $scope.fillingHero = null;
    }

    function parseName(name){
      return name.replace(" ","-").toLowerCase();
    }

    var searchObject = $location.search();
    console.log('searchObject', searchObject);
    if (searchObject.playerLogs) {
      $rootScope.playerLogs = JSON.parse(searchObject.playerLogs);
    }
    if (searchObject.logs) {
      $rootScope.serverLogs = searchObject.logs;
    }
    if ($rootScope.serverLogs && typeof $rootScope.playerLogs === "undefined") {
      $modal.open({
        templateUrl: '/js/playerPopulate/playerPopulate.html',
        controller: 'PlayerPopulateController',
        size: 'lg'
      });
    } else if ($rootScope.playerLogs) {
      var log = $rootScope.serverLogs;
      var groupData = log.match(/\(Party\s\d+(\s\d:\[U:\d:\d+\])+\)/g);
      console.log('here is the group Data', groupData);
      var filteredLog = log.replace(/\(Party\s\d+(\s\d:\[U:\d:\d+\])+\)/g,"");
      var cleanGroupData = Main.calculateGroupData(groupData);
      var res = $rootScope.playerLogs;
      $rootScope.playerList1 = res.slice(0,5);
      $rootScope.playerList2 = res.slice(5);
      $rootScope.groupData = cleanGroupData;

      if (cleanGroupData && cleanGroupData.length) {
        cleanGroupData.forEach(function(group, idx){
          group.forEach(function(playerId){
            $rootScope.playerList1.forEach(function(list1Player){
              //  console.log('pl1 test: ', list1Player.userId, ' ', playerId);
              if (list1Player.userId == playerId) {
                //console.log('we are inside');
                list1Player.color = idx;
                //console.log(list1Player);
              }
            });
            $rootScope.playerList2.forEach(function(list2Player){
              //console.log('pl2 test: ', list2Player.userId, ' ', playerId);
              if (list2Player.userId == playerId) list2Player.color = idx;
            });
            console.log($rootScope.playerList1);
            console.log($rootScope.playerList2);
          })
        });
      };
    }
});