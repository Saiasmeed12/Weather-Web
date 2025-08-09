const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey= "f2e7b3cb7b6848df1966a7420fea362d";

weatherForm.addEventListener("submit", async event=>{

    event.preventDefault();
    const city =cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayweatherinfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }

    else{
        displayError("please enter an city")
    }

    
});


async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    
    if(!response.ok){
        throw new Error("could not fetch weather data");
    }

    return await response.json();

}



function displayweatherinfo(data){

    const {name:city,
         main: {temp,humidity},
         weather:[{description,id}]} =data;


    card.textContent ="";
    card.style.display ="flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDispaly = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const Weatheremoji = document.createElement("p");
    

    cityDisplay.textContent=city;
    tempDispaly.textContent =`${(temp-273.15).toFixed(1)}°c`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent= description;
    Weatheremoji.textContent=getWeatheremoji(id);



    
    cityDisplay.classList.add("cityDisplay");
    tempDispaly.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    Weatheremoji.classList.add("weatheremoji");
    


    card.appendChild(cityDisplay);
    card.appendChild(tempDispaly);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(Weatheremoji);




}



function getWeatheremoji(weatherid){
    switch(true){
        case (weatherid >=200 && weatherid < 300):
            return "⛈️";
        case (weatherid >=300 && weatherid <400):
            return "🌧️";
        case (weatherid >=500 && weatherid <600):
            return "🌨️";
        case (weatherid >=600 && weatherid <700):
            return "🍃";
        case (weatherid >=700 && weatherid <800):
            return "☁️";
        case (weatherid === 800):
            return "☀️";
        case (weatherid >=801 && weatherid <810):
            return "🌨️";

        default:
            return "❓";    

        
            
    }



}

    

    




function displayError(message){
    
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);



    
}