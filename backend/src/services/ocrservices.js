const Tesseract = require("tesseract.js");

const extractTextFromImage = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      "eng",
      {
        logger: (m) => console.log(m), // optional debug
      }
    );

    return result.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw error;
  }
};

module.exports = extractTextFromImage;