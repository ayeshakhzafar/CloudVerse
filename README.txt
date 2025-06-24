# 🌦️ Weather Dashboard with Gemini Chatbot Integration

A fully responsive weather dashboard built with **HTML, CSS, JavaScript, OpenWeather API, Chart.js**, and **Gemini Chatbot API**. This application lets users search for a city, view the current weather, 5-day forecast, interactive charts, and even chat with an AI assistant for both weather-related and general queries.

---

## 🔍 Features

### 🌍 Weather Dashboard
- **City-based Weather Info**: Displays current weather data (temperature, humidity, wind speed, etc.)
- **Dynamic Weather Widget**: Background adapts to real-time weather conditions
- **5-Day Forecast Table** with:
  - Pagination
  - Filters:
    - Sort temperatures (ascending/descending)
    - Filter by rainy days
    - Show the hottest day
- **Charts via Chart.js**:
  - 📊 **Bar Chart**: Temperature forecast
  - 🥧 **Doughnut Chart**: Distribution of weather conditions
  - 📈 **Line Chart**: Temperature trends
  - All with animations (delay, drop)

### 🤖 Chatbot Integration
- Integrated with **Gemini API**
- Smart detection of weather-related queries
- Handles both weather and general-purpose questions

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla or jQuery)
- **APIs**:
  - [OpenWeather API](https://openweathermap.org/api) – For weather data
  - [Gemini API](https://ai.google.dev/aistudio) – For chatbot
- **Charts**: [Chart.js](https://www.chartjs.org/)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

### 2. Setup API Keys
If you’re not using .env:

Replace the placeholder with your API keys inside script.js:

- const OPENWEATHER_API_KEY = "your_api_key_here";
- const GEMINI_API_KEY = "your_gemini_key_here";

### 3. Run the App
Simply open index.html in your browser. No server setup required.

## ✅ Core Functionalities

 - Current weather data (temp, humidity, wind speed, etc.)

 - 5-day forecast displayed in a table

 - Sort/filter functions on forecast

 - Animated charts with Chart.js

 - Gemini chatbot for user queries

 - Dynamic weather background

 - Error handling for invalid city names and API failures

 - Toggle temperature unit (Celsius/Fahrenheit)

 - Geolocation support (optional)

 - Loading spinner during data fetch

## 📊 Filters Implemented

- Sort by temperature (ascending & descending)

- Filter forecast to show only rainy days

- Display the day with the highest temperature

## 🌐 Live Link
https://weather-dashboard-cyan-mu.vercel.app/#s

## 📧 Contact

Built by Ayesha – aspiring MERN Stack Developer

📫 Email: ayeshakhalid.codes@gmail.com

## 📝 Credits

Weather Data: OpenWeather API

Chatbot: Gemini AI Studio

Charts: Chart.js


