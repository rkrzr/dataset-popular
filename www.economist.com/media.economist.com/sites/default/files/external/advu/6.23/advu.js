/*@cc_on
(function(f){
window.setTimeout = f(window.setTimeout);
window.setInterval = f(window.setInterval);
})(function(f){
return function(c,t){
var a = Array.prototype.slice.call(arguments,2);
if(typeof c != "function")
c = new Function(c);
return f(function(){
c.apply(this, a)
}, t)
}
});
@*/


"undefined"!==typeof ACCEL&&delete ACCEL;var ACCEL={av:{}};
ACCEL.av={engine:new VisMG,reportSuite:function(d){ACCEL.av.engine.reportSuite(d)},refreshTime:function(d){ACCEL.av.engine.refreshTime(d)},refresh:function(d){ACCEL.av.engine.refresh(d)},refreshOriginalAds:function(d){ACCEL.av.engine.refreshOriginalAds(d)},refreshAds:function(d){ACCEL.av.engine.refreshAds(d)},inactiveTime:function(d){ACCEL.av.engine.inactiveTime(d)},useCreativeID:function(d){ACCEL.av.engine.useCreativeID(d)},sendData:function(d){ACCEL.av.engine.sendData(d)},visibleArea:function(d){ACCEL.av.engine.visibleArea(d)},
adTag:function(d,I){ACCEL.av.engine.ad_tag(d,I)},autoDimensions:function(d){ACCEL.av.engine.autoDimensions(d)},custom1:function(d){ACCEL.av.engine.custom1(d)},custom2:function(d){ACCEL.av.engine.custom2(d)},custom3:function(d){ACCEL.av.engine.custom3(d)},iframeTag:function(d){ACCEL.av.engine.iframe_tag(d)},greyGif:function(d){ACCEL.av.engine.grey_gif(d)},beaconPixel:function(d){ACCEL.av.engine.beacon_pixel(d)},trackOverlay:function(d){ACCEL.av.engine.track_overlay(d)}};
"undefined"!==typeof VisMG&&delete VisMG;
function VisMG(){function d(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)}function I(a,b){if(a.currentStyle)var c=a.currentStyle[b];else window.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,null).getPropertyValue(b));return"NaN"==parseInt(c)?parseInt(c):c}function qa(){$("doubleclick.net/ad","script",document);aa&&$("doubleclick.net/ad","iframe",document)}function ra(){var a;P?(setTimeout(function(){P=!1},800),a=J):(document.body.scrollLeft+=
1,0!=document.body.scrollLeft?(document.body.scrollLeft-=1,a=!J?sa():J,P=!0):a=0);return a}function sa(){var a;document.body.style.overflow="hidden";a=document.body.clientWidth;document.body.style.overflow="scroll";(a-=document.body.clientWidth)||(a=document.body.offsetWidth-document.body.clientWidth);document.body.style.overflow="";J=a}function ba(){"undefined"!==typeof window.innerWidth?(u=window.innerHeight-ra(),o=document.documentElement.clientWidth,E=window.pageYOffset,F=window.pageXOffset):
"undefined"!==typeof document.documentElement&&"undefined"!==typeof document.documentElement.clientWidth&&0!==document.documentElement.clientWidth?(o=document.documentElement.clientWidth,u=document.documentElement.clientHeight,E=document.documentElement.scrollTop,F=document.documentElement.scrollLeft):(o=document.getElementsByTagName("body")[0].clientWidth,u=document.getElementsByTagName("body")[0].clientHeight,E=document.getElementsByTagName("body")[0].scrollTop,F=document.getElementsByTagName("body")[0].scrollLeft);
G=!0}function K(a,b){G||ba();var d=document.getElementById(a);if("undefined"===typeof d||null===d)return!1;for(var x=d.offsetTop,f=d.offsetLeft,v=c[b][21],j=c[b][22];d.offsetParent;)d=d.offsetParent,x+=d.offsetTop,f+=d.offsetLeft;var g=Math.round(100*(v*j/(o*u)));g>c[b][18]&&(c[b][18]=g);if(!c[b][18]||0==c[b][18])c[b][18]=Math.round(100*(v*j/(o*u))),c[b][19]=0;50<=c[b][18]&&(c[b][18]=50);50<=c[b][19]&&(c[b][19]=50);d=Math.max(x,E);d=Math.min(x+j,E+u)-d;g=Math.max(f,F);g=(Math.min(f+v,F+o)-g)*d;d=
100*(g/(v*j));0<=g&&(g=Math.round(100*(g/(o*u))),g>c[b][19]&&(c[b][19]=g));d>=L&&(0==c[b][32]&&(c[b][31]=1),0==c[b][4]&&(0==c[b][3]&&0==c[b][33]&&c[b][2]<ca)&&c[b][34]++);-1==c[b][35]&&(c[b][35]=1);if(d>=L&&p)if(c[b][5]){if(c[b][12]&&(c[b][2]<ca?c[b][2]++:c[b][33]++),c[b][15]){c[b][15]=!1;c[b][16]&&c[b][1]++;c[b][23]++;if(g=c[b][16])(new Image).src=g+ta;c[b][2]=10*Math.floor(c[b][2]/10)+1}}else c[b][5]=!0;else d<L&&p?(c[b][5]=!1,c[b][3]<ua?(c[b][3]++,c[b][15]&&c[b][4]++):c[b][33]++,0==c[b][31]&&(c[b][32]=
1)):c[b][33]++;0<c[b][2]&&0===c[b][2]%s&&setTimeout(da,Math.floor(71*Math.random())+80,c[b][0],b);c[b][7]=v;c[b][8]=j;c[b][9]=x;c[b][10]=f;c[b][11]=Math.ceil(d);M[b]=c[b][28]+"|"+c[b][29]+"|"+c[b][6]+"|"+c[b][14]+"|"+c[b][20]+"|"+c[b][21]+"|"+c[b][22]+"|"+c[b][9]+"|"+c[b][10]+"|"+c[b][27]+"|"+c[b][1]+"|"+c[b][23]+"|"+c[b][35]+"|"+c[b][2]+"|"+c[b][3]+"|"+c[b][31]+"|"+c[b][34]+"|"+c[b][32]+"|"+c[b][4]+"|"+c[b][17]+"|"+c[b][18]+"|"+c[b][19]+"|"+c[b][37]+"|;";!ea&&"g"==c[b][27]?M[b]="":!fa&&"b"==c[b][27]&&
(M[b]="");Q=ga+";"+va+";"+ha+";"+ia+";"+ja+";"+M.toString().split("|0|").join("||").split(",").join("").split("|0|").join("||")}var va="v6.23",ga="teg",p=!1,z=!1,t=!0,Q="",G=!1,P=!1,J=null,ta="http://s0.2mdn.net/dot.gif",s=99999999999,n=45,wa=n,H=!1,R=!1,S=!1,ka=!0,L=50,la=!0,ea=!1,fa=!1,aa=!1,ma=!0,ha="",ia="",ja="",ca=600,ua=600,r=navigator.userAgent.toLowerCase(),r=-1!==navigator.platform.indexOf("iPhone")||-1!==navigator.platform.indexOf("iPod")||-1!==navigator.platform.indexOf("iPad")||-1!==
r.search("symbian")||-1!==r.search("android")||-1!==r.search("windows ce")||-1!==r.search("windows phone")||-1!==r.search("blackberry")||-1!==r.search("palm"),T=function(a){for(var a=document.getElementById(a).parentNode,b="";a;){if("undefined"!==typeof a.id&&""!==a.id){b=a.id;break}a=a.parentNode}return b},U=function(a){for(var a=document.getElementById(a).parentNode,b="";a;){if("undefined"!==typeof a.className&&""!==a.className){b=a.className;break}a=a.parentNode}return b},A=[],B=[],M=[],da=function(a,
b){var d=document.getElementById(a),x=!1,f=0;a:for(;f<A.length;f++){if(A[f][0]===a&&(clearInterval(c[b][13]),delete ord,c[b][12]=!1,x=!0,!A[f][2])){d.innerHTML="";A[f][2]=!0;break a}if(x){for(d=0;d<A.length;d++)A[d][0]===a&&(A[d][2]=!1);setTimeout(xa,Math.floor(71*Math.random())+75,a,b);break a}}},xa=function(a,b){da(a,b)};"undefined"!=typeof c&&delete c;var c=[],na=function(a){if(""!==a.id)return'id("'+a.id+'")';if(a===document.body)return a.tagName;for(var b=0,c=a.parentNode.childNodes,d=0;d<c.length;d++){var f=
c[d];if(f===a)return na(a.parentNode)+"/"+a.tagName+"["+(b+1)+"]";1===f.nodeType&&f.tagName===a.tagName&&b++}},$=function(a,b,d,x){for(var d=d||document,b=b||"*",d=d.getElementsByTagName(b),f=0;f<d.length;f++){var v=d[f],j=unescape(unescape(v.outerHTML)).toLowerCase(),g=v.parentNode,m=g.id;I(g,"display");if("hidden"!==I(g,"visibility")&&-1!==j.indexOf(a)){j=g;if(ma){if(""===j.style.width||"undefined"===j.style.width)j.style.width="auto";if(""===j.style.height||"undefined"===j.style.height)j.style.height=
"auto"}j=g;if(""==j.id){var h=na(j),h=h.replace(/\//g,"_"),h=h.replace(/(\")|(\@)|(\')|(\:)|(\#)/g,"."),h=h.replace(/(\()|(\))|(\[)|(\])/g,"-");j.id=h}j=c.length;h=0;if(0<j){var k=0;a:for(;k<j;k++)if(c[k][0]===m&&c[k][12]){h=1;break a}else if(c[k][0]===m&&!c[k][12]){c[k][12]=!0;h=1;break a}}0===h&&g!==document.body&&(x?oa(v,!1,b):oa(g,!1,b))}}},oa=function(a,b,c){for(var d,f,v,j=!1,g=a.outerHTML.toLowerCase(),b=a.id,m=!1,h=0;h<B.length;h++)if(B[h][0]===b){m=!0;break}m||B.push([b,!1]);S=!0;if(!S)for(h=
0;h<B.length;h++)!B[h][1]&&B[h][0]===b&&(m=a.getElementsByTagName("script")[0].innerHTML,A.push([b,"<script language='JavaScript' type='text/javascript'>"+m+"<\/script>"]),B[h][1]=!0);if(m=a.getElementsByTagName(c)[0].outerHTML.toLowerCase())c=m.split("src")[1],d=c.split(";")[0].split("/")[4],f=c.split(";")[0].split("/")[5],""==f&&(f="-"),-1!==c.indexOf(";pos=")&&(v=c.split(";pos=")[1].split(";")[0]),-1!==c.indexOf("dcopt=ist")&&(j=!0);if(-1!==g.indexOf("doubleclick.net/click")){var c=!1,g="f",k=
m=h="-",w="-",l="-",p="-",C=k="-",q="-",a=unescape(unescape(a.outerHTML)).toLowerCase();-1!==a.indexOf("doubleclick.net/click")?(-1!==a.indexOf("clicktag=")?g="f":-1!==a.indexOf("iframe")?g="3p":-1!==a.indexOf("click=")?g="rm":(g="i",-1!==a.indexOf("grey.gif")&&(g="g")),a=a.split("doubleclick.net/click")[1].split("?")[0],h=a.split(";")[2],m=a.split(";")[7].split("/")[0],C=a.split(";")[5],w=a.split(";")[6].split("-")[1].split("/")[0],l=a.split(";")[6].split("-")[1].split("/")[1],k=document.getElementById(b).className,
p=T(b),q=U(b),c&&(c=V(a,b,c))):g="3p";W(h,b,m,C,w,l,k,p,q,g,c,d,f,j,!1,v)}else if(-1!==g.indexOf("iframe")){a.getElementsByTagName("iframe");c="if";g=d;d=f;a=a.getElementsByTagName("iframe");for(f=0;f<a.length;f++)if(h=a[f],m=unescape(unescape(h.src)).toLowerCase(),-1!==m.indexOf("doubleclick.net/ad")){var k=b,w=!1,l=c,p=g,C=d,q=j,e=v,N="-",i="-",s="-",n="-",r="-",u="-",o="-",t="-";"undefined"!==typeof m&&(o=i=N="if",n=h.width,r=h.height,s=document.getElementById(k).className,u=T(k),t=U(k),w&&(w=
V(m,k,w)),W(N,k,i,o,n,r,s,u,t,l,w,p,C,q,!1,e))}}else{c="i";g=d;d=f;f=!1;a=a.getElementsByTagName("a");for(h=0;h<a.length;h++)if(m=a[h],-1!==m.href.indexOf("doubleclick.net/click")){m.getElementsByTagName("img")[0]&&-1!==m.getElementsByTagName("img")[0].src.toLowerCase().indexOf("grey.gif")&&(c="g",f=!0);var k=b,w=!1,l=c,p=g,C=d,q=j,e=f,N=v,i=void 0,y=r=t=o=u=r=n=s="-",z="-",i=unescape(unescape(m.href)).toLowerCase();"undefined"!==typeof i&&(-1!==i.indexOf("doubleclick.net/click")?(s=i.split(";")[2],
n=i.split(";")[7].split("/")[0],y=i.split(";")[5],u=i.split(";")[6].split("-")[1].split("/")[0],o=i.split(";")[6].split("-")[1].split("/")[1],r=document.getElementById(k).className,t=T(k),z=U(k),w&&(w=V(i,k,w))):l="3p",W(s,k,n,y,u,o,r,t,z,l,w,p,C,q,e,N))}}},V=function(a,b,c){var b=document.getElementById(b).getElementsByTagName("a"),d=null,f=0;a:for(;f<b.length;f++){var l=b[f];if("imp"===l.className.toLowerCase()){d=l.href;break a}}b=d;null===b&&(a=a.split(";"),b=a[0].split("/click")[0],d=a[2]+";"+
a[3]+";"+a[4]+";"+a[5],f=a[6].split("-")[1],b=b+"/imp;v7;"+c.env+";"+d+";"+f+";"+a[7]+";;~okv=;"+c.keyvalues+";~cs=i%3f");return b},W=function(a,b,d,l,f,p,j,g,m,h,k,q,r,s,n,u){var e=!1,o=c.length,i=0;a:for(;i<o;i++){var t=!0;ka&&(t=c[i][14]===d?!0:!1);if(c[i][0]===b&&c[i][6]===a&&t){k||c[i][1]++;c[i][2]++;c[i][5]=!1;c[i][12]=!0;e=c[i][15]=!0;c[i][16]=k;c[i][17]++;clearTimeout(c[i][13]);o=b;c[i][13]=n?setTimeout(K,999,o,i):setInterval(K,999,o,i);break a}}e||(e=[],e[0]=b,e[1]=k?0:1,e[2]=0,e[3]=0,e[4]=
0,e[34]=0,e[5]=!1,e[6]=a,e[7]=0,e[8]=0,e[9]=0,e[10]=0,e[11]=0,e[12]=!0,e[14]=d,e[15]=!0,e[16]=k,e[17]=0,e[18]=0,e[19]=0,e[20]=l,e[21]=parseFloat(f),e[22]=parseFloat(p),1>=e[21]&&1>=e[22]&&(n=!0,"g"!==h&&(h="b")),e[23]=0,e[24]=j,e[25]=g,e[26]=m,e[27]=h,"g"==e[27]&&(n=!0),e[28]=q,e[29]=r,e[30]=s,e[31]=0,e[32]=0,e[33]=0,e[35]=0,e[36]="",e[37]=u,clearTimeout(e[13]),a=c.push(e)-1,c[a][13]=n?setTimeout(K,999,b,a):setInterval(K,999,b,a))},y=function(){null!=l&&clearTimeout(l);null!==q&&clearTimeout(q);t=
z=p=!1},X=function(){null!=l&&clearTimeout(l);null!==q&&clearTimeout(q);t=z=p=!0};!0===(void 0!==document.onfocusin?!0:!1)?(d(document,"focusout",y,!1),d(document,"focusin",X,!1),d(window,"focusout",y,!1),d(window,"focusin",X,!1)):(d(window,"blur",y,!1),d(window,"focus",X,!1));var ya=0,Y=null,pa=function(){ya++;G=false;delete pa};d(window,"resize",function(){Y!==null&&clearTimeout(Y);l!=null&&clearTimeout(l);Y=setTimeout(function(){pa()},200)},!1);var q=null,D=0,y=function(){q!==null&&clearTimeout(q);
q=setTimeout(function(){t=z=p=true;l!==null&&clearTimeout(l);O!==null&&clearTimeout(O);q!==null&&clearTimeout(q);D=0},100)};r?"undefined"!==typeof window.ontouchmove&&d(window,"touchmove",y,!1):(d(window,"mousemove",y,!1),d(document,"mousemove",y,!1));setInterval(function(){if(z)if(D<=n)D++;else{p=false;z=true;t=false}else if(D<=n)D++;else t=z=p=false},1E3);var za=0,Z=0,O,l=-1,Aa=function(){clearInterval(O);Z=0;za++;G=false;if(!t){p=true;D=0;l!==null&&clearTimeout(l);l=setTimeout(function(){t=p=false},
wa*1E3)}};d(window,"scroll",function(){if(Z<=1){O=setTimeout(function(){Aa()},100);Z++}},!1);var o,u,E,F;d(window,"beforeunload",function(){if(la&&Q!==""){(new Image).src="http://eu1.advu-data.com/?"+Q;for(var a=0;a<313;a++)log("")}},!1);setTimeout(function(){if(!("ontouchstart"in window||"onmsgesturechange"in window&&window.navigator.msMaxTouchPoints)){G||ba();setInterval(qa,350)}},10);this.reportSuite=function(a){if(typeof a==="undefined")return false;ga=a};this.refreshTime=function(a){a=parseInt(a);
if(isNaN(a))return false;if(!R&&!H)if(a<n){s=9999999999;n=Math.ceil(a*1.5)}else s=9999999999};this.refreshAds=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false;if(!R)if(a){H=false;s=9999999999}else{H=true;s=999999999}};this.refresh=function(a){a=parseInt(a);if(isNaN(a))return false;if(!H)if(a<n){s=9999999999;n=Math.ceil(a*1.5)}else s=9999999999;if(a===0){H=true;s=999999999}R=true};this.refreshOriginalAds=function(a){if(typeof a==="string"){a=a.toLowerCase();
a=a==="true"}if(typeof a!=="boolean")return false;S=false};this.inactiveTime=function(a){a=parseInt(a);if(isNaN(a))return false;n=a};this.useCreativeID=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false;ka=a};this.logs=function(a,b){if(typeof a!=="boolean"||typeof b!=="boolean")return false};this.sendData=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false;la=a};this.visibleArea=function(a){a=
parseInt(a);if(isNaN(a))return false;a>0&&(L=a)};this.ad_tag=function(a,b){if(typeof a==="undefined")return false;typeof b==="undefined"?B.push([a]):A.push([a,b])};this.autoDimensions=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false;ma=a};this.custom1=function(a){if(typeof a==="undefined")return false;ha=a};this.custom2=function(a){if(typeof a==="undefined")return false;ia=a};this.custom3=function(a){if(typeof a==="undefined")return false;ja=
a};this.iframe_tag=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false;aa=a};this.grey_gif=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false;ea=a};this.beacon_pixel=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false;fa=a};this.track_overlay=function(a){if(typeof a==="string"){a=a.toLowerCase();a=a==="true"}if(typeof a!=="boolean")return false}}
Function.prototype.bind&&(("object"==typeof console||"function"==typeof console)&&"object"==typeof console.log)&&"log info warn error assert dir clear profile profileEnd".split(" ").forEach(function(d){console[d]=this.call(console[d],console)},Function.prototype.bind);
window.log||(window.log=function(){log.history=log.history||[];log.history.push(arguments);if("undefined"!=typeof console&&"function"==typeof console.log)if(window.opera)for(var d=0;d<arguments.length;)console.log("Item "+(d+1)+": "+arguments[d]),d++;else 1==Array.prototype.slice.call(arguments).length&&"string"==typeof Array.prototype.slice.call(arguments)[0]?console.log(Array.prototype.slice.call(arguments).toString()):console.log(Array.prototype.slice.call(arguments));else!Function.prototype.bind&&
"undefined"!=typeof console&&"object"==typeof console.log?Function.prototype.call.call(console.log,console,Array.prototype.slice.call(arguments)):document.getElementById("firebug-lite")?setTimeout(function(){log(Array.prototype.slice.call(arguments))},500):(d=document.createElement("script"),d.type="text/javascript",d.id="firebug-lite",d.src="https://getfirebug.com/firebug-lite.js",document.getElementsByTagName("HEAD")[0].appendChild(d),setTimeout(function(){log(Array.prototype.slice.call(arguments))},
2E3))});