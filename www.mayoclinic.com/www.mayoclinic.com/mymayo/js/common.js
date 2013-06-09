$(document).ready(function(){		
	$('#w_alerts').hide();
	
	var PAGE_DOMAIN = '';
	var useURL = '';
	var pageURL = window.location.href;
	var medProfSub = document.getElementById('sub_l_medprofessionals').getElementsByTagName("a");	
	
	PAGE_DOMAIN = document.domain;
		
	if(PAGE_DOMAIN == "www.mayoclinic.org" || PAGE_DOMAIN == "dotorgdev.mayo.edu"){
		useURL = "/rss/my-mayo-web-experience-news.xml";
	}else if (PAGE_DOMAIN == "wwwdev.mayo.edu"){
		useURL = "http://wwwdev.mayo.edu/grabRSS.cfm";
	}else if (PAGE_DOMAIN == "www.mayo.edu"){
		useURL = "http://www.mayo.edu/grabRSS.cfm";
	}else if (PAGE_DOMAIN == "paweb.mayo.edu"){
		useURL = "./grabRSS.cfm";
	}else if (PAGE_DOMAIN.indexOf("mayoclinic.com") != -1){
		useURL = "http://" + PAGE_DOMAIN + "/mymayo/cf/grabRSS.cfm";
	}
	
	$.ajax({
		type: "GET",
		url: useURL,
		dataType: "xml",
		success: parseXml
	});	
	
	function parseXml(xml)
	{	
		var linkTitle = '';
		if($(xml).find("item").length != 0){
			$('#w_alerts').show();
			
			$(xml).find("item").each(function()
			{
				linkTitle = $(this).find("title").text();
				$("#alerts div").append("<a href='" + $(this).find("link").text() + "' onClick=\"ntptEventTag('ev=external-link&evDetail=" + escape(linkTitle) + "&location=news-feed');\">" + linkTitle + "</a>");
			});	
			
			$('#alerts div')
				.cycle({
					fx: 'fade', speed: 500, timeout: 6000, pause:   1
			});					
		}
	}
	

	
	function ChooseImage() {
		var story=[];

		// NOTE: When adding stories, always add the [onClick] token before the > in the href.  This is so the Unica tagging can be added - see below
	
		story[1]='<strong>Kim Loving</strong> from Florida found her answer at Mayo Clinic. <a href="http://www.mayoclinic.org/myanswer/kim.html" [onClick]>Read her story.</a>';
		story[2]='<strong>Wain McFarlane</strong> from Minnesota found his answer at Mayo Clinic. <a href="http://sharing.mayoclinic.org/2012/12/09/an-upbeat-attitude-and-a-brisk-tempo-keep-this-musician-playing/" [onClick]>Read his story.</a>';
		story[3]='<strong>Benny Andujar</strong> from Florida found his answer at Mayo Clinic. <a href="http://sharing.mayoclinic.org/2011/06/07/early-detection-key-for-treatment-of-barretts-esophagus/" [onClick]>Read his story.</a>';		
		story[4]='<strong>Caitlyn Potter</strong> from Arizona found her answer at Mayo Clinic. <a href="http://sharing.mayoclinic.org/2011/06/21/melanoma-can-happen-to-anyone/" [onClick]>Read her story.</a>';
		story[5]='<strong>Ellyn Repsher</strong> from Florida found her answer at Mayo Clinic. <a href="http://www.mayoclinic.org/publications/pdfs/sharing-1209-fl.pdf" [onClick]>Read her story.</a>';
		story[6]='<strong>Kim Loving</strong> from Florida found her answer at Mayo Clinic. <a href="http://www.mayoclinic.org/myanswer/kim.html" [onClick]>Read her story.</a>';
		story[7]='<strong>Kobe Giesen</strong> from Minnesota found his answer at Mayo Clinic. <a href="http://www.mayoclinic.org/mcitems/mc5500-mc5599/mc5582-1208.pdf" [onClick]>Read his story.</a>';
		story[8]='Mayo Clinic at your fingertips - wherever you go. <a href="http://www.mayoclinic.org/mayo-apps/index.html">Download the free patient app.</a>';
		story[9]='Leading accreditors rank Mayo Clinic highly most often. <a href=" http://www.mayoclinic.org/quality/rankings.html" [onClick]>Read the full story.</a>';

		var pics="9"; //*** Number of pictures ***
		var num;
		num = (Math.floor(Math.random() * pics)) + 1;
        $('#photo').addClass('photo' + num);
		
		// Add Unica Tagging the link
		//if($("#photo").hasClass("photo12")){	
                if(num > 9 && num < 20){
			var onC = " onclick=\"ntptEventTag('ev=external-link&evDetail=give-now&location=middle-of-page');\""
		}
		else {
			var onC = " onclick=\"ntptEventTag('ev=internal-link&evDetail=patient-stories&location=middle-of-page');\""
		}
		var theStory = story[num];
		theStory = theStory.replace('[onClick]',onC);

		$('.patientstory').html(theStory);

	}
	
	ChooseImage();	
	
	for (var i = 0; i < medProfSub.length-2; i++) {
		if (pageURL == medProfSub[i].getAttribute("href") || pageURL == 'http://'+PAGE_DOMAIN+'/medicalprofs/'){
			$('#l_patientcare').removeClass('on');
			$('#l_medprofessionals').addClass('on');
			break;
		}
	}
});