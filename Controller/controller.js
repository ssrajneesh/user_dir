const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
const Joi = require('joi')
const { validateEntries } = require('../middleware/validate');
const port = process.env.DATABASE_ACCESS
const { ncontact, connection, User } = require('../models/crudmodel');
const jwt = require('jsonwebtoken');
const {getObjectURL} = require('../middleware/s3cred');
const s3 = require('../config/s3');

const getImg = async (req,res) =>{      
    const {img} = req.query
    try{
        const signedUrl = await s3.getSignedUrl('getObject', {
            Bucket: "crudupdate",
            Key: img,
            Expires: 3600,
          });
        console.log(signedUrl)
        res.status(201).json({"link":signedUrl});
    } catch (error) {
        res.status(401).json({ error: error.message });
    }   
}

const getContact = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const docs = parseInt(req.query.docs) || 2;
        const nameFilter = req.query.name;
        const skip = (page - 1) * docs;
        let query = ncontact.find();
        // if (nameFilter) {
        //     query = query.where({ name: new RegExp(nameFilter, 'i') });
        // }
        if (nameFilter) {
            query = query.where({ name: nameFilter }); // Exact match for name
        }
        const contacts = await query
            .skip(skip)
            .limit(docs);
            res.render('contacts', { contacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const get1Contact = async (req, res) => {
    const  {id}  = req.params;
    try {
        const contact = await ncontact.findOne({ email: id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        const newContact = new ncontact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateContact = async (req, res) => {
    const { id } = req.params; // Assuming that contactId contains the email
    try {
        const updatedContact = await ncontact.findOneAndUpdate({ email: id }, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedContact = await ncontact.findOneAndDelete({ email: id });
        if (deletedContact !== null) {
            return res.status(200).json(deletedContact);
        } else {
            return res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const register_new = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      const user = new User({ name, email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Registration failed' });
    }
  };

const log_in = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !user.validatePassword(password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' });
    }
  };


const handleImageUpload = (req, res) => {
    const uploadedImage = req.file.location;
    console.log(uploadedImage)
    if (!uploadedImage){
    res.send('Attach image!');
    }
    res.send('Image uploaded successfully!');
  }

  

  
module.exports = { getContact, get1Contact, createContact, updateContact, deleteContact, register_new, log_in, handleImageUpload, getImg}