const mongoose = require('mongoose');
require('dotenv').config();
const dbConnectionString = process.env.DATABASE_ACCESS;

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


  require('dotenv').config();
const mongoose = require('mongoose');



// Create a MongoDB connection
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a data model/schema (assuming you have a "Contact" model)
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Add data to the database
const newContact = new Contact({
  name: 'John Doe',
  email: 'johndoe@example.com',
});

newContact.save((err, savedContact) => {
  if (err) {
    console.error('Error saving contact:', err);
  } else {
    console.log('Contact saved successfully:', savedContact);
  }
});
