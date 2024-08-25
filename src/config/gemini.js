import { GoogleGenerativeAI } from "@google/generative-ai";

// Make sure to replace "YOUR_API_KEY" with the actual API key
const apiKey = "AIzaSyCQmLsg8sk7XjFYavBAdzSfCqfyfjYPqwI"; 

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      // Adjust safety settings if needed
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response; 
    console.log(result.response.text());
    return response.text(); 
  } catch (error) {
    console.error("Error during AI interaction:", error);
  }
}

export default run;
