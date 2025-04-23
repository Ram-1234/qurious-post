const { GoogleGenerativeAI } = require("@google/generative-ai");

export const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY2);

export async function RunPrompt(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
