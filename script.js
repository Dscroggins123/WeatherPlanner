

var searchButton = $("#searchButton")
var Saved = () => {
    $("#cities").html("")
cities.forEach(element => {
 $("#cities").append(`<button class="btn btn-primary mb-1">${element}</button>`)
});
}
var cities = [];
if(localStorage.getItem("cities")){
   cities = JSON.parse(localStorage.getItem('cities'))
}
Saved()

$(searchButton).on("click", function(event){
    event.preventDefault();
    var inputCity = $(".inputField").val()
    console.log(inputCity)

    
    
    
    
    var ourQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&APPID=98c6bb55a308a516a74756820c25e107";
    
    $.ajax({
        url: ourQueryURL,
        method: "GET"
    }).then(function(response){
        if(!cities.includes(inputCity)){
           cities.push(inputCity) 
        }
        localStorage.setItem("cities", JSON.stringify(cities) );
        Saved()
        console.log(response.weather[0].icon )
        var temperature = (response.main.temp - 273.15) * (1.8) + 32 
        $("#cityName").html(response.name + "<img src=http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png" + ">")
        $("#cityName")
        $("#temperature").html("Temperature: " + temperature + " &#8457;") 
        $("#humidity").html("Humidity: " + response.main.humidity + " %")
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH")
        var latitude = response.coord.lat
        var longitude = response.coord.lon
        getUV (latitude,longitude)
    })
    
    function getUV (latitude,longitude){
    //   console.log(latitude)
    //   console.log(longitude)
     var ourQueryURL =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly&appid=98c6bb55a308a516a74756820c25e107"
     
      
     $.ajax({
        url: ourQueryURL,
        method: "GET"
    }).then(function(secondResponse){
        secondResponse.daily.forEach(fiveday => {
            
        });
        // console.log(secondResponse)
        $("#UV").html("UV Index: " + secondResponse.current.uvi)
        
    })

}







    
    


















})