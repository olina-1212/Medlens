const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const extractTextFromImage = require("../services/ocrservices");
const prisma = require("../config/prisma");

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

      const extractedText = await extractTextFromImage(
        req.file.buffer
      );

      const document = await prisma.document.create({
        data: {
          userId: req.user.userId,
          fileName: req.file.originalname,
          extractedText,
        },
      });

      res.json({
        message: "OCR completed",
        documentId: document.id,
        extractedText,
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