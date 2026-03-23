import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const extractData = async (text, question) => {
  const prompt = `
You are an AI that extracts structured information from documents.

User Question:
"${question}"

Document:
"${text}"

Instructions:
- Extract 5 to 8 key-value pairs relevant to the question
- Return ONLY valid JSON
- No explanation, no extra text

Format:
{
  "Key1": "Value1",
  "Key2": "Value2"
}
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const output = response.choices[0].message.content;

  try {
    return JSON.parse(output);
  } catch (err) {
    console.error("Invalid JSON:", output);
    return { error: "Failed to parse AI response" };
  }
};
