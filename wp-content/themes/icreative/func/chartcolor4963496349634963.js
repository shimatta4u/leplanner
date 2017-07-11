 (function($) {

    "use strict";
   
    $("#slides").superslides({
        play: 6000,
        animation: "fade",
        pagination: true
    });


// Chart Effects;
    $('.chart').easyPieChart({
        easing: 'easeOutBounce',
        size : 220,
        animate : 2000,
        lineCap : 'square',
        lineWidth : 20,
        barColor : '#b32945',
        trackColor : '#ffffff',
        scaleColor : false,
        onStep: function(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent)+'%');
        }
    });
})(jQuery);