/**
 * _ftTrack v2.01 2010-10-28 Francesco Terenzani
 *
 * License: http://www.terenzani.it/toys/ga.link/license.txt
 * Project home page: http://www.terenzani.it/tracciare-link-con-google-analytics
 * Source: http://www.terenzani.it/toys/ga.link/ga.link.js
 * Minified: http://www.terenzani.it/toys/ga.link/ga.link.min.js
 */

function _ftTrack(g,h){var d=h.split("|"),a=[],b,c=d.length,e=ga_link.rules,f=[];for(b=0;b<c;b++){d[b]==="link"&&a.push(new e.Outgoing);d[b]==="email"?a.push(new e.Email):f.push(d[b])}f.length&&a.push(new e.MediaFile(f));a.length&&ga_link.track(g,a)} window.ga_link=function(){function g(a){return a.tagName && a.tagName.toUpperCase()==="A"?a:!a.parentNode?false:g(a.parentNode)}function h(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else a.attachEvent&&a.attachEvent("on"+b,c)}var d={Email:function(){},Outgoing:function(){},MediaFile:function(a){this.regexp=RegExp("("+a.join("|")+")(\\?.*)?$","i")}};d.Email.prototype.check=function(a,b){if(/mailto/.test(a.protocol)){b._trackEvent("Mailto","click",a.href.replace(/^mailto:/,""));return true}};d.Outgoing.prototype.check= function(a,b){if(/http/.test(a.protocol)&&a.hostname!=document.location.hostname){b._trackEvent("Outgoing","click",a.href);return true}};d.MediaFile.prototype.check=function(a,b){if(a.hostname==document.location.hostname&&this.regexp.test(a.pathname)){b._trackEvent("Media","click",a.pathname);return true}};return{track:function(a,b){h(document,"click",function(c){var e=g;c=(c=c)||window.event;if(!c.target)c.target=c.target||c.srcElement||document;if(e=e(c.target)){c=0;for(var f=b.length;c<f;c++)if(b[c].check(e, a))return}})},rules:d}}();