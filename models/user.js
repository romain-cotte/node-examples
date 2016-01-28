var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  address: {
    street: { type: String },
    city: { type: String }
  }
});

module.exports = mongoose.model('User', UserSchema);
