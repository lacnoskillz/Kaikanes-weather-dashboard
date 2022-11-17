//forecast api 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat1 +'&lon='+lon1+'&appid=1d3ae5500d8fcb7af62c6c542bf6a203&units=imperial';
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//test = "http://api.openweathermap.org/geo/1.0/direct?q="+userinput+"&limit=5&appid=1d3ae5500d8fcb7af62c6c542bf6a203";
submitbtnEL = document.getElementById('submitbtn');
citysearchEL = document.getElementById('citysearch');
historyEL = document.getElementById('history');
//iconURL = "http://openweathermap.org/img/wn/"+weather"@2x.png"
var h2EL = document.getElementById("currentcity");
var tempEL = document.getElementById('templist')
var windEL = document.getElementById('windlist')
var humidityEL = document.getElementById('humiditylist')
var j = 0;
var lat;
var lon;

function APIfetch(){
  test = "http://api.openweathermap.org/geo/1.0/direct?q="+userinput+"&limit=5&appid=1d3ae5500d8fcb7af62c6c542bf6a203";
fetch(test)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("citydata",data);
    
     
     if(data[0] == undefined){
      citynotfound(userinput);
     }else{
      lat = data[0].lat
     lon = data[0].lon
      console.log('lat',lat);
      console.log('lon',lon);
      getweather(lat,lon);
    }});
  }
function getweather(lat,lon){
  var lat1= lat;
  var lon1= lon;
 weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat1 +'&lon='+lon1+'&appid=1d3ae5500d8fcb7af62c6c542bf6a203&units=imperial';
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weatherdata",data);
      wind = data.wind.speed;
      console.log("wind",wind);
      temp = data.main.temp;
      console.log("temp",temp);
      humid = data.main.humidity;
      console.log("humid",humid);
      weather = data.weather[0].icon;
      console.log("weather",weather);
      currenttime = data.dt;
      console.log("currenttime",currenttime);

      setcurrentweather(wind,temp,humid,weather,currenttime);

      

})
}
function setcurrentweather(wind,temp,humid,weather){
  console.log("setcurrentweaher function");
  console.log("h2",h2EL);
  iconURL = "http://openweathermap.org/img/wn/"+ weather +"@2x.png"
  h2EL.innerHTML= userinput + iconURL;
  tempEL.innerHTML = "Tempature:"+temp;
  humidityEL.innerHTML = "Humidity"+humid+"%";
  windEL.innerHTML = "Wind:" + wind;
  


}
function citynotfound(userinput){

console.log(userinput,"is not a city in the data base")
}
submitbtn.addEventListener('click',Afunction);
function Afunction(event){
  event.preventDefault();
  
  userinput = citysearchEL.value;
  console.log(userinput);
  if(userinput != null){
  var listitem = document.createElement('li');
  listitem.textContent = userinput;
  historyEL.appendChild(listitem);
  localStorage.setItem(j,userinput);
  j++;
  APIfetch();
  }else{
    return;
  }
}
init();
function init(){

}
