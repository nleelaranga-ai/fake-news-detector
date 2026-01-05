# Fake News Detection for Regional Languages

## 🚨 Problem
Fake news spreads rapidly through social media and messaging platforms, especially in regional languages, making it difficult for users to verify authenticity. Existing tools primarily focus on English, leaving a gap for regional language users.

## 💡 Solution
We have developed an AI-powered web prototype that allows users to verify news or messages in regional languages. By leveraging Google's AI technologies, the system provides an instant credibility classification (Likely True, Suspicious, or Likely Fake) to promote awareness and reduce misinformation.

---

## 🏗️ Technical Architecture

### 🖥️ Frontend Description
The frontend of the project is a simple, responsive web interface designed to allow users to easily verify the credibility of news written in regional languages. Built using HTML, CSS, and JavaScript, the interface provides a text input area where users can paste news or message content and a “Check Credibility” button to initiate analysis. The frontend displays the result in a clear and user‑friendly manner, categorizing the content as **Likely True**, **Suspicious**, or **Likely Fake**, along with a short explanation. The application is hosted using **GitHub Pages**, ensuring fast access, ease of deployment, and a smooth demonstration experience for users and judges.

### ⚙️ Backend Description
The backend is designed to handle the core processing and intelligence of the system. It receives text input from the frontend and manages the analysis workflow. In the proposed architecture, the backend translates regional‑language text into English using the **Google Cloud Translation API** and then analyzes the translated content using **Google Vertex AI’s NLP capabilities** to assess credibility, tone, and misinformation patterns. Based on this analysis, the backend generates a credibility classification and a brief reasoning, which is sent back to the frontend for display. In the current prototype, this backend logic is simulated, while the system is fully structured for future integration with real Google Cloud services.

---

## 🛠️ Google AI Tools Integrated
- **Google Vertex AI:** Used for intelligent text classification and credibility analysis.
- **Google Cloud Translation API:** Converts regional language content to English for processing.
- **Firebase Hosting / GitHub Pages:** Provides fast and secure hosting for the frontend.
- **Google Cloud Functions:** (Planned) Serverless backend to orchestrate the API calls.

## 🚀 Features
- 🌍 **Regional Language Support:** Verifies content in languages like Telugu, Hindi, and Tamil.
- ⚡ **Instant Credibility Check:** Real-time analysis of news content.
- 📱 **User-Friendly Interface:** Simple paste-and-check system.
- ☁️ **Cloud-Native:** Built on Google Cloud architecture.

## 🔗 Live Demo
[Click here to try the Fake News Detector](https://nleelaranga-ai.github.io/fake-news-detector/)

## ⚠️ Disclaimer
This project is a prototype developed for the TechSprint Hackathon. AI predictions are indicative and meant for awareness purposes only.
