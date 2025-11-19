const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Property details (could come from DB or form submission)
const propertyDetails = {
  size: "2500 sq ft",
  neighborhood: "Quiet suburban area",
  parking: "Yes, 2-car garage",
  price: "$450,000",
  builtYear: "2018"
};

// ✅ Guardrails: Forbidden words
const forbiddenWords = ["hack", "illegal", "exploit"];

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  // ✅ Validate input
  if (!prompt || prompt.length > 500) {
    return res.status(400).json({ error: "Invalid prompt" });
  }

  if (forbiddenWords.some(word => prompt.toLowerCase().includes(word))) {
    return res.status(400).json({ error: "Forbidden query" });
  }

  // ✅ Build full prompt with context and instructions
  const fullPrompt = `
You are a helpful real estate assistant. Use the property details provided below to answer questions.
If information is missing, respond with: "Sorry, that detail is not available."
Maintain a friendly and professional tone.

Property details: ${JSON.stringify(propertyDetails)}
User question: ${prompt}
`;

  try {
    
    const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDrbxz490JO7CpMzQU7KNIH_muI6e4qw3k`,
  {
    contents: [{ parts: [{ text: fullPrompt }] }]
  },
  {
    headers: { 'Content-Type': 'application/json' }
  }
);


    // ✅ Extract and return the model's response
    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    res.json({ answer });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Gemini API error' });
  }
});

app.listen(5000, () => console.log('✅ Backend running on http://localhost:5000'));