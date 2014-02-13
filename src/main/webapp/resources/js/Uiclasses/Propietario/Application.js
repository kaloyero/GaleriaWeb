var Application = new Class({
    initialize: function(){
       this.status="opening"
    },
    setStatus: function(status){
    	this.status=status;
    },
    getStatus: function(){
    	return this.status;
    },
    isAddingNewEvent: function(){
    	if (this.getStatus()=="evento_propietario_nuevo")
    		return true;
       return false;
    }


});
    

application=new Application();