// JavaScript Document

//addLoadEvent(startSlides);
/*window.onload = startSlides;*/

// init vars
var slideCurrent = 1;
var factCurrent = 1
var slidesStatus = "play";
var timeoutId;


// function to start slideshow and timer
function startSlides() {

	//MULTIPLE FACTS New for the about page
   	buildControls();
}

//Fact Controls - NEW for the About page


function buildControls() {
	//Hide all facts and show firs
	hideFactsAll()
	var firstFact = document.getElementById("event1");
	firstFact.style.display = "block";
	// get control div
	var controlDiv = document.getElementById("events_controls");
	// build left arrow
	var previousArrow = "<a href=\"#\" onclick=\"factPrevious(); return false\"><img src=\"http://www.worldbank.org/wb/images/cache30/homepage/leftnav-pagination.png\"  border=\"0\" /></a> ";
	// get # of slides
	var factCount = factsGetCount();
	// build squares
	var controlButtons = "";
	for (var i = 0; i < factCount; i++) {
		controlButtons = controlButtons + "<a href=\"#\" onclick=\"showControl('" + (i + 1) + "'); return false\"><img src=\"http://www.worldbank.org/wb/images/cache30/homepage/feature-inactive.png\" width=\"6\" height=\"6\" border=\"0\" id=\"control" + (i + 1) + "\" name=\"fact_control\" /></a> "
	}
	// build right arrow
	var nextArrow = "<a href=\"#\" onclick=\"factNext(); return false\"><img src=\"http://www.worldbank.org/wb/images/homepage/rightnav-pagination.png\" border=\"0\" /></a>";
	// build arrows html
	var controlHtml = previousArrow + controlButtons + nextArrow;
	controlDiv.innerHTML = controlHtml;
	// change sq img
	changeCircle(1);
}


// function to go to next slide
function factNext() {
	// get number of slides	
	var slidesCount = factsGetCount();
	// set slideCurrent
	if (factCurrent >= slidesCount) {
		factCurrent = 1;
	} else {
		factCurrent++;
	}
	// hide all slides
	hideFactsAll();
	// show current slide
	var slideCurrentName = "event" + factCurrent;
	var slideToShow = document.getElementById(slideCurrentName);
	slideToShow.style.display = "block";	
	// change sq img
	changeCircle(factCurrent);	
}


// function to go to previous slide
function factPrevious() {
	// get number of slides	
	var slidesCount = factsGetCount();
	// set factCurrent
	if (factCurrent <= 1) {
		factCurrent = slidesCount;
	} else {
		factCurrent--;
	}
	// hide all slides
	hideFactsAll();
	// show current slide
	var slideCurrentName = "event" + factCurrent;
	var slideToShow = document.getElementById(slideCurrentName);
	slideToShow.style.display = "block";	
	// change sq img
	changeCircle(factCurrent);	
}


// function to show slide when square clicked
function showControl(fact) {
	// hide all slides
	hideFactsAll();
	// show new slide
	var slideName = "event" + fact;
	var slideToShow = document.getElementById(slideName);
	slideToShow.style.display = "block";	
	// set factCurrent
	factCurrent = fact;
	// change sq img
	changeCircle(fact);
}



// function to get slide count
function factsGetCount() {
	// get number of slides	
	var slidesWrapper = document.getElementById("events_carousel");
	var slideDivs = slidesWrapper.getElementsByTagName("div");
	var slidesCount = 0;
	for (var i = 0; i < slideDivs.length; i++) {
		var className = slideDivs[i].getAttribute("name");
		if (className == "events") {
			slidesCount++;
		}
	}
	return slidesCount;
}



// function to hide all slides
function hideFactsAll() {
	var slidesWrapper = document.getElementById("events_carousel");
	//alert(slidesWrapper);
	var slideDivs = slidesWrapper.getElementsByTagName("div");
	for (var j = 0; j < slideDivs.length; j++) {
		var className = slideDivs[j].getAttribute("name");
		if (className == "events") {
			slideDivs[j].style.display = "none";
		}
	}
}



// function to chage square graphic from open to closed for current slide
function changeCircle(sqId) {
	// set all squares to open	
	var slidesWrapper = document.getElementById("events_controls");
	var sqImgs = slidesWrapper.getElementsByTagName("img");
	for (var i = 0; i < sqImgs.length; i++) {
		var className = sqImgs[i].getAttribute("name");
		if (className == "fact_control") {
			sqImgs[i].src = "http://www.worldbank.org/wb/images/homepage/feature-inactive.png";
		}
	}
	// set current sq to closed
	var currentCircleName = "control" + sqId;
	var currentCircle = document.getElementById(currentCircleName);
	currentCircle.src = "http://www.worldbank.org/wb/images/homepage/events-active.png";
}





