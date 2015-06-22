function temperature_fetch(place  , button , year , temp_place){

  toogleButton(button);
  if (last != null && temp_place == false){
    if( last!= place )
      temp_mixchart.options.data=[];
  }
  if (temp_place == 'init' && !(temp_init)){
    temp_init = true;
    temp_mixchart.options.data=[];
  }

  last = place;

  if (year == '2015'){
    var flag = 0;
    var deferreds = [];
    var taipei_dataset = [];
    var kaohsiung_dataset = [];
    var taichung_dataset = [];
    var taipei = '2015_Taipei_temperature';
    var kaohsiung = '2015_Kaohsiung_temperature';
    var taichung = '2015_Taichung_temperature';

    var data_url = [
    {
    'name' : '2015/5',
    'taipei' : taipei,
    'kaohsiung' : kaohsiung,
    'taichung' : taichung,
    'url':'https://www.kimonolabs.com/api/8ax2pymq?apikey:naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
    },{
    'name' : '2015/4',
    'taipei' : taipei,
    'kaohsiung' :kaohsiung ,
    'taichung' : taichung,
    'url':'https://www.kimonolabs.com/api/9dto9pwo?apikey:naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
    },{
    'name' : '2015/3',
    'taipei' : taipei,
    'kaohsiung' : kaohsiung,
    'taichung' : taichung,
    'url':'https://www.kimonolabs.com/api/802dox0u?apikey:naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
    },{
    'name' : '2015/2',
    'taipei' : taipei,
    'kaohsiung' : kaohsiung,
    'taichung' : taichung,
    'url':'https://www.kimonolabs.com/api/4hzlp1g6?apikey:naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
    },{
    'name' : '2015/1',
    'taipei' : taipei,
    'kaohsiung' : kaohsiung,
    'taichung' : taichung,
    'url':'https://www.kimonolabs.com/api/2s3pjrpq?apikey:naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


      for (var j = arguments.length-1 ; j >=0  ; j--){
       
        var title = arguments[j][0].name;
        var data = arguments[j][0].results.collection1;

        temp = 0;
        for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
        //  if( data[i]['2009_taipei_rain'] > temp)    
          taipei_dataset.push(data[i][taipei]);
          kaohsiung_dataset.push(data[i][kaohsiung]);
          taichung_dataset.push(data[i][taichung]);
        }
    
        
       }

         mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                   // console.log(this.url+' = url');
      }).fail(function(){
          // Probably want to catch failure
      }).always(function(){
          // Or use always if you want to do the same thing
          // whether the call succeeds or fails
      });

      //console.log(taipei_dataset)

}else if (year == '2014'){

  var flag = 0;
  var deferreds = [];
  var taipei_dataset = [];
  var kaohsiung_dataset = [];
  var taichung_dataset = [];
  var taipei = '2014_Taipei_temperature';
  var kaohsiung = '2014_Kaohsiung_temperature';
  var taichung = '2014_Taichung_temperature';

  var data_url = [
  {
  'name' : '2014/12',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/67fvdypo?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/11',
  'taipei' : taipei,
  'kaohsiung' :kaohsiung ,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6fhaueg2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/10',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/ej3sl6k4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/9',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/a7f5r8lc?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/8',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3pl2rsao?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/7',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5v6sa492?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/6',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/bkp570t8?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/5',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/d8jtqm30?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/4',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/9h65c3k8?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/3',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5w3smbj0?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/2',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/dcndwwge?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2014/1',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6www4zf4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


    for (var j = arguments.length-1 ; j >=0  ; j--){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)    
        taipei_dataset.push(data[i][taipei]);
        kaohsiung_dataset.push(data[i][kaohsiung]);
        taichung_dataset.push(data[i][taichung]);
      }
  
      
     }

       mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}else if (year == '2013'){


  var flag = 0;
  var deferreds = [];
  var taipei_dataset = [];
  var kaohsiung_dataset = [];
  var taichung_dataset = [];
  var taipei = '2013_Taipei_temperature';
  var kaohsiung = '2013_Kaohsiung_temperature';
  var taichung = '2013_Taichung_temperature';

  var data_url = [
  {
  'name' : '2013/12',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/bc0b68km?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/11',
  'taipei' : taipei,
  'kaohsiung' :kaohsiung ,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/cdr0tgyo?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/10',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/d1nmjv5g?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/9',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3et21rr2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/8',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5o5yq196?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/7',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/afmqjlca?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/6',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/995cl194?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/5',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/9w9mymkm?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/4',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/7jem3xy8?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/3',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/aafz52xk?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/2',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5njtf6m6?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2013/1',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/7xh462g0?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


    for (var j = arguments.length-1 ; j >=0  ; j--){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)    
        taipei_dataset.push(data[i][taipei]);
        kaohsiung_dataset.push(data[i][kaohsiung]);
        taichung_dataset.push(data[i][taichung]);
      }
  
      
     }

       mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}else if (year == '2012'){


  var flag = 0;
  var deferreds = [];
  var taipei_dataset = [];
  var kaohsiung_dataset = [];
  var taichung_dataset = [];
  var taipei = '2012_Taipei_temperature';
  var kaohsiung = '2012_Kaohsiung_temperature';
  var taichung = '2012_Taichung_temperature';

  var data_url = [
  {
  'name' : '2012/12',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/cofuq710?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/11',
  'taipei' : taipei,
  'kaohsiung' :kaohsiung ,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/7vtmlejc?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/10',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/8d85vlz4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/9',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/8441dr6m?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/8',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6mkvnwry?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/7',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5hkf44fk?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/6',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/4aoytlr6?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/5',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/4i1amc3k?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/4',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5ydmbu2s?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/3',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/bd2xl92e?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/2',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/2mxxma58?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2012/1',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/7vokyxw4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


    for (var j = arguments.length-1 ; j >=0  ; j--){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)    
        taipei_dataset.push(data[i][taipei]);
        kaohsiung_dataset.push(data[i][kaohsiung]);
        taichung_dataset.push(data[i][taichung]);
      }
  
      
     }

       mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}else if (year == '2011'){


  var flag = 0;
  var deferreds = [];
  var taipei_dataset = [];
  var kaohsiung_dataset = [];
  var taichung_dataset = [];
  var taipei = '2011_Taipei_temperature';
  var kaohsiung = '2011_Kaohsiung_temperature';
  var taichung = '2011_Taichung_temperature';

  var data_url = [
  {
  'name' : '2011/12',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/61lewz0g?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/11',
  'taipei' : taipei,
  'kaohsiung' :kaohsiung ,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/4rx0f1i2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/10',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/30ijzaz0?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/9',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/amhuau4m?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/8',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6fcaxiii?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/7',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3e2w3jo8?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/6',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3q7w9e90?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/5',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/d5dlzth2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/4',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/8ls3a0b4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/3',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/a3rwn6mm?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/2',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3rpppvxg?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2011/1',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5p5laz7m?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


    for (var j = arguments.length-1 ; j >=0  ; j--){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)    
        taipei_dataset.push(data[i][taipei]);
        kaohsiung_dataset.push(data[i][kaohsiung]);
        taichung_dataset.push(data[i][taichung]);
      }
  
      
     }

       mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}else if (year == '2010'){




  var flag = 0;
  var deferreds = [];
  var taipei_dataset = [];
  var kaohsiung_dataset = [];
  var taichung_dataset = [];
  var taipei = '2010_Taipei_temperature';
  var kaohsiung = '2010_Kaohsiung_temperature';
  var taichung = '2010_Taichung_temperature';

  var data_url = [
  {
  'name' : '2010/12',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3berxtm6?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/11',
  'taipei' : taipei,
  'kaohsiung' :kaohsiung ,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/68mimrkc?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/10',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/cehxu2qg?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/9',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/ajmi66ae?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/8',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/263nqc7g?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/7',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3trgh42m?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/6',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/8kx64krc?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/5',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/8wyf3sn2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/4',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/de0u5wg0?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/3',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/8r5yv00a?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/2',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/4805m5n8?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2010/1',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/czlrrdv4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


    for (var j = arguments.length-1 ; j >=0  ; j--){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)    
        taipei_dataset.push(data[i][taipei]);
        kaohsiung_dataset.push(data[i][kaohsiung]);
        taichung_dataset.push(data[i][taichung]);
      }
  
      
     }

       mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}else if (year == '2009'){





  var flag = 0;
  var deferreds = [];
  var taipei_dataset = [];
  var kaohsiung_dataset = [];
  var taichung_dataset = [];
  var taipei = '2009_Taipei_temperature';
  var kaohsiung = '2009_Kaohsiung_temperature';
  var taichung = '2009_Taichung_temperature';

  var data_url = [
  {
  'name' : '2009/12',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/c4it2uic?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/11',
  'taipei' : taipei,
  'kaohsiung' :kaohsiung ,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/7g5i86nm?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/10',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6sq24foa?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/9',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/be6rmb72?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/8',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3truanas?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/7',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5o8mhi4c?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/6',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/at656ef0?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/5',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/akvbsjr4?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/4',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5h2b6bnu?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/3',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/5bh04ifk?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/2',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/e6bziqzu?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2009/1',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6sjptxpa?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


    for (var j = arguments.length-1 ; j >=0  ; j--){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)    
        taipei_dataset.push(data[i][taipei]);
        kaohsiung_dataset.push(data[i][kaohsiung]);
        taichung_dataset.push(data[i][taichung]);
      }
  
      
     }

       mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}else if (year == '2008'){


  var flag = 0;
  var deferreds = [];
  var taipei_dataset = [];
  var kaohsiung_dataset = [];
  var taichung_dataset = [];
  var taipei = '2008_Taipei_temperature';
  var kaohsiung = '2008_Kaohsiung_temperature';
  var taichung = '2008_Taichung_temperature';

  var data_url = [
  {
  'name' : '2008/12',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/cottpa2o?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/11',
  'taipei' : taipei,
  'kaohsiung' :kaohsiung ,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/bbt2w29o?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/10',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/9z55u510?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/9',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6akjflm2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/8',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/844a9zeg?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/7',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6aep7wj2?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/6',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/a89ctd0o?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/5',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/8zzuan1s?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/4',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/b8n3enfs?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/3',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/6nvsjq98?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/2',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/cnkf9bic?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
  },{
  'name' : '2008/1',
  'taipei' : taipei,
  'kaohsiung' : kaohsiung,
  'taichung' : taichung,
  'url':'https://www.kimonolabs.com/api/3ivlun90?apikey=naavoBVo7aWjT2ezKOPHoUqBjLkogX8Q'
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


    for (var j = arguments.length-1 ; j >=0  ; j--){
     
      var title = arguments[j][0].name;
      var data = arguments[j][0].results.collection1;

      temp = 0;
      for (var i =0 ; i<data.length ; i++){       //第一筆json值為字串
      //  if( data[i]['2009_taipei_rain'] > temp)    
        taipei_dataset.push(data[i][taipei]);
        kaohsiung_dataset.push(data[i][kaohsiung]);
        taichung_dataset.push(data[i][taichung]);
      }
  
      
     }

       mix_Temperature(taipei_dataset,kaohsiung_dataset,taichung_dataset,place );         
                 // console.log(this.url+' = url');
    }).fail(function(){
        // Probably want to catch failure
    }).always(function(){
        // Or use always if you want to do the same thing
        // whether the call succeeds or fails
    });

    //console.log(taipei_dataset)

}
}