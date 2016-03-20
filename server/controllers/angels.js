var mongoose = require('mongoose');
var Volunteer = mongoose.model('Volunteer');
var Email = mongoose.model('Email');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('express-jwt');
var secret = 'secret';
var auth = jwt({secret: secret, userProperty: 'payload'});

module.exports = {
  getVolunteers: function(req, res){
    Volunteer.find({}, function(err, vol){
      if(err){
        console.log('Error in Load_all');
        res.json({status: 'error'})
      }else{
        res.json(vol)
      }
    })
  },
  newVolunteer: function(req, res){
    var new_vol = new Volunteer({firstName:req.body.fName, lastName:req.body.lName, email:req.body.email, phone:req.body.phone, about:req.body.about, created_at: req.body.created_at})

    new_vol.save(function(err, vol){
      if(err){
        res.json({status:'error'})
      }else{
        res.json(vol)
      }
    })
  },
  getEmails: function(req, res){
    Email.find({}, function(err, email){
      if(err){
        console.log('Error in Load_all');
        res.json({status: 'error'})
      }else{
        res.json(email)
      }
    })
  },
  newEmail: function(req, res){
    var new_email = new Email({email: req.body.email})

    new_email.save(function(err, email){
      if(err){
        res.json({status:'error'})
      }else{
        res.json(email)
      }
    })
  },
  newReg: function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password)

    user.save(function (err){
      if(err){ return next(err); }

      return res.json({token: user.generateJWT()})
    });
  },
  logIn: function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
      if(err){ return next(err); }

      if(user){
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  }
}
