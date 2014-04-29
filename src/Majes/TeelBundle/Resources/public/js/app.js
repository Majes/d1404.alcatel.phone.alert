
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

		// Get section
		//$('.starter-template').snapscroll();
		

		var windowWidth = parseInt($(window).width());
        var windowHeight = parseInt($(window).height());
        //$('.container section,.container section .wrapper, .slides, .slides li,#section3 .slide-container,.scroll-pane').css({ 'height': windowHeight });
        App.resize();
        //$('.container section.resize,.container section.resize .wrapper, .slides, .slides li,#section3 .slide-container,.scroll-pane').css({ 'height': windowHeight });

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
		}, { offset: '30%' });

		$('.container .section').each(function(index, el) {
			var id = $(el).attr('id');
			$('#'+id).waypoint(function(direction) {
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
			}, { offset: '25%' });	
		});

		

		$('nav a').on('click', function (e) {
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

		$("a.next,a.continue").on('click', function (e) {
			e.preventDefault();
			var self = $(this);
			var top = self.parent().parent().next('section').position();
			top = top.top;
			var body = $("html, body");
			body.animate({scrollTop:top}, '500', 'swing', function() { 
			   
			});
			
		});

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
			}else{
				$('.slides').removeClass('go-left');
				$("#section3 .bkg").removeClass('pro');
			}
		});

		$('.modal').on('click', function (e) {
			e.preventDefault();
			
			$(this).next('.content').clone().appendTo('#myModal');
			var modalLocation = $(this).attr('data-reveal-id');
			$('#'+modalLocation).reveal($(this).data());
		});
		

	},
	resize: function(){

        var windowWidth = parseInt($(window).width());
        var windowHeight = parseInt($(window).height());
		$('.container section.resize').css({ 'height': windowHeight ,'width': windowWidth });
		$('.container section .wrapper, .slides, .slides li,#section3 .slide-container').css({ 'height': windowHeight });
        //$('.container section.resize,.container section.resize .wrapper, .slides, .slides li,#section3 .slide-container,.scroll-pane').css({ 'height': windowHeight });

        if (windowWidth > 1020) {
        
        }
        var menu_item = App.selected_menu;
        if (menu_item != null) {
	        menu_item.trigger('click');
        };

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

$(function(){
	App.init();
	
	$(window).resize(function(){
		delay(function(){
			App.resize();
		},150);
	});
	
})

