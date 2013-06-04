$(".slideshow_ul").css('display', 'none');
var titles = new Array();
var descs = new Array();
var images = new Array();
var links = new Array();
var current = 0;


var wrap_width = $("#slideshow_wrap").width();


$("#slideshow_wrap").append("<div id='slideshow'><div id='slide_container'></div></div>");

if(wrap_width <= 500){
	des_height = 275;
	setContainerHeight(des_height);
}

if (wrap_width > 500){
	des_height = 312;
	setContainerHeight(des_height);
}

$(".slide").each(function(a){
	titles.push($('.title', this).html());
	descs.push($('.desc', this).html());
	images.push($('.img', this).html());
	links.push($('.link', this));
});
$(".slideshow_ul").remove();

if (titles.length > 1){
createNav();
fixMargin();
}

createHolder(0);


var timer = setInterval("timed_rotate()", 6000);

function timed_rotate(){
	var counter_timer = getNext(current);
	createNextSlide(counter_timer);
	if (counter_timer == 0)
		stopTimer();
}

function stopTimer(){
	window.clearInterval(timer);
}

function createHolder(a){
	var html = "";	
	
	// check for video or img
	var type = '';
	var img = images[a];
	
	var title = titles[a];
	var desc = descs[a];
	var s_link = $('a', links[a])[0];
	
	html += "<div class='curr_slide'>";
	if (img != undefined){
		html += img;
		html += "<div class='slide_desc'><div class='slide_desc_in'><div class='slide_title'>"+title+"</div><div class='slide_subtitle'>"+desc+"</div></div></div>";
	}
	html += "</div>";
	$("#slide_container").append(html);
	resize_curr_slide(des_height);
}

function createNextSlide(a){
	changeNavImg();
	var next = "";
	var img = images[a];

	var desc = descs[a];
	var title = titles[a];
	var s_link = $('a', links[a])[0];
	
	if (img != undefined){
		next += img;
		next += "<div class='slide_desc'><div class='slide_desc_in'><div class='slide_title'>"+title+"</div><div class='slide_subtitle'>"+desc+"</div></div></div>";
	}
		
	$('.curr_slide').fadeTo(300, 0.0, function() {
		$('.curr_slide').html(next);
		resize_curr_slide(des_height);
		$('.curr_slide').fadeTo(300, 1.0, function() { 
		});
    });
	
	$("#prev_link").attr("href","javascript:createNextSlide(getPrev("+current+"))");
	$("#next_link").attr("href","javascript:createNextSlide(getNext("+current+"))");
	//$("#current").html(current+1);	
}


function getPrev(a)
{
	if (a == 0)
	{
		a = titles.length-1;
	}
	else
		a = a-1
	
	current = a;
	return a;
}


function getNext(a)
{
	if (a == titles.length-1)
	{
		a = 0;
	}
	else
		a = a+1
	
	current = a;
	return a;
}


function setContainerHeight(a)
{
	$("#slide_container").css("height", a+"px");
	$("#slide_container").css("overflow", "hidden");
	$("#slideshow").css("height", a+"px");
	$("img", ".curr_slide").css("height", a+"px");
	$(".curr_slide").css("height", a+"px");
	$("#curr_slide").css("overflow", "hidden");
}

function fixMargin()
{
	var val = $(".nav_wrap").css("bottom");
	var int_val = getPXval(val);
	int_val -= 10;
	$(".ul_nav").css("margin-bottom", "-"+int_val+"px");
	$(".ul_nav").css("margin-top", "0px");
	$(".ul_nav").css("margin-left", "0px");
	$(".ul_nav").css("margin-right", "0px");		
}

function resize_curr_slide(a)
{
	$(".curr_slide").css("height", a+"px");
	$("img", ".curr_slide").css("height", a+"px");
}

function getPXval(string)
{
	var temp_string = string;
	var loc = string.indexOf("px");
	temp_string = temp_string.substring(0, loc);
	var int_string = parseInt(temp_string);
	return int_string;
}

function createNav(){
	var html ="<ul class='ul_nav'>";
	for(i=0; i<titles.length; i++){
		var num = i + 1;
		var title = $("a", titles[i]);
		title = $(title)[0].innerHTML;
		//title = escape(title);
		title = title.replace(/'/g, "&quot;")
		html += "<li><a href='javascript:void(0);' onclick='setCurrent("+i+"); createNextSlide("+i+"); stopTimer();'><img src='http://www.fda.gov/ucm/groups/fdagov-public/@system/documents/image/img_fdagov_nav_"+i+"_a.png' alt='goto slide "+num+": "+title+"' /></a></li>";
	}
	html += "</ul>";
	$("#slideshow").append("<div class='nav_wrap'></div>");
	$(".nav_wrap").append(html);
	changeNavImg();
}

function changeNavImg()
{
	$("li", ".ul_nav").each(function(a){
		if(a != current)
			$("img", this).attr("src", "http://www.fda.gov/ucm/groups/fdagov-public/@system/documents/image/img_fdagov_nav_"+a+"_a.png");
		else
			$("img", this).attr("src", "http://www.fda.gov/ucm/groups/fdagov-public/@system/documents/image/img_fdagov_nav_"+a+"_b.png");
	});
}

function setCurrent(a)
{
	current = a;
	refocus();
}

function refocus()
{
	$(".curr_slide a").focus();
}