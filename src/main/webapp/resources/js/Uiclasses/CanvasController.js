var CanvasController = new Class({
    initialize: function(){
    	this.bindTableEvents();
    	this.bindTabEvents(); 

    },
    createTabs: function(){
        this.getTabContainer().find('.tab-content').hide();
        this.getTabContainer().find("ul.tabs li:first").addClass("active").show();
    	this.getTabContainer().find(".tab-content:first").show();
    },
    createDashboard:function(){
    	$('#graph-data').visualize({type: 'line', height: 250}).appendTo('#tab-line').trigger('visualizeRefresh');
    	
    },
   
    addTab: function(nameRow, id, content){
    	this.getTabContainer().find("ul.tabs li").removeClass("active");
    	this.getTabContainer().find('.tab-content').hide();
        
    	$(".tabs").append('<li><a href=#' + id + '>' + nameRow + '</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span> </li>');
    	$(".tab-container").append('<div id=' + id + ' class="tab-content">' + content + '</div>');

    	this.getTabContainer().find("ul.tabs li:last").addClass("active").show();
    },

	

    
    bindTabEvents: function(){
    	var self=this;
    	this.getTabContainer().find("ul.tabs li").live("click", function() {
    		self.getTabContainer().find("ul.tabs li").removeClass("active");
    		$(this).addClass("active");
    		self.getTabContainer().find(".tab-content").hide();

    		var activeTab = $(this).find("a").attr("href");
    		$(activeTab).fadeIn();
    	});
    },
    
   
   
    bindTableEvents: function(){
    	
    	var self=this;
    	this.getTableRows().live("click", function(event) {
    		var objectType=self.getTableId(this);
    		var id=$(this).attr("id");
    		var rowSelectedName=$(event.target.parentNode).children(0).eq(0).text();
    		translator.onLoad(objectType,id,rowSelectedName);
    	});
    },
    
    onLoaded: function(rowSelectedName,id,objectType,data){
    	this.addTab(rowSelectedName,id+objectType,data);
    	
       	switch (objectType) {
		 case "recurso":
			recursoRender.onNewTab();
			break;
		 case "actividad":
				actividadRender.onNewTab();
		 case "integrante":
			integranteRender.onNewTab();
			break;
		 case "mensajeReclamo":
			 	mensajeReclamoRender.onNewTab();
				break;
		 case "instructor":
				instructorRender.onNewTab();
				break;
		 case "infraccion":
			 infraccionRender.onNewTab();
				break;
			
		default :
			render.onNewTab();
       	}
    },
    onSaved: function(){
    	this.removeActiveTab();
    	this.activeFirstTab();
    },
    
    onShowOption: function(objectType,data){
    	$("#main-content").empty();
		$("#main-content").append(data);

		
		
	   	switch (objectType) {
		 case "recurso":
			 	recursoRender.draw();
			 	break;
		 case "actividad":
				actividadRender.onLoaded();
		 case "integrante":
				integranteRender.onLoaded();
				break;
		 case "mensajeReclamo":
			 	mensajeReclamoRender.onLoaded();
				break;
		 case "instructor":
				instructorRender.onLoaded();
				break;
		 case "infraccion":
				infraccionRender.onLoaded();
				break;			

	}
	    this.createTabs();

	 	this.populateGrid(objectType);
    },
    
    populateGrid: function(objectType){
    	translator.onPopulateGrid(objectType);
    },
    
    getTabContainer: function(){
    	return $("#tab-panel-1");
    },
    getClose: function(){
    	
    	this.getTabContainer().find(".tab-content").remove();
    },
    
    getTableRows: function(){
    	return $('.active-table tbody tr');
    },
    
    getTableId: function(table){
    	return $(table).parent().parent().attr("id");
    },
    removeActiveTab:function(){
    	var activeTab=$(".active")
    	var activeTabContent = $(activeTab).find("a").attr("href");
		$(activeTabContent).remove();
		$(activeTab).remove();
    },
    activeFirstTab:function(){
    	this.getTabContainer().find("ul.tabs li")[0].addClass("active");
    	var activeTab = $(".active").find("a").attr("href");
		$(activeTab).fadeIn();
    }
    
});
var canvasController=new CanvasController();
