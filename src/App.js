import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import hotBg from "./images/summer.jpg";
import coldBg from "./images/winter.jpg";
import "./App.css";
import Description from "./Description";
import getWeatherData from "./getWeatherData";
import Clock from "./Clock"; // Import the modified Clock component

const App = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnits] = useState("metric");
  const [city, setCity] = useState("Bhubaneswar");
  const [bg, setBg] = useState(hotBg);
  const [errors, errorMessage] = useState("");

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city, unit);
      console.log(data);
      setWeather(data);

      // Change background according to weather
      const threshold = unit === "metric" ? 20 : 60;
      if (data && data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);

      // Set date and time
      try {
        const apiKey = '261c28a5ee964b7380c9e7773922734f';
        const timePromise = axios.get(
          'https://api.ipgeolocation.io/timezone?apiKey=261c28a5ee964b7380c9e7773922734f&location='
        );
        const response = await timePromise;
        console.log(response.data)
        console.log(response.data.date)
        console.log(response.data.time_12);

        setTime(response.data.date);
        setDate(response.data.time_12);

      } catch (error) {
        console.log(error.message + " OMG error ");
        errorMessage(error.message)
      }
    };
    fetchData(city);
  }, [city, unit]);

  const handleUnits = (e) => {
    const btn = e.currentTarget;
    const currentUnit = btn.innerText.slice(1); // To check if it is C or F
    const isCelcius = currentUnit === "C";
    btn.innerText = isCelcius ? "°F" : "°C"; // If button inner text is C, then change it to F
    setUnits(isCelcius ? "imperial" : "metric");
  };

  const handleCityChange = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={handleCityChange}
                type="text"
                name="city"
                placeholder="Enter City..."
                onChange={handleCityChange}
              />
              <button onClick={(e) => handleUnits(e)}>°F</button>
              {errors && <p className="error-message">{errors}</p>}
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather-icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="section section__time_date">
                <Clock /> {/* Use the modified Clock component here */}
              </div>
              <div className=" section section__temperature">
                <h1>{`${weather.temp.toFixed()}°${unit === "metric" ? "C" : "F"}`} </h1>
              </div>
            </div>

            {/*  Description of weather */}
            <Description weather={weather} unit={unit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
