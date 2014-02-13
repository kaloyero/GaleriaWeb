var MensajeRender = new Class({
	Extends: Render,
    initialize: function(name){
        this.name = name;
    },
    
    onFinishLoading : function(coleccion){
    	this.cleanCanvas();
    	$("#content").append(dataToAppend);
    	jQuery(".corner-stamp").load('../resources/static/corner.html');
    	$("body").removeClass();
    	$("body").addClass("bd-home gridview hoverable has-sidebar basegrid-m display-fullview");
    	
        createEffect();
    	
    
    }
   
});

mensajeRender=new MensajeRender();