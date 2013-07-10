(function($) {
    $.fn.gallery = function(options) {
        
        $.fn.gallery.defaults = {
            target: "",
            waitTime: 2,
            restartOnEnd: true,
            thumbExt: ""
        };
        var options = $.extend($.fn.gallery.defaults, options);
        
        init(this);
        return this.each(function() {
            $(this).click(onClick);
        });
        
        function init(obj) {
            $(options.target).css({
                "background-repeat": "no-repeat",
                "background-position": "center"
            });
            loadImg(obj, 0);
        }
        
        function loadImg(obj, index) {
            var url = obj.get(index).src;
            $(options.target).css("background-image", "url("+url+")");
        }
        
        function onClick() {
            
        }      
        
    };
})(jQuery);