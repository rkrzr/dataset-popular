/** (c) 2004-2009 Copyright Nedstat BV Netherlands. ALL RIGHTS RESERVED
 * @version 1.1.1
 * @arg a domelement which onclick event triggered this function
 * @arg url url where to navigate to
 * @arg name name of counter
 * @arg type type of event
 * @arg winopt parameters new window
 */
function ns_onclick(i,b,c,h,j){var e="";if(typeof ns_pixelUrl=="string"){e=ns_pixelUrl.substring(0,ns_pixelUrl.indexOf("?")+1)}e+=c;e+="&ns_type="+h+"&ns_action=view";e+="&ns__t="+(new Date()).getTime();if(!b){b=i.href}var d=document.referrer;if(d.lastIndexOf("/")==d.length-1){d=d.substring(d.lastIndexOf("/"),0)}if(d.length>0){e+="&amp;ns_referrer="+escape(d)}j=j||"";var f=(i&&i.target&&i.target!="")?(i.target.substring(0,1)=="_")?i.target.substring(1):i.target:"self";var g=new Image();if(f&&b){if(window[f]){window.ns_softclick_timer=function(k,a){return function(){if(window.ns_softclick_timeout){window.clearTimeout(window.ns_softclick_timeout)}g.onload=g.onerror=function(){return};window[((window[k])?k:"self")].location.href=a}}(f,b);ns_softclick_timeout=window.setTimeout("ns_softclick_timer()",5000);g.onload=g.onerror=window.ns_softclick_timer}else{window.open(b,f,j)}}g.src=e;return false};
