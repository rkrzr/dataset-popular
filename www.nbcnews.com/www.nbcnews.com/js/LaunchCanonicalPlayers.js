document.onclick=tryLaunchPlayer;

function tryLaunchPlayer(evt) {
  var link;
  if (!evt) var evt = window.event;
  link = getEventElement(evt);
  link = getParentAnchor(link)+"";
  return launchPlayerIfValidUrl(link);
}

function getEventElement(evt) {
  if (evt.target) return evt.target;
  else if (evt.srcElement) return evt.srcElement;
}

function getParentAnchor(currentNode) {
  if (currentNode == null || currentNode.nodeName == "A") {
    return currentNode;
  }
  else {
    return getParentAnchor(currentNode.parentNode);
  }
}

function launchPlayerIfValidUrl(link) {
    var regTest= /((http\:\/\/video\.)|(\.com\/video\/))/ig;
    if (link != null &&  regTest.test(link)) {
        return launchPlayer(link)
    }
    else if (link != null && link.toLowerCase().indexOf("http://slideshow.") > -1) {
        return launchSlideshowPlayer(link)
    }
  return true;
}

function launchPlayer(url) {
  var oUser = new UberSniff();
  var sLoc = ",location=1";
  if (oUser.ie > 6) {
    sLoc = ",location=0";
  }


var isMetro = false;
try { isMetro = /trident\/[6-9]/i.test(navigator.userAgent); } catch (e) { }
if (isMetro) {
    window.location = url; return false;
}


  var w = window.open(url, "MSNBCvplayer", "width=996,height=633,status=1,scrollbars=0,resizable=0,toolbar=0,menubar=0,titlebar=0,directories=0" + sLoc);
  if (w && w.focus) {
    w.focus();
  }
  return false;
}

function launchSlideshowPlayer(url) {
    oUser = new UberSniff();
    var sw = oUser.screenWidth;
    var sh = oUser.screenHeight;

    var sOptions = "resizable=no,top=0,left=0,screenx=0,screeny=0";
    var sizeSet = [",width=1010,height=560", ",width=1210,height=760", ",width=1560,height=920"];
    
    if (sw >= 1560 && sh >= 920) {
        sOptions += sizeSet[2];
    } else if (sw >= 1210 && sh >= 760) {
        sOptions += sizeSet[1];
    } else if (sw >= 1010 && sh >= 560) {
        sOptions += sizeSet[0];
    } else {
        window.open(url, "_blank");
        return;
    }
    var xwinopen = window.open(url, "_blank", sOptions);
    return false;
}

