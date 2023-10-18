const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
const Joi = require('joi')
const { validateEntries } = require('../middleware/validate');
const port = process.env.DATABASE_ACCESS
const { ncontact, connection } = require('../models/crudmodel');

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
        res.status(200).json(contacts);
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

module.exports = { getContact, get1Contact, createContact, updateContact, deleteContact }