$(document).ready(function(){
$(".footer_time").hover(function(){
    $(".panel").slideToggle("fast");
  });

updateWeather()
drawTaiwan()

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

function drawTaiwan(){
	var type='county';
	var scale = 12500;
	var Cname = 'C_Name';

	d3.json(type+".js", function(topodata) {
     // features = topojson.feature(topodata, topodata.objects.country).features;
      // 這裡要注意的是 topodata.objects["county"] 中的 "county" 為原本 shp 的檔名
  this.topodata = topodata;

  features = topojson.feature(topodata, topodata.objects[type]).features;
  
    path = d3.geo.path().projection( // 路徑產生器
    d3.geo.mercator().center([121,24]).scale(scale) // 座標變換函式
  );

    
  d3.select("#pathCanvas").selectAll("path").data(features).enter().append("path").attr({
    d: path,
    name: function(d){
      return d.properties[Cname];
    },
    fill:'rgba(0,0,0,.5)'
 });

  d3.select("#pathCanvas").append("path")         //縣市/行政區界線
    .datum(topojson.mesh(topodata, topodata.objects[type], function(a, b) { return a !== b ; }))
    .attr("d", path)
    .attr("id", "county-boundary");

d3.select("svg").selectAll("path").on("mouseenter", function() {          //title div 顯示滑鼠所指向的縣市/行政區
	  $('#panel').css("display","inline");
      $(this).attr("fill", 'rgba(255,255,255,.5)');
      $('#title').html($(this).attr( "name" ));
      $('#panel').css({"height": "20px","width": "50px"});
    }).on("mouseout", function() {
      $(this).attr("fill", 'rgba(0,0,0,.5)');
    });   

    $("path").mouseover(function(){                   //info 區塊跟隨滑鼠移動
    $("path").mousemove( function(e) {
     mouseX = e.pageX; 
     mouseY = e.pageY;
    });  
    $('#panel').css({'top':mouseY,'left':mouseX}).fadeIn('slow');
  });

});

}