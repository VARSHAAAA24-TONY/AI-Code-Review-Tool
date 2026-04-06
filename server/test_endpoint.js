import axios from 'axios';

async function testAnalysis() {
  try {
    console.log("SENDING AUDIT REQUEST...");
    const response = await axios.post('http://localhost:5000/api/analyze', {
      code: "function test() { console.log('hello'); }",
      language: "javascript"
    });
    console.log("SUCCESS:", response.data);
  } catch (err) {
    if (err.response) {
      console.error("SERVER ERROR:", err.response.status, err.response.data);
    } else {
      console.error("NETWORK ERROR:", err.message);
    }
  }
}

testAnalysis();
