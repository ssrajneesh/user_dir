const express = require('express')
const router = express.Router()
const path = require("path") 
const multer = require("multer")
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { getContact, get1Contact, createContact, updateContact, deleteContact,register_new, log_in,renderImageUploadForm, handleImageUpload } = require("../Controller/controller")
const { validateCreateContact, validateRegister } = require('../middleware/validate');
authenticateJWT = require("../middleware/jwt_validation")
const validateImageSize = require("../middleware/uploads_mid")

router.route("/").get(authenticateJWT,getContact).post(authenticateJWT,validateCreateContact, createContact);

router.route("/:id").get(authenticateJWT,get1Contact).put(authenticateJWT,updateContact).delete(authenticateJWT,deleteContact)

router.route("/register").post(validateRegister, register_new)

router.route("/login").post(log_in)

router.route("/upload").post(validateImageSize, handleImageUpload)

module.exports = router