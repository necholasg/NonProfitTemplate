var angels = require('../controllers/angels.js');
var s3 = require('s3');
var jwt = require('express-jwt');
var secret = 'secret';
var auth = jwt({secret: secret, userProperty: 'payload'});
var fs = require('fs');


module.exports = function(app, client){
  app.get('/volunteers', function(req, res){
    angels.getVolunteers(req, res)
  });

  app.post('/volunteer/new', function(req, res){
    console.log(req.body);
    angels.newVolunteer(req, res)
  });

  app.get('/emails', function(req, res){
    angels.getEmails(req, res)
  });

  app.post('/email/new', function(req, res){
    angels.newEmail(req, res)
  });

  app.get('/pics', function(req, res){
    var params = {
      s3Params: {
        Bucket: 'YourBucketName'
      },
    };

    var list = client.listObjects(params);
    list.on('progress',function(){
      // console.log("progress", list.progressAmount);
    })
    list.on('error',function(err){
      // console.error("unable to list:", err.stack);
    })
    list.on('end',function(){
      // console.log('Finished!');
    })
    list.on('data',function(data){
      // console.log(data);
      res.json(data);
    })

  });

  app.post('/register', function(req, res, next){
    angels.newReg(req, res, next)
  });

  app.post('/login', function(req, res, next){
    angels.logIn(req, res, next)
  });

  app.post('/delPics', function(req, res){
    var delPics = req.body;
    var s3Params = {
        Bucket: 'YourBucketName',
        Delete: {
          Objects: []
        },
      };
    for(var i = 0; i<delPics.length; i++){
      s3Params.Delete.Objects.push({Key:delPics[i]});
    };

    var list = client.deleteObjects(s3Params);
    list.on('progress',function(){
      // console.log("progress", list.progressAmount);
    })
    list.on('error',function(err){
      // console.error("unable to list:", err.stack);
    })
    list.on('end',function(){
      // console.log('Finished!');
    })
    list.on('data',function(data){
      // console.log(data);
      res.json(data);
    })

  });

  app.post('/newPic', function(req, res){
    console.log("HERE", req.file);
    var params = {
      localFile: "/location/toYour/uploads/"+req.file.filename,

      s3Params: {
        Bucket: "YourBucketName",
        Key: req.file.originalname,
      },
    };

    var uploader = client.uploadFile(params);

    uploader.on('error', function(err) {
      console.error("unable to upload:", err.stack);
    });
    uploader.on('progress', function() {
      console.log("progress", uploader.progressMd5Amount,
                uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', function() {
      console.log("done uploading");
      res.json({data: req.file.filename})
      fs.exists('/location/toYour/uploads/'+req.file.filename, function(exists){
        if(exists){
          console.log('File exists. Deleting now ...');
          fs.unlink('/location/toYour/uploads/'+req.file.filename);
        }else{
          console.log('No file to delete');
        }
      });
    });
  });
}
