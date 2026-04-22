const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const Question = require("../models/Question");
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });


const result = await model.generateContent({
  contents: [{
      parts: [{
  text: `
Answer the question in plain text.

Rules:
- Maximum 3 lines
- No markdown formatting
- Do not use symbols like #, *, -, **
- No headings
- No bold or italics
- Use simple sentences only

Question: ${question}

Answer:
`
}]
    }
  ]
});
const response = result.response.text();
const saved = await Question.create({
  question,
  answer: response,
});

console.log("Saved:");
    res.json({ answer: response });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};