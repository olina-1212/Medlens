const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function extractMedicines(text) {
const prompt = `
You are a medical assistant.

Extract medicines from the prescription text and return ONLY valid JSON.

Format:
{
  "medicines": [
    {
      "name": "",
      "dosage": "",
      "frequency": "",
      "timing": "",
      "duration": "",
      "usage": "",
      "sideEffects": ""
    }
  ]
}

Rules:
- Return valid JSON only
- Use simple patient-friendly language
- Infer timing when possible (Morning, Afternoon, Evening, Night)
- Extract duration if mentioned
- If duration is not mentioned, return an empty string
- Explain medicine usage in simple language
- List only common side effects briefly
- No markdown
- No extra text


Prescription Text:
${text}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (err) {
    console.log("RAW AI OUTPUT:", content);
    throw new Error("Invalid JSON from Groq");
  }
}

module.exports = extractMedicines;