import { apiKey } from "./apiKey.js";

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


function dataAtual(timestamp){
    function _dia(){
        const dia = new Date().getDay();
        const diaExtenso = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
        return diaExtenso[dia];
    }
    function _horario(){
        const horario = new Date(timestamp * 1000);
        const horas = horario.getHours();
        // const minutos = ("0" + horario.getMinutes()).slice(-2); // Não retornar > atualiza em tempo real.

        return `${horas}:00`;
    }
    return {
        _dia,
        _horario
    }
}


async function weatherNow(cityName){
    try{
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`
    
        const apiWeather = await fetch(apiUrl + `${apiKey}`);
        const apiJson = await apiWeather.json();

        //Animation remove/reset/add
        boxStats.classList.remove("animationBox");
        boxStats.offsetWidth;
        boxStats.classList.add("animationBox");
        // //
        //Se ok = true, não mostra aviso.
        boxStats.classList.remove("nothing_found");
        nothingFound.classList.add("hide");
        // //
        const objW = {
    
            cidade: apiJson.name,
            data: apiJson.dt,
    
            temp: apiJson.main.temp,
            temp_max: apiJson.main.temp_max,
            temp_min: apiJson.main.temp_min,
    
            chuva: apiJson.main.humidity,
            humidade: apiJson.main.humidity,
            vento: apiJson.wind.speed,
        }
        
        //Pegar dia e horario do Fetch.
        const dataDay = dataAtual(objW.data)._dia();
        const dataTime = dataAtual(objW.data)._horario();
        // //

        const contentBoxInside = 
        `
        <div class="boxInside_topInfos">
            <p>Tempo em</p>
            <h2 class="cidade" data-stats="cidade">${objW.cidade}</h2>
            <p class="data" data-stats="data">${dataDay} às ${dataTime}</p>
        </div>
        <div class="boxInside_middleInfos">
            <p class="chuva">
                <img src="source/images/icons/icon_chuva.svg" alt="probabilidade de chuva"> 
                <span data-stats="chuva">${objW.vento.toFixed(0)}%</span></p>
            <p class="humidade">
                <img src="source/images/icons/icon_humidade.svg" alt="humidade atual">
                <span data-stats="humidade">${objW.humidade}%</span></p>
            <p class="vento">
                <img src="source/images/icons/icon_vento.svg" alt="velocidade do vento">
                <span data-stats="vento">${objW.vento.toFixed(0)} km/h</span></p>
        </div>
        <div class="boxInside_bottomInfos">
            <div class="icon">
                <img data-stats="icon" src="source/images/icons/ensolarado.svg" alt="Tempo ensolarado">
                <p data-stats="icon_text">Indefinido</p>
            </div>
            <div class="temperatura">
                <h3 data-stats="temperatura">${+objW.temp.toFixed(0)} ºc</h3>
                <div>
                    <p>Máx.: <span data-stats="temperatura_Max">${+objW.temp_max.toFixed(0)} ºc</span></p>
                    <p>Min.: <span data-stats="temperatura_Min">${+objW.temp_min.toFixed(0)} ºc</span></p>
                </div>
            </span>
        </div>        
        `
        boxStats.innerHTML = contentBoxInside;

    }catch(err){
        //Se ok = false, avisa usuário.
        boxStats.classList.add("nothing_found");
        nothingFound.classList.remove("hide");
        // //
        console.log(Error(err))
    }
}

weatherNow("São Paulo");

function searchCity(locationName){
    if(locationName.length > 2 && locationName.length <= 30){
        weatherNow(locationName);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchCity(searchInput.value);
})