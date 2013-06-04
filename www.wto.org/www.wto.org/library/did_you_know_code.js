
//***********************************************************************
//* APPLICATION : WTO Web Site
//* COMPONENT : Did you know code
//* LAST UPDATE : 05/05/2011
//***********************************************************************

function loadDYN(dyn_id, status)
{
//	alert(status);
	var dyntextcell = document.getElementById("dyntextcell");
	var dynimagecell = document.getElementById("dynimagecell");
	var dyn_array_id = 0;
	var dyn_loop = 0;
	if (status == true)
	{
		if (dyn_id == "")
		{
			dyn_array_id = Math.round((Math.random() * (dyn_array.length-1)));
		}
		else
		{
			for (dyn_loop = 0; dyn_loop < dyn_array.length; dyn_loop++)
			{
				if (dyn_array[dyn_loop].id == dyn_id)
				{
					dyn_array_id = dyn_loop;
					break;
				}
			}
		}
		
		dyntextcell.innerHTML = "<h3 class=\"bluesubheading\">" + dyn_title + "</h3>";
		dyntextcell.innerHTML += "<p class=\"celllinks\"><strong>" + dyn_array[dyn_array_id].text;
		if (dyn_array[dyn_array_id].link_url != "")
		{
			dyntextcell.innerHTML += "<br />&gt;&nbsp;<a href=\"" + dyn_array[dyn_array_id].link_url + "\" class=\"celllinks\">" + dyn_array[dyn_array_id].link_text + "</a>";
		}
		//	dyntextcell.innerHTML += "</strong></p>";
		dyntextcell.style.verticalAlign = "top";
		if (dyn_array[dyn_array_id].image_url != "")
		{
			dynimagecell.innerHTML = "<img src=\"" + dyn_array[dyn_array_id].image_url + "\"  alt=\"did you know image\" border=\"0\" />";
		}
		else
		{
			dynimagecell.innerHTML = "<img src=\"" + dyn_default_image + "\"  alt=\"did you know image\" border=\"0\" />";
		}
	}
}