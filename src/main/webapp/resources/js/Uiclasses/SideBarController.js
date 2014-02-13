var SideBarController = new Class({
    initialize: function(){
       
    },
    onOptionSelected: function(objectType){
    	translator.onShow(objectType);
    },
    
    bindMenuEvents:function(container) {
    	this.bindMenuOptionsEvents();
    	this.bindMenuCollapseEffect(container);
    },
    
    bindMenuOptionsEvents:function() {
    	$('.option').bind("click", function(e) {
    		var objectId=$(this).attr("id");
    		sideBarController.onOptionSelected(objectId);
    			
    });
    },
 
    //TODO Esto ya venia en el template que nos bajamos,anda,pero analizar el codigo
    bindMenuCollapseEffect:function(container){
	 $('li:has(ul)',container).each(function() {
			$('>a', container).append("<span class='arrow'></span>");
		});

     $('.sub', container).hide();
     $('li.expand > .sub', container).show();
     $('li.expand > .sub', container).prev().addClass('activeOption');
     $('li a', container).click(
         function(e) {
             e.stopImmediatePropagation();
             var theElement = $(this).next();
             var parent = this.parentNode.parentNode;
             if($(this).hasClass('active-icon')) {
             	$(this).addClass('non-active-icon');
             	$(this).removeClass('active-icon');
             }else{
             	$(this).addClass('active-icon');
             	$(this).removeClass('non-active-icon');
             }
             if($(parent).hasClass('noaccordion')) {
                 if(theElement[0] === undefined) {
                     window.location.href = this.href;
                 }
                 $(theElement).slideToggle('normal', function() {
                     if ($(this).is(':visible')) {
                         $(this).prev().addClass('activeOption');
                     }
                     else {
                         $(this).prev().removeClass('activeOption');
                         $(this).prev().removeClass('active-icon');
                     }
                 });
                 return false;
             }
             else {
                 if(theElement.hasClass('sub') && theElement.is(':visible')) {
                     if($(parent).hasClass('collapsible')) {
                         $('.sub:visible', parent).first().slideUp('normal',
                         function() {
                             $(this).prev().removeClass('activeOption');
                             $(this).prev().removeClass('active-icon');
                         }
                     );
                     return false;
                 }
                 return false;
             }
             if(theElement.hasClass('sub') && !theElement.is(':visible')) {
                 $('.sub:visible', parent).first().slideUp('normal', function() {
                     $(this).prev().removeClass('activeOption');
                     $(this).prev().removeClass('active-icon');
                 });
                 theElement.slideDown('normal', function() {
                     $(this).prev().addClass('activeOption');
                 });
                 return false;
             }
         }
     }
 );


}


});
var sideBarController=new SideBarController();