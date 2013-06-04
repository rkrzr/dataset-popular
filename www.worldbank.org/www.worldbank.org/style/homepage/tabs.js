/* Script for Tab Changing */
$(function() {
		   

	

	var config = {
		tabbox : $('#center .tab-box'),
		tabs : $('#center .tab-box .tab'),
		selectedTab : $('#center .tab-box .selected'),
		tabContentBox : $('#tab-box-content')
	}
	
	
	
	if ( config.tabContentBox.length == 0 || config.tabs.length == 0 ) { return; }
		config.tabbox.addClass( 'fancy-tab-box' );
	if( config.selectedTab.length == 0 ) {
		//config.tabs.eq(0).addClass( 'selected' );
		config.selectedTab = $( '#center .tab-box .selected' );
	}
	
	/* added to link direcly to a tab from the URL*/
	var tabId = getTabId();
	var parameter = UrlParameters( 'theme' );
	var ele = document.getElementById(parameter);
	var ele2 = document.getElementById(tabId);
	
	if (parameter != ''){
		updateContent( parameter, config );
		resetSelected( config );
		$(ele).addClass( 'selected' );
	}else{
	 	updateContent( tabId, config );
		resetSelected( config );
		$(ele2).addClass( 'selected' );
	}

	config.tabs.click( function() {
		clickTab( this, config );
		return false;
	});
	
});


function UrlParameters( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


function getTabId( el ) {
	//var tabId = el.attr( 'id' );
	/*Added to select a random tab when load the page*/	   
	var how_many_ads = 3;
	var now = new Date();
	var sec = now.getSeconds();
	var ad = sec % how_many_ads;
	//ad +=1;
	var tabId = [ "country", "topics", "project" ];
	var tabId = tabId[ad];
	return tabId;
}

function updateContent( id, config ) {
	// find el and get its content
	
	var tabContent = $( '#' + id + ' .tab-content').eq(0);
	if ( tabContent ) {
		config.tabContentBox.html( tabContent.html() );
	}
	
	countFacts( $('#tab-box-content .feature-facts li') );
	equalHeight( $('#tab-box-content .feature-facts li') );
}

function clickTab( target, config ) {
	var tabContentHref = getTargetHref( target );
	resetSelected( config );
	if ( target.nodeName == 'LI' ) {
		$( target ).addClass( 'selected' );
	} else {
		var parent = target.parentNode.parentNode;
		$( parent ).addClass( 'selected' );
	}
	
	updateContent( tabContentHref, config );
}

function getTargetHref( target ) {
	if ( target.href ) {
		var tabContentHref = target.href.split( '#' )[ 1 ];
		
	} else if( target.id ) {
		var tabContentHref = target.id;
	}
	return tabContentHref;
}

function resetSelected( config ) {
	for ( var i = 0; i < config.tabs.length; i++ ) {
		$( config.tabs ).eq(i).removeClass( 'selected' );
	}
}

function equalHeight( group ) {
	var factsHeight = 0;
	group.each( function() {
		var thisHeight = $(this).height();
		if( thisHeight >= factsHeight ) {
			factsHeight = thisHeight;
		}
	});
	group.height( factsHeight );
}

function countFacts( group ) {
	var factCount = group.length - 1;
	group.parent( '.feature-facts' ).addClass( 'facts-' + factCount );
}