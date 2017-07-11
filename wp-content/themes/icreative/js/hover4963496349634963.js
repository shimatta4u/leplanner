/*
*	jQuery HoverEx Script
*	by hkeyjun
*   http://codecanyon.net/user/hkeyjun	
*/
;(function($){
	var HoverEx = {
		fn:{
			moveZoom:function(obj,e)
			{
				var h =obj.height(),w=obj.width(),t=e.pageY-obj.offset().top,l=e.pageX-obj.offset().left;
				var $largeImg = obj.find("img");
				var dataZoom = obj.data("zoom");
				if(dataZoom&&dataZoom!="auto")
				{
					var zoomNum = parseFloat(dataZoom);
					$largeImg.css({"width":w*zoomNum+"px","height":h*zoomNum+"px","top":-t*(zoomNum-1)+"px","left":-l*(zoomNum-1)+"px"});
				}
				else
				{
					var zoomNum = $largeImg.width()/w;
					$largeImg.css({"top":-t*(zoomNum-1)+"px","left":-l*(zoomNum-1)+"px"});
				}
			},
			changeZoom:function(obj,e,delta, deltaX, deltaY)
			{
				var $largeImg = obj.find("img");
				var currentZoom = obj.data("zoom");
				currentZoom = currentZoom=="auto"?$largeImg.width()/obj.width():parseFloat(currentZoom);
				var zoomStep = obj.data("zoomstep");
				zoomStep = zoomStep?parseFloat(zoomStep):0.5;
				var zoomRange = obj.data("zoomrange");
				zoomRange = zoomRange?zoomRange.split(","):"1,4";
				var zoomMin = parseFloat(zoomRange[0]),zoomMax = parseFloat(zoomRange[1])>currentZoom?parseFloat(zoomRange[1]):currentZoom;
				var op = deltaY>0?1:-1;
				var	nextZoom =Math.round((currentZoom+zoomStep*op)*10)/10.0;
				if(nextZoom >=zoomMin&& nextZoom <=zoomMax)
				{
					obj.data("zoom",nextZoom);
					HoverEx.fn.showZoomState(obj,nextZoom);
					HoverEx.fn.moveZoom(obj,e);
				}
				
			},
			showZoomState:function(obj,state)
			{
				var $zoomState =obj.find(".he-zoomstate");
				if($zoomState.length == 0)
				{
					$zoomState = $('<span class="he-zoomstate">'+state+'X</span>').appendTo(obj);
				}
				$zoomState.text(state+"X").stop(true,true).fadeIn(300).delay(200).fadeOut(300);
			},
			switchImg:function(slider,type)
			{
				var animation = slider.data("animate");
				animation = animation?animation:"random";
				if(animation =="random")
				{
					var animations =["fadeIn","fadeInLeft","fadeInRight","fadeInUp","fadeInDown","rotateIn","rotateInLeft","rotateInRight","rotateInUp","rotateInDown","bounce","bounceInLeft","bounceInRight","bounceInUp","bounceInDown","elasticInLeft","elasticInRight","elasticInUp","elasticInDown","zoomIn","zoomInLeft","zoomInRight","zoomInUp","zoomInDown","jellyInLeft","jellyInRight","jellyInDown","jellyInUp","flipInLeft","flipInRight","flipInUp","flipInDown","flipInV","flipInH"];
					animation =animations[Math.floor(Math.random()*animations.length)];
				}
				var $imgs =slider.find("img"); 
				if($imgs.length>1)
				{
					if(type>0)
					{
						$imgs.eq(0).attr("class","a0").appendTo(slider);
						$imgs.eq(1).attr("class","a0 "+animation);
					}
					else
					{
						$imgs.eq($imgs.length-1).attr("class","a0 "+animation).prependTo(slider);
						$imgs.eq(0).attr("class","a0");
					}
				}
			}
		}
	};
	
	$(function(){
		$(document).on('mouseenter','.he-wrap',function(){
				var $view = $(this).find(".he-view").addClass("he-view-show");
				$("[data-animate]",$view).each(function(){
					var animate = $(this).data("animate");
					$(this).addClass(animate);
				});
				$(this).find(".he-zoom").addClass("he-view-show");
		}).on('mouseleave','.he-wrap',function(){
				var $view = $(this).find(".he-view").removeClass("he-view-show");
				$("[data-animate]",$view).each(function(){
					var animate = $(this).data("animate");
					$(this).removeClass(animate);
				});
				$(this).find(".he-zoom").removeClass("he-view-show");
		   }).on('mousewheel','.he-wrap',function(e,delta, deltaX, deltaY){
				if($(this).find(".he-sliders").length==1)
				{
					var $slider = $(this).find(".he-sliders");
					var op = deltaY>0?1:-1;
					HoverEx.fn.switchImg($slider,op);
					e.preventDefault();
				}
				else if($(this).find(".he-zoom").length==1)
				{
					var $zoom =$(this).find(".he-zoom");
					HoverEx.fn.changeZoom($zoom,e,delta,deltaX,deltaY);
					e.preventDefault();
				}
		}).on('mousemove','.he-zoom',function(e){
			HoverEx.fn.moveZoom($(this),e);
		}).on('click','.he-pre',function(){
			var $slider =$(this).parents(".he-wrap").find(".he-sliders");
			HoverEx.fn.switchImg($slider,-1);
		}).on('click','.he-next',function(){
			var $slider =$(this).parents(".he-wrap").find(".he-sliders");
			HoverEx.fn.switchImg($slider,1);
		});	   

	
		
	});
})(jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);

/**
 * jquery.hoverdir.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {
	
	'use strict';

	$.HoverDir = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );

	};

	// the options
	$.HoverDir.defaults = {
		speed : 300,
		easing : 'ease',
		hoverDelay : 0,
		inverse : false
	};

	$.HoverDir.prototype = {

		_init : function( options ) {
			
			// options
			this.options = $.extend( true, {}, $.HoverDir.defaults, options );
			// transition properties
			this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
			// support for CSS transitions
			this.support = Modernizr.csstransitions;
			// load the events
			this._loadEvents();

		},
		_loadEvents : function() {

			var self = this;
			
			this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {
				
				var $el = $( this ),
					$hoverElem = $el.find( 'div' ),
					direction = self._getDir( $el, { x : event.pageX, y : event.pageY } ),
					styleCSS = self._getStyle( direction );
				
				if( event.type === 'mouseenter' ) {
					
					$hoverElem.hide().css( styleCSS.from );
					clearTimeout( self.tmhover );

					self.tmhover = setTimeout( function() {
						
						$hoverElem.show( 0, function() {
							
							var $el = $( this );
							if( self.support ) {
								$el.css( 'transition', self.transitionProp );
							}
							self._applyAnimation( $el, styleCSS.to, self.options.speed );

						} );
						
					
					}, self.options.hoverDelay );
					
				}
				else {
				
					if( self.support ) {
						$hoverElem.css( 'transition', self.transitionProp );
					}
					clearTimeout( self.tmhover );
					self._applyAnimation( $hoverElem, styleCSS.from, self.options.speed );
					
				}
					
			} );

		},
		// credits : http://stackoverflow.com/a/3647634
		_getDir : function( $el, coordinates ) {
			
			// the width and height of the current div
			var w = $el.width(),
				h = $el.height(),

				// calculate the x and y to get an angle to the center of the div from that x and y.
				// gets the x value relative to the center of the DIV and "normalize" it
				x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
				y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
			
				// the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
				// first calculate the angle of the point,
				// add 180 deg to get rid of the negative values
				// divide by 90 to get the quadrant
				// add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
				direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;
			
			return direction;
			
		},
		_getStyle : function( direction ) {
			
			var fromStyle, toStyle,
				slideFromTop = { left : '0px', top : '-100%' },
				slideFromBottom = { left : '0px', top : '100%' },
				slideFromLeft = { left : '-100%', top : '0px' },
				slideFromRight = { left : '100%', top : '0px' },
				slideTop = { top : '0px' },
				slideLeft = { left : '0px' };
			
			switch( direction ) {
				case 0:
					// from top
					fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
					toStyle = slideTop;
					break;
				case 1:
					// from right
					fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
					toStyle = slideLeft;
					break;
				case 2:
					// from bottom
					fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
					toStyle = slideTop;
					break;
				case 3:
					// from left
					fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
					toStyle = slideLeft;
					break;
			};
			
			return { from : fromStyle, to : toStyle };
					
		},
		// apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
		_applyAnimation : function( el, styleCSS, speed ) {

			$.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
			el.stop().applyStyle( styleCSS, $.extend( true, [], { duration : speed + 'ms' } ) );

		},

	};
	
	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.hoverdir = function( options ) {

		var instance = $.data( this, 'hoverdir' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on hoverdir prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for hoverdir instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					instance = $.data( this, 'hoverdir', new $.HoverDir( options, this ) );
				
				}

			});
		
		}
		
		return instance;
		
	};
	
} )( jQuery, window );
