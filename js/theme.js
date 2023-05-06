(function($) {
    "use strict";
    var $body = $('body'),
        $window = $(window),
        $siteWrapper = $('#site-wrapper'),
        $document = $(document);
    var APP = {
        init: function() {
            this.narbarDropdownOnHover();
            this.showUISlider();
            this.activeSidebarMenu();

            this.processingStepAddProperty();
            this.enablePopovers();
            this.enableDatepicker();
            this.initToast();
            this.processTestimonials();
            this.scrollSpyLanding();
            this.parallaxImag();
            this.dropdownMenuMobile();
        },
        isMobile: function() {
            return window.matchMedia('(max-width: 1199px)').matches;
        },
        narbarDropdownOnHover: function() {
            var $dropdown = $('.main-header .hover-menu .dropdown');
            if ($dropdown.length < 1) {
                return;
            }
            $dropdown.on('mouseenter', function() {
                if (APP.isMobile()) {
                    return;
                }
                var $this = $(this);
                $this.addClass('show').find(' > .dropdown-menu').addClass('show');
            });
            $dropdown.on('mouseleave', function() {
                if (APP.isMobile()) {
                    return;
                }
                var $this = $(this);
                $this.removeClass('show').find(' > .dropdown-menu').removeClass('show');
            });
        },
        dropdownMenuMobile: function() {
            $(".main-header .dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
                if (APP.isMobile()) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    var that = this;
                    $(that).next().toggleClass("show");
                    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
                        $(that).next().removeClass("show");
                    });
                }
            });
        },
        showUISlider: function() {
            var defaultOption = {
                range: true,
                min: 0,
                max: 4000,
                values: [0, 2000],
            };
            var $slider = $('[data-slider="true"]');
            $slider.each(function() {
                var $this = $(this);
                var format = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                });
                var options = $this.data('slider-options');
                options = $.extend({}, defaultOption, options);
                options.slide = function(event, ui) {
                    if (options.type === 'currency') {
                        $this.parents('.slider-range').find(".amount").val(format.format(ui.values[0]) + " to " + format.format(ui.values[1]));
                    }
                    if (options.type === 'sqrt') {
                        $this.parents('.slider-range').find(".amount").val(ui.values[0] + " sqft to " + ui.values[1] + " sqft");
                    }
                };
                $this.slider(options);
                if (options.type === 'currency') {
                    $this.parents('.slider-range').find(".amount").val(format.format($this.slider("values", 0)) +
                        " to " + format.format($this.slider("values", 1)));
                }
                if (options.type === 'sqrt') {
                    $this.parents('.slider-range').find(".amount").val($this.slider("values", 0) + " sqft to " + $this.slider("values", 1) + " sqft");
                }
            });
        },
        activeSidebarMenu: function() {
            var $sidebar = $('.db-sidebar');
            if ($sidebar.length < 1) {
                return;
            }
            var $current_link = window.location.pathname;
            var $sidebarLink = $sidebar.find('.sidebar-link');
            $sidebarLink.each(function() {
                var href = $(this).attr('href');
                if ($current_link.indexOf(href) > -1) {
                    var $sidebar_item = $(this).parent('.sidebar-item');
                    $sidebar_item.addClass('active');
                }
            });
        },

        processingStepAddProperty: function() {
            var $step = $('.new-property-step');
            if ($step.length < 1) {
                return;
            }
            var $active_item = $step.find('.nav-link.active').parent();
            var $prev_item = $active_item.prevAll();
            if ($prev_item.length > 0) {
                $prev_item.each(function() {
                    $(this).find('.step').html('<i class="fal fa-check text-primary"></i>');
                });
            }
            var $tabs = $('a[data-toggle="pill"],a[data-toggle="tab"]');
            $tabs.on('show.bs.tab', function(e) {
                $(this).find('.number').html($(this).data('number'));
                var $prev_item = $(this).parent().prevAll();
                if ($prev_item.length > 0) {
                    $prev_item.each(function() {
                        $(this).find('.number').html('<i class="fal fa-check text-primary"></i>');
                    });
                }
                var $next_item = $(this).parent().nextAll();
                if ($next_item.length > 0) {
                    $next_item.each(function() {
                        var number = $(this).find('.nav-link').data('number');
                        $(this).find('.number').html(number);
                    });
                }
            });
            $('.prev-button').on('click', function(e) {
                e.preventDefault();
                var $parent = $(this).parents('.tab-pane');
                $parent.removeClass('show active');
                $parent.prev().addClass('show active');
                $parent.find('.collapsible').removeClass('show');
                $parent.prev().find('.collapsible').addClass('show');
                var id = $parent.attr('id');
                var $nav_link = $('a[href="#' + id + '"]');
                $nav_link.removeClass('active');
                $nav_link.find('.number').html($nav_link.data('number'));
                var $prev = $nav_link.parent().prev();
                $prev.find('.nav-link').addClass('active');
                var number = $parent.find('.collapse-parent').data('number');
                $parent.find('.number').html(number);
            });
            $('.next-button').on('click', function(e) {
                e.preventDefault();
                var $parent = $(this).parents('.tab-pane');
                $parent.removeClass('show active');
                $parent.next().addClass('show active');
                $parent.find('.collapsible').removeClass('show');
                $parent.next().find('.collapsible').addClass('show');
                var id = $parent.attr('id');
                var $nav_link = $('a[href="#' + id + '"]');
                $nav_link.removeClass('active');
                $nav_link.find('.number').html($nav_link.data('number'));
                var $prev = $nav_link.parent().next();
                $prev.find('.nav-link').addClass('active');
                $nav_link.find('.number').html('<i class="fal fa-check text-primary"></i>');
                $parent.find('.number').html('<i class="fal fa-check text-primary"></i>');
            });
            $step.find('.collapsible').on('show.bs.collapse', function() {
                $(this).find('.number').html($(this).data('number'));
                var $parent = $(this).parents('.tab-pane');
                var $prev_item = $parent.prevAll();
                if ($prev_item.length > 0) {
                    $prev_item.each(function() {
                        $(this).find('.number').html('<i class="fal fa-check text-primary"></i>');
                    });
                }
                var $next_item = $parent.nextAll();
                if ($next_item.length > 0) {
                    $next_item.each(function() {
                        var number = $(this).find('.collapse-parent').data('number');
                        $(this).find('.number').html(number);
                    });
                }
            });
        },
        enablePopovers: function() {
            $('[data-toggle="popover"]').popover();
        },
        enableDatepicker: function() {
            var $timePickers = $('.timepicker input');
            $timePickers.each(function() {
                $(this).timepicker({
                    icons: {
                        up: 'fal fa-angle-up',
                        down: 'fal fa-angle-down'
                    },
                });
            });
            var $calendar = $('.calendar');
            if ($calendar.length < 1) {
                return;
            }
            var $item = $calendar.find('.card');
            $item.on('click', function(e) {
                e.preventDefault();
                $item.each(function() {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                $('.widget-request-tour').find('.date').val($(this).data('date'));
            })
        },
        initToast: function() {
            $('.toast').toast();
        },
        processTestimonials: function() {
            var $slick_slider = $('.custom-vertical');
            if ($slick_slider.length < 1) {
                return;
            }
            $slick_slider.on('init', function(slick) {
                $(this).find('.slick-current').prev().addClass('prev');
            });
            $slick_slider.on('afterChange', function(event, slick, currentSlide) {
                $(this).find('.slick-slide').removeClass('prev');
                $(this).find('.slick-current').prev().addClass('prev');
            });
        },
        scrollSpyLanding: function() {
            var $langding_menu = $('#landingMenu');
            if ($langding_menu.length < 1) {
                return;
            }
            $('body').scrollspy({
                target: '#landingMenu',
                offset: 200
            });
            $langding_menu.find('.nav-link').not('[href="#"]').not('[href="#0"]').click(function(event) {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 500, function() {});
                    }
                }
            });
        },
        parallaxImag: function() {
            var image_wrapper = $(".landing-banner");
            image_wrapper.mousemove(function(e) {
                e.preventDefault();
                var wx = $(window).width();
                var wy = $(window).height();
                var x = e.pageX - this.offsetLeft;
                var y = e.pageY - this.offsetTop;
                var newx = x - wx / 2;
                var newy = y - wy / 2;
                $.each(image_wrapper.find('.layer'), function(index) {
                    var speed = 0.01 + index / 100;
                    TweenMax.to($(this), 1, {
                        x: (1 - newx * speed),
                        y: (1 - newy * speed)
                    });
                });
            });
            image_wrapper.on('mouseleave', (function(e) {
                e.preventDefault();
                $.each(image_wrapper.find('.layer'), function() {
                    TweenMax.to($(this), 1, {
                        x: 0,
                        y: 0
                    });
                });
            }));
        },
    };


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

   
    APP.animation = {
        delay: 100,
        itemQueue: [],
        queueTimer: null,
        $wrapper: null,
        init: function() {
            var _self = this;
            _self.$wrapper = $body;
            _self.itemQueue = [];
            _self.queueTimer = null;
            if (typeof delay !== 'undefined') {
                _self.delay = delay;
            }
            _self.itemQueue["animated_0"] = [];
            $body.find('#content').find('>div,>section').each(function(index) {
                $(this).attr('data-animated-id', (index + 1));
                _self.itemQueue["animated_" + (index + 1)] = [];
            });
            setTimeout(function() {
                _self.registerAnimation();
            }, 200);
        },
        registerAnimation: function() {
            var _self = this;
            $('[data-animate]:not(.animated)', _self.$wrapper).waypoint(function() {
                var _el = this.element ? this.element : this,
                    $this = $(_el);
                if ($this.is(":visible")) {
                    var $animated_wrap = $this.closest("[data-animated-id]"),
                        animated_id = '0';
                    if ($animated_wrap.length) {
                        animated_id = $animated_wrap.data('animated-id');
                    }
                    _self.itemQueue['animated_' + animated_id].push(_el);
                    _self.processItemQueue();
                } else {
                    $this.addClass($this.data('animate')).addClass('animated');
                }
            }, {
                offset: '90%',
                triggerOnce: true
            });
        },
        processItemQueue: function() {
            var _self = this;
            if (_self.queueTimer) return;
            _self.queueTimer = window.setInterval(function() {
                var has_queue = false;
                for (var animated_id in _self.itemQueue) {
                    if (_self.itemQueue[animated_id].length) {
                        has_queue = true;
                        break;
                    }
                }
                if (has_queue) {
                    for (var animated_id in _self.itemQueue) {
                        var $item = $(_self.itemQueue[animated_id].shift());
                        $item.addClass($item.data('animate')).addClass('animated');
                    }
                    _self.processItemQueue();
                } else {
                    window.clearInterval(_self.queueTimer);
                    _self.queueTimer = null
                }
            }, _self.delay);
        }
    };
    if ($.fn.dropzone) {
        Dropzone.autoDiscover = false;
    }



    $(document).ready(function() {
        APP.init();
        APP.util.init();
        APP.uploader.init();
        APP.animation.init();
    });
})(jQuery);
