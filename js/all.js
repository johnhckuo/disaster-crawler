var mouseX;
var mouseY;
var type = 'county';
var features; 
var scale = 12500;
var topodata , path;
var chart , mix_chart;
var temp_mixchart;
var rainfall_url = 'https://www.kimonolabs.com/api/c1kikbsu?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V';
var earthquake_url = '';
var uv_url = 'http://opendata.epa.gov.tw/ws/Data/UV/?$orderby=PublishAgency&$skip=0&$top=1000&format=json';
var pm25_url = 'http://opendata.epa.gov.tw/ws/Data/AQX/?format=json';
var earthquake_url = 'https://www.kimonolabs.com/api/cdytwkhs?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V';
var temperature_url = 'https://www.kimonolabs.com/api/2q5gcrl6?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V';
var last , temp_init = false;
var test_array = [];
var temp_flag = false;
$(document).ready(function() {
  init();


});

var toogle = function(){

  d3.select("svg").selectAll("path").remove();
  

  if (type == 'county'){
    type = 'sector';
    $('#toogle').text('切換為縣市');

  }else{
    type = 'county';
    $('#toogle').text('切換為行政區');
    
  }


  init();
}

var check_get = function(){
  var $_GET = {};

  document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
      function decode(s) {
          return decodeURIComponent(s.split("+").join(" "));
      }

      $_GET[decode(arguments[1])] = decode(arguments[2]);
  });
  if ($_GET['type'] != null){
     if ($_GET['type']=='uv'){
        disaster('uv',null);
     }else if ($_GET['type']=='rain'){
        disaster('rainfall',null);
     }else if ($_GET['type']=='air'){
        disaster('pm25',null);
     }else if ($_GET['type']=='history'){
        extend('history',null);
     }else if ($_GET['type']=='earthquake'){
        disaster('earthquake',null);
     }
  }
}


var init = function(){

  updateWeather();
  check_get();

  $(".footer_time").hover(function(){
    $(".panel").slideToggle("fast");
  });

  var Cname = 'C_Name';
  var Tname;

  if (type != 'county')
    Tname = 'T_Name';


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
    fill:'#55AA00',
    class:function(d){
      return d.properties[Tname];
    }
 });


  var mapType , fill; 

  if (type == 'county'){
    mapType = 'county-boundary'
  }else{
    mapType = 'subunit-boundary'
  }


  d3.select("#pathCanvas").append("path")         //縣市/行政區界線
    .datum(topojson.mesh(topodata, topodata.objects[type], function(a, b) { return a !== b ; }))
    .attr("d", path)
    .attr("id", mapType);


  if (type == 'county'){
  d3.select("svg").selectAll("path").on("mouseenter", function() {          //title div 顯示滑鼠所指向的縣市/行政區
      fill = $(this).attr("fill");
      $(this).attr("fill", '#00DD77');
      $('#title').html($(this).attr( "name" ));
      $('#panel').css({"height": "20px","width": "50px"});
    }).on("mouseout", function() {
      $(this).attr("fill", fill);
    });

  }else{
    d3.select("svg").selectAll("path").on("mouseenter", function() {          //title div 顯示滑鼠所指向的縣市/行政區
      fill = $(this).attr("fill");
      $(this).attr("fill", '#00DD77');
      $('#title').html($(this).attr( "class" ));
      $('#panel').css({"height": "20px","width": "50px"});
    }).on("mouseout", function() {
      $(this).attr("fill", fill);
    });
  }
  
  
  $("path").mouseover(function(){                   //info 區塊跟隨滑鼠移動
    $("path").mousemove( function(e) {
     mouseX = e.pageX; 
     mouseY = e.pageY;
    });  
    $('#panel').css({'top':mouseY,'left':mouseX}).fadeIn('slow');
  });

});




}
function earthquakeColor(d){
  if (d.mag.text>3)
    alert(d.info.text);

}


var disaster = function(type,button){  
     reset();    
    $('#temp_place').fadeOut("slow");
    $('#temp_time').fadeOut("slow");
    $("#mix_analysis").fadeOut("slow");
    $("#mix_city").fadeOut("slow");
    $('#temp_fade').fadeOut("slow");
    $('#rain_time').fadeOut("slow");

    $('#rain_fade').fadeOut("slow");
    $('#temp_choose').fadeOut("slow");
    $('#history_fade').fadeOut("slow");
    if (button!=null)
      toogleButton(button);

     var fill;
     d3.select("svg").selectAll("path").on('mouseout',function(){
      $(this).attr("fill", fill);
     });
     d3.select("svg").selectAll("path").on('mouseenter',function(){
              fill = $(this).attr("fill");
              $(this).attr("fill", '#00DD77');
              
              $('#panel').html("<span id='title'></span><br/>");
              $('#panel').css({
                'height': '20px',
                'width': '50px'
              });
              $('#title').text($(this).attr( "name" ));
      });

     if (type == 'rainfall'){

     $("#LoadingImage").show();
      $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/c1kikbsu?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
          $("#LoadingImage").hide();
        var data = data.results.collection1;
       // var color = d3.scale.linear().domain([0,10]).range(["#CCEEFF","#770077"]);
        var path = d3.geo.path().projection( // 路徑產生器
    d3.geo.mercator().center([121,24]).scale(scale) // 座標變換函式
  );
        for (var i = 0; i < data.length ; i++){
          $('path').each(function() {
            
            if ($(this).attr( "name" ) == data[i].county){
              if (data[i].rainfall>25)
                $(this).attr("fill", '#770077');
              else if (data[i].rainfall>20)
                $(this).attr("fill", '#003377');
              else if (data[i].rainfall>15)
                $(this).attr("fill", '#220088');
              else if (data[i].rainfall>10)
                $(this).attr("fill", '#0000FF');
              else if (data[i].rainfall>5)
                $(this).attr("fill", '#009FCC');
              else if (data[i].rainfall>0)
                $(this).attr("fill", '#33CCFF');
              else if (data[i].rainfall == '-')
                $(this).attr("fill", '#ffffff' );
            
              
              }
            })
        }


            
         }

      });
      $("#chart").html($('#rain').html())
      $("#chart table").css("width",'300px');
      $("#chart table:nth-child(2)").css("right",'80px');
      $("#chart td:nth-child(2)").css({"width":'100px','padding':'5px'});

     }else if(type == 'uv'){
      $("#LoadingImage").show();
      $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'http://opendata.epa.gov.tw/ws/Data/UV/?$orderby=PublishAgency&$skip=0&$top=1000&format=json', 
         success:function (data){
          $("#LoadingImage").hide();
        var color = d3.scale.linear().domain([0,5]).range(["#FFB3FF","#770077"]);
        var path = d3.geo.path().projection( // 路徑產生器
    d3.geo.mercator().center([121,24]).scale(scale) // 座標變換函式
  );
        for (var i = 0; i < data.length ; i++){
          $('path').each(function() {
            
            if ($(this).attr( "name" ) == data[i].County){
              if (data[i].UVI>=11)
                $(this).attr("fill", 'purple');
              else if (data[i].UVI>=8)
                $(this).attr("fill", 'red');
              else if (data[i].UVI>=6)
                $(this).attr("fill", 'orange');
              else if (data[i].UVI>=3)
                $(this).attr("fill", 'yellow');
              else if (data[i].UVI >= 0)
                $(this).attr("fill", 'green' );
                
              }
            })
        }


            
         }
      });

      $("#chart").html($('#uv').html());
      $("#chart td:nth-child(2)").css("line-height","90px");

     }else if (type == 'pm25'){
        $("#LoadingImage").show();
        $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'http://opendata.epa.gov.tw/ws/Data/AQX/?format=json', 
         success:function (data){
          $("#LoadingImage").hide();
     //   var color = d3.scale.linear().domain([0,100]).range(["#00DD00","#CC0000"]);
        var path = d3.geo.path().projection( // 路徑產生器
    d3.geo.mercator().center([121,24]).scale(scale) // 座標變換函式
  );
        for (var i = 0; i < data.length ; i++){
          $('path').each(function() {
            
            if ($(this).attr( "name" ) == data[i].County){
               if (data[i].Status == '有害')
                $(this).attr("fill", '#633300');
              else if (data[i].Status == '非常不良')
                $(this).attr("fill", '#800080');
              else if (data[i].Status == '不良')
                $(this).attr("fill", '#ff0000');
              else if (data[i].Status == '普通')
                $(this).attr("fill", '#ffff00');
              else if (data[i].Status  == '良好')
                $(this).attr("fill", '#00ff00' );

             
                
              }
            })
        }


           // $('#container').append("<li>"+"<span>"+str[i].Title+"</span></li>");
            
         }
      });
      
      $("#chart").html($('#pm25').html())
      $("#chart td:nth-child(3)").css({"text-align":'left','padding-left':'5px'});


     }else if(type == 'earthquake'){

          

          var divPos = {};
          var offset = $("#map").offset();
          $(document).mousemove(function(e){
              divPos = {
                  left: e.pageX - offset.left,
                  top: e.pageY - offset.top
              };
              $('#pos').html(divPos.left+'/'+divPos.top)
            }); 
          

        $("#LoadingImage").show();
        $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/cdytwkhs?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
          $("#LoadingImage").hide();
          var data = data.results.collection1;


          var circles = d3.select("#circleCanvas").selectAll("circle")
            .data(data)
            .enter()
            .append("circle");

          var div = d3.select("body").append("div")   
          .attr("class", "tooltip")               
          .style("opacity", 0);

        var radius;
        var circleAttributes = circles
            .attr("cx", function (d) { return mapTopixelX(d.latitude.text); })
            .attr("cy", function (d) { return mapTopixelY(d.longitude.text)-65; })
            .attr("r", function (d) { radius = d.mag.text*10; return radius; })
            .attr('class','.circle')
            .attr("fill",function(d){if (d.mag.text>=9) return '#000000'; else if(d.mag.text>=8.5 ) return '#880000'; else if(d.mag.text>=8 ) return '#AA0000'; else if(d.mag.text>=7 ) return '#FFFF00'; else if(d.mag.text>=6 ) return '#CC0000'; else if(d.mag.text>=5 ) return '#FF0000'; else if(d.mag.text>=4 ) return '#FF3333'; else if(d.mag.text>=3 ) return '#FF8888'; else if(d.mag.text<3 ) return '#FFCCCC'; })
            .attr("stroke",function(d){if (d.mag.text>=9) return '#000000'; else if(d.mag.text>=8.5 ) return '#880000'; else if(d.mag.text>=8 ) return '#AA0000'; else if(d.mag.text>=7 ) return '#FFFF00'; else if(d.mag.text>=6 ) return '#CC0000'; else if(d.mag.text>=5 ) return '#FF0000'; else if(d.mag.text>=4 ) return '#FF3333'; else if(d.mag.text>=3 ) return '#FF8888'; else if(d.mag.text<3 ) return '#FFCCCC'; })
            .attr('data-time' , function(d){ return d.time.text})
            .attr('data-info' , function(d){ return d.info.text})
            .attr('data-mag' , function(d){ return d.mag.text})
            .on("mouseenter", function() {    
              $('#title').html("<p>震央位置： "+$(this).data('info')+"</p><br/><p>時間： "+$(this).data('time')+"</p><br/><p>芮氏規模： "+$(this).data('mag')+"</p>");
              $('#panel').css({
                'height': '100px',
                'width': '250px'
              });
              fill = $(this).attr("fill");
              $(this).attr("fill", 'yellow');
              $(this).attr("stroke", 'yellow');

              $("#map").mousemove( function(e) {
               mouseX = e.pageX; 
               mouseY = e.pageY;
              });  
              $('#panel').css({'top':mouseY,'left':mouseX}).fadeIn('slow');
            })
            .on('mouseout',function(){
              $(this).attr("fill", fill);
              $(this).attr("stroke", fill);
             });


        $("#chart").html($('#earthquake').html())
        $("#chart td:nth-child(1)").css("height",'80px');
        $("#chart td:nth-child(1)").css("width",'80px');
        $("#chart td:nth-child(2)").css("width",'80px');

        $("#chart table").css({"width":'400px',"top":"-30px"});
        $("#chart table:nth-child(2)").css("right",'-70px');
        earthquakeTransition(circles,radius);
        
   /*    for (var i  = 0 ; i < data.length ; i++){
          var latitude = data[i].latitude.text;
          var longitude = data[i].longitude.text;
          var mag = data[i].mag.text;

        //  var xy = mapTopixel(latitude,longitude);
          var xy = mapTopixel(  latitude,longitude);
          var x = xy[0];
          var y = xy[1];
          console.log(x+'/'+y);
          d3.select("svg").selectAll("circle").data(data).enter()
           .append("circle")
           .attr({
              r:10,
              cx:x,
              cy:y-65,
              stroke: "red", // 畫紅圈
              fill: "none"   // 紅圈不填滿
            });
          
       } */

  /*      var color = d3.scale.pow().domain([0,9]).range(["#00DD00","#CC0000"]);
        var path = d3.geo.path().projection( // 路徑產生器
    d3.geo.mercator().center([121,24]).scale(scale) // 座標變換函式
  );
        for (var i = 0; i < data.length ; i++){
          $('path').each(function() {
            
            if ($(this).attr( "name" ) == data[i].county){

              $(this).attr("fill", color(data[i].mag));
                
              }
            })
        } */


           // $('#container').append("<li>"+"<span>"+str[i].Title+"</span></li>");
            
         }
      });




     }else if (type == 'temperature'){
          $("#LoadingImage").show();
          $.ajax({ 
            type:'GET', 
            dataType:'jsonp', 
           url:'https://www.kimonolabs.com/api/2q5gcrl6?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
             success:function (data){
              $("#LoadingImage").hide();
              var data = data.results.collection1;
            var color = d3.scale.linear().domain([0,36]).range(["#00DD00","#CC0000"]);
            var path = d3.geo.path().projection( // 路徑產生器
        d3.geo.mercator().center([121,24]).scale(scale) // 座標變換函式
      );
            for (var i = 0; i < data.length ; i++){
              $('path').each(function() {
                
                if ($(this).attr( "name" ) == data[i].County){

                  $(this).attr("fill", color(data[i]['PM2.5']));
                    
                  }
                })
            }


               // $('#container').append("<li>"+"<span>"+str[i].Title+"</span></li>");
                
             }
          });






     }
}
function toogleButton(button){
    $('#info li').css('background-color','rgba(0,0,0,0.7)').fadeIn('slow');
    if (button != null)
      button.style.backgroundColor = 'red';
}
function mapTopixelX(x){


  var originX = 118.802981 , endX =  122.469668;   
  var webOriginX = 0  , webEndX = 800;

  var resultX = (x - originX)* ((webEndX-webOriginX)/(endX - originX));
 
  return resultX;
 // $('#test1').css({'top':resultY,'left':resultX}).fadeIn('slow');
}

function mapTopixelY(y){
  var originY = 21.510473 , endY = 25.357116;   
  var webOriginY = 0 , webEndY = 900;

  var resultY = 900 - (y - originY)* ((webEndY-webOriginY)/(endY - originY));
  return resultY;


}

function earthquakeTransition(circle , r){ // har
  
  repeat();
    
  function repeat() {
    circle.attr({
        'stroke-width': 0,
        r: 5
    
    })
    .style("opacity",0.5)
    .attr('fill-opacity', 0.5)

    .transition()
    .duration(2000)
    .ease("ease-out")
    .attr({
        'stroke-width': 5,
        r: r
    })
    .style("opacity",.7)
    .attr('fill-opacity', .7)

    .each("end", repeat);
};
};



function mix_Rain(data , place){
  reset();
  var rain_dataset = [];
  var kaohsiung_data = {   
        name: place,       
        type: "line",
        color: "rgba(255,0,0,0.6)",
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontColor: "black",
        toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>高雄</strong></span> <span style='\"'color: dimgrey;'\"'>${y}</span> "
        },
        //lineThickness: 3,        
        dataPoints: []

      };

    var taichung_data = { 
        name: place,       
        type: "line",
        color: "rgba(255,140,0,0.6)",
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontColor: "black",
        toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>台中</strong></span> <span style='\"'color: dimgrey;'\"'>${y}</span> "
        },
        //lineThickness: 3,        
        dataPoints: []

    };

    var taipei_data = {  
        name: place,    
        type: "line",
        color: "rgba(0,0,255,0.6)",
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontyColor: "black",
        toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>台北</strong></span> <span style='\"'color: dimgrey;'\"'>${y}</span> "
        },
        //lineThickness: 3,        
        dataPoints: []

    };

  for (var i =0 ; i < data.length ; i++){
    rain_dataset.push({ 'x' : (91+i) , 'y' : data[i]});

  }
  
  if (mix_chart != null && place =='高雄市'){
    kaohsiung_data.dataPoints = rain_dataset;
    mix_chart.options.data.push(kaohsiung_data);
  }else if (mix_chart != null && place =='台中市'){
    taichung_data.dataPoints = rain_dataset;
    mix_chart.options.data.push(taichung_data);
  }else if (mix_chart != null && place =='台北市'){
    taipei_data.dataPoints = rain_dataset;
    mix_chart.options.data.push(taipei_data);

  }else{
    mix_chart = new CanvasJS.Chart("chart",
    {
      theme: "theme1",
      title:{
        text: "分析趨勢圖",
        fontFamily: "微軟正黑體"
      },
      animationEnabled: true,
      axisX: {
        interval:1,
        intervalType: "year",
        labelFontColor: "black",
        labelFontFamily: "微軟正黑體",
        suffix: "年"
        
      },
      axisY:{
        includeZero: false,
        title: "數值",
        labelFontColor: "black",
        labelFontFamily: "微軟正黑體"
      },
      toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>{name} : </strong></span> <span style='\"'color: dimgrey;'\"'>{y} (mm)</span> "
        },
      data: [
      {         
        name: place,
        type: "line",
        color: "rgba(75,0,130,0.6)",
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontColor: "black",
        //lineThickness: 3,        
        dataPoints: rain_dataset
      }
      
      
      ],
      backgroundColor: 'rgba(0,0,0,0)',
    });

    
  } 
  mix_chart.render();

}




function historyRain(data , place){
  reset();
  var rain_dataset = [];

  for (var i =0 ; i < data.length ; i++){
    rain_dataset.push({ 'x' : (91+i) , 'y' : data[i]});

  }
  
    chart = new CanvasJS.Chart("chart",
    {
      theme: "theme1",
      title:{
        text: "台北各年份年雨量趨勢圖",
        fontFamily: "微軟正黑體"
      },
      animationEnabled: true,
      axisX: {
        interval:1,
        intervalType: "year",
        labelFontColor: "black",
        labelFontFamily: "微軟正黑體",
        suffix: "年"
        
      },
      axisY:{
        includeZero: false,
        title: "雨量數值 (單位mm)",
        labelFontColor: "black",
        labelFontFamily: "微軟正黑體"
      },
      toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>{name} : </strong></span> <span style='\"'color: dimgrey;'\"'>{y} (mm)</span> "
        },
      data: [
      {        
        name:place,
        type: "area",
        color: "rgba(0,255,0,0.6)",
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontColor: "black",
        //lineThickness: 3,        
        dataPoints: rain_dataset
      }
      
      
      ],
      backgroundColor: 'rgba(0,0,0,0)',
    });

    
  
  chart.render();

}



function reset(){
  d3.select('svg').selectAll('circle').remove();

 // init();
}





function mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place){
  reset();
  

  var dataset = [] , initData =[];
  for (var i =0 ; i < kaohsiung_dataset.length ; i++){
        dataset.push({ 'x' : (1+i) , 'y' : parseInt(kaohsiung_dataset[i])});

      }
  var kaohsiung_data = {   
        name: place,       
        type: "column",
        color: getRandomColor(),
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontColor: "black",
        toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>高雄 ：</strong></span> <span style='\"'color: dimgrey;'\"'>${y} 。C</span> "
        },
        //lineThickness: 3,        
        dataPoints: dataset

      };
       dataset = [];
     for (var i =0 ; i < taichung_dataset.length ; i++){
        dataset.push({ 'x' : (1+i) , 'y' : parseInt(taichung_dataset[i])});

      }
   
    var taichung_data = { 
        name: place,       
        type: "column",
        color: getRandomColor(),
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontColor: "black",
        toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>台中 ：</strong></span> <span style='\"'color: dimgrey;'\"'>${y} 。C</span> "
        },
        //lineThickness: 3,        
        dataPoints: dataset
    };
     dataset = [];
    for (var i =0 ; i < taipei_dataset.length ; i++){
        dataset.push({ 'x' : (1+i) , 'y' : parseInt(taipei_dataset[i])});

      }

    var taipei_data = {  
        name: place,    
        type: "column",
        color: getRandomColor(),
        indexLabelFontFamily: "微軟正黑體",
        indexLabelFontyColor: "black",
        toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>台北 ：</strong></span> <span style='\"'color: dimgrey;'\"'>${y} 。C</span> "
        },
        //lineThickness: 3,        
        dataPoints: dataset

    };
    dataset = [];
    switch (place){
      case '高雄市':
        initData.push(kaohsiung_data);
        break;
      case '台北市':
        initData.push(taipei_data);
        break;
      case '台中市':
        initData.push(taichung_data);
        break;

    }
  
  
  if (temp_mixchart != null && place =='高雄市'){
    
    temp_mixchart.options.data.push(kaohsiung_data);
  }else if (temp_mixchart != null && place =='台中市'){

    temp_mixchart.options.data.push(taichung_data);
  }else if (temp_mixchart != null && place =='台北市'){
    
    temp_mixchart.options.data.push(taipei_data);

  }else{
    temp_mixchart = new CanvasJS.Chart("chart",
    {
      theme: "theme1",
      title:{
        text: "各年份年氣溫趨勢圖",
        fontFamily: "微軟正黑體"
      },
      animationEnabled: true,
      axisX: {
        interval:1,
        intervalType: "year",
        labelFontColor: "black",
        labelFontFamily: "微軟正黑體",
        suffix: "月"
        
      },
      axisY:{
        includeZero: false,
        labelFontColor: "black",
        labelFontFamily: "微軟正黑體",
        title: "歷年溫度"
        
      },
      toolTip: {
            shared: true,
            content: "<span style='\"'color: {color};'\"'><strong>{name} : </strong></span> <span style='\"'color: dimgrey;'\"'>{y} (。C)</span> "
        },
      
      backgroundColor: 'rgba(0,0,0,0)',
      data: initData
    });

    
  } 
  console.log(temp_mixchart.options.data)
  temp_mixchart.render();
}
//$.when.apply($, deferreds).then(function(){ return taipei_data;});

function temperature(place , button , init){
// var number = $("#temp_time").children().length;
if (init == true){
  $("#temp_choose").fadeIn("slow");
  if (button == null)
    temperature_fetch(place,null,'2015'  ,true);
  else
    temperature_fetch(place,button,'2015'  ,true);
  $("#temp_choose").change(function(){
    if (temp_flag){
      temp_mixchart.options.data=[];
    }else{
      temp_flag = true;
    }
    if (this.selectedIndex == 1){
      extend('choose_place'); 
    }else if (this.selectedIndex == 2) {
      temperature(place );
      $('#temp_place').fadeOut("slow");
      $("#mix_analysis").fadeOut("slow");
      $("#mix_city").fadeOut("slow");
    }
    
  })
}else{
   $('#temp_time').fadeIn("slow");
 // for (var i = 0 ; i < number ; i++)
 //   $("#temp_time li:nth")
  $("#temp_time").children().on('click', function(){
   // alert(this.innerHTML)
    temperature_fetch(place,this,this.innerHTML,'init')
  })
}
}



function extend(type , button ,place){
    if (button!=null)
      toogleButton(button);
    if (type == 'history'){
     $("#history_fade").fadeToggle("slow");
     $("#chart").empty();
    }else if (type == 'rain_history'){

      $('#temp_fade').fadeOut("slow");
      $('#temp_choose').fadeOut("slow");
     $("#rain_fade").fadeIn("slow");
     $("#mix_analysis").fadeIn("slow");
     $('#mix_city').fadeOut("slow");
     $('#temp_place').fadeOut("slow");
     $('#temp_time').fadeOut("slow");
    }else if (type == 'temp_history'){
     $("#temp_fade").fadeIn("slow");
     $('#rain_fade').fadeOut("slow");
    }else if (type == 'rain_mix'){
     $("#mix_fade").fadeIn("slow");

    }else if (type == 'choose'){
      $('#temp_choose').fadeIn("slow");

    }else if(type == 'choose_place'){
      $('#temp_place').fadeIn("slow");
      $('#temp_time').fadeOut("slow");
      $("#mix_analysis").fadeOut("slow");
      $("#mix_city").fadeOut("slow");
    }else if(type == 'mix'){
      $('#mix_city').fadeIn("slow");
      $('#temp_place').fadeOut("slow");
      $('#temp_time').fadeOut("slow");
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

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
        $(".footer_time").on("mouseenter",function(){$(".footer_time").css("opacity","1"); });
        $(".footer_time").on("mouseout",function(){$(".footer_time").css("opacity",".5"); });
      }

    });
  
}
 /* $.when(
  // Get the HTML

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/b5pnx91i?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2002_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/9kj2hkik?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2003_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/59qturr2?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2004_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/dmuknjqm?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2005_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/8d5ddt9u?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2006_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),


  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/ciszlrhw?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2007_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),


  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/746pie88?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2008_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/8z3bx1nq?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2009_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2009_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),





  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/crjccgkc?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
            //  if( data[i]['2010_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2010_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),



  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/afoernpw?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
             // if( data[i]['2011_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2011_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),


  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/7spnhan2?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
             // if( data[i]['2012_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2012_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),

  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/c2lpv54u?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
             // if( data[i]['2013_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2013_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),


  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/c8593u62?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
             // if( data[i]['2014_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2014_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  }),


  $.ajax({ 
        type:'GET', 
        dataType:'jsonp', 
       url:'https://www.kimonolabs.com/api/26rh5uwq?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V', 
         success:function (data){
            var data = data.results.collection1;
            var temp = 0;
            for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
             // if( data[i]['2015_taipei_rain'] > temp)
                temp += parseFloat(data[i]['2015_taipei_rain']);
            }
            taipei_data.push(temp);
          }
  })
 ).then(function(){
  return taipei_data;
}

}*/