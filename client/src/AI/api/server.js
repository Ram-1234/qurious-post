const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
export const genAI = new GoogleGenerativeAI('AIzaSyDMhDXaFOwcyKKAvroLAAFcRVEAhcK8crg');
// console.log('process.env.GEMINI_API_KEY', process.env.GEMINI_API_KEY);
// export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function RunPrompt(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  //const prompt = "Write a story about a magic backpack."
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  //console.log(text);
  return text;
}