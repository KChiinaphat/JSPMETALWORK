const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, authorize } = require('../middleware/auth');
const {
  uploadCertificate,
  getAllCertificates,
  deleteCertificate
} = require('../controllers/certificateController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for PDF
  },
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'file') {
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('รองรับเฉพาะไฟล์ PDF เท่านั้น'));
      }
    } else if (file.fieldname === 'logo') {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('รองรับเฉพาะไฟล์รูปภาพเท่านั้น'));
      }
    }
    cb(null, true);
  }
});

// Routes
router.post('/',
  protect,
  authorize('admin'),
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]),
  uploadCertificate
);

router.get('/', getAllCertificates);

router.delete('/:id',
  protect,
  authorize('admin'),
  deleteCertificate
);

module.exports = router; 