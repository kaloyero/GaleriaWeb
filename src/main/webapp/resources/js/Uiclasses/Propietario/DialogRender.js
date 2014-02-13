var DialogRender = new Class(
		{
			Extends : Render,

			create : function(config) {
				$("#dialog-confirm").remove();
				$("#content").append('<div id="dialog-confirm" title="Anotarse?"><p>'+
						'<span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;">'+
						'</span>Una vez que acepta quedara inscripto.Segurola?</p></div>')
				 $("#dialog-confirm" ).dialog({
				      resizable: false,
				      height:140,
				      modal: true,
				      buttons: {
				        "Anotarse": function() {
				        	config.onAccept();
				        	 $( this ).dialog( "close" );
				        },
				        Cancel: function() {
				          $( this ).dialog( "close" );
				        }
				      }
				    });
			}
	
		});

dialogRender = new DialogRender();