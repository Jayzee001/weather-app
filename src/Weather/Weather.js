import React, { useState } from 'react'
import './weather.css'
import sunny from '../Assets/sunny-removebg-preview.png';
import clear from '../Assets/sun.png'
import cloud from '../Assets/clear-sky.png'
import searcch from '../Assets/search-removebg-preview.png';
import broken from '../Assets/brokenClo-removebg-preview.png';
import drizzle from '../Assets/sunny_drizzle-removebg-preview.png';
import rain from '../Assets/raining-removebg-preview.png';
import thunder from '../Assets/rain_thunder_storm-removebg-preview.png';
import snow from '../Assets/snow-removebg-preview.png'
import { FaWater } from 'react-icons/fa';
import { BiWind } from 'react-icons/bi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'


const Weather = () => {
  const ApiKey = 'b3e432d9b33e6bb1e0feca0e72aa8e3a';
  const [wicon, setWicon] = useState(clear);
  const [lat, setLat] = useState(51.505);
  const [lon, setLon] = useState(-0.09)
  // let lat;
  // let lon;
  
  const Search = async () => {
    const element = document.getElementsByClassName('weatherSearch')
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${ApiKey}`

    const resp = await fetch(url);
    const data = await resp.json();
    console.log(resp.data);
    // Extract the latitude and longitude from the API response
    const latit = data.coord.lat
    const longi = data.coord.lon
    
    setLat(latit);
    setLon(longi);
      const humidity = document.getElementsByClassName('humidity_percent')
      const wind = document.getElementsByClassName('windy')
      const temperature = document.getElementsByClassName('degrees')
      const location = document.getElementsByClassName('location')

      humidity[0].innerHTML = data.main.humidity + '%';
      wind[0].innerHTML = data.wind.speed + 'Km/h';
      temperature[0].innerHTML = data.main.temp + '°C';
      location[0].innerHTML = data.name;

      console.log(Search)
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear);
      }
      if (data.weather[0].icon === '02d' || data.weather[0] === '02n') {
        setWicon(sunny);
      }
      if (data.weather[0].icon === '03d' || data.weather[0] === '03n') {
        setWicon(cloud);
      }
      if (data.weather[0].icon === '04d' || data.weather[0] === '04n') {
        setWicon(broken);
      }
      if (data.weather[0].icon === '09d' || data.weather[0] === '09n') {
        setWicon(drizzle);
      }
      if (data.weather[0].icon === '10d' || data.weather[0] === '10n') {
        setWicon(rain);
      }
      if (data.weather[0].icon === '11d' || data.weather[0] === '11n') {
        setWicon(thunder);
      }
      if (data.weather[0].icon === '13d' || data.weather[0] === '13n') {
        setWicon(snow);
    }
    //   const lat = data.coord.lat
    // const lon = data.coord.lon


  }


  return (
    <div className='container'>
      <div className='weather'>
        <h1>Weather App</h1>
        <div className='search'>
          <input type='text' className='weatherSearch' placeholder='Search' />
          <span onClick={() =>{Search()}} className='search_btn'>
            <img  src={searcch} alt='logo'/>
          </span>
        </div>
        <span className='weatherLogo'>
          <img  src={wicon} alt='logo'/>
        </span>
        {/* degrees  */}
        <h1 className='degrees'>
          15°C
        </h1>
        <h1 className='location'>
          London
        </h1>
        <div className='weather_descript'>
          <div className='humidity'>
            <span className='humid'>
            <h3>Humidity</h3>
              <span className='humidity_icon'>
                <span className='icon'> <FaWater /></span>
                <h5 className='humidity_percent'>
                  27%
                </h5>
              </span>
            </span>
          </div>
          <div className='wind'>
            <span className='humid'>
            <h3>Wind</h3>
              <span className='humidity_icon'>
                <span className='icon'> <BiWind /></span>
                <h5 className='windy'>
                  27Km/H
                </h5>
              </span>
            </span>
          </div>
        </div>
        {/* <div id='map' style={{ height: '300px' }}>
                <MapContainer center={[lat, lon]} zoom={13}>
            <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[[lat, lon]]}>
              <Popup>A sample marker.</Popup>
            </Marker>
          </MapContainer>
        </div> */}
      </div>
    </div>
  )
}

export default Weather
