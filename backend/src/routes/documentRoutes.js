const express = require("express");
const router = express.Router();

const prisma = require("../config/prisma");
const authMiddleware = require("../middleware/authMiddleware");

// Get all documents of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(documents);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch documents",
    });
  }
});

// Get a single document
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const document = await prisma.document.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.json(document);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch document",
    });
  }
});

// Update OCR text
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { extractedText } = req.body;

    if (!extractedText) {
      return res.status(400).json({
        message: "Extracted text is required",
      });
    }

    const document = await prisma.document.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const updatedDocument = await prisma.document.update({
      where: {
        id: req.params.id,
      },
      data: {
        extractedText,
      },
    });

    res.json({
      message: "Document updated successfully",
      document: updatedDocument,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update document",
    });
  }
});


// ✅ ADD THIS HERE (NEW ROUTE: save AI result)
router.put("/:id/ai", authMiddleware, async (req, res) => {
  try {
    const { aiResult } = req.body;

    // 🔒 SAME OWNERSHIP CHECK (IMPORTANT)
    const document = await prisma.document.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const updatedDocument = await prisma.document.update({
      where: {
        id: req.params.id,
      },
      data: {
        aiResult,
      },
    });

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save analysis",
    });
  }
});

module.exports = router;