import React, { useState, useEffect } from "react";

import WeatherForm from "./WeatherForm";
import CurrentTemp from "./CurrentTemp";
import CurrentDescription from "./CurrentDescription";
import CurrentIcon from './CurrentIcon';

import "./App.css";

/*
  useState:
    weatherTemperature,setWeatherTemperature
    weatherIcon,setWeatherIcon
    weatherDescription,setWeatherDescription

  useEffect:
    asynchronous function to get the data from the weather API, will need to include each of the variables from useState in the array so it updates dynamically 

  components:
    -WeatherForm
      form component with an input
    -CurrentTemp
      should just display the current temperature after input form is submitted
    -CurrentDescription
      should just display the current description of the weather after input form is submitted
    -CurrentIcon
      should just display the current icon of the weather after the input form is submitted

  weatherResponse:
    -weatherTemperature
      jsonResponse.main.temp (remember to use setWeatherTemperature but subtract 273.15 degrees from the number)
    -weatherIcon
      jsonResponse.weather[0].icon
    -weatherDescription
      jsonResponse.weather[0].main
    -location
      jsonResponse.name
*/

function App() {
	let [weatherTemperature, setWeatherTemperature] = useState();
	let [weatherIcon, setWeatherIcon] = useState();
	let [weatherDescription, setWeatherDescription] = useState();
	let [location, setLocation] = useState("");

	const fetchData = async (location) => {
		// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1a5dd4b9100a54bbe63877ff3c7ff85c`
		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1a5dd4b9100a54bbe63877ff3c7ff85c`;

		try {
			const response = await fetch(weatherUrl);
			const jsonResponse = await response.json();

			setWeatherTemperature(Math.round(jsonResponse.main.temp - 273.15));
			setWeatherIcon(jsonResponse.weather[0].icon);
			setWeatherDescription(jsonResponse.weather[0].main);
			setLocation(jsonResponse.name);
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		fetchData(location);
	}, [weatherTemperature, weatherIcon, weatherDescription, location]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const currentLocation = e.target.location.value;
		fetchData(currentLocation);
	};

	return (
		<div className="App">
			<div>
				<WeatherForm onFormSubmit={handleFormSubmit} />
			</div>
			<div className="upper">
				<CurrentIcon weatherIcon={weatherIcon} />
				<CurrentTemp weatherTemperature={weatherTemperature} />
				<CurrentIcon weatherIcon={weatherIcon} />
			</div>
      <div>
        <CurrentDescription weatherDescription={weatherDescription}/>
      </div>
		</div>
	);
}

export default App;
