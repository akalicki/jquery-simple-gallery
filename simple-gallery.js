/*
 * simple-gallery.js - v2.0.1
 * Author: Alex Kalicki (https://github.com/akalicki)
 *
 * simple-gallery.js is a lightweight jQuery extension for quickly creating
 * highly customizable photo galleries using standard jQuery notation.
 *
 * All work contained in this file is licensed under a Creative Commons Attribution 3.0
 * Unported License.  Please contact the copyright holder with further questions.
*/
;(function ($, window, document, undefined) {

    $.widget('ak.gallery', {
    
        // default widget options
        options: {
            source: "",
            animate: true,
            startImg: 0,
            waitTime: 5000,
            changeTime: 700,
            easing: "swing",
            restartOnEnd: true,
            selectClass: "selected"
        },
        
        // setup gallery widget
        _create: function() {
            this.images = $(this.options.source);
            this.nextImg = this.options.startImg;
            this.cycle;
            
            this.element.css({
                "background-repeat": "no-repeat",
                "background-position": "center",
                "opacity": 0
            });
            this.images.on('click.gallery', $.proxy(this._onClick, this));
            this._loadNext();
        },
        
        // reset DOM to state before gallery was invoked
        _destroy: function() {
            this.element.css({
                "background-repeat": "repeat",
                "background-position": "0% 0%",
                "opacity": 1
            });
            this.images.off('click.gallery');
            this._super();
        },
        
        // allow setting of options during/after construction
        _setOption: function(key, value) {
            this.options[key] = value;
        },
        
        // load the next image in cycle
        _loadNext: function() {
            if (this.nextImg < this.images.length) { // more images in cycle
                this._changeToImg(this.nextImg);
            }
            else if (this.options.restartOnEnd) {    // end of cycle, restart
                this.nextImg = 0;
                this._changeToImg(this.nextImg);
            }
        },
        
        // transition out, select new image, transition in
        _changeToImg: function(index) {
            var self = this;
            self.element.clearQueue();
            self._startTransition();
            self.element.queue(function(next) {
                self._selectImg(index);
                next();
            });
            self._endTransition();
            if (self.options.animate) {
                self.element.queue(function(next) {
                    self.cycle = window.setTimeout(function() {
                        self._loadNext();
                    }, self.options.waitTime);
                    next();
                });
            }
        },
        
        // select a new image to be placed in target
        _selectImg: function(index) {
            var selected = this.images.get(index);
            var url = selected.src;
            this.element.css("background-image", "url(" + url + ")");
            $("." + this.options.selectClass).removeClass(this.options.selectClass);
            selected.className += this.options.selectClass;
            this.nextImg = index + 1;
        },
        
        // perform transition to remove current image from target
        _startTransition: function() {
            this.element.animate(
                {"opacity": 0}, 
                this.options.changeTime, 
                this.options.easing
            );
        },
        
        // perform transition to add new image to target
        _endTransition: function() {
            this.element.animate(
                {"opacity": 1}, 
                this.options.changeTime, 
                this.options.easing
            );
        },
        
        // reset timer and select image if clicked
        _onClick: function(event) {
            window.clearTimeout(this.cycle);
            this.element.stop(true);
            this.nextImg = this.images.index($(event.target));
            this._changeToImg(this.nextImg);
        },
        
        // stop photos from switching
        stopAnimation: function() {
            this.options.animate = false;
            window.clearTimeout(this.cycle);
            this.element.stop(true);
            this._endTransition();
        },
        
        // resume photo switching
        resumeAnimation: function() {
            var self = this;
            self.options.animate = true;
            self.cycle = window.setTimeout(function() {
                self._loadNext();
            }, self.options.waitTime);
        }
    
    });

})(jQuery, window, document);