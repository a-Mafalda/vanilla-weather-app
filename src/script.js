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


}

let apiKey = "656ac87c5034b9f4933b4a4211cbca36";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(showTemperature);