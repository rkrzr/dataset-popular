$(document).ready(function()
	{
	var navLinks = $(".spromo .nav .nav_links ul li").size();
	var navLinksList = $(".spromo .nav .nav_links ul li").size() -2;
	var navLoc = 1;
	var prevNavLoc = new Array ();
	prevNavLoc[1] = 1;
	//Centers the navigation under the headline and link
	$(".spromo .nav .nav_links").css("width", navLinks * 15);
	
	//Starts preload of images, then starts slide rotation
	for (i=2;i<navLinksList+1;i++)
 	 	{
  		if (i==navLinksList)
    		{
			//Loads the last slide in
			var imgSrc = $('#prm-hp_n'+i+'s .prm_slide a').attr('data-src');
			var imgAlt = $('#prm-hp_n'+i+'s .prm_slide a').attr('data-alt');
			$('#prm-hp_n'+i+'s .prm_slide a').prepend('<div class="corners"> </div><img class="loading_large" src="'+imgSrc+'" alt="'+imgAlt+'" />');
			//Turns on the first slide,
			$('#prm-hp_n1').addClass("nav_on");
			$('#prm-hp_n1s').fadeIn('slow'); 
			//Opens mini nav after other images load	
			$(".spromo .nav").show('');
			//Runs Slides in Dynamic Lead until something is clicked
			myVar=setInterval(function(){
			if (navLoc < navLinksList){
				navLoc++
				prevNavLoc[1] = navLoc;
				updatedPrmNav('prm-hp_n'+navLoc);
				}
			else {
				navLoc = 1;
				prevNavLoc[1] = navLoc;
				updatedPrmNav('prm-hp_n'+navLoc);
				}
			},4000);
    		break;
    		}
		else {	
			var imgSrc = $('#prm-hp_n'+i+'s .prm_slide a').attr('data-src');
			var imgAlt = $('#prm-hp_n'+i+'s .prm_slide a').attr('data-alt');
			$('#prm-hp_n'+i+'s .prm_slide a').prepend('<div class="corners"> </div><img class="loading_large" src="'+imgSrc+'" alt="'+imgAlt+'" />');
			}
  		}

	
	$(".spromo").click(function()
		{
		//Stops the automatic slide rotation
		clearInterval(myVar);
		});
		
	//bind an onclick listener to the dynamic lead nav options
	$(".spromo .nav a").click(function()
		{		
		// gets the id of the nav link clicked
		var pos = $(this).attr('id');
		//navLoc = pos.split('prm-hp_n');

		//run updatedPrmNav() method after finding left from right
		if (pos == "prm-hp_left"){
			t=prevNavLoc[1]-1;
			navLoc[1] = t;
			if (t <= 0){
				t=navLinksList;
				}	
				
			if (t <= 1){
				pos = 'prm-hp_n'+t;
				prevNavLoc[1] = t; 
				}
			else {
				pos = 'prm-hp_n' + t; 
				prevNavLoc[1] = t; 
				} 	
			}
		
		else if (pos == "prm-hp_right"){
			t=parseInt(prevNavLoc[1])+1;
			navLoc[1] = t;
			if (prevNavLoc[1] < navLinksList){
				pos = 'prm-hp_n' + t; 
				prevNavLoc[1] = t; 
				}
			else {
				pos = 'prm-hp_n'+1;
				prevNavLoc[1] = 1; 
				} 
			}
		else {
			prevNavLoc = pos.split('prm-hp_n');
			}
		var nstate = $(this).attr('class')+'';
		if (nstate != "nav_on"){
		updatedPrmNavClick(pos);
		}
	});

// Swipe tracker 
var startCoords = {}, endCoords = {};

$('.spromo').bind("touchstart", function(event) {
    endCoords = event.originalEvent.targetTouches[0];
    startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
    startCoords.pageY = event.originalEvent.targetTouches[0].pageY;
});

$('.spromo').bind("touchmove", function(event) {
    event.preventDefault();
    endCoords = event.originalEvent.targetTouches[0];
});

$('.spromo').bind("touchend", function(event) {
	$('.testing').clear;
    $('.testing').text(endCoords.pageX+' '+startCoords.pageX + "Your touch on the axis: " + (endCoords.pageX-startCoords.pageX) + "x, " + (endCoords.pageY-startCoords.pageY) + "y");
	clearInterval(myVar);
	if (endCoords.pageX >= startCoords.pageX+50){
		fireEvent(document.getElementById("prm-hp_right"),'click');
		}
	else if (endCoords.pageX <= startCoords.pageX-50){
		fireEvent(document.getElementById("prm-hp_left"),'click');
		}
	else{}
});

function fireEvent(obj,evt)
	{
	  var fireOnThis = obj;
	  if( document.createEvent ) {
		var evObj = document.createEvent('MouseEvents');
		evObj.initEvent( evt, true, false );
		fireOnThis.dispatchEvent(evObj);
	  } else if( document.createEventObject ) {
		fireOnThis.fireEvent('on'+evt);
	  }
  }

//Updates the Dynamic Lead with a new selection from the menu
var updatedPrmNav = function(pos)
	{
		$('.slide').fadeOut('slow');
		$('.spromo .nav a').removeClass('nav_on');
		$('#'+pos).addClass("nav_on");
		$('#'+pos+'s').fadeIn('slow');
	}
//Updates the Dynamic Lead with a new selection after a click
var updatedPrmNavClick = function(pos)
	{
		$('.slide').fadeOut('slow');
		$('.spromo .nav a').removeClass('nav_on');
		$('#'+pos).addClass("nav_on");
		$('#'+pos+'s').fadeIn('slow');
		wmdPageLink('#'+pos+'s');
	}

});
