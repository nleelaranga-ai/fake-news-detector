function check() {
  const textInput = document.getElementById("text").value.toLowerCase();
  const resultBox = document.getElementById("result");
  const statusEl = document.getElementById("res-status");
  const reasonEl = document.getElementById("res-reason");

  resultBox.style.display = "none";
  resultBox.className = "result-box"; 

  if (!textInput.trim()) {
    alert("Please enter text.");
    return;
  }

  const fakeKeywords = ["forward", "whatsapp", "urgent", "share now", "guaranteed", "winner"];
  const suspiciousKeywords = ["shocking", "unbelievable", "secret", "banned", "alert"];

  let status = "Likely True";
  let reason = "Neutral language detected.";
  let cssClass = "status-true";

  if (fakeKeywords.some(word => textInput.includes(word))) {
    status = "Likely Fake";
    reason = "Contains spam patterns typical of misinformation.";
    cssClass = "status-fake";
  } else if (suspiciousKeywords.some(word => textInput.includes(word))) {
    status = "Suspicious";
    reason = "Uses sensational language not common in verified news.";
    cssClass = "status-suspicious";
  }

  statusEl.innerText = status;
  reasonEl.innerText = reason;
  resultBox.classList.add(cssClass);
  resultBox.style.display = "block";
}
