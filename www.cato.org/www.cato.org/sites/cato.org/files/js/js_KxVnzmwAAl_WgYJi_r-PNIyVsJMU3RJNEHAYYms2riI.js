/* Modernizr 2.0.6 | MIT & BSD
 * Contains: All core tests, html5shiv, yepnope, respond.js. Get your own custom build at www.modernizr.com/download/
 */
;window.Modernizr=function(a,b,c){function I(){e.input=function(a){for(var b=0,c=a.length;b<c;b++)t[a[b]]=a[b]in l;return t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)l.setAttribute("type",f=a[d]),e=l.type!=="text",e&&(l.value=m,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&l.style.WebkitAppearance!==c?(g.appendChild(l),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,g.removeChild(l)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=l.checkValidity&&l.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(l),g.offsetWidth,e=l.value!=m,g.removeChild(l)):e=l.value!=m)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function G(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return F(d,b)}function F(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function E(a,b){return!!~(""+a).indexOf(b)}function D(a,b){return typeof a===b}function C(a,b){return B(o.join(a+";")+(b||""))}function B(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},w=function(b){if(a.matchMedia)return matchMedia(b).matches;var c;v("@media "+b+" { #"+i+" { position: absolute; } }",function(b){c=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position=="absolute"});return c},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y,z={}.hasOwnProperty,A;!D(z,c)&&!D(z.call,c)?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],c)};var H=function(c,d){var f=c.join(""),g=d.length;v(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||j.touch.offsetTop===9,e.csstransforms3d=j.csstransforms3d.offsetLeft===9,e.generatedcontent=j.generatedcontent.offsetHeight>=1,e.fontface=/src/i.test(h)&&h.indexOf(d.split(" ")[0])===0},g,d)}(['@font-face {font-family:"font";src:url("https://")}',["@media (",o.join("touch-enabled),("),i,")","{#touch{top:9px;position:absolute}}"].join(""),["@media (",o.join("transform-3d),("),i,")","{#csstransforms3d{left:9px;position:absolute}}"].join(""),['#generatedcontent:after{content:"',m,'";visibility:hidden}'].join("")],["fontface","touch","csstransforms3d","generatedcontent"]);r.flexbox=function(){function c(a,b,c,d){a.style.cssText=o.join(b+":"+c+";")+(d||"")}function a(a,b,c,d){b+=":",a.style.cssText=(b+o.join(c+";"+b)).slice(0,-b.length)+(d||"")}var d=b.createElement("div"),e=b.createElement("div");a(d,"display","box","width:42px;padding:0;"),c(e,"box-flex","1","width:10px;"),d.appendChild(e),g.appendChild(d);var f=e.offsetWidth===42;d.removeChild(e),g.removeChild(d);return f},r.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},r.canvastext=function(){return!!e.canvas&&!!D(b.createElement("canvas").getContext("2d").fillText,"function")},r.webgl=function(){return!!a.WebGLRenderingContext},r.touch=function(){return e.touch},r.geolocation=function(){return!!navigator.geolocation},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){var b=!!a.openDatabase;return b},r.indexedDB=function(){for(var b=-1,c=p.length;++b<c;)if(a[p[b].toLowerCase()+"IndexedDB"])return!0;return!!a.indexedDB},r.hashchange=function(){return x("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return!!a.history&&!!history.pushState},r.draganddrop=function(){return x("dragstart")&&x("drop")},r.websockets=function(){for(var b=-1,c=p.length;++b<c;)if(a[p[b]+"WebSocket"])return!0;return"WebSocket"in a},r.rgba=function(){B("background-color:rgba(150,255,150,.5)");return E(k.backgroundColor,"rgba")},r.hsla=function(){B("background-color:hsla(120,40%,100%,.5)");return E(k.backgroundColor,"rgba")||E(k.backgroundColor,"hsla")},r.multiplebgs=function(){B("background:url(https://),url(https://),red url(https://)");return/(url\s*\(.*?){3}/.test(k.background)},r.backgroundsize=function(){return G("backgroundSize")},r.borderimage=function(){return G("borderImage")},r.borderradius=function(){return G("borderRadius")},r.boxshadow=function(){return G("boxShadow")},r.textshadow=function(){return b.createElement("div").style.textShadow===""},r.opacity=function(){C("opacity:.55");return/^0.55$/.test(k.opacity)},r.cssanimations=function(){return G("animationName")},r.csscolumns=function(){return G("columnCount")},r.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";B((a+o.join(b+a)+o.join(c+a)).slice(0,-a.length));return E(k.backgroundImage,"gradient")},r.cssreflections=function(){return G("boxReflect")},r.csstransforms=function(){return!!F(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])},r.csstransforms3d=function(){var a=!!F(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in g.style&&(a=e.csstransforms3d);return a},r.csstransitions=function(){return G("transitionProperty")},r.fontface=function(){return e.fontface},r.generatedcontent=function(){return e.generatedcontent},r.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType){c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var d='video/mp4; codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+', mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}}catch(e){}return c},r.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"'),c.mp3=a.canPlayType("audio/mpeg;"),c.wav=a.canPlayType('audio/wav; codecs="1"'),c.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")}catch(d){}return c},r.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},r.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},r.webworkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==q.svg},r.smil=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"animate")))},r.svgclippaths=function(){return!!b.createElementNS&&/SVG/.test(n.call(b.createElementNS(q.svg,"clipPath")))};for(var J in r)A(r,J)&&(y=J.toLowerCase(),e[y]=r[J](),u.push((e[y]?"":"no-")+y));e.input||I(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return;b=typeof b=="boolean"?b:!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b}return e},B(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._prefixes=o,e._domPrefixes=p,e.mq=w,e.hasEvent=x,e.testProp=function(a){return F([a])},e.testAllProps=G,e.testStyles=v,e.prefixed=function(a){return G(a,"pfx")},g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+u.join(" "):"");return e}(this,this.document),function(a,b){function u(){r(!0)}a.respond={},respond.update=function(){},respond.mediaQueriesSupported=b;if(!b){var c=a.document,d=c.documentElement,e=[],f=[],g=[],h={},i=30,j=c.getElementsByTagName("head")[0]||d,k=j.getElementsByTagName("link"),l=[],m=function(){var b=k,c=b.length,d=0,e,f,g,i;for(;d<c;d++)e=b[d],f=e.href,g=e.media,i=e.rel&&e.rel.toLowerCase()==="stylesheet",!!f&&i&&!h[f]&&(!/^([a-zA-Z]+?:(\/\/)?(www\.)?)/.test(f)||f.replace(RegExp.$1,"").split("/")[0]===a.location.host?l.push({href:f,media:g}):h[f]=!0);n()},n=function(){if(l.length){var a=l.shift();s(a.href,function(b){o(b,a.href,a.media),h[a.href]=!0,n()})}},o=function(a,b,c){var d=a.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),g=d&&d.length||0,b=b.substring(0,b.lastIndexOf("/")),h=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},i=!g&&c,j=0,k,l,m,n,o;b.length&&(b+="/"),i&&(g=1);for(;j<g;j++){k=0,i?(l=c,f.push(h(a))):(l=d[j].match(/@media ([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,f.push(RegExp.$2&&h(RegExp.$2))),n=l.split(","),o=n.length;for(;k<o;k++)m=n[k],e.push({media:m.match(/(only\s+)?([a-zA-Z]+)(\sand)?/)&&RegExp.$2,rules:f.length-1,minw:m.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1),maxw:m.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1)})}r()},p,q,r=function(a){var b="clientWidth",h=d[b],l=c.compatMode==="CSS1Compat"&&h||c.body[b]||h,m={},n=c.createDocumentFragment(),o=k[k.length-1],s=(new Date).getTime();if(a&&p&&s-p<i)clearTimeout(q),q=setTimeout(r,i);else{p=s;for(var t in e){var u=e[t];if(!u.minw&&!u.maxw||(!u.minw||u.minw&&l>=u.minw)&&(!u.maxw||u.maxw&&l<=u.maxw))m[u.media]||(m[u.media]=[]),m[u.media].push(f[u.rules])}for(var t in g)g[t]&&g[t].parentNode===j&&j.removeChild(g[t]);for(var t in m){var v=c.createElement("style"),w=m[t].join("\n");v.type="text/css",v.media=t,v.styleSheet?v.styleSheet.cssText=w:v.appendChild(c.createTextNode(w)),n.appendChild(v),g.push(v)}j.insertBefore(n,o.nextSibling)}},s=function(a,b){var c=t();if(!!c){c.open("GET",a,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status==200||c.status==304)&&b(c.responseText)};if(c.readyState==4)return;c.send()}},t=function(){var a=!1,b=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new XMLHttpRequest}],c=b.length;while(c--){try{a=b[c]()}catch(d){continue}break}return function(){return a}}();m(),respond.update=m,a.addEventListener?a.addEventListener("resize",u,!1):a.attachEvent&&a.attachEvent("onresize",u)}}(this,Modernizr.mq("only all")),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
WebFontConfig = {
  google: { families: ['Droid Serif:400,700,400italic,700italic', 'Shadows Into Light Two'] },
  custom: { families: ['Hoefler'],
    urls: ['http://cloud.typography.com/684222/756420/css/fonts.css'] }
};
if (jQuery.support.leadingWhitespace) {
  (function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
}
;
// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper',
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function() {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;
                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement
                            .css('position', '')
                            .css('top', '')
                            .removeClass(s.className);
                        s.stickyElement.parent().removeClass(s.className);
                        s.currentTop = null;
                    }
                }
                else {
                    var newTop = documentHeight - s.stickyElement.outerHeight()
                        - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop != newTop) {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .addClass(s.className);
                        s.stickyElement.parent().addClass(s.className);
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();
        },
        methods = {
            init: function(options) {
                var o = $.extend(defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);

                    stickyId = stickyElement.attr('id');
                    wrapper = $('<div></div>')
                        .attr('id', stickyId + '-sticky-wrapper')
                        .addClass(o.wrapperClassName);
                    stickyElement.wrapAll(wrapper)
                    var stickyWrapper = stickyElement.parent();
                    stickyWrapper.css('height', stickyElement.outerHeight());
                    sticked.push({
                        topSpacing: o.topSpacing,
                        bottomSpacing: o.bottomSpacing,
                        stickyElement: stickyElement,
                        currentTop: null,
                        stickyWrapper: stickyWrapper,
                        className: o.className
                    });
                });
            },
            update: scroller
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function() {
        setTimeout(scroller, 0);
    });
})(jQuery);
;
;(function($){
	$.fn.fixedScroll = function(opts){
	
		var defaults = {fixedClass:'fixed', absClass:'relative', container:'parent', offset:0, forceTop:false, topLimit:null, relativeOffset:0, noStop:false, shrinkContainer:0, breakPoint:700};
		
		//noStop: will not stop at end of container, remains fixed at position
		var opts = $.extend(defaults, opts);
		
		return this.each(function(){
			var item = $(this);
			var over;
			var width = $(this).width();
			if (width != $(this).outerWidth()){
				width = $(this).outerWidth();
			}
			var container = item.parent();
			if (opts.container != 'parent'){
				container = opts.container;
				if (typeof container == 'string'){
					container = $(container);
				}
			}
			var topLimit = item.offset().top - container.offset().top + opts.offset;
			if (opts.topLimit != null){
				topLimit = opts.topLimit;
			}
			$(window).bind('scroll resize', onScrollCheck);
			container.bind('resize', onScrollCheck);
			
			function removeStickyScroll(){
				item.css('style', '');
				item.removeClass(opts.fixedClass);
				item.removeClass(opts.absClass);
			}
			
			function onScrollCheck(){
				var wt = $(window).scrollTop();
				var ww = $(window).width();
				if (ww < opts.breakPoint){
					removeStickyScroll();
					return;
				}	
				var gt = 0;
				if (item.data('oy')){
					gt = item.data('oy');
				} else {
					gt = item.offset().top;
					item.data('oy', gt);
				}	
				var dist = gt - wt;
				if (dist < topLimit){
					//going fixed
					item.addClass(opts.fixedClass);
					item.removeClass(opts.absClass);
					item.width(width);
				} else {
					//going relative
					item.removeClass(opts.fixedClass);
					item.removeClass(opts.absClass);
				}
				if (opts.noStop){
					return;
				}
				if (wt > container.offset().top + container.height() - item.outerHeight() - opts.shrinkContainer){
					item.removeClass(opts.fixedClass);
					item.addClass(opts.absClass);
					var top = container.height() - item.outerHeight() - opts.shrinkContainer;
					item.css('top', top+opts.relativeOffset);
				} else {	
					if (opts.forceTop){
						item.css('top', opts.offset);
					} else {
						item.css('top', '');
					}
				}
			}
		});
	}
})(jQuery);;
/*! (c) Mat Marquis (@wilto). MIT License. http://wil.to/3a */
(function( $, undefined ) {

  var inst = 0;

  $.fn.getPercentage = function() {
    var oPercent = this.attr('style').match(/margin\-left:(.*[0-9])/i) && parseInt(RegExp.$1);

    return oPercent;
  };

  $.fn.adjRounding = function(slide) {
    var $el = $(this),
      $slides = $el.find( slide ),
      diff = $el.parent().width() - $slides.eq(0).width();

    if (diff !== 0) {
      $slides.css( "position", "relative" );

      for (var i = 0; i < $slides.length; i++) {
        $slides.eq(i).css( "left", (diff * i) + "px" );
      }
    }

    return this;
  };

  $.fn.carousel = function(config) {

    // Prevent re-init:
    if( this.data( "carousel-initialized" ) ) { return; }

    // Carousel is being initialized:
    this.data( "carousel-initialized", true );

    var defaults = {
        slider			: '.slider',
        slide			: '.slide',
        prevSlide		: null,
        nextSlide		: null,
        slideHed		: null,
        addPagination	: false,
        addNav			: ( config != undefined && ( config.prevSlide || config.nextSlide ) ) ? false : true,
        namespace		: 'carousel',
        speed			: 300
      },
      opt               = $.extend(defaults, config),
      $slidewrap        = this,
      dBody            = (document.body || document.documentElement),
      transitionSupport = function() {
        dBody.setAttribute('style', 'transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;');
        var tSupport = !!(dBody.style.transition || dBody.style.webkitTransition || dBody.style.msTransition || dBody.style.OTransition || dBody.style.MozTransition )

        return tSupport;
      },
      carousel = {
        init : function() {
          inst++;

          $slidewrap.each(function(carInt) {
            var $wrap      = $(this),
              $slider    = $wrap.find(opt.slider),
              $slide     = $wrap.find(opt.slide),
              slidenum   = $slide.length,
              transition = "margin-left " + ( opt.speed / 1000 ) + "s ease",
              tmp        = 'carousel-' + inst + '-' + carInt;

            if( $slide.length <= 1 ) {
              return; /* No sense running all this code if the carousel functionality is unnecessary. */
            }

            $wrap
              .css({
                "overflow"           : "hidden",
                "width"              : "100%"
              })
              .attr('role' , 'application');

            $slider
              .attr( 'id', ( $slider[0].id || 'carousel-' + inst + '-' + carInt ) )
              .css({
                "marginLeft"         : "0px",
                "float"              : "left",
                "width"              : 100 * slidenum + "%",
                "-webkit-transition" : transition,
                "-moz-transition"    : transition,
                "-ms-transition"     : transition,
                "-o-transition"      : transition,
                "transition"         : transition
              })
              .bind( 'carouselmove' , carousel.move )
              .bind( 'nextprev'     , carousel.nextPrev )
              .bind( 'navstate'     , carousel.navState );

            $slide
              .css({
                "float": "left",
                width: (100 / slidenum) + "%"
              })
              .each(function(i) {
                var $el = $(this);

                $el.attr({
                  "role" : "tabpanel document",
                  "id"   : tmp + '-slide' + i
                });

                if( opt.addPagination ) {
                  $el.attr('aria-labelledby', tmp + '-tab' + i);
                }
              });

            // Build and insert navigation/pagination, if specified in the options:
            opt.addPagination   && carousel.addPagination();
            opt.addNav 			&& carousel.addNav();

            $slider.trigger( "navstate", { "current": 0 });
          });
        },
        addNav : function() {
          $slidewrap.each(function(i) {
            var $oEl = $(this),
              $slider = $oEl.find(opt.slider),
              currentSlider = $slider[0].id,
              navMarkup = [
                '<ul class="slidecontrols" role="navigation">',
                '	<li role="presentation"><a href="" rel="#' + currentSlider + '" class="' + opt.namespace + '-next">Next</a></li>',
                '	<li role="presentation"><a href="" rel="#' + currentSlider + '" class="' + opt.namespace + '-prev">Prev</a></li>',
                '</ul>'
              ].join(''),
              nextprev = {
                nextSlide : '.' + opt.namespace + '-next',
                prevSlide : '.' + opt.namespace + '-prev'
              };

            opt = $.extend(opt, nextprev);

            $oEl.prepend(navMarkup);
          });
        },
        addPagination : function() {
          $slidewrap.each(function(i) {
            var $oEl        = $(this),
              $pagination = $('<ol class="' + opt.namespace + '-tabs" role="tablist navigation" />'),
              $slider     = $oEl.find(opt.slider),
              $slides     = $oEl.find(opt.slide)
            slideNum    = $slides.length,
              associated  = 'carousel-' + inst + '-' + i;

            while( slideNum-- ) {
              var hed = $slides.eq(slideNum).find( opt.slideHed ).text() || 'Page ' + ( slideNum + 1 ),
                tabMarkup = [
                  '<li role="presentation">',
                  '<a href="" rel="#' + associated + '-slide' + slideNum +'',
                  ' aria-controls="' + associated + '-slide' + slideNum +'"',
                  ' id="' + associated + '-tab' + slideNum + '" role="tab">' + hed + '</a>',
                  '</li>'
                ].join('');

              $pagination.prepend(tabMarkup);
            };

            $pagination
              .appendTo( $oEl )
              .find('li').keydown( function(e) {
                var $el      = $(this),
                  $prevTab = $el.prev().find('a'),
                  $nextTab = $el.next().find('a');

                switch( e.which ) {
                  case 37:
                  case 38:
                    $prevTab.length && $prevTab.trigger('click').focus();
                    e.preventDefault();
                    break;
                  case 39:
                  case 40:
                    $nextTab.length && $nextTab.trigger('click').focus();
                    e.preventDefault();
                    break;
                }
              })
              .find('a').click( function(e) {
                var $el = $(this);

                if( $el.attr('aria-selected') == 'false' ) {
                  var current = $el.parent().index(),
                    move    = -( 100 * ( current ) ),
                    $slider = $oEl.find( opt.slider );

                  $slider.trigger( 'carouselmove', { moveTo: move });
                }
                e.preventDefault();
              });
          });
        },
        roundDown : function(oVal) {
          var val = parseInt(oVal, 10);

          return Math.ceil( (val - (val % 100 ) ) / 100) * 100;
        },
        navState : function(e, ui) {
          var $el          = $(this),
            $slides      = $el.find(opt.slide),
            ind          = -(ui.current / 100),
            $activeSlide = $slides.eq(ind);

          $el.attr('aria-activedescendant', $activeSlide[0].id);

          // Update state of active tabpanel:
          $activeSlide
            .addClass( opt.namespace + "-active-slide" )
            .attr( 'aria-hidden', false )
            .siblings()
            .removeClass( opt.namespace + "-active-slide" )
            .attr( 'aria-hidden', true );

          // Update state of next/prev navigation:
          if( ( !!opt.prevSlide || !!opt.nextSlide ) ) {
            var $target = $('[rel*="#' + this.id + '"]');

            $target.removeClass( opt.namespace + '-disabled' );

            if( ind == 0 ) {
              $target.filter(opt.prevSlide).addClass( opt.namespace + '-disabled' );
            } else if( ind == $slides.length - 1 ) {
              $target.filter(opt.nextSlide).addClass( opt.namespace + '-disabled' );
            }
          }

          // Update state of pagination tabs:
          if( !!opt.addPagination ) {
            var tabId = $activeSlide.attr('aria-labelledby'),
              $tab  = $('#' + tabId );

            $tab
              .parent()
              .addClass(opt.namespace + '-active-tab')
              .siblings()
              .removeClass(opt.namespace + '-active-tab')
              .find('a')
              .attr({
                'aria-selected' : false,
                'tabindex' : -1
              });

            $tab.attr({
              'aria-selected' : true,
              'tabindex' : 0
            });
          }
        },
        move : function(e, ui) {
          var $el = $(this);

          $el
            .trigger(opt.namespace + "-beforemove")
            .trigger("navstate", { current: ui.moveTo });

          if( transitionSupport() ) {

            $el
              .adjRounding( opt.slide ) /* Accounts for browser rounding errors. Lookin’ at you, iOS Safari. */
              .css('marginLeft', ui.moveTo + "%")
              .one("transitionend webkitTransitionEnd OTransitionEnd", function() {
                $(this).trigger( opt.namespace + "-aftermove" );
              });

          } else {
            $el
              .adjRounding( opt.slide )
              .animate({ "marginLeft": ui.moveTo + "%" }, { "duration" : opt.speed, "queue" : false }, function() {
                $(this).trigger( opt.namespace + "-aftermove" );
              });
          }
        },
        nextPrev : function(e, ui) {
          var $el = $(this),
            left = ( $el ) ? $el.getPercentage() : 0,
            $slide = $el.find(opt.slide),
            constrain = ui.dir === 'prev' ? left != 0 : -left < ($slide.length - 1) * 100,
            $target = $( '[rel="#' + this.id + '"]');

          if (!$el.is(":animated") && constrain ) {

            if ( ui.dir === 'prev' ) {
              left = ( left % 100 != 0 ) ? carousel.roundDown(left) : left + 100;
            } else {
              left = ( ( left % 100 ) != 0 ) ? carousel.roundDown(left) - 100 : left - 100;
            }

            $el.trigger('carouselmove', { 'moveTo': left });

            $target
              .removeClass( opt.namespace + '-disabled')
              .removeAttr('aria-disabled');

            switch( left ) {
              case ( -($slide.length - 1) * 100 ):
                $target.filter(opt.nextSlide)
                  .addClass( opt.namespace + '-disabled')
                  .attr('aria-disabled', true);
                break;
              case 0:
                $target.filter(opt.prevSlide)
                  .addClass( opt.namespace + '-disabled')
                  .attr('aria-disabled', true);
                break;
            }
          } else {
            var reset = carousel.roundDown(left);

            $el.trigger('carouselmove', { 'moveTo': reset });
          }

        }
      };

    carousel.init(this);

    $(opt.nextSlide + ',' + opt.prevSlide)
      .bind('click', function(e) {
        var $el = $(this),
          link = this.rel,
          dir = ( $el.is(opt.prevSlide) ) ? 'prev' : 'next',
          $slider = $(link);

        if ( $el.is('.' + opt.namespace + '-disabled') ) {
          return false;
        }

        $slider.trigger('nextprev', { 'dir': dir });

        e.preventDefault();
      })
      .bind('keydown', function(e) {
        var $el = $(this),
          link = this.rel;

        switch (e.which) {
          case 37:
          case 38:
            $('#' + link).trigger('nextprev', { 'dir': 'next' });
            e.preventDefault();
            break;
          case 39:
          case 40:
            $('#' + link).trigger('nextprev', { 'dir': 'prev' });
            e.preventDefault();
            break;
        }
      });

    var setup = {
      'wrap' : this,
      'slider' : opt.slider
    };
    $slidewrap.bind( "dragSnap", setup, function(e, ui){
      var $slider = $(this).find( opt.slider ),
        dir = ( ui.direction === "left" ) ? 'next' : 'prev';

      $slider.trigger("nextprev", { 'dir': dir });
    });


    $slidewrap.filter('[data-autorotate]').each(function() {
      var auto,
        $el         = $(this),
        speed       = $el.attr('data-autorotate'),
        slidenum    = $el.find(opt.slide).length,
        autoAdvance = function() {
          var $slider  = $el.find(opt.slider),
            active   = -( $(opt.slider).getPercentage() / 100 ) + 1;

          switch( active ) {
            case slidenum:
              clearInterval(auto);

              auto = setInterval(function() {
                autoAdvance();
                $slider.trigger("nextprev", { 'dir': 'prev' });
              }, speed);

              break;
            case 1:
              clearInterval(auto);

              auto = setInterval(function() {
                autoAdvance();
                $slider.trigger("nextprev", { 'dir': 'next' });
              }, speed);

              break;
          }
        };

      auto = setInterval(autoAdvance, speed);

      $el
        .attr('aria-live', 'polite')
        .bind('mouseenter click touchstart', function() {
          clearInterval(auto);
        });
    });

    return this;
  };

  $.event.special.dragSnap = {
    setup: function(setup) {

      var $el = $(this),
        transitionSwap = function($el, tog) {
          var speed = .3,
            transition = ( tog ) ? "margin-left " + speed + "s ease" : 'none';

          $el.css({
            "-webkit-transition" : transition,
            "-moz-transition"    : transition,
            "-ms-transition"     : transition,
            "-o-transition"      : transition,
            "transition"         : transition
          });
        },
        roundDown = function(left) {
          var left = parseInt(left, 10);

          return Math.ceil( (left - (left % 100 ) ) / 100) * 100;
        },
        snapBack = function(e, ui) {
          var $el = ui.target,
            currentPos = ( $el.attr('style') != undefined ) ? $el.getPercentage() : 0,
            left = (ui.left === false) ? roundDown(currentPos) - 100 : roundDown(currentPos),
            dBody = document.body,
            transitionSupport = function() {
              dBody.setAttribute('style', 'transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;');
              var tSupport = !!(dBody.style.transition || dBody.style.webkitTransition || dBody.style.MozTransition )

              return tSupport;
            };

          transitionSwap($el, true);

          if( transitionSupport() ) {
            $el.css('marginLeft', left + "%");
          } else {
            $el.animate({ marginLeft: left + "%" }, opt.speed);
          }
        };

      $el
        .bind("snapback", snapBack)
        .bind("touchstart", function(e) {
          var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
            $target = $(e.target),
            start = {
              'time': +new Date,
              'coords': [ data.pageX, data.pageY ],
              'origin': $target.closest( setup.wrap ),
              'interacting': false
            },
            stop,
            $tEl = $target.closest( setup.slider ),
            currentPos = ( $tEl.attr('style') != undefined ) ? $tEl.getPercentage() : 0;

          transitionSwap($tEl, false);

          function moveHandler(e) {
            var data = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
            stop = {
              'time': +new Date,
              'coords': [ data.pageX, data.pageY ]
            },
              deltaX = Math.abs( start.coords[0] - data.pageX ),
              deltaY = Math.abs( start.coords[1] - data.pageY );

            if( !start || deltaX < deltaY || deltaX < 55 ) {
              return;
            }

            // prevent scrolling
            if ( deltaX >= 55 ) {
              start.interacting = true;
              $tEl.css({"margin-left": currentPos + ( ( (stop.coords[0] - start.coords[0]) / start.origin.width() ) * 100 ) + '%' });
              e.preventDefault();
            } else {
              return;
            }
          };

          $el
            .bind("gesturestart", function(e) {
              $el
                .unbind("touchmove", moveHandler)
                .unbind("touchend", moveHandler);
            })
            .bind("touchmove", moveHandler)
            .one("touchend", function(e) {
              $el.unbind("touchmove", moveHandler);

              transitionSwap($tEl, true);

              if (start && stop ) {
                var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
                  deltaY = Math.abs(start.coords[1] - stop.coords[1]),
                  left = start.coords[0] > stop.coords[0],
                  jumppoint;

                if( deltaX > 20 && ( deltaX > deltaY ) ) {
                  e.preventDefault();
                } else {
                  if( start.interacting ) {
                    $el.trigger('snapback', { 'target': $tEl, 'left': left });
                  }
                  return;
                }

                jumppoint = start.origin.width() / 4;

                if( -deltaX > jumppoint || deltaX > jumppoint ) {
                  start.origin.trigger("dragSnap", {'direction': left ? "left" : "right"});
                } else {
                  $el.trigger('snapback', { 'target': $tEl, 'left': left });
                }
              }
              start = stop = undefined;
            });
        });
    }
  };

})(jQuery);;
/**
 * jQuery Masonry v2.1.03
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2011 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/(this.columnWidth+this.options.gutterWidth)),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}function h(){a.call(c,d)}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a});return c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d)f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");else{if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)}})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);
;
(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);
;
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);;
jQuery.extend({
  getUrlVar: function(url, name){
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
});;
/* Author:
 Mike Swartz / Upstatement
 */
(function ($) {
  Drupal.behaviors.upstatement = {
    attach:function (context, settings) {
      $('.share-tools-list li a, .pub-share-list li a').click(function() {
        var targetUrl;
        var network;
        var action;
        if ($(this).parent().hasClass('facebook')) {
          targetUrl = 'u';
          network = 'Facebook';
          action = 'like';
        }
        if ($(this).parent().hasClass('twitter')) {
          targetUrl = 'url';
          network = 'Twitter';
          action = 'tweet';
        }
        if ($(this).parent().hasClass('linkedin')) {
          targetUrl = 'url';
          network = 'LinkedIn';
          action = 'share';
        }
        if ($(this).parent().hasClass('google')) {
          targetUrl = 'url';
          network = 'Google';
          action = '+1';
        }
        var href = $(this).attr('href');
        var url = $.getUrlVar(href, targetUrl);
        _gaq.push(['_trackSocial', network, action, url]);
        _gaq.push(['_setCustomVar', 5, 'Social Sharer', network, 1]);
      });
      var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
      var ww = $(window).width();
      $('#header').on('click', '#block-system-main-menu-trigger, #main-search-trigger', function () {
        $this = $(this);
        $header = $('#header');
        if ($this.attr('id') == 'block-system-main-menu-trigger') {
          if ($header.hasClass('nav-active')) {
            $header.removeClass('nav-active');
          }
          else {
            $('#header').removeClass('search-active')
              .addClass('nav-active');
          }
        }
        else {
          if ($header.hasClass('search-active')) {
            $header.removeClass('search-active');
          }
          else {
            $('#header').removeClass('nav-active')
              .addClass('search-active');
          }
        }
      });
      if (!supportsTouch) {
        var hoverConfig = {
          over: function(){
            $(this).children('.item-list').css('display', 'block');
          },
          timeout: 50,
          interval:200,
          out: function(){
            $(this).children('.item-list').css('display', 'none');
          }
        };
        $('li.expanded').hoverIntent(hoverConfig);
        // Give us an active class when user hovers on megamenu in main-nav
        $('.expanded .item-list').hover(
          function(){
            var t = $(this).closest('li');
            t.addClass('active');
          },
          function(){
            var t = $(this).closest('li');
            t.removeClass('active');
          }
        );
      }
      // Show/Hide Subnav when user clicks
      $('#content').on('click', '#sub-nav-trigger', function () {
        $nav = $('#sub-nav-trigger .section-nav');
        $arrow = $('#sub-nav-trigger .arrow-down:visible');
        if ($arrow.length) {
          if ($nav.hasClass('open')) {
            $nav.removeClass('open');
          }
          else {
            $nav.addClass('open');
          }
        }// end if
      });
      //responsive sticky nav fix
      var w = $('.sticky').width();
      $('.sticky').sticky();
      $('.sticky').css("width", w);
      // List exander
      $('.list-more').addClass('list-hide');
      $('.list-expand-trigger').toggle(
        function () {
          var t = $(this);
          var l = $(this).closest('li').siblings('.list-hide');
          l.addClass('list-show');
          l.removeClass('list-hide');
          t.find('> a').text('Show Less');
        },
        function () {
          var t = $(this);
          var l = $(this).closest('li').siblings('.list-show');
          l.addClass('list-hide');
          l.removeClass('list-show');
          t.find('> a').text('Show More');
        }
      );
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      // Masonry
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      // Initiate Masonry when window is wider than 768px
      if (ww >= 768) {
        var $container = $('.research-areas-item-container');
        $container.imagesLoaded(function () {
          $container.masonry({
            // options
            itemSelector:'.research-areas-item',
            isResizable:true,
            columnWidth:function (containerWidth) {
              return containerWidth / 2;
            }
          });
        });
      }
      // open non-Cato pages in a new window
      $("a[href^='http']").not("a[href*=cato\\.org], a[href$=\\.pdf]").attr("target", "_blank");
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      // Dynamic carousel
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      $('.slidewrap').carousel({
        slider:'.slider',
        slide:'.slide',
        addNav:true,
        addPagination:true,
        speed:300 // ms.
      });
      $('.slidewrapstore').carousel({
        slider:'.slider',
        slide:'.slide',
        addNav:true,
        speed:300 // ms.
      });
      var setRaHeight = function () {
        if ($('.region-sidebar-first').is(':visible')) {
          $('.region-sidebar-first').height($('.region-content').height());
        }
      };
      if ($('.region-sidebar-first .sidenav').size()) {
        $(window).resize(function () {
          setRaHeight();
        });
        setRaHeight();
        $('.region-sidebar-first .sidenav').fixedScroll({container:'.region-sidebar-first', offset:20, forceTop:true, shrinkContainer:20});
      }
      //fixed-scroll
      $('.region-sidebar-first .fixedscroll').fixedScroll({container:'#page-area', forceTop:true, offset:20, shrinkContainer:100});
      $('.pub-share-list').fixedScroll({container:'.pub-page #page-area', forceTop:true, offset:20, shrinkContainer:100, breakPoint:1030});
    }
  }
})(jQuery);
;
