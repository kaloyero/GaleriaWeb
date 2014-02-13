var ServerManager = new Class({
    initialize: function(name){
        this.name = name;
        this.services={};
        this.services['actividad']={};
        this.services['instructor']={};
        this.services['unidad']={};
        this.services['integrante']={};
        this.services['concepto']={};
        this.services['recurso']={};
        this.services['vehiculo']={};
        this.services['mascota']={};
        this.services['tipoAutorizacion']={};
        this.services['tipoDocumento']={};
        this.services['tipoEspecie']={};
        this.services['tipoInfraccion']={};
        this.services['tipoPago']={};
        this.services['tipoRaza']={};
        this.services['tipoRecurso']={};
        this.services['tipoVacuna']={};
        this.services['tipoVehiculo']={};
        this.services['mensajeCategoria']={};
        this.services['mensajesPropietario']={};
        this.services['mensaje']={};
        this.services['mensajeReclamo']={};
        this.services['noticiaCategoria']={};
        this.services['avisoCategoria']={};
        this.services['dashboard']={};
        this.services['meReclamos']={}
        this.services['actividadesReserva']={};
        this.services['recursosReserva']={};
        this.services['evento']={};
        this.services['infraccion']={};
        this.services['noticia']={};
        this.services['eventos']={};
        this.services['aviso']={};
        this.services['infraccion']={};
        this.services['actividad']["load"]="actividad/load/";
        this.services['actividad']["save"]="actividad/create";
        this.services['instructor']["load"]="instructor/load/";
        this.services['instructor']["save"]="instructor/create";
        this.services['unidad']["load"]="unidad/load/";
        this.services['unidad']["save"]="unidad/create";
        this.services['integrante']["load"]="integrante/load/";
        this.services['integrante']["save"]="integrante/create";
        this.services['concepto']["load"]="concepto/load/";
        this.services['concepto']["save"]="concepto/create";
        this.services['recurso']["load"]="recurso/load/";
        this.services['recurso']["save"]="recurso/create/"
        this.services['vehiculo']["load"]="vehiculo/load/";
        this.services['vehiculo']["save"]="vehiculo/create/";
        this.services['mascota']["load"]="mascota/load/";
        this.services['mascota']["save"]="mascota/create/";
        this.services['tipoAutorizacion']["load"]="tipoAutorizacion/load/";
        this.services['tipoAutorizacion']["save"]="tipoAutorizacion/create/";
        this.services['tipoDocumento']["load"]="tipoDocumento/load/";
        this.services['tipoDocumento']["save"]="tipoDocumento/create/";
        this.services['tipoEspecie']["load"]="tipoEspecie/load/";
        this.services['tipoEspecie']["save"]="tipoEspecie/create/";
        this.services['tipoInfraccion']["load"]="tipoInfraccion/load/";
        this.services['tipoInfraccion']["save"]="tipoInfraccion/create/";
        this.services['tipoPago']["load"]="tipoPago/load/";
        this.services['tipoPago']["save"]="tipoPago/create/";
        this.services['tipoRaza']["load"]="tipoRaza/load/";
        this.services['tipoRaza']["save"]="tipoRaza/create/";
        this.services['tipoRecurso']["load"]="tipoRecurso/load/";
        this.services['tipoRecurso']["save"]="tipoRecurso/create/";
        this.services['tipoVacuna']["load"]="tipoVacuna/load/";
        this.services['tipoVacuna']["save"]="tipoVacuna/create/";
        this.services['tipoVehiculo']["load"]="tipoVehiculo/load/";
        this.services['tipoVehiculo']["save"]="tipoVehiculo/create/";
        this.services['mensajeCategoria']["load"]="mensajeCategoria/load/";
        this.services['mensajeCategoria']["save"]="mensajeCategoria/create/";
        this.services['noticiaCategoria']["load"]="noticiaCategoria/load/";
        this.services['noticiaCategoria']["save"]="noticiaCategoria/create/";
        this.services['avisoCategoria']["load"]="avisoCategoria/load/";
        this.services['avisoCategoria']["save"]="avisoCategoria/create/";
        this.services['avisoCategoria']["lista"]="avisoCategoria/lista";
        this.services['dashboard']["lista"]="dashboard/lista/";
        this.services['mensajesPropietario']["lista"]="mensaje/listaPropietario";
        this.services['meReclamos']["lista"]="mensaje/listaMisMensajes";
        this.services['actividadesReserva']["lista"]="actividad/actividadesParaReservar";
        this.services['recursosReserva']["lista"]="recurso/recursosParaReservar";
        this.services['recursosReserva']["load"]="recurso/recursosParaReservar/load/";
        this.services['evento']["load"]="evento/load/";
        this.services['evento']["save"]="evento/create/";
        this.services['mensaje']["load"]="mensaje/load/";
        this.services['mensaje']["save"]="mensaje/create/";
        this.services['mensajeReclamo']["load"]="mensajeReclamo/load/";
        this.services['mensajeReclamo']["save"]="mensajeReclamo/create/";
        this.services['noticia']["load"]="noticia/load/";
        this.services['noticia']["save"]="noticia/create/";
        this.services['aviso']["load"]="aviso/load/";
        this.services['aviso']["save"]="aviso/create/";
        this.services['eventos']["lista"]="evento/listaPropietario";
        this.services['aviso']["lista"]="aviso/lista";
        this.services['infraccion']["load"]="infraccion/load/";
        this.services['infraccion']["save"]="infraccion/create/";  
    },

    get: function(config){
    	var self=this;
    	$.ajax({
			type: 'GET',
			url: self.services[config.object]["load"]+config.objectId,
			success: function(data) {
				
				config.onSuccess(data);
			}
		});
    },
    getAll: function(config){

    	var self=this;
    	$.ajax({
			type: 'GET',
			url: self.services[config.object]["lista"],
			success: function(data) {
				
				config.onSuccess(data);
			}
		});
    },
   
    save: function(config){
    	var self=this;
    	console.log("SAVSERI",config.form.serialize())
    	    	console.log("SAVESINSER",config.form)

    	$.ajax( {
		      type: "POST",
		      url: self.services[config.object]["save"],
		      data: config.form.serialize(),
		      success: function(data) {
		    	  config.onSuccess(data);
				}
		    } );
    },
    
    update: function(config){
    	var self=this;

    	$.ajax( {
		      type: "POST",
		      url: self.services[config.object]["load"]+config.objectId,
		      data: config.form.serialize(),
		      success: function(data) {
		    	  config.onSuccess(data);
				}
		    } );
    },   
    show: function(config){
    	var self=this;
    	$.ajax({
    		type: 'GET',
    		url: self.services[config.object]["save"],
    		success: function(data) {
    			config.onSuccess(data);	
    		}
    	});
    }
   
});

serverManager=new ServerManager();