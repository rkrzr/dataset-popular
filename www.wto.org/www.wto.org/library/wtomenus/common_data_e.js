// Common data for English pages
// initialise global variables
	var bnr_search_fields = "<input type=\"hidden\" name=\"site\" value=\"English_website\"/><input type=\"hidden\" name=\"client\" value=\"english_frontend\"/><input type=\"hidden\" name=\"proxystylesheet\" value=\"english_frontend\"/>";
	var bnr_search_value = "Search: ";
	var bnr_search_callout = ["Enter search text here", "Click here to launch the search"];
	var bnr_menu_text = ["", "Home", "About&nbsp;WTO", "News&nbsp;and<br>events", "Trade&nbsp;topics", "WTO membership", "Documents and<br>resources", "WTO and you"];
	var bnr_menu_link = ["", "/index.htm", "/english/thewto_e/thewto_e.htm", "/english/news_e/news_e.htm", "/english/tratop_e/tratop_e.htm", "/english/thewto_e/whatis_e/tif_e/org6_e.htm", "/english/res_e/res_e.htm", "/english/forums_e/forums_e.htm"];
	var footer_text = "The World Trade Organization (WTO) deals with the global rules of trade between nations. Its main function is to ensure that trade flows as smoothly, predictably and freely as possible.";
	var footer_copy_text = "World Trade Organization";
	var footer_copy_link = "/english/info_e/cont_e.htm#Copyright";
	var footer_disclaimer_text = "Disclaimer";
	var footer_disclaimer_link = "/english/info_e/disclaimer_e.htm";
	var footer_key = "Key areas of the website";
	var footer_follow = "Follow WTO";
	var footer_key_titles = ["Who we are", "What we do", "How we are structured", "Our global membership", "Annual report", "Legal texts"];
	var footer_key_links = ["/english/thewto_e/whatis_e/who_we_are_e.htm", "/english/thewto_e/whatis_e/what_we_do_e.htm", "/english/thewto_e/whatis_e/tif_e/org2_e.htm", "/english/thewto_e/whatis_e/tif_e/org6_e.htm", "/english/res_e/reser_e/annual_report_e.htm", "/english/docs_e/legal_e/legal_e.htm"];
	var footer_follow_titles = ["Email updates", "RSS newsfeeds", "Facebook", "YouTube", "Twitter", "flickr"];
	var footer_follow_links = ["http://icd.wto.org/member/register.aspx?l=e", "/english/res_e/webcas_e/rss_e.htm", "http://www.facebook.com/worldtradeorganization", "http://www.youtube.com/user/WTO", "http://twitter.com/WTO", "http://www.flickr.com/photos/world_trade_organization"];
	var bnr_language1 = ["Fran&ccedil;ais", "/french/", "_f/", "_f."];
	var bnr_language2 = ["Espa&ntilde;ol", "/spanish/", "_s/", "_s."];
	var bnr_this_language = ["/english/", "_e/", "_e."];
	var home_page = ["/index.htm", "/indexfr.htm", "/indexsp.htm"];
	var homepage = "";
	var bnr_logo = ["/images/wtomenus/logo_en.gif", "/index.htm", "Click here to return to homepage", "/images/wtomenus/logo_lite_en.gif"];
	var bnr_login = ["Members log-in", "http://members.wto.org", "Click here to access restricted information for members"];
	var bnr_contact = ["Contact us", "/english/info_e/cont_e.htm"];
	var bnr_site = ["Site map", "/english/info_e/site2_e.htm"];
	var bnr_az = ["A-Z", "/english/info_e/site_e.htm"];
	var close_text = "Close";
	var doltext = "<p class=\"paranormaltext\">You can perform more sophisticated searches from the <a class=\"paradarkredtext\" href=\"http://docsonline.wto.org/gen_search.asp?language=1\" target=\"_blank\">Documents Online search facility</a>   <span class=\"parasmalltext\">(opens in a new window)</span> by defining multiple search criteria such as document code, full text search or document date.</p>";
	var wto_string = "http://www.wto.org";
//	var dolurl = "http://docsonline.wto.org/imrd/directdoc.asp?DDFDocuments/";
//	var dolurl = "https://docs.wto.org/imrd/directdoc.asp?DDFDocuments/";
	var dolurl = "https://docs.wto.org/dol2fe/Pages/SS/directdoc.aspx?filename=";
	var dolsearchcallouttext = "Searches Documents Online; Results appear in a new window.";
	var newwindowtext = " opens in a new window";
	var not_defined;

if (location.href.indexOf("https") != -1)
{
	wto_string = "https://www.wto.org";
}
else if (location.href.indexOf("http://workingserver") != -1)
{
	wto_string = "";
}

	var leftarrow = "<img src=\"" + wto_string + "/images/wtomenus/menu_leftarrow.gif\" valign=\"top\" border=\"0\" height=\"10\">";
	var noarrow = "<img src=\"" + wto_string + "/images/wtomenus/menu_noarrow.gif\" align=\"center\" valign=\"top\" border=\"0\" height=\"10\">";
	var centrearrow = "<img src=\"" + wto_string + "/images/wtomenus/menu_arrow.gif\" align=\"center\" valign=\"top\" border=\"0\" height=\"10\">";
	var rightarrow = "<img src=\"" + wto_string + "/images/wtomenus/menu_rightarrow.gif\" valign=\"top\" border=\"0\" height=\"10\">";
	
	var document_type_array = new Array();  // array for flyout text to be used depending on the document type
	document_type_array[0] = ["doc", "MS word format;"];
	document_type_array[1] = ["pdf", "pdf format;"];
	document_type_array[2] = ["wpf", "Wordperfect format;"];
	document_type_array[3] = ["xls", "MS excel format;"];
	document_type_array[4] = ["ppt", "MS powerpoint format;"];
	document_type_array[5] = ["mp3", "mp3 audio format;"];
	document_type_array[6] = ["wmv", "Windows Media video format;"];
	document_type_array[7] = ["zip", "zip format;"];
	document_type_array[8] = ["pps", "MS powerpoint format;"];

if (typeof jkmegamenu !== "undefined")

{	
var jkmenu_array = new Array();
	jkmenu_array[jkmenu_array.length] = {
		menuid: "2",
		menuwidth: "525",
		subtitle: "What is the WTO?",
		subtitle_url: "/english/thewto_e/whatis_e/whatis_e.htm",
		break_before: false,
		new_window: false,
		callout: "",
		line_width: "100%",
		menuimage:leftarrow,
		menuitems:[
			{ title: "Who we are", url: "/english/thewto_e/whatis_e/who_we_are_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "What we do", url: "/english/thewto_e/whatis_e/what_we_do_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "What we stand for", url: "/english/thewto_e/whatis_e/what_stand_for_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Mission statement", url: "/english/thewto_e/whatis_e/wto_dg_stat_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
	
		jkmenu_array[jkmenu_array.length] = {
		menuid: "2",
		menuwidth: "525",
		subtitle: "Introductory brochures",
		subtitle_url: "",
		break_before: false,
		new_window: false,
		callout: "",
		line_width: "100%",
		menuimage:"",
		menuitems:[
			{ title: "WTO in brief", url: "/english/thewto_e/whatis_e/inbrief_e/inbr00_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Understanding the WTO", url: "/english/thewto_e/whatis_e/tif_e/tif_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "10 things the WTO can do", url: "/english/thewto_e/whatis_e/10thi_e/10thi00_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "2",
		menuwidth: "525",
		subtitle: "Flagship publications",
		subtitle_url: "",
		break_before: false,
		new_window: false,
		callout: "",
		line_width: "100%",
		menuimage:"",
		menuitems:[
			{ title: "Annual Report", url: "/english/res_e/reser_e/annual_report_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "World Trade Report", url: "/english/res_e/reser_e/wtr_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "International Trade Statistics", url: "/english/res_e/statis_e/statis_e.htm#stats", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "2",
		menuwidth: "525",
		subtitle: "Decision-making",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage: noarrow,
		menuitems:[
			{ title: "Organization chart", url: "/english/thewto_e/whatis_e/tif_e/org2_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Ministerial conferences", url: "/english/thewto_e/minist_e/minist_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "General Council", url: "/english/thewto_e/gcounc_e/gcounc_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "2",
		menuwidth: "525",
		subtitle: "Membership",
		subtitle_url: "",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Members", url: "/english/thewto_e/whatis_e/tif_e/org6_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Observers", url: "/english/thewto_e/whatis_e/tif_e/org6_e.htm#observer", new_window: false, callout: "", subitem: false},
			{ title: "Accessions", url: "/english/thewto_e/acc_e/acc_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "GATT signatories", url: "/english/thewto_e/gattmem_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "2",
		menuwidth: "525",
		subtitle: "Secretariat",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage: noarrow,
		menuitems:[
			{ title: "Overview", url: "/english/thewto_e/secre_e/intro_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Budget", url: "/english/thewto_e/secre_e/budget_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Director-General", url: "/english/thewto_e/dg_e/dg_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Deputy Directors-General", url: "/english/thewto_e/dg_e/ddgs_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "WTO building", url: "/english/thewto_e/cwr_e/cwr_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Procurement opportunities", url: "/english/thewto_e/procurement_e/procurement_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Vacancies", url: "/english/thewto_e/vacan_e/vacan_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Internships", url: "https://erecruitment.wto.org/public/hrd-cl-vac-view.asp?jobinfo_uid_c=3475&vaclng=en", new_window: true, callout: "opens in a new window", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "2",
		menuwidth: "525",
		subtitle: "WTO and other organizations",
		subtitle_url: "/english/thewto_e/coher_e/coher_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Millennium Development Goals (MDGs)", url: "/english/thewto_e/coher_e/mdg_e/mdg_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "3",
		menuwidth: "525",
		subtitle: "News",
		subtitle_url: "/english/news_e/news_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage: noarrow,
		menuitems:[
			{ title: "Current news", url: "/english/news_e/news_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Archives", url: "/english/news_e/news_e.htm#archives", new_window: false, callout: "", subitem: false},
			{ title: "Information centre", url: "/english/news_e/infocenter_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "RSS news feeds", url: "/english/res_e/webcas_e/rss_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Media newsroom for journalists", url: "/english/forums_e/media_e/xmedia_e/xmedia_e.htm", new_window: false, callout: "Password protected", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "3",
		menuwidth: "525",
		subtitle: "WTO meetings",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:centrearrow,
		menuitems:[
			{ title: "Meetings this week", url: "/english/news_e/news_e.htm#whatson", new_window: false, callout: "", subitem: false},
			{ title: "Meetings this year", url: "http://www.wto.org/meets_public/meets_e.pdf", new_window: true, callout: "pdf format, opens in a news window", subitem: false},
			{ title: "Ministerial Conferences", url: "/english/thewto_e/minist_e/minist_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "DG’s schedule this week", url: "/english/thewto_e/dg_e/dg_agenda_e.pdf", new_window: true, callout: "pdf format, opens in a new window", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "3",
		menuwidth: "525",
		subtitle: "Events",
		subtitle_url: "/english/news_e/events_e/events_e.htm",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Events calendar", url: "/english/news_e/events_e/events_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Public Forum", url: "/english/forums_e/public_forum_e/public_forum_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Open Day", url: "/english/forums_e/open_day_e/open_day_e.htm", new_window: false, callout: "", subitem: false}
		]
	};


	jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Goods",
		subtitle_url: "",
		break_before: false,
		new_window: false,
		line_width: "120%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Agriculture", url: "/english/tratop_e/agric_e/agric_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Agriculture negotiations", url: "/english/tratop_e/agric_e/negoti_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Cotton Sub-Committee", url: "/english/tratop_e/agric_e/cotton_subcommittee_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Anti-dumping", url: "/english/tratop_e/adp_e/adp_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Rules negotiations", url: "/english/tratop_e/rulesneg_e/rulesneg_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Balance of payments", url: "/english/tratop_e/bop_e/bop_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Customs valuation", url: "/english/tratop_e/cusval_e/cusval_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "GATT &amp; the Goods Council", url: "/english/tratop_e/gatt_e/gatt_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Goods schedules", url: "/english/tratop_e/schedules_e/goods_schedules_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Import licensing", url: "/english/tratop_e/implic_e/implic_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Information Technology<br />Agreement", url: "/english/tratop_e/inftec_e/inftec_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Market access for goods", url: "/english/tratop_e/markacc_e/markacc_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Market access negotiations", url: "/english/tratop_e/markacc_e/markacc_negoti_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Non-tariff measures", url: "/english/res_e/statis_e/itip_e.htm", new_window: false, callout: "", subitem: false}
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "&nbsp;",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Rules of origin", url: "/english/tratop_e/roi_e/roi_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Preshipment Inspection", url: "/english/tratop_e/preship_e/preship_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Safeguard measures", url: "/english/tratop_e/safeg_e/safeg_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Sanitary & phytosanitary measures", url: "/english/tratop_e/sps_e/sps_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "State trading enterprises", url: "/english/tratop_e/statra_e/statra_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Subsidies &amp; countervail measures", url: "/english/tratop_e/scm_e/scm_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Rules negotiations", url: "/english/tratop_e/rulesneg_e/rulesneg_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Fisheries subsidies", url: "/english/tratop_e/rulesneg_e/fish_e/fish_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Tariffs", url: "/english/tratop_e/tariffs_e/tariffs_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Technical barriers to trade", url: "/english/tratop_e/tbt_e/tbt_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Textiles", url: "/english/tratop_e/texti_e/texti_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Trade facilitation", url: "/english/tratop_e/tradfa_e/tradfa_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
	
		jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Services",
		subtitle_url: "/english/tratop_e/serv_e/serv_e.htm",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:centrearrow,
		menuitems:[
			{ title: "Services negotiations", url: "/english/tratop_e/serv_e/s_negs_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Services schedules", url: "/english/tratop_e/serv_e/serv_commitments_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Intellectual property",
		subtitle_url: "/english/tratop_e/trips_e/trips_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Specific TRIPS issues", url: "/english/tratop_e/trips_e/trips_e.htm#issues", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Dispute settlement",
		subtitle_url: "/english/tratop_e/dispu_e/dispu_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Disputes chronologically", url: "/english/tratop_e/dispu_e/dispu_status_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Disputes by country/territory", url: "/english/tratop_e/dispu_e/dispu_by_country_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Disputes by agreement", url: "/english/tratop_e/dispu_e/dispu_agreements_index_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Disputes by subject", url: "/english/tratop_e/dispu_e/dispu_subjects_index_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Find disputes cases", url: "/english/tratop_e/dispu_e/find_dispu_cases_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Dispute Settlement Body", url: "/english/tratop_e/dispu_e/dispu_e.htm#dsb", new_window: false, callout: "", subitem: false},
			{ title: "Appellate Body", url: "/english/tratop_e/dispu_e/appellate_body_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Doha Development Agenda",
		subtitle_url: "/english/tratop_e/dda_e/dda_e.htm",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Subjects treated", url: "/english/tratop_e/dda_e/dohasubjects_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Trade Negotiations Committee", url: "/english/tratop_e/dda_e/tnc_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Groups in the negotiations", url: "/english/tratop_e/dda_e/negotiating_groups_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Building trade capacity",
		subtitle_url: "/english/tratop_e/devel_e/build_tr_capa_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Aid for Trade", url: "/english/tratop_e/devel_e/a4t_e/aid4trade_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Development", url: "/english/tratop_e/devel_e/devel_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "E-Learning", url: "http://etraining.wto.org/", new_window: true, callout: "opens in a new window", subitem: false},
			{ title: "Enhanced Integrated Framework", url: "/english/tratop_e/devel_e/teccop_e/if_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Technical assistance and training", url: "/english/tratop_e/devel_e/teccop_e/tct_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
		jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Trade monitoring",
		subtitle_url: "",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Trade monitoring reports", url: "/english/tratop_e/tpr_e/trade_monitoring_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Trade policy reviews", url: "/english/tratop_e/tpr_e/tpr_e.htm", new_window: false, callout: "", subitem: false}
		]
	};

		jkmenu_array[jkmenu_array.length] = {
		menuid: "4",
		menuwidth: "875",
		subtitle: "Other topics",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Accessions", url: "/english/thewto_e/acc_e/acc_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Civil aircraft", url: "/english/tratop_e/civair_e/civair_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Competition policy", url: "/english/tratop_e/comp_e/comp_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Electronic Commerce", url: "/english/tratop_e/ecom_e/ecom_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Environment", url: "/english/tratop_e/envir_e/envir_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Climate change", url: "/english/tratop_e/envir_e/climate_intro_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Government procurement", url: "/english/tratop_e/gproc_e/gproc_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Investment", url: "/english/tratop_e/invest_e/invest_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Regional trade agreements and preferential trade arrangements", url: "/english/tratop_e/region_e/rta_pta_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Regional trade agreements", url: "/english/tratop_e/region_e/region_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "Preferential&nbsp;trade&nbsp;arrangements", url: "http://ptadb.wto.org/?lang=1", new_window: false, callout: "", subitem: true},
			{ title: "Trade finance", url: "/english/thewto_e/coher_e/tr_finance_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
	
		jkmenu_array[jkmenu_array.length] = {
		menuid: "5",
		menuwidth: "525",
		subtitle: "Members",
		subtitle_url: "/english/thewto_e/whatis_e/tif_e/org6_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Key facts and figures", url: "", new_window: false, callout: "", subitem: true}
		]
	};

		jkmenu_array[jkmenu_array.length] = {
		menuid: "5",
		menuwidth: "525",
		subtitle: "Observers",
		subtitle_url: "/english/thewto_e/whatis_e/tif_e/org6_e.htm#observer",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:centrearrow,
		menuitems:[
			{ title: "Key facts and figures", url: "", new_window: false, callout: "", subitem: true}
		]
	};

		jkmenu_array[jkmenu_array.length] = {
		menuid: "5",
		menuwidth: "525",
		subtitle: "Accessions",
		subtitle_url: "/english/thewto_e/acc_e/acc_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Joining WTO", url: "", new_window: false, callout: "", subitem: true}
		]
	};

		jkmenu_array[jkmenu_array.length] = {
		menuid: "5",
		menuwidth: "525",
		subtitle: "Maps",
		subtitle_url: "/english/res_e/maps_e/maps_e.htm",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Membership and trade data", url: "", new_window: false, callout: "", subitem: true}
		]
	};

		jkmenu_array[jkmenu_array.length] = {
		menuid: "5",
		menuwidth: "525",
		subtitle: "Groups in the negotiations",
		subtitle_url: "/english/tratop_e/dda_e/negotiating_groups_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "6",
		menuwidth: "525",
		subtitle: "Official documents",
		subtitle_url: "/english/docs_e/docs_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "WTO &ldquo;Documents Online&rdquo;", url: "http://docs.wto.org", new_window: true, callout: "opens in a new window", subitem: false},
			{ title: "Legal texts", url: "/english/docs_e/legal_e/legal_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "GATT documents", url: "/english/docs_e/gattdocs_e.htm", new_window: false, callout: "", subitem: false}
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "6",
		menuwidth: "525",
		subtitle: "Publications",
		subtitle_url: "/english/res_e/publications_e/publications_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Key publications", url: "/english/res_e/publications_e/publications_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "By title", url: "/english/res_e/publications_e/publ_by_title_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "By category/subject", url: "/english/res_e/publications_e/publ_by_subject_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Online bookshop", url: "http://onlinebookshop.wto.org/shop/?lang=EN", new_window: true, callout: "opens in a new window", subitem: false},
			{ title: "WTO bookshop in Geneva", url: "/english/res_e/booksp_e/bookshop_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Library", url: "/english/res_e/booksp_e/library_e/library_e.htm", new_window: false, callout: "", subitem: false}
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "6",
		menuwidth: "525",
		subtitle: "Statistics",
		subtitle_url: "/english/res_e/statis_e/statis_e.htm",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "International Trade and Market Access Data", url: "/english/res_e/statis_e/statis_bis_e.htm?solution=WTO&path=/Dashboards/MAPS&file=Map.wcdf&bookmarkState={%22impl%22:%22client%22,%22params%22:{%22langParam%22:%22en%22}}", new_window: false, callout: "", subitem: false},
			{ title: "Integrated Trade Intelligence Portal (I-TIP)", url: "/english/res_e/statis_e/itip_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Statistics database", url: "http://stat.wto.org/Home/WSDBHome.aspx?Language=E", new_window: true, callout: "opens in a new window", subitem: false},
			{ title: "Tariff data", url: "/english/tratop_e/tariffs_e/tariff_data_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "International trade statistics", url: "/english/res_e/statis_e/its_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Maps", url: "/english/res_e/statis_e/statis_maps_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "&ldquo;Made in the World&rdquo; initiative", url: "/english/res_e/statis_e/miwi_e/miwi_e.htm", new_window: false, callout: "", subitem: false}
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "6",
		menuwidth: "525",
		subtitle: "Economic research",
		subtitle_url: "/english/res_e/reser_e/reser_e.htm",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Working papers", url: "/english/res_e/reser_e/wpaps_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "WTO Chairs Programme", url: "/english/tratop_e/devel_e/train_e/chairs_prog_e.htm", new_window: false, callout: "", subitem: false}
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "6",
		menuwidth: "525",
		subtitle: "Multimedia",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:rightarrow,
		menuitems:[
			{ title: "Audio/podcasting", url: "/english/res_e/webcas_e/podcasting_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Video", url: "/english/res_e/webcas_e/webcas_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Photos", url: "/english/res_e/photo_gallery_e/photo_gallery_e.htm", new_window: false, callout: "", subitem: false}
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "6",
		menuwidth: "525",
		subtitle: "Other resources",
		subtitle_url: "",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:"",
		menuitems:[
			{ title: "Glossary", url: "/english/thewto_e/glossary_e/glossary_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Distance learning", url: "/english/res_e/d_learn_e/d_learn_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "E-Learning", url: "http://etraining.wto.org/", new_window: true, callout: "opens in a new window", subitem: true},
			{ title: "Terminology database", url: "http://wtoterm.wto.org/multiterm/index.mto?locale=en", new_window: true, callout: "opens in a new window", subitem: false}
		]
	};

	jkmenu_array[jkmenu_array.length] = {
		menuid: "7",
		menuwidth: "525",
		subtitle: "Information for",
		subtitle_url: "",
		break_before: false,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Businesses", url: "/english/forums_e/business_e/business_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Journalists", url: "/english/forums_e/media_e/media_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Media newsroom", url: "/english/forums_e/media_e/xmedia_e/xmedia_e.htm", new_window: false, callout: "", subitem: true},
			{ title: "NGOs", url: "/english/forums_e/ngo_e/ngo_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Parliamentarians", url: "/english/forums_e/parliamentarians_e/parliamentarians_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Students", url: "/english/forums_e/students_e/students_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
	jkmenu_array[jkmenu_array.length] = {
		menuid: "7",
		menuwidth: "525",
		subtitle: "Public events",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:noarrow,
		menuitems:[
			{ title: "Public Forum", url: "/english/forums_e/public_forum_e/public_forum_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Open Day", url: "/english/forums_e/open_day_e/open_day_e.htm", new_window: false, callout: "", subitem: false}
		]
	};
	jkmenu_array[jkmenu_array.length] = {
		menuid: "7",
		menuwidth: "525",
		subtitle: "Online&nbsp;outreach",
		subtitle_url: "",
		break_before: true,
		new_window: false,
		line_width: "100%",
		callout: "",
		menuimage:rightarrow,
		menuitems:[
			{ title: "Video debates", url: "/english/forums_e/debates_e/debates_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Online forum", url: "/english/forums_e/chat_e/chat_e.htm", new_window: false, callout: "", subitem: false},
			{ title: "Social media", url: "/english/forums_e/social_media_e.htm", new_window: false, callout: "", subitem: false}
		]
	};


	
jkmegamenu.definemenu("Menu1", "Menu1_menu", "mouseover", 0, "left", "menudefaulttext", "menudefaulttextover")
jkmegamenu.definemenu("Menu2", "Menu2_menu", "mouseover", 525, "left", "menudefaulttext", "menudefaulttextover")
jkmegamenu.definemenu("Menu3", "Menu3_menu", "mouseover", 525, "centre", "menudefaulttext", "menudefaulttextover")
jkmegamenu.definemenu("Menu4", "Menu4_menu", "mouseover", 875, "centre", "menudefaulttext", "menudefaulttextover")
jkmegamenu.definemenu("Menu5", "Menu5_menu", "mouseover", 525, "centre", "menudefaulttext", "menudefaulttextover")
jkmegamenu.definemenu("Menu6", "Menu6_menu", "mouseover", 525, "right", "menudefaulttext", "menudefaulttextover")
jkmegamenu.definemenu("Menu7", "Menu7_menu", "mouseover", 525, "right", "menudefaulttext", "menudefaulttextover")
}


function dolbox(boxid)
{
	var dolbox = document.getElementById(boxid);
	dolbox.className = "";
	var newcode = "<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"doltbltl\"></td><td class=\"doltbltop\"></td><td class=\"doltbltr\"></td></tr><tr><td class=\"doltblleft\"></td><td class=\"doltblcentre\">" + dolbox.innerHTML + "</td><td class=\"doltblright\"></td></tr><tr><td class=\"doltblbl\"></td><td class=\"doltblbot\"></td><td class=\"doltblbr\"></td></tr></table>";
	dolbox.innerHTML = newcode;
}

function linkdoldoc(dolfile, dollang)
{
	var doldrive = "q";
	var fileSplit = dolfile.split(".");
	if (fileSplit[1] == "pdf")
	{
		switch (dollang) {
		case "":
			doldrive = "q";
			break;
		case "e":
			doldrive = "q";
			break;
		case "f":
			doldrive = "r";
			break;
		case "s":
			doldrive = "s";
			break;
		}
	}
	else
	{
		switch (dollang) {
		case "":
			doldrive = "t";
			break;
		case "e":
			doldrive = "t";
			break;
		case "f":
			doldrive = "u";
			break;
		case "s":
			doldrive = "v";
			break;
		}
	}
//	var dollink = dolurl + doldrive + "/" + dolfile;
	var dollink = dolurl + doldrive + ":/" + dolfile;
	window.open(dollink);
}

function linkdolsearch(searchstring)
{
	f_submit(searchstring,'1');
}

function dolsearchcallout()
{
	writetxt(dolsearchcallouttext);
}
function doldoccallout(dolext, dollang)
{
	var callout = "";
	for (var ext=0; ext<document_type_array.length; ext++)
	{
		if (document_type_array[ext][0] == dolext)
		{
			callout += document_type_array[ext][1];
			break;
		}
	}
	switch (dollang) {
		case "":
			callout += "";
			break;
		case "e":
			callout += "";
			break;
		case "f":
			callout += " only in French;";
			break;
		case "s":
			callout += " only in Spanish;";
			break;
	}
	callout += newwindowtext;
	writetxt(callout);
}
	//end

