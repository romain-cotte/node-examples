const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  address: {
    street: { type: String },
    city: { type: String }
  },
  pets: [{ type: String }],
  test: Object
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
