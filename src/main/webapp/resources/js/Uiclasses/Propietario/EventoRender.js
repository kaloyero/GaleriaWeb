var EventoRender = new Class(
		{
			Extends : Render,
			initialize : function(name) {
				this.name = name;
			},
			//Se ejecuta cuando se pide el listado
			populateData : function(dataToAppend) {
				this.onFinishLoading(dataToAppend);
			},
			//Se ejecuta al perdir el formulario para cargar uno nuevo

			load : function(dataToAppend) {
				this.cleanCanvas();
				this.addDataToMainBody(dataToAppend);
				this.setStyle();
				this.bindEventsForNew();
			},
			
			onFinishLoading : function(dataToAppend) {
				var self=this;
				this.cleanCanvas();
				this.addDataToContent(dataToAppend);
				this.setStyleList();
				jQuery(".corner-stamp").load('../resources/static/corner.html',function(){
    				createEffect();
    				self.bindEvents();
    			});

			},
			bindEvents : function() {
				this.getAnotarseEventoButton().click(
						function() {
							var eventoParticipar = {
								"evento" : $(this).find("input").val()
							};
				        	dialogRender.create({onAccept:function(){translator.onSubmitJson('eventoParticipar',eventoParticipar)}});	
						});

			},
			bindEventsForNew : function() {
				var self =this;
				$('#fecha').datepicker({
					dateFormat : 'dd-mm-yy'
				});
				this.getShowDisponibilidadesButton().click(function(){
					self.loadRecursoPanel();
					self.getNewEventFormPlaceHolder().slideToggle('slow')
					self.getDisponibilidadPlaceHolder().slideToggle('slow');
			
				})
				/*
				this.getCupoInput().change(function(){
					if($(this).val()>1) {
						$("#diasCombo").removeAttr("disabled", "disabled");
						$("#fecha").attr("disabled", "disabled");
						$("#fecha").css('opacity','.2')

					}else{
						$("#fecha").removeAttr("disabled", "disabled");
						$("#fecha").css("opacity","");

						$("#diasCombo").attr("disabled", "disabled");

					}
				})*/

			},
			loadRecursoPanel : function() {
				//Pregunto si ya se habia cargado el calendario de recursos
				if (this.getCalendarPlaceHolder().length==0)
					sideBarController.onOptionSelected('recurso_lista');

			},
			setStyle : function() {
				this.getBody().removeClass();
				this.getBody().addClass("has-sidebar has-aside");
				
			},
			setStyleList : function() {
				this.getBody().removeClass();
				this.getBody().addClass("bd-home gridview hoverable has-sidebar basegrid-m display-fullview");
				
			},
			getCupoInput : function() {
				return $('#cupo');
			},
			getDisponibilidadPlaceHolder : function() {
				return $('#disponibilidadesPanel');
			},
			getNewEventFormPlaceHolder : function() {
				return $('#evento_nuevo');
			},
			getCalendarPlaceHolder : function() {
				return $("#calendar");
			},
			getShowDisponibilidadesButton : function() {
				return $("#showDisponibilidades");
			},
			getAnotarseEventoButton : function() {
				return $(".anotarseEvento");
			}
		});

eventoRender = new EventoRender();