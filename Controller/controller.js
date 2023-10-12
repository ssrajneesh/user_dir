const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
const Joi = require('joi')
const { validateEntries } = require('../middleware/validate');
const port = process.env.DATABASE_ACCESS


const getContact = (req,res) => {
    console.log(req.body)
    res.status(200).json({ message : "Get All Contacts"})
}

const get1Contact = (req,res) => {
    console.log(req.params.id)
    res.status(200).json({message: "Get specific contact"})
}

const createContact = (req,res) => {
    console.log(req.body)
    res.status(200).json({message: "Create contact"})
}

const updateContact = (req,res) => {
    res.status(200).json({message: "Update contact"})
}

const deleteContact = (req,res) => {
    res.status(200).json({message: "Delete contact"})
}

module.exports = { getContact, get1Contact, createContact, updateContact, deleteContact }