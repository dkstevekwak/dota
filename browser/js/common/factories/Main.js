app.factory('Main', function($http, $rootScope){
    var getFriendId = function (entireString) {
      var pat = /U:1:(\d*)/g;
      var arrToReturn = [];
      var val;
      while (val = pat.exec(entireString)) {
        arrToReturn.push(val[1]);
      }
      console.log('hoping this runs before serverLog', arrToReturn);
      return arrToReturn;
    };
    var calculateGroupData = function(arr){
      if (arr && arr.length) {
        var results = [];
        arr.forEach(function(group){
          var cleanGroup = getFriendId(group);//returns the friend ids of group members
          var newGroup = [];
          cleanGroup.forEach(function(player){
            newGroup.push(player);
          })
          results.push(newGroup);
        }); //an array of arrays of friend Ids in a group
        return results.slice(-1);
      }
      else {
        return null;
      }
    }
    return{
        reportLogs: function(){
          return $http.post('/api/main/report', {
            log: $rootScope.serverLogs
          }).then(function(res){
            return "Reported";
          })
        },
        getHeroes: function(){
            return $http.get('/api/main/').then(function(res){
                return res.data;
            });
        },
        getPlayerPopulate: function(log){
          var self = this;
          var groupData = log.match(/\(Party\s\d+(\s\d:\[U:\d:\d+\])+\)/g);
          console.log('here is the group Data', groupData);
          var filteredLog = log.replace(/\(Party\s\d+(\s\d:\[U:\d:\d+\])+\)/g,"");
          var cleanGroupData = calculateGroupData(groupData);
          console.log('here is the clean Group Data! ', cleanGroupData);
          //filter out the group data
          //pass filtered data to log
          //pass group info;
          var obj = {
            log: filteredLog
          };
            return $http.post('/api/main/serverLog', obj).then(function(res){
                $rootScope.playerList1 = res.data.slice(0,5);
                $rootScope.playerList2 = res.data.slice(5);
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
                return res.data;
            });
        },
      calculateGroupData
    };
});