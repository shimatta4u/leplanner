(function ($) {
//PLUGINS
$(document).ready(function() {
    "use strict";
            $('#flickrs').jflickrfeed({
            limit: 8,
            qstrings: {
                id: '52617155@N08' // Set your flickr ID here
            },
            itemTemplate: 
            '<li class="flickr">' +
                '<a data-rel="prettyPhoto" class="screen-roll" href="{{image_b}}"><span></span><img class="" src="{{image_s}}" alt="{{title}}" /></a>' +
            '</li>'});
        
});
})(jQuery);