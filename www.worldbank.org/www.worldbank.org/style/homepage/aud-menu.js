// Copyright 2006-2007 http://javascript-array.com/scripts/simple_drop_down_menu/

var timeout	= 500;
var closetimer	= 0;
var ddmenuitem	= 0;


// open hidden layer
function mopen(id, hv)
{	
	// cancel close timer
	mcancelclosetime();
	// close old layer
	if(ddmenuitem) ddmenuitem.style.display = 'none';
	mclose();
	// get new layer and show it
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.display = 'block';
	/*ddmenuitem.style.left=left + 'px';*/

	document.getElementById(hv).style.background='#595D52 url(http://www.worldbank.org/wb/images/cache30/homepage/more-arrow-audiences3-hover.png) no-repeat scroll right';
	document.getElementById(hv).style.padding='8px 12px';
	document.getElementById(hv).style.borderLeft='1px solid #595D52';

	
	/*if (document.getElementById('governance').style.display != 'none'){
		document.getElementById("inv").style.backgroundPosition='69px 5px';
		//document.getElementById("job").style.borderLeft='none';
		
		}
		else{
		document.getElementById("gov").style.backgroundPosition='91px 5px';
		//document.getElementById("inv").style.borderLeft='none';
	}*/
		

}
// close showed layer
function mclose()
{
	if(ddmenuitem){ ddmenuitem.style.display = 'none'
	document.getElementById("gov").style.background='#9C9E97 url(http://www.worldbank.org/wb/images/cache30/homepage/more-arrow-audiences3.png) no-repeat scroll right';
	
	if(document.getElementById("bus")){
		document.getElementById("bus").style.background='#9C9E97 url(http://www.worldbank.org/wb/images/cache30/homepage/more-arrow-audiences3.png) no-repeat scroll right';
		document.getElementById("bus").style.padding='0px 12px';
		document.getElementById("bus").style.borderLeft='1px solid #fff';
	}
	
	
	document.getElementById("inv").style.background='#9C9E97 url(http://www.worldbank.org/wb/images/cache30/homepage/more-arrow-audiences3.png) no-repeat scroll right';
	document.getElementById("gov").style.padding='0px 12px';

	document.getElementById("inv").style.padding='0px 12px';
	document.getElementById("gov").style.borderLeft='1px solid #fff';
	document.getElementById("inv").style.borderLeft='1px solid #fff';
	
	
	}
	
}

// go close timer
function mclosetime(hv)
{
	
	closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
	if(closetimer)
	{

		window.clearTimeout(closetimer);
		closetimer = null;
	}
}


// close layer when click-out
document.onclick = mclose; 




