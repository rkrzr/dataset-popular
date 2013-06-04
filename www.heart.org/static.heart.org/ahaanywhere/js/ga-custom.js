//window.debugGA = true; // Uncomment and set to true to enable event tracking debugging in the javascript console

function tryLog(msg) {
	if (window.debugGA == true && typeof(console) === "object" && typeof(console.log) != "undefined") {	
		console.log(msg);
	}
}

function trackPage(url) {
	tryLog("page: " + url);
	_gaq.push(['_trackPageview',url]);
}

function trackEvent(category,action,label) {
	tryLog("event: " + category + ":" + action + ":" + label);
	_gaq.push(['_trackEvent', category, action, label]);
}

function trackEventValue(category,action,label,value) {
	tryLog("event: " + category + ":" + action + ":" + label + ":" + value);
	_gaq.push(['_trackEvent', category, action, label, value]);
}

function evaluateFormExit() {
	var eventCat = window.g_formSubmitted ? "form_submit" : "form_abandon";
	var completionRatio = window.g_formChangeCount/window.g_formFieldCount * 100;
	trackEventValue(eventCat,window.g_mostRecentChange,document.location.pathname + document.location.search,completionRatio);
}

$(document).ready(function(){

	var $form = $("#wrapper form:first");
	var $formInputs = $form.find(":input").not(":submit");
	var $formSize = $formInputs.size();

	if($formSize > 1) {
		$form.bind("submit",function() {
			window.g_formSubmitted = true;
		});
		window.g_formFieldCount = $formSize;
		window.g_formChangeCount = 0;
		window.onbeforeunload = evaluateFormExit;
	};


	$("ul.ui-tabs-nav li a").one('click', function() {
		var label = $.trim($(this).text());
		var widgetName = $(this).closest(".ui-tabs").attr("id");
		trackEvent('tab_click', widgetName + "/" + label, document.location.pathname + document.location.search);
	});

	$(".ui-accordion h3 a").one('click', function() {
		var label = $.trim( $(this).text() );
		var widgetName = $.trim( $(this).closest(".widgets_container_article").find(".widget_title").text() );
		trackEvent('expandable_click', widgetName + "/" + label, document.location.pathname + document.location.search);
	});
		
	$("#wrapper form :input").one("change",function() {
		trackEvent('form_change', this.form.name + "/" + this.name, document.location.pathname + document.location.search);
		window.g_formChangeCount = window.g_formChangeCount ? (window.g_formChangeCount + 1) : 1;
		window.g_mostRecentChange = this.form.name + "/" + this.name;
	});
	
	$(document).bind('cbox_complete', function() {
		var elem = $.fn.colorbox.element().get(0);
		trackEvent('colorbox_load', elem.href.replace(/^(ht|f)tps?:\/\//i,""), document.location.pathname + document.location.search);
	});
	
	$("a").each(function(){

		if (this.protocol == "mailto:") {
			$(this).click(function() {
				trackPage("/mailto/"+this.href.substring(7)+"?page="+document.location);
			});

		} else if (this.hostname.length > 0 && this.hostname != location.hostname && this.href.length > 0) {
			$(this).click(function() {
				trackPage("/external/" + this.href.replace(/^(ht|f)tps?:\/\//i,"") );
			});

		} else if (this.pathname.search(/\.(?:doc|docx|xls|xlsx|ppt|pptx|vsd|vdx|pdf|exe|zip|wav|mp3|mov|mpg|avi|wmv|txt|prc|lrf)($|\&|\?)/) > -1) {
			$(this).click(function() {
				var filepath = this.pathname;
				if(filepath.charAt(0) != "/") {
					filepath = "/" + filepath;
				}
				trackPage(filepath);
			});

		}
	});
});