const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { getContact, get1Contact, createContact, updateContact, deleteContact } = require("../Controller/controller")
const { validateCreateContact } = require('../middleware/validate');

router.route("/").get(getContact).post(validateCreateContact, createContact);

router.route("/:id").get(get1Contact).put(updateContact).delete(deleteContact)

module.exports = router