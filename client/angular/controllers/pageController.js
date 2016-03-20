myApp.controller('pageController', function($scope, $window, $location, storageFactory, $document){
  $scope.tree = [{
    name: "Our Purpose",
    link: "purpose"
  }, {
    name: "History",
    link: "history"
  },{
    name: "Board of Directors",
    link: "bod"
  },{
    name: "Projects",
    link: "projects"
  },{
    name: "FAQ",
    link: "faq"
  }];
});
