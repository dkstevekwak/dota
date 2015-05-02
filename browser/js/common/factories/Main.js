app.factory('Main', function($http, $rootScope){
    return{
        getHeroes: function(){
            return $http.get('/api/main/').then(function(res){
                return res.data;
            });
        },
        getPlayerPopulate: function(log){
          var self = this;
          var obj = {
            log: log
          };
            return $http.post('/api/main/serverLog', obj).then(function(res){
                self.playerList = res.data
                $rootScope.playerList1 = res.data.slice(0,5);
                $rootScope.playerList2 = res.data.slice(5);
                return res.data;
            });
        }
    };
});