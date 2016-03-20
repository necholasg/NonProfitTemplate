myApp.factory('picsFactory', function($http){
  factory = {};
  pics = [];

  factory.getPics = function(callback){
    $http.get('/pics').success(function(res){
      if(res.status == 'error'){
        console.log('error in getting pics');
      }else{
        pics = res
        callback(pics)
      };
    });
  };

  factory.deletePics = function(data, callback){
    $http.post('/delPics', data).success(function(res){
      if(res.status == 'error'){
        console.log('error in deleting pics');
      }else{
        callback(res)
      };
    });
  };

  return factory;
})
