var Utils = new Class({
   
	initialize: function(name){
    },
    convertHourToMinutes:function(hour){
    	var arrayValores     = hour.split(':');
		var minutes  = parseFloat(arrayValores[0])*60 + parseFloat(arrayValores[1]);
		return minutes;
    }
});

utils=new Utils();