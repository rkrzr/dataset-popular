//***********************************************************************
//* APPLICATION	: WTO Web Site
//* COMPONENT	: 
//* PAGE		: 
//* CREATION	: 24/02/2006
//* AUTHOR		: Jane M Pickett
//* CONTENT		: Functions for displaying news items
//*		
//***********************************************************************
//* UPDATES		:
//*
//***********************************************************************

var sorted_news = new Array();
var i = 0;
var j = 0;
var k = 0;
var l = 0;
var cnt = 0;
var popup_width = 0;
var popup_height = 0;
var thbnl_array = new Array();
var language = 1;
var year = "";
var lc_page_name = location.href.toLowerCase();
var path_start = lc_page_name.indexOf("/english/");
var lc_root_path = lc_page_name.slice(path_start);
var ministerials_array = new Array();  // array for drop down list of ministerial meetings and their DOL symbol
	ministerials_array[0] = ["Choose conference...", "", "both"];
	ministerials_array[1] = ["All conferences during Doha Round", "(@meta_Title (Fourth Session) OR (Fifth Session) OR (Sixth Session) OR (Seventh Session))", "dda"];
	ministerials_array[2] = ["1996: Singapore", "(@meta_Meet_Date 09/12/1996) & (@meta_Title Singapore)", ""];
	ministerials_array[3] = ["1998: Geneva", "(@meta_Meet_Date 18/05/1998)", ""];
	ministerials_array[4] = ["1999: Seattle", "(@meta_Meet_Date 30/11/1999) & (@meta_Title Seattle)", ""];
	ministerials_array[5] = ["2001: Doha", "(@meta_Title Fourth Session)", "dda"];
	ministerials_array[6] = ["2003: Cancún", "(@meta_Title Fifth Session)", "dda"];
	ministerials_array[7] = ["2005: Hong Kong", "(@meta_Title Sixth Session)", "dda"];
	ministerials_array[8] = ["2009: Geneva", "(@meta_Title Seventh Session)", "dda"];
	

var marked_news_array = new Array();
	marked_news_array[1] = { headline: "", introduction: "", image: "", url: "", extension: "", date: "" };
	marked_news_array[2] = { headline: "", introduction: "", image: "", url: "", extension: "", date: "" };
	marked_news_array[3] = { headline: "", introduction: "", image: "", url: "", extension: "", date: "" };

var temp_array = new Array();
	
function loadNews()
{
	var text_length = 0;
	var last_blank = 0;
	var arrow_image = "white_arrow.png";
	if (old_browser == true)
	{
		arrow_image = "white_arrow.gif";
	}
	for (i = 0; i < news_item.length; i++)
	{
// item is not embargoed, position 1 or excluded from news page 
		if ((news_item[i] !== not_defined) && (news_item[i].ni_embargo == "") && (news_item[i].ni_pos != "") && (news_item[i].ni_pos != "0") && (news_item[i].ni_pos < "4"))
		{
			marked_news_array[news_item[i].ni_pos].headline = news_item[i].ni_head;
			text_length = news_item[i].ni_head.length;
			if (text_length > 105)
			{
				marked_news_array[news_item[i].ni_pos].headline = news_item[i].ni_head.substr(0, 105);
				last_blank = marked_news_array[news_item[i].ni_pos].headline.lastIndexOf(" ");
				marked_news_array[news_item[i].ni_pos].headline = marked_news_array[news_item[i].ni_pos].headline.substr(0, last_blank) + "..."
			}
			marked_news_array[news_item[i].ni_pos].introduction = news_item[i].ni_intro;
			marked_news_array[news_item[i].ni_pos].date = news_item[i].ni_date;
			if (news_item[i].ni_image != "")
			{
				temp_array = news_item[i].ni_image.split(".");
				if (temp_array.length == 2)
				{
					marked_news_array[news_item[i].ni_pos].image = temp_array[0];
					marked_news_array[news_item[i].ni_pos].extension = temp_array[1];
				}
			}
			else
			{
				switch (news_item[i].ni_pos){
					case "1": 
						marked_news_array[news_item[i].ni_pos].image = "/images/img_index/news1_default";
						break;
					case "2": 
						marked_news_array[news_item[i].ni_pos].image = "/images/img_index/news2_default";
						break;
					case "3": 
						marked_news_array[news_item[i].ni_pos].image = "/images/img_index/news3_default";
						break;
				}
				marked_news_array[news_item[i].ni_pos].extension = "jpg";
			}
			if (news_item[i].ni_links[0].nl_url.substr(news_item[i].ni_links[0].nl_url.length - 3, 3).toLowerCase() == "htm")
			{
				marked_news_array[news_item[i].ni_pos].url = news_item[i].ni_links[0].nl_url;
			}
			else
			{
				marked_news_array[news_item[i].ni_pos].url = "/english/news_e/news_e.htm#bkmk" + i;
			}
		}
	}
	mainnews.style.backgroundImage = "url(" + marked_news_array[1].image + "." + marked_news_array[1].extension + ")";
	mainnewsintrocell.style.backgroundImage = "url()";
	mainnewslinkcell.style.backgroundImage = "url()";
	mainnewsleftcell.style.backgroundImage = "url()";
	mainnewsbottomleftcell.style.backgroundImage = "url()";
	mainnewsbottomrightcell.style.backgroundImage = "url()";
	mainnewsbottomcorner.style.backgroundImage = "url()";
	mainnewsheadline.innerHTML = marked_news_array[1].headline;
	mainnewsintro.innerHTML = "";
	mainnewslink.href = marked_news_array[1].url;
	news1link.href = marked_news_array[1].url;
	news2link.href = marked_news_array[2].url;
	news3link.href = marked_news_array[3].url;
	news1link.innerHTML = marked_news_array[1].headline;
	news2link.innerHTML = marked_news_array[2].headline;
	news3link.innerHTML = marked_news_array[3].headline;
	news1cell.style.backgroundImage = "url(" + marked_news_array[1].image + "_smlbw." + marked_news_array[1].extension + ")";
	news2cell.style.backgroundImage = "url(" + marked_news_array[2].image + "_sml." + marked_news_array[2].extension + ")";
	news3cell.style.backgroundImage = "url(" + marked_news_array[3].image + "_sml." + marked_news_array[3].extension + ")";
	news1highlight.innerHTML = "<img src=\"/images/img_index/" + arrow_image + "\"  border=\"0\" style=\"height:67; width:17; vertical-align:middle\" alt=\"\"/>";
	currentitem = 1;
	
}

function showIntro(thisitem)
{
	var text_length = marked_news_array[thisitem].introduction.length;
	var last_blank = 0;
	showintrotext = true;
	if (text_length > 300)
	{
		mainnewsintro.innerHTML = marked_news_array[thisitem].introduction.substr(0, 300);
		last_blank = mainnewsintro.innerHTML.lastIndexOf(" ");
		mainnewsintro.innerHTML = mainnewsintro.innerHTML.substr(0, last_blank) + "..." + "&nbsp; <span class=\"headlinedate\">(" + marked_news_array[thisitem].date.slice(8, 10) + "/" + marked_news_array[thisitem].date.slice(5, 7) + "/" + marked_news_array[thisitem].date.slice(0, 4) + ")</span>";
	}
	else
	{
		mainnewsintro.innerHTML = marked_news_array[thisitem].introduction + "&nbsp; <span class=\"headlinedate\">(" + marked_news_array[thisitem].date.slice(8, 10) + "/" + marked_news_array[thisitem].date.slice(5, 7) + "/" + marked_news_array[thisitem].date.slice(0, 4) + ")</span>";
	}
	mainnewsintrocell.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	mainnewslinkcell.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	mainnewsleftcell.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	mainnewsbottomleftcell.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	mainnewsbottomrightcell.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	mainnewsbottomcorner.style.backgroundImage = "url(/images/img_borders/grey_layer.png)";
	mainnews.style.cursor = "pointer";

}

function hideIntro()
{
	showintrotext = false;
	mainnewsintro.innerHTML = "";
	mainnewsintrocell.style.backgroundImage = "url()";
	mainnewslinkcell.style.backgroundImage = "url()";
	mainnewsleftcell.style.backgroundImage = "url()";
	mainnewsbottomleftcell.style.backgroundImage = "url()";
	mainnewsbottomrightcell.style.backgroundImage = "url()";
	mainnewsbottomcorner.style.backgroundImage = "url()";

}
function goToNews()
{
	window.location = mainnewslink.href;
}

function changeNews(thisitem)
{
	var arrow_image = "white_arrow.png";
	if (old_browser == true)
	{
		arrow_image = "white_arrow.gif";
	}
	if (currentitem != 0)
	{
		if (thisitem != 0)
		{ 
			currentitem = thisitem;
			showintrotext = true;
		}
	switch (currentitem){
		case 1:
			mainnews.style.backgroundImage = "url(" + marked_news_array[2].image + "." + marked_news_array[2].extension + ")";
			mainnewsheadline.innerHTML = "<span class=\"news1headlinetext\">" + marked_news_array[2].headline + "</span>";
			mainnewslink.href = marked_news_array[2].url;
			news1cell.style.backgroundImage = "url(" + marked_news_array[1].image + "_sml." + marked_news_array[1].extension + ")";
			news2cell.style.backgroundImage = "url(" + marked_news_array[2].image + "_smlbw." + marked_news_array[2].extension + ")";
			news1highlight.innerHTML = "";
			news3highlight.innerHTML = "";
			news2highlight.innerHTML = "<img src=\"/images/img_index/" + arrow_image + "\"  border=\"0\" style=\"height:67; width:17; vertical-align:middle\"  alt=\"\"/>";
			if (showintrotext == true)
			{
				showIntro(2);
			}
			currentitem = 2;
			break;
		
		case 2:
			mainnews.style.backgroundImage = "url(" + marked_news_array[3].image + "." + marked_news_array[3].extension + ")";
			mainnewsheadline.innerHTML = "<span class=\"news1headlinetext\">" + marked_news_array[3].headline + "</span>";
			mainnewslink.href = marked_news_array[3].url;
			news2cell.style.backgroundImage = "url(" + marked_news_array[2].image + "_sml." + marked_news_array[2].extension + ")";
			news3cell.style.backgroundImage = "url(" + marked_news_array[3].image + "_smlbw." + marked_news_array[3].extension + ")";
			news2highlight.innerHTML = "";
			news1highlight.innerHTML = "";
			news3highlight.innerHTML = "<img src=\"/images/img_index/" + arrow_image + "\"  border=\"0\" style=\"height:67; width:17; vertical-align:middle\"  alt=\"\"/>";
			if (showintrotext == true)
			{
				showIntro(3);
			}
			currentitem = 3;
			break;
		
		case 3:
			mainnews.style.backgroundImage = "url(" + marked_news_array[1].image + "." + marked_news_array[1].extension + ")";
			mainnewsheadline.innerHTML = "<span class=\"news1headlinetext\">" + marked_news_array[1].headline + "</span>";
			mainnewslink.href = marked_news_array[1].url;
			news3cell.style.backgroundImage = "url(" + marked_news_array[3].image + "_sml." + marked_news_array[3].extension + ")";
			news1cell.style.backgroundImage = "url(" + marked_news_array[1].image + "_smlbw." + marked_news_array[1].extension + ")";
			news3highlight.innerHTML = "";
			news2highlight.innerHTML = "";
			news1highlight.innerHTML = "<img src=\"/images/img_index/" + arrow_image + "\"  border=\"0\" style=\"height:67; width:17; vertical-align:middle\"  alt=\"\"/>";
			if (showintrotext == true)
			{
				showIntro(1);
			}
			currentitem = 1;
			break;
	}
	}
}

//-->

