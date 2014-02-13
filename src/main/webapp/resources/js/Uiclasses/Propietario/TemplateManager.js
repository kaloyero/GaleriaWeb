var TemplateManager = new Class({

    getTemplate: function(idTemplate){
    	
    	switch (idTemplate) {
		case "noticias":
			return $('#noticasTemplate');
			break;
		case "mensajes":
			return $('#reclamosTemplate');
		case "aviso":
		return $('#avisoTemplate');
			break;

    }},
    
    add: function(idTemplate,data){
    	console.log("Data a Agregar",data)
    	var template=this.getTemplate(idTemplate);
    	console.log("TEMPLATe",idTemplate)
    	template.tmpl(data).appendTo('#masonry-container');
    }
    
   
});

templateManager=new TemplateManager();