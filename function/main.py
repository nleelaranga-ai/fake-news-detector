import functions_framework
from flask import jsonify
from flask_cors import CORS, cross_origin
import vertexai
from vertexai.generative_models import GenerativeModel

# --- CONFIGURATION ---
# Replace with your actual Google Cloud Project ID
PROJECT_ID = "YOUR_PROJECT_ID_HERE" 
LOCATION = "us-central1"

# Initialize Vertex AI
try:
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    model = GenerativeModel("gemini-pro")
except Exception as e:
    print(f"Error initializing Vertex AI: {e}")
    model = None

@functions_framework.http
@cross_origin(allowed_origins="*") # Allows GitHub Pages to call this function
def check_fake_news(request):
    # 1. Handle Preflight Request (CORS)
    if request.method == 'OPTIONS':
        return ('', 204)

    # 2. Get User Input
    request_json = request.get_json(silent=True)
    if not request_json or 'text' not in request_json:
        return jsonify({"status": "Error", "reason": "No text provided"}), 400
    
    user_text = request_json['text']

    # 3. Call Google Vertex AI (Gemini Pro)
    try:
        if not model:
            return jsonify({"status": "Error", "reason": "AI Model not initialized"}), 500

        prompt = f"""
        Act as a Fake News Detector. 
        1. Detect the language of this text: "{user_text}"
        2. If not English, translate it internally.
        3. Analyze credibility.
        
        Respond ONLY in valid JSON format:
        {{
            "status": "Likely True" or "Likely Fake" or "Suspicious",
            "reason": "Short explanation (mention detected language).",
            "risk_level": "Low/Medium/High"
        }}
        """
        
        response = model.generate_content(prompt)
        
        # Clean up response (Gemini sometimes adds markdown backticks)
        clean_json = response.text.replace("```json", "").replace("```", "").strip()
        
        return clean_json, 200, {'Content-Type': 'application/json'}

    except Exception as e:
        return jsonify({"status": "Error", "reason": str(e)}), 500
