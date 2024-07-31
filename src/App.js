import React from 'react';
import {useState, useEffect} from 'react';
import Search from "./components/search/search";
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import {WEATHER_API_URL, WEATHER_API_KEY} from "./api";

import './App.css';

//key 294a505da0eb49e1666ece86e1e99870

function App() {
    const [weather, setWeather] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);


    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forecastFetch = fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({city: searchData.label, ...weatherResponse});
                setForecast({city: searchData.label, ...forecastResponse});
            })
            .catch((err) => console.log(err));
    }
    console.log(currentWeather);
    console.log(forecast);


    console.log(weather);

    return (
        <div className="container">
            <h2>Weather App</h2>
            <Search onSearchChange={handleOnSearchChange}/>
            {currentWeather && <CurrentWeather data={currentWeather}/>}
            {forecast && <Forecast data={forecast}/>}
        </div>
    );
}

export default App;
