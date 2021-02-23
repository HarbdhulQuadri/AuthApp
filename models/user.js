const mongoose =require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  profileimage: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);

var User = module.exports = mongoose.model('User', userSchema);
module.exports.CreateUser = function(newUser,callback){
    newUser.save(callback); 
}
