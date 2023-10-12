const mongoose = require('mongoose');
require('dotenv').config();

const dbString = process.env.DATABASE_ACCESS;

function connectToDatabase() {
  mongoose.connect(dbString);

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB database');
  });

  db.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
  return db;
}

module.exports = connectToDatabase;
connectToDatabase()