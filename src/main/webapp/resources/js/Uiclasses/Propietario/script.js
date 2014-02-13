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
 
/**
 * General script for JA Wall template
 */

var TouchMask = {
	handlers: [],
	isbind: 0,
	ontouch: function(){
		var result = 1;
		TouchMask.handlers.each(function(fn){
			result = fn() && result;
		});
		
		if(result){
			document.removeEvent('touchstart', TouchMask.ontouch);
			TouchMask.isbind = 0;
		}
	},
	
	show: function(){
		if(this.isbind){
			return false;	
		}
		
		document.addEvent('touchstart', TouchMask.ontouch);
		
		this.isbind = 1;
	},
	register: function(handler){
		if(typeOf (handler) == 'function' && this.handlers.indexOf(handler) == -1){
			this.handlers.push(handler);
		}
	},
	unregister: function(handler){
		this.handlers.erase(handler);
	}
};


var JawallMenu = {
	initialize: function(){
		JawallMenu.isAndroidTable =  navigator.userAgent.toLowerCase().indexOf('android') > -1 &&  navigator.userAgent.toLowerCase().indexOf('mobile') == -1;
		JawallMenu.isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
		JawallMenu.isTablet = JawallMenu.isTouch && (window.innerWidth >= 720);
		JawallMenu.enableTouch();
		JawallMenu.check();
		window.addEvent('resize', JawallMenu.check);
	},
	
	enableTouch: function(){
		if (JawallMenu.isTouch){
			var jmainnav = $('mainnav');
			
			if(!jmainnav){
				return false;
			}
			
			var	jmenu = jmainnav.getElement('.menu'),
				jitems = jmenu.getElements('li.deeper'),
				onTouch = function(e){
					var i, len, noclick = !this.retrieve('noclick');
 
 					e.stopPropagation();

					// reset all
					for (i = 0, len = jitems.length; i < len; ++i) {
						jitems[i].store('noclick', 0);
					}

					if(noclick){
						var jshow = this.addClass('hover').getParents('li.parent').addClass('hover');
						jshow = jshow.append([this]);
						jitems.each(function (jitem) {
							if(!jshow.contains(jitem)){
								jitem.removeClass('hover');
							}
						});
					}
			 
					this.store('noclick', noclick);
					this.focus();
				},
				onClick = function(e){
					e.stopPropagation();

					if(this.retrieve('noclick')){
						e.preventDefault();

						jitems.removeClass('hover');
						this.addClass('hover').getParents('li.parent').addClass('hover');

						TouchMask.hidetoggle();
						TouchMask.show();
					} else {
						var href = this.getElement('a').get('href');
						if(href){
							window.location.href = href;
						}
					}
				};
			
			jitems.each(function(jitem){
				jitem.addEvent('touchstart', onTouch)
					.addEvent('click', onClick)
					.store('noclick', 0);
			});

			JawallMenu.resetmenu = function(){
				jitems.store('noclick', 0).removeClass('hover');
				return true;
			};

			TouchMask.register(JawallMenu.resetmenu);
		}
	},
	
	oldWidth: 0,
	
	check: function(){
		var wwidth = window.getWidth();
		if(wwidth == JawallMenu.oldWidth){
			return;
		}
		
		JawallMenu.oldWidth = wwidth;
		
		var jmainnav = $('mainnav');
		
		if(!jmainnav){
			return;
		}
		
		var	jmenuinner = jmainnav.getElement('.menu-inner'),
			jmenu = jmainnav.getElement('.menu');
			
		if(!jmenuinner || !jmenu){
			return;
		}
		
		//check if we have to implement scroll
		if (jmenu.offsetWidth > jmenuinner.offsetWidth) {
			jmenu.setStyle('float', 'left');
			
			if(!window.menuIScroll){
				var jprev = jmainnav.getChildren('.navprev')[0] ||  new Element('a', {
						'href': 'javascript:;',
						'class': 'navprev'
					}).inject(jmainnav).addEvent('click', function(){
						if(window.menuIScroll){
							window.menuIScroll.scrollToPage('prev');
						}
						
						if(JawallMenu.jcitem){
							JawallMenu.jcitem.fireEvent('shide');
							JawallMenu.jcitem = null;
						}
					}),
					jnext = jmainnav.getChildren('.navnext')[0] ||  new Element('a', {
						'href': 'javascript:;',
						'class': 'navnext'
					}).inject(jmainnav).addEvent('click', function(){
						if(window.menuIScroll){
							window.menuIScroll.scrollToPage('next');
						}
						
						if(JawallMenu.jcitem){
							JawallMenu.jcitem.fireEvent('shide');
							JawallMenu.jcitem = null;
						}
					}),
					checkNav = function (){
						if(window.menuIScroll){
							jprev.setStyle('display', window.menuIScroll.x >= 0 ? 'none' : 'block');
							jnext.setStyle('display', (window.menuIScroll.x <= window.menuIScroll.maxScrollX) ? 'none' : 'block');
						}
					};
				
				window.menuIScroll = new iScroll(jmenuinner, {
					snap: '.menu > li',
					hScrollbar: false,
					vScrollbar: false,
					onRefresh: checkNav,
					onScrollEnd: checkNav,
					useTransform: false,
					onScrollStart: function(){
						if(JawallMenu.jcitem){
							JawallMenu.jcitem.fireEvent('shide');
							JawallMenu.jcitem = null;
						}
					},
					overflow: ''
				});
				
				checkNav();
				
				var jactive = jmenu.getChildren('.active')[0];
				if(jactive){
					window.menuIScroll.scrollToElement(jactive);
				}
			}
			
			if (window.menuIScroll) {
				window.menuIScroll.refresh();
			}
		} else {
			if (window.menuIScroll) {
				window.menuIScroll.scrollTo(0, 0, 0);
			}
			
			jmenu.setStyle('float', '');
		}
		
		//check if the mobile layout, we change html structure
		if(wwidth < 720){
			if(JawallMenu.jcitem){
				JawallMenu.jcitem.fireEvent('shide');
				JawallMenu.jcitem = null;
			}
			
			jmenuinner.setStyle('overflow', 'hidden');
			
			jmenu.getChildren('.deeper > ul').each(function(jsub){
				var jitem = jsub.getParent(),
					sid = null;
					
				jsub.store('parent', jitem).addClass('jsub').inject(jmainnav).setStyle('position', 'absolute');
				
				if(!JawallMenu.isTouch){
					//add mouse event to show/hide sub on desktop
					jitem.addEvent('mouseenter', function(e){
						clearTimeout(sid);
						
						if(jsub.getStyle('display') != 'none'){
							return false;
						} else {
						
							if(JawallMenu.jcitem && JawallMenu.jcitem != jitem){
								JawallMenu.jcitem.fireEvent('shide');
							}
						
							jsub.setStyles({
								display: 'block',
								top: jmenuinner.getHeight()
							});
							
							jitem.addClass('over');
							
							JawallMenu.jcitem = jitem;
						}
					}).addEvent('mouseleave', function(){
						clearTimeout(sid);
						sid = setTimeout(function(){
							jitem.fireEvent('shide');
						}, 100);
					});
					
					jsub.addEvent('mouseenter', function(){
						clearTimeout(sid);
					}).addEvent('mouseleave', function(){
						clearTimeout(sid);
						sid = setTimeout(function(){
							jitem.fireEvent('shide');
						}, 100);
					});
				} else {
					//add touch event for touch device
					jitem.addEvent('touchstart', function(e){
						if(jsub.getStyle('display') == 'none'){
							e.stop();
							
							if(JawallMenu.jcitem && JawallMenu.jcitem != jitem){
								JawallMenu.jcitem.fireEvent('shide');
							}
							
							jsub.setStyles({
								display: 'block',
								top: jmenuinner.getHeight()
							});
							
							jitem.addClass('over');
							
							JawallMenu.jcitem = jitem;
							
							TouchMask.hidetoggle();
							TouchMask.show();
						}
					});
				}
				
				jitem.addEvent('shide', function(){
					clearTimeout(sid);
					jsub.setStyle('display', 'none');
					jitem.removeClass('over');
					JawallMenu.jcitem = null;
				}).fireEvent('shide');
				
			});
			
			//only init once
			if(!JawallMenu.initTouch && JawallMenu.isTouch){
				
				jmainnav.addEvent('touchstart', function(){
					if(JawallMenu.jcitem){
						this.store('touchInside', 1);
					}
				});
				
				TouchMask.hidesub = function(){
					if(jmainnav.retrieve('touchInside')){
						jmainnav.store('touchInside', 0);
						return false;
					} else {
						if(JawallMenu.jcitem){
							JawallMenu.jcitem.fireEvent('shide');
							return false;
						}
					}
					
					return true;
				};
				
				TouchMask.register(TouchMask.hidesub);
				TouchMask.hidesub();
				
				JawallMenu.initTouch = 1;
			}
			
		} else {
			
			JawallMenu.jcitem = null;
			
			jmainnav.getChildren('.jsub').each(function(jsub){
				var jitem = jsub.retrieve('parent');
				
				jitem.removeEvents('mouseenter').removeEvents('mouseleave').removeEvents('touchstart').removeEvents('shide');
				jsub.removeProperty('style').removeEvents('mouseenter').removeEvents('mouseleave').removeClass('jsub').inject(jitem);
			});
			
			jmenuinner.setStyle('overflow', '');
		}
	}
};

window.addEvent('load', function(){
	if(window.menuIScroll){
		window.menuIScroll.refresh();
	}
	
	if(window.sidebarIScroll){
		window.sidebarIScroll.refresh();
	}
});


(function($){
	var groups = {
	},
	
	handler = function (group, value) {
		// ignore user setting for page with fixed option
		if ($(document.body).hasClass ('fixed-' + group)){
			return;
		}
		
		/*if (value) {
			if (groups[group]['type'] == 'toggle') {
				var cvalue = $.cookie ('ja-'+group);
				if (new RegExp ('(^|\\s)' + value+'(?:\\s|$)').test(cvalue)) {
					$(document.body).removeClass (group + '-' + value);
					cvalue = cvalue.replace (new RegExp ('(^|\\s)' + value+'(?:\\s|$)', 'g'), '$1');
				} else {
					$(document.body).addClass (group + '-' + value);
					cvalue += ' ' + value;
				}
				groups[group]['val'] = cvalue;
				// update cookie
				$.cookie ('ja-'+group, cvalue, {duration: 365, path: '/'});
			} else {
				// update value & cookie
				groups[group]['val'] = value;
				//$.cookie ('ja-'+group, value, {duration: 365, path: '/'});
				// remove current
				document.body.className = document.body.className.replace (new RegExp ('(^|\\s)' + group+'-[^\\s]*', 'g'), '$1');
				$(document.body).addClass (group + '-' + value);
			}
		}*/
		
		// Make the UI reload by trigger resize event for window
		$(window).trigger('resize');
	};
	
	$.fn.toolbar = function(options){
		var defaults = {
			group: 'basegrid',
			type: 'single',
			val: 'm'
		},
		
		opt = $.extend(defaults, options);
		
		groups[opt.group] = groups[opt.group] || {};
		$.extend(groups[opt.group], {type: opt.type, val: opt.val});
		
		if (!$(document.body).hasClass ('fixed-' + opt.group)){
			//var value = $.cookie('ja-'+opt.group);
			var value=null;
			if (value) {
				groups[opt.group]['val'] = value; // setting exists, replace the default
				// add active class
				$(document.body).addClass (groups[opt.group]['val'].replace (/(^|\s)([^\s]+)/g, '$1' + opt.group + '-$2'));
			} else if(opt.val) {
				handler (opt.group, opt.val);
			}
		}

		// bind event for toolbar
		return this.bind('click', function () { handler (opt.group, this.id.replace ('toolbar-' + opt.group + '-', '')); return false; });
	};
	
})(window.$wall || window.jQuery);


(window.$wall || window.jQuery)(document).ready(function ($) {
	// enable menu responsive check
	if(!($.browser.msie && parseFloat($.browser.version) < 9)){
		JawallMenu.initialize();
	}
	
	var bindevent = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion) ? 'touchstart' : 'click',
		jtoggles = $('.btn-toggle'),
		jsidebar = $('#sidebar'),
		jtoggleactive = null;
		
	// toggle handle
	jtoggles.bind(bindevent, function (event) {	
		var jactive = $(this),
			jparent = jactive.parent();
			
		if (jparent.hasClass('active')) {
			jparent.removeClass ('active');
			// remove btn-toggle-active
			jtoggleactive = null
		} else {
			// remove other active
			jtoggles.parent().removeClass ('active');
			// add active for this toggle
			jparent.addClass ('active');
			// store
			jtoggleactive = jactive;		
		}
		
		if(typeOf (TouchMask.hidesub) == 'function'){
			TouchMask.hidesub();
		}
		TouchMask.show();
		
		return false;
	});
	
	
	jtoggles.parent().bind(bindevent, function(){
		if(jtoggleactive){
			$('body').data('touchInside', 1);
		}
	});

	TouchMask.hidetoggle = function(){
		if (jtoggleactive) {
			if($('body').data('touchInside')){
				$('body').data('touchInside', 0);
				return false;
			} else {
				// remove active
				jtoggleactive.parent().removeClass ('active');
				jtoggleactive = null;				
				return false;
			}
		}		
		return true;
	};
	TouchMask.register(TouchMask.hidetoggle);
	
	var rfpage = $('#josForm').hasClass('wform') && $('#k2Container').hasClass('k2AccountPage'),
		wmobile = false, //normal by default
		wmeditor = function(){
			if(!wmobile){
				var jmce = $('.mceLayout:first');
				if(jmce.width() > jmce.closest('.wcontrols').width()){
					wmobile = true;
					$('table.mceToolbar').each(function(){
						$(this).find('> tbody > tr').css('white-space', 'normal').find('td').css({
							position: '',
							float: 'left',
							display: 'inline-block'
						});
					});

					$('.toggle-editor a').trigger('click').delay(300).trigger('click');
				}
			}
		},
		sidrfp = setTimeout(wmeditor, 350);

	// tracking status of btn-toggle
	$(window).resize (function() {
		JawallMenu.isTablet = JawallMenu.isTouch && (window.innerWidth >= 720);

		if (jtoggleactive) {
			if (jtoggleactive.css('display') == 'none') {
				// remove active
				jtoggleactive.parent().removeClass ('active');
				jtoggleactive = null;
			}
		}
		
		if (jsidebar.length) {
			if(JawallMenu.isTablet){
				jsidebar.css({
					position: 'fixed',
					top: ''
				});
			}

			jsidebar
			.add(jsidebar.find('.sidebar-inner'))
			.css('height', Math.max(80,  
				(window.innerHeight || $(window).height())
				- parseInt(jsidebar.css('top'))
				- parseInt(jsidebar.css('margin-bottom'))
				- parseInt(jsidebar.css('padding-bottom'))));
				
			if(window.sidebarIScroll){
				window.sidebarIScroll.refresh();
			}
		}

		if(rfpage){
			clearTimeout(sidrfp);
			sidrfp = setTimeout(wmeditor, 350);
		}
	});
	
	// scrollbar for sidebar if exist
	if (jsidebar.length) {
		jsidebar
			.add(jsidebar.find('.sidebar-inner'))
			.css('height', Math.max(80,  
				(window.innerHeight || $(window).height())
				- parseInt(jsidebar.css('top'))
				- parseInt(jsidebar.css('margin-bottom'))
				- parseInt(jsidebar.css('padding-bottom'))));
		
		//window.sidebarIScroll = new iScroll(jsidebar.find('.sidebar-inner')[0], {vScrollbar: true, scrollbarClass: 'sidebarTracker', useTransform: false});

		if(JawallMenu.isTouch){
			var jsbtoggle = jsidebar.find('.btn-toggle:first');

			$('<div id="dummy-toggle"></div>').css({
				position: 'absolute',
				top: 0,
				left: 0,
				width: jsbtoggle.width(),
				height: jsbtoggle.height(),
				zIndex: 99999
			}).appendTo(document.body).bind(bindevent, function(e){
				e.preventDefault();
				e.stopPropagation();
				jsbtoggle.trigger(bindevent);
			});

			var lastScroll = 0,
				scrollid = null;

			$(window).scroll(function(){
				lastScroll = $(window).scrollTop();
				$('#dummy-toggle').css('top', lastScroll);

				if(JawallMenu.isTablet){
					clearTimeout(scrollid);
					scrollid = setTimeout(function(){
						lastScroll = $(window).scrollTop();
						scrollid = setTimeout(function(){
							if(lastScroll == $(window).scrollTop()){
								jsidebar
									.css('top', lastScroll + parseFloat(jsidebar.css('top', '').css('top')))
									.css('position', 'absolute');

								$(document).one('touchmove', function(){
									jsidebar.css({position: 'fixed', top: ''});
								});
							}
						}, 100);
					}, 100);
				}
			});
		}

		if(JawallMenu.isTablet && !JawallMenu.isBindTablet){
			$(document).on('touchmove', function(){
				jsidebar.css({position: 'fixed', top: ''});
			});

			JawallMenu.isBindTablet = 1;
		}
	}
	
	// check and load typography assert files if nessesary
	window.jtypo = jQuery('.item-pagetypography .item-content');
	
	if(!window.jtypo.length){
		window.jtypo = jQuery('.typography .itemBody');
	}
	
	if(window.jtypo.length){
		var css = document.createElement('link');
		css.type = 'text/css';
		css.rel= 'stylesheet';
		css.href= JADef.tplurl + 'css/jtypo.css';
		document.getElementsByTagName('head')[0].appendChild(css);
		
		$.getScript(JADef.tplurl + 'js/jtypo.js');
	}
});

//fix validate.js error
if(Browser.ie && Browser.version <= 8){
	Browser.Features.inputemail = false;
}