
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
	init: function(){

	    App.resize();
        App.Modal.init();
        //$('.container section.resize,.container section.resize .wrapper, .slides, .slides li,#section3 .slide-container,.scroll-pane').css({ 'height': windowHeight });
		
		/*
		$('#section1').waypoint(function(direction) {
			if (direction == 'down') {
				$('nav').addClass('show');
				$('.cloud').addClass('show');
				delay(function(){
					$('.facebook').addClass('show');

					delay(function(){
						$('.google').addClass('show');
					},150);

				},150);
				

			}else{
				$('nav').removeClass('show');
				$('.cloud').removeClass('show');
				$('.facebook').removeClass('show');
				$('.google').removeClass('show');
			}
		}, { offset: '45%' });

		*/




		$('.section').scrollSections({
    		createNavigation: false,
    		navigation: false,
    		speed: 500,
    		touch: false,
    		after: function($currentSection, $previousSection){
    			
    			var section = $currentSection.attr('id');
    			
    			if (section == 'section1') {
    				$('.circle').addClass('animate');
					$('.circle').addClass('end');
					$('.phone').addClass('end');
					$('#'+section).addClass('animation_ended');
    			} 

    			if(section == 'section0'){
    				$('#menu').removeClass('show');
    				$('.cloud').removeClass('show');
    				$('.facebook').removeClass('show');
    				$('.google').removeClass('show');
    			};

    			var index = parseInt($('#'+section).index())+1;

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

		/*
		$('.container .section').each(function(index, el) {
			var id = $(el).attr('id');
			$('#'+id).waypoint(function(direction) {

				if (id =="section1") {
					if (direction == 'down') {
						$('nav').addClass('show');
						$('.cloud').addClass('show');
						delay(function(){
							$('.facebook').addClass('show');

							delay(function(){
								$('.google').addClass('show');
							},150);

						},150);
						

					}else{
						
					}
				};

				if (direction == 'down') {
					var index = parseInt($('#'+id).index())+1;
					
					// var bullet_index = index;
					// $('.bullets li').removeClass('on');
					// $('.bullets li:nth-child('+index+')').addClass('on');

					$('nav li a').removeClass('on');
					$('nav li:nth-child('+index+') a').addClass('on');

					App.selected_menu = $('nav li:nth-child('+index+') a');
					
					// Section 1
					
					if (index == 2 && !$(el).hasClass('animation_ended')) {
						$('.circle').addClass('animate');
						$('.circle').addClass('rollIn');
						$('.circle').addClass('end');
						$('.phone').addClass('end');
						$(el).addClass('animation_ended');
					};

					if (index == 3 && !$(el).hasClass('animation_ended')) {
						$('.circle-small').addClass('end');
						$(el).addClass('animation_ended');
					};

				}else{
					var index = parseInt($('#'+id).index())-1;
					$('nav li a').removeClass('on');
					$('nav li:nth-child('+index+') a').addClass('on');
				}
			}, { offset: '100px' });	
		});
		*/
		

		$('nav ul a').on('click', function (e) {
			e.preventDefault();
			var self = $(this);
			App.selected_menu = self;
			var index = parseInt(self.parent().index());
			
			$('nav a').removeClass('on');
			self.addClass('on');
			var top = $('#section'+index).position();
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
					$('#'+section).addClass('animation_ended');
			   }

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
			},2000);
		});
		
		$('span.phone').on('mouseleave', function (e) {
			clearInterval(App.animate_phone_interval);
		});

		$('.offer').on('click', function (e) {
			e.preventDefault();
			if ($(this).hasClass('to-pro')) {
				$('.slides').addClass('go-left');
				$("#section3 .bkg").addClass('pro');
				
				$("#section3 h1 .part").addClass('fadeOutLeft hide').removeClass('fadeInLeft');
				$("#section3 h1 .pro").addClass('fadeInLeft show').removeClass('fadeOutLeft hide');
			}else{
				$('.slides').removeClass('go-left');
				$("#section3 .bkg").removeClass('pro');
				$("#section3 h1 .pro").removeClass('fadeInLeft').addClass("fadeOutLeft hide");
				$("#section3 h1 .part").removeClass('fadeOutLeft hide').addClass('fadeInLeft show');
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
			$('.container section .wrapper, .slides, .slides li,#section3 .slide-container').css({ 'height': 'auto' });
			$('#section0 .wrapper').css({'height':windowHeight});
			// Put an exception on landcape
        }else{
			$('.container section.resize').css({ 'height': windowHeight ,'width': windowWidth });
			$('.container section .wrapper, .slides, .slides li,#section3 .slide-container').css({ 'height': windowHeight });
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

