const mongoose = require('mongoose');
const connectToDatabase = require('../config/db_conn');


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

module.exports = { ncontact,connection };
