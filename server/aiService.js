import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const analyzeCodeWithAI = async (code) => {
  const prompt = `
    PERSONA: You are 'THE_SWISS_CONSOLE_CORE', a precision-engineered architectural intelligence. 
    VIBE: Mid-century modern, logical, high-contrast, and technically exhaustive. You speak in "Forensic Abstracts" and "Optimization Schematics."
    TASK: Perform a deep forensic audit on the provided source logic. Prioritize structural integrity, memory efficiency, and logical coherence.

    EXPECTED_OUTPUT: Return ONLY a valid JSON object. No markdown, no pre-amble.
    
    JSON_SCHEMA:
    {
      "score": number (0.0 to 10.0),
      "bugs": [{"severity": "low"|"medium"|"high", "message": "precise technical fault description", "line": number}],
      "improvements": [{"title": "Optimization Schematic Title", "before": "legacy code block", "after": "stabilized code block"}],
      "documentation": "A professional, high-vocabulary technical abstract. Focus on the 'logic archetype' and 'forensic footprint' of the source."
    }

    SOURCE_LOGIC_TO_AUDIT:
    ${code}
  `;

  try {
    console.log('[AI_CORE] DISPATCHING_GROQ_GENERATION_REQUEST...');
    
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Fast, accurate core on Groq
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1, // Ensure strict deterministic response for JSON
      response_format: { type: "json_object" } 
    });

    const text = response.choices[0].message.content;
    
    if (!text) {
      console.error('[AI_CORE] EMPTY_RESPONSE_PAYLOAD');
      throw new Error('EMPTY_AI_PAYLOAD');
    }

    const data = JSON.parse(text.trim());
    
    // Validate required fields
    if (data.score === undefined || !data.bugs || !data.improvements || !data.documentation) {
      console.error('[AI_CORE] SCHEMA_VALIDATION_FAIL:', Object.keys(data));
      throw new Error('MALFORMED_FORENSIC_DATA');
    }
    
    return data;
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '!!! AI_CORE_DESYNC_ERROR !!!');
    console.error('ERROR_MSG:', error.message);

    const status = error.status || (error.response ? error.response.status : null);
    
    if (status === 429) {
      throw new Error('ERR_QUOTA_EXCEEDED');
    }
    
    throw new Error(`AUDIT_FAULT: ${error.message || 'ENGINE_DESYNC'}`);
  }
};
