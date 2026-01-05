function check() {
  // 1. Get the input text and UI elements
  const textInput = document.getElementById("text").value.toLowerCase();
  const resultBox = document.getElementById("result");
  const statusEl = document.getElementById("res-status");
  const reasonEl = document.getElementById("res-reason");

  // 2. Reset the Result Box (hide it and remove old colors)
  resultBox.style.display = "none";
  resultBox.className = "result-box"; 

  // 3. Simple validation
  if (!textInput.trim()) {
    alert("Please enter text to analyze.");
    return;
  }

  // 4. The "Brain" - Lists of words to trigger detection
  // (Since we can't use Python on GitHub Pages, we define them here)
  const fakeKeywords = [
      "forward", "whatsapp", "urgent", "share now", 
      "guaranteed", "winner", "magic cure", "viral", 
      "lottery", "free money"
  ];
  const suspiciousKeywords = [
      "shocking", "unbelievable", "secret", 
      "banned", "alert", "exclusive"
  ];

  // 5. Default Result (Assume True)
  let status = "Likely True";
  let reason = "Language appears neutral and factual.";
  let cssClass = "status-true";

  // 6. Run the Logic
  // Check for Fake words
  if (fakeKeywords.some(word => textInput.includes(word))) {
    status = "Likely Fake";
    reason = "Contains spam patterns typical of misinformation (e.g., '" + fakeKeywords.find(word => textInput.includes(word)) + "').";
    cssClass = "status-fake";
  } 
  // Check for Suspicious words
  else if (suspiciousKeywords.some(word => textInput.includes(word))) {
    status = "Suspicious";
    reason = "Uses sensational language not common in verified news.";
    cssClass = "status-suspicious";
  }

  // 7. Display the Result
  statusEl.innerText = status;
  reasonEl.innerText = reason;
  resultBox.classList.add(cssClass); // Adds green, red, or yellow color
  resultBox.style.display = "block"; // Shows the box
}
