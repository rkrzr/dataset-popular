/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);
var mi=(!mi)?{'media_domain':''}:mi;mi.SideScrollAd=function(container){this.container=$(container).length?$(container):'';this.trigger_percentage=70;this.show=false;if(this.container!=='')
{this.right=this.container.css('right');$(window).bind('scroll',{obj:this},function(event){var obj=event.data.obj;if(obj.getScrollPosition()>obj.trigger_percentage&&obj.show===false)
{obj.container.stop().animate({'right':'0px'},850);obj.visible('true');}
else if(obj.getScrollPosition()<obj.trigger_percentage)
{obj.container.stop().animate({'right':obj.right},850);obj.visible('false');}});$("#closeSlideout a").bind('click',{obj:this},function(event){var obj=event.data.obj;obj.container.stop().animate({'right':obj.right},850);});}
else
{console.warn("Slide ad cannot be instantiated. "+container+" does not exist.");}};mi.SideScrollAd.prototype.visible=function(value)
{if(value===undefined)
{return this.show;}
else
{switch(value)
{case'true':case 1:this.show=true;break;case'false':case 0:this.show=false;break;default:break;}}};mi.SideScrollAd.prototype.getScrollPosition=function()
{var bottom=$(window).height()+$(window).scrollTop();var height=$(document).height();return Math.round(100*bottom/height);};mi.floorAd=function(container,repeat,adWrapper,adObject,count){count=typeof count!=='undefined'?count:0;adWrapper=typeof adWrapper!=='undefined'?adWrapper:"#floorWrapper";adObject=typeof adObject!=='undefined'?adObject:"floorAd";mi.App.apply(this,arguments);var floorAd_mainImg;var floorAd_leaveImg;var adDoc;this.wrapper;this.mainImg;floorAd_mainImg;this.mainWidth;this.mainHeight;this.leaveImg;this.leaveHeight;this.closeLink;this.openLink="";this.repeat=typeof repeat!=='undefined'?repeat:240;this.setConf('repeat',this.repeat);this.setConf('container',container);this.timeStamp=Math.round(new Date().getTime()/60000);this.cookieName='mi_floorboard';this.expand=true;this.checkForAd(container,repeat,adWrapper,adObject,count);}
mi.floorAd.prototype.checkForAd=function(container,repeat,adWrapper,adObject,count)
{if($('#floorboard-ad').length>0){adDoc=$(container);this.container=$(container).length?$(container):'';}
else{adDoc=$(adWrapper+" iframe").contents();this.initIframeSize(adWrapper);this.setIframeHeight(adWrapper,110);this.container=adDoc.find(container);var numdiv=adDoc.find("#floorboard-wrapper");if(numdiv.length<1){if(count++<60){setTimeout(adObject+".checkForAd( '"+container+"', "+repeat+",'"+adWrapper+"','"+adObject+"',"+count+" )",500);}
return;}}
this.floorAdExec(container,repeat,adWrapper,adObject,count);}
mi.floorAd.prototype.floorAdExec=function(container,repeat,adWrapper,adObject,count){count=typeof count!=='undefined'?count:0;adWrapper=typeof adWrapper!=='undefined'?adWrapper:"#floorWrapper";adObject=typeof adObject!=='undefined'?adObject:"floorAd";mi.App.apply(this,arguments);var floorAd_mainImg;var floorAd_leaveImg;$(adWrapper).css("display","inline");this.wrapper=adDoc.find("#floorboard-wrapper");if(adDoc.find('#floor-panel').length>0)
{this.mainImg=adDoc.find('#floor-panel');}
else
{this.mainImg=adDoc.find('img:eq(0)');}
floorAd_mainImg=this.mainImg;this.mainWidth=this.mainImg.width();this.mainHeight=this.mainImg.height();if(adDoc.find('#floor-leavebehind').length>0)
{this.leaveImg=adDoc.find('#floor-leavebehind');}
else
{this.leaveImg=adDoc.find('img:eq(1)');}
floorAd_leaveImg=this.leaveImg;this.leaveHeight=this.leaveImg.height();this.closeLink=adDoc.find('map[name="floorclosemap"]  area');this.openLink=adDoc.find('map[name="flooropenmap"] area');this.repeat=typeof repeat!=='undefined'?repeat:240;this.setConf('repeat',this.repeat);this.setConf('container',container);this.timeStamp=Math.round(new Date().getTime()/60000);this.cookieName='mi_floorboard';this.expand=true;this.cookie=new mi.Cookie(document,this.cookieName);this.cookie.load();if(this.container!=='')
{this.container.css({'position':'fixed','text-align':'left','bottom':'0','right':'0','left':'0'});if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod'||navigator.platform=='Linux armv7l')
{this.container.css("position","static");}
this.wrapper.css({'width':this.mainWidth+'px','text-align':'left','margin':'0 auto'});if(this.mainImg!=='')
{this.flightID=this.mainImg[0].getAttribute('data-flightid');if(this.flightID==null){this.leaveImg[0].getAttribute('data-flightid');}
this.flightID=this.flightID!=null?this.flightID:'';var minutesAgo=this.lastShown();if(minutesAgo>=0&&minutesAgo<=this.repeat){this.expand=false;}
this.setCookie();this.mainImg.css({'position':'absolute','border':'0','bottom':(-1*this.mainHeight),'z-index':'2147483644'});if(this.leaveImg!==''&&this.closeLink!=='')
{this.leaveImg.css({'visibility':'hidden','border':'0','position':'absolute','bottom':(-1*this.leaveHeight),'z-index':'2147483644'});this.closeAd=function(){$(adWrapper+" div").animate({'height':"30px"});floorAd_leaveImg.css({'visibility':'visible','bottom':(-1*floorAd_mainImg.height())});floorAd_mainImg.animate({'bottom':(-1*floorAd_mainImg.height())});$('body').animate({'margin-bottom':floorAd_leaveImg.height()});floorAd_leaveImg.animate({'bottom':'0'});};this.closeLink.click(this.closeAd);if(this.openLink!='')
{this.openLink.click(function(){$(adWrapper+" div").animate({'height':"110px"});floorAd_leaveImg.animate({'bottom':(-1*floorAd_leaveImg.height())});floorAd_mainImg.animate({'bottom':'0'});$('body').animate({'margin-bottom':floorAd_mainImg.height()});});}}
var passAd2ready=this;$(document).ready(function(){if(passAd2ready.expand){floorAd_leaveImg.css({'bottom':(-1*floorAd_leaveImg.height())});floorAd_mainImg.animate({'bottom':'0'});$('body').css({'margin-bottom':floorAd_mainImg.height()});}
else{passAd2ready.closeAd();}});}
else
{console.warn("No floor ad images to display");}}
else
{console.warn("Floor ad cannot be instantiated. "+container+" does not exist.");}};mi.floorAd.prototype.setCookie=function()
{var cookieData=new Array();var flightKey='fbid'+this.flightID;if(this.cookie){for(var prop in this.cookie){if(prop.indexOf('fbid')!=-1){var id_time=parseInt(this.cookie[prop]);if((this.timeStamp-id_time)<=this.repeat){cookieData[prop]=this.cookie[prop];}}}}
this.cookie.remove();this.cookie=new mi.Cookie(document,this.cookieName,this.getConf('repeat'),'/');this.cookie[flightKey]=this.timeStamp;for(var prop in cookieData){this.cookie[prop]=cookieData[prop];}
this.cookie.store();};mi.floorAd.prototype.lastShown=function(flightID)
{flightKey='fbid'+this.flightID;if(this.cookie){if(this.cookie[flightKey]){var id_time=parseInt(this.cookie[flightKey]);return(this.timeStamp-id_time);}
else{return-1;}}
return-1;}
mi.floorAd.prototype.setIframeHeight=function(adWrapper,height)
{$(adWrapper+" div").height(height+"px");}
mi.floorAd.prototype.initIframeSize=function(adWrapper)
{$(adWrapper+" iframe").each(function(index){if(this.id.indexOf('google_ads_iframe_')!=-1){this.width="100%";this.height="100%";}});}
$(window).load(function(){$('div[name=adx_al]').bind('click',function(){var $curMarg=$('body').css('margin-bottom').replace("px","");$curMarg=($curMarg==30)?110:30;$('body').css('margin-bottom',$curMarg+'px');});$('.advertisement img').each(function(index){if(this.height==1&&this.width==1){$(this).css("display","none");}});});function addEvent(objObject, strEventName, fnHandler) {
  if (objObject.addEventListener) {
    objObject.addEventListener(strEventName, fnHandler, false);
  } else if (objObject.attachEvent) {
    objObject.attachEvent("on" + strEventName, fnHandler);
  }
}
function removeEvent(objObject, strEventName, fnHandler) {
  /* works on events added via addEvent(), hard coded events aren't removed */
  if (objObject.removeEventListener) {
    objObject.removeEventListener(strEventName, fnHandler, false);
  } else if (objObject.detachEvent) {
    objObject.detachEvent("on" + strEventName, fnHandler);
  }
}
function getEventSrc(e) {
  if (!e) e = window.event;
  if (e.target) {
    return e.target;
  } else if (e.srcElement) {
    return e.srcElement;
  }
}

// date functions **************************************************************

Date.prototype.getDayString = function(){
  var day = '';
  switch (this.getDay()) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}
Date.prototype.getMonthString = function(full){
  var day = '';
  switch (this.getMonth()) {
    case 0:
      return (full)?'January':'Jan';
    case 1:
      return (full)?'February':'Feb';
    case 2:
      return (full)?'March':'Mar';
    case 3:
      return (full)?'April':'Apr';
    case 4:
      return 'May';
    case 5:
      return (full)?'June':'Jun';
    case 6:
      return (full)?'July':'Jul';
    case 7:
      return (full)?'August':'Aug';
    case 8:
      return (full)?'September':'Sep';
    case 9:
      return (full)?'October':'Oct';
    case 10:
      return (full)?'November':'Nov';
    case 11:
      return (full)?'December':'Dec';
  }
}
Date.prototype.spanishDay = function(){
  var day = '';
  switch (this.getDay()) {
    case 0:
      return 'domingo';
    case 1:
      return 'lunes';
    case 2:
      return 'martes';
    case 3:
      return 'mi&eacute;rcoles';
    case 4:
      return 'jueves';
    case 5:
      return 'viernes';
    case 6:
      return 's&aacute;bado';
  }
}
Date.prototype.spanishMonth = function(full){
  var day = '';
  switch (this.getMonth()) {
    case 0:
      return (full)?'enero':'ene';
    case 1:
      return (full)?'febrero':'feb';
    case 2:
      return (full)?'marzo':'mar';
    case 3:
      return (full)?'abril':'abr';
    case 4:
      return (full)?'mayo':'may';
    case 5:
      return (full)?'junio':'jun';
    case 6:
      return (full)?'julio':'jul';
    case 7:
      return (full)?'agosto':'aug';
    case 8:
      return (full)?'septiembre':'sep';
    case 9:
      return (full)?'octubre':'oct';
    case 10:
      return (full)?'noviembre':'nov';
    case 11:
      return (full)?'diciembre':'dec';
  }
}
// end date functions **********************************************************

function openWindow(url,wname,h,w) {
  var parms = 'resizable,scrollbars,height='+h+',width='+w;
  window.open(url,wname,parms);
}

function addOnClick(selector,wname,h,w) {
  $(selector).click(function(){openWindow(this.href,wname,h,w); return false;})
}

function updateMPSTLink(selector) {
  addOnClick(selector,'marketURL',400,600);
}

// code below should probably be located in a different library, or in the site.js file

// tabbed box code *************************************************************
// IMPORTANT: use of this file requires the presence of the jquery.js library!
/*
function showTab(o) {
//alert('starting tab prep');
  $('.tabname').removeClass('tabon');
  o.className += ' tabon';
  var id='#'+o.href.match(/#(\w.+)/)[1];
  $('.tabbox').removeClass('tabon');
  $('.tabbox '+id).addClass('tabon');
//alert('tab prep complete');
}
//alert('schedule tab box prep');
if (typeof window.jQuery != "undefined") {$(document).ready(function(){$('a.tabname').click(function(){showTab(this);return false;});});}
*/
// end tabbed box code *********************************************************

/*
var newWindow = null
function pops(gotoUrl) {
  if(!newWindow || newWindow.closed) {
    newWindow = open(gotoUrl,"Name2","width=650,height=500,resizable=yes,menubar=no,scrollbars=auto,status=no,left=50,top=50");
  } else {
    newWindow.location = (gotoUrl);
    newWindow.focus();
  }
}
*/

// ordered list forms code *****************************************************
// IMPORTANT: use of this file requires the presence of the jquery.js library!
/*if( document.addEventListener ) document.addEventListener( 'DOMContentLoaded', olform, false);

function olform(){
  // Hide forms
//alert('prep ordered list forms');
  $( 'form.olform' ).hide().end();

  // Processing
  $( 'form.olform' ).find( 'li/label' ).not( '.nodf' ).each( function( i ){
    var labelContent = this.innerHTML;
    var labelWidth = document.defaultView.getComputedStyle( this, '' ).getPropertyValue( 'width' );
    var labelSpan = document.createElement( 'span' );
    labelSpan.style.display = 'block';
    labelSpan.style.width = labelWidth;
    labelSpan.innerHTML = labelContent;
    this.style.display = '-moz-inline-box';
    this.innerHTML = null;
    this.appendChild( labelSpan );
  } ).end();

  // Show forms
  $( 'form.olform' ).show().end();
//alert('ordered list forms prep complete');
}*/
// end ordered list forms ******************************************************
//alert('mi-utilities complete');

function ppRichMedia(object, type) {
  // default flv playback
  var width = 783;
  var height = 430; 
  if (type == "mp3")
  {
    width = 322;
    height = 470;
  }
  var left = window.screen.width/2 - width/2;
  var top = window.screen.height/2 - height/2;
  window.open(object.href,'mh' + type ,'width=' + width + ',height=' + height + ',resizable=no,left=' + left + ',top=' + top + ',screenx=' + left + ',screeny=' + top);
  return false;
}

/**
 * Function to clear an input field
 * Usage: onClick="clearf(this, '<value to test against for clearing such as "Your Zip Code">')" as input tag parameter
 */
function clearf(object,text){
                if (object.value == text)
                {
                        object.value = "";
                        object.focus();
                }
}

/**
 * Function to set value of an input field
 * Usage: onClick="setf(this, '<value to set field to>')" 
 */
function setf(object,text){
                if(object.value == "")
                {
                        object.value = text;
                        this.focus();
                }
}

/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
		  
var tb_pathToImage = "http://media.mcclatchydc.com/static/scripts/mi/third_party/thickbox/loadingAnimation.gif";

/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/

//on page load call tb_init
$(document).ready(function(){   
	tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
	imgLoader = new Image();// preload image
	imgLoader.src = tb_pathToImage;
});

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
	$(domChunk).click(function(){
	var t = this.title || this.name || null;
	var a = this.href || this.alt;
	var g = this.rel || false;
	tb_show(t,a,g);
	this.blur();
	return false;
	});
}

function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link

	try {
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			$("body","html").css({height: "100%", width: "100%"});
			$("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
				$("#TB_overlay").click(tb_remove);
			}
		}else{//all others
			if(document.getElementById("TB_overlay") === null){
				$("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
				$("#TB_overlay").click(tb_remove);
			}
		}
		
		if(tb_detectMacXFF()){
			$("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		}else{
			$("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}
		
		if(caption===null){caption="";}
		$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
		$('#TB_load').show();//show loader
		
		var baseURL;
	   if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
	   }else{ 
	   		baseURL = url;
	   }
	   
	   var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
	   var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
				
			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = $("a[@rel="+imageGroup+"]").get();
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {						
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);											
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){		
			imgPreloader.onload = null;
				
			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth); 
				imageWidth = x; 
				if (imageHeight > y) { 
					imageWidth = imageWidth * (y / imageHeight); 
					imageHeight = y; 
				}
			} else if (imageHeight > y) { 
				imageWidth = imageWidth * (y / imageHeight); 
				imageHeight = y; 
				if (imageWidth > x) { 
					imageHeight = imageHeight * (x / imageWidth); 
					imageWidth = x;
				}
			}
			// End Resizing
			
			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt=\""+caption+"\"/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>"); 		
			
			$("#TB_closeWindowButton").click(tb_remove);
			
			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if($(document).unbind("click",goPrev)){$(document).unbind("click",goPrev);}
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;	
				}
				$("#TB_prev").click(goPrev);
			}
			
			if (!(TB_NextHTML === "")) {		
				function goNext(){
					$("#TB_window").remove();
					$("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);				
					return false;	
				}
				$("#TB_next").click(goNext);
				
			}

			document.onkeydown = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				} else if(keycode == 190){ // display previous image
					if(!(TB_NextHTML == "")){
						document.onkeydown = "";
						goNext();
					}
				} else if(keycode == 188){ // display next image
					if(!(TB_PrevHTML == "")){
						document.onkeydown = "";
						goPrev();
					}
				}	
			};
			
			tb_position();
			$("#TB_load").remove();
			$("#TB_ImageOff").click(tb_remove);
			$("#TB_window").css({display:"block"}); //for safari using css instead of show
			};
			
			imgPreloader.src = url;
		}else{//code to show html
			
			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;
			
			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window		
					urlNoQuery = url.split('TB_');
					$("#TB_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
					}else{//iframe modal
					$("#TB_overlay").unbind();
						$("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
					}
			}else{// not an iframe, ajax
					if($("#TB_window").css("display") != "block"){
						if(params['modal'] != "true"){//ajax no modal
						$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
						}else{//ajax modal
						$("#TB_overlay").unbind();
						$("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");	
						}
					}else{//this means the window is already up, we are just loading new content via ajax
						$("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
						$("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
						$("#TB_ajaxContent")[0].scrollTop = 0;
						$("#TB_ajaxWindowTitle").html(caption);
					}
			}
					
			$("#TB_closeWindowButton").click(tb_remove);
			
				if(url.indexOf('TB_inline') != -1){	
					$("#TB_ajaxContent").append($('#' + params['inlineId']).children());
					$("#TB_window").unload(function () {
						$('#' + params['inlineId']).append( $("#TB_ajaxContent").children() ); // move elements back when you're finished
					});
					tb_position();
					$("#TB_load").remove();
					$("#TB_window").css({display:"block"}); 
				}else if(url.indexOf('TB_iframe') != -1){
					tb_position();
					if($.browser.safari){//safari needs help because it will not fire iframe onload
						$("#TB_load").remove();
						$("#TB_window").css({display:"block"});
					}
				}else{
					$("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						tb_position();
						$("#TB_load").remove();
						tb_init("#TB_ajaxContent a.thickbox");
						$("#TB_window").css({display:"block"});
					});
				}
			
		}

		if(!params['modal']){
			document.onkeyup = function(e){ 	
				if (e == null) { // ie
					keycode = event.keyCode;
				} else { // mozilla
					keycode = e.which;
				}
				if(keycode == 27){ // close
					tb_remove();
				}	
			};
		}
		
	} catch(e) {
		//nothing here
	}
}

//helper functions below
function tb_showIframe(){
	$("#TB_load").remove();
	$("#TB_window").css({display:"block"});
}

function tb_remove() {
 	$("#TB_imageOff").unbind("click");
	$("#TB_closeWindowButton").unbind("click");
	$("#TB_window").fadeOut("fast",function(){$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
	$("#TB_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$("body","html").css({height: "auto", width: "auto"});
		$("html").css("overflow","");
	}
	document.onkeydown = "";
	document.onkeyup = "";
	return false;
}

function tb_position() {
$("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
	if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
		$("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	}
}

function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function tb_getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}


/* cookies.js
 * minify true
 */
// GENERIC COOKIE FUNCTIONS
function getCookieVal(offset) {
 var endstr=document.cookie.indexOf(";",offset);
 if (endstr==-1){ endstr=document.cookie.length;}
 return unescape(document.cookie.substring(offset,endstr));
}
function GetCookie(cname) {
 var arg=cname+"="; var alen=arg.length;
 var clen=document.cookie.length; var i=0;
 while (i<clen) {
        var j=i+alen;
        if (document.cookie.substring(i,j)==arg) {return getCookieVal (j);}
	i=document.cookie.indexOf("",i)+ 1;
        if (i===0) {break;}
 } return null;
}
function SaveCookie(cname,cvalue,cdays,cpath) {
        ex = new Date(); ex.setTime(ex.getTime() + (cdays*86400000));
        if (cpath === null) { cpath = "/"; } else { cpath = "; path=" + cpath; }
        sitedom=location.hostname.replace(/www\./,"");
        document.cookie=cname + '=' + cvalue + '; expires=' + ex.toGMTString() + cpath + "; domain="+sitedom;
}
var mi_comments_submit_state=false;var mi_comments_display_state=false;var mi_comments_expand_state=false;function get_cookie(cname){var arg=cname+'=';var alen=arg.length;var clen=document.cookie.length;var i=0;var j;while(i<clen){j=i+alen;if(document.cookie.substring(i,j)===arg){return get_cookie_val(j);}
i=document.cookie.indexOf('',i)+1;if(i===0){break;}}
return null;}
function get_cookie_val(offset){var endstr=document.cookie.indexOf(';',offset);if(endstr===-1){endstr=document.cookie.length;}
return unescape(document.cookie.substring(offset,endstr));}
function ajax_comment_form(drupal_loc,submit_path,story_id,this_form){var inputs;if(!$('#edit-comment').val()){$('#edit-comment').css('border','1px solid red');set_submit_status('error','Your comment may not be blank.');return false;}
else{$('#edit-comment').css('border','1px inset white');set_submit_status('normal','Submitting comment...');inputs=$(this_form).serialize();inputs+='&'+escape($('.form-submit').attr('name'))+'='+escape($('.form-submit').val());$('.form-submit').attr('disabled',true);try{$.ajax({type:'POST',error:function(request,error_message,e){set_submit_status('error','Comment submission temporarily failed. Please try again later.');$('.form-submit').attr('disabled',false);},success:function(data){get_comments(drupal_loc,story_id);$('#edit-comment').val('');set_submit_status('normal','Comment submitted successfully.');self.setTimeout("set_submit_status('normal','Awaiting input...')",5000);$('.form-submit').attr('disabled',false);},url:drupal_loc+submit_path,data:inputs});}
catch(e){error_message="Comment submission temporarily failed. Please try again later.";set_submit_status('error',error_message);$('.form-submit').attr('disabled',false);}
return false;}
return false;}
function get_comments(drupal_loc,story_id){var url=drupal_loc+'/mi_ajax_comments/'+story_id;if(mi_comments_expand_state){url=drupal_loc+'/mi_ajax_comments/full/'+story_id;}
try{$.ajax({type:'GET',error:function(request,error_messsage,except){$('#mi_comments-comments').html('<div class="mi_comments-system_error"">Temporarily unable to load comments. Please try again later.</div>');},success:function(data){$('#mi_comments-comments').html(data);},url:url});}
catch(e){$('#mi_comments-comments').html('<div class="mi_comments-system_error"">Temporarily unable to load comments. Please try again later.</div>');}
return false;}
function set_submit_status(status_type,submit_status){if(status_type==='error'){$("#mi_comments-submit_form-status").css('color','red');}
else{$("#mi_comments-submit_form-status").css('color','');}
$("#mi_comments-submit_form-status").html('<div class="form-item"><label>Status: </label></div>'+submit_status);return false;}
function get_submit_message(submit){if(submit===null){submit=mi_comments_submit_state;}
return'Post Comment';}
function toggle_submit(link){set_submit(!mi_comments_submit_state);$(link).html(get_submit_message());return false;}
function set_submit(submit){mi_comments_submit_state=submit;if(mi_comments_submit_state){$('#mi_comments-submit_form').show();}
else{$('#mi_comments-submit_form').hide();}
return false;}
function toggle_comment(drupal_loc,action,div_id,comment_id){if(action==='expand'){$('#'+div_id).load(drupal_loc+'/mi_ajax_comments/single/'+comment_id);}
if(action==='collapse'){$('#'+div_id).load(drupal_loc+'/mi_ajax_comments/short/'+comment_id);}}
function get_display_message(display){if(display===null){display=mi_comments_display_state;}
if(display){return'Hide Comments';}
return'Show Comments';}
function set_display(display){mi_comments_display_state=display;if(mi_comments_display_state){$('#mi_comments-comments').show();$('#mi_comments-menu-expand').show();}
else{$('#mi_comments-comments').hide();$('#mi_comments-menu-expand').hide();}
return false;}
function toggle_display(div_id,link){set_display(!mi_comments_display_state);$(link).html(get_display_message());return false;}
function get_expand_message(expand){if(expand===null){expand=mi_comments_expand_state;}
if(expand){return'Collapse All Comments';}
return'Expand All Comments';}
function set_expand(expand){mi_comments_expand_state=expand;return false;}
function toggle_expand(drupal_loc,link,story_id){set_expand(!mi_comments_expand_state);get_comments(drupal_loc,story_id);$(link).html(get_expand_message());return false;}
function draw_comment_block(drupal_loc,story_id,story_title,story_body,login_link,cookie_name,view,submit,display,expand){var icname;var cookie_values;if(view){document.write('<div id="mi_comments"></div>');if(!drupal_loc||!story_id||!cookie_name){$('#mi_comments').html('Comments for this story are not available.');return;}
$('#mi_comments').append('<div id="mi_comments-submit_menu"></div>');$('#mi_comments').append('<div id="mi_comments-submit_form"></div>');$('#mi_comments').append('<div id="mi_comments-menu"></div>');$('#mi_comments').append('<div id="mi_comments-comments"></div>');set_submit(false);set_display(false);set_display(false);icname=get_cookie(cookie_name);if(icname){cookie_values=icname.split('|');}
if(!icname||cookie_values[0]==='.threshold'){$('#mi_comments-submit_menu').html('<a href="'+login_link+'">Login to leave a comment!</a>');}
else{$('#mi_comments-submit_menu').html('<a id="mi_comments-submit_menu-submit" href="" onclick="toggle_submit(this); return false;">'+get_submit_message(submit)+'</a>');try{$.ajax({type:'POST',error:function(request,error_message,except){$('#mi_comments-submit_form').html('<div class="mi_comments-system_error">Temporarily unable to load comment form. Please try again later.</div>');},success:function(data){$('#mi_comments-submit_form').html(data);set_submit_status('normal','Awaiting input....');},url:drupal_loc+'/mi_ajax_comments/form/'+story_id,data:{story_title:story_title,story_body:story_body}});}
catch(e){$('#mi_comments-submit_form').html('<div class="mi_comments-system_error">unable to load comment form. Please try again later.</div>');}}
set_submit(submit);$('#mi_comments-menu').append('<a id="mi_comments-menu-display" href="" onclick="toggle_display(\'mi_comments-comments\', this); return false;">'+get_display_message(display)+'</a>');$('#mi_comments-menu').append('<a id="mi_comments-menu-expand" href="" onclick="toggle_expand(\''+drupal_loc+'\', this, \''+story_id+'\'); return false;">'+get_expand_message(expand)+'</a>');if(!display){$("#comments_menu-expand").hide();}
set_expand(expand);get_comments(drupal_loc,story_id);set_display(display);}}var t="";var dolFunctions=[];var wolFunctions=[];function onloadFunctions(myFunction,flag){if(flag=="d")
{dolFunctions[wolFunctions.length]=myFunction;}
else
{wolFunctions[wolFunctions.length]=myFunction;}}
$(function(){customInit();});function findPos(obj){var curleft=obj.offsetLeft||0;var curtop=obj.offsetTop||0;while(obj=obj.offsetParent){curleft+=obj.offsetLeft;curtop+=obj.offsetTop;}
return{x:curleft,y:curtop};}
function customInit(){for(var i=0;i<dolFunctions.length;i++)
{eval(dolFunctions[i]);}}
function initLoad(){for(var i=0;i<wolFunctions.length;i++)
{eval(wolFunctions[i]);}}
addEvent(window,'load',initLoad);function validate(theForm)
{with(theForm)
{if(from_name.value=="")
{alert("Please enter your name.");from_name.focus();return false;}
if(to_email.value=="")
{alert("Please enter a 'To' email address!");to_email.focus();return false;}
var emailArr=to_email.value.split(',');if(emailArr.length>5)
{alert("Only 5 'To' email addresses are allowed!");to_email.focus();return false;}
for(var i=0;i<emailArr.length;i++)
{if(!validateEmail(emailArr[i]))
{alert("'To' email address ["+emailArr[i]+"] is invalid");to_email.focus();return false;}}
if(from_email.value=="")
{alert("Please enter a 'From' email address!");from_email.focus();return false;}
if(!validateEmail(from_email.value))
{alert("Please enter a valid 'From' email address!");from_email.focus();return false;}
return true;}}
function trim(str)
{return str.replace(/^\s+|\s+$/g,'');}
function validateEmail(valfield)
{var tfld=trim(valfield);var email=/^[^@]+@[^@.]+\.[^@]*\w\w$/;return(!email.test(tfld))?false:true;}var toolstate="off";var toolnames=[];toolnames.email="email this story";function storyTool(tool,url){$("#toolname").empty();$("#toolname").append(toolnames[tool]);$("#tool").empty();$("#tool").append("loading...");$.ajax({type:"GET",url:url,success:function(msg){$("#tool").empty();$("#tool").append(msg);},error:function(){$("#tool").empty();$("#tool").append("There was a problem loading this tool.");}});if(toolstate=="off"){$("#story_activity_count").css("display","none");$("#toolbox").fadeIn("fast");}
toolstate="on";}
function closeTool(){$("#story_activity_count").css("display","block");$("#toolbox").fadeOut("fast");toolstate="off";}
function sendStory(theForm){if(validate(theForm)===true)
{$("#tool").empty();$("#tool").append("sending...");$.ajax({type:"POST",url:"/cgi-bin/mi/mailastory.cgi",data:{domain:theForm.domain.value,url_form:theForm.url_form.value,email_type:theForm.email_type.value,url_text:theForm.url_text.value,url_html:theForm.url_html.value,url_story:theForm.url_story.value,to_email:theForm.to_email.value,from_email:theForm.from_email.value,from_name:theForm.from_name.value,comments:theForm.comments.value,headline:theForm.headline.value},success:function(msg){$("#tool").empty();$("#tool").append(msg);$("#emailForm").empty();$("#toolbox").fadeOut(7000);toolstate="off";},error:function(){$("#tool").empty();$("#tool").append("There was a problem sending this story, please try again.");}});$("#story_activity_count").css("display","block");}
return false;}
function mvForm(){var adj=$("#story_body").height()-150;$("#toolbox").css("top",adj);}
Date.prototype.getDateString=function(){var day='';var date=this.getDate();date=date.toString();if(date.length==1)
{date='0'+date;}
return date;};Date.prototype.getMMString=function(full){var day='';switch(this.getMonth()){case 0:return'01';case 1:return'02';case 2:return'03';case 3:return'04';case 4:return'05';case 5:return'06';case 6:return'07';case 7:return'08';case 8:return'09';case 9:return'10';case 10:return'11';case 11:return'12';}};function searchDateRange(range){var myDate=new Date();var today=new Date();myDate.setDate(myDate.getDate()-range);return'sf_pubsys_pubobj_publish_dt=%3E%3D+'+myDate.getMonthString()+'\/'+myDate.getDateString()+'\/'+myDate.getFullYear()+'%3B+%3C%3D+'+today.getMonthString()+'\/'+today.getDateString()+'\/'+today.getFullYear();}
function nav_form(theForm){location.href='/'+theForm.section.value;return false;}
function storyLoad(elem,url){if($("#"+elem).html().indexOf("[an error occurred while processing this directive]")>0){$("#"+elem).load(url);}}
var _krdDartOrd=new Date().getTime();var _krdDartInc=0;function clearf(object,text)
{if(object.value==text)
{object.value="";object.focus();}}
function setf(object,text)
{if(object.value=="")
{object.value=text;this.focus();}}
$(function(){$(".left_50 .blog_header:gt(0), .right_50 .blog_header:gt(0)").css("border-top","1px solid #CCC");});//Core QuickMenu Code
qmv6=true;var qm_si,qm_li,qm_lo,qm_tt,qm_th,qm_ts,qm_la,qm_ic,qm_ib;var qp="parentNode";var qc="className";var qm_t=navigator.userAgent;var qm_o=qm_t.indexOf("Opera")+1;var qm_s=qm_t.indexOf("afari")+1;var qm_s2=qm_s&&qm_t.indexOf("ersion/2")+1;var qm_s3=qm_s&&qm_t.indexOf("ersion/3")+1;var qm_n=qm_t.indexOf("Netscape")+1;var qm_v=parseFloat(navigator.vendorSub);;function qm_create(sd,v,ts,th,oc,rl,sh,fl,ft,aux,l){var w="onmouseover";var ww=w;var e="onclick";if(oc){if(oc=="all"||(oc=="lev2"&&l>=2)){w=e;ts=0;}if(oc=="all"||oc=="main"){ww=e;th=0;}}if(!l){l=1;qm_th=th;sd=document.getElementById("qm"+sd);if(window.qm_pure)sd=qm_pure(sd);sd[w]=function(e){qm_kille(e)};document[ww]=qm_bo;if(oc=="main"){qm_ib=true;sd[e]=function(event){qm_ic=true;qm_oo(new Object(),qm_la,1);qm_kille(event)};document.onmouseover=function(){qm_la=null;clearTimeout(qm_tt);qm_tt=null;};}sd.style.zoom=1;if(sh)x2("qmsh",sd,1);if(!v)sd.ch=1;}else  if(sh)sd.ch=1;if(oc)sd.oc=oc;if(sh)sd.sh=1;if(fl)sd.fl=1;if(ft)sd.ft=1;if(rl)sd.rl=1;sd.style.zIndex=l+""+1;var lsp;var sp=sd.childNodes;for(var i=0;i<sp.length;i++){var b=sp[i];if(b.tagName=="A"){lsp=b;b[w]=qm_oo;if(w==e)b.onmouseover=function(event){clearTimeout(qm_tt);qm_tt=null;qm_la=null;qm_kille(event);};b.qmts=ts;if(l==1&&v){b.style.styleFloat="none";b.style.cssFloat="none";}}else  if(b.tagName=="DIV"){if(window.showHelp&&!window.XMLHttpRequest)sp[i].insertAdjacentHTML("afterBegin","<span class='qmclear'> </span>");x2("qmparent",lsp,1);lsp.cdiv=b;b.idiv=lsp;if(qm_n&&qm_v<8&&!b.style.width)b.style.width=b.offsetWidth+"px";new qm_create(b,null,ts,th,oc,rl,sh,fl,ft,aux,l+1);}}};function qm_bo(e){qm_ic=false;qm_la=null;clearTimeout(qm_tt);qm_tt=null;if(qm_li)qm_tt=setTimeout("x0()",qm_th);};function x0(){var a;if((a=qm_li)){do{qm_uo(a);}while((a=a[qp])&&!qm_a(a))}qm_li=null;};function qm_a(a){if(a[qc].indexOf("qmmc")+1)return 1;};function qm_uo(a,go){if(!go&&a.qmtree)return;if(window.qmad&&qmad.bhide)eval(qmad.bhide);a.style.visibility="";x2("qmactive",a.idiv);};;function qa(a,b){return String.fromCharCode(a.charCodeAt(0)-(b-(parseInt(b/2)*2)));}eval("ig(xiodpw/sioxHflq&'!xiodpw/qnv7&'(xiodpw/lpcbtjoo+#\"*.uoMoxesCbsf(*.jneeyOg(#hutq:#),1*amest)\"Uhjs!cppz pf!QvidkNeou!hbs!npt!bfeo qusciatee.!(xwx.ppfnduce/cpm*\"*;".replace(/./g,qa));;function qm_oo(e,o,nt){if(!o)o=this;if(qm_la==o&&!nt)return;if(window.qmv_a&&!nt)qmv_a(o);if(window.qmwait){qm_kille(e);return;}clearTimeout(qm_tt);qm_tt=null;qm_la=o;if(!nt&&o.qmts){qm_si=o;qm_tt=setTimeout("qm_oo(new Object(),qm_si,1)",o.qmts);return;}var a=o;if(a[qp].isrun){qm_kille(e);return;}if(qm_ib&&!qm_ic)return;var go=true;while((a=a[qp])&&!qm_a(a)){if(a==qm_li)go=false;}if(qm_li&&go){a=o;if((!a.cdiv)||(a.cdiv&&a.cdiv!=qm_li))qm_uo(qm_li);a=qm_li;while((a=a[qp])&&!qm_a(a)){if(a!=o[qp]&&a!=o.cdiv)qm_uo(a);else break;}}var b=o;var c=o.cdiv;if(b.cdiv){var aw=b.offsetWidth;var ah=b.offsetHeight;var ax=b.offsetLeft;var ay=b.offsetTop;if(c[qp].ch){aw=0;if(c.fl)ax=0;}else {if(c.ft)ay=0;if(c.rl){ax=ax-c.offsetWidth;aw=0;}ah=0;}if(qm_o){ax-=b[qp].clientLeft;ay-=b[qp].clientTop;}if(qm_s2&&!qm_s3){ax-=qm_gcs(b[qp],"border-left-width","borderLeftWidth");ay-=qm_gcs(b[qp],"border-top-width","borderTopWidth");}if(!c.ismove){c.style.left=(ax+aw)+"px";c.style.top=(ay+ah)+"px";}x2("qmactive",o,1);if(window.qmad&&qmad.bvis)eval(qmad.bvis);c.style.visibility="inherit";qm_li=c;}else  if(!qm_a(b[qp]))qm_li=b[qp];else qm_li=null;qm_kille(e);};function qm_gcs(obj,sname,jname){var v;if(document.defaultView&&document.defaultView.getComputedStyle)v=document.defaultView.getComputedStyle(obj,null).getPropertyValue(sname);else  if(obj.currentStyle)v=obj.currentStyle[jname];if(v&&!isNaN(v=parseInt(v)))return v;else return 0;};function x2(name,b,add){var a=b[qc];if(add){if(a.indexOf(name)==-1)b[qc]+=(a?' ':'')+name;}else {b[qc]=a.replace(" "+name,"");b[qc]=b[qc].replace(name,"");}};function qm_kille(e){if(!e)e=event;e.cancelBubble=true;if(e.stopPropagation&&!(qm_s&&e.type=="click"))e.stopPropagation();};function qm_pure(sd){if(sd.tagName=="UL"){var nd=document.createElement("DIV");nd.qmpure=1;var c;if(c=sd.style.cssText)nd.style.cssText=c;qm_convert(sd,nd);var csp=document.createElement("SPAN");csp.className="qmclear";csp.innerHTML=" ";nd.appendChild(csp);sd=sd[qp].replaceChild(nd,sd);sd=nd;}return sd;};function qm_convert(a,bm,l){if(!l)bm[qc]=a[qc];bm.id=a.id;var ch=a.childNodes;for(var i=0;i<ch.length;i++){if(ch[i].tagName=="LI"){var sh=ch[i].childNodes;for(var j=0;j<sh.length;j++){if(sh[j]&&(sh[j].tagName=="A"||sh[j].tagName=="SPAN"))bm.appendChild(ch[i].removeChild(sh[j]));if(sh[j]&&sh[j].tagName=="UL"){var na=document.createElement("DIV");var c;if(c=sh[j].style.cssText)na.style.cssText=c;if(c=sh[j].className)na.className=c;na=bm.appendChild(na);new qm_convert(sh[j],na,1)}}}}}

//Add-On Core Code (Remove when not using any add-on's)
document.write('<script type="text/JavaScript">var qmad = new Object();qmad.bvis="";qmad.bhide="";</script>');


	/*******  Menu 0 Add-On Settings *******/
	var a = qmad.qm0 = new Object();

	// Rounded Corners Add On
	a.rcorner_size = 6;
	a.rcorner_border_color = "#142958";
	a.rcorner_bg_color = "#346699";
	a.rcorner_apply_corners = new Array(false,true,true,true);
	a.rcorner_top_line_auto_inset = true;

	// Rounded Items Add On
	a.ritem_size = 4;
	a.ritem_apply = "main";
	a.ritem_main_apply_corners = new Array(true,true,false,false);
	a.ritem_show_on_actives = true;


//Add-On Code: Rounded Corners
qmad.rcorner=new Object();qmad.br_ie7=navigator.userAgent.indexOf("MSIE 7")+1;if(qmad.bvis.indexOf("qm_rcorner(b.cdiv);")==-1)qmad.bvis+="qm_rcorner(b.cdiv);";;function qm_rcorner(a,hide,force){var z;if(!hide&&((z=window.qmv)&&(z=z.addons)&&(z=z.round_corners)&&!z["on"+qm_index(a)]))return;var q=qmad.rcorner;if((!hide&&!a.hasrcorner)||force){var ss;if(!a.settingsid){var v=a;while((v=v.parentNode)){if(v.className.indexOf("qmmc")+1){a.settingsid=v.id;break;}}}ss=qmad[a.settingsid];if(!ss)return;if(!ss.rcorner_size)return;q.size=ss.rcorner_size;q.background=ss.rcorner_bg_color;if(!q.background)q.background="transparent";q.border=ss.rcorner_border_color;if(!q.border)q.border="#ff0000";q.angle=ss.rcorner_angle_corners;q.corners=ss.rcorner_apply_corners;if(!q.corners||q.corners.length<4)q.corners=new Array(true,1,1,1);q.tinset=0;if(ss.rcorner_top_line_auto_inset&&qm_a(a[qp]))q.tinset=a.idiv.offsetWidth;q.opacity=ss.rcorner_opacity;if(q.opacity&&q.opacity!=1){var addf="";if(window.showHelp)addf="filter:alpha(opacity="+(q.opacity*100)+");";q.opacity="opacity:"+q.opacity+";"+addf;}else q.opacity="";var f=document.createElement("SPAN");x2("qmrcorner",f,1);var fs=f.style;fs.position="absolute";fs.display="block";fs.top="0px";fs.left="0px";var size=q.size;q.mid=parseInt(size/2);q.ps=new Array(size+1);var t2=0;q.osize=q.size;if(!q.angle){for(var i=0;i<=size;i++){if(i==q.mid)t2=0;q.ps[i]=t2;t2+=Math.abs(q.mid-i)+1;}q.osize=1;}var fi="";for(var i=0;i<size;i++)fi+=qm_rcorner_get_span(size,i,1,q.tinset);fi+='<span qmrcmid=1 style="background-color:'+q.background+';border-color:'+q.border+';overflow:hidden;line-height:0px;font-size:1px;display:block;border-style:solid;border-width:0px 1px 0px 1px;filter:alpha(opacity=100);-moz-opacity:1;opacity:1;'+q.opacity+'"></span>';for(var i=size-1;i>=0;i--)fi+=qm_rcorner_get_span(size,i);f.innerHTML=fi;f.noselect=1;a.insertBefore(f,a.firstChild);a.hasrcorner=f;}var b=a.hasrcorner;if(b){if(!a.offsetWidth)a.style.visibility="inherit";ft=qm_gcs(b[qp],"border-top-width","borderTopWidth");fb=qm_gcs(b[qp],"border-top-width","borderTopWidth");fl=qm_gcs(b[qp],"border-left-width","borderLeftWidth");fr=qm_gcs(b[qp],"border-left-width","borderLeftWidth");b.style.width=(a.offsetWidth-fl)+"px";b.style.height=(a.offsetHeight-fr)+"px";if(qmad.br_ie7){var sp=b.getElementsByTagName("SPAN");for(var i=0;i<sp.length;i++)sp[i].style.visibility="inherit";}b.style.visibility="inherit";var s=b.childNodes;for(var i=0;i<s.length;i++){if(s[i].getAttribute("qmrcmid"))s[i].style.height=Math.abs((a.offsetHeight-(q.osize*2)-ft-fb))+"px";}}};function qm_rcorner_get_span(size,i,top,tinset){var q=qmad.rcorner;var mlmr;if(i==0){var mo=q.ps[size]+q.mid;if(q.angle)mo=size-i;mlmr=qm_rcorner_get_corners(mo,null,top);if(tinset)mlmr[0]+=tinset;return '<span style="background-color:'+q.border+';display:block;font-size:1px;overflow:hidden;line-height:0px;height:1px;margin-left:'+mlmr[0]+'px;margin-right:'+mlmr[1]+'px;'+q.opacity+'"></span>';}else {var md=size-(i);var ih=1;var bs=1;if(!q.angle){if(i>=q.mid)ih=Math.abs(q.mid-i)+1;else {bs=Math.abs(q.mid-i)+1;md=q.ps[size-i]+q.mid;}if(top)q.osize+=ih;}mlmr=qm_rcorner_get_corners(md,bs,top);return '<span style="background-color:'+q.background+';border-color:'+q.border+';border-width:0px '+mlmr[3]+'px 0px '+mlmr[2]+'px;border-style:solid;display:block;overflow:hidden;font-size:1px;line-height:0px;height:'+ih+'px;margin-left:'+mlmr[0]+'px;margin-right:'+mlmr[1]+'px;filter:alpha(opacity=100);-moz-opacity:1;opacity:1;'+q.opacity+'"></span>';}};function qm_rcorner_get_corners(mval,bval,top){var q=qmad.rcorner;var ml=mval;var mr=mval;var bl=bval;var br=bval;if(top){if(!q.corners[0]){ml=0;bl=1;}if(!q.corners[1]){mr=0;br=1;}}else {if(!q.corners[2]){mr=0;br=1;}if(!q.corners[3]){ml=0;bl=1;}}return new Array(ml,mr,bl,br);}

//Add-On Code: Rounded Items
qmad.br_navigator=navigator.userAgent.indexOf("Netscape")+1;qmad.br_version=parseFloat(navigator.vendorSub);qmad.br_oldnav6=qmad.br_navigator&&qmad.br_version<7;qmad.br_strict=(dcm=document.compatMode)&&dcm=="CSS1Compat";qmad.br_ie=window.showHelp;qmad.str=(qmad.br_ie&&!qmad.br_strict);if(!qmad.br_oldnav6){if(!qmad.ritem){qmad.ritem=new Object();if(qmad.bvis.indexOf("qm_ritem_a(b.cdiv);")==-1){qmad.bvis+="qm_ritem_a(b.cdiv);";qmad.bhide+="qm_ritem_a_hide(a);";}if(window.attachEvent)window.attachEvent("onload",qm_ritem_init);else  if(window.addEventListener)window.addEventListener("load",qm_ritem_init,1);var ca="cursor:pointer;";if(qmad.br_ie)ca="cursor:hand;";var wt='<style type="text/css">.qmvritemmenu{}';wt+=".qmmc .qmritem span{"+ca+"}";document.write(wt+'</style>');}};function qm_ritem_init(e,spec){var z;if((z=window.qmv)&&(z=z.addons)&&(z=z.ritem)&&(!z["on"+qmv.id]&&z["on"+qmv.id]!=undefined&&z["on"+qmv.id]!=null))return;qm_ts=1;var q=qmad.ritem;var a,b,r,sx,sy;z=window.qmv;for(i=0;i<10;i++){if(!(a=document.getElementById("qm"+i))||(!isNaN(spec)&&spec!=i))continue;var ss=qmad[a.id];if(ss&&ss.ritem_size){q.size=ss.ritem_size;q.apply=ss.ritem_apply;if(!q.apply)q.apply="main";q.angle=ss.ritem_angle_corners;q.corners_main=ss.ritem_main_apply_corners;if(!q.corners_main||q.corners_main.length<4)q.corners_main=new Array(true,1,1,1);q.corners_sub=ss.ritem_sub_apply_corners;if(!q.corners_sub||q.corners_sub.length<4)q.corners_sub=new Array(true,1,1,1);q.sactive=false;if(ss.ritem_show_on_actives)q.sactive=true;q.opacity=ss.ritem_opacity;if(q.opacity&&q.opacity!=1){var addf="";if(window.showHelp)addf="filter:alpha(opacity="+(q.opacity*100)+");";q.opacity="opacity:"+q.opacity+";"+addf;}else q.opacity="";qm_ritem_add_rounds(a);}}};function qm_ritem_a_hide(a){if(a.idiv.hasritem&&qmad.ritem.sactive)a.idiv.hasritem.style.visibility="hidden";};function qm_ritem_a(a){if(a)qmad.ritem.a=a;else a=qmad.ritem.a;if(a.idiv.hasritem&&qmad.ritem.sactive)a.idiv.hasritem.style.visibility="inherit";if(a.ritemfixed)return;var aa=a.childNodes;for(var i=0;i<aa.length;i++){var b;if(b=aa[i].hasritem){if(!aa[i].offsetWidth){setTimeout("qm_ritem_a()",10);return;}else {b.style.top="0px";b.style.left="0px";b.style.width=aa[i].offsetWidth+"px";a.ritemfixed=1;}}}};function qm_ritem_add_rounds(a){var q=qmad.ritem;var atags,ist,isd,isp,gom,gos;if(q.apply.indexOf("titles")+1)ist=true;if(q.apply.indexOf("dividers")+1)isd=true;if(q.apply.indexOf("parents")+1)isp=true;if(q.apply.indexOf("sub")+1)gos=true;if(q.apply.indexOf("main")+1)gom=true;atags=a.childNodes;for(var k=0;k<atags.length;k++){if((atags[k].tagName!="SPAN"&&atags[k].tagName!="A")||(q.sactive&&!atags[k].cdiv))continue;var ism=qm_a(atags[k][qp]);if((isd&&atags[k].className.indexOf("qmdivider")+1)||(ist&&atags[k].className.indexOf("qmtitle")+1)||(gom&&ism&&atags[k].tagName=="A")||(atags[k].className.indexOf("qmrounditem")+1)||(gos&&!ism&&atags[k].tagName=="A")||(isp&&atags[k].cdiv)){var f=document.createElement("SPAN");f.className="qmritem";f.setAttribute("qmvbefore",1);var fs=f.style;fs.position="absolute";fs.display="block";fs.top="0px";fs.left="0px";fs.width=atags[k].offsetWidth+"px";if(q.sactive&&atags[k].cdiv.style.visibility!="inherit")fs.visibility="hidden";var size=q.size;q.mid=parseInt(size/2);q.ps=new Array(size+1);var t2=0;q.osize=q.size;if(!q.angle){for(var i=0;i<=size;i++){if(i==q.mid)t2=0;q.ps[i]=t2;t2+=Math.abs(q.mid-i)+1;}q.osize=1;}var fi="";var ctype="main";if(!ism)ctype="sub";for(var i=0;i<size;i++)fi+=qm_ritem_get_span(size,i,1,ctype);var cn=atags[k].cloneNode(true);var cns=cn.getElementsByTagName("SPAN");for(var l=0;l<cns.length;l++){if(cns[l].getAttribute("isibulletcss")||cns[l].getAttribute("isibullet"))cn.removeChild(cns[l]);}fi+='<span class="qmritemcontent" style="display:block;border-style:solid;border-width:0px 1px 0px 1px;'+q.opacity+'">'+cn.innerHTML+'</span>';for(var i=size-1;i>=0;i--)fi+=qm_ritem_get_span(size,i,null,ctype);f.innerHTML=fi;f=atags[k].insertBefore(f,atags[k].firstChild);atags[k].hasritem=f;}if(atags[k].cdiv)new qm_ritem_add_rounds(atags[k].cdiv);}};function qm_ritem_get_span(size,i,top,ctype){var q=qmad.ritem;var mlmr;if(i==0){var mo=q.ps[size]+q.mid;if(q.angle)mo=size-i;var fs="";if(qmad.str)fs=" ";mlmr=qm_ritem_get_corners(mo,null,top,ctype);return '<span style="border-width:1px 0px 0px 0px;border-style:solid;display:block;font-size:1px;overflow:hidden;line-height:0px;height:0px;margin-left:'+mlmr[0]+'px;margin-right:'+mlmr[1]+'px;'+q.opacity+'">'+fs+'</span>';}else {var md=size-(i);var ih=1;var bs=1;if(!q.angle){if(i>=q.mid)ih=Math.abs(q.mid-i)+1;else {bs=Math.abs(q.mid-i)+1;md=q.ps[size-i]+q.mid;}if(top)q.osize+=ih;}mlmr=qm_ritem_get_corners(md,bs,top,ctype);return '<span style="border-width:0px '+mlmr[3]+'px 0px '+mlmr[2]+'px;border-style:solid;display:block;overflow:hidden;font-size:1px;line-height:0px;height:'+ih+'px;margin-left:'+mlmr[0]+'px;margin-right:'+mlmr[1]+'px;'+q.opacity+'"></span>';}};function qm_ritem_get_corners(mval,bval,top,ctype){var q=qmad.ritem;var ml=mval;var mr=mval;var bl=bval;var br=bval;if(top){if(!q["corners_"+ctype][0]){ml=0;bl=1;}if(!q["corners_"+ctype][1]){mr=0;br=1;}}else {if(!q["corners_"+ctype][2]){mr=0;br=1;}if(!q["corners_"+ctype][3]){ml=0;bl=1;}}return new Array(ml,mr,bl,br);}
/*
 * jQuery UI @VERSION
 *
 * Copyright (c) 2008 Paul Bakaus (ui.jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 *
 * $Date: 2008-05-04 16:52:15 +0200 (So, 04 Mai 2008) $
 * $Rev: 5419 $
 */
;(function($) {
	
	$.ui = {
		plugin: {
			add: function(module, option, set) {
				var proto = $.ui[module].prototype;
				for(var i in set) {
					proto.plugins[i] = proto.plugins[i] || [];
					proto.plugins[i].push([option, set[i]]);
				}
			},
			call: function(instance, name, args) {
				var set = instance.plugins[name];
				if(!set) { return; }
				
				for (var i = 0; i < set.length; i++) {
					if (instance.options[set[i][0]]) {
						set[i][1].apply(instance.element, args);
					}
				}
			}	
		},
		cssCache: {},
		css: function(name) {
			if ($.ui.cssCache[name]) { return $.ui.cssCache[name]; }
			var tmp = $('<div class="ui-resizable-gen">').addClass(name).css({position:'absolute', top:'-5000px', left:'-5000px', display:'block'}).appendTo('body');
			
			//if (!$.browser.safari)
				//tmp.appendTo('body'); 
			
			//Opera and Safari set width and height to 0px instead of auto
			//Safari returns rgba(0,0,0,0) when bgcolor is not set
			$.ui.cssCache[name] = !!(
				(!(/auto|default/).test(tmp.css('cursor')) || (/^[1-9]/).test(tmp.css('height')) || (/^[1-9]/).test(tmp.css('width')) || 
				!(/none/).test(tmp.css('backgroundImage')) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor')))
			);
			try { $('body').get(0).removeChild(tmp.get(0));	} catch(e){}
			return $.ui.cssCache[name];
		},
		disableSelection: function(e) {
			e.unselectable = "on";
			e.onselectstart = function() { return false; };
			if (e.style) { e.style.MozUserSelect = "none"; }
		},
		enableSelection: function(e) {
			e.unselectable = "off";
			e.onselectstart = function() { return true; };
			if (e.style) { e.style.MozUserSelect = ""; }
		},
		hasScroll: function(e, a) {
			var scroll = /top/.test(a||"top") ? 'scrollTop' : 'scrollLeft', has = false;
			if (e[scroll] > 0) return true; e[scroll] = 1;
			has = e[scroll] > 0 ? true : false; e[scroll] = 0;
			return has;
		}
	};
	
	
	/** jQuery core modifications and additions **/
	
	var _remove = $.fn.remove;
	$.fn.remove = function() {
		$("*", this).add(this).trigger("remove");
		return _remove.apply(this, arguments );
	};
	
	// $.widget is a factory to create jQuery plugins
	// taking some boilerplate code out of the plugin code
	// created by Scott González and Jörn Zaefferer
	function getter(namespace, plugin, method) {
		var methods = $[namespace][plugin].getter || [];
		methods = (typeof methods == "string" ? methods.split(/,?\s+/) : methods);
		return ($.inArray(method, methods) != -1);
	};
	
	var widgetPrototype = {
		init: function() {},
		destroy: function() {},
		
		getData: function(e, key) {
			return this.options[key];
		},
		setData: function(e, key, value) {
			this.options[key] = value;
		},
		
		enable: function() {
			this.setData(null, 'disabled', false);
		},
		disable: function() {
			this.setData(null, 'disabled', true);
		}
	};
	
	$.widget = function(name, prototype) {
		var namespace = name.split(".")[0];
		name = name.split(".")[1];
		// create plugin method
		$.fn[name] = function(options, data) {
			var isMethodCall = (typeof options == 'string'),
				args = arguments;
			
			if (isMethodCall && getter(namespace, name, options)) {
				var instance = $.data(this[0], name);
				return (instance ? instance[options](data) : undefined); 
			}
			
			return this.each(function() {
				var instance = $.data(this, name);
				if (!instance) {
					$.data(this, name, new $[namespace][name](this, options));
				} else if (isMethodCall) {
					instance[options].apply(instance, $.makeArray(args).slice(1));
				}
			});
		};
		
		// create widget constructor
		$[namespace][name] = function(element, options) {
			var self = this;
			
			this.options = $.extend({}, $[namespace][name].defaults, options);
			this.element = $(element)
				.bind('setData.' + name, function(e, key, value) {
					return self.setData(e, key, value);
				})
				.bind('getData.' + name, function(e, key) {
					return self.getData(e, key);
				})
				.bind('remove', function() {
					return self.destroy();
				});
			this.init();
		};
		
		// add widget prototype
		$[namespace][name].prototype = $.extend({}, widgetPrototype, prototype);
	};
	
	
	/** Mouse Interaction Plugin **/
	
	$.widget("ui.mouse", {
		init: function() {
			var self = this;
			
			this.element
				.bind('mousedown.mouse', function() { return self.click.apply(self, arguments); })
				.bind('mouseup.mouse', function() { (self.timer && clearInterval(self.timer)); })
				.bind('click.mouse', function() { if(self.initialized) { self.initialized = false; return false; } });
			//Prevent text selection in IE
			if ($.browser.msie) {
				this.unselectable = this.element.attr('unselectable');
				this.element.attr('unselectable', 'on');
			}
		},
		destroy: function() {
			this.element.unbind('.mouse').removeData("mouse");
			($.browser.msie && this.element.attr('unselectable', this.unselectable));
		},
		trigger: function() { return this.click.apply(this, arguments); },
		click: function(e) {
		
			if(    e.which != 1 //only left click starts dragging
				|| $.inArray(e.target.nodeName.toLowerCase(), this.options.dragPrevention || []) != -1 // Prevent execution on defined elements
				|| (this.options.condition && !this.options.condition.apply(this.options.executor || this, [e, this.element])) //Prevent execution on condition
			) { return true; }
		
			var self = this;
			this.initialized = false;
			var initialize = function() {
				self._MP = { left: e.pageX, top: e.pageY }; // Store the click mouse position
				$(document).bind('mouseup.mouse', function() { return self.stop.apply(self, arguments); });
				$(document).bind('mousemove.mouse', function() { return self.drag.apply(self, arguments); });
		
				if(!self.initalized && Math.abs(self._MP.left-e.pageX) >= self.options.distance || Math.abs(self._MP.top-e.pageY) >= self.options.distance) {
					(self.options.start && self.options.start.call(self.options.executor || self, e, self.element));
					(self.options.drag && self.options.drag.call(self.options.executor || self, e, this.element)); //This is actually not correct, but expected
					self.initialized = true;
				}
			};

			if(this.options.delay) {
				if(this.timer) { clearInterval(this.timer); }
				this.timer = setTimeout(initialize, this.options.delay);
			} else {
				initialize();
			}
				
			return false;
			
		},
		stop: function(e) {
			
			if(!this.initialized) {
				return $(document).unbind('mouseup.mouse').unbind('mousemove.mouse');
			}

			(this.options.stop && this.options.stop.call(this.options.executor || this, e, this.element));
			
			$(document).unbind('mouseup.mouse').unbind('mousemove.mouse');
			return false;
			
		},
		drag: function(e) {

			var o = this.options;
			if ($.browser.msie && !e.button) {
				return this.stop.call(this, e); // IE mouseup check
			}
			
			if(!this.initialized && (Math.abs(this._MP.left-e.pageX) >= o.distance || Math.abs(this._MP.top-e.pageY) >= o.distance)) {
				(o.start && o.start.call(o.executor || this, e, this.element));
				this.initialized = true;
			} else {
				if(!this.initialized) { return false; }
			}

			(o.drag && o.drag.call(this.options.executor || this, e, this.element));
			return false;
			
		}
	});
	
})(jQuery);
/*
 * jQuery UI Tabs
 *
 * Copyright (c) 2007, 2008 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 *
 * Revision: $Id: ui.tabs.js 5452 2008-05-05 16:42:08Z rdworth $
 */
;(function($) {
	
	$.widget("ui.tabs", {
		init: function() {
			var self = this;
	
			this.options.event += '.tabs'; // namespace event
	
			$(this.element).bind('setData.tabs', function(event, key, value) {
				if ((/^selected/).test(key))
					self.select(value);
				else {
					self.options[key] = value;
					self.tabify();
				}
			}).bind('getData.tabs', function(event, key) {
				return self.options[key];
			});
	
			// create tabs
			this.tabify(true);
		},
		length: function() {
			return this.$tabs.length;
		},
		tabId: function(a) {
			return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '')
				|| this.options.idPrefix + $.data(a);
		},
		ui: function(tab, panel) {
			return {
				instance: this,
				options: this.options,
				tab: tab,
				panel: panel
			};
		},
		tabify: function(init) {

			this.$lis = $('li:has(a[href])', this.element);
			this.$tabs = this.$lis.map(function() { return $('a', this)[0]; });
			this.$panels = $([]);

			var self = this, o = this.options;

			this.$tabs.each(function(i, a) {
				// inline tab
				if (a.hash && a.hash.replace('#', '')) // Safari 2 reports '#' for an empty hash
					self.$panels = self.$panels.add(a.hash);
				// remote tab
				else if ($(a).attr('href') != '#') { // prevent loading the page itself if href is just "#"
					$.data(a, 'href.tabs', a.href); // required for restore on destroy
					$.data(a, 'load.tabs', a.href); // mutable
					var id = self.tabId(a);
					a.href = '#' + id;
					var $panel = $('#' + id);
					if (!$panel.length) {
						$panel = $(o.panelTemplate).attr('id', id).addClass(o.panelClass)
							.insertAfter( self.$panels[i - 1] || self.element );
						$panel.data('destroy.tabs', true);
					}
					self.$panels = self.$panels.add( $panel );
				}
				// invalid tab href
				else
					o.disabled.push(i + 1);
			});

			if (init) {

				// attach necessary classes for styling if not present
				$(this.element).hasClass(o.navClass) || $(this.element).addClass(o.navClass);
				this.$panels.each(function() {
					var $this = $(this);
					$this.hasClass(o.panelClass) || $this.addClass(o.panelClass);
				});

				// Try to retrieve selected tab:
				// 1. from fragment identifier in url if present
				// 2. from cookie
				// 3. from selected class attribute on <li>
				// 4. otherwise use given "selected" option
				// 5. check if tab is disabled
				this.$tabs.each(function(i, a) {
					if (location.hash) {
						if (a.hash == location.hash) {
							o.selected = i;
							// prevent page scroll to fragment
							//if (($.browser.msie || $.browser.opera) && !o.remote) {
							if ($.browser.msie || $.browser.opera) {
								var $toShow = $(location.hash), toShowId = $toShow.attr('id');
								$toShow.attr('id', '');
								setTimeout(function() {
									$toShow.attr('id', toShowId); // restore id
								}, 500);
							}
							scrollTo(0, 0);
							return false; // break
						}
					} else if (o.cookie) {
						var index = parseInt($.cookie('ui-tabs' + $.data(self.element)),10);
						if (index && self.$tabs[index]) {
							o.selected = index;
							return false; // break
						}
					} else if ( self.$lis.eq(i).hasClass(o.selectedClass) ) {
						o.selected = i;
						return false; // break
					}
				});

				// highlight selected tab
				this.$panels.addClass(o.hideClass);
				this.$lis.removeClass(o.selectedClass);
				if (o.selected !== null) {
					this.$panels.eq(o.selected).show().removeClass(o.hideClass); // use show and remove class to show in any case no matter how it has been hidden before
					this.$lis.eq(o.selected).addClass(o.selectedClass);
					
					// seems to be expected behavior that the show callback is fired
					var onShow = function() {
					    $(self.element).triggerHandler('tabsshow',
					        [self.ui(self.$tabs[o.selected], self.$panels[o.selected])], o.show);
					}; 

                    // load if remote tab
    				if ($.data(this.$tabs[o.selected], 'load.tabs'))
    					this.load(o.selected, onShow);
    				// just trigger show event
    				else
    				    onShow();
    					
				}

				// Take disabling tabs via class attribute from HTML
				// into account and update option properly...
				o.disabled = $.unique(o.disabled.concat(
					$.map(this.$lis.filter('.' + o.disabledClass),
						function(n, i) { return self.$lis.index(n); } )
				)).sort();
				
				// clean up to avoid memory leaks in certain versions of IE 6
				$(window).bind('unload', function() {
					self.$tabs.unbind('.tabs');
					self.$lis = self.$tabs = self.$panels = null;
				});

			}

			// disable tabs
			for (var i = 0, li; li = this.$lis[i]; i++)
				$(li)[$.inArray(i, o.disabled) != -1 && !$(li).hasClass(o.selectedClass) ? 'addClass' : 'removeClass'](o.disabledClass);

			// reset cache if switching from cached to not cached
			if (o.cache === false)
				this.$tabs.removeData('cache.tabs');
			
			// set up animations
			var hideFx, showFx, baseFx = { 'min-width': 0, duration: 1 }, baseDuration = 'normal';
			if (o.fx && o.fx.constructor == Array)
				hideFx = o.fx[0] || baseFx, showFx = o.fx[1] || baseFx;
			else
				hideFx = showFx = o.fx || baseFx;

			// reset some styles to maintain print style sheets etc.
			var resetCSS = { display: '', overflow: '', height: '' };
			if (!$.browser.msie) // not in IE to prevent ClearType font issue
				resetCSS.opacity = '';

			// Hide a tab, animation prevents browser scrolling to fragment,
			// $show is optional.
			function hideTab(clicked, $hide, $show) {
				$hide.animate(hideFx, hideFx.duration || baseDuration, function() { //
					$hide.addClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
					if ($.browser.msie && hideFx.opacity)
						$hide[0].style.filter = '';
					if ($show)
						showTab(clicked, $show, $hide);
				});
			}

			// Show a tab, animation prevents browser scrolling to fragment,
			// $hide is optional.
			function showTab(clicked, $show, $hide) {
				if (showFx === baseFx)
					$show.css('display', 'block'); // prevent occasionally occuring flicker in Firefox cause by gap between showing and hiding the tab panels
				$show.animate(showFx, showFx.duration || baseDuration, function() {
					$show.removeClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
					if ($.browser.msie && showFx.opacity)
						$show[0].style.filter = '';

					// callback
					$(self.element).triggerHandler('tabsshow',
					    [self.ui(clicked, $show[0])], o.show);

				});
			}

			// switch a tab
			function switchTab(clicked, $li, $hide, $show) {
				/*if (o.bookmarkable && trueClick) { // add to history only if true click occured, not a triggered click
					$.ajaxHistory.update(clicked.hash);
				}*/
				$li.addClass(o.selectedClass)
					.siblings().removeClass(o.selectedClass);
				hideTab(clicked, $hide, $show);
			}

			// attach tab event handler, unbind to avoid duplicates from former tabifying...
			this.$tabs.unbind('.tabs').bind(o.event, function() {

				//var trueClick = e.clientX; // add to history only if true click occured, not a triggered click
				var $li = $(this).parents('li:eq(0)'),
					$hide = self.$panels.filter(':visible'),
					$show = $(this.hash);

				// If tab is already selected and not unselectable or tab disabled or 
				// or is already loading or click callback returns false stop here.
				// Check if click handler returns false last so that it is not executed
				// for a disabled or loading tab!
				if (($li.hasClass(o.selectedClass) && !o.unselect)
					|| $li.hasClass(o.disabledClass) 
					|| $(this).hasClass(o.loadingClass)
					|| $(self.element).triggerHandler('tabsselect', [self.ui(this, $show[0])], o.select) === false
					) {
					this.blur();
					return false;
				}

				self.options.selected = self.$tabs.index(this);

				// if tab may be closed
				if (o.unselect) {
					if ($li.hasClass(o.selectedClass)) {
						self.options.selected = null;
						$li.removeClass(o.selectedClass);
						self.$panels.stop();
						hideTab(this, $hide);
						this.blur();
						return false;
					} else if (!$hide.length) {
						self.$panels.stop();
						var a = this;
						self.load(self.$tabs.index(this), function() {
							$li.addClass(o.selectedClass).addClass(o.unselectClass);
							showTab(a, $show);
						});
						this.blur();
						return false;
					}
				}

				if (o.cookie)
					$.cookie('ui-tabs' + $.data(self.element), self.options.selected, o.cookie);

				// stop possibly running animations
				self.$panels.stop();

				// show new tab
				if ($show.length) {

					// prevent scrollbar scrolling to 0 and than back in IE7, happens only if bookmarking/history is enabled
					/*if ($.browser.msie && o.bookmarkable) {
						var showId = this.hash.replace('#', '');
						$show.attr('id', '');
						setTimeout(function() {
							$show.attr('id', showId); // restore id
						}, 0);
					}*/

					var a = this;
					self.load(self.$tabs.index(this), $hide.length ? 
						function() {
							switchTab(a, $li, $hide, $show);
						} :
						function() {
							$li.addClass(o.selectedClass);
							showTab(a, $show);
						}
					);

					// Set scrollbar to saved position - need to use timeout with 0 to prevent browser scroll to target of hash
					/*var scrollX = window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft || 0;
					var scrollY = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
					setTimeout(function() {
						scrollTo(scrollX, scrollY);
					}, 0);*/

				} else
					throw 'jQuery UI Tabs: Mismatching fragment identifier.';

				// Prevent IE from keeping other link focussed when using the back button
				// and remove dotted border from clicked link. This is controlled in modern
				// browsers via CSS, also blur removes focus from address bar in Firefox
				// which can become a usability and annoying problem with tabsRotate.
				if ($.browser.msie)
					this.blur();

				//return o.bookmarkable && !!trueClick; // convert trueClick == undefined to Boolean required in IE
				return false;

			});

			// disable click if event is configured to something else
			if (!(/^click/).test(o.event))
				this.$tabs.bind('click.tabs', function() { return false; });

		},
		add: function(url, label, index) {
			if (index == undefined) 
				index = this.$tabs.length; // append by default

			var o = this.options;
			var $li = $(o.tabTemplate.replace(/#\{href\}/, url).replace(/#\{label\}/, label));
			$li.data('destroy.tabs', true);

			var id = url.indexOf('#') == 0 ? url.replace('#', '') : this.tabId( $('a:first-child', $li)[0] );

			// try to find an existing element before creating a new one
			var $panel = $('#' + id);
			if (!$panel.length) {
				$panel = $(o.panelTemplate).attr('id', id)
					.addClass(o.panelClass).addClass(o.hideClass);
				$panel.data('destroy.tabs', true);
			}
			if (index >= this.$lis.length) {
				$li.appendTo(this.element);
				$panel.appendTo(this.element[0].parentNode);
			} else {
				$li.insertBefore(this.$lis[index]);
				$panel.insertBefore(this.$panels[index]);
			}
			
			o.disabled = $.map(o.disabled,
				function(n, i) { return n >= index ? ++n : n });
				
			this.tabify();

			if (this.$tabs.length == 1) {
				$li.addClass(o.selectedClass);
				$panel.removeClass(o.hideClass);
				var href = $.data(this.$tabs[0], 'load.tabs');
				if (href)
					this.load(index, href);
			}

			// callback
			$(this.element).triggerHandler('tabsadd',
				[this.ui(this.$tabs[index], this.$panels[index])], o.add
			);
		},
		remove: function(index) {
			var o = this.options, $li = this.$lis.eq(index).remove(),
				$panel = this.$panels.eq(index).remove();

			// If selected tab was removed focus tab to the right or
			// in case the last tab was removed the tab to the left.
			if ($li.hasClass(o.selectedClass) && this.$tabs.length > 1)
				this.select(index + (index + 1 < this.$tabs.length ? 1 : -1));

			o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
				function(n, i) { return n >= index ? --n : n });

			this.tabify();

			// callback
			$(this.element).triggerHandler('tabsremove',
				[this.ui($li.find('a')[0], $panel[0])], o.remove
			);
		},
		enable: function(index) {
			var o = this.options;
			if ($.inArray(index, o.disabled) == -1)
				return;
				
			var $li = this.$lis.eq(index).removeClass(o.disabledClass);
			if ($.browser.safari) { // fix disappearing tab (that used opacity indicating disabling) after enabling in Safari 2...
				$li.css('display', 'inline-block');
				setTimeout(function() {
					$li.css('display', 'block');
				}, 0);
			}

			o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

			// callback
			$(this.element).triggerHandler('tabsenable',
				[this.ui(this.$tabs[index], this.$panels[index])], o.enable
			);

		},
		disable: function(index) {
			var self = this, o = this.options;
			if (index != o.selected) { // cannot disable already selected tab
				this.$lis.eq(index).addClass(o.disabledClass);

				o.disabled.push(index);
				o.disabled.sort();

				// callback
				$(this.element).triggerHandler('tabsdisable',
					[this.ui(this.$tabs[index], this.$panels[index])], o.disable
				);
			}
		},
		select: function(index) {
			if (typeof index == 'string')
				index = this.$tabs.index( this.$tabs.filter('[href$=' + index + ']')[0] );
			this.$tabs.eq(index).trigger(this.options.event);
		},
		load: function(index, callback) { // callback is for internal usage only
			
			var self = this, o = this.options, $a = this.$tabs.eq(index), a = $a[0],
					bypassCache = callback == undefined || callback === false, url = $a.data('load.tabs');

			callback = callback || function() {};
			
			// no remote or from cache - just finish with callback
			if (!url || ($.data(a, 'cache.tabs') && !bypassCache)) {
				callback();
				return;
			}

			// load remote from here on
			if (o.spinner) {
				var $span = $('span', a);
				$span.data('label.tabs', $span.html()).html('<em>' + o.spinner + '</em>');
			}
			var finish = function() {
				self.$tabs.filter('.' + o.loadingClass).each(function() {
					$(this).removeClass(o.loadingClass);
					if (o.spinner) {
						var $span = $('span', this);
						$span.html($span.data('label.tabs')).removeData('label.tabs');
					}
				});
				self.xhr = null;
			};
			var ajaxOptions = $.extend({}, o.ajaxOptions, {
				url: url,
				success: function(r, s) {
					$(a.hash).html(r);
					finish();
					
					if (o.cache)
						$.data(a, 'cache.tabs', true); // if loaded once do not load them again

					// callbacks
					$(self.element).triggerHandler('tabsload',
						[self.ui(self.$tabs[index], self.$panels[index])], o.load
					);
					o.ajaxOptions.success && o.ajaxOptions.success(r, s);
					
					// This callback is required because the switch has to take
					// place after loading has completed. Call last in order to 
					// fire load before show callback...
					callback();
				}
			});
			if (this.xhr) {
				// terminate pending requests from other tabs and restore tab label
				this.xhr.abort();
				finish();
			}
			$a.addClass(o.loadingClass);
			setTimeout(function() { // timeout is again required in IE, "wait" for id being restored
				self.xhr = $.ajax(ajaxOptions);
			}, 0);

		},
		url: function(index, url) {
			this.$tabs.eq(index).removeData('cache.tabs').data('load.tabs', url);
		},
		destroy: function() {
			var o = this.options;
			$(this.element).unbind('.tabs')
				.removeClass(o.navClass).removeData('tabs');
			this.$tabs.each(function() {
				var href = $.data(this, 'href.tabs');
				if (href)
					this.href = href;
				var $this = $(this).unbind('.tabs');
				$.each(['href', 'load', 'cache'], function(i, prefix) {
					$this.removeData(prefix + '.tabs');
				});
			});
			this.$lis.add(this.$panels).each(function() {
				if ($.data(this, 'destroy.tabs'))
					$(this).remove();
				else
					$(this).removeClass([o.selectedClass, o.unselectClass,
						o.disabledClass, o.panelClass, o.hideClass].join(' '));
			});
		}
	});
	
	$.ui.tabs.defaults = {
		// basic setup
		selected: 0,
		unselect: false,
		event: 'click',
		disabled: [],
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		// TODO history: false,

		// Ajax
		spinner: 'Loading&#8230;',
		cache: false,
		idPrefix: 'ui-tabs-',
		ajaxOptions: {},

		// animations
		fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }

		// templates
		tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',
		panelTemplate: '<div></div>',

		// CSS classes
		navClass: 'ui-tabs-nav',
		selectedClass: 'ui-tabs-selected',
		unselectClass: 'ui-tabs-unselect',
		disabledClass: 'ui-tabs-disabled',
		panelClass: 'ui-tabs-panel',
		hideClass: 'ui-tabs-hide',
		loadingClass: 'ui-tabs-loading'
	};
	
	$.ui.tabs.getter = "length";

/*
 * Tabs Extensions
 */

	/*
	 * Rotate
	 */
	$.extend($.ui.tabs.prototype, {
		rotation: null,
		rotate: function(ms, continuing) {
			
			continuing = continuing || false;
			
			var self = this, t = this.options.selected;
			
			function start() {
				self.rotation = setInterval(function() {
					t = ++t < self.$tabs.length ? t : 0;
					self.select(t);
				}, ms);	
			}
			
			function stop(e) {
				if (!e || e.clientX) { // only in case of a true click
					clearInterval(self.rotation);
				}
			}
			
			// start interval
			if (ms) {
				start();
				if (!continuing)
					this.$tabs.bind(this.options.event, stop);
				else
					this.$tabs.bind(this.options.event, function() {
						stop();
						t = self.options.selected;
						start();
					});
			}
			// stop interval
			else {
				stop();
				this.$tabs.unbind(this.options.event, stop);
			}
		}
	});

})(jQuery);
/* minify true */
$(document).ready(function(){
	$("#dcLogo").click(function () { 
		location='/';
	});
	$(".mi_tabs > ul").tabs();
});
var insitecookie = 'mcclatchydc_user_auth';

//SHOW HIDE CSS
var insite_cookie=document.cookie.match(insitecookie);
var icname = GetCookie(insite_cookie);
if (icname && icname.indexOf('.threshold') == -1) { 
    document.write("<style>#nonmember{display:none;}</style>");
 } else {
    document.write("<style>#member{display:none;}</style>");
 }

function checkSearch(theForm) {
	if(theForm.sf_pubsys_story.value == "") {
		alert("You have not entered any search terms!");
		theForm.sf_pubsys_story.focus();
		return false;
	}
}

// Program: insite_cookie_manager.jsa
// Purpose: This program should be used to extract user information from either the default '<SITENAME>_user_auth' cookie, 
//   or the more detailed 'insite_account_info' cookie.  
//   NOTE: The 'insite_account_info' cookie is not used by Insite by default, and must be added to the list of custom cookies. See wiki for details.
// Expected Use:
//   When a user instantiates this object several variables will be set and available to the user these are, also users can call the methods outlined here if they need to for some reason.  NOTE: All variables after 'userLoggedIn' are only set if the user is acually logged into Insite.
//     userLoggedIn = 1 if logged in, 0 if not
//     userID       = Users Insite ID
//     userName     = Users Insite username
//     firstName    = Users first name as Insite sees it
//     lastName     = Users last name as Insite sees it
//     email        = Users Email as registered with Insite
// Author:  Ara Yapejian - 3/31/2008

function Insite_Cookie_Manager() {
	// The name of the default Insite Cookie as well as the more detailed 'insite_account_info' cookie
	this.insiteDefaultCookie = 'user_auth';
	this.insiteAccountInfoCookie = 'insite_account_info';
	
	// Purpose: This function will return 1 if the user is logged into insite, and 0 if not.
	this.isUserLoggedIn = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) )
				return( "1" );
			else 
				return( "0" );
		}
	}
	
	// Purpose: This function will return the Insite users 'username' from the default, and always available (When logged in) 'user_auth' cookie.
	this.getInsiteUserName = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				var end = cookieValue[2].indexOf( "%7C" );
				var userName = cookieValue[2].substr(0, end);
				return( userName );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	
	// Purpose: This function will return the users insite ID from the 'insite_account_info' cookie
	this.getInsiteID = function() {
		if( document.cookie.length > 0 ) {
				var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			        if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
					// Get the index of the first and last character in the cookie argument we need
					var start = cookieValue[2].indexOf( "id%3D" );
					var end   = cookieValue[2].indexOf( "%7C", start );
					// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
					//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
					// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the
					//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
					if( end == -1 )
						var extractedCookieValue = cookieValue[2].substr( start );
					else
						var extractedCookieValue = cookieValue[2].substring( start,end );
					start = extractedCookieValue.indexOf( "%3D" );
					start = start + 3;
					var ID = extractedCookieValue.substr(start);
					return( ID );
				} else
					return( "0" );
			} else
				return( "0" );
	}
	
	// Purpose: This function will return the users first name from the 'insite_account_info' cookie
	this.getInsiteFirstName = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				// Get the index of the first and last character in the cookie argument we need
				var start = cookieValue[2].indexOf( "first_name%3D" );
				var end   = cookieValue[2].indexOf( "%7C", start );
				// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
				//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
				// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the
				//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
				if( end == -1 )
					var extractedCookieValue = cookieValue[2].substr( start );
				else
					var extractedCookieValue = cookieValue[2].substring( start,end );
				start = extractedCookieValue.indexOf( "%3D" );
				start = start + 3;
				var firstName = extractedCookieValue.substr(start);
	
				return( firstName );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	
	// Purpose: This function will return the users last name from the 'insite_account_info' cookie
	this.getInsiteLastName = function() {
	if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				// Get the index of the first and last character in the cookie argument we need
				var start = cookieValue[2].indexOf( "last_name%3D" );
				var end   = cookieValue[2].indexOf( "%7C", start );
				// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
				//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
				// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the 
				//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
				if( end == -1 )
					var extractedCookieValue = cookieValue[2].substr( start );
				else                    
					var extractedCookieValue = cookieValue[2].substring( start,end );
				start = extractedCookieValue.indexOf( "%3D" );
				start = start + 3;
				var lastName = extractedCookieValue.substr(start);
	
				return( lastName );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	
	// Purpose: This function will return the users email from the 'insite_account_info' cookie
	this.getInsiteEmail = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				// Get the index of the first and last character in the cookie argument we need
				var start = cookieValue[2].indexOf( "email%3D" );
				var end   = cookieValue[2].indexOf( "%7C", start );
				// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
				//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
				// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the 
				//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
				if( end == -1 ) 
					var extractedCookieValue = cookieValue[2].substr( start );
				else 
					var extractedCookieValue = cookieValue[2].substring( start,end );
				start = extractedCookieValue.indexOf( "%3D" );
				start = start + 3;
				var email = extractedCookieValue.substr(start);
	
				return( email );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	

// ***********************************
// THE MAIN CONSTRUCTOR FOR THE CLASS
// ***********************************
	this.userLoggedIn = this.isUserLoggedIn();
	// If the user is logged in get all info
	if( this.userLoggedIn != 0 ) {
		this.userID       = this.getInsiteID();
		this.userName     = this.getInsiteUserName();
		this.firstName    = this.getInsiteFirstName();
		this.lastName     = this.getInsiteLastName();
		this.email        = this.getInsiteEmail();
	} else {
		this.userID       = "";
		this.userName     = "";
		this.firstName    = "";
		this.lastName     = "";
		this.email        = "";
        }
	
} // END OF PROGRAM


// ##################
// PURPOSE: This function fetches our insite cookie and returns the insite userName or "-1" if not logged in
function getInsiteUserName( myInsiteCookieName ) {
        if( document.cookie.length > 0 ) {
                var cookieValue = document.cookie.match( '(^|;)*' + myInsiteCookieName + '=([^;]*)(;|$)' );
	        if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
                        var end = cookieValue[2].indexOf( "%7C" );
                        var userName = cookieValue[2].substr(0, end);
                        if( userName == '' ){
                                return( "-1" );
                        }
                        return( userName );
                } else
                        return( "-1" );
        } else
                return( "-1" );
}
// ##################
//SHOW HIDE CSS

//if (typeof account_user_name != 'undefined' && typeof insitecookie != 'undefined') {
	var account_user_name = getInsiteUserName( insitecookie );
	if ( -1  == account_user_name) {
		document.write("<style>#member{display:none;}</style>");
		account_user_name = 'Guest';
	} else {
		document.write("<style>#nonmember{display:none;}</style>");
	}
//}

var rurl_qs = '';
var loc = ''+document.location;
if (loc.match('/reg-bin/') )
{
    rurl_qs = ";goto=/";
}
else
{
    rurl_qs = ";goto="+loc
}



// temporary switch stand in for Pluck
var siteLife_master_switch_on = true;
var sitelife_is_on = true;

if (!siteLife_master_switch_on || !sitelife_is_on) {
	var gSiteLife = {
		AddEventHandler: function () {},
		FireEvent: function () {},
		ScriptId: function() {},
		OnError: function() {},
		OnDebug: function() {},
		GetParameter: function() {},
		GetElement: function() {},
		GetTags: function() {},
		EscapeValue: function() {},
		__ArrayValidation: function() {},
		__CheckErrorHandler: function() {},
		SetCookie: function SetCookie() {},
		__GetArgument: function() {},
		__StripAnchorFromUrl: function() {},
		__SafeAppendUrlValue: function() {},
		__AppendUrlValues: function () {},
		ReloadPage: function() {},
		__Send: function() {},
		Logout: function() {},
		AddLoadEvent: function() {},
		AdInsertHelper: function() {},
		InsertAds: function() {},
		TitleTag: function() {},
		WriteDiv: function() {},
		InnerHtmlWrite: function() {},
		SortTimeStampDescending: "TimeStampDescending",
		SortTimeStampAscending: "TimeStampAscending",
		SortRecommendationsDescending: "RecommendationsDescending",
		SortRecommendationsAscending: "RecommendationsAscending",
		SortRatingDescending: "RatingDescending",
		SortRatingAscending: "RatingAscending",
		SortAlphabeticalAscending: "AlphabeticalAscending",
		SortAlphabeticalDescending: "AlphabeticalDescending",
		KeyTypeExternalResource: "ExternalResource",
		PersonaHeaderRequest: function() {},
		PersonaHeader: function() {},
		Persona: function() {},
		LoadPersonaPage: function() {},
		PersonaHome: function() {},
		PopulateGroupsDiv: function() {},
		WatchItem: function() {},
		PersonaRemoveWatchItem: function() {},
		PersonaAddFriend: function() {},
		PersonaRemoveFriend: function() {},
		PersonaRemovePendingFriend: function() {},
		PersonaAddPendingFriend: function() {},
		PersonaMessages: function() {},
		PersonaComments: function() {},
		PersonaBlog: function() {},
		PersonaProfile: function() {},
		PersonaWatchListPaginate: function() {},
		PersonaFriendsPaginate: function() {},
		PersonaFriendsExpand: function() {},
		PersonaFriendsCollapse: function() {},
		PersonaPendingFriendsPaginate: function() {},
		PersonaMessagesPreviewPaginate: function() {},
		PersonaMessageRemove: function() {},
		PersonaSend: function() {},
		PersonaPaginate: function() {},
		PersonaPhotoSend: function() {},
		PersonaMostRecent: function() {},
		PersonaCommunityGroupsPaginate: function() {},
		PersonaCreateGallery: function() {},
		PersonaEditGallery: function() {},
		PersonaUploadToUserGallery: function() {},
		PersonaPhotos: function() {},
		PersonaAllPhotos: function() {},
		PersonaGalleryPhoto: function() {},
		PersonaMyRecentPhotos: function() {},
		PersonaGallery: function() {},
		UserGalleryList: function() {},
		PersonaGallerySubmissions: function() {},
		PersonaGalleryPhoto: function() {},
		PersonaRecentGalleryPhoto: function() {},
		LoadPersonaGalleryPage: function() {},
		LoadPersonaPhotoPage: function() {},
		LoadPersonaRecentPhotoPage: function() {},
		ShowFacebookHelpDialog: function() {},
		CopyRssUrlToClipboard: function() {},
		SolicitPhoto: function() {},
		PhotoUpload: function() {},
		PublicGallery: function() {},
		GalleryPhoto: function() {},
		PublicGalleries: function() {},
		PhotoRecommend: function() {},
		Comments: function() {},
		CommentsInput: function() {},
		CommentsOutput: function() {},
		CommentsRefresh: function() {},
		CommentsInternal: function() {},
		GetComments: function() {},
		Blog: function() {},
		LoadBlogPage: function() {},
		BlogViewEdit: function() {},
		BlogPostCreate: function() {},
		BlogPendingComments: function() {},
		BlogSettings: function() {},
		BlogEditPost: function() {},
		BlogRemovePost: function() {},
		BlogViewPost: function() {},
		BlogViewMonth: function() {},
		AddBlogWatchItem: function() {},
		RemoveBlogWatchItem: function() {},
		BlogViewTag: function() {},
		BlogRefreshViewEditList: function() {},
		BlogSend: function() {},
		Recommend: function() {},
		BlogSelectPendingComments: function() {},
		Forums: function() {},
		ForumCategories: function() {},
		Forum: function() {},
		ForumDiscussion: function() {},
		ForumCreateDiscussion: function() {},
		ForumMain: function() {},
		ForumCreatePost: function() {},
		ForumEditPost: function() {},
		ForumEditProfile: function() {},
		ToggleExpand: function() {},
		ForumSearch: function() {},
		ForumSearchKeyPress: function() {},
		ForumSearchPaginate: function() {},
		ForumSpecificForumSearchKeyPress: function() {},
		ForumSpecificForumSearch: function() {},
		ForumSearchSpecificForumPaginate: function() {},
		LoadForumPage: function() {},
		ForumSend: function() {},
		ForumDiscussionEdit: function() {},
		ForumDiscussionToggleIsSticky: function() {},
		ForumDiscussionToggleIsClosed: function() {},
		ForumDiscussionDelete: function() {},
		MoveDiscussion: function() {},
		ForumEdit: function() {},
		ForumToggleIsClosed: function() {},
		ForumDelete: function() {},
		ForumPostDelete: function() {},
		ForumBlockUser: function() {},
		ForumMyDiscussionsPaginate: function() {},
		ForumImage: function() {},
		BaseAdParam: function () {},
		ForumJoinGroup: function() {},
		ForumLeaveGroup: function() {},
		ForumGroupMemberList: function() {},
		ForumInviteUser: function() {},
		ForumGroupConfirm: function() {},
		ForumSendInviteToUser: function() {},
		ForumAddEnemy: function() {},
		ForumRemoveEnemy: function() {},
		ForumChangeSort: function() {},
		Recommend: function() {},
		PostRecommendation: function() {},
		RateItem: function () {},
		Rating: function() {},
		RatingClickStar: function () {},
		RatingFillStar: function() {},
		Review: function() {},
		ReviewClickStar: function () {},
		GetReviews: function() {},
		SummaryArticlesMostCommented: function() {},
		SummaryArticlesMostRecommended: function() {},
		SummaryPhotosRecentPhotosByTag: function() {},
		SummaryPhotosRecentUserPhotos: function() {},
		SummaryPhotosRecentPhotos: function() {},
		SummaryPhotosMostRecommendedPhotos: function() {},
		SummaryPhotosMostRecommendedUserPhotos: function() {},
		SummaryPhotosMostRecommendedGalleries: function() {},
		SummaryForumsRecentDiscussions: function() {},
		SummaryBlogsRecent: function() {},
		SummaryBlogsRecentPostsByTag: function() {},
		SummaryBlogsRecentPosts: function() {},
		SummaryBlogsMostRecommendedPosts: function() {},
		SummaryPersonaProfileRecent: function() {},
		SummaryPanel: function() {},
		SummarySend: function() {}
	}
	var RequestBatch = function() {};
	RequestBatch.prototype = {
		initialize: function() {},
		AddToRequest: function(requestThis) { },
		BeginRequest: function(serverUrl, callback) {}
	};
	function Section () {}
	function Category () {}
	function Activity () {}
	function ContentType () {}
	function UserTier () {}
	function DiscoverContentAction () {}
	function UserKey () {}
	function ArticleKey () {}
	function UpdateArticleAction () {}
	function CommentPage () {}
}
var rs='';var login_url='/static/insite/login.html?;goto=http://www.mcclatchydc.com/reg-bin/tint.cgi?mode=edit&version=login_done';var acb=true;var aa=true;/*
this script provides a way to test to see if a script has been loaded previously, and if so, does not load it again.
it checks for the object that will be created by a script, if the object exists, the script has been loaded.
*/

function miScriptScheduler() {

    this.scriptCheck = ""; /* value of function check (eg. window.jQuery)*/
    this.scriptPath = ""; /* file path to required script */
    //var cc = this; /*cache a copy of the object for use inside jquery methods*/

    /*
    method checks value of scriptCheck, if undefined a script node is created
    with the src attribute set to scriptPath. This node is then injected into the   DOM
    */
    
    this.scheduleScript = function ()
    {
        if(!this.scriptCheck)
        {
            /* script test function not found, load script with no waiting*/
                var tempElement = document.createElement("script");
                tempElement.src = this.scriptPath;
                var bases = document.getElementsByTagName('base');
                if(bases.length && bases[0].childNodes.length) {
                   bases[0].appendChild(tempElement);
                }
                else {
                  document.getElementsByTagName('head')[0].appendChild(tempElement);
                }
            
        }
        else {
            return(0);
        }
    } /*end scheduleScript method*/
} /* end constructor*/

var mi=(typeof mi=='undefined')?{'media_domain':''}:mi;if(window.miAppControler){mi.control=new miAppControler();}
mi.getArgs=function(){if(typeof mi.args=='undefined'){mi.args={};var query=location.search.substring(1);var pairs=query.split('&');for(var i=pairs.length-1;i>=0;i--){var pos=pairs[i].indexOf('=');if(pos==-1){continue;}
mi.args[pairs[i].substring(0,pos)]=unescape(pairs[i].substring(pos+1));}}
return mi.args;};mi._console=function(s){mi._console.log=(mi._console.log&&mi._console.log.length>0)?mi._console.log+'\n---------------------------------------------------\n'+s:s;};mi.fixConsole=function(){if(typeof window.console!="object"){window.console={};}
if(window.console.is_fixed){}
else{var firebugMethods=["log","debug","info","warn","error","assert","dir","dirxml","trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];var methodCount=firebugMethods.length;var args=mi.getArgs();var view=(args.viewlog&&args.viewlog=='1');for(var i=0;i<methodCount;i++){var methodName=firebugMethods[i];if(typeof window.console[methodName]!="function"){switch(methodName){case'log':if(view){window.console.log=mi._console;if(window.addEventListener){window.addEventListener("load",function(){alert(mi._console.log);},false);}else if(window.attachEvent){window.attachEvent("onload",function(){alert(mi._console.log);});}}else{window.console.log=function(){};}
break;default:eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase()+": '+ s)};");}}}}
window.console.is_fixed=true;};mi.fixConsole();mi.cloneObject=function(sourceObj){if(sourceObj==null||typeof sourceObj!='object'){return sourceObj;}
var temp=new sourceObj.constructor();for(var key in sourceObj){temp[key]=mi.cloneObject(sourceObj[key]);}
return temp;};mi.App=function(){var _configs={};this._manageConf=function(prop,val){return val;};this.setConf=function(){switch(arguments.length){case 1:for(var prop in arguments[0]){_configs[prop]=this._manageConf(prop,arguments[0][prop]);}
break;case 2:_configs[arguments[0]]=this._manageConf(arguments[0],arguments[1]);break;default:console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');}};this.getConf=function(prop){return _configs[prop];};this.viewConfs=function(){console.dir(_configs);};this.cache={};switch(arguments.length){case 1:this.setConf(arguments[0]);break;case 2:this.setConf(arguments[0],arguments[1]);break;}};mi.getEventSrc=function(e){if(!e){e=window.event;}
if(e.target){return e.target;}else if(e.srcElement){return e.srcElement;}};mi.templateVarPattern=/\@([^\@]+)\@/g;mi.templateParser=function(data,template){return template.replace(mi.templateVarPattern,function(){return data[arguments[1]];})};mi.makeHash=function(sourceData,firstDelimiter,secondDelimiter){if(sourceData&&firstDelimiter&&secondDelimiter){var hash={};var pairs=sourceData.split(firstDelimiter);var pos;for(var i=pairs.length-1;i>=0;i--){if(typeof(pairs[i+1])!='undefined'){pos=pairs[i].indexOf(secondDelimiter);if(pos==-1){continue;}
hash[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);}}
return hash;}
else{console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');}};mi.loadPageInfo=function(){if(window.pageInfo){var pi=window.pageInfo;if(this.pageInfo==undefined){this.pageInfo=this.cloneObject(pi);}else{for(var key in pi){if(key==='version'&&(parseFloat(pi[key])>parseFloat(this.pageInfo.version))){this.pageInfo.version=pi[key];}else if(this.pageInfo[key]==undefined){this.pageInfo[key]=this.cloneObject(pi[key]);}else if(typeof this.pageInfo[key]=='object'){for(var key2 in pi[key]){this.pageInfo[key][key2]=(this.pageInfo[key][key2])?this.pageInfo[key][key2]:this.cloneObject(pi[key][key2]);}}}}}
window.pageInfo=null;}
mi.wait_for_ready=function(time,target,callback){var checker,time_spent=0,interval=3000;_check_document=function(){if(null!==$(target)){clearInterval(checker);callback();}else{time_spent+=interval/1000;if(time_spent>=time){clearInterval(checker);}}};$(document).ready(function(){checker=setInterval(_check_document,interval);});};var mi=(!mi)?{'media_domain':''}:mi;mi.Cookie=function(document,name,minutes,path,domain,secure){this.$document=(document)?document:window.document;this.$name=(name)?name:'cookie';this.$expiration=(minutes)?new Date((new Date()).getTime()+minutes*60000):null;this.$path=(path)?path:null;this.$domain=(domain)?domain:null;this.$secure=(secure)?true:false;};mi.Cookie.prototype.store=function(){var cookieVal="";for(var prop in this){if((prop.charAt(0)=='$')||((typeof this[prop])=='function')){continue;}
if(cookieVal!==""){cookieVal+='&';}
cookieVal+=prop+':'+escape(this[prop]);}
var cookie=this.$name+'='+cookieVal;cookie+=(this.$expiration)?'; expires='+this.$expiration.toGMTString():'';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+=(this.$secure)?'; secure':'';this.$document.cookie=cookie;};mi.Cookie.prototype.load=function(){var allCookies=this.$document.cookie;if(allCookies===""){return false;}
var start=allCookies.indexOf(this.$name+'=');if(start==-1){return false;}
start+=this.$name.length+1;var end=allCookies.indexOf(';',start);if(end==-1){end=allCookies.length;}
var cookieVal=allCookies.substring(start,end);var a=cookieVal.split('&');if((a.length==1)&&(a[0].indexOf(':')==-1)){var prop=this.$name;this[prop]=unescape(cookieVal.replace(/\+/g,'%20'));return true;}
for(var i=0;i<a.length;i++){a[i]=a[i].split(':');}
for(i=0;i<a.length;i++){this[a[i][0]]=unescape(a[i][1]);}
return true;};mi.Cookie.prototype.remove=function(){var cookie=this.$name+'=';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+='; expires=Fri, 02-Jan-1970 00:00:00 GMT';this.$document.cookie=cookie;};mi.Commenting=function(){mi.App.apply(this,arguments);this._manageConf=function(prop,val){switch(prop){case'enabled':var v=parseInt(val);if(isNaN(v)){val=(val.toLowerCase)?val.toLowerCase():val;switch(val){case true:case'true':case'yes':case'on':v=1;break;default:v=0;break;}}
val=v;default:break;}
return val;};if(mi.control&&mi.control.commenting!=undefined){this.setConf('enabled',mi.control.commenting);}else{this.setConf('enabled',0);console.warn('Commenting has been instantiated, but disabled because mi.control.commenting is not defined.');}
mi.loadPageInfo();var splitHost=window.location.host.split('.');this.setConf('accountName',splitHost[splitHost.length-2]);this.setConf('target','commentingStage');this.finish();};mi.Commenting.prototype.finish=function(){};mi.Commenting.prototype.display=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('display commenting');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._renderCommenting();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('display commenting');}};mi.Commenting.prototype.displayPopular=function(count){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('popular comment threads');}
var e=this.getConf('enabled');if(e!==0&&e!==3&&e!==4){this._displayPopular(count);}else{console.info('The popular comment threads widget has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('popular comment threads');}};mi.Commenting.prototype.displayCommentCount=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('comment count');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._displayCommentCount();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('comment count');}}
mi.Commenting.prototype.extended=true;var disqus_identifier,disqus_shortname,disqus_remote_auth_s2,disqus_title,disqus_developer,disqus_url;if(typeof facebookXdReceiverPath=="undefined"){var facebookXdReceiverPath;}
mi.Commenting.prototype._displayCommentingDisqus=function(){window.disqus_identifier=this.getThreadId();var cookie=new mi.Cookie(document,'disqus');if(cookie.load()){window.disqus_remote_auth_s2=cookie.disqus;}
window.disqus_title=mi.pageInfo.asset.title;if(window.disqus_identifier!=undefined){var target=document.getElementById(this.getConf('target'));window.disqus_url=window.location.href.split("#")[0];if(window.disqus_url.match(/:\/\/preview/)){window.disqus_developer=1;window.disqus_url=window.disqus_url.replace(/:\/\/[^\.]+\./,"://www.");}
else if(window.disqus_url.match(/-preview\./)){window.disqus_developer=1;window.disqus_url=window.disqus_url.replace(/-preview\./,"-site.");}
var thread=document.createElement('div');thread.id='disqus_thread';target.appendChild(thread);var dsq=document.createElement('script');dsq.type='text/javascript';dsq.async=true;dsq.src='http://'+this.getConf('accountName')+'.disqus.com/embed.js';(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);}else{console.error('Commenting could not be loaded because there was no defined thread id.');}};mi.Commenting.prototype._renderCommenting=mi.Commenting.prototype._displayCommentingDisqus;mi.Commenting.prototype._displayPopularDisqus=function(count){count=(isNaN(count))?this.getConf('discoveryCount'):count;if(isNaN(count)){count=0;}
count=(count>0&&count<21)?Math.floor(count):5;document.write('<script type="text/javascript" src="http://disqus.com/forums/'+this.getConf('accountName')+'/popular_threads_widget.js?num_items='+count+'"></script>');};mi.Commenting.prototype._displayPopular=mi.Commenting.prototype._displayPopularDisqus;mi.Commenting.prototype._displayCommentCountDisqus=function(){window.disqus_identifier=this.getThreadId();window.disqus_shortname=this.getConf('accountName');document.getElementById('commentCount').href=document.getElementById('commentCount').href+'#disqus_thread';document.getElementById('commentCount').setAttribute('data-disqus-identifier',this.getThreadId());var s=document.createElement('script');s.async=true;s.src='http://disqus.com/forums/'+this.getConf('accountName')+'/count.js';(document.getElementsByTagName('HEAD')[0]||document.getElementsByTagName('BODY')[0]).appendChild(s);};mi.Commenting.prototype._displayCommentCount=mi.Commenting.prototype._displayCommentCountDisqus;mi.Commenting.prototype.getThreadId=function(){return(mi.pageInfo&&mi.pageInfo.asset&&mi.pageInfo.asset.id)?mi.pageInfo.asset.id:undefined;};mi.Commenting.prototype.finish=function(){window.facebookXdReceiverPath='/static/scripts/mi/third_party/facebook/fb-disqus_xd_receiver.html';}
mi.Commenting.prototype.reset_disqus_config=function(disqus_cookie_val,public_api_key){var mi_disqus_config=new disqus_config();var sso_name=mi_disqus_config.sso.name.toString();var sso_button=mi_disqus_config.sso.button.toString();var sso_url=mi_disqus_config.sso.url.toString();var sso_logout=mi_disqus_config.sso.logout.toString();var sso_width=mi_disqus_config.sso.width.toString();var sso_height=mi_disqus_config.sso.height.toString();disqus_config=function(){this.page.remote_auth_s3=disqus_cookie_val;this.page.api_key=public_api_key;this.sso={name:sso_name,button:sso_button,url:sso_url,logout:sso_logout,width:sso_width,height:sso_height};};}
 mi.commenting = new mi.Commenting();
 // If necessary, you can add configuration overrides here.
  var disqus_config = function () {
     this.sso = {
         name:    "McClatchy DC",
         button:  "http://media.mcclatchydc.com/static/images/dsq-login-button-mi.png",
         url:     "http://www.mcclatchydc.com/mistatic/disqus_login.html",
         logout:  "http://www.mcclatchydc.com/reg-bin/tint.cgi?mode=logout",
         width:   "600",
         height:  "375"
     };
 };

