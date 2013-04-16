require([
  'jquery',
  'easing',
  'transitions',
  'bootstrapCarousel',
  'eventMove',
  'eventSwipe'
],
function($,transitions,bootstrapCarousel,eventMove,eventSwipe) {
	// SCRIPT HERE
		var documentBody   = (($.browser.chrome)||($.browser.safari)) ? document.body : document.documentElement,
			posterHeight   = 580,
			menuHeight	   = 35,
			footerHeight   = 100,
			windowHeight   = 0,
			duration	   = 100;

		windowHeight 	= $(window).height();
		menuHeight 		= $('#header').height();
		footerHeight 	= $('#footer').height();

		// functions api
		function slideTo(i,element){
			if(typeof i === 'string'){
				if(i==='next'){
					var i_tmp = Number(element.attr('data-slide-active'))+1,
						i_max = element.find('.item').length;
					if(i_tmp<i_max){
						element.attr('data-slide-active',i_tmp);
						element.carousel(i);
					}
				} else if(i==='prev'){
					var i_tmp = Number(element.attr('data-slide-active'))-1;
					if(i_tmp>=0){
						element.attr('data-slide-active',i_tmp);
						element.carousel(i);
					}
				}
			} else if(typeof i === 'number'){
				element.attr('data-slide-active',i);
				element.carousel(i);
			}
		}
		function goToPoster(id_target){
			var target = $('body').find('#poster_'+id_target),
				i_target = target.index('#main .poster') + 1,
				speed = Math.abs(current_page-i_target)*800,
				delta;
				
			if(target.length){
				$(window).unbind('scroll');
				$('#banners').addClass('crossnavhide');
				delta = parseInt((windowHeight-menuHeight-footerHeight)/4);

				$(documentBody).stop(true, true).animate({scrollTop: (parseInt(target.offset().top)-delta)}, speed, 'easeOutQuint', function(){
					updateUI();
					$(window).scroll(onScroll);
				});
			}
		}
		function onScroll(){
			clearTimeout(router_timer);
			router_timer = setTimeout(function(){
				updateUI();
			}, duration);
		}
		function onResize(){
			windowHeight 	= $(window).height();
			var h = windowHeight-menuHeight-footerHeight;
			$('#banners li').each(function(){
				$(this).height(h);
			});
		}
		function onKeyDown(e){
			switch(e.keyCode){
				case 37:
					slideTo('prev',pages[current_page].element);
					break;
				case 39:
					slideTo('next',pages[current_page].element);
					break;
				case 96:
					$('#banners').toggleClass('crossnavhide');
					break;
				case 97:
					goToPoster('intro');
					break;
				case 98:
					goToPoster('lannister');
					break;
				case 99:
					goToPoster('stark');
					break;
				case 100:
					goToPoster('arryn');
					break;
				case 101:
					goToPoster('greyjoy');
					break;
				case 102:
					goToPoster('baratheon');
					break;
				case 103:
					goToPoster('tully');
					break;
			}
		}
		function updateUI(){
			var sTop = parseInt(documentBody.scrollTop);
				found = false,
				i = pages.length,
				current = 0;

			var h = windowHeight-menuHeight-footerHeight;

            while(!found && (i > 0)) {

                if(sTop > (pages[( i - 1 )].t - (h/2) )) {
                    found = true;
                }
                i--;
                current = i;
            }
            pages[current_page].element.removeClass('active');
            pages[current].element.addClass('active');
            current_page = current;

			header_ul.removeClass('active');
			$(header_ul[current]).addClass('active');

			if(pages[current].element.hasClass('carousel')&&pages[current].element.carousel){
				slideTo(0,pages[current].element);
			}
            document.location.hash=pages[current].id;
		}

		// Router
		var pages = [],
			router_timer,
			current_page = 0;
		$('#main').find('.poster').each(function(){
			pages.push({
				element : $(this),
                h   	: $(this).height(),
                t   	: $(this).offset().top,
                id  	: $(this).attr('id').replace('poster_','')
            });
		});

		// Event
		$(window).scroll(onScroll).keydown(onKeyDown).resize(onResize);

		// crossnav
		$('#header .show_crossnav').bind('click',function(e){
			e.preventDefault();
			$('#banners').toggleClass('crossnavhide');
		});
		var h = windowHeight-menuHeight-footerHeight;
		$('#banners li').each(function(){
			$(this).height(h);
			$(this).bind('click',function(e){
				e.preventDefault();
				var id_target = $(this).data('slide-to');
				goToPoster(id_target);
			})
		});

		// scroll
		var header_ul;
		$('#header a[href^=#]').each(function(){
			header_ul = $(this).closest('ul').find('li');
			$(this).bind('click',function(e){
				e.preventDefault();
				var id_target = $(this).attr('href').substring(1);
				goToPoster(id_target);
			});
		});

		// carousel
		$('.carousel').each(function(){
			var _self = this;
			$(_self).carousel({
				pause: true,
				interval: false
			});
			$(_self).find('a[href=#more]').bind('click',function(e){
				e.preventDefault();
				slideTo('next',$(_self));
			});

			$(_self).find('a[href=#back]').bind('click',function(e){
				e.preventDefault();
				slideTo('prev',$(_self));
			});

			$(_self).find('a[href*=slideto]').bind('click',function(e){
				e.preventDefault();
				var i = Number($(this).data('slide-to'));
				slideTo(i,$(_self))
			});

			$(_self).on('movestart',function(e){
				if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
					e.preventDefault();
				}
			});
			$(_self).on('swipeleft',function(e){
				slideTo('next',$(_self));
			});
			$(_self).on('swiperight',function(e){
				slideTo('prev',$(_self));
			});

		});

		// init
		updateUI();

});
