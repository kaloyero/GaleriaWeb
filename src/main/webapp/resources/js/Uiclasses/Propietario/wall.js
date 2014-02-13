/**
 * ------------------------------------------------------------------------
 * JA Wall Template for Joomla25
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2011 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - Copyrighted Commercial Software
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites:  http://www.joomlart.com -  http://www.joomlancers.com
 * This file may not be redistributed in whole or significant part.
 * ------------------------------------------------------------------------
 */

function createEffect(hideCommentSideBar){ 
(window.$wall || window.jQuery)(function($){
	// Masonry corner stamp modifications
	$.Mason.prototype.resize = function() {
		//this._getColumns();
		//this._reLayout();
	};
	var cornerStamp=null;
	
	if (!hideCommentSideBar) { 
		cornerStamp='.corner-stamp';
		$.Mason.prototype._reLayout = function( callback ) {
			var freeCols = this.cols,
				cornerStampHeight = 0,
				cornerStampCols = 0;
	
			if ( this.options.cornerStampSelector ) {
				var $cornerStamp = this.element.find( this.options.cornerStampSelector );
				if($cornerStamp.length){
					freeCols = Math.floor((
						$cornerStamp.offset().left -
							(this.element.offset().left +
							this.offset.x +
							parseInt($cornerStamp.css('marginLeft')))) / this.columnWidth );
	
					cornerStampHeight = $cornerStamp.outerHeight(true);
					cornerStampCols = Math.ceil($cornerStamp.outerWidth(true) / this.columnWidth);
				}
			}
	
			// reset columns
			var i = this.cols,
				il = Math.min(freeCols + cornerStampCols, this.cols);
	
			this.colYs = [];
			while (i--) {
				this.colYs.push( this.offset.y );
			}
	
			for ( i = freeCols; i < il; i++ ) {
				this.colYs[i] = this.offset.y + cornerStampHeight;
			}
	
			// apply layout logic to all bricks
			this.layout( this.$bricks, callback );
		};
	}
	//End Masonry modification

	var $container = $('#masonry-container'),
		itemSelector = '.item';
	


	// force show scrollbar
	$('#bd').css ('min-height', $(window).height() + 10);

	// add a blank, invisible masonry block to get the base width
	if (!$('#base-blank-item').length) {
		$('<div id="base-blank-item" class="' + itemSelector.substr(1) + '" style="height:0;visibility:hidden" />').appendTo ($container);
	}
	var uwsid = 0,
		lastWndWidth = 0,
		reloadMasonry = function () {
			//$(document.body).addClass ('masonry-relayout');
			$container.masonry('reload', function(){
				$(document.body).removeClass ('masonry-relayout');
			});
		},

		updateContainerWidth = function () {
			lastWndWidth = $(window).width();

			var cw = $('#base-blank-item').css('width', '').width(), // wrapper width
				mw = $container.width(), // wrap width
				cols = Math.round(mw / cw), //  detect number of columns by it's container
				cw_ = Math.floor(mw / cols), // update new width
				mw_ = cols * cw_;

			$('#base-blank-item').width(cw_);
			if ($container.data('basewidth') != cw_) {
				$container.data('basewidth', cw_);
				updateBrickWidth();
			}

			// reload layout
			reloadMasonry();
		},

		updateBrickWidth = function ($bricks) {

		};
		console.log("SCORNR",cornerStamp)
	// init masonry
	$container.masonry({
		itemSelector: itemSelector,
		isResizable: false,
		cornerStampSelector: cornerStamp
	});

	// reload masonry when image loaded
	$container.imagesLoaded(function(){
		//lastWndWidth = -1; //force to reload
		updateContainerWidth();
	});

});
}
//function check iframe popup load to resize
function ifmOnload(){
	if(this.src == 'about:blank'){
		return;
	}
	
	$(document.body).addClass ('popupview-loaded');
	this.id="popupIFrame";
	var doc=$("#popupIFrame")
	/*var doc = this.contentDocument ? this.contentDocument : window.frames[this.id].document,
		ifm = this;
	console.log("EL Doc",doc)
	if (doc.readyState && doc.readyState != 'complete'){
	   return;
	}

	if (doc.body && doc.body.innerHTML == "false"){
		return;
	}*/
	
	this.height = $(doc).height();
	
	if(window.popupIscroll){
		window.popupIscroll.destroy();
	}

	//window.popupIscroll = new iScroll('popup-inner', {vScrollbar: true, hScrollbar: false, scrollbarClass: 'popupTracker', useTransform: false, scroller: (isTouch ? doc.getElementById('container') : null) });
	var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion)
	if(isTouch){
		$(doc).bind('touchmove.scroll', function(e){
			e.preventDefault();
		});
	} 

	if($.browser.opera || $.browser.mozilla || ($.browser.msie && $.browser.version >= 9)){
		$(doc).bind('mousewheel.iscroll', $.proxy(window.popupIscroll._wheel, window.popupIscroll));
	} else if($.browser.msie && $.browser.version < 9){
		
		var script = doc.createElement('script');
		script.src = JADef.tplurl + 'js/scrollevent.js';
		doc.body.appendChild(script);
	}
	
	$(doc.body).find('a').each(function(){
		if($(this).attr('target') != '_blank'){
			$(this).attr('target', '_parent');
		}
	});
};

function bindEvents(){ 
	$('#popup-close').click(function(){
		console.log("click")
		$('#popup-view').trigger('click');
	});

	$('#popup-content').click (function (e) {
		e.stopPropagation();
	});

	$('#popup-view').click (function (e) {
		e.stopPropagation();
		var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion)

		if(window.popupIscroll){
			window.popupIscroll.destroy();
			window.popupIscroll = null;
		}
		var jiframe = $('#popup-content').find('iframe');
		
		if(jiframe.length){
			var ifmdoc = (jiframe[0].contentDocument) ? jiframe[0].contentDocument : window.frames[jiframe[0].id].document;
			
			$(ifmdoc).find('object').remove();
			
			if(isTouch){
				$(ifmdoc).unbind('touchmove.scroll');
			}
			
			if($.browser.mozilla && jiframe.length){
				$(ifmdoc).unbind('mousewheel.iscroll');
			}
		}
		
		//fix iframe IE9
		jiframe.attr('src', 'about:blank').css('visibility', 'hidden');
		setTimeout(function(){
			$('#popup-inner').remove();
			$(document.body).removeClass ('popupview popupview-loaded');
		}, 10);
		
		return false;
	});
	}




function openPopupWithData(aviso) {
	// check if window is smaller than popup width - 600px
	if ($(document.body).width() < 700){
		return true;
	}
	
	// add div to show content
	if (!$('#popup-view').length) {
		$('<div id="popup-view"><div id="popup-content"><a id="popup-close" href="javascript:;" class="btn-close"></a></div>').appendTo (document.body);				
	}
	
	if($(document.body).hasClass ('popupview')){
		return false;
	}
	
	// add popup class to body
	$(document.body).addClass ('popupview');				

	
	/*$('<div id="popup-inner" />')
		.html ($('<iframe id="popupIFrame" src="' + url + '" width="638" scrolling="no" frameborder="0" />')
			.bind('load', ifmOnload))
		.appendTo ('#popup-content');*/
	$('<div id="popup-inner" />').appendTo('#popup-content')
	
	var template=templateManager.getTemplate('aviso');
    	template.tmpl(aviso).appendTo('#popup-inner');

	ifmOnload();
	bindEvents();
	return false;
};



