myApp.controller('authCtrl', function($scope, $state, auth){
  $scope.user = {};
  $scope.loggedIn = false;

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      console.log(error);
      $scope.error = error;
    }).then(function(){
      $state.go('admin2');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('admin2');
    });
  };
})

myApp.controller('NavCtrl', function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
  });
