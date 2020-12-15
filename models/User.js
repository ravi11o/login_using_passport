var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: { type: String, required: true },
  username: String,
  email: { type: String, required: true , unique: true },
  photo: String
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);