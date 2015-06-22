$(document).ready(function(){
		 
		  $.ajax({ 
     		type:'GET', 
     		dataType:'jsonp', 
			 url:'http://opendata.epa.gov.tw/ws/Data/RainTenMin/?$orderby=PublishTime%20desc&$skip=0&$top=1000&format=json', 
   			 success:function (data){
   			    
				var color = d3.scale.linear().domain([0,150]).range(["#090","#f00"]);
				for (var i = 0; i < data.length ; i++){
					for (var j = 0 ; j < features.length ; j++){
						if (features[j].properties.C_Name == data[i].County){
							d3.select("svg").selectAll("path").data(features).attr({
							    d: path,
							    fill: function(d) {
							      return color(data[i].Rainfall24hr);
							}
			      		});
			      	}
			      }
			  }


			     // $('#container').append("<li>"+"<span>"+str[i].Title+"</span></li>");
			      
			   }
   			 });
 		  });  
		