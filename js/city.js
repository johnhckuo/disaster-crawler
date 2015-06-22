function taipei_rain(type , button){
  toogleButton(button);

  var flag = 0;
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
 /* for (var i = 0 ;i <data_url.length ; i++){
    
    
    $.when(ajax_data(data_url[i])).done(function(a1, a2, a3, a4){
        // the code here will be executed when all four ajax requests resolve.
        // a1, a2, a3 and a4 are lists of length 3 containing the response text,
        // status, and jqXHR object for each of the four ajax calls respectively.
    });
  }   */

  var deferreds = [];
  $.each(data_url, function(index, stat){

      deferreds.push(
          // No success handler - don't want to trigger the deferred object
          $.ajax({
            type:'GET', 
            dataType:'jsonp', 
            url:this.url
      //      success: function(temp) {
            
      //    }    
            
          })
      );
  });
  // Can't pass a literal array, so use apply.
  $.when.apply($,deferreds).then(function(){


    for (var j = 0 ; j < arguments.length ; j++){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)   
        if (data[i][title] == 'T' || data[i][title] == '')
          continue;   
        temp += parseFloat(data[i][title]);
      }
  
      taipei_dataset.push(temp);
     }
      if (type == 'single')
        historyRain(taipei_dataset,'台北市');          
      else 
        mix_Rain(taipei_dataset,'台北市');         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}




function kaohsiung_rain(type , button){

  toogleButton(button);
  var flag = 0;
  var deferreds = [];
  var kaohsiung_dataset = [];

  var data_url = [
  {
  'title':'2002_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/delf1ep2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2003_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/2p1v5leg?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2004_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/8trvz924?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2005_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/7jubeoh8?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2006_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/67v9amle?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2007_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/an1wzfmc?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2008_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/dvryzbtu?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2009_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/c8g2zdmw?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2010_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/2v7f1yeq?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2011_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/4ykus87o?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2012_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/b85rm9r6?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2013_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/4qmxnyq2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2014_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/8i536ds4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2015_kaohsiung_rain',
  'url':'https://www.kimonolabs.com/api/cqkj1zcu?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  }
  ]
 /* for (var i = 0 ;i <data_url.length ; i++){
    
    
    $.when(ajax_data(data_url[i])).done(function(a1, a2, a3, a4){
        // the code here will be executed when all four ajax requests resolve.
        // a1, a2, a3 and a4 are lists of length 3 containing the response text,
        // status, and jqXHR object for each of the four ajax calls respectively.
    });
  }   */

  var deferreds = [];
  $.each(data_url, function(index, stat){

      deferreds.push(
          // No success handler - don't want to trigger the deferred object
          $.ajax({
            type:'GET', 
            dataType:'jsonp', 
            url:this.url
      //      success: function(temp) {
            
      //    }    
            
          })
      );
  });
  // Can't pass a literal array, so use apply.
  $.when.apply($,deferreds).then(function(){


    for (var j = 0 ; j < arguments.length ; j++){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)   
        if (data[i][title] == 'T' || data[i][title] == '')
          continue;  
        temp += parseFloat(data[i][title]);
      }
  
      kaohsiung_dataset.push(temp);
     }
     if (type == 'single')
        historyRain(kaohsiung_dataset , '高雄市');           
      else 
        mix_Rain(kaohsiung_dataset,'高雄市'); 
              
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}


function taichung_rain(type,button){
  toogleButton(button);
  var flag = 0;
  var deferreds = [];
  var taichung_dataset = [];

  var data_url = [
  {
  'title':'2002_taichung_rain',
  'url':'https://www.kimonolabs.com/api/a95no3m4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2003_taichung_rain',
  'url':'https://www.kimonolabs.com/api/7so0r96o?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2004_taichung_rain',
  'url':'https://www.kimonolabs.com/api/6d10f3es?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2005_taichung_rain',
  'url':'https://www.kimonolabs.com/api/6o5verlc?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2006_taichung_rain',
  'url':'https://www.kimonolabs.com/api/3hekj30e?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2007_taichung_rain',
  'url':'https://www.kimonolabs.com/api/238p4nau?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2008_taichung_rain',
  'url':'https://www.kimonolabs.com/api/3y0pk9ya?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2009_taichung_rain',
  'url':'https://www.kimonolabs.com/api/4wcet3lk?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2010_taichung_rain',
  'url':'https://www.kimonolabs.com/api/b00lwe34?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2011_taichung_rain',
  'url':'https://www.kimonolabs.com/api/30as8alk?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2012_taichung_rain',
  'url':'https://www.kimonolabs.com/api/2dtkkm90?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2013_taichung_rain',
  'url':'https://www.kimonolabs.com/api/302hxgn6?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2014_taichung_rain',
  'url':'https://www.kimonolabs.com/api/e467rn3g?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'title':'2015_taichung_rain',
  'url':'https://www.kimonolabs.com/api/c64wurek?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  }
  ]
 /* for (var i = 0 ;i <data_url.length ; i++){
    
    
    $.when(ajax_data(data_url[i])).done(function(a1, a2, a3, a4){
        // the code here will be executed when all four ajax requests resolve.
        // a1, a2, a3 and a4 are lists of length 3 containing the response text,
        // status, and jqXHR object for each of the four ajax calls respectively.
    });
  }   */

  var deferreds = [];
  $.each(data_url, function(index, stat){

      deferreds.push(
          // No success handler - don't want to trigger the deferred object
          $.ajax({
            type:'GET', 
            dataType:'jsonp', 
            url:this.url
      //      success: function(temp) {
            
      //    }    
            
          })
      );
  });
  // Can't pass a literal array, so use apply.
  $.when.apply($,deferreds).then(function(){


    for (var j = 0 ; j < arguments.length ; j++){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =1 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)   
        if (data[i][title] == 'T' || data[i][title] == '')
          continue;  
        temp += parseFloat(data[i][title]);
      }
  
      taichung_dataset.push(temp);
     }
     if (type == 'single')
        historyRain(taichung_dataset , '台中市');            
      else 
        mix_Rain(taichung_dataset,'台中市'); 
               
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}