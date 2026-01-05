from flask import Flask, request, jsonify
from flask_cors import CORS
# Note: These imports are kept for your future Cloud deployment
# from google.cloud import translate_v2 as translate
# from google.cloud import aiplatform

app = Flask(__name__)
CORS(app)  # Allows your index.html to communicate with this python script

@app.route('/check', methods=['POST'])
def check_fake_news():
    # 1. Get the input text
    data = request.get_json()
    text_input = data.get('text', '')

    if not text_input:
        return jsonify({"status": "Error", "reason": "No text provided"}), 400

    # 2. Logic Layer (The "Brain")
    # In the future, you will uncomment Google Cloud Translation & Vertex AI here.
    
    # --- PROTOTYPE LOGIC ---
    fake_triggers = ["forward", "whatsapp", "viral", "guaranteed", "magic cure", "winner", "urgent"]
    suspicious_triggers = ["shocking", "unbelievable", "secret", "banned", "alert"]
    
    input_lower = text_input.lower()

    if any(word in input_lower for word in fake_triggers):
        result = {
            "status": "Likely Fake",
            "reason": "Contains spam patterns typical of misinformation.",
            "css_class": "status-fake"
        }
    elif any(word in input_lower for word in suspicious_triggers):
        result = {
            "status": "Suspicious",
            "reason": "Uses sensational language not common in verified news.",
            "css_class": "status-suspicious"
        }
    else:
        result = {
            "status": "Likely True",
            "reason": "Language appears neutral and factual.",
            "css_class": "status-true"
        }
    # -----------------------

    return jsonify(result)

if __name__ == '__main__':
    # Runs the server on port 5000
    print("Server is running on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
