/*================================================
[  Table of contents  ]
================================================

1. Variables
2. Mobile Menu
3. Mega Menu
4. One Page Navigation
5. Toogle Search
6. Current Year Copyright area
7. Background Image

9. Tooltip
10. Nice Select
11. Default active and hover item active
12. Product Details Page
13. Isotope Gallery Active  ( Gallery / Portfolio )
14. LightCase jQuery Active
15. Slider One Active 
16. Product Slider One
17. Tab Product Slider One
18. Blog Slider One
19. Testimonial Slider - 1
20. Testimonial Slider - 2
21. Testimonial Slider - 3
22. Category Slider
23. Image Slide  - 1 (Screenshot) 
24. Image Slide - 2
25. Image Slide - 3
26. Image Slide - 4 
27. Brand Logo
28. Blog Gallery (Blog Page )
29. Countdown
30. Counter Up
31. Instagram Feed
32. Price Slider
33. Quantity plus minus
34. scrollUp active
35. Parallax active
36. Header menu sticky



======================================
[ End table content ]
======================================*/

(function($) {
  "use strict";

    jQuery(document).ready(function(){
      
        /* --------------------------------------------------------
            1. Variables
        --------------------------------------------------------- */
        var $window = $(window),
        $body = $('body');

        /* --------------------------------------------------------
            2. Mobile Menu
        --------------------------------------------------------- */
         /* ---------------------------------
            Utilize Function 
        ----------------------------------- */
        (function () {
            var $utilizeToggle = $('.utilize-toggle'),
                $utilize = $('.utilize'),
                $utilizeOverlay = $('.utilize-overlay'),
                $mobileMenuToggle = $('.mobile-menu-toggle');
            $utilizeToggle.on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    $target = $this.attr('href');
                $body.addClass('utilize-open');
                $($target).addClass('utilize-open');
                $utilizeOverlay.fadeIn();
                if ($this.parent().hasClass('mobile-menu-toggle')) {
                    $this.addClass('close');
                }
            });
            $('.utilize-close, .utilize-overlay').on('click', function (e) {
                e.preventDefault();
                $body.removeClass('utilize-open');
                $utilize.removeClass('utilize-open');
                $utilizeOverlay.fadeOut();
                $mobileMenuToggle.find('a').removeClass('close');
            });
        })();

        /* ------------------------------------
            Utilize Menu
        ----------------------------------- */
        function mobileutilizeMenu() {
            var $utilizeNav = $('.utilize-menu, .overlay-menu'),
                $utilizeNavSubMenu = $utilizeNav.find('.sub-menu');

            /*Add Toggle Button With Off Canvas Sub Menu*/
            $utilizeNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

            /*Category Sub Menu Toggle*/
            $utilizeNav.on('click', 'li a, .menu-expand', function (e) {
                var $this = $(this);
                if ($this.attr('href') === '#' || $this.hasClass('menu-expand')) {
                    e.preventDefault();
                    if ($this.siblings('ul:visible').length) {
                        $this.parent('li').removeClass('active');
                        $this.siblings('ul').slideUp();
                        $this.parent('li').find('li').removeClass('active');
                        $this.parent('li').find('ul:visible').slideUp();
                    } else {
                        $this.parent('li').addClass('active');
                        $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                        $this.closest('li').siblings('li').find('ul:visible').slideUp();
                        $this.siblings('ul').slideDown();
                    }
                }
            });
        }
        mobileutilizeMenu();

        /* --------------------------------------------------------
            3. Mega Menu
        --------------------------------------------------------- */
        $('.mega-menu').each(function(){
            if($(this).children('li').length){
                var ulChildren = $(this).children('li').length;
                $(this).addClass('column-'+ulChildren)
            }
        });
        

        /* Remove Attribute( href ) from sub-menu title in mega-menu */
        /*
        $('.mega-menu > li > a').removeAttr('href');
        */


        /* Mega Munu  */
        /* $(".mega-menu").parent().css({"position": "inherit"}); */
        $(".mega-menu").parent().addClass("mega-menu-parent");
        

        /* Add space for Elementor Menu Anchor link */
        $( window ).on( 'elementor/frontend/init', function() {
            elementorFrontend.hooks.addFilter( 'frontend/handlers/menu_anchor/scroll_top_distance', function( scrollTop ) {
                return scrollTop - 75;
            });
        });

        /* --------------------------------------------------------
            3-2. Category Menu
        --------------------------------------------------------- */

        $('.category-menu-title').on('click', function(){
            $('.category-menu-toggle').slideToggle(500);
        });	

        /* Category Menu More Item show */
        $('.category-menu-more-item-parent').on('click', function(){
            $('.category-menu-more-item-child').slideToggle();
            $(this).toggleClass('rx-change');

        });

        /* Category Submenu Column Count */
        $('.category-submenu').each(function(){
            if($(this).children('li').length){
                var ulChildren = $(this).children('li').length;
                $(this).addClass('category-column-no-'+ulChildren)
            }
        });

        /* Category Menu Responsive */
        function CategoryMenuToggle(){
            $('.category-menu-toggle .category-menu-drop > a').on('click', function(){
            if($(window).width() < 991){
                $(this).removeAttr('href');
                var element = $(this).parent('li');
                if (element.hasClass('open')) {
                    element.removeClass('open');
                    element.find('li').removeClass('open');
                    element.find('ul').slideUp();
                }
                else {
                    element.addClass('open');
                    element.children('ul').slideDown();
                    element.siblings('li').children('ul').slideUp();
                    element.siblings('li').removeClass('open');
                    element.siblings('li').find('li').removeClass('open');
                    element.siblings('li').find('ul').slideUp();
                }
            }
            });
            $('.category-menu-toggle .category-menu-drop > a').append('<span class="expand"></span>');
        }
        CategoryMenuToggle();


        /* ---------------------------------------------------------
            4. One Page Navigation ( jQuery Easing Plugin )
        --------------------------------------------------------- */
        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $(function() {
            $('a.page-scroll').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });


        /* --------------------------------------------------------
            5. Toogle Search
        -------------------------------------------------------- */
        // Handle click on toggle search button
        $('.header-search-1').on('click', function() {
            $('.header-search-1, .header-search-1-form').toggleClass('search-open');
            return false;
        });



        /* ---------------------------------------------------------
            7. Background Image
        --------------------------------------------------------- */
        var $backgroundImage = $('.bg-image, .bg-image-top');
        $backgroundImage.each(function() {
            var $this = $(this),
                $bgImage = $this.data('bg');
            $this.css('background-image', 'url('+$bgImage+')');
        });

        /* ---------------------------------------------------------
            9. Tooltip
        --------------------------------------------------------- */
        $('[data-toggle="tooltip"]').tooltip();


        /* --------------------------------------------------------
            10. Nice Select
        --------------------------------------------------------- */
        $('.niceSelect').niceSelect();

        
        /* --------------------------------------------------------
            11. Default active and hover item active
        --------------------------------------------------------- */
        var active_item = $('.feature-item-6, .our-journey-wrap ul li, .pricing-plan-item')
        active_item.mouseover(function() {
            active_item.removeClass('active');
            $(this).addClass('active');
        });




        /* ---------------------------------------------------------
            32. Price Slider
        --------------------------------------------------------- */
/*
        $( ".slider-range" ).slider({
            range: true,
            min: 50,
            max: 5000,
            values: [ 50, 1500 ],
            slide: function( event, ui ) {
                $( ".amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
        });
        $( ".amount" ).val( "$" + $( ".slider-range" ).slider( "values", 0 ) +
        " - $" + $( ".slider-range" ).slider( "values", 1 ) ); 
*/

        /* --------------------------------------------------------
            33. Quantity plus minus
        -------------------------------------------------------- */
        $(".cart-plus-minus").prepend('<div class="dec qtybutton">-</div>');
        $(".cart-plus-minus").append('<div class="inc qtybutton">+</div>');
        $(".qtybutton").on("click", function() {
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
            if ($button.text() == "+") {
                var newVal = parseFloat(oldValue) + 1;
            } 
            else {
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } 
                else {
                    newVal = 0;
                }
            }
            $button.parent().find("input").val(newVal);
        });


	    /* --------------------------------------------------------
            34. scrollUp active
        -------------------------------------------------------- */
        $.scrollUp({
            scrollText: '<i class="fa fa-angle-up"></i>',
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade'
        });


	    /* --------------------------------------------------------
            35. Parallax active ( About Section  )
        -------------------------------------------------------- */
        /* 
        > 1 page e 2 ta call korle 1 ta kaj kore 
        */
        if($('.parallax-effect-active').length){
            var scene = $('.parallax-effect-active').get(0);
            var parallaxInstance = new Parallax(scene);
        }




        function AnimateTestimonialImage(imgtodrag, cart) {
            var imgclone = imgtodrag.clone().offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            }).css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '130px',
                'width': '130px',
                'z-index': '100'
            }).addClass('quote-animated-image').appendTo($('body')).animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width': 130,
                'height': 130
            }, 300);


            imgclone.animate({
                'visibility': 'hidden',
                'opacity': '0'
            }, function () {
                $(this).remove()
            });
        }


        /* --------------------------------------------------------
            Newsletter Popup
        -------------------------------------------------------- */
        $('#newsletter_popup').modal('show');




    });


    /* --------------------------------------------------------
        36. Header menu sticky
    -------------------------------------------------------- */
    $(window).on('scroll',function() {    
        var scroll = $(window).scrollTop();
        if (scroll < 445) {
            $(".header-sticky").removeClass("sticky-active");
        } else {
            $(".header-sticky").addClass("sticky-active");
        }
    }); 


    $(window).on('load',function(){
        /*-----------------
            preloader
        ------------------*/
        if($('#preloader').length){
            var preLoder = $("#preloader");
            preLoder.fadeOut(1000);

        };


    });


    /*----------------------------------------------------*/
    /*  Range Sliders
    /*----------------------------------------------------*/








  
})(jQuery);









$('.apps-slider').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		autoHeight: true,
		smartSpeed: 500,
		margin: 20,
		
		autoplayHoverPause: true,
		autoplay: true,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			1200: {
				items: 4
			}
		}
	});



$('.hotels-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		autoHeight: true,
		smartSpeed: 500,
		margin: 20,
		
		autoplayHoverPause: false,
		autoplay: true,
			navText: [ '<span class="fa fa-arrow-left"></span>', '<span class="fa fa-arrow-right"></span>' ],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			1200: {
				items: 3
			}
		}
	});

$('.triponly-slider').owlCarousel({
		loop: false,
		nav: false,
		dots: true,
		autoHeight: true,
		smartSpeed: 500,
		margin: 0,
		
		autoplayHoverPause: false,
		autoplay: false,
			navText: [ '<span class="fa fa-arrow-left"></span>', '<span class="fa fa-arrow-right"></span>' ],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	});


$('.testimonial-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		autoHeight: true,
		smartSpeed: 500,
		margin: 0,
		
		autoplayHoverPause: false,
		autoplay: false,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	});



/*********************/



function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 1 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 1 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}




function increaseValue2() {
  var value = parseInt(document.getElementById('number2').value, 10);
  value = isNaN(value) ? 1 : value;
  value++;
  document.getElementById('number2').value = value;
}

function decreaseValue2() {
  var value = parseInt(document.getElementById('number2').value, 10);
  value = isNaN(value) ? 1 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number2').value = value;
}







$(document).ready(function(){
  $(".show-icons").click(function(){
    $(".all-ioc").toggleClass("active");
  });
});





	$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});




    APP.uploader = {
        init: function() {
            var $uploadEl = $("[data-uploader='true']");
            if ($uploadEl.length < 1) {
                return;
            }
            var $url = $uploadEl.data("uploader-url");
            var $image_url = $uploadEl.data("uploader-image");
            var myDrop = new Dropzone("[data-uploader='true']", {
                url: $url,
                acceptedFiles: "image/*",
                addRemoveLinks: true,
                init: function() {
                    var thisDropzone = this;
                    if ($image_url !== undefined) {
                        var mockFile = {
                            name: 'Name Image',
                            size: 12345,
                            type: 'image/jpeg'
                        };
                        thisDropzone.emit("addedfile", mockFile);
                        thisDropzone.emit("success", mockFile);
                        thisDropzone.emit("thumbnail", mockFile, $image_url);
                        this.on("maxfilesexceeded", function(file) {
                            this.removeFile(file);
                            alert("No more files please!");
                        });
                    }
                },
            });
        }
    };

    if ($.fn.dropzone) {
        Dropzone.autoDiscover = false;
    }



/***********************************************/


