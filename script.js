


const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector("#cityInput")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const card = document.querySelector(".card");
const suggestionsBox = document.getElementById("suggestions");
const errorDisplay = document.querySelector(".error");
const weatherDisplay = document.querySelector(".weather");

async function checkweather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {

        var data = await response.json();
        console.log(data);
    
        const timezoneOffset = data.timezone; // Timezone offset in seconds
        const currentUTC = Date.now() + new Date().getTimezoneOffset() * 60000; // Current UTC time in ms
        const cityTime = new Date(currentUTC + timezoneOffset * 1000); // Convert UTC to city's local time

        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

        let isDayTime = cityTime >= sunrise && cityTime <= sunset;

        console.log("City Time:", cityTime);
        console.log("Sunrise:", sunrise);
        console.log("Sunset:", sunset);
        console.log("Is Daytime?", isDayTime);


        if (isDayTime) {
            card.style.background = "linear-gradient(135deg, #ff7e5f, #feb47b)";
        } else {
            card.style.background = "linear-gradient(135deg, #2c3e50, #34495e)";
        }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C" ;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) +  " Km/h";
    document.querySelector(".feels-like").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".weather-desc").innerHTML = data.weather[0].description;
    

    let weatherCondition = data.weather[0].main.toLowerCase();
    
    if (isDayTime) {
        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "snow") {
            weatherIcon.src = "images/snow.png";
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "thunderstorm") {
            weatherIcon.src = "images/thunder.png";
        }
    } else {
        if (weatherCondition === "clouds") {
            weatherIcon.src = "images/cloudyNight.png";
        } else if (weatherCondition === "rain") {
            weatherIcon.src = "images/nightRain.png";
        } else if (weatherCondition === "snow") {
            weatherIcon.src = "images/snow.png"; // You may need a night-specific snow icon
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/nightMist.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clearNightSky.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/nightRain.png"; // Can use the nightRain icon for drizzle too
        } else if (weatherCondition === "thunderstorm") {
            weatherIcon.src = "images/thunder.png";
        }
    }
        document.querySelector(".weather").style.display =  "block";
        document.querySelector(".error").style.display = "none";
    }  
    
}

searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value.trim();
    if (cityName) {
        checkweather(cityName);
        searchBox.value = ""; 
    } else {
        alert("Please enter a city name!");
    }
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cityName = searchBox.value.trim();
        if (cityName) {
            checkweather(cityName);
            searchBox.value = "";
        } else {
            alert("Please enter a city name!");
        }
    }
});




























