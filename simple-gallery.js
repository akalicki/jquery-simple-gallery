/*
 * simple-gallery.js - v1.0.0
 * Author: Alex Kalicki (https://github.com/akalicki)
 *
 * simple-gallery.js is a lightweight jQuery extension for quickly creating
 * highly customizable photo galleries using standard jQuery notation.
 *
 * All work contained in this file is licensed under a Creative Commons Attribution 3.0
 * Unported License.  Please contact the copyright holder with further questions.
*/
(function($) {
    $.fn.gallery = function(options) {
        
        // create defaults which can be overridden if requested
        $.fn.gallery.defaults = {
            target: "",
            startImg: 0,
            waitTime: 5000,
            changeTime: 700,
            easing: "swing",
            restartOnEnd: true
        };
        
        // merge defaults and user-supplied options
        var options = $.extend($.fn.gallery.defaults, options);
        
        // global plugin variables
        var obj = this;
        var nextImg = options.startImg;
        
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
                .animate({"opacity": 1}, options.changeTime, options.easing,
                    function(){ cycle = window.setTimeout(loadNext, options.waitTime); });
            nextImg = index + 1;
        }
        
        // switch to given image on click, reset cycle interval
        function onClick() {
            window.clearTimeout(cycle);
            nextImg = obj.index($(this));
            $.fn.gallery.changeToImg(nextImg);
        }
        
        // load the next image in cycle
        function loadNext() {
            if (nextImg < obj.length) {       // more images in cycle
                $.fn.gallery.changeToImg(nextImg);
            }
            else if (options.restartOnEnd) {  // end of cycle, restart
                nextImg = 0;
                $.fn.gallery.changeToImg(nextImg);
            }
        }
        
        // initialize gallery and set click events
        $.fn.gallery.init();
        return this.each(function() {
            $(this).click(onClick);
        });
        
    };
})(jQuery);