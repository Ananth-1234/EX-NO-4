// Your OpenWeatherMap API key (replace 'YOUR_API_KEY' with the actual key)
const apiKey = 'd9ca5eeb2459ee8a8b6f1239a28c4dce';

// Elements
const cityInput = document.getElementById('cityInput');
const languageSelect = document.getElementById('languageSelect');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');
const weatherOverview = document.getElementById('weatherOverview');

// Fetch weather data
async function getWeather(city) {
    const language = languageSelect.value; // Get selected language
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${language}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
            weatherOverview.innerHTML = ''; // Clear previous overview
        }
    } catch (error) {
        weatherResult.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        weatherOverview.innerHTML = ''; // Clear previous overview
    }
}

// Display weather data
function displayWeather(data) {
    const { name, main, weather, wind, visibility } = data;

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;

    weatherOverview.innerHTML = `
        <h3>Weather Overview</h3>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Pressure: ${main.pressure} hPa</p>
        <p>Visibility: ${visibility / 1000} km</p>
    `;
}

// Add event listener to button
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

