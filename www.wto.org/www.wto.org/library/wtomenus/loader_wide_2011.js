/*loads header & footer */
var bannercode = "";
var bannerlayer = "";
var footercode = "";
var footerlayer = "";
var menulists = "";
var lastmenu = 0;
var bnr_menu_text_style = "menudefaulttext";
var bnr_search_page = "http://search.wto.org/search";
var bnr_search_term ="";
var wto_othermenu_arrays;
var wto_dotslash;
var not_defined;
var today = new Date();
var bnr_menu_columns = (bnr_menu_text.length * 2) - 3;
var thisYear = today.getFullYear();
var page_width = 0;
var page_height = 0;
var cell_height1 = 90;
var cell_height2 = 30;
var cell_height3 = 60;
var logo = bnr_logo[0];
	if (location.href.indexOf("https") != -1)
	{
		wto_string = "https://www.wto.org";
		wto_dotslash = "https://www.wto.org/";
	}
	if (wto_dotslash === not_defined)
	{
		wto_dotslash = "http://www.wto.org/";
	}
	
	if (window.innerWidth === not_defined)
	{
		page_width = document.documentElement.clientWidth;
		page_height = document.documentElement.clientHeight;
	}
	else
	{
		page_width = window.innerWidth;
		page_height = window.innerHeight;
	}
	if (page_height < 680)
	{
		cell_height1 = 55;
		cell_height2 = 25;
		cell_height3 = 30;
		logo = bnr_logo[3];
	}
// build string for banner
	bannercode = "<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td class=\"maintbltl\"></td><td class=\"maintbltop\"></td><td class=\"maintbltr\"></td></tr>";
	bannercode += "<tr><td class=\"maintblleft\"></td><td class=\"maintblmiddle\">";
	bannercode += "<table width=\"100%\" height=\"" + cell_height1 + "px\" cellspacing=\"0\" cellpadding=\"0\"><tr><td rowspan=\"2\" valign=\"middle\" align=\"left\"><a href=\"" + get_link(bnr_logo[1]) + "\"  onMouseOver=\"writetxt('" + bnr_logo[2] + "')\" onMouseOut=\"writetxt(0)\"><img hspace=\"0\" src=\"" + get_link(logo) + "\" align=\"left\" border=\"0\" alt=\"" + bnr_logo[2] + "\"></a><a href=\"#skip\" class=\"tinywhitetext\">Skip to content</a></td>";
	bannercode += "<td valign=\"top\" align=\"left\" id=\"ignore\" class=\"bannertoptext\" height=\"" + cell_height2 + "px\" style=\"background-image:url(" + wto_string + "/images/wtomenus/top_banner_shading.gif); background-repeat:repeat-x\"><a name=\"top\"></a>&nbsp;&nbsp; " + insert_language_links() + "&nbsp;</td>";
//	bannercode += "<td valign=\"top\" align=\"right\" id=\"ignore\" class=\"bannertoptext\" height=\"" + cell_height2 + "px\" style=\"background-image:url(/images/wtomenus/top_banner_shading.gif); background-repeat:repeat-x\"><a href=\"" + get_link(bnr_login[1]) + "\" class=\"bannertoptext\" onMouseOver=\"writetxt('" + bnr_login[2] + "')\" onMouseOut=\"writetxt(0)\"><img  src=\"/images/wtomenus/login.gif\" border=\"0\" width=\"13\" height=\"11\" align=\"bottom\" alt=\"" + bnr_login[2] + "\"></a>&nbsp;<a href=\"" + get_link(bnr_login[1]) + "\" class=\"bannertoptext\" onMouseOver=\"writetxt('" + bnr_login[2] + "')\" onMouseOut=\"writetxt(0)\">" + bnr_login[0] + "</a>&nbsp;</td>";
	bannercode += "<td valign=\"top\" align=\"right\" id=\"ignore\" class=\"bannertoptext\" height=\"" + cell_height2 + "px\" style=\"background-image:url(" + wto_string + "/images/wtomenus/top_banner_shading.gif); background-repeat:repeat-x\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
	bannercode += "<td valign=\"top\" align=\"right\" id=\"ignore\" class=\"bannertoptext\" height=\"" + cell_height2 + "px\" style=\"background-image:url(" + wto_string + "/images/wtomenus/top_banner_shading.gif); background-repeat:repeat-x\">&nbsp;&nbsp;<a href=\"" + get_link(bnr_contact[1]) + "\" class=\"bannertoptext\">" + bnr_contact[0] + "</a>&nbsp;|&nbsp;<a href=\"" + get_link(bnr_site[1]) + "\" class=\"bannertoptext\">" + bnr_site[0] + "</a>&nbsp;|&nbsp;<a href=\"" + get_link(bnr_az[1]) + "\" class=\"bannertoptext\">" + bnr_az[0] + "</a>&nbsp;&nbsp;</td></tr>";
	bannercode += "<tr><td colspan=\"3\" align=\"right\"  height=\"" + cell_height3 + "px\" valign=\"top\" style=\"vertical-align:top\"><form name=\"BannerForm\" action=\"" + bnr_search_page + "\" method=\"GET\"><label for=\"searchbox\"  class=\"bannertoptext\">" + bnr_search_value + "</label><input id=\"searchbox\" type=\"text\" name=\"q\" width=\"200px\" maxlength=\"150\"  VALUE=\"\" class=\"bannertoptext\"  alt=\"" + bnr_search_callout[0] + "\">&nbsp;&nbsp;<a href=\"\" onClick=\"doSearch(bnr_search_term, bnr_search_page);return false\"  onMouseOver=\"writetxt('" + bnr_search_callout[1] + "')\" onMouseOut=\"writetxt(0)\"><img  src=\"" + get_link('/images/wtomenus/search.gif') + "\"  border=\"0\" valign=\"middle\" alt=\"" + bnr_search_callout[1] + "\"></a>&nbsp;&nbsp;" + bnr_search_fields + "<input type=\"hidden\" name=\"output\" value=\"xml_no_dtd\"/><input type=\"hidden\" name=\"numgm\" value=\"5\"/><input type=\"hidden\" name=\"proxyreload\" value=\"1\"/><input type=\"hidden\" name=\"ie\" value=\"ISO-8859-1\"/><input type=\"hidden\" name=\"oe\" value=\"ISO-8859-1\"/></form></td></tr></table>";
	bannercode += "<table id=\"menus\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" style=\"height:36px; background-image:url(" + wto_string + "/images/wtomenus/menu_background.gif); background-repeat:repeat-x \"><tr><td style=\"height:3px; width:3px; background-image:url(" + wto_string + "/images/img_borders/menu_top_left.png); background-repeat:no-repeat \"></td><td colspan=\"" + bnr_menu_columns + "\" style=\"height:3px; background-image:url(" + wto_string + "/images/img_borders/menu_line_top.png); background-repeat:repeat-x \"></td><td style=\"height:3px; width:3px; background-image:url(" + wto_string + "/images/img_borders/menu_top_right.png); background-repeat:no-repeat \"></td></tr><tr ><td style=\"width:3px; background-image:url(" + wto_string + "/images/img_borders/menu_line_left.png); background-repeat:repeat-y \"></td>";
// add menu items to banner string
	for (var i=1; i<bnr_menu_text.length; i++)
	{
		bannercode += '<td  width="130px" valign="top" align="left" id="Menu' + i + '" style="padding:3px" class="' + bnr_menu_text_style + '"><h2 ><a id="lnkMenu' + i + '" href="' + get_link(bnr_menu_link[i]) + '" >' + bnr_menu_text[i] + '</a></h2></td>';
		if (i < (bnr_menu_text.length - 1))
		{
			bannercode += "<td  width=\"3px\" valign=\"middle\" align=\"center\" id=\"ignore\"><img  hspace=\"0\" src=\"" + get_link('/images/wtomenus/menu_separator.gif') + "\" align=\"left\" border=\"0\" alt=\"\"></td>";
		}
	}
	bannercode += "<td style=\"width:3px; background-image:url(" + wto_string + "/images/img_borders/menu_line_right.png); background-repeat:repeat-y \"></td></tr><tr><td style=\"height:3px; width:3px; background-image:url(" + wto_string + "/images/img_borders/menu_bottom_left.png); background-repeat:no-repeat \"></td><td colspan=\"" + bnr_menu_columns + "\" style=\"height:3px; background-image:url(" + wto_string + "/images/img_borders/menu_line_bottom.png); background-repeat:repeat-x \"></td><td style=\"height:3px; width:3px; background-image:url(" + wto_string + "/images/img_borders/menu_bottom_right.png); background-repeat:no-repeat \"></td></tr></table>";
	bannercode += "</td><td class=\"maintblright\"></td></tr>";
	bannercode += "<tr><td class=\"maintblbl\"></td><td class=\"maintblbot\"></td><td class=\"maintblbr\"></td></tr></table>";
	bannercode += "<div  style=\"height:5px\"></div>";
	bannerlayer = document.getElementById('banner');
	bannerlayer.innerHTML = bannercode;
// add footer links to page
	footercode = "<table width=\"100%\" cellspacing=\"0\" bgcolor=\"#FFFFFF\"><tr><td valign=\"top\" width=\"300px\"><p class=\"footertext\">&nbsp;</p><p class=\"footertext\">" + footer_text + "</p><p class=\"footercopy\"><a href=\"" + get_link(footer_copy_link) + "\" class=\"footercopy\">&copy;&nbsp;" + footer_copy_text + " " + thisYear + "</a><br><a href=\"" + get_link(footer_disclaimer_link) + "\" class=\"footercopy\">" + footer_disclaimer_text + "</a></p></td><td>&nbsp;</td>";
	footercode += "<td width=\"165px\" valign=\"top\"><p class=\"footertext\">&nbsp;</p><h3 class=\"footerheading\">" + footer_key + "</h3>";
	footercode += "<ul class=\"footerlinks\" style=\"list-style-type:none; margin:0; padding:0; text-align:left\">";
	for (var i = 0; i < footer_key_titles.length; i++)
	{
		footercode += "<li class=\"footerlinks\"><a href=\"" + get_link(footer_key_links[i]) + "\" class=\"footerlinks\">" + footer_key_titles[i] + "</a></li>";
	}
	footercode += "</ul></td>";
	footercode += "<td width=\"80px\" valign=\"top\"><p class=\"footertext\">&nbsp;</p><h3 class=\"footerheading\">" + footer_follow + "</h3>";
	footercode += "<ul class=\"footerlinks\" style=\"list-style-type:none; margin:0; padding:0; text-align:left\">";
	for (var i = 0; i < footer_follow_titles.length; i++)
	{
		footercode += "<li class=\"footerlinks\"><a href=\"" + get_link(footer_follow_links[i]) + "\" class=\"footerlinks\">" + footer_follow_titles[i] + "</a></li>";
	}
	footercode += "</ul></td>";
	footercode +="</tr></table>";
	
// build menus
var firstitem = true;
var listpadding = "0px";
// build zero sized home menu
	menulists = "<div id=\"Menu1_menu\"  style=\"width:0px; height:0px; border:0px;\"></div>";
	for (var i = 0; i < jkmenu_array.length; i++)
	{
		if (jkmenu_array[i].menuid != lastmenu)
		{
			if (lastmenu != 0)
			{
				menulists += "</div>";
				firstitem = true;
			}	
			menulists += "<div id=\"Menu" + jkmenu_array[i].menuid + "_menu\" class=\"megamenu\" style=\"width:" + jkmenu_array[i].menuwidth + "px; border-top-width:0px;\"><table cellpadding=0 cellspacing=0 border=0 style=\"width:" + jkmenu_array[i].menuwidth + "px\"><tr><td class=\"column\">";
			lastmenu = jkmenu_array[i].menuid;
			if (jkmenu_array[i].menuimage != "")
			{
				menulists += "<p class=\"megaimage\">" + jkmenu_array[i].menuimage + "</p>";
			}
		}
		if (jkmenu_array[i].break_before == true)
		{
			menulists += "</td><td class=\"column\">";
			if (jkmenu_array[i].menuimage != "")
			{
				menulists += "<p class=\"megaimage\">" + jkmenu_array[i].menuimage + "</p>";
			}
		}
		if (jkmenu_array[i].subtitle != "")
		{
			if ((jkmenu_array[i].break_before == false) && (firstitem == false))
			{
				menulists += "<p class=\"menusubitem\">&nbsp;</p>";
			}
			if (jkmenu_array[i].subtitle_url != "")
			{
				if (jkmenu_array[i].subtitle_url.indexOf("http") != -1)
				{
					menulists += "<h3><a href=\""  + jkmenu_array[i].subtitle_url + "\" ";
				}
				else
				{
					menulists += "<h3><a href=\"" + wto_string + jkmenu_array[i].subtitle_url + "\" ";
				}
//				if (wto_string + jkmenu_array[i].new_window == true)
				if (jkmenu_array[i].new_window == true)
				{
					menulists += "target = \"_blank\""; 
				}
				if (jkmenu_array[i].callout != "")
				{
					menulists += "onMouseOver=\"writetxt('" + jkmenu_array[i].callout + "')\" onMouseOut=\"writetxt(0)\"";
				}
				menulists += ">" + jkmenu_array[i].subtitle + "</a></h3>";
			}
			else
			{
				menulists += "<h3>" + jkmenu_array[i].subtitle + "</h3>";
			}
			menulists += "<hr style=\"border: none; background-color:#3399FF; width:" + jkmenu_array[i].line_width + "; height:1px; text-align:left; padding-top:0\" />";
		}
		if (jkmenu_array[i].menuitems.length != 0)
		{
			menulists += "<ul>";
			for (var j = 0; j < jkmenu_array[i].menuitems.length; j++)
			{
				if ((j==0) && (jkmenu_array[i].subtitle == "") && (jkmenu_array[i].break_before == true))
				{
					listpadding = "7px";
				}
				else
				{
					listpadding = "0px";
				}
				
				if (jkmenu_array[i].menuitems[j].subitem == false)
				{
					menulists += "<li class=\"menuitem\" style=\"padding-top:" + listpadding + "\">";
				}
				else
				{
					menulists += "<li class=\"menusubitem\" style=\"padding-top:" + listpadding + "\">";
					if (jkmenu_array[i].menuitems[j].url != "")
					{
						menulists += "&middot;&nbsp;";
					}
				}
				if (jkmenu_array[i].menuitems[j].url != "")
				{
					if (jkmenu_array[i].menuitems[j].url.indexOf("http") != -1)
					{
						menulists += "<a href=\"" +  jkmenu_array[i].menuitems[j].url + "\" ";
					}
					else
					{
						menulists += "<a href=\"" + wto_string + jkmenu_array[i].menuitems[j].url + "\" ";
					}
//					if (wto_string + jkmenu_array[i].menuitems[j].new_window == true)
					if ( jkmenu_array[i].menuitems[j].new_window == true)
					{
						menulists += "target = \"_blank\""; 
					}
					if (jkmenu_array[i].menuitems[j].callout != "")
					{
						menulists += "onMouseOver=\"writetxt('" + jkmenu_array[i].menuitems[j].callout + "')\" onMouseOut=\"writetxt(0)\"";
					}
					menulists += ">" + jkmenu_array[i].menuitems[j].title + "</a></li>";
				}
				else
				{
					menulists += jkmenu_array[i].menuitems[j].title + "</li>";
				}
			}
			menulists += "</ul>";
		}
		firstitem = false;
	}
	menulists += "</td></tr></table></div>"

	footerlayer = document.getElementById('footer');
	footerlayer.innerHTML = footercode + menulists;
// Functions used for banner

// function toubmit to search form
function doSearch(search_term, search_page)
{
	document.forms['BannerForm'].action = search_page;
	document.forms['BannerForm'].submit();
}

// function to return the path of a link depending on which server we are
function get_link(link_name)
{
	var fulllink = "";
	if (link_name.indexOf("http") == -1)
	{
		fulllink = wto_string + link_name;
	}
	else
	{
		fulllink = link_name;
	}
	
	return fulllink;
}

// function to display language links based on url of current page
function insert_language_links()
{
// initialise variables
	var language_link = "";
	var language1url = "";
	var language2url = "";
	var root_folder = false;
// only do if a WTO website page 
	if (wto_string == "")
	{
// if current page is home page
	if ((this_page.indexOf("/english/") == -1) && (this_page.indexOf("/french/") == -1) && (this_page.indexOf("/spanish/") == -1))
	{
		root_folder = true;
	}
//		if ((this_page.indexOf(home_page[0]) != -1) || (root_folder == true))
		if (root_folder == true)
		{
			language1url = home_page[1];
			language2url = home_page[2];
		}
		else
// current page is not home page
		{
			switch (bnr_this_language[0]) {
				case "/english/":
					language1url = this_page.replace("/english/", bnr_language1[1]);
					language1url = language1url.replace(/_e\//g, bnr_language1[2])
					language1url = language1url.replace("_e.", bnr_language1[3])
					language2url = this_page.replace("/english/", bnr_language2[1]);
					language2url = language2url.replace(/_e\//g, bnr_language2[2])
					language2url = language2url.replace("_e.", bnr_language2[3])
					break;
				case "/french/":
					language1url = this_page.replace("/french/", bnr_language1[1]);
					language1url = language1url.replace(/_f\//g, bnr_language1[2])
					language1url = language1url.replace("_f.", bnr_language1[3])
					language2url = this_page.replace("/french/", bnr_language2[1]);
					language2url = language2url.replace(/_f\//g, bnr_language2[2])
					language2url = language2url.replace("_f.", bnr_language2[3])
					break;
				case "/spanish/":
					language1url = this_page.replace("/spanish/", bnr_language1[1]);
					language1url = language1url.replace(/_s\//g, bnr_language1[2])
					language1url = language1url.replace("_s.", bnr_language1[3])
					language2url = this_page.replace("/spanish/", bnr_language2[1]);
					language2url = language2url.replace(/_s\//g, bnr_language2[2])
					language2url = language2url.replace("_s.", bnr_language2[3])
					break;
			}
		}
// build links
		language_link = "<a href=\"" + language1url + "\" class=\"bannertoptext\">" + bnr_language1[0] + "</a>&nbsp;|&nbsp;<a href=\"" + language2url + "\" class=\"bannertoptext\">" + bnr_language2[0] + "</a>";
	}
	return language_link;
}
// function to open a resizable window with vertical scroll bar
function openAWindow(pageToLoad, winName, lbwidth, lbheight, center)
{
	var lightbox = document.getElementById('lightbox');
	var lightboxlayer = "";
	var framewidth = 0;
	var frameheight = 100;
	var tabletop = 0;
	var tableleft = 0;
	var showscroll = "auto";
	if (lbwidth > page_width)
	{
		tableleft = 2;
		framewidth = page_width - 20;
	}
	else
	{
		framewidth = lbwidth;
		tableleft = (page_width/2) - (lbwidth/2) - 7;
	}
	if (lbheight > page_height)
	{
		tabletop = 2;
		frameheight = page_height - 50;
	}
	else
	{
		frameheight = lbheight;
		tabletop = (page_height/2) - (lbheight/2) - 20;
	}
		
	lightboxlayer = "<table cellpadding=\"0\" cellspacing=\"0\" align=\"center\" valign=\"top\" style=\"position:fixed; top:" + tabletop + "px; left:" + tableleft + "px \"><tr><td class=\"maintbltl\"></td><td class=\"maintbltop\"></td><td class=\"maintbltr\"></td></tr>";
	lightboxlayer += "<tr><td class=\"maintblleft\"></td><td class=\"maintblmiddle\"><p class=\"strippedsmalltext\" align=\"right\"><a id=\"closelink\" href=\"javascript:hideLightBox()\"  class=\"parasmallboldtext\" tabindex=\"0\">" + close_text + "&nbsp; X</a></p>";
	lightboxlayer += "<iframe id=\"lightboxpage\" frameborder=\"0\" vspace=\"0\" hspace=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"" + framewidth + "px\" height=\"" + frameheight + "px\" src=\"" + pageToLoad + "\" scrolling=\"" + showscroll + "\" style=\"overflow:visible\"></iframe>";
	lightboxlayer += "</td><td class=\"maintblright\"></td></tr>";
	lightboxlayer += "<tr><td class=\"maintblbl\"></td><td class=\"maintblbot\"></td><td class=\"maintblbr\"></td></tr></table>";
	lightbox.innerHTML = lightboxlayer;
	lightbox.style.height = page_height;
	lightbox.style.width = page_width;
	lightbox.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	lightbox.style.visibility = "visible";
	if (old_browser == true)
	{
		lightbox.style.position = absolute;
	}
	lightbox.focus();
	var closelink = document.getElementById('closelink');
} 

// function to open a resizable window without a scroll bar
function openAPopup(pageToLoad, winName, lbwidth, lbheight, center)
{
	var lightbox = document.getElementById('lightbox');
	var lightboxlayer = "";
	var framewidth = 0;
	var frameheight = 100;
	var tabletop = 0;
	var tableleft = 0;
	var showscroll = "auto";
	if (lbwidth > page_width)
	{
		tableleft = 2;
		framewidth = page_width - 20;
	}
	else
	{
		framewidth = lbwidth;
		tableleft = (page_width/2) - (lbwidth/2) - 7;
	}
	if (lbheight > page_height)
	{
		tabletop = 2;
		frameheight = page_height - 50;
		showscroll = "yes";
		if (framewidth < (page_width - 20))
		{
			framewidth += 20;
		}
	}
	else
	{
		frameheight = lbheight;
		tabletop = (page_height/2) - (lbheight/2) - 20;
	}
		
	lightboxlayer = "<div style=\"position:fixed; top:" + tabletop + "px; left:" + tableleft + "px \"><table cellpadding=\"0\" cellspacing=\"0\" align=\"center\" valign=\"top\"><tr><td class=\"maintbltl\"></td><td class=\"maintbltop\"></td><td class=\"maintbltr\"></td></tr>";
	lightboxlayer += "<tr><td class=\"maintblleft\"></td><td class=\"maintblmiddle\"><p class=\"strippedsmalltext\" align=\"right\"><a id=\"closelink\" href=\"javascript:hideLightBox()\"  class=\"parasmallboldtext\" tabindex=\"0\">" + close_text + "&nbsp; X</a></p>";
	lightboxlayer += "<iframe id=\"lightboxpage\" frameborder=\"0\" vspace=\"0\" hspace=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"" + framewidth + "px\" height=\"" + frameheight + "px\" src=\"" + pageToLoad + "\" scrolling=\"" + showscroll + "\" style=\"overflow:visible\"></iframe>";
	lightboxlayer += "</td><td class=\"maintblright\"></td></tr>";
	lightboxlayer += "<tr><td class=\"maintblbl\"></td><td class=\"maintblbot\"></td><td class=\"maintblbr\"></td></tr></table></div>";
	lightbox.innerHTML = lightboxlayer;
	lightbox.style.height = page_height;
	lightbox.style.width = page_width;
	lightbox.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	lightbox.style.visibility = "visible";
	if (old_browser == true)
	{
		lightbox.style.position = absolute;
	}
	lightbox.focus();
	var closelink = document.getElementById('closelink');
}

function hideLightBox()
{
	var lightbox = document.getElementById("lightbox");
	lightbox.innerHTML = "";
	lightbox.style.visibility = "hidden";
}

function flickrSearch()
{
	var flickrSearchString = document.flickrform.elements["search_string"].value;	
	if (flickrSearchString == "")
	{
		alert("Please enter search string");
	}
	else
	{
		flickrSearchString += " and MC8";
		window.location = "http://www.flickr.com/search/?w=47180203@N08&q=" + encodeURI(flickrSearchString);
	}
}

function photoSearch()
{
	var popupURL = "";
	var flickrSearchString = document.flickrform.elements["search_string"].value;	
	if (flickrSearchString == "")
	{
		alert("Please enter search string");
	}
	else
	{
		//flickrSearchString += ",MC8";
		window.location = "/english/res_e/photo_gallery_e/photo_gallery_test_e.htm?searchtag=" + encodeURI(flickrSearchString);
	//	popupURL = "http://workingserver/library/_test_ludo/twelve/janes_test.htm?searchtag=" + encodeURI(flickrSearchString);
	//	openAPopup(popupURL,'links',810,740,1);
	}
}

function photo2Search()
{
	var popupURL = "";
	var flickrSearchString = document.flickr2form.elements["search_string"].value;	
	if (flickrSearchString == "")
	{
		alert("Please enter search string");
	}
	else
	{
		//flickrSearchString += ",MC8";
	//	window.location = "/english/res_e/photo_gallery_e/photo_gallery_test_e.htm?searchtag=" + encodeURI(flickrSearchString);
		popupURL = "http://workingserver/library/_test_ludo/twelve/janes_test.htm?searchtag=" + encodeURI(flickrSearchString);
		openAPopup(popupURL,'links',810,670,1);
	}
}

//end


