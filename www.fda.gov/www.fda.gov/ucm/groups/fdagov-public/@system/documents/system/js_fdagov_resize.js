/*
 * js_fda_resize.js
 * Edited 27 September 2011
 *
 * Handle resizing the font using the buttons on the page.  This code 
 * essentially uses the existing FDA code to change font sizes, but has been
 * separated into this file in order to show the differences.
 *
 * If desired, this code can be merged with the existing code.  The 
 * only functionality that is not defined in the existing code is the ability
 * to reset the font size to the original value.
 */ 

// wait until the document has loaded, then provide the click action
// this just separates the presentation from the actions performed
$(document).ready(function(){
		$("#font-size-increase").bind("click", function(){resizeText(1);});
		$("#font-size-standard").bind("click", function(){resizeText(0);});
		$("#font-size-decrease").bind("click", function(){resizeText(-1);});
});


/*
 * ResizeText
 * Resize the text in the #content section.  Makes use of existing FDA resize
 * code.
 * params: multiplier The effect to have on the text:
 *						-1: decrease the font size
 *						 0: return the font size to normal
 *						 1: increase the font size
 * return: none
 * pre: none
 * post: The font size has been increased one level according to the FDA code
*/
function resizeText(multiplier) {	
	// handle the reset action (not supported in the FDA code)
	if(multiplier == 0){
		currentSize = defaultSize;
	}
	
	// call the FDA code (passing the 0 multiplier will have no effect)
	changeTextSize(multiplier);
}
