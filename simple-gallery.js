/*
 * simple-gallery.js - v1.2.0
 * Author: Alex Kalicki (https://github.com/akalicki)
 *
 * simple-gallery.js is a lightweight jQuery extension for quickly creating
 * highly customizable photo galleries using standard jQuery notation.
 *
 * All work contained in this file is licensed under a Creative Commons Attribution 3.0
 * Unported License.  Please contact the copyright holder with further questions.
*/
;(function($) {
    $.fn.gallery = function(options) {
         
        // merge defaults and user-supplied options
        var options = $.extend($.fn.gallery.defaults, options);
        
        // global plugin variables
        var obj = this;
        var nextImg = options.startImg;
        var cycle;
        
        // set the target background CSS, perform any needed initialization
        $.fn.gallery.init = function() {
            $(options.target).css({
                "background-repeat": "no-repeat",
                "background-position": "center",
                "opacity": 0
            });
        }
        
        // perform transition to remove current image from target
        $.fn.gallery.startTransition = function() {
            $(options.target).animate(
                {"opacity": 0}, 
                options.changeTime, 
                options.easing
            );
        }
        
        // perform transition to add new image to target
        $.fn.gallery.endTransition = function() {
            $(options.target).animate(
                {"opacity": 1}, 
                options.changeTime, 
                options.easing
            );
        }
        
        // select a new image to be placed in target
        function selectImg(index) {
            var selected = obj.get(index);
            var url = selected.src;
            $(options.target).css("background-image", "url(" + url + ")");
            $("." + options.selectClass).removeClass(options.selectClass);
            selected.className += options.selectClass;
            nextImg = index + 1;
        }
        
        // transition out, select new image, transition in
        function changeToImg(index) {
            $(options.target).clearQueue();
            $.fn.gallery.startTransition();
            $(options.target).queue(function() {
                selectImg(index);
                $(this).dequeue();
            });
            $.fn.gallery.endTransition();
            $(options.target).queue(function() {
                cycle = window.setTimeout(loadNext, options.waitTime);
                $(this).dequeue();
            });
        }
        
        // load the next image in cycle
        function loadNext() {
            if (nextImg < obj.length) {       // more images in cycle
                changeToImg(nextImg);
            }
            else if (options.restartOnEnd) {  // end of cycle, restart
                nextImg = 0;
                changeToImg(nextImg);
            }
        }
        
        // switch to given image on click, reset cycle interval
        function onClick() {
            window.clearTimeout(cycle);
            nextImg = obj.index($(this));
            changeToImg(nextImg);
        }
        
        // initialize gallery and set click events
        $.fn.gallery.init();
        changeToImg(nextImg);
        return this.each(function() {
            $(this).click(onClick);
        });
        
    };
    
    // create public defaults which can be overridden if requested
    $.fn.gallery.defaults = {
        target: "",
        startImg: 0,
        waitTime: 5000,
        changeTime: 700,
        easing: "swing",
        restartOnEnd: true,
        selectClass: "selected"
    };
})(jQuery);