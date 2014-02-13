var AvisoRender = new Class(
		{
			Extends : Render,
			initialize : function(name) {
				this.name = name;
			},
			load : function(dataToAppend) {
				this.cleanCanvas();
				$("body").removeClass();
				$("body").addClass("has-sidebar has-aside");
				// $(".corner-stamp").remove()
				$("#mainbody").prepend(dataToAppend);
			},
			populateData : function(dataToAppend) {
				console.log("APPEND", dataToAppend)
				this.onFinishLoading(dataToAppend);
			},

			onFinishLoading : function(dataToAppend) {
				this.cleanCanvas();
				$("#content").append(dataToAppend);
				$("body").removeClass();
				$("body")
						.addClass(
								"bd-home gridview hoverable has-sidebar basegrid-m display-fullview");
				jQuery(".corner-stamp").load('../resources/static/corner.html',
						function() {
							createEffect();
						});
				this.bindEvents();

			},

			bindEvents : function(dataToAppend) {
				$(".openDescription").click(
						function() {
							$("body").addClass("bd-component windowview");
							var aviso = new Object();
							aviso.titulo = $(this).text();
							aviso.descripcion = $(this).parent().parent().find(
									'.description').val();
							aviso.creado = $(this).parent().parent().find(
									'.creacion').text();
							aviso.categoria = $(this).parent().parent().find(
									'.categoria').text();
							openPopupWithData(aviso);
						});
			}
		})

avisoRender = new AvisoRender();