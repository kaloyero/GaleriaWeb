var ActividadReservaRender = new Class({
	Extends: Render,
    initialize: function(name){
        this.name = name;
    },

    
    populateData: function(dataToAppend){
    		this.onFinishLoading(dataToAppend);
    },
   
    onFinishLoading : function(dataToAppend){
    	var self=this;
    	this.cleanCanvas();
    	$("#content").append(dataToAppend);
    	$("body").removeClass();

    	$("body").addClass("bd-home gridview hoverable has-sidebar basegrid-m display-fullview display-imageview");
    	jQuery(".corner-stamp").load('../resources/static/corner.html',function(){
    				createEffect();
    				self.bindEvents();

    			});
    	

    },
	bindEvents : function() {
		var self=this;
		$(".anotarseAcvitidad").click(
				function() {

					var actividadParticipar = {
								//"actividadId" : $(this).parents(".item").find("input").val(),
								"cronogramaId": self.getCronogramaId(this)
								
							};
					console.log("PART",actividadParticipar)
						dialogRender.create({onAccept:function(){translator.onSubmitJson('actividadParticipar',actividadParticipar)}});
				});

	},
	getCronogramaId : function(element) {
		return $(element).attr("id")
	}
});

actividadReservaRender=new ActividadReservaRender();