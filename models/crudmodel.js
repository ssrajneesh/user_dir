const mongoose = require('mongoose');
const connectToDatabase = require('../config/db_conn');
const bcrypt = require('bcrypt');


const connection = connectToDatabase();

// Define the schema and model
const userContactSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: String,
});

const ncontact = mongoose.model('ncontact', userContactSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true, // Ensure uniqueness
  },
  password: String,
}, { collection: 'usercontacts' }); // Specify the collection name

userSchema.pre('save', function (next) {
  // Hash the password before saving it to the database
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = { ncontact,connection,User };
