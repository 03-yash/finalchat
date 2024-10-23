const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept the file
      } else {
        cb(new Error('Only JPEG/PNG images are allowed')); // Reject the file
      }
    }
  });
  module.exports = upload;