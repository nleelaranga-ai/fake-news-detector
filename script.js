function check() {
  const textInput = document.getElementById("text").value.toLowerCase();
  const result = document.getElementById("result");

  // Reset display
  result.style.display = "none";
  result.className = "result"; 

  if (!textInput.trim()) {
    alert("Please paste some news text first.");
    return;
  }

  // Define Keywords for Logic
  const fakeKeywords = ["forward", "whatsapp", "share now", "urgent", "guaranteed", "winner", "magic", "cure", "viral", "prize"];
  const suspiciousKeywords = ["shocking", "unbelievable", "secret", "government", "banned", "alert", "click here", "warning"];

  let status = "Likely True";
  let reason = "The language appears neutral and factual. No manipulative patterns detected.";
  let cssClass = "true";

  // Check Patterns
  const foundFake = fakeKeywords.find(word => textInput.includes(word));
  const foundSuspicious = suspiciousKeywords.find(word => textInput.includes(word));

  if (foundFake) {
    status = "Likely Fake";
    reason = `Contains emotionally manipulative words or spam patterns (e.g., '${foundFake}').`;
    cssClass = "fake";
  } else if (foundSuspicious) {
    status = "Suspicious";
    reason = `Sensational or unverified language detected (e.g., '${foundSuspicious}').`;
    cssClass = "suspicious";
  }

  // Display Result
  result.innerHTML = `<strong>${status}</strong><br><span>${reason}</span>`;
  result.classList.add(cssClass);
  result.style.display = "block";
}
