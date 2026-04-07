import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log("AVAILABLE_MODELS:");
    models.models.forEach(m => console.log(`- ${m.name}`));
  } catch (error) {
    console.error("LIST_MODELS_FAILED:", error.message);
  }
}

listModels();
