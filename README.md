#Taiwan Disaster in Real Time Display#

###Github Pages : http://johnhckuo.github.io/Taiwan_RealTime_Disaster/###

![alt tag](https://hackpad-attachments.imgix.net/kaohsiung-school.hackpad.com_Ud2g6AKD0Oh_p.415786_1435226206648_%E6%93%B7%E5%8F%96.PNG?fit=max&w=882)
![alt tag](https://hackpad-attachments.imgix.net/kaohsiung-school.hackpad.com_Ud2g6AKD0Oh_p.415786_1435226150167_%E6%93%B7%E5%8F%96.PNG?fit=max&w=882)


#1. 資料來源蒐集與整理#
##a. 多來源資料彙整##
由於台灣政府將氣象、災害資料依照月份/年份或是災害類型「分別」放在各個網頁，因此導致同一個災害如降雨，從2014至2015可能就有24個頁面(每月份一個html檔)，處理起來十分不方便，因此我們使用Kinomo API，將這些頁面的資訊擷取過濾

![alt tag](https://hackpad-attachments.imgix.net/kaohsiung-school.hackpad.com_Ud2g6AKD0Oh_p.415786_1435221031025_%E6%93%B7%E5%8F%96.PNG?fit=max&w=882)

並整合至同一個json檔

![alt tag](https://hackpad-attachments.imgix.net/kaohsiung-school.hackpad.com_Ud2g6AKD0Oh_p.415786_1435221058381_%E6%93%B7%E5%8F%96.PNG?fit=max&w=882)
##b. 多來源資料處理
但若沒有使用Kinomo內建的API整合功能的話，你的Ajax來源會多的非常誇張，而且很多來源是要同時處理，如使用者選擇降雨資訊，他會希望看到20XX到2015年的資訊，那這樣大概會需要跑2015-20xx乘上12個Ajax，不僅僅會有效能的問題，還會有變數undefined的語法錯誤，原因是Ajax為非同步，但javascript compiler會先跑完程式碼，這時若有一些變數原本是要拿來接Ajax的response，但因為他還沒跑完因此還沒return，這時那個變數就會是null或undefined，之後的處理也會出問題，這時就要使用jquery的when() 和 then() function，用法如下：
```javascript
function taipei_rain(type , button){
  var deferreds = [];
  var taipei_dataset = [];
  var data_url = [
  {
  'title':'2002_taipei_rain',
  'url':'https://www.kimonolabs.com/api/b5pnx91i?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2003_taipei_rain',
  'url':'https://www.kimonolabs.com/api/9kj2hkik?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2004_taipei_rain',
  'url':'https://www.kimonolabs.com/api/59qturr2?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2005_taipei_rain',
  'url':'https://www.kimonolabs.com/api/dmuknjqm?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2006_taipei_rain',
  'url':'https://www.kimonolabs.com/api/8d5ddt9u?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2007_taipei_rain',
  'url':'https://www.kimonolabs.com/api/ciszlrhw?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2008_taipei_rain',
  'url':'https://www.kimonolabs.com/api/746pie88?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2009_taipei_rain',
  'url':'https://www.kimonolabs.com/api/8z3bx1nq?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2010_taipei_rain',
  'url':'https://www.kimonolabs.com/api/crjccgkc?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2011_taipei_rain',
  'url':'https://www.kimonolabs.com/api/afoernpw?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2012_taipei_rain',
  'url':'https://www.kimonolabs.com/api/7spnhan2?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2013_taipei_rain',
  'url':'https://www.kimonolabs.com/api/c2lpv54u?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2014_taipei_rain',
  'url':'https://www.kimonolabs.com/api/c8593u62?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  },{
  'title':'2015_taipei_rain',
  'url':'https://www.kimonolabs.com/api/26rh5uwq?apikey=x3C3wO491D2hBEkPXsPJ9CgRJXzlEN8V'
  }
  ]

  var deferreds = [];
  $.each(data_url, function(index, stat){

      deferreds.push(
//跑迴圈將所有的Ajax response status 存入deferred陣列之中，並當作之後when() function的參數
          $.ajax({
            type:'GET', 
            dataType:'jsonp', 
            url:this.url      
          })
      );
  });
  // 無法把一整個陣列作為參數，因此使用apply
  $.when.apply($,deferreds).then(function(){
// 將儲存所有Ajax response的陣列deferreds放進when()當中，當所有的Ajax皆跑完的時候，他才會跑then()中的程式碼，有效避免AJax非同步的例外狀況

    for (var j = 0 ; j < arguments.length ; j++){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;
 // 接下來就可以做自己想要的data process
 ```
#2. 使用D3.js繪製台灣地圖#
##a. 繪製台灣輪廓##
政府在open data官網上釋出了三個等級的資料：

-縣(市)行政區界線

-鄉(鎮、市、區)行政區域界線

-全國村里界圖

因為政府內部所使用系統的關係，釋出的格式均為 SHP 檔格式。感謝 D3.js 的作者 Mike ，剛好他最近在 Github 上開了一個新專案「shapefile」，讓我們可以讀取 SHP 檔並輸出成 GeoJSON 格式；事實上， Mike 已經將 shapefile 整進了他的另一個專案「topojson」，讓我們可以直接由 SHP 檔產生 TopoJSON 檔。
(ps 有興趣的人可去這個網站看看 )

由於 topojson 是 NodeJS 的模組，所以需要先安裝 NodeJS ；NodeJS 的安裝在另一篇文章「資料爬蟲實戰－使用 NodeJS」有說明過，在 Window 下可以到 https://nodejs.org/download/ 下載安裝檔，而在 Linux 或 Mac 環境下則可以參考這個網頁提供的作法來安裝。
確認 NodeJS 安裝完成後，我們解壓縮政府提供的下載檔並使用 topojson 讀取( 以縣市邊界圖為例 )：

  npm install -g topojson
  topojson -s 0.0000001 -o county.json -p --shapefile-encoding big5 county.shp

產生了一個檔案 county.json 即為我們需要的 TopoJSON 檔。
我們也可以使用 API 的方式程式化處理，但事情會變得比較複雜，這裡先略過不談。特別要注意的是原始資料採 Big5 格式，所以我們要用「–shapefile-encoding 」參數提醒 shapefile 使用正確的編碼來轉換。
TopoJSON 處理與繪製
產生 TopoJSON 檔後，我們便利用 topojson 模組提供的函式讀取該檔案：
```html
    <svg width="800px" height="600px" viewBox="0 0 800 600"></svg>
      <script type="text/javascript" src="http://d3js.org/topojson.v1.min.js"></script>
      <script>
        d3.json("county.json", function(topodata) {
          var features = topojson.feature(topodata, topodata.objects["county"]).features;
          // 這裡要注意的是 topodata.objects["county"] 中的 "county" 為原本 shp 的檔名
      </script>
```
然後利用 d3.geo.path 搭配 d3.geo.mercator 來繪圖：
```javascript
      var path = d3.geo.path().projection( // 路徑產生器
        d3.geo.mercator().center([121,24]).scale(6000) // 座標變換函式
      );
      d3.select("svg").selectAll("path").data(features).enter().append("path").attr("d",path);
```
繪製結果如下：
![alt tag](http://blog.infographics.tw/wp-content/uploads/2015/04/attempt-1.png   )
現在我們可再進一步針對地圖進行處理，處理如下：
```javascript
    d3.select("svg").selectAll("path").data(features).enter().append("path").attr({
        d: path,
        name: function(d){
          return d.properties[Cname];
        },
        fill:'#55AA00'
     });
```
最後結果如右：
![alt tag](https://hackpad-attachments.imgix.net/kaohsiung-school.hackpad.com_Ud2g6AKD0Oh_p.415786_1435226910491_%E6%93%B7%E5%8F%96.PNG?fit=max&w=882)
##b. 繪製縣市/行政區輪廓
參考自http://bost.ocks.org/mike/map/
作者寫出了一個function可讀取json檔中的縣市/行政區資料，並劃出界線
```javascript
  d3.select("#pathCanvas").append("path")         //縣市/行政區界線
    .datum(topojson.mesh(topodata, topodata.objects[type], function(a, b) { return a !== b ; }))
    .attr("d", path)
    .attr("class", "subunit-boundary");
```
並同時為每個path標籤附上class，如此可在之後的CSS中為邊界界線套上顏色和樣式，如下：
```css
    .subunit-boundary {
      fill: none;
      stroke: #000;
      stroke-dasharray: 2,2;
      stroke-linejoin: round;
    }
```
進一步的，我們可以使用mouseenter和mouseout，當滑鼠經過時會顯示每個縣市的名稱並變色，如下：
```javascript
  d3.select("svg").selectAll("path").on("mouseenter", function() {          // title div 顯示滑鼠所指向的縣市/行政區
      fill = $(this).attr("fill");
      $(this).attr("fill", '#00DD77');
      $('#title').html($(this).attr( "name" ));      
      $('#panel').css({"height": "20px","width": "50px"});
    }).on("mouseout", function() {
      $(this).attr("fill", fill);
    });

  $("path").mouseover(function(){                   //panel 區塊跟隨滑鼠移動
    $("path").mousemove( function(e) {
     mouseX = e.pageX; 
     mouseY = e.pageY;
    });  
    $('#panel').css({'top':mouseY,'left':mouseX}).fadeIn('slow');
  });
```
##c. 匯入經緯度資訊至網頁的台灣地圖中##
麻煩的來了，由於政府提供的shp檔中沒有經緯度這種東西，而有些災害如地震發生區域又是以經緯度來定位其震央位置，但我們網頁上的只是單純的svg向量圖，沒有所謂的座標，因此我的方式是開啟google地圖，並以直尺去測量台灣長度，在測量我自己網頁的台灣長度，換算出比例尺之後，可推出我網頁中svg邊界位置是在google地圖中的何處，在取其經緯度，寫出兩個funciton分別計算其經度和緯度，並換算為該點應該處於該svg中的何處(這方法很笨我知道...希望能有高人指點小弟此function更好的寫法，小弟感激不盡><) ：
```javascript
function mapTopixelX(x){
  var originX = 118.802981 , endX =  122.469668;   
  var webOriginX = 0  , webEndX = 800;
  var resultX = (x - originX)* ((webEndX-webOriginX)/(endX - originX));
  return resultX;
}
function mapTopixelY(y){
  var originY = 21.510473 , endY = 25.357116;   
  var webOriginY = 0 , webEndY = 900;
  var resultY = 900 - (y - originY)* ((webEndY-webOriginY)/(endY - originY));
  return resultY;
}
```
#3. 使用Canvas.js繪製即時表格#
根據前面小節「多來源資料處理」部分的說明，在程式碼最後是做資料的處理，並可呼叫下面function，並把所有Ajax 資料push進一個陣列，並以參數形式傳給此function，並開始繪製圖表：
```javascript
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
        dataPoints: rain_dataset                      //將所有的data匯入canvas圖表當中
      }
      ],
      backgroundColor: 'rgba(0,0,0,0)',
    });
  chart.render();

}
```
#4. 結語#
以上為小弟本次的project介紹，有點簡陋，如有仍不清楚的部分，歡迎email至 johnhckuo@gmail.com
我已將所有的檔案程式碼上傳至Github，同時也產生了Github Page，要看Demo的人也可前去測試，如有任何的Bug也歡迎回報(製作時程較短，應該有很多Bug，敬請見諒XD)
最後，感謝看到最後的大家，謝謝你們的捧場支持哈哈


###參考資料來源：###

-http://blog.infographics.tw/2015/04/visualize-geographics-with-d3js/

-http://bost.ocks.org/mike/map/

-http://canvasjs.com/



