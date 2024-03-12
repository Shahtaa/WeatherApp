import { useState } from 'react'; // Import the useState hook from React
import axios from 'axios'; // Import Axios for making HTTP requests
import WeatherDisplay from './components/WeatherDisplay'; // Import the WeatherDisplay component
import './App.css'; // Import CSS file for styling

// Define the main App component
const App = () => {
  // State variables for storing city name, weather data, and error message
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // API key for accessing weather data from OpenWeatherMap API
  const API_KEY = '3bc5ee51e26a1358bc3cb72ac90f427f';

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if city input is empty
    if (!city.trim()) {
      setError('Please enter a city name'); // Set error message
      return; // Exit function
    }

    try {
      // Make API request to fetch weather data for the entered city
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

      // Extract relevant weather data from the API response
      const data = response.data;

      // Construct the weather object to match the expected structure
      const weather = {
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        cityName: data.name,
        country: data.sys.country,
        error: null // Clear any previous error message
      };

      // Update weatherData state with the extracted weather data
      setWeatherData(weather);

      // Clear any previous error message
      setError(null);
    } catch (error) {
      // Set error message if fetching weather data fails
      setError('Error fetching weather data. Please try again.');
      setWeatherData(null); // Clear weatherData state
    }
  };

  // JSX code for rendering the component
  return (
    <div className="container"> {/* Container for the entire application */}
      <h1 className="title">Weather App</h1> {/* Title of the application */}
      <form onSubmit={handleSubmit}> {/* Form for entering city name and submitting */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input" // Input field for entering city name
        />
        <button type="submit" className="button">Get Weather</button> {/* Button to submit the form */}
      </form>
      {error && <p className="error">{error}</p>} {/* Display error message if error state is not null */}
      {weatherData && <WeatherDisplay weather={weatherData} />} {/* Render WeatherDisplay component if weatherData state is not null */}
    </div>
  );
};

export default App; // Export the App component as the default export
