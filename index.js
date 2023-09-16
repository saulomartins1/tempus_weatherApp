
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=São Paulo&units=metric`
const apiKey = `&appid=49de26e129426202eb9780650042ef9a`

async function weatherNow(){
    const apiWeather = await fetch(apiUrl + `${apiKey}`);
    const apiJson = await apiWeather.json();
    
    const cidade = document.querySelector("[data-stats='cidade']");
    const data = document.querySelector("[data-stats='data']");
    
    const chuva = document.querySelector("[data-stats='chuva']");
    const humidade = document.querySelector("[data-stats='humidade']");
    const vento = document.querySelector("[data-stats='vento']");
    
    const temp = document.querySelector("[data-stats='temperatura']");
    
    const temp_max = document.querySelector("[data-stats='temperatura_Max']");
    const temp_min = document.querySelector("[data-stats='temperatura_Min']");


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
    
    chuva.innerHTML = `${objW.vento.toFixed(0)} %`;
    humidade.innerHTML = `${objW.humidade} %`;
    vento.innerHTML = `${objW.vento} km/h`;

    temp.innerHTML = `${+objW.temp.toFixed(0)} ºc`

    console.log(temp)
}


weatherNow()

function updateWeather(){

}

