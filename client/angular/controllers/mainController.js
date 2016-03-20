myApp.controller('mainController', function($scope, $window, $location, storageFactory, picsFactory, $document ,$uibModal, angularGridInstance, FileUploader){
  $scope.start = true;
  $scope.volunteers = [];
  $scope.emails = [];
  $scope.pics = [];

  storageFactory.allVolunteers(function(data){
    $scope.volunteers = data;
  });

  storageFactory.allEmails(function(data){
    $scope.emails = data;
  });

  picsFactory.getPics(function(data){
    $scope.pics = data;
  });

  $scope.learn = function(){
    $location.path('/learn')
  }

  $scope.animationsEnabled = true;
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {}
    });
  };

  $scope.newEmail = function(){
    $scope.emailList.created_at = new Date;
    storageFactory.addEmails($scope.emailList, function(data){
      $scope.emails = data;
      $scope.emailList = {};
    })
  }

  $scope.delete = function(){
    $scope.garbage = []
    for(x in $scope.pics.Contents){
      if($scope.pics.Contents[x].selected === true){
        $scope.garbage.push($scope.pics.Contents[x].Key)
      }
    }
    picsFactory.deletePics($scope.garbage, function(res){
      for(x in $scope.pics.Contents){
        for(y in res.Deleted){
          if($scope.pics.Contents[x].Key === res.Deleted[y].Key){
            $scope.pics.Contents.splice($scope.pics.Contents.indexOf($scope.pics.Contents[x]), 1)
          }
        }
      }
    });
  }

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
  },{
    name: "Admin",
    link: "admin"
  }];

  // --------------------------File Upload---------------------------

  var uploader = $scope.uploader = new FileUploader({
            url: '/newPic',
            removeAfterUpload: true,
        });

        // CALLBACKS
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
          item.formData = [{data: 'data'}]
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            $scope.pics.Contents.push({Key:fileItem.file.name})
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

});

// -----------Modal Controller------------

angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, storageFactory) {
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.newVol = function(){
    $scope.volunteerForm.created_at = new Date;
    storageFactory.addVolunteer($scope.volunteerForm, function(data){
      if(data){
        $scope.volunteers = data;
        $scope.volunteerForm = {};
        $scope.submitted = true;
      }
    })
  }

});
