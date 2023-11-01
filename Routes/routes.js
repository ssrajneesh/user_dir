const express = require('express')
const router = express.Router()
const path = require("path") 
const multer = require("multer")
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const { getContact, get1Contact, createContact, updateContact, deleteContact,register_new, log_in,renderImageUploadForm, handleImageUpload, getImg } = require("../Controller/controller")
const { validateCreateContact, validateRegister } = require('../middleware/validate');
authenticateJWT = require("../middleware/jwt_validation")
const validateImageSize = require("../middleware/uploads_mid")
const { uploadToS3 } = require('../middleware/s3-middleware')

router.route("/user/").get(authenticateJWT,getContact).post(authenticateJWT,validateCreateContact, createContact);

router.route("/user/:id").get(authenticateJWT,get1Contact).put(authenticateJWT,updateContact).delete(authenticateJWT,deleteContact)

router.route("/user/register").post(validateRegister, register_new)

router.route("/user/login").post(log_in)

router.route("/user/upload").post(validateImageSize, handleImageUpload)

router.route("/upload").post(uploadToS3().single('file'), handleImageUpload)

router.route("/getimg").get(getImg)

module.exports = router