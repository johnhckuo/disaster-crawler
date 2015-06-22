$(document).ready(function(){
$(".footer_time").hover(function(){
    $(".panel").slideToggle("fast");
  });
updateWeather()
});

function updateWeather(){

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/98n56rjs?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){

        var data = data.results.collection1[0];
        if (data.weather == '多雲'){
          $('.footer_time img').attr("src","img/sunny_cloud.png")

        }else if (data.weather == '陰'){
          $('.footer_time img').attr("src","img/cloudy.png")
        }else if (data.weather == '晴'){
          $('.footer_time img').attr("src","img/Sunny.png")
        }else if (data.weather == 'X'){
          $('.footer_time img').attr("src","img/cloudy.png")
        }else if (data.weather == '陰有雷雨' || data.weather == '陰大雷雨' ){
          $('.footer_time img').attr("src","img/cloudy_rainy.png")
        }else if (data.weather == '多雲有雷雨'){
          $('.footer_time img').attr("src","img/rainy_cloudy_sunny.png")
        }
  
  
  
        $('#realtime_temp').html(" "+data.temperature+"°c ")
        $(".footer_time").css("opacity","0.5");
        $(".footer_time").on("mouseover",function(){$(".footer_time").css("opacity","1"); });
        $(".footer_time").on("mouseout",function(){$(".footer_time").css("opacity",".5"); });
      }

    });
  
}