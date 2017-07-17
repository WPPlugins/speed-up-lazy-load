!function($) {
	/**
	 * SpeedUpLazyLoad plugin
	 * This plugin is based on unveil.js plugin by Mika Tuupola: https://github.com/luis-almeida/unveil
	 */
    $.fn.SpeedUpLazyLoad = function(attrib, threshold) {
    
    	var loaded    = null, 
    	    $w        = $(window),
    	    threshold = threshold || 0,
    	    attrib    = attrib || "data-lazy-src",
            lazyWord  = "lazyLoad",
            images    = this;
    
    	/**
    	 * lazyLoad event.
    	 * Check if image has lazy attr and if exists
         * change scr value with lazy attr value and load the image.
         * 
         * @return void
    	 */
    	images.one(lazyWord, function() {
    	
    	    var $img = $(this),
                src  = $img.attr(attrib);
        
    	    $img.removeAttr(attrib);
    	    
            if( src ){
        	   $img.attr("src", src);
            }
        
        });
    
        /**
         * lazyLoad function.
         * For each lazy images check if the image is visible (in the screen area).
         * 
         * @return void
         */
        var lazyLoad = function() {
        
    	    var inview = images.filter(function() {
        
        	    var $img = $(this);
        
        	    // check if the image is visible
                if ( !$img.is(":hidden") ) {
        	
        	        var winTop    = $w.scrollTop(),
            	        winBottom = winTop + $w.height(),
            	        imgTop    = $img.offset().top,
            	        imgBottom = imgTop + $img.height();

        	        // check if the image is in the screen area
        	        return ((imgBottom >= (winTop - threshold)) && (imgTop <= (winBottom + threshold)));
                }
        
            });
    	
    	    // trigger lazyLoad event
            loaded = inview.trigger(lazyWord);
            
            // update the images list
            images = images.not(loaded);
        };
     
        // attach lazyLoad event on some window events
        $w.on("scroll." + lazyWord + " resize." + lazyWord + " lookup." + lazyWord + " touchend." + lazyWord, lazyLoad); 
    
        // init 
        lazyLoad();
    
        return this;
    }
}(jQuery);

jQuery(document).ready(function($) {
	
	var attrib = 'data-lazy-src';
	
    $("img["+attrib+"],iframe["+attrib+"]").SpeedUpLazyLoad(attrib, 150);
    
});