const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original name and timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only certain file types
  const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
  const extension = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(extension)) {
    return cb(null, true);
  }
  
  cb(new Error('Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.'));
};

// Configure the multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // Default 5MB
  },
  fileFilter: fileFilter
});

module.exports = upload;