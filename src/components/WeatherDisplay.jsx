import './WeatherDisplay.css'; // Import the CSS file

// WeatherDisplay component responsible for displaying weather information
const WeatherDisplay = ({ weather }) => {
    return (
        <div className="weather-display"> {/* Container for weather display */}
            <h2 className="weather-city">{weather.cityName}, {weather.country}</h2> {/* Display city name and country */}
            <div className="weather-info"> {/* Container for weather information */}
                <div>
                    <p className="weather-description">{weather.description}</p> {/* Display weather description */}
                    <p className="weather-temperature">{Math.round(weather.temperature - 273.15)}°C</p> {/* Display temperature in Celsius */}
                    <p className="weather-feels-like">Feels like: {Math.round(weather.feelsLike - 273.15)}°C</p> {/* Display feels like temperature */}
                </div>
                <div>
                    <p className="weather-humidity">Humidity: {weather.humidity}%</p> {/* Display humidity */}
                    <p className="weather-wind">Wind Speed: {weather.windSpeed} m/s</p> {/* Display wind speed */}
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay; // Export the WeatherDisplay component
