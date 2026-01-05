import functions_framework
from google.cloud import translate_v2 as translate
from google.cloud import aiplatform

# --- CONFIGURATION ---
PROJECT_ID = "your-google-cloud-project-id"  # You'd replace this in a real deploy
LOCATION = "us-central1"

@functions_framework.http
def check_fake_news(request):
    # 1. Handle CORS (So your website can talk to this script)
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    headers = {'Access-Control-Allow-Origin': '*'}

    # 2. Get the input text
    request_json = request.get_json(silent=True)
    if not request_json or 'text' not in request_json:
        return ({"error": "No text provided"}, 400, headers)
    
    text_input = request_json['text']

    try:
        # 3. Translate Regional Text -> English
        # (This requires a Google Cloud Service Account in a real environment)
        translate_client = translate.Client()
        translation = translate_client.translate(text_input, target_language='en')
        translated_text = translation['translatedText']

        # 4. Analyze Credibility (Vertex AI Logic)
        # In this prototype code, we simulate the AI logic for demonstration
        # In production, you would uncomment the Vertex AI Prediction lines below:
        # endpoint = aiplatform.Endpoint(endpoint_name="projects/.../endpoints/...")
        # prediction = endpoint.predict(instances=[{"content": translated_text}])
        
        # --- LOGIC FOR PROTOTYPE ---
        fake_triggers = ["forward", "whatsapp", "viral", "guaranteed", "magic cure"]
        
        if any(word in translated_text.lower() for word in fake_triggers):
            result = {
                "status": "Likely Fake",
                "reason": "Suspicious viral patterns detected in text.",
                "type": "fake"
            }
        else:
            result = {
                "status": "Likely True",
                "reason": "Language appears neutral and factual.",
                "type": "true"
            }
        # ---------------------------

        return (result, 200, headers)

    except Exception as e:
        # Fallback if API fails (e.g., no credentials found locally)
        return ({"error": str(e)}, 500, headers)
