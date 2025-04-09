import React, { useEffect, useRef, useState } from 'react';
import './weather.css';

const WeatherApp = () => {

  const inputRef = useRef();
  const [cityWeather, setCityWeather] = useState(false);
  
    const search = async(city)=>{
      if(city === ""){
        alert("Enter City Name");
        return;
      }
        try{
             const apiKey = import.meta.env.VITE_APP_ID;
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
            const response = await fetch(url);
            const data= await response.json(); 
            console.log(data);
            setCityWeather({
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              temperature: Math.floor(data.main.temp),
              location: data.name,
              description: data.weather[0].description
            })
        }catch(error){
          setCityWeather(false);
          console.error("Error in fetching weather data");
        }
    }
  
    useEffect(()=>{
        
    },[])

     return (
          <div className="weather-container">
      <div className="cloud cloud-top-right" />
      <div className="cloud cloud-bottom-left" />

      <div className="search-bar">
        <span  className="search-icon">🔍</span>
        <input ref={inputRef} type="text" placeholder="Search" />
        <button onClick={()=>search(inputRef.current.value)}></button>
      </div>

      <div className="weather-card">
        <h2 className="city-name">{cityWeather.location}
        </h2>
        <div className="weather-info">
          <div className="info-box">
            Temperature
            <p>{cityWeather.temperature}</p>
            </div>
          <div className="info-box">Weather Condition
            <p>{cityWeather.description}</p>
          </div>
          <div className="info-box small">Humidity
            <p>{cityWeather.humidity}</p>
          </div>
          <div className="info-box small">Wind Speed
            <p>{cityWeather.windSpeed}</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default WeatherApp;
