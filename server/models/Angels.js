var mongoose = require('mongoose');

var volunteerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  about: String,
  created_at: Date
})
mongoose.model('Volunteer', volunteerSchema);

var emailListSchema = new mongoose.Schema({
  email: String
})
mongoose.model('Email', emailListSchema);
