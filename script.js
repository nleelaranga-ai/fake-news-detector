// --- CONFIGURATION ---
// We use the key you provided to connect to Google Gemini
const API_KEY = "AIzaSyDXSY05LaUJJx3ZFMyqiTfd1hELKPWx-7c"; 

// Change 'gemini-pro' to 'gemini-1.5-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function check() {
  const textInput = document.getElementById("text").value;
  const resultBox = document.getElementById("result");
  const statusEl = document.getElementById("res-status");
  const reasonEl = document.getElementById("res-reason");

  // 1. Reset UI
  resultBox.style.display = "none";
  resultBox.className = "result-box"; 

  if (!textInput.trim()) {
    alert("Please enter text to analyze.");
    return;
  }

  // 2. Show Loading State
  statusEl.innerText = "Processing...";
  reasonEl.innerText = "Analyzing with Google Gemini AI...";
  resultBox.style.display = "block";
  resultBox.classList.remove("status-true", "status-fake", "status-suspicious");

  try {
    // 3. Construct the Prompt
    // We ask Gemini to handle BOTH translation and analysis here.
    const prompt = `
      Act as an expert Fact-Checker. 
      Task:
      1. Identify the language of this text: "${textInput}"
      2. If it is not English, translate it to English internally.
      3. Analyze it for misinformation patterns (sensationalism, clickbait, urgent calls to action).
      
      Respond ONLY with this JSON structure:
      {
        "status": "Likely True" or "Likely Fake" or "Suspicious",
        "reason": "Short explanation (mentioning the detected language).",
        "risk_level": "Low/Medium/High"
      }
    `;

    // 4. Call Google AI Studio API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    // 5. Parse the Response
    // (Gemini might wrap JSON in markdown, so we clean it)
    if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response from AI");
    }

    const aiText = data.candidates[0].content.parts[0].text;
    const cleanJson = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanJson);

    // 6. Update UI
    statusEl.innerText = result.status;
    reasonEl.innerText = result.reason;

    if (result.status.includes("Fake")) {
      resultBox.classList.add("status-fake");
    } else if (result.status.includes("Suspicious")) {
      resultBox.classList.add("status-suspicious");
    } else {
      resultBox.classList.add("status-true");
    }

  } catch (error) {
    console.error("Error:", error);
    statusEl.innerText = "Connection Error";
    reasonEl.innerText = "Could not reach Google AI. Please try again.";
    resultBox.classList.add("status-fake");
  }
}
