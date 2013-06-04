/*  Javascript used throughout fodors.com
Compiled by Bryan Cronk
Created: 5/20/2010
Updated: 2/15/2013


Contains:
	Login Box
	Open External Links in a new window
	Placeholder Fix
	Exacttarget validation
	
----------------------------------------*/


/* Login Box */
	$(document).ready(function(){
		$("a.login-link").click(function(event){
			event.preventDefault();
			if ($(".logged-out").is(":hidden")) {
				$(".log-in").css("display","none");
				$(".close-link").css("display","block");
				$(".logged-out").slideDown("fast");
				return false;
			} else {
				$(".logged-out").slideUp("fast");
				return false;
			}
		});
		$("a.close-link").live('click',function(){
				console.log('Close Clicked');
				$(".close-link").css("display","none");
				$(".logged-out").slideUp("fast");
				$(".log-in").css("display","block");
				return false;
		});
		
	});
	
	
	
/* Open External Links in a new window */
$(document).ready(function() {
  $("a[href^='http:']:not([href*='" + window.location.host + "'])").each(
    function(){
      if(this.href.indexOf(location.hostname) == -1) {
        $(this).attr('target', '_blank');
      }
    }
  )
});

/* Placeholder Fix */
$(document).ready(function(){
	$("#EMAIL_FIELD,#ZIPCODE_FIELD,#search-q").each(function(){
		var ph = $(this).attr("placeholder");
		$(this).val(ph).addClass("placeholder");
		$(this).focus(function() {if($(this).val() == (ph)) {$(this).val('').removeClass('placeholder');}return false;});
		$(this).blur(function() {if($(this).val() == '') {$(this).val((ph)).addClass('placeholder');}return false;});
	});
});


/* Exacttarget validation */
function emvSubmit(f) {
	selectFields(f);
	setTimeStamps(f);
	checkAction(f);
	valid_email = null;
	age_check_cookie = null;
	isEmail(f);
	phoneFix(f);
	if(f.elements['month']) {
		thirteen = null;
		copa(f);
	} else {
		thirteen = 1;
	}
	if((!(valid_email)) || (!(thirteen))) {
		return false;
	} else {
		return true;
	}
}

function checkAction(f) {
	for (i=0;i<f.elements.length;i++) {
		if (f.elements[i].type == 'radio' && f.elements[i].name == 'action') {
			if(f.elements[i].value == 'unsubscribe' && f.elements[i].checked) {
				resetValues(f);
			}
		}
	}
}

function resetValues(f) {
	for (i=0;i<f.elements.length;i++) {
		if (((f.elements[i].type == 'hidden') && (f.elements[i].value == 1)) || ((f.elements[i].value == 1) && (f.elements[i].checked))) {
			f.elements[i].value = '0';
		}
	}
}

function setTimeStamps(f) {
	var eVar30 = '';
	d = new Date();
	local = d.getTime(); 
	local_offset = d.getTimezoneOffset() * 60000;
	// correct for difference in EmailVision time zone (Paris)
	//will need to update by hour at daylight savings
	romance = local + local_offset + 7200000;
	r = new Date(romance);
	YYYY = r.getFullYear();
	MM = r.getMonth() + 1;
	if(MM < 10) 
		MM = '0' + MM;
	DD = r.getDate();
	if(DD < 10) 
		DD = '0' + DD;
	hh = r.getHours();
	if(hh < 10) 
		hh = '0' + hh;
	mm = r.getMinutes();
	if(mm < 10) 
		mm = '0' + mm;
	ss = r.getSeconds();
	if(ss < 10) 
		ss = '0' + ss;
	var timestamp = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;

	for (i=0;i<f.elements.length;i++) {
		if ((f.elements[i].checked) || ((f.elements[i].value == '1') && (f.elements[i].type == 'hidden'))) {
			if(f.elements[i].name.match('_FIELD')) {
				eVar30 += f.elements[i].name + ',';
			}
			if (f.elements[i].name == 'SISTERHOOD_CENTRAL_NEWSLETTER_FIELD') {
					dt_unjoin = 'TS_SISTERHOOD_CENTRAL_NEWSLTR_FIELD';
				} else if (f.elements[i].name == 'NATE_THE_GREAT_CLASSROOM_CLUB') {
					dt_unjoin = 'TS_NATE_THE_GREAT_CLASS_CLUB';
				} else if (f.elements[i].name == 'RANDOM_KIDS_BOOKSELLERS_NEWS') {
					dt_unjoin = 'TS_RANDOM_KIDS_BKSELLER_NEWS';
				} else if (f.elements[i].name == 'MAGIC_TREEHOUSE_CLASSRM_CLUB') {
					dt_unjoin = 'TS_MAGIC_TREE_HOUSE_CLASS_CLUB';
				} else if (f.elements[i].name == 'DIGITAL_EBBOKS_APPS') {
					dt_unjoin = 'TS_DGT_EB_APPS';
				} else {
					dt_unjoin = 'TS_' + f.elements[i].name;
			}
			if(f.elements[dt_unjoin]) {
				f.elements[dt_unjoin].value = timestamp;
			}
		}
	}
	setEVar30(eVar30);
	if(f.elements['SUBSCRIBE_DATE_FIELD'])
		f.elements['SUBSCRIBE_DATE_FIELD'].value = timestamp;
}

function setEVar30(eVar) {
	var s=s_gi('ranhrollup');
	s.linkTrackVars="events,eVar19,eVar20,eVar21,eVar22,eVar23,eVar24,eVar25,eVar26,eVar30";
	s.linkTrackEvents="event9";
	s.events="event9";
	s.eVar30=eVar;
	s.tl(this,'o',eVar);
	return false;
}

function isEmail(f) {
	if(typeof String.prototype.trim !== 'function') {
	  String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g, ''); 
	  }
	}
	var emailfield = f.elements['EMAIL_FIELD'];
	emailAddressValue=emailfield.value.toLowerCase().trim();
	var countryTLDs=/^(ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$/;
	var gTLDs=/^(aero|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|jobs)$/;
	var basicAddress=/^(.+)@(.+)$/;
	var specialChars='\\(\\)><@,;:\\\\\\\"\\.\\[\\]';
	var validChars='\[^\\s'+specialChars+'\]';
	var validCharset='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\'-_.';
	var quotedUser='(\"[^\"]*\")';
	var atom=validChars+'+';
	var word='('+atom+'|'+quotedUser+')';
	var validUser=new RegExp('^'+word+'(\.'+word+')*$');
	var symDomain=new RegExp('^'+atom+'(\.'+atom+')*$');
	var matchArray=emailAddressValue.match(basicAddress);
		if(emailfield.value==''||emailfield==null) {
			alert('The Email address is missing,\nplease enter your email address.');
			emailfield.focus();
			return false;
		}
		if(matchArray==null) {
			alert('The Email address doesn\'t seem to be correct,\nplease check syntax.');
			emailfield.focus();
			return false;
		} else {
			var user=matchArray[1];
			var domain=matchArray[2];
			for(i=0;i<user.length;i++) {
				if(validCharset.indexOf(user.charAt(i))==-1) {
					alert('The Email address contains invalid characters,\nplease check the username.');
					emailfield.focus();
					return false;
				}
			}
		for(i=0;i<domain.length;i++) {
			if(validCharset.indexOf(domain.charAt(i))==-1) {
				alert('The Email address contains invalid characters,\nplease check the domain.');
				emailfield.focus();
				return false;
			}
		}
		if(user.match(validUser)==null) {
			alert('The Email address doesn\'t seem to be correct,\nplease check the username.');
			emailfield.focus();
			return false;
		}
		var atomPat=new RegExp('^'+atom+'$');
		var domArr=domain.split('.');
		var len=domArr.length;
		for(i=0;i<len;i++) {
			if(domArr[i].search(atomPat)==-1) {
				alert('The Email address doesn\'t seem to be correct,\nplease check the domain name.');
				emailfield.focus();
				return false;
			}
		}
		if((domArr[domArr.length-1].length==2)&&(domArr[domArr.length-1].search(countryTLDs)==-1)) {
			alert('The Email address doesn\'t seem to be correct,\nplease check domain suffix.');
			emailfield.focus();
			return false;
		}
		if((domArr[domArr.length-1].length>2)&&(domArr[domArr.length-1].search(gTLDs)==-1)) {
			alert('The Email address doesn\'t seem to be correct,\nplease check domain suffix.');
			emailfield.focus();
			return false;
		}
		if((domArr[domArr.length-1].length<2)||(domArr[domArr.length-1].length>6)) {
			alert('The Email address doesn\'t seem to be correct,\nplease check domain suffix.');
			emailfield.focus();
			return false;
		}
		if(len<2) {
			alert('The Email address doesn\'t seem to be correct,\nplease check missing hostname.');
			emailfield.focus();
			return false;
		}
	}
	f.elements['EMAIL_FIELD'].value = emailAddressValue;
	valid_email = 1;
}

function selectFields(f) {
	if (f.newsletter) {
		if (f.newsletter.value) {
			if (f.elements[f.newsletter.value]) {
				f.elements[f.newsletter.value].value = '1';
			}
		}
	}
}

function copa(f) {
	var age_check_email = f.elements['EMAIL_FIELD'].value;
	var young = "Sorry.... We are unable to send the newsletter at this time.";
    var select_year = f.year.options[f.year.selectedIndex].text;
    var select_month =  f.month.options[f.month.selectedIndex].value;
    var select_day = f.day.options[f.day.selectedIndex].text;

    var check_year, age_string, check_day, check_month;
    now = new Date();
	check_day = now.getDate();
	check_month = now.getMonth() + 1;

	var birth_day = select_day.length < 2 ? select_day = '0' + select_day.toString() : select_day;
	var birth_month = select_month.length < 2 ? select_month = '0' + select_month.toString() : select_month;
	var birth_date = birth_month + '/' + birth_day + '/' + select_year;
	if (f.elements['BIRTHDATE_FIELD']) {
		f.elements['BIRTHDATE_FIELD'].value = birth_date;
	}
    if (now.getFullYear) {
        check_year = now.getFullYear();
    } else {
    	check_year = now.getYear() + 1900;
    }
    age_string = check_year - select_year;

    if (age_string > 13) {
    } else if ((age_string == 13) && (select_month < check_month)) {
    } else if (((age_string == 13) && (select_month == check_month)) && (select_day <= check_day)) {
	} else {
		alert(young);
		setCookie('age_check_cookie',age_check_email,1);
        return false;
	}
	if (checkCookie(age_check_email)) {
		alert(young);
		return false;
	} 
	thirteen = 1;
}

function setCookie(c_name,value,expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ';path=/';
}

function getCookie(c_name) {
if (document.cookie.length > 0)
	{
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";",c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	} else {
		return null;
	}
}

function checkCookie(e) {
	age_check_cookie = getCookie('age_check_cookie');
	if (age_check_cookie != null && age_check_cookie != "")
		{
			return true;
		}
}

function phoneFix(f) {
	if(f.elements['PHONE_FIELD']) {
		var phone = f.elements['PHONE_FIELD'].value;
		f.elements['PHONE_FIELD'].value = phone.replace(/\D/g, '');
	}
}
