var Render = new Class({
    initialize: function(){
       
    },
    
    /*
     * Si los hijos,no sobrescriben este metodo,significa que al formulario antes de enviarlo,no hay que hacerle nada como por ejemplo en InstrRender
     */
    onSubmit: function(id){
    
    },
    cleanCanvas: function(){
        canvasController.clean();
    },
    
    onFinishLoading : function(coleccion){
    	var me=this;
    	me.cleanCanvas();
    	
    	for (tipo in coleccion){
    		templateManager.add(tipo,coleccion[tipo])
    	}
    	//$(template).tmpl(data).appendTo('#masonry-container');
    	createEffect();
    },
    getBody: function(){
    	return $('body');
    },
    getMainBody: function(){
    	return $("#mainbody");
    },
    addDataToContent: function(dataToAppend){
        $("#content").append(dataToAppend);
    },
    addDataToMainBody: function(dataToAppend){
        this.getMainBody().append(dataToAppend);
    },
    
});

render=new Render();