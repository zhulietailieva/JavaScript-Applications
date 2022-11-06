function attachEvents() {
    const initUrl='http://localhost:3030/jsonstore/forecaster/locations';
    const locationEl=document.getElementById('location');
    const submitBtn=document.getElementById('submit');
    const forecastDivEl=document.getElementById('forecast');
   

    submitBtn.addEventListener('click',getResponse);
    async function getResponse(){
        try{
           let currLocation=locationEl.value;
        let response=await fetch(initUrl);
        let data= await response.json();
        let currObj=data.find(x=>x.name==currLocation);
        let todayForecast= await currConditions(currObj);
        let threeForecast=await threeDaysForecast(currObj);

        forecastDivEl.style='display:block';     
        createCurrForecastHTML(todayForecast);
        createUpcomForecastHTML(threeForecast); 
        }catch(error){
            forecastDivEl.innerHTML="";
            forecastDivEl.style='display:block';     
            let errorSpan=document.createElement('span');
            errorSpan.textContent="Error";
            forecastDivEl.appendChild(errorSpan);
        }       
    }
    function createCurrForecastHTML(todayObject){
        let currentDivEl=document.getElementById('current');
        let forecastsDiv=document.createElement('div');
        forecastsDiv.classList.add('forecasts');
        
        let spanConditionSymbol=document.createElement('span');
        spanConditionSymbol.classList.add('condition');
        spanConditionSymbol.classList.add('symbol');
        spanConditionSymbol.textContent=symbols[todayObject.forecast.condition];

        let conditionSpan=document.createElement('span');
        conditionSpan.classList.add('condition');

        let forecastDataSpanLocation=document.createElement('span');
        forecastDataSpanLocation.classList.add('forecast-data');
        forecastDataSpanLocation.textContent=todayObject.name;

        let forecastDataSpanDegrees=document.createElement('span');
        forecastDataSpanDegrees.classList.add('forecast-data');
        forecastDataSpanDegrees.textContent=
        `${todayObject.forecast.low}${symbols['Degrees']}/${todayObject.forecast.high}${symbols['Degrees']}`;
        
        let forecastDataSpanWeather=document.createElement('span');
        forecastDataSpanWeather.classList.add('forecast-data');
        forecastDataSpanWeather.textContent=todayObject.forecast.condition;

        conditionSpan.appendChild(forecastDataSpanLocation);
        conditionSpan.appendChild(forecastDataSpanDegrees);
        conditionSpan.appendChild(forecastDataSpanWeather);

        forecastsDiv.appendChild(spanConditionSymbol);
        forecastsDiv.appendChild(conditionSpan);

        currentDivEl.appendChild(forecastsDiv);
    }
    function createUpcomForecastHTML(upcomingObject){
        let upcomingDivEl=document.getElementById('upcoming');
        

        let forecastInfoDiv=document.createElement('div');
        forecastInfoDiv.classList.add('forecast-info');

        //loop through the three days
        for (const item of upcomingObject.forecast) {

            let upcomingSpan=document.createElement('span');
            upcomingSpan.classList.add('upcoming');

            let symbolSpan=document.createElement('span');
            symbolSpan.classList.add('symbol');
            symbolSpan.textContent=symbols[`${item.condition}`];

            let forecastDataSpanDegrees=document.createElement('span');
            forecastDataSpanDegrees.classList.add('forecast-data');
            forecastDataSpanDegrees.textContent=
            `${item.low}${symbols['Degrees']}/${item.high}${symbols['Degrees']}`;

            let forecastDataSpanWeather=document.createElement('span');
            forecastDataSpanWeather.classList.add('forecast-data');
            forecastDataSpanWeather.textContent=item.condition;

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(forecastDataSpanDegrees);
            upcomingSpan.appendChild(forecastDataSpanWeather);

            forecastInfoDiv.appendChild(upcomingSpan);
        }
        upcomingDivEl.appendChild(forecastInfoDiv);
    }
    async function currConditions(WeatherObject){
        let response=await fetch
        (`http://localhost:3030/jsonstore/forecaster/today/${WeatherObject.code}`);
        let data=await response.json();
        return data;
    }
    async function threeDaysForecast(WeatherObject){
        let response= await fetch
        (`http://localhost:3030/jsonstore/forecaster/upcoming/${WeatherObject.code}`);
        let data=await response.json();
                return data;
    }
    const symbols={
        'Sunny': '☀',
        'Partly sunny':'⛅',
        'Overcast':'☁',
        'Rain': '☂',
        'Degrees': '°'
    }
    
}

attachEvents();