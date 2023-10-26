const multer = require('multer');
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2 MB limit
  fileFilter, // Set the custom file filter
});

function validateImageSizeAndType(req, res, next) {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Image size exceeds 2 MB' });
      } else if (err.code === 'LIMIT_FILE_TYPES') {
        return res.status(400).json({ error: 'Invalid file type' });
      } else {
        return res.status(500).json({ error: 'Image upload failed' });
      }
    }
    next();
  });
}

module.exports = validateImageSizeAndType;
