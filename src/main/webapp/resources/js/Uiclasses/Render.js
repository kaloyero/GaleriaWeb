var Render = new Class({
    initialize: function(){
       
    },
    
    /*
     * Si los hijos,no sobrescriben este metodo,significa que al formulario antes de enviarlo,no hay que hacerle nada como por ejemplo en InstrRender
     */
    onSubmit: function(id){
    	var activeTab= $(".active").children().attr("href");
    	var form=$(activeTab).find("form");
    	return form;
    },
   
    /*
     * Todos los grids se van a llenar de la misma forma
     */
    populateGrid: function(objectType){
    	var activeTable =$('.active-table').dataTable( {
    		"bProcessing": true,
    		"sAjaxSource": objectType+"/lista",
    		
    		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
    							//Cada vez que se dibuja una fila,se ejecuta este Callback,y se pone el ID del nodo al TR
    							var id = aData[0];
    							$(nRow).attr("id",id);
    							return nRow;
    						},
    	} );
    	
    	//Escondo la primer columna ID
    	activeTable.fnSetColumnVis( 0, false );
    	//Inicializo calendario 
    	$('.datepicker').datepicker({ dateFormat: 'dd-mm-yy' });
    },
    getActiveTab: function(){
    	 return  $(".active").children().attr("href");
    },
    
    getAddTab: function(){
   	 return  $("#new");
   },
   
   	getAddForm: function(){
	   	 return  $(this.getAddTab()).find("form");
	},
    
    getActiveForm: function(){
   	 return $(this.getActiveTab()).find("form");
   },
   
   onNewTab: function(){
   	var form=this.getActiveForm();
   	$(form).find(".datepicker").datepicker({
		dateFormat : 'dd-mm-yy'
	});

   },
    
});

render=new Render();