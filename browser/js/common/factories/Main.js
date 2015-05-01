app.factory('Main', function($http){
    return{
        getHeroes: function(){
            return $http.get('/api/main/').then(function(res){
                return res.data;
            });
        }
    };
});