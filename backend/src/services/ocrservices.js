const Tesseract = require("tesseract.js");

const extractTextFromImage = async (imageBuffer) => {
  try {
    const result = await Tesseract.recognize(
      imageBuffer,
      "eng"
    );

    return result.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw error;
  }
};

module.exports = extractTextFromImage;