function check() {
  const textInput = document.getElementById("text").value.toLowerCase();
  const resultBox = document.getElementById("result");
  const statusEl = document.getElementById("res-status");
  const reasonEl = document.getElementById("res-reason");
  const iconDiv = document.querySelector(".result-icon");

  // Reset logic
  resultBox.style.display = "none";
  resultBox.className = "result-box"; // Clear old status classes

  if (!textInput.trim()) {
    alert("Please paste some text to analyze.");
    return;
  }

  // Keywords
  const fakeKeywords = ["forward", "whatsapp", "urgent", "share now", "guaranteed", "winner", "viral", "magic cure"];
  const suspiciousKeywords = ["shocking", "unbelievable", "secret", "banned", "alert", "click here"];

  let status = "Likely True";
  let reason = "Content appears neutral and factual. No manipulative patterns detected.";
  let cssClass = "status-true";
  let iconHtml = '<i class="fa-solid fa-check-circle"></i>';

  // Analysis
  const foundFake = fakeKeywords.find(word => textInput.includes(word));
  const foundSuspicious = suspiciousKeywords.find(word => textInput.includes(word));

  if (foundFake) {
    status = "Likely Fake";
    reason = `Contains high-risk spam patterns or manipulation (e.g., '${foundFake}').`;
    cssClass = "status-fake";
    iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
  } else if (foundSuspicious) {
    status = "Suspicious";
    reason = `Uses sensational or unverified language (e.g., '${foundSuspicious}').`;
    cssClass = "status-suspicious";
    iconHtml = '<i class="fa-solid fa-circle-exclamation"></i>';
  }

  // Update UI
  statusEl.innerText = status;
  reasonEl.innerText = reason;
  iconDiv.innerHTML = iconHtml;
  
  resultBox.classList.add(cssClass);
  resultBox.style.display = "flex"; // Show the box
}
