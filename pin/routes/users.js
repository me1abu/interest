const mongoose= require('mongoose');
const plm=require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pin');


const userSchema = mongoose.Schema({
  email: String,
  password: String,
  birthdate: Date,
});

userSchema.plugin(plm, {usernameField: 'email'});

module.exports = mongoose.model('user', userSchema);