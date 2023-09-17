const searchInput = document.querySelector("[data-search='input']");
const searchForm = document.querySelector("[data-search='form']");

const boxStats = document.querySelector(".box_bg");
const nothingFound = document.querySelector(".noResults");


const cidade = document.querySelector("[data-stats='cidade']");
const data = document.querySelector("[data-stats='data']");

const chuva = document.querySelector("[data-stats='chuva']");
const humidade = document.querySelector("[data-stats='humidade']");
const vento = document.querySelector("[data-stats='vento']");

const temp = document.querySelector("[data-stats='temperatura']");
const temp_max = document.querySelector("[data-stats='temperatura_Max']");
const temp_min = document.querySelector("[data-stats='temperatura_Min']");




async function weatherNow(cityName){
    try{
        const apiKey = `&appid=49de26e129426202eb9780650042ef9a`
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`
    
        const apiWeather = await fetch(apiUrl + `${apiKey}`);
        const apiJson = await apiWeather.json();
        
        boxStats.classList.remove("nothing_found");
        nothingFound.classList.add("hide");

        const objW = {
    
            cidade: apiJson.name,
    
            temp: apiJson.main.temp,
            temp_max: apiJson.main.temp_max,
            temp_min: apiJson.main.temp_min,
    
            chuva: apiJson.main.humidity,
            humidade: apiJson.main.humidity,
            vento: apiJson.wind.speed,
        }
    
        cidade.innerHTML = `${objW.cidade}`;
        
        chuva.innerHTML = `${objW.vento.toFixed(0)} %`; //Não tem info de chuva nos dados dessa API
        humidade.innerHTML = `${objW.humidade} %`;
        vento.innerHTML = `${objW.vento} km/h`;
    
        temp.innerHTML = `${+objW.temp.toFixed(0)} ºc`
    
        temp_max.innerHTML = `${+objW.temp_max.toFixed(0)} ºc`
        temp_min.innerHTML = `${+objW.temp_min.toFixed(0)} ºc`
    }catch(err){
        boxStats.classList.add("nothing_found");
        nothingFound.classList.remove("hide");
    }
}

function searchCity(locationName){
    if(locationName.length > 2 && locationName.length <= 30){
        weatherNow(locationName);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchCity(searchInput.value);
})
