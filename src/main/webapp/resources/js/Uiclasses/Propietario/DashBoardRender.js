var DashBoardender = new Class({
	Extends: Render,
    initialize: function(name){
        this.name = name;
    },
    getHtml: function(data){
        //return "../resources/static/dashboard.html"
    },
    
    populateData: function(dataToAppend){
    	var me=this;
    
    	$.get("resources/static/templateDashboard.html", function (data) {
    		$('body').append(data);
    		me.onFinishLoading(dataToAppend)
    	      
    	});

    },
   
    onFinishLoading : function(coleccion){
    	for (tipo in coleccion){
    		console.log("DATa",coleccion[tipo])
    		templateManager.add(tipo,coleccion[tipo])
    	}
    	jQuery(".corner-stamp").load('resources/static/corner.html');

    	createEffect(true);

    }
});

dashboardRender=new DashBoardender();