import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function probe() {
  const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-2.0-flash-exp"
  ];

  for (const m of models) {
    try {
      console.log(`PROBING: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("test");
      console.log(`MATCH_FOUND: ${m}`);
      process.exit(0);
    } catch (err) {
      console.log(`FAIL: ${m} -> ${err.message}`);
    }
  }
}

probe();
