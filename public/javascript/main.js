/**
  * isMobile
  * init_header
  * mobileMenu
  * toggleExtramenu
  * portfolioIsotope
  * blogMasonry
  * prettyPhoto
  * flatCarousel
  * wooSlider
  * counter
  * googleMap
  * woocommerceTabs
  * detectViewport
  * goTop
  * parallax
*/

;(function($) {

	'use strict'

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	
	var init_header = function() {
		var largeScreen = matchMedia('only screen and (min-width: 992px)').matches;
		if ( largeScreen ) {
			var top = 100;
			if($('body').hasClass('cover')) { top = $('.tp-banner').height() + 100 ; }
			$(window).scroll(function() {
				if ( $(this).scrollTop() > top ) {
					$('#masthead-sticky').addClass('active');
				} else {
					$('#masthead-sticky').removeClass('active');
				}
			});
		}
		// click on one-page menu
		function onepageClick(element) {
			element.on('click',function() {
	        	var anchor = $(this).attr('href').split('#')[1];
	        	if (anchor) {
		            if ( $('#'+anchor).length > 0 ) {
		                var headerHeight = 0;
		                if ( $('.sticky-v8').length > 0 && largeScreen ) {
		                    headerHeight = $('.header').outerHeight();
		                }
		                var target = $('#'+anchor).offset().top - headerHeight;
		                $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
		            }
		        }
	        return false;
	      	});
	      	element.on( 'click', function() {
	        	$(this).parent('li').addClass('active').siblings().removeClass('active');
	        	$( "a[href='" + $(this).attr('href') + "']" ).parent('li').addClass('active').siblings().removeClass('active')
	      	});
		}
		onepageClick($('.sticky-v8 ul.menu > li > a'));
		onepageClick($('.header-v8 ul.menu > li > a'));
	};

	var toggleExtramenu = function() {
		$('.menu.menu-extra .off-canvas-toggle a').on('click', function() {
			$('body').toggleClass('off-canvas-active');
		});
		$('#site-off-canvas .close').on('click', function() {
			$('body').removeClass('off-canvas-active');
		});
	}

	var mobileMenu = function() {
		$('.navigator-toggle').on('click',function(){
			$('#site-navigator-mobile').toggleClass('active');
		});
		$('.toggler').on('click',function(){
			$(this).parent('li').toggleClass('active');
		});
		$('.search-box a').on('click',function(){
			$('.search-box').toggleClass('active');
		});
	}

	var prettyPhoto = function() {
		if($().prettyPhoto) {
			if($('a.quickview').length > 0) {
				$('a.quickview').attr('rel', 'prettyPhoto');
			}
			if($('.gallery a.search').length > 0) {
				$('.gallery a.search').attr('rel', 'prettyPhoto');
			}
			if($('.images_grid a.prettyphoto').length > 0) {
				$('.images_grid a.prettyphoto').attr('rel', 'prettyPhoto');
			}
			if($('.gallery .images a.zoom').length > 0) {
				$('.gallery .images a.zoom').attr('rel', 'prettyPhoto');
			}
			$(".gallery a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});
		}
	}

	/* var ajaxContactForm = function(idForm) {
		$(idForm).each(function() {
			if($().validate) {
				$(this).validate({
					submitHandler: function( form ) {
						var $form = $(form),
							str = $form.serialize(),
							loading = $('<div />', { 'class': 'loading' });

						$.ajax({
							type: "POST",
							url:  $form.attr('action'),
							data: str,
							beforeSend: function () {
								$form.find('.send-wrap').append(loading);
							},
							success: function( msg ) {
								var result, cls;
								if ( msg == 'Success' ) {
									result = 'Email sent successfully. Thank for your contact with us';
									cls = 'msg-success';
								} else {
									result = 'Error sending email.';
									cls = 'msg-error';
								}

								$form.prepend(
									$('<div />', {
										'class': 'flat-alert ' + cls,
										'text' : result
									})
								);

								$form.find(':input').not('.submit').val('');
							},
							complete: function (xhr, status, error_thrown) {
								$form.find('.loading').remove();
							}
						});
					}
				});
			}
		}); // each contactform
	}; */

	var portfolioIsotope = function() {
		if ( $().isotope ) {
			var $container = $('.portfolio-wrapper');

			$container.imagesLoaded(function(){
				$container.isotope({
					itemSelector: '.item',
					transitionDuration: '1s'
				}); // end isotope
			});

			$('.portfolio-filters ul li').on('click',function() {
				$('.portfolio-filters ul li').removeClass('active');
				$(this).addClass('active');
				var selector = $(this).find("a").attr('data-filter');
				$container.isotope({ filter: selector });
				return false;
			});// end filter
		};
	};

	var wooSlider = function() {
        if( $().slider ) {
            $( ".price_slider" ).slider({
                range: true,
                min: 12,
                max: 35,
                values: [ 12, 35 ],
                slide: function( event, ui ) {

                    $( "span.from" ).text( "£" + ui.values[ 0 ] );
                    $( "span.to" ).text( "£" + ui.values[ 1 ] );
                }
            });

            $( "span.from" ).text( "£" + $( ".price_slider" ).slider( "values", 0 ) );
             $( "span.to" ).text( "£" + $( ".price_slider" ).slider( "values", 1 ) );
            $( ".ui-slider-handle").append("<span class='shadow'></span>");
        }
    };

	var detectViewport = function() {
		if($().waypoint) {
			$('[data-waypoint-active="yes"]').waypoint(function() {
				$(this).trigger('on-appear');
			}, { offset: '90%', triggerOnce: true });

			$(window).on('load', function() {
				setTimeout(function() {
					$.waypoints('refresh');
				}, 100);
			});
		}
	};

	var counter = function() {
		$('.flat_counter').on('on-appear', function() {
			$(this).find('.count-number').each(function() { 
                var to = parseInt( ($(this).attr('data-to')),10 ), speed = parseInt( ($(this).attr('data-speed')),10 );
                if ( $().countTo ) {
                    $(this).countTo({
                        to: to,
                        speed: speed
                    });
                }
            });
		});
	};

	var woocommerceTabs = function() {
		$('.woocommerce-tabs').each(function() {
			var content = $('.entry-content');
			content.hide();
			if ( (content).hasClass("active")) {
				$('.entry-content.active').show();
			} else {
				content.first().show();
			}
			$(this).find(' > ul > li').on('click',function(e) {
				var index = $(this).index();
				e.preventDefault();
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				var contentActive = $(this).parents('.tabs').siblings('.entry-content').eq(index);
				content.not(':eq(index)').hide();
				contentActive.fadeIn(300);
			})
		});
	};

	var flatCarousel = function() {
		$('.owl_carousel').each(function() {
			if ( $().owlCarousel ) {
				$(this).owlCarousel({
					loop: $(this).data('loop'),
					margin: $(this).data('margin'),
					nav: $(this).data('nav'),
					dots: $(this).data('dots'),
					autoplay: $(this).data('auto'),
					slideBy: $(this).data('slideby'),
					responsive:{
						0:{
							items: $(this).data('items0')
						},
						767:{
							items: $(this).data('items767')
						},
						991:{
							items: $(this).data('items991')
						},
						1200: {
							items: $(this).data('items1200')
						}
					}
				});
			}
		});
	};

	var blogMasonry = function() {
		if ( $().isotope ) {
			var $container = $('.blog-masonry01');
			$container.imagesLoaded(function(){
				$container.isotope({
					itemSelector: '.item',
					transitionDuration: '1s'
				});
			});
			
		};
	};

	/* var googleMap = function() {
        if ( $().gmap3 ) {
            $("#map").gmap3({
                map:{
                    options:{
                        zoom: 14,
                        mapTypeId: 'konstruct_style',
                        mapTypeControlOptions: {
                            mapTypeIds: ['konstruct_style', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                        },
                        scrollwheel: false
                    }
                },
                getlatlng:{
                    address:  "La Botica, Condesa",
                    callback: function(results) {
                        if ( !results ) return;
                        $(this).gmap3('get').setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                        var i;
                        for(i = 0; i < results.length){
                           $(this).gmap3({
                            marker:{
                                latLng:results[i].geometry.location,
                                options:{
                                	icon: '../img/maker.png'
                                }
                            }
                        });  
                        }
                    }
                },
                styledmaptype:{
                    id: "konstruct_style",
                    options:{
                        name: "Ubicaciones de La Botica"
                    },
                },
            });
        }
    }; */
    
   var locations = [
      ['ALFONSO REYES', 19.409157,-99.1775754, 6, 'https://www.google.com.mx/maps/dir//La+Botica,+Av.+Alfonso+Reyes+120,+Cuauhtemoc,+Hip%C3%B3dromo+Condesa,+06170+Ciudad+de+M%C3%A9xico,+CDMX/@19.3907222,-99.1566834,13z/data=!4m15!1m6!3m5!1s0x85d1ff42c6b1354f:0x19dd9f2f50bc1a0b!2sLa+Botica!8m2!3d19.4091545!4d-99.1772991!4m7!1m0!1m5!1m1!1s0x85d1ff42c6b1354f:0x19dd9f2f50bc1a0b!2m2!1d-99.1772991!2d19.4091545?hl=es'],   
      ['COYOACÁN', 19.3482264,-99.1607651, 5, 'https://www.google.com.mx/maps/dir//La+Botica,+Calle+Amberes+1,+Cuauht%C3%A9moc,+Ju%C3%A1rez,+06600+Cuidad+de+M%C3%A9xico,+CDMX/@19.3911879,-99.1566835,13z/data=!4m15!1m6!3m5!1s0x85d1ff35c10229b1:0xe4519677c4bc7782!2sLa+Botica!8m2!3d19.4269706!4d-99.1661609!4m7!1m0!1m5!1m1!1s0x85d1ff35c10229b1:0xe4519677c4bc7782!2m2!1d-99.1661609!2d19.4269706?hl=es'],
      ['AMBERES', 19.4101765,-99.1759328, 4, 'https://www.google.com.mx/maps/dir//La+Botica,+Calle+Amberes+1,+Cuauht%C3%A9moc,+Ju%C3%A1rez,+06600+Cuidad+de+M%C3%A9xico,+CDMX/@19.3911879,-99.1566835,13z/data=!4m15!1m6!3m5!1s0x85d1ff35c10229b1:0xe4519677c4bc7782!2sLa+Botica!8m2!3d19.4269706!4d-99.1661609!4m7!1m0!1m5!1m1!1s0x85d1ff35c10229b1:0xe4519677c4bc7782!2m2!1d-99.1661609!2d19.4269706?hl=es'], 
      ['CAMPECHE', 19.4148834,-99.159252, 3, 'https://www.google.com.mx/maps/dir//La+botica,+Calle+Campeche+%26+Atlixco+y+Tamaulipas+396,+Hip%C3%B3dromo+Condesa,+06140+Ciudad+de+M%C3%A9xico,+CDMX/@19.4101231,-99.1779262,17z/data=!4m15!1m6!3m5!1s0x85d1ff425134e395:0x614a12aaffc4a873!2sLa+botica!8m2!3d19.4101181!4d-99.1757375!4m7!1m0!1m5!1m1!1s0x85d1ff425134e395:0x614a12aaffc4a873!2m2!1d-99.1757375!2d19.4101181?hl=es'],
      ['ISABEL LA CATÓLICA', 19.432766,-99.1362058, 2, 'https://www.google.com.mx/maps/dir//La+Botica+Centro,+Isabel+la+Cat%C3%B3lica+30,+Centro,+06000+Ciudad+de+M%C3%A9xico,+CDMX/@19.3910326,-99.1566835,13z/data=!4m15!1m6!3m5!1s0x85d1fed2cc06ddc7:0x320622780aecaadc!2sLa+Botica+Centro!8m2!3d19.4328229!4d-99.1360677!4m7!1m0!1m5!1m1!1s0x85d1fed2cc06ddc7:0x320622780aecaadc!2m2!1d-99.1360677!2d19.4328229?hl=es'],
      ['ORIZABA', 19.4270646,-99.1670981, 1, 'https://www.google.com.mx/maps/dir//La+Botica,+Orizaba+161,+Roma+Nte.,+06700+Ciudad+de+M%C3%A9xico,+CDMX/@19.3908774,-99.1566834,13z/data=!4m15!1m6!3m5!1s0x85d1ff3b7b854ca5:0xa9e7788e0b6a9fcc!2sLa+Botica!8m2!3d19.4148993!4d-99.1590524!4m7!1m0!1m5!1m1!1s0x85d1ff3b7b854ca5:0xa9e7788e0b6a9fcc!2m2!1d-99.1590524!2d19.4148993?hl=es" target="_blank" style="color:white;']
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(19.3907222,-99.1566834),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        url: locations[i][4]
      });

  
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
             infowindow.setContent(locations[i][0]);
             infowindow.open(map, marker);    
             window.open(this.url, '_blank');
        }
      })(marker, i));
        
    }

	var parallax = function() {
		if ( $().parallax ) {
			$('.parallax').parallax("50%", 0.5);
		}
	};

	var goTop = function() {
		$(window).scroll(function() {
			if ( $(this).scrollTop() > 600 ) {
				$('.goto-top').addClass('active');
			} else {
				$('.goto-top').removeClass('active');
			}
		});

		$('.goto-top').on('click', function() {
			$("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
			return false;
		});
	};

	var closeMessage = function() {
		$('a.close').on('click', function() {
			$(".flat-alert").hide('fast');
		});
	};
	// Dom Ready
	$(function() {
		init_header();
		mobileMenu();
		toggleExtramenu();
		portfolioIsotope();
		blogMasonry();
		prettyPhoto();
		flatCarousel(); 
		wooSlider();
		counter();
		woocommerceTabs();
		detectViewport(); 
		goTop();
		parallax();
		closeMessage();
	});
})(jQuery);