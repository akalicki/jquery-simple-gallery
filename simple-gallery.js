/*
 * simple-gallery.js - v2.6.0
 * Author: Alex Kalicki (https://github.com/akalicki)
 *
 * simple-gallery.js is a lightweight jQuery extension for quickly creating
 * highly customizable photo galleries using standard jQuery notation.
 *
 * All work contained in this file is released under the MIT License.
 * Please contact the copyright holder with further questions.
*/
;(function ($, window, document, undefined) {

    $.widget('ak.gallery', {
    
        // default widget options
        options: {
            source: "",
            thumbExt: "",
            animate: true,
            startImg: 0,
            waitTime: 5000,
            changeTime: 700,
            easing: "swing",
            restartOnEnd: true,
            selectClass: "selected",
            showCaptions: false,
            captionTarget: ""
        },
        
        // setup gallery widget
        _create: function() {
            this.images = $(this.options.source);
            this.nextImg = this.options.startImg;
            
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
            this._trigger("destroy");
            this.images.off('click.gallery');
            this.images.removeClass(this.options.selectClass);
            
            window.clearTimeout(this.cycle);
            this.element.stop(true);
            if (this.options.showCaptions) {
                $(this.options.captionTarget).stop(true);
            }
            
            this._startTransition();
            var self = this;
            this.element.queue(function(next) {
                self.element.css({
                    "background-repeat": "repeat",
                    "background-position": "0% 0%",
                    "background-image": "none",
                    "opacity": 1
                });
                next();
            });

            this._super();
        },
        
        // allow setting of options during/after construction
        _setOption: function(key, value) {
            this._trigger('optionchange');
            this.options[key] = value;
            
            if (key === "source") {
                this._trigger('sourcechange');
                window.clearTimeout(this.cycle);
                this.images.off('click.gallery');
                this.images = $(this.options.source);
                this.images.on('click.gallery', $.proxy(this._onClick, this));
                this.nextImg = this.options.startImg;
                this._changeToImg(this.nextImg);
            }
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
            this._trigger('imageload');
            
            var selected = this.images.get(index);
            var url = this._removeLast(selected.src, this.options.thumbExt);
            this.element.css("background-image", "url(" + url + ")");
            this.images.removeClass(this.options.selectClass);
            selected.className += this.options.selectClass;
            this.nextImg = index + 1;
            
            if (this.options.showCaptions) {
                var caption = selected.title;
                $(this.options.captionTarget).html(caption);
            }
        },
        
        // perform transition to remove current image from target
        _startTransition: function() {
            this.element.animate(
                {"opacity": 0}, 
                this.options.changeTime, 
                this.options.easing
            );
            
            if (this.options.showCaptions) {
                $(this.options.captionTarget).animate(
                    {"opacity": 0},
                    this.options.changeTime,
                    this.options.easing
                );
            }
        },
        
        // perform transition to add new image to target
        _endTransition: function() {
            this.element.animate(
                {"opacity": 1}, 
                this.options.changeTime, 
                this.options.easing
            );
            
            if (this.options.showCaptions) {
                $(this.options.captionTarget).animate(
                    {"opacity": 1},
                    this.options.changeTime,
                    this.options.easing
                );
            }
        },
        
        // reset timer and select image if clicked
        _onClick: function(event) {
            this._trigger('click');
            
            window.clearTimeout(this.cycle);
            this.element.stop(true);
            this.nextImg = this.images.index($(event.target));
            this._changeToImg(this.nextImg);
        },
        
        // stop photos from switching
        stopAnimation: function() {
            this._trigger('animationstop');
            
            this.options.animate = false;
            window.clearTimeout(this.cycle);
            this.element.stop(true);
            if (this.options.showCaptions) {
                $(this.options.captionTarget).stop(true);
            }
            this._endTransition();
        },
        
        // resume photo switching
        resumeAnimation: function() {
            var self = this;
            self._trigger('animationresume');
            
            self.options.animate = true;
            self.cycle = window.setTimeout(function() {
                self._loadNext();
            }, self.options.waitTime);
        },

        // helper: remove last occurence of substring
        _removeLast: function(str, substr) {
            var lastPos = str.lastIndexOf(substr);
            if (lastPos == -1)
                return str;
            return str.substring(0, lastPos) + 
                   str.substring(lastPos + substr.length);
        }
    
    });

})(jQuery, window, document);