var RecursoReservaRender = new Class(
		{
			Extends : Render,
			initialize : function(name) {
				this.name = name;
				this.events = null;
			},

			populateData : function(dataToAppend) {
				this.onFinishLoading(dataToAppend);
			},

			onFinishLoading : function(dataToAppend) {
				this.cleanCanvas();
				this.addDataToContent(dataToAppend);
				this.setStyle();

				calendarController.createCalendar(null, null, this.getCalendarConfig());
				this.bindEvents();
				this.createSources();
			},
			setStyle : function() {
				this.getBody().removeClass();
				this.getBody().addClass("bd-home gridview hoverable has-sidebar basegrid-m display-fullview");
			},
			bindEvents : function() {
				this.bindRecursoEvents();
			},
			bindRecursoEvents : function() {
				var self=this;
				this.getRecursoComboPlaceHolder().change(
						function() {
							var selectedRecurso = $(this).find('option:selected').val();
							// Si selecciono algo
							if (selectedRecurso != -1){
								self.setSelectedRecurso(selectedRecurso);
								self.getRecursoDisponibilidades();
							}
						 });
			},
			getRecursoDisponibilidades:function(){
				translator.onLoad("recurso", this.getSelectedRecurso());
			},
			load : function(data) {
				console.log("DATA",data)
				this.addSpecificHtml(data);
				this.setDisponibilidades(data.disponibilidadesDivididas);
				this.events = null;
				this.eventosDisponiblesAEliminar=new Array();
				this.getCalendarPlaceHolder().fullCalendar( 'refetchEvents' );
			},
			addSpecificHtml : function(data) {
				$("#importeRecurso").empty();
				$("#importeRecurso").append("<strong style='font-family:arial;color:#9E7474;font-size:25px;'>Costo :"+data.importe+"$</strong>")

			},
			createSources : function() {
				this.createDisponibilidadesSource();
				this.createDiasOcupadosSource();
			},
			createDiasOcupadosSource : function() {
				var self =this;
				this.getCalendarPlaceHolder().fullCalendar('addEventSource',
				{
							events: function(start, end, callback) {
								if (self.isRecursoSelected()){
									$.ajax({
										url: 'recursoReserva/diasOcupados/'+self.getSelectedRecurso(),
										type: 'GET',
										success: function(doc) {
											//TODO no me conviene en realidad pintar y cambiar algun valor de los eventos disponibles ya pintados en lugar
											//de hacer todo el lio del EventAfterRender y etc?
											callback(JSON.parse(doc), [ true ]);
										}
									});
								}
 				            },
				            color: 'yellow',  
				            textColor: 'black'		
                });
			},
			createDisponibilidadesSource : function() {
				var self=this;
				this.getCalendarPlaceHolder().fullCalendar('addEventSource',
						function(start, end, callback) {
							var translatedEvents = [];
							var eventList = self.getDisponibilidades();
							self.removeEvents();
							if (eventList){ 
									self.events = JSON.parse(eventList);
									translatedEvents = self.getTranslatedEvents(start, end);
							}
							
							console.log("EVENTOS",$('#calendar').fullCalendar('clientEvents'));
							callback(translatedEvents, [ true ]);
						});
			},
			
			removeEvents : function() {
				this.getCalendarPlaceHolder().fullCalendar('removeEvents', function(event) {
					return true;
				});
			},

			getTranslatedEvents : function(start, end) {
				var id = 2;
				var events = [];
				var self = this;
				//Por cada evento disponible,lo traduzco para que lo entienda el plugin de calendarios
				$(self.getEvents()).each(function(index) {
					var event = self.getEvents()[index];
					var fechaDesde = new Date(start.getTime());
					var fechaHasta = new Date(start.getTime());
					fechaDesde.setDate(start.getDate() + event.dia);
					fechaDesde.setHours(event.horaIni);
					fechaHasta.setDate(start.getDate() + event.dia);
					fechaHasta.setHours(event.horaFin);

					var nuevoEvento = new Object();
					nuevoEvento.title = "Disponible";
					nuevoEvento.allDay = false;

					nuevoEvento.start = fechaDesde;
					nuevoEvento.end = fechaHasta;
					nuevoEvento.id=id;
					events.push(nuevoEvento);
					id++;

				});
				return events;
			},

			getCalendarConfig : function() {
				var self=this;
				var calendarConfig = {
					selectable : true,
					viewDisplay : function(view) {
						return false;
					},
					eventRender: function(event, element) {
						self.saveEventsToBeRemoved(event)
				    },
				    //Cuando se terminan de renderizados los eventos,recorro el Array de eventos a eliminar
				    eventAfterAllRender: function(view) {
				    	self.removeCalendarEvents();
				    },
				
				    defaultView:"agendaWeek",
				    allDayDefault: false,
					columnFormat : {
						month : 'dddd',
						week : 'dddd',
					},
					minTime : 7,
					maxTime : 21,
					color : 'yellow',
					textColor : 'black',
					eventClick : function(calEvent, jsEvent, view) {
						self.onEventClick(calEvent, jsEvent, view);
					}
			};

				return calendarConfig;
			},
			getEvents : function() {
				return this.events;
			},
			onEventClick:function(calEvent, jsEvent, view){
				if (calEvent.title=="Disponible"){

					var reserva = this.getReservaEntity(calEvent);
		        	dialogRender.create({onAccept:function(){translator.onSubmitJson('recursoReserva', reserva)}});
				}else{
					alert("Este horario esta ocupado!!")
				}
				
			},
			isRecursoSelected : function() {
				if ($("#recursoCombo").find('option:selected').val()!=-1) return true;
					return false;
			},
			getSelectedRecurso : function() {
				return this.selectedRecurso;
			},
			setSelectedRecurso : function(recurso) {
				this.selectedRecurso=recurso;
			},
			getSelectedRecursoName : function() {
				return this.getRecursoComboPlaceHolder().find('option:selected').text();
			},
			getDisponibilidades : function() {
				return this.disponibilidades;
			},
			setDisponibilidades : function(disponibilidades) {
				this.disponibilidades=disponibilidades;
			},

			getEventosAEliminar : function() {
				return this.eventosDisponiblesAEliminar;
			},
			getCalendarPlaceHolder : function() {
				return $("#calendar");
			},
			getRecursoComboPlaceHolder : function() {
				return $("#recursoCombo");
			},
			//Si encuentro un evento ocupado,no deberia mostrar el evento Disponible en ese mismo lugar,guardo el id para removerlo luego
			saveEventsToBeRemoved:function(event){
				 var dateFrom=event.start;
				 var self =this;
				var dateTo=event.end;
				if (event.title =="Disponible"){
					
					$('#calendar').fullCalendar('clientEvents', function(eventa) {
						if(eventa.start.getTime() == dateFrom.getTime() && eventa.end.getTime() == dateTo.getTime() && eventa.title!="Disponible") {
							self.getEventosAEliminar().push(event.id);
						}
				});
			 }
			},
			removeCalendarEvents:function(){
				if (this.getEventosAEliminar())
		    		for (i=0;i<this.getEventosAEliminar().length;i++){
		    			this.getCalendarPlaceHolder().fullCalendar( 'removeEvents',this.getEventosAEliminar()[i] );
		    		}
				this.eventosDisponiblesAEliminar=new Array();
			},
			getReservaEntity:function(calEvent){
				var date = calEvent.start.getDate();
				var month = calEvent.start.getMonth() + 1; //Months are zero based
				var year = calEvent.start.getFullYear();
				var fecha=date + "-" + month + "-" + year;
				var horaIni=calEvent.start.getHours();
				var minutes=calEvent.start.getMinutes();
		        //var horario=horaIni +":" +minutes
				var reserva = {
						"descripcion" : "borrarCampo",
						"recursoId" : this.getSelectedRecurso(),
						"horaIni" : horaIni,
						"duracion" : 1,
						"fecha":fecha,
						"minutosIni":minutes
						
				};
				return reserva;
			}

		});

recursoReservaRender = new RecursoReservaRender();