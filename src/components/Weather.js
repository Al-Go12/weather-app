import React ,{useState}from 'react'
import  "./Weather.css";
import { IoSearchSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";









function Weather() {
    const [city,setCity]=useState('');
   const [weather,setWeather]=useState('');
   const[error,setError]=useState('');
   const API_KEY="d411f626c393bae653ca334523e228f3" ;
   const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; 
  
   

   const handle_input=(event)=>{
    setCity(event.target.value)
    

   }
   
   const fetchData= async() => {
    try{
        let response =await fetch(url)
        let output=await response.json();
        if(response.ok){
         setWeather(output)
         console.log(weather)
         setError('')
        }  
        else {
            setError("No data found,please enter a valid city")
            setWeather('')
        }
    }
    catch(error){ 
       console.log(error)
    }
   }
   


  return (
    <div className='container' >
        <div className='city'>
        <input type="text" placeholder='enter the city' onChange={handle_input}/> 
       <button onClick={fetchData}>
       <IoSearchSharp/>

       </button>
     
       </div>

      {
        error && <p className="error-message">{error}</p>
      } 

      {
        weather && weather.weather &&
        <div className='content'>
            <div className='weather-image'>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""/>
                <h3 className='desc'>{weather.weather[0].description}</h3>
                </div>
               <div weatherName="weather-temp">
                <h2>{weather.main.temp}<span> &deg;C </span></h2>
                </div> 

                <div className='weather-city'>
                    <div className='location'>
                    <FaLocationDot />

                    </div>
                    <p>{weather.name},<span>{weather.sys.country}</span></p>
                </div>

                <div className='weather-stats'>
                    <div className='wind'>
                    <div className='wind-icon'>
                    <FaWind />
                    </div>
                    <h3 className='wind-speed'>{weather.wind.speed}<span>km/h</span></h3>
                    <h3 className='wind-heding'>Wind Speed</h3>
                </div> 

                <div className='humidity'>
                    <div className='humidity-icon'>
                    <WiHumidity />
                    </div>
                    <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                    <h3 className='humidity-heding'>Humidity</h3>
                </div>  
                </div> 



            </div>
      }
     

    </div>
  )
}

export default Weather
