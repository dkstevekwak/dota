'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ui.bootstrap', 'angular-ui-router-metatags']);

app.config(function ($urlRouterProvider, $locationProvider, MetaTagsProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
    MetaTagsProvider
      .when('home', {
        title: 'Great',
        description: 'Cool',
        fb_title: 'My title',
        fb_site_name: 'My site name',
        fb_url: 'www.blablabla.blabla',
        fb_description: 'Cool website',
        fb_type: 'Facebook type',
        fb_image: 'an_image.jpg'
      })
      .when('tutorial',{
        title: 'tutorial',
        description: function(parameter1, parameter2){
          return 'COOOOOOOL' + parameter1 + " Super " + parameter2;
        },
        robots: 'index, follow',
        keywords: 'some cool keywords'
      })
      .when('/page2/:parameter1',{
        title: 'Page 2 of ' + parameter1,
        description: 'Another great page'
      })
      .otherwise({
        title: 'otherwise',
        description: 'Another great page'
      })
      console.log('config ran');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state, $location, $window, MetaTags) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });
    $rootScope.$on('$stateChangeSuccess',
        function(event){
          if (!$window.ga)
            return;
          $window.ga('send', 'pageview', { page: $location.path() });
    });
    MetaTags.initialize();

});