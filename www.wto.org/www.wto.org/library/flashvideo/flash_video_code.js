// Loads new flash player with parameters & video into layer LUDOOOO
function loadFlashPlayer(autostart, video_format)
{
	var player_height = "384";


	if (video_exists == true)
	{
		if (video_format == "W")
		{
			player_height = "384";
		}
		
			jwplayer("mediaspace").setup({
			'id': 'playerID',
			'width': '640', 
			'height': player_height,
			//'backcolor':'000000',
			//'frontcolor':'ffffff',
			//'config': 'config_LUDO.xml',
			'file': "http://WTO.http.internapcdn.net/WTO/flash/" + video_filename + ".flv",
			'image': "http://WTO.http.internapcdn.net/WTO/flash/" + video_filename + ".jpg",
			'controlbar.position': 'bottom',
			'dock': "false",
			'autostart': autostart,
			'provider': 'video',
			'plugins': {
'hd-2': {file: 'http://WTO.http.internapcdn.net/WTO/flash/' + video_filename + ".mp4"}
},
			'modes': [
		{type: 'flash', src: '/library/flashvideo/player.swf'},
        {
          type: 'html5',
          config: {
           'file': 'http://WTO.http.internapcdn.net/WTO/flash/' + video_filename + ".mp4",
           'provider': 'video',
		   levels: [  
            { file: 'http://WTO.http.internapcdn.net/WTO/flash/' + video_filename + ".mp4" },    // H.264 version  
            { file: 'http://WTO.http.internapcdn.net/WTO/flash/' + video_filename + ".mp4" },    // WebM version  
            { file: 'http://WTO.http.internapcdn.net/WTO/flash/' + video_filename + ".mp4" }     // Ogg Theora version  
        ]  

          }
        },
		
		
        {
          type: 'download',
          config: {
           'file': 'http://WTO.http.internapcdn.net/WTO/flash/' + video_filename + ".mp4",
           'provider': 'video'
          }
        }
    ]
			
		});

		}
	else
// no valid video - display message
	{
		var video_cell = document.getElementById("mediaspace");
		video_cell.innerHTML = invalid_video;	
	}

}



// displays tabs at top of column with selected one highlighted
function displayTabs(num_items, row_cells, popup, showall)
{
	var latest_tab = document.getElementById("latest");
	var news_tab = document.getElementById("news");
	var subject_tab = document.getElementById("subject");
	switch(video_type){
		case "latest":
			latest_tab.src = "/images/img_webcast/latest_orange_" + wto_language + ".gif";
			news_tab.src = "/images/img_webcast/news_green_" + wto_language + ".gif";
			subject_tab.src = "/images/img_webcast/subject_green_" + wto_language + ".gif";
			loadList(num_items, row_cells, popup,  "strippedsmalltext", "parasmallboldcolourtext", "smallgreaterlistitem", "latest", false, showall, "videolist", "");
			break;
			
		case "news":
			latest_tab.src = "/images/img_webcast/latest_green_" + wto_language + ".gif";
			news_tab.src = "/images/img_webcast/news_orange_" + wto_language + ".gif";
			subject_tab.src = "/images/img_webcast/subject_green_" + wto_language + ".gif";
			loadList(num_items, row_cells, popup,  "strippedsmalltext", "parasmallboldcolourtext", "smallgreaterlistitem", "news", false, showall, "videolist", "");
			break;
			
		case "subject":
			latest_tab.src = "/images/img_webcast/latest_green_" + wto_language + ".gif";
			news_tab.src = "/images/img_webcast/news_green_" + wto_language + ".gif";
			subject_tab.src = "/images/img_webcast/subject_orange_" + wto_language + ".gif";
			loadList(num_items, row_cells, popup,  "strippedsmalltext", "parasmallboldcolourtext", "smallgreaterlistitem", "subject", false, showall, "videolist", "");
			break;
			
		case "all_subjects":
			latest_tab.src = "/images/img_webcast/latest_green_" + wto_language + ".gif";
			news_tab.src = "/images/img_webcast/news_green_" + wto_language + ".gif";
			subject_tab.src = "/images/img_webcast/subject_orange_" + wto_language + ".gif";
			loadList(10000, row_cells, popup,  "strippedsmalltext", "parasmallboldcolourtext", "smallgreaterlistitem", "all_subjects", false, showall, "videolist", "");
			break;

	}
}


// selects & sorts videos for tab highlighted & displays them in a list
function loadList(num_items, row_cells, popup, plaintext, colourtext, listtext, video_type, separator, showall, tablename, subject_type)
{		
	var sorted_videos = new Array();
	var temp_subject = new Array();
	var list_subjects = new Array();
	var h = 0;
	var j = 0;
	var mytbl = document.getElementById(tablename);
	var lastrow = mytbl.rows.length;
	var subject_found = false;
// clear any existing rows in the list
	if (lastrow > 0)
	{
		for (i = 1; i <= lastrow; i++)
		{
			mytbl.deleteRow(mytbl.rows.length - 1);
		}
	}

	for (i = 1; i < flash_video.length; i++)
	{
		if (flash_video[i].fv_selected != "0")
		{
		switch(video_type){
			case "latest":
				sorted_videos[sorted_videos.length] = ["", flash_video[i].fv_date, i];
				break;
			
			case "news":
				if (flash_video[i].fv_news_id != "")
				{
					sorted_videos[sorted_videos.length] = ["", flash_video[i].fv_date, i];
				}
				break;
			case "subject":
			case "all_subjects":
				if (flash_video[i].fv_subjects != "")
				{
					temp_subject = flash_video[i].fv_subjects.split("#");
					for (h = 0; h < temp_subject.length; h++)
					{
						sorted_videos[sorted_videos.length] = [temp_subject[h], flash_video[i].fv_date, i];	
						subject_found = false;
						for (j = 0; j < list_subjects.length; j++)
						{
							if (list_subjects[j][1] == temp_subject[h])
							{
								subject_found = true;
								break;
							}
						}
						if (subject_found == false)
						{
							for (j = 0; j < subject.length; j++)
							{
								if (subject[j].code == temp_subject[h])
								{
									list_subjects[list_subjects.length] = [subject[j].title.slice(0, 1).toUpperCase() + subject[j].title.slice(1), subject[j].code];
									break;
								}
							}
							
						}
					}
				}
				break;
			case "selected_subject":
				if (flash_video[i].fv_subjects != "")
				{
					temp_subject = flash_video[i].fv_subjects.split("#");
					for (h = 0; h < temp_subject.length; h++)
					{
						if (temp_subject[h] == subject_type)
						{
							sorted_videos[sorted_videos.length] = [temp_subject[h], flash_video[i].fv_date, i];	
						}
					}
				}
				break;
		}
		}
	}

	sorted_videos.sort();
	if (list_subjects.length != 0)
	{
		list_subjects.sort();
	}
	switch(video_type){
		case "subject":
			merged_text = "";
			for (i = 0; i < list_subjects.length; i++)
			{
				merged_text += "<p class=\"smallgreaterlistitem\">&gt;&nbsp;<a class=\"parasmallcolourtext\" href=\"#video\" onClick=\"javascript: loadList(" + num_items + ", '" + row_cells + "', '" + popup + "', '" + plaintext + "', '" + colourtext + "', '" + listtext + "', 'selected_subject', '" + separator + "', '" + showall + "', '" + tablename + "', '" + list_subjects[i][1] + "')\">" + list_subjects[i][0] + "</a></p>";
			}
			addMergedRow("videolist", merged_text, row_cells, colourtext);
			break;

		case "selected_subject":
			for (h = 0; h < subject.length; h++)
			{
				if (subject[h].code == subject_type)
				{
					merged_text = "<h3 class=\"paraboldcolourtext\" align=\"left\"><a name=\"" + subject_type + "\"></a>&nbsp;<br>" + videos_on + subject[h].article + subject[h].title + "</h3>";
					addMergedRow("videolist", merged_text, row_cells, colourtext);
					break;
				}
			}
			showall = show_subject_list;
			list_videos(sorted_videos, video_type, subject_type, popup, colourtext, plaintext, num_items, row_cells, listtext)
			break;
		
		case "all_subjects":
			merged_text = "";
			for (i = 0; i < list_subjects.length; i++)
			{
				merged_text = "<h3 class=\"paraboldcolourtext\" align=\"left\"><a name=\"" + list_subjects[i][1].toLowerCase() + "\"></a>&nbsp;<br>" + list_subjects[i][0] + "&nbsp; <a class=\"parasmallgreytext\" href=\"#top\">" +  back_to_top + "</a></h3>";		
				addMergedRow("videolist", merged_text, row_cells, colourtext);
				list_videos(sorted_videos, video_type, list_subjects[i][1], popup, colourtext, plaintext, num_items, row_cells, listtext)
			}
			break;
			
		case "latest":
		case "news":
			list_videos(sorted_videos, video_type, subject_type, popup, colourtext, plaintext, num_items, row_cells, listtext)
			break;
	}
			
	if (showall != "")
	{ 
		if (video_type != "selected_subject")
		{
			merged_text = "<p class=\"" + plaintext + "\" align=\"right\">&gt;&nbsp;<a href=\"" + grid_page + "?video_type=" + video_type + "\" target=\"_top\" class=\"" + colourtext + "\"><b>" + show_all_videos + "</b></a></p>";
		}
		else
		{
			merged_text = "<p class=\"" + plaintext + "\" align=\"right\">&gt;&nbsp;<a href=\"#top\" onClick=\"javascript:changeTab('subject', '" + num_items + "', '" + row_cells + "', '" + popup + "', '" + showall + "')\" class=\"" + colourtext + "\"><b>" + show_subject_list + "</b></a></p>";
		}				
			addMergedRow("videolist", merged_text, row_cells, colourtext);
	}
}



function list_videos(sorted_videos, video_type, subject_type, popup, colourtext, plaintext, num_items, row_cells, listtext)
{
	var cnt = 0;
	var j = 0;
	var i = 0;
	var link_url = "";
	var output_array = new Array();
	var people_array = new Array();
	var cellcnt = 0;
	var totalitems = 0;
	
	for (cnt = sorted_videos.length - 1; cnt >= 0; cnt--)
	{
		{
			if (sorted_videos[cnt][0] == subject_type)
			{
				if (popup == true)
				{
					link_url = "href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + sorted_videos[cnt][2] + "','links',675,750,1)\"";
				}
				else
				{
					link_url = "href=\"#video\" onClick=\"javascript:showVideo('" + sorted_videos[cnt][2] + "', true, '')\"";
				}

				output_array[cellcnt] = "<a " + link_url + " class=\"" + colourtext + "\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[sorted_videos[cnt][2]].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a>";
				output_array[cellcnt + 1] = "<h4 class=\"" + plaintext + "\"><a " + link_url + " class=\"" + colourtext + "\"";
				if (flash_video[sorted_videos[cnt][2]].fv_intro != "")
				{
					output_array[cellcnt + 1] += " onMouseOver=\"writetxt('";
					if ((flash_video[sorted_videos[cnt][2]].fv_debate_full_title != "") && (flash_video[sorted_videos[cnt][2]].fv_debate_full_title != flash_video[sorted_videos[cnt][2]].fv_title))
					{
						output_array[cellcnt + 1] += "<b>" + flash_video[sorted_videos[cnt][2]].fv_debate_full_title + "</b><br>";
					}
					output_array[cellcnt + 1] += flash_video[sorted_videos[cnt][2]].fv_intro + "')\" onMouseOut=\"writetxt(0)\"";
				}
				output_array[cellcnt + 1] += ">" + flash_video[sorted_videos[cnt][2]].fv_title + "</a></h4><p class=\"" +  listtext + "\">";
				if (flash_video[sorted_videos[cnt][2]].fv_people != "")
				{
					output_array[cellcnt + 1] += "&gt;&nbsp;";
					people_array = flash_video[sorted_videos[cnt][2]].fv_people.split("#");
					for (j = 0; j < people_array.length; j++)
					{
						output_array[cellcnt + 1] += people_array[j];
						if (j < people_array.length - 2)
						{
							output_array[cellcnt + 1] += ", ";
						}
						else if (j == people_array.length - 2)
						{
							output_array[cellcnt + 1] += and_text;
						}
					}
				}
				output_array[cellcnt + 1] += " <span class=\"parasmallgreytext\">(" + flash_video[sorted_videos[cnt][2]].fv_length + ")";
				if (flash_video[sorted_videos[cnt][2]].fv_video_lang != "0")
				{
					output_array[cellcnt + 1] += "(" + language_text_array[flash_video[sorted_videos[cnt][2]].fv_video_lang] + ")";
				}
				if (flash_video[sorted_videos[cnt][2]].fv_date != "")
				{
					output_array[cellcnt + 1] += "<br>" + flash_video[sorted_videos[cnt][2]].fv_date.slice(8, 10) + "/" + flash_video[sorted_videos[cnt][2]].fv_date.slice(5, 7) + "/" + flash_video[sorted_videos[cnt][2]].fv_date.slice(0, 4) + "</span>";
				}
				output_array[cellcnt + 1] += "</p>";
				output_array[cellcnt + 2] = blank_column;
				cellcnt = cellcnt + 3;
				if ((cnt == num_items) || (i == 1))
				{
					for (j = cellcnt; j < row_cells; j++)
					{
						output_array[cellcnt] = " ";
						cellcnt++;
					}
				}
				if (cellcnt >= row_cells)
				{
					addRow("videolist", output_array, plaintext);
					if (row_cells > 3)
					{
						addMergedRow("videolist", "&nbsp;", row_cells, colourtext);						
					}
					cellcnt = 0;
				}
				totalitems += 1;
				if (totalitems >= num_items)
				{
					break;
				}
			}
		}

	}
	if (cellcnt < row_cells)
	{
		for (j = cellcnt; j < row_cells; j++)
		{
			output_array[cellcnt] = " ";
			cellcnt++;
		}
		addRow("videolist", output_array, plaintext);
		if (row_cells > 3)
		{
			addMergedRow("videolist", "&nbsp;", row_cells, colourtext);						
		}
		cellcnt = 0;
	}

}


// process a click on a tab to highlight it & call function to 
function changeTab(tab, num_items, row_cells, popup, showall)
{
	video_type = tab;
	displayTabs(num_items, row_cells, popup, showall);
	return false;
}



// get the id of the video to show & call function to display it & its details
function getVideoToShow()
{
	var video_type = "";
	var text_string = "";
	var subject_links = "";
	var text_cell = document.getElementById("text");
	if (video_filename == "")
	{
		for (i = flash_video.length - 1; i >=0; i--)
		{
			if (flash_video[i].fv_selected == "X")
			{
				video_filename = flash_video[i].fv_video_url;
				showVideo(i, false, "");
				break;
			}
		}
	}
}

// display video & its associated details
function showVideo(array_id, autostart, display)
{
	var text_string = "";
	var subject_links = "";
	var people_array = new Array();
	var people_text = "";
	var transcript = "";
	var subject_link_array = new Array();
	var country_links = "";
	var country_links_array = new Array();
	var end_url_array = new Array();;
	var new_page = "";
	var start_url = "";
	var text_cell = document.getElementById("text");
	var mp4_link = document.getElementById("mp4");
	var wmv_link = document.getElementById("wmv");
	var mpeg2_link = document.getElementById("mpeg2");
	var callout = "";
	if (flash_video[array_id] !== not_defined)
	{
		video_filename = flash_video[array_id].fv_video_url;
		if (flash_video[array_id].fv_people != "")
		{
			people_text = "<p class=\"greaterlistitem\"><b>&gt;&nbsp;";
			people_array = flash_video[array_id].fv_people.split("#");
			for (j = 0; j < people_array.length; j++)
			{
				people_text += people_array[j];
				if (j < people_array.length - 2)
				{
					people_text += ", ";
				}
				else if (j == people_array.length - 2)
				{
					people_text += and_text;
				}
			}
			people_text += "</b></p>";
		}
		if (flash_video[array_id].fv_transcript != "")
		{
			callout = "";
			end_url_array = flash_video[array_id].fv_transcript.split(".");
			for (j = 0; j < document_type_array.length; j++)
			{
				if (document_type_array[j][0] == end_url_array[1])
				{
					callout = document_type_array[j][1];
					break;
				}
			}
			callout += " " + new_window_text;
			if (flash_video[array_id].fv_transcript_lang != "0")
			{
				if (callout != "")
				{
					callout += "; ";
				}
				callout += language_text_array[flash_video[array_id].fv_transcript_lang];
			}
			transcript = "<p class=\"greaterlistitem\">&gt;&nbsp;<a href=\"" + flash_video[array_id].fv_transcript + "\" class=\"paracolourtext\" target=\"blank\" onMouseOver=\"writetxt('" + callout + "')\" onMouseOut=\"writetxt(0)\">" + transcript_text + "</a></p>";			
		}

		if (display == "short")
		{
			text_string = people_text + transcript;
		}
		else
		{
			text_string = "<h2 class=\"subtitlecolourtext\"><span class=\"parasmallgreytext\">" + flash_video[array_id].fv_date.slice(8, 10) + "/" +flash_video[array_id].fv_date.slice(5, 7) + "/" + flash_video[array_id].fv_date.slice(0, 4) + "</span><br>";
			if (flash_video[array_id].fv_debate_full_title != "")
			{
				text_string += flash_video[array_id].fv_debate_full_title + "</h2>";
			}
			else
			{
				text_string += flash_video[array_id].fv_title + "</h2>";
			}
			if (flash_video[array_id].fv_intro != "")
			{
				text_string += "<p class=\"strippednormaltext\">" + flash_video[array_id].fv_intro + "</p>";
			}
			text_string += people_text;
			if (flash_video[array_id].fv_link_title != "")
			{
				callout = "";
				end_url_array = flash_video[array_id].fv_link_url.split(".");
				for (j = 0; j < document_type_array.length; j++)
				{
					if (document_type_array[j][0] == end_url_array[1])
					{
						callout = document_type_array[j][1];
						break;
					}
				}
				callout += " " + new_window_text;
				text_string += "<p class=\"greaterlistitem\">&gt;&nbsp;<a href=\"" + flash_video[array_id].fv_link_url + "\" class=\"paracolourtext\" target=\"blank\" onMouseOver=\"writetxt('" + callout + "')\" onMouseOut=\"writetxt(0)\">" + flash_video[array_id].fv_link_title + "</a></p>";			
			}
			text_string += transcript;
			if (flash_video[array_id].fv_subjects != "")
			{
				subject_link_array = flash_video[array_id].fv_subjects.split("#");
				for (j = 0; j < subject_link_array.length; j++)
				{
					for (k = 0; k < subject.length; k++)
					{
						if ((subject_link_array[j] == subject[k].code) && (subject[k].gateway != ""))
						{
							if (subject_links == "")
							{
								subject_links = "<p class=\"greaterlistitem\">&nbsp;</p><p class=\"greaterlistitem\"><span class=\"paraboldcolourtext\">" + see_also + "</span></p>";
							}
							subject_links += "<p class=\"greaterlistitem\">&gt;&nbsp;<a href=\"" + subject[k].gateway + "\" class=\"paracolourtext\" target=\"blank\" onMouseOver=\"writetxt('" + new_window_text + "')\" onMouseOut=\"writetxt(0)\">" + subject[k].title.slice(0, 1).toUpperCase() + subject[k].title.slice(1) + "</a></p>";
							break;
						}
					}
				}
				text_string += subject_links;
			}
			if (flash_video[array_id].fv_countries != "")
			{
				country_links_array = flash_video[array_id].fv_countries.split("#");
				for (j = 0; j < country_links_array.length; j++)
				{
					for (k = 0; k < country.length; k++)
					{
						if ((country_links_array[j] == country[k].code) && (country[k].page != ""))
						{
							country_links += "<p class=\"greaterlistitem\">&gt;&nbsp;<a href=\"" + country[k].page + "\" class=\"paracolourtext\" target=\"blank\" onMouseOver=\"writetxt('" + new_window_text + "')\" onMouseOut=\"writetxt(0)\">" + country[k].name.slice(0, 1).toUpperCase() + country[k].name.slice(1) + "</a></p>";
							break;
						}
					}
				}
				text_string += country_links;
			}
		}
		video_exists = true;
	}
	else
	{
		video_exists = false;
	}
	text_cell.innerHTML = text_string;
	mp4_link.href = "http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[array_id].fv_video_url + ".mp4";
	wmv_link.href = "http://WTO.http.internapcdn.net/WTO/wmv/" + flash_video[array_id].fv_video_url + ".wmv";
	mpeg2_link.href = "ftp://ftpbroadcast.wto.org/ftp-wtobroadcast/" + flash_video[array_id].fv_video_url + ".mpeg";
	loadFlashPlayer(autostart, flash_video[array_id].fv_video_format);
}


// display a list of video debates
function listDebates()
{
	var i = 0;
	var j = 0;
	var output_array = new Array();
	var people_array = new Array();
	var url_array = new Array();
	var filename_array = new Array();
// read backwards through array of videos
	for (i = flash_video.length - 1; i >= 0; i--)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_debate_id != "")
			{
				output_array[0] = "<a href=\"" + flash_video[i].fv_link_url + "\" ><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a>";
				output_array[1] = "<h4 class=\"subnormalboldcolourtext\"><a href=\"" + flash_video[i].fv_link_url + "\" class=\"paraboldcolourtext\"  onMouseOver=\"writetxt('" + flash_video[i].fv_intro + "')\" onMouseOut=\"writetxt(0)\">" + flash_video[i].fv_debate_full_title + "</a></h4>";
				
				if (flash_video[i].fv_people != "")
				{
					output_array[1] += "<p class=\"strippednormaltext\">";
					people_array = flash_video[i].fv_people.split("#");
					for (j = 0; j < people_array.length; j++)
					{
						output_array[1] += people_array[j];
						if (j < people_array.length - 2)
						{
							output_array[1] += ", ";
						}
						else if (j == people_array.length - 2)
						{
							output_array[1] += and_text;
						}
					}
				}
				output_array[1] += " <span class=\"parasmallgreytext\">(" + flash_video[i].fv_length + ")";
				if (flash_video[i].fv_date != "")
				{
					output_array[1] += "<br>" + flash_video[i].fv_date.slice(8, 10) + "/" + flash_video[i].fv_date.slice(5, 7) + "/" + flash_video[i].fv_date.slice(0, 4);
				}
				if (flash_video[i].fv_video_lang != "0")
				{
					output_array[1] += " (" + language_text_array[flash_video[i].fv_video_lang] + ")";
				}
				output_array[1] += "</span></p>";
				addRow("debatelist", output_array, "paranormaltext");
			}
		}
	}
}

// display a video for a debate & its associated details
function showDebate(array_id)
{
	var i = 0;
	var callout = "";
	var end_url = "";
	var text_string = "";
	var text_cell = document.getElementById("text");
	var mp4_link = document.getElementById("mp4");
	var wmv_link = document.getElementById("wmv");
	var mpeg2_link = document.getElementById("mpeg2");
	var language_message = document.getElementById("language_message");
	
	video_exists = false;
	for (i = flash_video.length - 1; i >= 0; i--)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_debate_id == array_id)
			{
				if (flash_video[i].fv_video_lang != "0")
				{
					language_message.innerHTML = "(" + language_text_array[flash_video[i].fv_video_lang] + ")";
				}
				if (flash_video[i].fv_transcript != "")
				{
					callout = "";
					end_url_array = flash_video[i].fv_transcript.split(".");
					for (j = 0; j < document_type_array.length; j++)
					{
						if (document_type_array[j][0] == end_url_array[1])
						{
							callout = document_type_array[j][1];
							break;
						}
					}
					callout += " " + new_window_text;
					if (flash_video[i].fv_transcript_lang != "0")
					{
						if (callout != "")
						{
							callout += "; ";
						}
						callout += language_text_array[flash_video[i].fv_transcript_lang];
					}
					text_string = "<p class=\"greaterlistitem\">&gt;&nbsp;<a class=\"paracolourtext\" href=\"" + flash_video[i].fv_transcript + "\" target=\"blank\" onMouseOver=\"writetxt('" + callout + "')\" onMouseOut=\"writetxt(0)\">" + transcript_text + "</a></p>";
				}
				video_exists = true;
				video_filename = flash_video[i].fv_video_url;
    			text_cell.innerHTML = text_string;
				mp4_link.href = "http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".mp4";
				wmv_link.href = "http://WTO.http.internapcdn.net/WTO/wmv/" + flash_video[i].fv_video_url + ".wmv";
				mpeg2_link.href = "ftp://ftpbroadcast.wto.org/ftp-wtobroadcast/" + flash_video[i].fv_video_url + ".mpeg";
				loadFlashPlayer(true, flash_video[i].fv_video_format);
				break;
			}
		}
	}
}


// display a video for a debate & its associated details
function insertVideo(array_id)
{
	var i = 0;
	var text_string = "";
	var text_cell = document.getElementById("text");
	var mp4_link = document.getElementById("mp4");
	var wmv_link = document.getElementById("wmv");
	var mpeg2_link = document.getElementById("mpeg2");
	
	video_exists = false;
	for (i = flash_video.length - 1; i >= 0; i--)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_id == array_id)
			{
				if (flash_video[i].fv_transcript != "")
				{
					text_string = "<p class=\"greaterlistitem\">&gt;&nbsp;<a class=\"paracolourtext\" href=\"" + flash_video[i].fv_transcript + "\">" + transcript_text + "</a></p>";
				}
				video_exists = true;
				video_filename = flash_video[i].fv_video_url;
    			text_cell.innerHTML = text_string;
				mp4_link.href = "http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".mp4";
				wmv_link.href = "http://WTO.http.internapcdn.net/WTO/wmv/" + flash_video[i].fv_video_url + ".wmv";
				mpeg2_link.href = "ftp://ftpbroadcast.wto.org/ftp-wtobroadcast/" + flash_video[i].fv_video_url + ".mpeg";
				loadFlashPlayer(true, flash_video[i].fv_video_format);
				break;
			}
		}
	}
	if (video_exists == false)
	{
		loadFlashPlayer(true, "");
	}
}
function insertStoppedVideo(array_id)
{
	var i = 0;
	var text_string = "";
	var text_cell = document.getElementById("text");
	var mp4_link = document.getElementById("mp4");
	var wmv_link = document.getElementById("wmv");
	var mpeg2_link = document.getElementById("mpeg2");
	
	video_exists = false;
	for (i = flash_video.length - 1; i >= 0; i--)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_id == array_id)
			{
				if (flash_video[i].fv_transcript != "")
				{
					text_string = "<p class=\"greaterlistitem\">&gt;&nbsp;<a class=\"paracolourtext\" href=\"" + flash_video[i].fv_transcript + "\">" + transcript_text + "</a></p>";
				}
				video_exists = true;
				video_filename = flash_video[i].fv_video_url;
    			text_cell.innerHTML = text_string;
				mp4_link.href = "http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".mp4";
				wmv_link.href = "http://WTO.http.internapcdn.net/WTO/wmv/" + flash_video[i].fv_video_url + ".wmv";
				mpeg2_link.href = "ftp://ftpbroadcast.wto.org/ftp-wtobroadcast/" + flash_video[i].fv_video_url + ".mpeg";
				loadFlashPlayer(false, flash_video[i].fv_video_format);
				break;
			}
		}
	}
	if (video_exists == false)
	{
		loadFlashPlayer(true, "");
	}
}

// lists all the videos related to a specific news id
function listNewsItemVideos(news_id)
{
	var flyout_text = "";
	var people_array = new Array();
	var people_text = "";
	var popup_height = 600;
	var output_string = "";
	for (i = 0; i < flash_video.length; i++)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_news_id == news_id)
			{
				if (flash_video[i].fv_video_format == "W")
				{
					popup_height = 485;
				}
				flyout_text = flash_video[i].fv_length + "; ";
				if (flash_video[i].fv_video_lang != "0")
				{
					flyout_text += language_text_array[flash_video[i].fv_video_lang] + "; ";
				}
				flyout_text += new_window_text;
				people_text = "";
				people_array = flash_video[i].fv_people.split("#");
				for (j = 0; j < people_array.length; j++)
				{
					people_text += people_array[j];
					if (j < people_array.length - 2)
					{
						people_text += ", ";
					}
					else if (j == people_array.length - 2)
					{
						people_text += and_text;
					}
				}
				if (people_text == "")
				{
					people_text = flash_video[i].fv_title;
				}
				if (output_string == "")
				{
					output_string += "<p class=\"parasmalltext\"><img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><span class=\"parasmallboldcolourtext\">" + video + "</span><br><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=short','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a><br>";
				}
				else
				{
					output_string += "<p class=\"parasmalltext\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=short','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a><br>";
				}
				output_string += "&gt;&nbsp;<a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=short','links', 675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + people_text + "</a></p>";
			}
		}
	}
	if (output_string != "")
	{
		document.writeln(output_string);
	}
}


// displays a link to a specific video, format controls how it is displayed, display controls how much info is shown in the popup
function listSpecificVideo(video_id, format, display)
{
	var flyout_text = "";
	var people_array = new Array();
	var people_text = "";
	var date_text = "";
	var popup_height = 750;
	
	for (i = 0; i < flash_video.length; i++)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_id == video_id)
			{
				flyout_text = flash_video[i].fv_length + "; ";
				if (flash_video[i].fv_video_lang != "0")
				{
					flyout_text += language_text_array[flash_video[i].fv_video_lang] + "; ";
				}
				flyout_text += new_window_text;
				if (flash_video[i].fv_video_format == "W")
				{
					popup_height = 680;
				}
				if (display == "short")
				{
					popup_height -= 194;
				}
				people_text = "";
				people_array = flash_video[i].fv_people.split("#");
				for (j = 0; j < people_array.length; j++)
				{
					people_text += people_array[j];
					if (j < people_array.length - 2)
					{
						people_text += ", ";
					}
					else if (j == people_array.length - 2)
					{
						people_text += and_text;
					}
				}
				if (people_text == "")
				{
					people_text = flash_video[i].fv_title;
				}
				if (flash_video[i].fv_date != "")
				{
					date_text = " <span class=\"parasmallgreytext\">(" + flash_video[i].fv_date.slice(8, 10) + "/" + flash_video[i].fv_date.slice(5, 7) + "/" + flash_video[i].fv_date.slice(0, 4) + ")</span>";
				}
				switch(format){
					case "small_right":
						document.write("<p class=\"parasmalltext\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',654," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a><br>");
						document.writeln("<img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + people_text + "</a></p>");
						break;
					case "small_right_text":
						document.writeln("<p class=\"parasmalltext\"><img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + people_text + "</a></p>");
						break;
					case "small_left":
						document.write("<p class=\"parasmalltext\" align=\"right\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',654," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a><br>");
						document.writeln("<img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + people_text + "</a>" + date_text + "</p>");
						break;
					case "small_left_title":
						document.write("<p class=\"parasmalltext\" align=\"right\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',654," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a><br>");
						document.writeln("<img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + flash_video[i].fv_title + "</a>" + date_text + "</p>");
						break;
					case "centre_table":
						document.write("<table width=\"100%\"><tr><td valign=\"top\" width=\"100\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',654," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a></td>");
						document.writeln("<td valign=\"top\"><img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"paracolourtext\">" + people_text + "</a> </td></tr></table>");
						break;
					case "centre_text_only":
						document.write("<p class=\"greaterlistitem\"><img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"paracolourtext\">" + people_text + "</a></p>");
						break;
					case "centre_full_description":
						document.write("<table width=\"100%\"><tr><td valign=\"top\" width=\"100\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a></td>");
						document.writeln("<td valign=\"top\"><p class=\"strippednormaltext\"><b>" + flash_video[i].fv_title + "</b></p><p class=\"strippednormaltext\">" + flash_video[i].fv_intro + "<br>&nbsp;&nbsp;</p> </td></tr></table>");
						break;
				}
				break;
			}
		}
	}
}


function listLatestVideo()
{
	var flyout_text = "";
	var people_array = new Array();
	var sorted_video = new Array();
	var people_text = "";
	var popup_height = 750;
	
	for (i = flash_video.length - 1; i >= 0; i--)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_date != "")
			{
				sorted_video[sorted_video.length] = [flash_video[i].fv_date, i];
			}
		}
	}
	sorted_video.sort();
	flyout_text = flash_video[sorted_video[sorted_video.length-1][1]].fv_length + "; ";
	if (flash_video[sorted_video[sorted_video.length-1][1]].fv_video_lang != "0")
	{
		flyout_text += language_text_array[flash_video[sorted_video[sorted_video.length-1][1]].fv_video_lang] + "; ";
	}
	flyout_text += new_window_text;
	people_text = "";
	people_array = flash_video[sorted_video[sorted_video.length-1][1]].fv_people.split("#");
	for (j = 0; j < people_array.length; j++)
	{
		people_text += people_array[j];
		if (j < people_array.length - 2)
		{
			people_text += ", ";
		}
		else if (j == people_array.length - 2)
		{
			people_text += and_text;
		}
	}
	document.write("<p class=\"parasmallcolourtext\"><b>" + latest_video + "</b><br><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[sorted_video[sorted_video.length-1][1]].fv_id + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[sorted_video[sorted_video.length-1][1]].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a><br>");
	document.write(flash_video[sorted_video[sorted_video.length-1][1]].fv_date.slice(8, 10) + "." + flash_video[sorted_video[sorted_video.length-1][1]].fv_date.slice(5, 7) + "." + flash_video[sorted_video[sorted_video.length-1][1]].fv_date.slice(0, 4) + ": " + flash_video[sorted_video[sorted_video.length-1][1]].fv_title + "<br>");
	document.writeln("<img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[sorted_video[sorted_video.length-1][1]].fv_id + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + people_text + "</a></p>");
}

function listFeaturedVideo()
{
	var flyout_text = "";
	var people_array = new Array();
	var people_text = "";
	var popup_height = 750;
	for (i = 0; i < flash_video.length; i++)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_selected == "X")
			{
				flyout_text = flash_video[i].fv_length + "; ";
				if (flash_video[i].fv_video_lang != "0")
				{
					flyout_text += language_text_array[flash_video[i].fv_video_lang] + "; ";
				}
				flyout_text += new_window_text;
				people_text = "";
				people_array = flash_video[i].fv_people.split("#");
				for (j = 0; j < people_array.length; j++)
				{
					people_text += people_array[j];
					if (j < people_array.length - 2)
					{
						people_text += ", ";
					}
					else if (j == people_array.length - 2)
					{
						people_text += and_text;
					}
				}
						document.write("<p class=\"parasmallcolourtext\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\"><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"100\"></a><br>");
						document.write(flash_video[i].fv_date.slice(8, 10) + "." + flash_video[i].fv_date.slice(5, 7) + "." + flash_video[i].fv_date.slice(0, 4) + ": " + flash_video[i].fv_title + "<br>");
						document.writeln("<img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + people_text + "</a></p>");
				break;
			}
		}
	}
}

function listSubjectVideo(subject, style, number)
{
	var flyout_text = "";
	var date_text = "";
	var selected_videos = new Array();
	var subject_array = new Array();
	var cnt = 0;
	var popup_height = 750;
	for (i = 1; i < flash_video.length; i++)
	{
		subject_array = flash_video[i].fv_gateway_subjects.split("#");
		for (j = 0; j < subject_array.length; j++)
		{
			if (subject_array[j] == subject)
			{
				selected_videos[selected_videos.length] = [flash_video[i].fv_date, i];
				break;
			}
		}
	}
	selected_videos.sort();
	for (i = selected_videos.length - 1; i >= 0; i--)
	{
		if (cnt == number)
		{
			document.writeln("<p class=\"smallgreaterlisitem\">&gt;&nbsp;<a class=\"parasmallcolourtext\" href=\"" + grid_page + "?video_type=subject&bookmark=" + subject.toLowerCase() + "\">" + more_text + "</a></p>");
			break;
		}
		flyout_text = flash_video[selected_videos[i][1]].fv_length + "<br>";
		if (flash_video[selected_videos[i][1]].fv_intro != "")
		{
			flyout_text += flash_video[selected_videos[i][1]].fv_intro + "<br>";
		}
		flyout_text += "(";
		if (flash_video[selected_videos[i][1]].fv_video_lang != "0")
		{
			flyout_text += language_text_array[flash_video[selected_videos[i][1]].fv_video_lang] + "; ";
		}
		flyout_text += new_window_text + ")";
		if (flash_video[selected_videos[i][1]].fv_video_format == "W")
		{
			popup_height = 680;
		}

		if (i == selected_videos.length - 1)
		{
			document.writeln("<a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[selected_videos[i][1]].fv_id + "&display=long','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" ><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[selected_videos[i][1]].fv_video_url + ".jpg\"  border=\"0\" width=\"140\"></a><br>");
		}
		if (flash_video[selected_videos[i][1]].fv_date != "")
		{
			date_text = " <span class=\"parasmallgreytext\">(" + flash_video[selected_videos[i][1]].fv_date.slice(8, 10) + "/" + flash_video[selected_videos[i][1]].fv_date.slice(5, 7) + "/" + flash_video[selected_videos[i][1]].fv_date.slice(0, 4) + ")</span>";
		}
		else
		{
			date_text = "";
		}
		document.writeln("<br><img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[selected_videos[i][1]].fv_id + "&display=long','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"parasmallcolourtext\">" + flash_video[selected_videos[i][1]].fv_title + "</a>" + date_text + "");
		cnt+=1;
	}

}
function listCentralSubjectVideo(subject, style, number)
{
	var flyout_text = "";
	var date_text = "";
	var selected_videos = new Array();
	var subject_array = new Array();
	var cnt = 0;
	var popup_height = 750;
	for (i = 1; i < flash_video.length; i++)
	{
		subject_array = flash_video[i].fv_gateway_subjects.split("#");
		for (j = 0; j < subject_array.length; j++)
		{
			if (subject_array[j] == subject)
			{
				selected_videos[selected_videos.length] = [flash_video[i].fv_date, i];
				break;
			}
		}
	}
	selected_videos.sort();
	for (i = selected_videos.length - 1; i >= 0; i--)
	{
		if (cnt == number)
		{
			document.writeln("<p class=\"smallgreaterlisitem\" align=\"right\">&gt;&nbsp;<a class=\"parasmallcolourtext\" href=\"" + grid_page + "?video_type=subject&bookmark=" + subject.toLowerCase() + "\">" + more_text + "</a></p>");
			break;
		}
		flyout_text = flash_video[selected_videos[i][1]].fv_length + "<br />";
		if (flash_video[selected_videos[i][1]].fv_intro != "")
		{
			flyout_text += flash_video[selected_videos[i][1]].fv_intro + "<br />";
		}
		flyout_text += "(";
		if (flash_video[selected_videos[i][1]].fv_video_lang != "0")
		{
			flyout_text += language_text_array[flash_video[selected_videos[i][1]].fv_video_lang] + "; ";
		}
		flyout_text += new_window_text + ")";
		if (flash_video[selected_videos[i][1]].fv_video_format == "W")
		{
			popup_height = 680;
		}

		if (flash_video[selected_videos[i][1]].fv_date != "")
		{
			date_text = " <span class=\"parasmallgreytext\">(" + flash_video[selected_videos[i][1]].fv_date.slice(8, 10) + "/" + flash_video[selected_videos[i][1]].fv_date.slice(5, 7) + "/" + flash_video[selected_videos[i][1]].fv_date.slice(0, 4) + ")</span>";
		}
		else
		{
			date_text = "";
		}
		document.writeln("<p class=\"paranormaltext\"><img src=\"/images/video.gif\"  border=\"0\" width=\"24\" height=\"12\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[selected_videos[i][1]].fv_id + "&display=long','links',675," + popup_height + ",1)\" onMouseOver=\"writetxt('" + flyout_text + "')\" onMouseOut=\"writetxt(0)\" class=\"paraboldcolourtext\">" + flash_video[selected_videos[i][1]].fv_title + "</a>" + date_text + "</p>");
		cnt+=1;
	}

}
function showFeaturedIndexVideo(video_id, display)
{
	var popup_height = 750;
//	var video_title = document.getElementById("video_title");
//	var video_image = document.images["video_image"];
//	var video_image_link = document.getElementById("video_image_link");
//	var video_link = document.getElementById("video_link");
//	var video_length = document.getElementById("video_length");
	for (var video_cnt = 0; video_cnt < flash_video.length; video_cnt++)
	{
		if (flash_video[video_cnt] !== not_defined)
		{
			if (flash_video[video_cnt].fv_id == video_id)
			{
				if (flash_video[video_cnt].fv_video_format == "W")
				{
					popup_height = 680;
				}
				if (display == "short")
				{
					popup_height -= 194;
				}
				video_title.innerHTML = flash_video[video_cnt].fv_debate_full_title + " <span class=\"parasmallgreytext\">(" + flash_video[video_cnt].fv_date.slice(8, 10) + "/" + flash_video[video_cnt].fv_date.slice(5, 7) + "/" + flash_video[video_cnt].fv_date.slice(0, 4) + ")</span>";
				video_image.innerHTML = "<a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[video_cnt].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\"  onmouseover=\"writetxt(\'" + flash_video[video_cnt].fv_length + "; " + new_window_text + "; " + language_text_array[flash_video[video_cnt].fv_video_lang] + "\')\" onmouseout=\"writetxt(0)\"><img src=\"/images/img_index/" + flash_video[video_cnt].fv_video_url + ".jpg\"  height=\"160\"   border=\"0\" alt=\"featured video image\" /></a>";
//video_image.src = "/images/img_index/" + flash_video[video_cnt].fv_video_url + ".jpg";
//				video_image_link.href = "javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[video_cnt].fv_id + "&display=" + display + "','links',654," + popup_height + ",1)";
				//video_image_link.onmouseover = "writetxt(\'" + flash_video[video_cnt].fv_length + "; " + new_window_text + "; " + language_text_array[flash_video[video_cnt].fv_video_lang] + "\')";
		//		video_image_link.onmouseover = "writetxt(\'hi\')";
//	video_image_link.innerHTML = "<img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[video_cnt].fv_video_url + ".jpg\"  height=\"161\"   border=\"0\" alt=\"featured video image\" />";
//				video_image_link.innerHTML = "testing";
				video_link.innerHTML = "&gt;&nbsp;<a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[video_cnt].fv_id + "&display=" + display + "','links',675," + popup_height + ",1)\" class=\"celllinks\" onmouseover=\"writetxt(\'" + new_window_text + "; " + language_text_array[flash_video[video_cnt].fv_video_lang] + "\')\" onmouseout=\"writetxt(0)\">" + watch_video + "</a> <span class=\"parasmallgreytext\">(" + flash_video[video_cnt].fv_length + ")</span>";
//				video_link.href = "javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[video_cnt].fv_id + "&display=" + display + "','links',654," + popup_height + ",1)";
//				video_length.innerHTML = "(" + flash_video[video_cnt].fv_length + ")";
			}
		}
	}
}

// add a row to a table
function addRow(tablename, array, classname) 
{
	var mytbl = document.getElementById(tablename);
	var lastrow = mytbl.rows.length;
	var newrow = mytbl.insertRow(lastrow);
   for (r = 0; r < array.length; r++) 
	{   
		var newcell = newrow.insertCell(r);
        newcell.innerHTML = array[r];
		newcell.className = classname;
		newcell.vAlign = "top";
     }
 }


// add a merged row to a table
function addMergedRow(tablename, text, rowCells, classname) 
{
	var mytbl = document.getElementById(tablename);
	var lastrow = mytbl.rows.length;
	var newrow = mytbl.insertRow(lastrow);
	var newcell = newrow.insertCell(0);
        newcell.innerHTML = text;
		newcell.className = classname;
		newcell.vAlign = "top";
		newcell.colSpan = rowCells;
 }
// display a list of video debates
function listCentreSubjectVideos(subject)
{
	var i = 0;
	var output_array = new Array();
	var url_array = new Array();
	var filename_array = new Array();
// read backwards through array of videos
	for (i = flash_video.length - 1; i >= 0; i--)
	{
		if (flash_video[i] !== not_defined)
		{
			if (flash_video[i].fv_subjects.indexOf(subject) != -1)
			{
				output_array[0] = "<a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=long','links',675,700,1)\" ><img src=\"http://WTO.http.internapcdn.net/WTO/flash/" + flash_video[i].fv_video_url + ".jpg\"  border=\"0\" width=\"150\"></a>";
				output_array[1] = "<h4 class=\"subnormalboldcolourtext\"><a href=\"javascript:openAPopup('/library/flashvideo/video_" + wto_language + ".htm?id=" + flash_video[i].fv_id + "&display=long','links',675,700,1)\" class=\"paraboldcolourtext\"  onMouseOver=\"writetxt('" + flash_video[i].fv_intro + "')\" onMouseOut=\"writetxt(0)\">" + flash_video[i].fv_debate_full_title + "</a><span class=\"parasmallgreytext\"> (" + flash_video[i].fv_length + ")</span></h4>";
				output_array[1] += "<p class=\"strippednormaltext\"><span class=\"parasmallgreytext\">";
				if (flash_video[i].fv_date != "")
				{
					output_array[1] += flash_video[i].fv_date.slice(8, 10) + "/" + flash_video[i].fv_date.slice(5, 7) + "/" + flash_video[i].fv_date.slice(0, 4);
				}
				if (flash_video[i].fv_video_lang != "0")
				{
					output_array[1] += " (" + language_text_array[flash_video[i].fv_video_lang] + ")";
				}
				output_array[1] += "</span></p>";
				addRow("videolist", output_array, "paranormaltext");
			}
		}
	}
}

