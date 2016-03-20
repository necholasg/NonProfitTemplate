myApp.factory('storageFactory', function($http){
  factory = {};
  volunteers = [];
  emails = [];

  factory.allVolunteers = function(callback){
    $http.get('/volunteers').success(function(res){
      if(res.status == 'error'){
        console.log('error in loading volunteers');
      }else{
        volunteers = res
        callback(volunteers)
      };
    });
  };
  factory.addVolunteer = function(newVol, callback){
    $http.post('/volunteer/new', newVol).success(function(res){
      if(res.status == 'error'){
        console.log("error with adding volunteer");
      }else{
        volunteers.push(res);
        callback(volunteers);
      }
    })
  };
  factory.allEmails = function(callback){
    $http.get('/emails').success(function(res){
      if(res.status == 'error'){
        console.log('error in loading emails');
      }else{
        emails = res
        callback(emails)
      };
    });
  };
  factory.addEmails = function(email, callback){
    $http.post('/email/new', email).success(function(res){
      if(res.status == 'error'){
        console.log("error with adding email");
      }else{
        emails.push(res);
        callback(emails);
      }
    })
  };

  return factory;
})
