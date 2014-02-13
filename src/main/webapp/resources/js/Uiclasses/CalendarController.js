var Calendarcontroller = new Class({
    initialize: function(name){
       
    },
    
    createCalendar: function(form,callbackEventSource,config){
        
    	var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		
	
		this.setCalendar(form,config);
		if (callbackEventSource)
			this.bindCalendarEvents(form,callbackEventSource)
	   
    	},
    
    bindCalendarEvents: function(form,callbackEventSource){
    	
    	this.getCalendarPlaceHolder(form).fullCalendar( 'addEventSource',   
 			   function(start, end, callback) {
 	    			callbackEventSource(start, end, callback);
 	    });
    },
    
    getCalendar: function(form){
    	return $(form).find("#calendar");
    },
    
    getCalendarPlaceHolder: function(form){
    	return $(form).find("#calendar");
    },
    
    setCalendar: function(form,config){
    	if (form){
        	$(form).find("#calendar").fullCalendar(config);

    	}else {
    		$("#calendar").fullCalendar(config);
    	}
    }   
  
});

calendarController=new Calendarcontroller();