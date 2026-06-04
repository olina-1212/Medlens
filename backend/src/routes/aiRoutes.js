const express = require("express"); const router = express.Router(); 
const prisma = require("../config/prisma"); 
const authMiddleware = require("../middleware/authMiddleware"); 
const extractMedicines = require("../services/aiService");
router.post("/analyze/:id", authMiddleware, async (req, res) => {
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

    const aiResult = await extractMedicines(document.extractedText);

    res.json(aiResult);
  } catch (error) {
    console.error(error);

    // ✅ ADD THIS PART
    if (error.status === 429 || error.message?.includes("rate limit")) {
      return res.status(429).json({
        message: "AI limit reached. Please try again after some time.",
      });
    }

    res.status(500).json({
      message: "AI analysis failed",
    });
  }
});

module.exports = router;