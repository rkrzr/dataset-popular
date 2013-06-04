function getPageTab () {
  try {
    var DE, v_ok, v_url;
    v_url=this.location.pathname;
    
   window.ActiveXObject ? xmlDoc = new ActiveXObject("Microsoft.XMLDOM"):  xmlDoc = document.implementation.createDocument("","",null);
   xmlDoc.async = false;

v_ok = xmlDoc.load("/webservices/pageTabs.xml");
    if(v_ok) {

      var matches = xmlDoc.getElementsByTagName("page");

      for ( ctr = 0; ctr < matches.length ; ctr++ ) {
        try {
          if (v_url==matches[ctr].getElementsByTagName("url")[0].firstChild.data) {
            try{
              document.getElementById(matches[ctr].getElementsByTagName("tab")[0].firstChild.data).className="active";
            } catch (err) {
          //          alert("error - " + err + "xml-"+matches[ctr].getElementsByTagName("tab")[0].firstChild.data);
            }
            return true;
          }
        } catch (err) {
          //      alert("error - " + err);
        }
      }
    }
  } catch(err) {
   //    alert("error - " + err);
  } 
}

function addLoadEvent(func) { 
  var oldonload = window.onload; 
  if (typeof window.onload != 'function') { 
    window.onload = func; 
  } else { 
    window.onload = function() { 
      if (oldonload) { 
        oldonload(); 
      } 
      func(); 
    } 
  } 
} 

getPageTab ();