const express= require("express");
const bodyParser= require("body-parser");
const http= require("http");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/styles.css");
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){

  const query= req.body.CityName;
  const api= "e3a76d4edfb3f0addd9e72f654d8effc";
  const unit="metric";

  const url="http://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units="+unit;
  http.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const WeatherData=JSON.parse(data);
      const temp= WeatherData.main.temp;
      const WeatherDecsription= WeatherData.weather[0].description;
      const icon= WeatherData.weather[0].icon;
      const imageurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+ WeatherDecsription+ "</p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celsius </h1>");
      res.write("<img src=" +imageurl +">");
      res.send();
    })
  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
