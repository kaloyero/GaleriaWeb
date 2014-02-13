var MensajeReclamoRender = new Class({
	Extends: Render,
    initialize: function(name){
        this.name = name;
    },
    onLoaded: function(){
    	var form=this.getAddForm();
    	this.bindListeners(form);
    	
    },
    onNewTab: function(){
    	var form=this.getActiveForm();
    	this.bindListeners(form);
    	
    },
    bindListeners: function(form){
    }
	    
   
});

mensajeReclamoRender=new MensajeReclamoRender();