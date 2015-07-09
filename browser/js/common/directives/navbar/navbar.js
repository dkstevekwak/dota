'use strict';
app.directive('navbar', function ($modal, $rootScope, AuthService, AUTH_EVENTS, $state, Main) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            scope.reported_text = "Report this Log";
            scope.openModal = function() {
                $state.go('home');
                var modalInstance = $modal.open({
                    templateUrl: '/js/playerPopulate/playerPopulate.html',
                    controller: 'PlayerPopulateController',
                    size: 'lg'
                });
            };

            scope.openSurvey = function() {
                var modalInstance = $modal.open({
                    templateUrl: '/js/playerPopulate/survey.html',
                    controller: 'SurveyController',
                    size: 'lg'
                });
            };

            scope.reportLog = function() {
                Main.reportLogs().then(function(result){
                    scope.reported_text = result;
                });
            };

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Tutorial', state: 'tutorial' }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});