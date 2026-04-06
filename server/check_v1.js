import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function checkV1() {
  const key = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;
  
  try {
    console.log("PROBING V1 ENDPOINT...");
    const res = await axios.post(url, {
      contents: [{ parts: [{ text: "test" }] }]
    });
    console.log("V1 SUCCESS!");
    process.exit(0);
  } catch (err) {
    console.log("V1 FAIL:", err.response?.status, err.response?.data);
    
    console.log("PROBING V1 LIST MODELS...");
    try {
      const listRes = await axios.get(`https://generativelanguage.googleapis.com/v1/models?key=${key}`);
      console.log("AVAILABLE MODELS (V1):", listRes.data.models.map(m => m.name));
    } catch (lerr) {
      console.log("V1 LIST FAIL:", lerr.response?.status);
    }
  }
}

checkV1();
