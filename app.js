let input = document.querySelector(".inp");
const button = document.querySelector(".btn");
const image = document.querySelector("#icon");
const Name = document.querySelector(".name");
const Temprature = document.querySelector(".temprature");

const Highs = document.querySelector(".highs");
const Lows = document.querySelector(".lows");

const dateDiv = document.querySelector(".date");

const myKey = '265b6b3af1834d6ed56826cc72d20203';
let myCity;

const months = [ "January", "Febuary", "March", "April",
    "May", "June", "July", "Augest", "September",
    "October", "November", "December"
];


const time = new Date();
let date = time.getDate();
let month = time.getMonth();
let year = time.getFullYear();

dateDiv.innerHTML = `${date}, ${months[month]}, ${year}`;


const weather = async () => {
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${myKey}&units=metric`);
        if (!data.ok) {
            throw new Error(`Error: ${data.statusText}`);
        }

        let weatherData = await data.json();
        let maxTep = weatherData.main.temp_max;
        Highs.innerHTML = `HIGHS <br> ${maxTep}`;
        let minTep = weatherData.main.temp_min;
        Lows.innerHTML = `LOWS <br> ${minTep}`;
        let temp = weatherData.main.temp;
        Temprature.innerHTML = `${temp} C`;
        let name = weatherData.name;
        Name.innerHTML = name;
        let icon = weatherData.weather[0].icon;
        image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    }
    catch (error) {
        console.log(error);
    }
}


button.addEventListener('click',() =>{
    if (input.value.trim() === '') {
        console.log('Please Enter a city')
        return;
    }
    myCity = input.value;

    weather();

});