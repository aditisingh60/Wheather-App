const apiKey = "b2823eb497e0f031cf6320466a0e81a5";
let city = "Jamshedpur";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const temperatureField = document.querySelector(".temp")
const locationField = document.querySelector(".time_location p")
const dateField = document.querySelector(".time_location span")
const weatherField = document.querySelector(".condition p")
const searchField = document.querySelector(".search_area")
const form = document.querySelector("form")

const background = document.querySelector(".video")

form.addEventListener("submit", searchForLocation)

function getLocalDateTime(timezoneOffset) {
    const nowUtc = new Date(); 
    const utcMilliseconds = nowUtc.getTime() + nowUtc.getTimezoneOffset() * 60000;
    const localTime = new Date(utcMilliseconds + timezoneOffset * 1000); 
    const day = localTime.getDate();
    const month = localTime.toLocaleString('en-US', { month: 'long' }); 
    const year = localTime.getFullYear();

    let hours = localTime.getHours();
    let minutes = localTime.getMinutes();
    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; 
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day} ${month} ${year}, ${hours}:${minutes} ${amPm}`;
}

const fetchResults = async () => {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        
        const data = await response.json();
        console.log(data);

        let locationName = data.name;
        let timezoneOffset = data.timezone; 
        let temp = Math.round(data.main.temp);
        let condition = data.weather[0].main;

        update(temp, locationName, timezoneOffset, condition);

        if (temp <= 10) {
            background.src = "Snow.mp4";
        }
        else if (data.weather[0].main == "Clouds") {
            background.src = "Cloudy.mp4";
        }
        else if (data.weather[0].main == "Haze") {
            background.src = "Haze.mp4";
        }
        else if (data.weather[0].main == "Drizzle") {
            background.src = "rain.mp4";
        }
        else if (data.weather[0].main == "Mist") {
            background.src = "Misty.mp4"
        }
        else if(data.weather[0].main == "Clear"){
            background.src = "bg.mp4";
        }
        else if(data.weather[0].main == "Rain"){
            background.src = "rain.mp4";
        }
        else{
            background.src = "Smokey.mp4";
        }

}

function update(temp,locationName,timezoneOffset,condition) {
    temperatureField.textContent = `${temp}°C`;
    locationField.textContent = locationName;
    dateField.textContent = getLocalDateTime(timezoneOffset);
    weatherField.textContent = condition;

    searchField.value = "";
}

function searchForLocation(e){
    e.preventDefault();

    city = searchField.value
    fetchResults(city)
}

fetchResults(city);
