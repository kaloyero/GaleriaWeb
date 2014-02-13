var ResumenRender = new Class({
	Extends: Render,
    initialize: function(name){
        this.name = name;
    },

    
    populateData: function(dataToAppend){
    	this.cleanCanvas();
		$("body").removeClass();
		$("body").addClass("has-sidebar has-aside");
		// $(".corner-stamp").remove()
		$("#mainbody").prepend(dataToAppend);
    }
   
});

resumenRender=new ResumenRender();