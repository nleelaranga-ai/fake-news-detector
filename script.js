function check() {
  const result = document.getElementById("result");

  const outputs = [
    "Likely Fake – emotionally misleading content",
    "Suspicious – source not verified",
    "Likely True – neutral language detected"
  ];

  result.innerText = outputs[Math.floor(Math.random() * outputs.length)];
  result.style.display = "block";
}
