const express = require("express");
const router = express.Router();

const prisma = require("../config/prisma");
const authMiddleware = require("../middleware/authMiddleware");
const extractMedicines = require("../services/aiService");

router.post("/analyze/:id", authMiddleware, async (req, res) => {
  try {
    // ✅ CHECK 2: route hit + request id
    console.log("AI ROUTE HIT");
    console.log("DOC ID:", req.params.id);

    const document = await prisma.document.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!document) {
      console.log("DOCUMENT NOT FOUND");
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const aiResult = await extractMedicines(document.extractedText);

    // ✅ SAVE TO DATABASE (IMPORTANT FIX)
    const updatedDocument = await prisma.document.update({
      where: { id: document.id },
      data: {
        aiResult,
      },
    });

    return res.json({
      message: "AI analysis completed",
      aiResult: updatedDocument.aiResult,
    });

  } catch (error) {
    console.error(error);

    if (
      error.status === 429 ||
      error.message?.includes("rate limit")
    ) {
      return res.status(429).json({
        message: "AI limit reached. Please try again later.",
      });
    }

    return res.status(500).json({
      message: "AI analysis failed",
    });
  }
});

module.exports = router;