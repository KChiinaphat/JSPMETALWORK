const Certificate = require('../models/Certificate');
const path = require('path');
const fs = require('fs').promises;

// Upload certificate
exports.uploadCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาอัพโหลดไฟล์'
      });
    }

    const { title, type } = req.body;
    if (!title || !type) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
      });
    }

    // Handle logo upload if exists
    let logoData = {};
    if (req.files && req.files.logo) {
      const logoFile = req.files.logo[0];
      logoData = {
        logoUrl: `/uploads/${logoFile.filename}`,
        logoName: logoFile.originalname
      };
    }

    const certificate = new Certificate({
      title,
      type,
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname,
      ...logoData,
      uploadedBy: req.user._id
    });

    await certificate.save();

    res.status(201).json({
      success: true,
      message: 'อัพโหลดใบประกาศสำเร็จ',
      certificate
    });
  } catch (error) {
    console.error('Error uploading certificate:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการอัพโหลดใบประกาศ'
    });
  }
};

// Get all certificates
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'username');

    res.json({
      success: true,
      certificates
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลใบประกาศ'
    });
  }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบใบประกาศ'
      });
    }

    // Delete files from uploads directory
    const filePath = path.join(__dirname, '..', 'uploads', path.basename(certificate.fileUrl));
    await fs.unlink(filePath).catch(console.error);

    if (certificate.logoUrl) {
      const logoPath = path.join(__dirname, '..', 'uploads', path.basename(certificate.logoUrl));
      await fs.unlink(logoPath).catch(console.error);
    }

    await certificate.deleteOne();

    res.json({
      success: true,
      message: 'ลบใบประกาศสำเร็จ'
    });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบใบประกาศ'
    });
  }
}; 