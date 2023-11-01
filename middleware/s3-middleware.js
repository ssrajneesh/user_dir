const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3");

// Function to upload to S3
const uploadToS3 = () =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: "crudupdate",
      acl: 'private',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        const timestamp = Date.now();
        const path = `${file.originalname}`;
        cb(null, path);
      },
    }),
});



module.exports = { uploadToS3 };