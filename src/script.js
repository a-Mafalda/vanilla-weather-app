function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let month = months[date.getMonth()];
  let todayDate = date.getDate();
  return `${day}, ${month} ${todayDate} ${hours}:${minutes}` ;
}


function showTemperature(response){
console.log(response.data);
let temperature = document.querySelector("#temperature");
temperature.innerHTML= Math.round(response.data.main.temp);
let city = document.querySelector("#currentCity");
city.innerHTML= response.data.name;
let description = document.querySelector("#weatherDescription");
description.innerHTML= response.data.weather[0].description;
let countryCode = document.querySelector("#countryCode");
countryCode.innerHTML= response.data.sys.country;
let tempMin = document.querySelector("#minTemp");
tempMin.innerHTML= Math.round(response.data.main.temp_min);
let tempMax = document.querySelector("#maxTemp");
tempMax.innerHTML= Math.round(response.data.main.temp_max);
let humidity = document.querySelector("#humidity");
humidity.innerHTML= Math.round(response.data.main.humidity);
let wind = document.querySelector("#wind");
wind.innerHTML= Math.round(response.data.wind.speed);
let date = document.querySelector("#date");
date.innerHTML= formatDate(response.data.dt * 1000);
let icon = document.querySelector("#mainIcon");
icon.setAttribute("src", `img/icons/${response.data.weather[0].icon}.png`);
icon.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
let city = "lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(showTemperature);