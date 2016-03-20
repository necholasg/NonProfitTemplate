var myApp = angular.module('myApp', ['FullpageScroll', 'angularGrid', 'ui.bootstrap', 'duScroll', 'ui.router', 'ui.navbar', 'angularFileUpload']).value('duScrollDuration', 1500);

myApp.directive("scrollHide", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.scrollY >= 100) {
                 scope.start = false;
             } else {
                 scope.start = true;
             }
            scope.$apply();
        });
    };
});
myApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('index',{
        url: '/',
        templateUrl: 'static/partials/main.html'
    })
    .state('purpose',{
        url: '/purpose',
        templateUrl: 'static/partials/ourPurpose.html'
    })
    .state('history',{
        url: '/history',
        templateUrl: 'static/partials/history.html'
    })
    .state('bod',{
        url: '/bod',
        templateUrl: 'static/partials/bod.html'
    })
    .state('projects',{
        url: '/projects',
        templateUrl: 'static/partials/projects.html'
    })
    .state('faq',{
        url: '/faq',
        templateUrl: 'static/partials/faq.html'
    })
    .state('learn',{
        url: '/learn',
        templateUrl: 'static/partials/learn.html'
    })
    .state('admin',{
        url: '/admin',
        templateUrl: 'static/partials/admin.html',
        controller: 'authCtrl',
        onEnter: function($state, auth){
          if(auth.isLoggedIn()){
            $state.go('admin2');
          }
        }
    })
    .state('reg',{
        url: '/reg',
        templateUrl: 'static/partials/reg.html',
        controller: 'authCtrl',
    })
    .state('admin2',{
        url: '/admin2',
        templateUrl: 'static/partials/admin2.html',
        controller: 'authCtrl',
        onEnter: function($state, auth){
          if(!auth.isLoggedIn()){
            $state.go('admin');
          }
        }
    })

});
