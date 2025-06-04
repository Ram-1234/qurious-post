import { GoogleGenAI } from "@google/genai";
//console.log(process.env.REACT_APP_GEMINI_API_KEY)

export const genAI = new GoogleGenAI({apiKey:process.env.REACT_APP_GEMINI_API_KEY});

export async function RunPrompt(prompt) {
  const response = genAI.models.generateContent({ model: "gemini-2.0-flash",contents :prompt});
  console.log("Result:", response);
  //const response = await result.response;
  //console.log("Response:", response);
  const text = response.text;
  return text;
}
