var width = window.innerWidth || document.documentElement.clientWidth;
if(width > 600) {
	$(document).ready(function(){
		$(".world li").each(function(){
			var list = $(this);
			var url = $(this).children('a').attr('href');
			var path = $(this).attr("class");
			if (path != 'view-all-dests'){
				$.getJSON('/support/miniguides/destinations/' + path + '.json', function(data) {
					var items = [];
					$.each(data, function(key, val) {
						items.push('<li><a href="' + val.url + '">' + val.name + '</a></li>');
    					if (items.length == 8) {
    						items.push('<li>&nbsp;</li></ul><ul>');
    					} else if (items.length == 17) {
    						return false;
    					}
  					});
  					$('<ul/>', {
  						'class': 'top-dests',
    					html: items.join('')
  					}).appendTo(list).prepend('<h2>Top Destinations</h2>').children('ul').append('<li class="view-all"><a href="' + url + '">View All &raquo;</a></li>');
  					$(list).children("a").append('<span></span>');
				});
				$(list).children("a").on('click',function(){
					$(".world li").children("a").removeClass("active");
					if ($(this).next("ul").is(':hidden')) {
						$(".world li").children("ul").css("display","none");
						$(this).addClass("active").next("ul").css("display","block");
					} else {
						$(this).next("ul").css("display","none");
						$(this).removeClass("active");
					}
					return false;
				});
			}
		});
	});
	

	$(".sub-nav > a").click(function(){
		if ($(this).parent(".sub-nav").children("div").is(':hidden')) {
			$(".sub-nav,.sub-nav-new").removeClass("expanded");
			$(".sub-nav,.sub-nav-new").children("div").css("display","none");
			$(".top-dests").css("display","none");
			$(".world li").children("a").removeClass("active");
			$(this).parent(".sub-nav").addClass("expanded");
			$(this).parent(".sub-nav").children("div").css("display","block").children("ul").css("display","block");
		} else {
			$(this).parent(".sub-nav").children("div").css("display","none");
			$(this).parent(".sub-nav").removeClass("expanded");
		}
		return false;
	});
	$(".sub-nav-new > a").click(function(){
		if ($(this).parent(".sub-nav-new").children("div").is(':hidden')) {
			$(".sub-nav,.sub-nav-new").removeClass("expanded");
			$(".sub-nav,.sub-nav-new").children("div").css("display","none");
			$(".top-dests").css("display","none");
			$(".world li").children("a").removeClass("active");
			$(this).parent(".sub-nav-new").addClass("expanded");
			$(this).parent(".sub-nav-new").children("div").css("display","block").children("ul").css("display","block");
		} else {
			$(this).parent(".sub-nav-new").children("div").css("display","none");
			$(this).parent(".sub-nav-new").removeClass("expanded");
		}
		return false;
	});
} 
