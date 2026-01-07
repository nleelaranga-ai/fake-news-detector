const API_URL = "http://127.0.0.1:5000/check";

async function check() {
  const text = document.getElementById("text").value;
  const resultBox = document.getElementById("result");

  if (!text.trim()) {
    alert("Please enter text");
    return;
  }

  resultBox.innerHTML = "Analyzing...";
  resultBox.style.display = "block";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    });

    const data = await response.json();

    resultBox.innerHTML = `
      <b>Status:</b> ${data.status}<br>
      <b>Reason:</b> ${data.reason}<br>
      <b>Risk Level:</b> ${data.risk_level}
    `;
  } catch (err) {
    console.error(err);
    resultBox.innerHTML =
      "❌ Backend not reachable. Is python main.py running?";
  }
}
