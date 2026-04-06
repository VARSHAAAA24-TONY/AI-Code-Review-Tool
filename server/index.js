import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { analyzeCodeWithAI } from './aiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Reliability Handlers
process.on('uncaughtException', (err) => {
  console.error('\x1b[31m%s\x1b[0m', '!!! CRITICAL UNCAUGHT EXCEPTION !!!');
  console.error(err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\x1b[31m%s\x1b[0m', '!!! UNHANDLED REJECTION !!!');
  console.error('Reason:', reason);
});

app.use(cors());
app.use(helmet());
app.use(express.json());

// Main Analysis Route
app.post('/api/analyze', async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'BUFFER_EMPTY: NO_SOURCE_DETECTED' });
  }

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] AUDIT_REQUEST_RECEIVED: SIZE=${code.length}B`);

  try {
    const analysis = await analyzeCodeWithAI(code);
    analysis.code = code; // Attach the original code back to the result
    
    console.log(`[${timestamp}] AUDIT_COMPLETE: SCORE=${analysis.score}`);
    res.json(analysis);
  } catch (error) {
    console.error(`[${timestamp}] AUDIT_FAIL:`, error.message);
    res.status(500).json({ error: error.message || 'ENGINE_FAILURE: CORE_DESYNC' });
  }
});

// Admin Route - Analytics
app.get('/api/admin/stats', (req, res) => {
  // In a real app, these would come from DB
  res.json({
    totalUsers: 142,
    totalReviews: 843,
    avgScore: 6.8,
    criticalBugs: 124
  });
});

app.listen(PORT, () => {
  console.clear();
  console.log('\x1b[31m%s\x1b[0m', '--------------------------------------------------');
  console.log('\x1b[31m%s\x1b[0m', '   MIDNIGHT_OIL_CORE - ARCHITECTURAL_AUDIT_V2     ');
  console.log('\x1b[31m%s\x1b[0m', '--------------------------------------------------');
  console.log(`SERVER_STATUS: ONLINE`);
  console.log(`UPLINK_PORT: ${PORT}`);
  console.log(`AI_CORE: GROQ_LLAMA_3_70B`);
  console.log('--------------------------------------------------');
});

export default app;

