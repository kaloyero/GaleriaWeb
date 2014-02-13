var IntegranteRender = new Class({
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
    	var self=this;
    	this.addCloseListenerToAllList(form);
    	form.find("#addPhone").click(function() {
    		var newEntry="";
    		if (form.find("#telNumber").val().trim() != "" ){
    			newEntry=" <span class='idTel' hidden='true'>0</span>"	;
    			newEntry+="<span class='idTipoTe' hidden='true'>"+ form.find("#telContact").val() +" </span>";
    			newEntry+="<span class='tipoTe' >"+ form.find("#telContact option:selected").text() +" </span>";
	    		newEntry+="<strong>( </strong><span class='pais'> "+ form.find("#telCountry").val()+"</span>";
	    		newEntry+= " <span class='state'>" +form.find("#telState").val() + "</span>";
	    		newEntry+= " <span class='prefix'>" +form.find("#telPrefijo").val() + "</span><strong> ) </strong>";
	    		newEntry+=" <span class='tel'>" +form.find("#telNumber").val()+"</span>"	;
	    		form.find("#listaTelefonos").append("<li><div class='alert success telefono'><span class='hide'>x</span> "+newEntry+"</div></li>");
	    		self.addCloseListener(form);
	    		form.find("#telCountry").val("");
	    		form.find("#telState").val("");
	    		form.find("#telPrefijo").val("");
	    		form.find("#telNumber").val("");

    		}
		});
	
    },
    addCloseListener: function(form){
    	form.find('#listaTelefonos li:last-child').click(function() {
    		$(this).slideUp();					   
    	});
    	
    },
    addCloseListenerToAllList: function(form){
    	form.find('#listaTelefonos li').click(function() {
    		$(this).slideUp();					   
    	});
    	
    },
    onSubmit: function(id){
    	
    	var activeTab= $(".active").children().attr("href");
    	var form=$(activeTab).find("form");
    	
    	var telefonos = [];
    	var html = [];
       	$('.telefono').each(function(index) {
       		telefonos.push({"Telefono": parseInt($(this).find(".tel").text()),
       						"Country":  parseInt($(this).find(".pais").text()),
       						"State": 	parseInt($(this).find(".state").text()),
       						"Prefix": 	parseInt($(this).find(".prefix").text()),
       						"IdTel": 	parseInt($(this).find(".idTel").text()),
       						"IdTipoTel":  parseInt($(this).find(".idTipoTe").text())});
    	});
       	
       	var telefonosText = JSON.stringify(telefonos);
       	html.push("<input type=hidden id=testa  name='persona.telefonos' value="+telefonosText+">");
       	form.append(html.join(''));
    	return form;
    }
});

integranteRender=new IntegranteRender();
