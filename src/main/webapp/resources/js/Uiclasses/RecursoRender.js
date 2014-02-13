var RecursoRender = new Class({
	Extends: Render,
    initialize: function(name){
        this.name = name;
    },
    draw: function(){
    	var form=this.getAddForm();
    	this.createCalendarComponent(form);
    	//this.bindEvents();
    	this.hideCalendarHeader();
    },
    onNewTab: function(){
    	var form=this.getActiveForm();
    	this.createCalendarComponent(form);
    	this.hideCalendarHeader();

    	//var obj = JSON.parse($(form).find("#disponibilidades").attr("value"));
    	//console.log("OBBJ",obj);
    },
   
    bindEvents: function(){
    	var self=this
    	$("#dis").bind('click', function() {
    			self.toogleSelection("dis");
    			$("#calendar").fullCalendar( 'rerenderEvents' )
	      });
    	
    	$("#exc").bind('click', function() {
			self.toogleSelection("exc");
			$("#calendar").fullCalendar( 'rerenderEvents' )
      });
    },
    
    toogleSelection:function(selection){
    	if (selection =="dis"){
    		this.uncheckException();
    		this.hideCalendarHeader();

    	}else{
    		this.uncheckDisponibilidad();
    		this.showCalendarHeader();
    	}

    },
    
    uncheckException:function(){
    	$("#exc").attr('checked', false)
    },
    
    uncheckDisponibilidad:function(){
    	$("#dis").attr('checked', false)
    },
    
    
    hideCalendarHeader:function(){
    	$(".fc-header").hide()
    },
    
    showCalendarHeader:function(){
    	$(".fc-header").show()
    },
    
    createCalendarComponent: function(form){
    	var me=this;
    	//var eventList =self.getListEvents(form);
    	//var events = JSON.parse(eventList);
    	var events=null
    	var configCalendar=this.getCalendarConfig();
    	calendarController.createCalendar(form,function(start, end, callback){me.populateExistingEvents(start, end, callback);},configCalendar);
    },
    
    /*Cargar eventos del recurso antes de mostrar*/
    populateExistingEvents: function(start, end, callback){
    	
    	var self=this;
    	var events = [];
    	var form=self.getAddForm();
     	var eventList =self.getListEvents(form);
     	
     	console.log("ADDEVENTSOURCE",eventList);
     	
     	if (eventList) {
     		var obj = JSON.parse(eventList);
     		$(obj).each(function(index) {
     			var fechaDesde= new Date(start.getTime());
     			var fechaHasta= new Date(start.getTime());
     			console.log("Obje",this);
     			console.log("StartGetTime",start.getDate());
     			fechaDesde.setDate(start.getDate() +this.dia);
     			fechaDesde.setHours(this.horaIni);
     			fechaHasta.setDate(start.getDate() +this.dia);
     			fechaHasta.setHours(this.horaFin);
     			console.log("Des",fechaDesde);
     			console.log("Hasta",fechaHasta);

         	
     			var nuevoEvento=new Object();
     			nuevoEvento.title="PPUT";
     			nuevoEvento.allDay=false;
     		
     			nuevoEvento.start=fechaDesde;
     			nuevoEvento.end=fechaHasta;
     	
     			events.push(nuevoEvento);
     	})}
     	/*if (eventList) {
     		var obj = JSON.parse(eventList);
         	console.log("Obje",obj);
     	
     	
     	$(obj[0]).each(function(index) {

     		console.log("THIS ",this)
     		console.log("START ",start)
     		
     		var nextWeekStart= new Date(start.getTime());
     		var dia=this.start.getDay();
     		console.log("DIA ",dia)
     		console.log("DATE ",start)
     		console.log("GetDate",this.start.getDate())
     		console.log("TOTAL ",this.start.getDate() + dia)
     		console.log("ANTES",nextWeekStart)
     		nextWeekStart.setDate(start.getDate()+dia)
     		nextWeekStart.setHours(this.start.getHours())
     		var nextWeekEnd = new Date(start.getTime());
     		
     		nextWeekEnd.setDate(start.getDate()+dia)
     		nextWeekEnd.setHours(this.end.getHours())
    		var nuevoEvento=new Object();
     		nuevoEvento.title="PPUT";
     		nuevoEvento.allDay=false;
     		
     		nuevoEvento.start=nextWeekStart;
     		nuevoEvento.end=nextWeekEnd;
     		
     		console.log("DATENE",nextWeekStart)
     	    console.log("DATEEND",nextWeekEnd)
    		events.push(nuevoEvento);
    	})}*/
    	console.log("PASA")
    	callback( events,[true] );
    	
    },
    
    getListEvents: function(form){
    	//return $(form).find("#calendar").fullCalendar( 'clientEvents')
    	
    	return this.getForm().find("#recursoDis").attr("value")
    },
    
    getCreatedEvents: function(form){
    	return $(form).find("#calendar").fullCalendar( 'clientEvents')
    		
    },
    
    getForm: function(){
    	var activeTab= $(".active").children().attr("href");
    	var form=$(activeTab).find("form")
    	return form;
    	
    },
    
    onSubmit: function(){
    	var disponibilidades = [];
    	var html = [];
    	var form=this.getActiveForm();
    	console.log("FORM",form)
    	var eventList =this.getCreatedEvents(form);
    	console.log("EVENTLIUST",eventList)
    	
    	$(eventList).each(function(index) {
    		disponibilidades.push({"Dia": this.start.getDay(), "horaIni": this.start.getHours(),"horaFin": this.end.getHours()});
    	})
    	
    	var disponibilidadesText = JSON.stringify(disponibilidades);
    	$('[name="disponibilidades"]').remove();
    	html.push("<input type=hidden id=testa  name='disponibilidades' value="+disponibilidadesText+">")
    	form.append(html.join(''));
    	console.log("EVENTOS ",disponibilidadesText)
    	return form;
    },
    getCalendarConfig:function(){
    	
    	var calendarConfig ={
    			selectable: true,
    			select: function(start, end, allDay) {
    			    	/*
    			    	$('#calendar').fullCalendar("columnFormat",{
    		                month: 'dddd',    // Monday, Wednesday, etc
    		                week: 'dddd, MMM dS', // Monday 9/7
    		                day: 'dddd, MMM dS'  // Monday 9/7
    		            })*/

    			    	 end.setHours(end.getHours()+1);
    			    	 end.setMinutes(0);
    						this.calendar.renderEvent(
    							{
    								title: "",
    								start: start,
    								end: end,
    								allDay: allDay
    							},
    							true // make the event "stick"
    						);

    				},
    				viewDisplay: function(view) {
    					console.log("CAMBIA")
    				},
    		   defaultView: 'agendaWeek',
    				 columnFormat: {
    					 month: 'dddd',    // Monday, Wednesday, etc
    		             week: 'dddd', // Monday 9/7
    		               // day: 'dddd, MMM dS'  // Monday 9/7
    					},
    					minTime: 7,
    					maxTime: 21,
    			        color: 'yellow',  
    			        textColor: 'black' 
    			    
    	    };
    	
    	return calendarConfig;
    }
    
});

recursoRender=new RecursoRender();