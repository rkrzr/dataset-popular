( function() {
	var trueName = '';
	var copyrightDate = new Date();
	var styles = window.location.protocol + "//static.heart.org/css/footer.css";
	var footerHeaderDefault = 'Contact Us';
	footerHeaderDefault = (typeof window.footerHeader !== 'undefined') ? footerHeader : footerHeaderDefault;
		
		var newSS=document.createElement('link');
		newSS.rel='stylesheet';
		newSS.href=styles;
		document.getElementsByTagName("head")[0].insertBefore(newSS,document.getElementsByTagName("head")[0].firstChild);

	// build Contact Us
	var footerContactUsDefault = '<a href="http://www.heart.org/HEARTORG/General/Contact-Us_UCM_308813_Article.jsp" class="footerTitle">Contact Us</a><ul><li><span>Phone</span><ol><li>1-800-AHA-USA-1</li><li>1-800-242-8721</li><li>1-888-474-VIVE</li></ol></li><li><span>Address</span><ol><li>Dallas, TX 75231</li><li>or 1-888-478-7653</li></ol></li><li><a href="http://www.heart.org/HEARTORG/localization/chooseState.jsp">Local AHA Office</a></li></ul>';
	//for my aha lww fix

if (window.location.hostname.indexOf('pt.wkhealth.com') != -1) {
	} else {
	if (typeof window.footerContactUs !== 'undefined') {
		var footerHeaderDefaultCode;
		if (typeof window.footerHeader !== 'undefined') {
			footerHeaderDefaultCode = '<span class="footerTitle">'+footerHeaderDefault+'</span><ul>';			
		} else {
			footerHeaderDefaultCode = '<a href="http://www.heart.org/HEARTORG/General/Contact-Us_UCM_308813_Article.jsp" class="footerTitle">'+footerHeaderDefault+'</a><ul>';	
		}
		
		var footerContactUsV = '';
	 	for (var i in footerContactUs)
		{
			footerContactUsV += '<li><span>'+i+'</span><ol>';
			var cArray = new Array();
			cArray = footerContactUs[i];
			for (var j = 0;j<cArray.length;j++)
				{
					if (cArray[j].indexOf('Tx') != -1) {
						var newString = cArray[j].replace(/Tx/gi,"TX");
						footerContactUsV += '<li>'+newString+'</li>';
					} else {
						footerContactUsV += '<li>'+cArray[j]+'</li>';
					}
				}
			
			/*
if ((i.indexOf('Customer Service') != -1) || (i.indexOf('Phone') != -1)) {
				//add spanish phone number to all footers after client customization
				footerContactUsV += "<li>1-888-474-VIVE</li>";
			}
*/
			footerContactUsV += '</ol></li>';
		}
		footerContactUsDefault = footerHeaderDefaultCode + footerContactUsV;
	}
	}


	// tier1 navigation in the footer - 08/22/2012
	var footerNavDefault = '';
	footerNavDefault = (typeof window.footerNavHTML !== 'undefined') ? '<span class="footerNav">'+footerNavHTML+'</span>' : footerNavDefault;
	
	

	for (var i = 0; i < 16; i++) {
		trueName += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}
	window[trueName] = {};
	var $ = window[trueName];
	$.f = function() {
	return {
		init : function(target) {
		var theScripts = document.getElementsByTagName('SCRIPT');

		for (var i = 0; i < theScripts.length; i++) {
			if (theScripts[i].src.match(target)) {
				var footerVendorBrandTitleDefault = 'American Heart Association';
				footerVendorBrandTitleDefault = (typeof window.footerVendorBrandTitle !== 'undefined') ? footerVendorBrandTitle : footerVendorBrandTitleDefault;

				$.footerSeals = '';
				if ((typeof window.footerVendorBrandHref !== 'undefined') && (typeof window.footerVendorBrandImg !== 'undefined')) {
		  		$.footerSeals = '<a title="'+footerVendorBrandTitleDefault+'" href="'+footerVendorBrandHref+'"><img alt="'+footerVendorBrandTitleDefault+'" src="'+footerVendorBrandImg+'"/></a>';					
				 } else if (typeof window.footerSealHTML !== 'undefined')  {
					 
					 $.footerSeals = footerSealHTML;
				 }
					 
		
				$.w = document.createElement('DIV');
				$.w.id = 'footer_wrapper';
				
				$.w.innerHTML ='<div id="footer_buff"><div class="about"><a href="http://www.heart.org/HEARTORG/General/About-Us---American-Heart-Association_UCM_305422_SubHomePage.jsp" class="footerTitle">About Us</a><ul><li>Our mission is to build healthier lives, free of cardiovascular diseases and stroke. That single purpose drives all we do. The need for our work is beyond question. <a href="http://www.heart.org/HEARTORG/General/About-Us---American-Heart-Association_UCM_305422_SubHomePage.jsp" title="About American Heart Association" >More</a></li><li class="seals">'+$.footerSeals+'</li></ul></div><div class="causes"><a href="http://www.heart.org/HEARTORG/Causes/Causes_UCM_001128_SubHomePage.jsp" class="footerTitle">Our Causes</a><ul><li><a href="http://www.goredforwomen.org/" title="Go Red for Women" >Go Red For Women</a></li><li><a href="http://www.goredcorazon.org" title="Go Red Corazon">Go Red Por Tu Coraz&oacute;n</li><li><a href="http://www.heart.org/myheartmylife" title="My Heart My Life" >My Heart My Life</a></li><li><a href="http://www.powertoendstroke.org" title="Power to End Stroke" >Power To End Stroke</a></li></ul><br/><span class="footerTitle"><a href="http://www.heart.org/HEARTORG/Conditions/Conditions_UCM_305346_SubHomePage.jsp" title="Heart Attack, Stroke and Cardiac Arrest Warning Signs" >The Warning Signs</a></span><br/><span class="footerTitle"><a href="http://www.heart.org/HEARTORG/Conditions/The-Heart-and-Stroke-Encyclopedia_UCM_445688_SubHomePage.jsp" title="Browse the Heart and Stroke Encyclopedia">Heart and Stroke Encyclopedia</a></span></div><div class="sites"><span class="footerTitle">Our Sites</span><ul><li><a href="http://www.heart.org/HEARTORG" title="American Heart Association" >American Heart Association</a></li><li><a href="http://www.strokeassociation.org/STROKEORG" title="American Stroke Association" >American Stroke Association</a></li><li><a href="http://www.heart.org/mylifecheck/" title="link to My Life Check" >My Life Check</a></li><li><a href="http://www.heart360.org" title="link to Heart360" >Heart360</a></li><li><a href="http://www.everydaychoices.org/" title="Everyday Choices" >Everyday Choices</a></li><li><a href="http://my.americanheart.org/" title="My.AmericanHeart for Professionals" >My.AmericanHeart for Professionals</a></li><li><a href="http://www.scientificsessions.org/" title="Scientific Sessions" >Scientific Sessions</a></li><li><a href="http://www.strokeconference.org/" title="Stroke Conference" >Stroke Conference</a></li><li><a href="http://www.yourethecure.org" title="You\'re The Cure">You\'re The Cure</a></li><li><a href="http://www.heart.org/HEARTORG/General/Global-Strategies-Pages_UCM_312090_SubHomePage.jsp" title="Global Programs" >Global Programs</a></li><li><a href="http://www.shopheart.org" title="Shop Heart" >Shop Heart</a></li><li><a href="https://volunteer.heart.org/Pages/SiteHomePage.aspx" title="CEO Nancy Brown" >CEO Nancy Brown</a></li></ul></div><div class="contact">'+footerContactUsDefault+'</div><p class="legal">'+footerNavDefault+'<span><a href="http://www.heart.org/HEARTORG/General/Privacy-Policy_UCM_300371_Article.jsp" title="Privacy Policy" >Privacy Policy</a>  |  <a href="http://www.heart.org/HEARTORG/General/Copyright-Notice_UCM_300378_Article.jsp" title="Copyright & DMCA Info" >Copyright & DMCA Info</a>  |  <a href="http://www.heart.org/HEARTORG/General/Ethics-Policy_UCM_300430_Article.jsp" title="Ethics Policy" >Ethics Policy</a>  |  <a href="http://www.heart.org/HEARTORG/General/Conflict-of-Interest-Policy_UCM_300435_Article.jsp" title="Conflict of Interest Policy" >Conflict of Interest Policy</a>  |  <a href="http://www.heart.org/HEARTORG/General/American-Heart-Association-and-American-Stroke-Association-Linking-Policy_UCM_303551_Article.jsp" title="Linking Policy" >Linking Policy</a>  |  <a href="http://www.heart.org/HEARTORG/General/Life-at-the-American-Heart-Association_UCM_303457_SubHomePage.jsp" title="Diversity" >Diversity</a>  |  <a href="http://www.heart.org/HEARTORG/General/Careers_UCM_303455_SubHomePage.jsp" title="Careers" >Careers</a></span><span >&#169;'+copyrightDate.getFullYear()+' American Heart Association, Inc. All rights reserved. Unauthorized use prohibited.</span><span>The American Heart Association is a qualified 501(c)(3) tax-exempt organization.</span></p></div></div>';
				
				
				$.a = {};
				if (theScripts[i].innerHTML) {
					$.a = $.f.parseJson(theScripts[i].innerHTML);
				}
				if ($.a.err) {
					alert($.a.err);
				}
				theScripts[i].parentNode.insertBefore($.w, theScripts[i]);
				theScripts[i].parentNode.removeChild(theScripts[i]);
				break;
			 }
		}
		},
		parseJson : function(json) {
			this.parseJson.data = json;
			if ( typeof json !== 'string') {
				return {"err":"trying to parse a non-string JSON object"};
			}
			try {
				var f = Function(['var document,top,self,window,parent,Number,Date,Object,Function,',
				'Array,String,Math,RegExp,Image,ActiveXObject;',
				'return (' , json.replace(/<\!--.+-->/gim,'').replace(/\bfunction\b/g,'function') , ');'].join(''));
				return f();
			} catch (e) {
				return {"err":"trouble parsing JSON object " + e};
			}
		}
	};
	}();
	var thisScript = /^https?:\/\/[^\/]*heart.org\/aha_footer.js$/;
	if (typeof window.addEventListener !== 'undefined') {
		window.addEventListener('load', function() { $.f.init(thisScript); }, false);
	} else if (typeof window.attachEvent !== 'undefined') {
		window.attachEvent('onload', function() { $.f.init(thisScript); });
	}
})();
