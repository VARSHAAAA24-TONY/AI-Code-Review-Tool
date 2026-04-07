import { analyzeCodeWithAI } from './aiService.js';

async function test() {
  try {
    const res = await analyzeCodeWithAI('console.log("Hello")');
    console.log(res);
  } catch(e) {
    console.error('TEST_FAIL:', e);
  }
}

test();
