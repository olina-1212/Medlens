const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const extractTextFromImage = require("../services/ocrservices");
const prisma = require("../config/prisma");

// Upload prescription
router.post(
  "/prescription",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      // OCR extraction
      const extractedText = await extractTextFromImage(req.file.path);

      // Save in DB
      const document = await prisma.document.create({
        data: {
          userId: req.user.userId,
          fileName: req.file.originalname,
          extractedText,
          fileUrl: `/uploads/${req.file.filename}`,
        },
      });

      const axios = require("axios");

await axios.post(
  `http://localhost:5000/api/ai/analyze/${document.id}`,
  {},
  {
    headers: {
      Authorization: req.headers.authorization,
    },
  }
);

      // response to frontend
      res.json({
        message: "OCR completed",
        documentId: document.id,
        extractedText,
        fileUrl: document.fileUrl,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "OCR failed",
      });
    }
  }
);

module.exports = router;