var myArray = [];



var InfraccionRender = new Class({
	Extends: Render,
    initialize: function(name){
        this.name = name;
    },
    onLoaded: function(){
    	var form=this.getAddForm();
    	myArray = new Array();
    	
    	console.log($("#categorias").get(0));
    	console.log($("#categorias"));
    	
    	
    	myArray[ -1 ] = "0";
    	myArray[ 0 ] = "1200";
    	myArray[ 4 ] = "150";
    	myArray[ 5 ] = "200";
    	
    	this.bindListeners(form);
    	
    	
    },
    onNewTab: function(){
    	var form=this.getActiveForm();
    	this.bindListeners(form);
    	
    },  
    bindListeners: function(form){
    	var self=this;

    	form.find("#infraccionSelect").change(function() {
    		console.log(myArray[form.find("#infraccionSelect").val()]);
    		form.find("#importeBox").val(myArray[form.find("#infraccionSelect").val()]);
		});
    },
});


infraccionRender=new InfraccionRender();