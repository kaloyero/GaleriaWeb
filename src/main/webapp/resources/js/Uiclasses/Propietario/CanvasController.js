var CanvasController = new Class({
    initialize: function(){
    	

    },
    
    show : function(type){
    	translator.onList(type);
    },
    showForm : function(type){
    	translator.showForm(type);
    },
    
    onFinishShow : function(type,data){
    	console.log("TYPE ",type)
    	var renderInstace = renderTranslator.getRender(type);

    	renderInstace.populateData(data);
    
    },
    clean : function(){
    	$(".tileContent").empty(); //TODO ver como recuperar el main y borrar todo excepto el corner
    	$(".canvas").remove();
    	$(".formulario").remove();
    	$("#content").empty();
    	
    },
    
    onLoaded: function(type,data){
    	
    	var renderInstace = renderTranslator.getRender(type);
    	
    	renderInstace.load(data);
    },
    
});
var canvasController=new CanvasController();



