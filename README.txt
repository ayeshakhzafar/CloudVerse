Weather Dashboard:
Overview:
The Weather Dashboard is a responsive web application that provides real-time weather information based on user input. Users can search for weather conditions in various cities, view charts representing the weather data, and interact with a chatbot for quick weather-related queries. The application uses Tailwind CSS for styling, Chart.js for data visualization, and jQuery for dynamic content loading.

Features:
Responsive Design: Adapts to different screen sizes, ensuring a user-friendly experience on mobile devices, tablets, and desktops.
Weather Data Display: Fetches and displays current weather data, including temperature, humidity, and weather conditions.
Charts: Visualizes weather data using various chart types (temperature chart, condition chart, line chart).
Chatbot Integration: Allows users to ask weather-related questions and receive instant responses.
Sorting and Filtering: Users can sort and filter the forecast data displayed in a table.
User Location Access: Provides an option for users to fetch weather data based on their current location.

Technologies Used:
HTML5
CSS3 (Tailwind CSS)
JavaScript (jQuery)
Chart.js
OpenWeather API (for fetching weather data)
gemini chatbot API (for queries related to weather in the chat)

Installation:
Clone the repository or download the files.
Open index.html in a web browser to view the dashboard.
Ensure you have an active internet connection to fetch data from the OpenWeather API

Usage:

-> Search for Weather:

Enter the city name in the search bar and click the "Get Weather" button to fetch the weather data.
The fetched weather data will be displayed in the designated area.
-> View Charts:

After fetching the weather data, corresponding charts will be generated and displayed below the weather data.
-> Interact with the Chatbot:

Use the chatbot input field to ask questions related to the weather, and click the "Ask" button for responses.
-> Sort and Filter Forecast Data:

Use the provided buttons to sort the forecast data in ascending or descending order or filter for rainy days or the highest temperature.
-> Toggle Temperature Units:

Click the "Toggle °C/°F" button to switch between Celsius and Fahrenheit.
-> Use Current Location:

Click the "Use My Location" button to fetch the weather data based on the user's current location.

Responsive Design:
The layout has been designed to be fully responsive, adapting to various screen sizes. Here are the key responsive styles:

The sidebar and main content area adjust their widths based on the screen size.
Charts stack vertically on smaller screens.
Buttons and input fields resize to ensure usability across devices.