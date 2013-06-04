/*!
  * CPSC JS Utilities for use with jQuery 1.4.x and jQuery UI 1.8.x
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

(function ($) {
	$(document).ready(function () {

		// Fixing IE7 arrowed links
		if (jQuery.browser.msie) {
			if (parseInt(jQuery.browser.version) == 7) {
				$("a.ar, a.more").append("<img src='/static/images/arrow-orange-right.png' class='ie-inline-arrow' alt='' style='border: none !important'/>");
			}
		} // 
		$(".pagination a[disabled]").addClass("pagerButtonDisabled"); // pagination
		$("textarea").inputFocusToggle();
		$(".carousel").carousel();
		$(".mini-carousel").miniCarousel();
		$(".custom-dd").customDD();
		$('.rail-accordion ul#railAccordion').accordion();
		$(".message-rotator").slider();
		$(".nav li:last-child").addClass("last");
		$(".footer .links > li:eq(2)").addClass("col2");
		$(".report-wrap a.report").click(function () {
			var report_wrap = $(".report-wrap");

			report_wrap.find(".report-popup").fadeToggle();

			if (report_wrap.hasClass("active")) {
				report_wrap.removeClass("active");
			} else {
				report_wrap.addClass("active");
			}

			return false;
		});

		$(".nav > li").hover(
			function () {
				$(this).addClass("hover");
			},
			function () {
				$(this).removeClass("hover");
			});


		// Bottom Aligning the subnav
		if (jQuery.browser.msie) {
			if (parseInt(jQuery.browser.version) == 7) {
				var subnav_height = $(".sub-nav ul").height();
				$(".sub-nav ul li").height(subnav_height);
				$(".sub-nav ul li a").css({ "position": "absolute", "bottom": 0 })
			}
		}

		if ($("#carousel .slides").length) {

			var slideshow = $("#carousel .slides").cycle({
				fx: "scrollHorz",
				speed: "slow",
				timeout: 8000,
				pager: "#carousel .pagination ul",
				pagerAnchorBuilder: function (idx, slide) {
					// return sel string for existing anchor
					return '#carousel .pagination ul li:eq(' + (idx) + ') a';
				}
			});
		}

		/* External Link Interception window 

		$("#linkbuttons").find("#CancelButton").click(function () {
			$("#linkinterception").fadeOut();
			$("#linkinterception-content").fadeOut();

			return false;
		});

		$("a").live('click', function () {

			var clicked = $(this);
			var url = clicked.attr("href");
			if (url.indexOf(window.location.hostname) == -1 && url.indexOf("http") != -1 && url.indexOf(".gov") == -1 && url.indexOf("@") == -1 && (url.indexOf("#") == -1 || url.indexOf("#") > 1)) {
				var top = $(window).scrollTop() + 100;
				$("#linkinterception-content").css({ "top": top });
				$("#linkinterception").show();
				$("#linkinterception-content").show();
				$("#linkbuttons").find("#OkButton").bind("click", function () { window.location = url; }); // .attr("onclick", "window.location.replace('" + url + "');")


				return false;
			}
		});

*/

		$("#carousel").find("a.toggle").click(function () {
			var clicked = $(this);
			if (clicked.hasClass("pause")) {
				clicked.removeClass("pause").addClass("play");
				clicked.text("Play");
				slideshow.cycle("pause");
			} else {
				clicked.removeClass("play").addClass("pause");
				clicked.text("Pause");
				slideshow.cycle("resume");
			}
			return false;
		});

		$("#tabs > div").each(function () {

			var tab = $(this);
			var tab_pagin = $(this).find(".tab-pagination");
			var tab_wrap = tab.find("div.tab-wrap")
			tab_wrap.cycle({
				fx: "scrollVert",
				speed: "slow",
				timeout: 0,
				next: tab.find("a.next"),
				prev: tab.find("a.prev")
			});
		});

		$(".search-filters .filter, .sidebar .calendar-date").accordionList();

		$(".video-thumb").addPlayOverlay();

		$(this).find(".subscribe-email").click(function () {
			$("#SubscribeEmail").show();
			$("#fade").show();
		});

		var parentDocument = $("#SubscribeEmail", top.document);
		var overlay = $("#fade", top.document);
		$(parentDocument).find("#Subscribe").contents().find("a.close-subscription").click(function () {
			$(parentDocument).hide();
			$(overlay).hide();
		});

		$("#OkButton").click(function () {
			$(parentDocument).hide();
			$(overlay).hide();

			$(this).find(".subscribe-email").click(function () {
				$("#SubscribeEmail").show();
				$("#fade").show();
			});
		});

		$(document).keyup(function (e) {
			if (e.keyCode == 27) {
				$(parentDocument).hide();
				$(overlay).hide();
			}
		});

		$("#opinionButton").click(function () {
			var opinion = $("#opinion").val();
			if (opinion != '') {
				window.location = "http://www.cpsc.gov/LIBRARY/FOIA/advisory/" + opinion + ".pdf";
			}
		});

		$(".messages .message-list").each(function () {
			$(this).cycle({
				fx: "scrollHorz",
				speed: "slow",
				timeout: 0,
				next: $(this).parent().find("a.next"),
				prev: $(this).parent().find("a.prev")
			});
		});

		$("a.init-popup").click(function () {
			if ($(this).parent().attr('class') == "col-list left-col") {
				$("#main-categories").show();
				$("#middle-categories").hide();
				$("#right-categories").hide()
			}
			if ($(this).parent().attr('class') == "col-list middle-col") {
				$("#middle-categories").show();
				$("#main-categories").hide();
				$("#right-categories").hide()
			}
			if ($(this).parent().attr('class') == "col-list right-col") {
				$("#right-categories").show();
				$("#main-categories").hide();
				$("#middle-categories").hide();
			}
			$(".modal-background").first().fadeIn();
			$(".modal").first().centerInClient().fadeIn();

			return false;
		});

		$(".modal .close").click(function () {
			$(this).parents(".modal").fadeOut();
			$(".modal-background").fadeOut();

			return false;
		});

		$(".state-header .view-map").click(function () {
			$(this).parent().find(".dd-modal").fadeIn();
			return false;
		});

		$(".dd-modal .close").click(function () {
			$(this).parents(".dd-modal").fadeOut();
			return false;
		});

		$(".year-select").customCheckboxes();

		$("ul.regulations li:nth-child(even)").addClass("alt");
		$("ul.category-list li:nth-child(3n)").addClass("alt");

		// Contact Information Dropdown 
		var id = $(this).find("#qa-selector option:selected").val(); // used in dropdown on QA - About/ Contact Page
		if (id != '') {
			$(".qa-content").find("#" + id).parent().show();
		}
		$(this).find("#qa-selector").change(function () {
			id = $(this).val();
			// first reset
			$(".qa-content ul li").each(function (i) {
				this.style.display = "none";
			});
			if (id != '') {
				$(".qa-content").find("#" + id).parent().fadeIn();
			}
		});
		// END Contact Information Dropdown 

		// Font Resizing	
		$("#font_small").click(function () {
			$(".cols, .sidebar").css("font-size", "75%");
			return false;
		});
		$("#font_medium").click(function () {
			$(".cols, .sidebar").css("font-size", "100%");
			return false;
		});

		$("#font_large").click(function () {
			$(".cols, .sidebar").css("font-size", "125%");
			return false;
		});

		// State Information
		$(".state-content .state:nth-child(even)").addClass("f-right");

		// Fixing grid alignment
		$(".search-recalls .grid-list li:nth-child(3n+1)").css("clear", "left");

		$("#opinion").keyup(function (event) {
			if (event.keyCode == 13) {
				$("#opinionButton").click();
			}
		});

	});

	$(window).load(function () {

		$("#tabs").tabs();
		$("a[rel=product-photos]").colorbox();

	});

	$.fn.customCheckboxes = function () {

		$(this).find("button").each(function () {

			var trigger = $(this);
			var input = trigger.parent().find("input");

			trigger.click(function () {
				if ($(this).hasClass("active")) {
					$(this).removeClass("active");
					input.removeAttr("checked");
				} else {
					$(this).addClass("active");
					input.attr("checked", "checked");
				}

				return false;

			});

		});

	}



	$.fn.addPlayOverlay = function () {

		var overlay = '<img src="../images/play-overlay.png" alt="play-overlay" width="59" height="59" class="play-overlay" />';
		$(this).each(function () {

			var elem = $(this);
			elem.css({ "height": elem.height(), "width": elem.width() });
			elem.append(overlay);



		});

	}

	$.fn.accordionList = function () {
		$(this).each(function () {

			var container = $(this);
			var element = container.find("h4").next();

			container.find("h4 a").click(function () {

				if (container.hasClass("active")) {
					element.slideUp("slow", function () {
						container.removeClass("active");
					});
				} else {
					element.slideDown("slow", function () {
						container.addClass("active");
					});

				}



				return false;
			});

		});

	}

	/*!
	* Featured Carousel using the $ "Cycle" Plugin
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$.fn.carousel =

		function () {
			if ($(this).length > 0) {

				// Build Pagination				
				var pagin = $(this).find(".pagination");
				var slides = $(this).find("ul.slides");
				var items = slides.find("li");
				var num = items.length;
				var li = null;

				// Loop over number of "slides", create a corresponding link for pagination
				for (var i = 0; i < num; i++) {
					li = $("<li><a href=\"#\"> Slide " + (i + 1) + "</a></li>");
					pagin.append(li);
				}


				/** slides Cycle plugin */
				slides.cycle({
					fx: "scrollHorz",
					speed: "slow",
					timeout: 8000,
					pager: ".carousel .pagination",
					pagerAnchorBuilder: function (idx, slide) {
						// return sel string for existing anchor
						return '.carousel .pagination li:eq(' + (idx) + ') a';
					}
				});

				$(this).find("a.toggle").click(function () {

					var clicked = $(this);
					if (clicked.hasClass("pause")) {
						clicked.removeClass("pause").addClass("play");
						clicked.text("Play");
						slides.cycle("pause");
					} else {
						clicked.removeClass("play").addClass("pause");
						clicked.text("Pause");
						slides.cycle("resume");
					}

					return false;
				});

			}
		} // end initCarousel


	/*!
	* Mini Carousel using the $ "Cycle" Plugin
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$.fn.miniCarousel =

		function () {
			if ($(this).length > 0) {

				/** slides Cycle plugin */
				$(this).find("ul.slides").cycle({
					fx: "scrollHorz",
					speed: "slow",
					timeout: 0,
					next: '#pnext',
					prev: '#pprevious'
				});
			}
		} // end miniCarousel




	/*!
	* Horizontal Slider using the $ "Cycle" Plugin
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$.fn.slider =

		function () {
			if ($(this).length > 0) {

				// Cache slider element
				var slider = $(this);
				var slides = slider.find("ul");

				// If there is only one alert message, add class for additional styles
				if (slides.find("li").length == 1) {
					slider.addClass("single-message");
				} else {
					slider.removeClass("single-message");
				}

				/** Initiaing Cycle plugin */
				slides.cycle({
					fx: "scrollHorz",
					speed: "slow",
					timeout: 0,
					prev: ".message-rotator .prev",
					next: ".message-rotator .next"
				});

			}
		}


	/*!
	* Custom Drop Down Select box: Creates a custom styled dropdown box that will still function in forms
	*
	* All that is required is a normal select element.  This function hides the select dropdown and creates
	* an unordered list (UL) of options.  Events are attached to the new UL so any change the user makes
	* to the UL will be reflected in the hidden dropdown. This way forms will still handle the dropdown.  
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$.fn.customDD =

	function () {
		if ($(this).length > 0) {
			$(this).each(function () {

				var parent = $(this);
				var select = parent.find("select");
				var title = $("<h5><a href='javascript:void(0)'></a></h5>");
				var li = $("<li></li>");
				var a = $("<a></a>");
				var opt = null;
				var custom_ul = $("<ul></ul>");

				title.find("a").text(select.find(":selected").text());
				parent.append(title);

				// Create UL from select dropdown
				select.children().each(function () {

					opt = $(this);
					a.attr({ "name": opt.val(), "href": "javascript:void(0)" }).html(opt.html());
					custom_ul.append(li.append(a));

					// Reset 
					a = $("<a></a>");
					li = $("<li></li>");
				});

				custom_ul.insertAfter(parent.find("h5"));
				custom_ul = parent.find("ul")


				// Attach event to drop down button
				title.click(function () {
					var act_ul = $(this).next("ul");
					act_ul.parents(".custom-dd").toggleClass("active");
					act_ul.slideToggle("fast");


					return false;
				});

				// Set hidden dropdown and dropdown title
				custom_ul.find("li a").click(function () {
					var clicked = $(this);

					// Find the correspoding option in the hidden select and set to selected
					// Change the title text to the clicked elements
					select.find("option[value=" + clicked.attr("name") + "]").attr("selected", "true");
					title.find("a").text(clicked.text());
					custom_ul.slideUp(function () {
						custom_ul.parents(".custom-dd").removeClass("active");
					});

				});

				$(document).click(function () {
					custom_ul.slideUp(function () {
						custom_ul.parents(".custom-dd").removeClass("active");
					});
				});
			});
		}
	}

	/*!
	* Accordion Expand/Collapse Toggle
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$.fn.accordion =
		function () {

			$(this).find("div").each(function () {
				$(this).css("height", $(this).height()).hide();
			});

			$(this).find("a.arrow").click(
				function () {

					var clicked = $(this); // Cache clicked
					var parent_li = clicked.parents("li"); // Gets immediate LI parent

					if (parent_li.hasClass("active")) {
						parent_li.removeClass("active");
					} else {
						parent_li.addClass("active");
					}

					parent_li.find("div").slideToggle();

					return false; // prevent default action			
				}
			);


		}

	/*!
	*
	* Input Toggle Plugin
	*
	* This plugin handles text input blur/focus auto remove/addition
	*   of default text.
	*
	* On focus - default text is removed
	* On blur  - default text is added
	*
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$.fn.inputFocusToggle =

		function () {
			//if ($swx(this).length) { // Make sure element exists
			$(this).each(function () {

				// Cache "this"
				var input_field = $(this);

				// Grab default text	
				var default_text = input_field.val();

				// Check if default text exists (this is used to skip over input fields in forms)
				if (default_text != "") {

					// Removes text on focus
					input_field.focus(function () {
						if (input_field.val() == default_text) {
							input_field.val("");
						}
					});

					// Inserts default text on blur
					input_field.blur(function () {
						if (input_field.val() == "") {
							input_field.val(default_text);
						}
					});
				}
			});
			//}
		} // end $.fn.inputToggle 

	$.fn.centerInClient = function (options) {
		/// <summary>Centers the selected items in the browser window. Takes into account scroll position.
		/// Ideally the selected set should only match a single element.
		/// </summary>    
		/// <param name="fn" type="Function">Optional function called when centering is complete. Passed DOM element as parameter</param>    
		/// <param name="forceAbsolute" type="Boolean">if true forces the element to be removed from the document flow 
		///  and attached to the body element to ensure proper absolute positioning. 
		/// Be aware that this may cause ID hierachy for CSS styles to be affected.
		/// </param>
		/// <returns type="jQuery" />
		var opt = { forceAbsolute: false,
			container: window,    // selector of element to center in
			completeHandler: null
		};
		$.extend(opt, options);

		return this.each(function (i) {
			var el = $(this);
			var jWin = $(opt.container);
			var isWin = opt.container == window;

			// force to the top of document to ENSURE that 
			// document absolute positioning is available
			if (opt.forceAbsolute) {
				if (isWin)
					el.remove().appendTo("body");
				else
					el.remove().appendTo(jWin.get(0));
			}

			// have to make absolute
			el.css("position", "absolute");

			// height is off a bit so fudge it
			var heightFudge = isWin ? 2.0 : 1.8;

			var x = (isWin ? jWin.width() : jWin.outerWidth()) / 2 - el.outerWidth() / 2;
			var y = (isWin ? jWin.height() : jWin.outerHeight()) / heightFudge - el.outerHeight() / 2;

			el.css("left", x + jWin.scrollLeft());
			el.css("top", y + jWin.scrollTop());

			// if specified make callback and pass element
			if (opt.completeHandler)
				opt.completeHandler(this);
		});
	}
})(jQuery);


function changeTextFromDropdown(dropdown) {

    $("div[id*='selected_content']").addClass('hidden');
    $("#selected_content" + dropdown.selectedIndex).removeClass('hidden');
}