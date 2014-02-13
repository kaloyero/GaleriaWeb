var RecursoReservaEventoRender = new Class(
		{
			Extends : RecursoReservaRender,
			initialize : function(name) {
				this.name = name;
				this.events = null;
			},


			onFinishLoading : function(dataToAppend) {
				this.getDisponibilidadPlaceHolder().append(dataToAppend);
				this.addSpecificHtml();
				this.setStyle();

				calendarController.createCalendar(null, null, this.getCalendarConfig());
				this.bindEvents();
				this.createSources();

			},
			bindEvents : function() {
				this.parent();
				var self=this;
				this.getBackButton().bind("click", function(e) {
					self.showEventPanel();
		    			
		    });
			},
			onEventClick:function(calEvent, jsEvent, view){
				var reserva=this.getReservaEntity(calEvent);
				$("#fecha").val(reserva.fecha)
				$("#horarioRecursoElegido").val(reserva.horaIni+":"+reserva.minutosIni)
				$("#recursoElegido").val(this.getSelectedRecursoName())
				//Cuando tenemos un id con un punto (algo.algo),hay que usar las barras para que Jquery entienda
				$("#reserva\\.horaIni").val(reserva.horaIni)
				$("#reserva\\.duracion").val(reserva.duracion)
				$("#reserva\\.fecha").val(reserva.fecha)
				$("#reserva\\.recursoId").val(reserva.recursoId)
				$("#reserva\\.minutosIni").val(reserva.minutosIni)

				this.showEventPanel();
			},
			addSpecificHtml : function() {
				//Pregunto si ya se habia agregado la opcion volver
				if (this.getBackButton().length==0)
					this.getRecursoComboPlaceHolder().after('<input type="button" class="button" value="Volver" id="volver">')

			},
			getBackButton : function() {
				return $('#volver');
			},
			getDisponibilidadPlaceHolder : function() {
				return $('#disponibilidadesPanel');
			},
			getNewEventFormPlaceHolder : function() {
				return $('#evento_nuevo');
			},
			setStyleOnBack : function() {
				this.getBody().removeClass();
				this.getBody().addClass("has-sidebar has-aside");
			},
			showEventPanel : function() {
				this.setStyleOnBack();
				this.getNewEventFormPlaceHolder().slideToggle('slow');
				this.getDisponibilidadPlaceHolder().slideToggle('slow');
			}

		});

recursoReservaEventoRender = new RecursoReservaEventoRender();