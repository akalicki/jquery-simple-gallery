(function($) {
    $.fn.gallery = function(options) {
        
        // create defaults and override them later if requested
        $.fn.gallery.defaults = {
            target: "",
            startImg: 0,
            waitTime: 5000,
            changeTime: 700,
            easing: "swing",
            restartOnEnd: true
        };
        
        // global plugin variables
        var obj = this;
        var options = $.extend($.fn.gallery.defaults, options);
        var nextImg = options.startImg;
        var cycle = window.setInterval(loadNext, options.waitTime);
        
        // set the target background CSS, begin cycle
        $.fn.gallery.init = function() {
            $(options.target).css({
                "background-repeat": "no-repeat",
                "background-position": "center",
                "opacity": 0
            });
            $.fn.gallery.fetchImg(nextImg);
        }
        
        // transition out current image, call fetch function to transition in next one
        $.fn.gallery.changeToImg = function(index) {
            $(options.target).animate({"opacity": 0}, options.changeTime, options.easing,
                                      function(){ $.fn.gallery.fetchImg(index); });
        }
        
        // transition in the given image
        $.fn.gallery.fetchImg = function(index) {
            var url = obj.get(index).src;
            $(options.target)
                .css("background-image", "url("+url+")")
                .animate({"opacity": 1}, options.change, options.easing);
            nextImg = index + 1;
        }
        
        // switch to given image on click, reset cycle interval
        function onClick() {
            window.clearInterval(cycle);
            nextImg = $(this).index();
            $.fn.gallery.changeToImg(nextImg);
            cycle = window.setInterval(loadNext, options.waitTime);
        }
        
        // load the next image in cycle
        function loadNext() {
            if (nextImg < obj.length) {  // more images in cycle
                $.fn.gallery.changeToImg(nextImg);
            }
            else if (options.restartOnEnd) {  // end of cycle, restart
                nextImg = 0;
                $.fn.gallery.changeToImg(nextImg);
            }
            else {  // end of cycle, don't restart
                window.clearInterval(cycle);
            }
        }
        
        // initialize gallery and set click events
        $.fn.gallery.init();
        return this.each(function() {
            $(this).click(onClick);
        });
        
    };
})(jQuery);