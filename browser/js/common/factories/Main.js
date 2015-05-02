app.factory('Main', function($http){
    return{
        getHeroes: function(){
            return $http.get('/api/main/').then(function(res){
                return res.data;
            });
        },
        getPlayerPopulate: function(log){
          var obj = {
            log: log
          }
            return $http.post('/api/main/serverLog', obj).then(function(res){
                return res.data;
            });
        }
    };
});