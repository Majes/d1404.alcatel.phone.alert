/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

var App = null;
App = {
	animate_phone_interval: null,
	selected_menu : null,
    current_scroll:  false,
	init: function(){

	    App.resize();
        App.Modal.init();

        $('body').on('mousewheel', function(event) {
            if(event.deltaY > 0){
                return;
            }
            console.log(event.deltaX, event.deltaY, event.deltaFactor);
        });

		$('.section').scrollSections({
    		createNavigation: false,
    		navigation: false,
    		speed: 500,
    		touch: false,
            before: function(){
                if(App.current_scroll){
                    return;
                }
            },
    		after: function($currentSection, $previousSection){

                App.current_scroll = true;
                App.current_scroll = $currentSection.attr('id');
    			//var section = $currentSection.attr('id');
    			var section = 'section' + $currentSection.data('number');
    			
    			if (section == 'section1') {
    				$('.circle').addClass('animate');
					$('.circle').addClass('end');
					$('.phone').addClass('end');
					$(section).addClass('animation_ended');
    			} 

    			if(section == 'section0'){
    				$('#menu').removeClass('show');
    				$('.cloud').removeClass('show');
    				$('.facebook').removeClass('show');
    				$('.google').removeClass('show');
    			};

    			var index = parseInt($('.'+section).index())+1;

    			$('nav li a').removeClass('on');
    			$('nav li:nth-child('+index+') a').addClass('on');

    			App.selected_menu = $('nav li:nth-child('+index+') a');
    			
    			if (index > 1) {

    				if (!$('nav').hasClass('show')) {

    					$('nav').addClass('show');
    					$('.cloud').addClass('show');
    					delay(function(){
    						$('.facebook').addClass('show');

    						delay(function(){
    							$('.google').addClass('show');
    						},150);

    					},150);

    				} 
    			}

                App.current_scroll = false;

    		}

		}); 
	
		// Show menu for 
        var windowHeight = parseInt($(window).height());
        
        if ($(window).scrollTop() >= windowHeight) {
			delay(function(){
				$('nav').addClass('show');
				$('.cloud').addClass('show');
				$('.facebook').addClass('show');
				delay(function(){
					$('.google').addClass('show');
				},250);
			},250);
        }

		

		$('nav ul a').on('click', function (e) {
			e.preventDefault();
			var self = $(this);
			App.selected_menu = self;
			var index = parseInt(self.parent().index());
			
			$('nav a').removeClass('on');
			self.addClass('on');
			var top = $('.section'+index).position();
			top = top.top;
			
			var body = $("html, body");
			body.animate({scrollTop:top}, '500', 'swing', function() { 
			   
			});
		});

		$('.totopnow').on('click', function (e) {
			e.preventDefault();
			var body = $("html, body");
			body.animate({scrollTop:0}, '500', 'swing');
		});


		$("a.next").on('click', function (e) {
			e.preventDefault();
			var self = $(this);
			var section = self.parent().parent().next('section');
			var top = section.position();

			top = top.top;
			var body = $("html, body");
			body.animate({scrollTop:top}, '500', 'swing', function() { 
			   
			   var index = parseInt(section.index())+1;

			   $('nav li a').removeClass('on');
			   $('nav li:nth-child('+index+') a').addClass('on');

			   App.selected_menu = $('nav li:nth-child('+index+') a');

			   if (!$('.circle').hasClass('animate')) {
    				$('.circle').addClass('animate');
					$('.circle').addClass('end');
					$('.phone').addClass('end');
					section.addClass('animation_ended');
			   }

			   $('nav').addClass('show');
			   $('.cloud').addClass('show');
			   delay(function(){
			   	$('.facebook').addClass('show');

			   	delay(function(){
			   		$('.google').addClass('show');
			   	},150);

			   },150);

			});
			
		});


		$("a.continue").on('click', function (e) {
			e.preventDefault();
			var self = $(this);
			var section = self.parent().parent().next('section');
			var top = section.position();

			top = top.top;
			var body = $("html, body");
			body.animate({scrollTop:top}, '500', 'swing', function() { 
			   
			   var index = parseInt(section.index())+1;

			   $('nav li a').removeClass('on');
			   $('nav li:nth-child('+index+') a').addClass('on');

			   App.selected_menu = $('nav li:nth-child('+index+') a');

			});
			
		});

		
		$('.moreinfo').on('touchstart', function (e) {
			e.preventDefault();
			$(this).toggleClass('on');
		});

		$("span.phone,span.move,span.smoke,span.box").on({
			touchstart: function(){
				e.preventDefault();
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
				} else{
					$("span.phone,span.move,span.smoke,span.box").removeClass('on');
					$(this).addClass('on');
				};
				
			}
		})

		// get default language
		var lang = $(".languages .current").data('lang');
		var name = $(".languages .menu-lang li a[data-lang="+lang+"]").html();
		$(".languages .current").html(name);


		$(".languages .current").on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('on');
			$(".languages .menu-lang").toggle();
		});

        $(".languages").on('mouseleave', function(){
            $(".languages .current").removeClass('on');
            $(".languages .menu-lang").hide();
        });

/*
		$('.moreinfo').on('mouseleave', function (e) {
			e.preventDefault();
			$(this).removeClass('on');
		});
*/
		// $('.bullets li').on('click', function (e) {
		// 	e.preventDefault();
		// 	var self = $(this);
		// 	var index = parseInt(self.index());
			
		// 	$('nav a').removeClass('on');
		// 	self.addClass('on');
		// 	var top = $('#section'+index).position();
		// 	top = top.top;
			
		// 	var body = $("html, body");
		// 	body.animate({scrollTop:top}, '500', 'swing', function() { 
			   
		// 	});
		// });

		App.animate_phone_interval = setInterval(function(){
			App.animate_phone();
		},3000);

		clearInterval(App.animate_phone_interval);

		$('span.phone').on('mouseenter', function (e) {
			e.preventDefault();
			App.animate_phone_interval = setInterval(function(){
				App.animate_phone();
			},3000);
		});
		
		$('span.phone').on('mouseleave', function (e) {
			clearInterval(App.animate_phone_interval);
		});

		$('.offer').on('click', function (e) {
			e.preventDefault();
			if ($(this).hasClass('to-pro')) {
				$('.slides').addClass('go-left');
				$(".section3 .bkg").addClass('pro');
				
				$(".section3 h1 .part").addClass('fadeOutLeft hide').removeClass('fadeInLeft');
				$(".section3 h1 .pro").addClass('fadeInLeft show').removeClass('fadeOutLeft hide');
			}else{
				$('.slides').removeClass('go-left');
				$(".section3 .bkg").removeClass('pro');
				$(".section3 h1 .pro").removeClass('fadeInLeft').addClass("fadeOutLeft hide");
				$(".section3 h1 .part").removeClass('fadeOutLeft hide').addClass('fadeInLeft show');
			}
		});

		

		// $(".offer-custom").on('click', function (e) {
		// 	e.preventDefault();
		// 	$(this).next('.content').clone().appendTo('#myModal');
		// 	$('#myModal').reveal($(this).data());
		// });
		

	//	 $('#menu-items').slicknav();
	},
	resize: function(){

        var windowWidth = parseInt($(window).width());
        var windowHeight = parseInt($(window).height());
        
        if (windowWidth < 485) {
        	$('body').addClass('mobile');
        	$('.container section.resize').css({ 'height': 'auto' ,'width': 'auto' });
			$('.container section .wrapper, .slides, .slides li,.section3 .slide-container').css({ 'height': 'auto' });
			$('.section0 .wrapper').css({'height':windowHeight});
			// Put an exception on landcape
        }else{
			$('.container section.resize').css({ 'height': windowHeight ,'width': windowWidth });
			$('.container section .wrapper, .slides, .slides li,.section3 .slide-container').css({ 'height': windowHeight });
			$('body').removeClass('mobile');
        	//$('.container section.resize,.container section.resize .wrapper, .slides, .slides li,#section3 .slide-container,.scroll-pane').css({ 'height': windowHeight });
        }

        if (windowWidth > 1020) {
        
        }

        var menu_item = App.selected_menu;
        if (menu_item != null) {
	        menu_item.trigger('click');
        };

        // Show menu

	},
	animate_phone: function(){
		var number =  $('span.phone .images .image').length;

		var next = $('span.phone .images .image.show').next();
		var index = $(next).index();
		if (index < 0) {
			$('span.phone .images .image').removeClass('show');
			$('span.phone .images .image:first-child').addClass('show')
		}else{
			$('span.phone .images .image').removeClass('show');
			$(next).addClass('show');
		}
	}
 }


App.Modal = {
	init: function(){
		//App.Modal.center();
		
		$('.modal').on('click', function (e) {
			e.preventDefault();

			if ($(this).hasClass('light')) {
				$('#myModal').addClass('light');
			} 

			$(this).next('.content').clone().appendTo('#myModal');
			var modalLocation = $(this).attr('data-reveal-id');
			$('#'+modalLocation).reveal($(this).data());
			$('#'+modalLocation).css({top:0});
			App.Modal.center();
		});

		/*
		$('.modal').on('click', function (e) {
			e.preventDefault();
			var self = $(this);
			var modalLocation = self.attr('data-reveal-id');
			
			// Content is inline
			if (self.hasClass('inline')) {
				$(this).next('.modal-content').clone().appendTo('#myModal').find('.modal-content');
				$('#'+modalLocation).reveal($(this).data());
				App.Modal.center();
			}else{
				// Ajax Fetch
				var url = self.data('ajax');
				$.ajax({
						url: url,
						type: 'post',
						success: function (data) {
							$('#myModal').html(data);
							
							$('#'+modalLocation).reveal(self.data());
							App.Modal.center();
						}
					});

			}
			
			
		});
		*/

	},
	center: function(){
		var padding = $('.reveal-modal').css('paddingLeft');
		padding = parseInt(padding);
		
		var width = ($('.reveal-modal').width()/2)+padding;
		var window_width = $(window).width();
		var left = (window_width/2)-width;

		var height = ($('.reveal-modal').height()/2);
		var window_height = $(window).height();
		var top = (window_height/2)-height;

		


		$('.reveal-modal').css({'left':left+'px', 'top':top+"px"});
	}
}


$(function(){
	App.init();
	
	$(window).resize(function(){
		delay(function(){
			App.resize();
			App.Modal.center();
		},150);
	});
	
})

