async function check() {
  const textInput = document.getElementById("text").value;
  const resultBox = document.getElementById("result");
  const statusEl = document.getElementById("res-status");
  const reasonEl = document.getElementById("res-reason");

  // 1. Reset UI
  resultBox.style.display = "none";
  resultBox.className = "result-box"; 

  if (!textInput.trim()) {
    alert("Please enter text.");
    return;
  }

  // 2. Show Loading State
  statusEl.innerText = "Analyzing...";
  reasonEl.innerText = "Connecting to AI server...";
  resultBox.style.display = "block";
  resultBox.classList.remove("status-true", "status-fake", "status-suspicious");

  try {
    // 3. Send data to Python Backend
    const response = await fetch("http://127.0.0.1:5000/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: textInput })
    });

    const data = await response.json();

    // 4. Update UI with Backend Result
    statusEl.innerText = data.status;
    reasonEl.innerText = data.reason;
    resultBox.classList.add(data.css_class);

  } catch (error) {
    console.error("Error:", error);
    statusEl.innerText = "Connection Error";
    reasonEl.innerText = "Could not reach the backend. Is 'main.py' running?";
    resultBox.classList.add("status-fake");
  }
}
