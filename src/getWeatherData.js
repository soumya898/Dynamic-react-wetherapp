

import axios from "axios";

const API_KEY = "e482ee75fc8d71e7e22aec1bd070201e";

const getWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const makeIconURL = (iconId) =>
   `https://openweathermap.org/img/wn/${iconId}@2x.png`;
   
  try {
    const response = await axios.get(URL);
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = response.data;

    const { description, icon } = weather[0];

    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    console.log(error.message);
    
    return null;
  }
};

export default getWeatherData;
