$(document).ready(function() {
if(window.innerWidth > 600) {
	$('#hp-slides').cycle({
		fx:'fade',
		speed:500,
//		timeout:0,
		pause:1,
		pager:'#fnav',
		pauseOnPagerHover:true,
		pagerAnchorBuilder:function(idx, slide){
			return '<li class="hp-slide-nav"><a href="#">' + (idx + 1) +'</a></li>';
		}
	});
}
	

$("#mapholder").mousemove(function(e){
	var offset = $(this).offset();var pos_x = e.pageX - offset.left;var pos_y = e.pageY - offset.top;
	if((pos_x<103) && (pos_y>95) && (pos_x>20)){$(this).attr("href","/world/south-america/").css("background-position","0 -990px");
	}else if((pos_x>105) && (pos_y>78) && (pos_x<174) && (pos_y<155)){$(this).attr("href","/world/africa-and-middle-east/").css("background-position","0 -1485px");
	}else if((pos_x>24) && (pos_y>7) && (pos_x<103) && (pos_y<60)){$(this).attr("href","/world/north-america/canada/").css("background-position","0 -1320px");
	}else if((pos_x>25) && (pos_y>61) && (pos_x<101) && (pos_y<83)){$(this).attr("href","/world/north-america/usa/").css("background-position","0 -495px");
	}else if((pos_x>5) && (pos_y>24) && (pos_x<25) && (pos_y<62)){$(this).attr("href","/world/north-america/usa/").css("background-position","0 -495px");
	}else if((pos_x>175) && (pos_y>114) && (pos_x<255) && (pos_y<154)){$(this).attr("href","/world/australia-and-the-pacific/").css("background-position","0 -825px");
	}else if((pos_x>36) && (pos_y>83) && (pos_x<58) && (pos_y<95)){$(this).attr("href","/world/mexico-and-central-america/").css("background-position","0 -660px");
	}else if((pos_x>59) && (pos_y>84) && (pos_x<77) && (pos_y<95)){$(this).attr("href","/world/caribbean/").css("background-position","0 -1155px");
	}else if((pos_x>102) && (pos_y>7) && (pos_x<210) && (pos_y<59)){$(this).attr("href","/world/europe/").css("background-position","0 -330px");
	}else if((pos_x>102) && (pos_y>7) && (pos_x<156) && (pos_y<78)){$(this).attr("href","/world/europe/").css("background-position","0 -330px");
	}else if((pos_x>156) && (pos_y>59) && (pos_x<255) && (pos_y<78)){$(this).attr("href","/world/asia/").css("background-position","0 -165px");
	}else if((pos_x>174) && (pos_y>77) && (pos_x<255) && (pos_y<113)){$(this).attr("href","/world/asia/").css("background-position","0 -165px");
	}else if((pos_x>210) && (pos_y<60) && (pos_x<255) && (pos_y>13)){$(this).attr("href","/world/asia/").css("background-position","0 -165px");
	}else{$(this).attr("href","/world/").css("background-position","0 0");
	}
});

	var field = $('input.hp-search-text');
	var fieldTip = $(field).attr('title');
	if(fieldTip) {$(field).val(fieldTip).addClass('fieldTip');		
		$(field).focus(function() {if($(this).val() == fieldTip) {$(this).val('').removeClass('fieldTip');}return false;});
		$(field).blur(function() {if($(this).val() == '') {$(this).val(fieldTip).addClass('fieldTip');}return false;});
		$('form#hp-search').submit(function(){if($(field).val() == fieldTip) {$(field).val('').removeClass('fieldTip');}});
	}

});
