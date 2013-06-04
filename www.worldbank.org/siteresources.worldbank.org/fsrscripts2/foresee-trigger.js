var ForeSee = {
    'version': '2.3.0',
    'Date:': '11/24/2008',
    'enabled': true,
    'files': fsfPath,
    //'files': 'http://siteresources.worldbank.org/foresee/',
    'id': 'xYpMVkA5xg9Bx5llpBsANQ==',
    'sites': [{
        path: 'worldbank.org.cn',
        cookie: 'session',
        domain: 'worldbank.org.cn'
    },{
        path: 'worldbank.org',
        cookie: 'session',
        domain: 'worldbank.org'
    },{
        path: 'bancomundial.org',
        cookie: 'session',
        domain: 'bancomundial.org'
    },{
        path: 'banquemondiale.org',
        cookie: 'session',
        domain: 'banquemondiale.org'
    },{
        path: 'foreseeresults.com',
        cookie: 'session',
        domain: 'foreseeresults.com'
    },{
        path: 'shihang.org',
        cookie: 'session',
        domain: 'shihang.org'
    }]
};
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function fsr$setAlive(){var A=new Date().getTime();document.cookie="foresee.alive="+A+";path=/;domain="+ForeSee.site.domain+";"
}(function(){var C=ForeSee.sites;for(var B=0,A=C.length;B<A;B++){if(document.location.href.match(C[B].path)){ForeSee.siteid=B;
ForeSee.site=ForeSee.sites[ForeSee.siteid];if(ForeSee.site.files){ForeSee.files=ForeSee.site.files
}break}}fsr$setAlive();ForeSee.timer=setInterval(fsr$setAlive,1000)})();fsr$dbug={log:function(){}};
ForeSee.Native=function(J){J=J||{};var F=J.afterImplement||function(){};var G=J.generics;G=(G!==false);
var H=J.legacy;var E=J.initialize;var B=J.protect;var A=J.name;var C=E||H;C.xconstructor=ForeSee.Native;
C.fsr$family={name:"native"};if(H&&E){C.prototype=H.prototype}C.prototype.xconstructor=C;if(A){var D=A.toLowerCase();
C.prototype.fsr$family={name:D};ForeSee.Native.typize(C,D)}var I=function(M,K,N,L){if(!B||L||!M.prototype[K]){M.prototype[K]=N
}if(G){ForeSee.Native.genericize(M,K,B)}F.call(M,K,N);return M};C.fsr$implement=function(L,K,N){if(typeof L=="string"){return I(this,L,K,N)
}for(var M in L){I(this,M,L[M],K)}return this};C.fsr$alias=function(M,K,N){if(typeof M=="string"){M=this.prototype[M];
if(M){I(this,K,M,N)}}else{for(var L in M){this.fsr$alias(L,M[L],K)}}return this};return C};ForeSee.Native.fsr$implement=function(D,C){for(var B=0,A=D.length;
B<A;B++){D[B].fsr$implement(C)}};ForeSee.Native.genericize=function(B,C,A){if((!A||!B[C])&&typeof B.prototype[C]=="function"){B[C]=function(){var D=Array.prototype.slice.call(arguments);
return B.prototype[C].apply(D.shift(),D)}}};ForeSee.Native.typize=function(A,B){if(!A.fsr$type){A.fsr$type=function(C){return($type(C)===B)
}}};ForeSee.Native.fsr$alias=function(E,B,A,F){for(var D=0,C=E.length;D<C;D++){E[D].fsr$alias(B,A,F)
}};(function(B){for(var A in B){ForeSee.Native.typize(B[A],A)}})({"boolean":Boolean,"native":ForeSee.Native,object:Object});
(function(B){for(var A in B){new ForeSee.Native({name:A,initialize:B[A],protect:true,generics:true})
}})({String:String,Function:Function,Number:Number,Array:Array,RegExp:RegExp,Date:Date});ForeSee.$chk=function(A){return !!(A||A===0)
};ForeSee.$clear=function(A){clearTimeout(A);clearInterval(A);return null};ForeSee.$defined=function(A){return(A!=undefined)
};ForeSee.$empty=function(){};ForeSee.$arguments=function(A){return function(){return arguments[A]
}};ForeSee.$lambda=function(A){return(typeof A=="function")?A:function(){return A}};ForeSee.$extend=function(C,A){for(var B in (A||{})){C[B]=A[B]
}return C};ForeSee.$unlink=function(C){var B;switch(ForeSee.$type(C)){case"object":B={};for(var E in C){B[E]=ForeSee.$unlink(C[E])
}break;case"hash":B=ForeSee.$unlink(C.fsr$getClean());break;case"array":B=[];for(var D=0,A=C.length;
D<A;D++){B[D]=ForeSee.$unlink(C[D])}break;default:return C}return B};ForeSee.$merge=function(){var E={};
for(var D=0,A=arguments.length;D<A;D++){var B=arguments[D];if(ForeSee.$type(B)!="object"){continue
}for(var C in B){var G=B[C],F=E[C];E[C]=(F&&ForeSee.$type(G)=="object"&&ForeSee.$type(F)=="object")?ForeSee.$merge(F,G):ForeSee.$unlink(G)
}}return E};ForeSee.$pick=function(){for(var B=0,A=arguments.length;B<A;B++){if(arguments[B]!=undefined){return arguments[B]
}}return null};ForeSee.$random=function(B,A){return Math.floor(Math.random()*(A-B+1)+B)};ForeSee.$splat=function(B){var A=ForeSee.$type(B);
return(A)?((A!="array"&&A!="arguments")?[B]:B):[]};ForeSee.$time=Date.now||function(){return new Date().getTime()
};ForeSee.$try=function(){for(var B=0,A=arguments.length;B<A;B++){try{return arguments[B]()}catch(C){}}return null
};ForeSee.$type=function(A){if(A==undefined){return false}if(A.fsr$family){return(A.fsr$family.name=="number"&&!isFinite(A))?false:A.fsr$family.name
}if(A.nodeName){switch(A.nodeType){case 1:return"element";case 3:return(/\S/).test(A.nodeValue)?"textnode":"whitespace"
}}else{if(typeof A.length=="number"){if(A.callee){return"arguments"}else{if(A.item){return"collection"
}}}}return typeof A};ForeSee.Hash=new ForeSee.Native({name:"Hash",initialize:function(A){if(ForeSee.$type(A)=="hash"){A=ForeSee.$unlink(A.fsr$getClean())
}for(var B in A){this[B]=A[B]}return this}});ForeSee.Hash.fsr$implement({fsr$getLength:function(){var B=0;
for(var A in this){if(this.hasOwnProperty(A)){B++}}return B},fsr$forEach:function(B,C){for(var A in this){if(this.hasOwnProperty(A)){B.call(C,this[A],A,this)
}}},fsr$getClean:function(){var B={};for(var A in this){if(this.hasOwnProperty(A)){B[A]=this[A]}}return B
},fsr$empty:function(){ForeSee.Hash.fsr$each(this,function(B,A){delete this[A]},this);return this
}});ForeSee.Hash.fsr$alias("fsr$forEach","fsr$each");ForeSee.$H=function(A){return new ForeSee.Hash(A)
};Array.fsr$implement({fsr$forEach:function(C,D){for(var B=0,A=this.length;B<A;B++){C.call(D,this[B],B,this)
}}});Array.fsr$alias("fsr$forEach","fsr$each");ForeSee.$A=function(C){if(C.item){var D=[];for(var B=0,A=C.length;
B<A;B++){D[B]=C[B]}return D}return Array.prototype.slice.call(C)};ForeSee.$each=function(C,B,D){var A=ForeSee.$type(C);
((A=="arguments"||A=="collection"||A=="array")?Array:ForeSee.Hash).fsr$each(C,B,D)};ForeSee.Browser=new ForeSee.Hash({Type:{name:"unknown",version:""},Engine:{name:"unknown",version:""},Platform:{name:(navigator.platform.match(/mac|win|linux/i)||["other"])[0].toLowerCase(),os:"unknown"},Features:{xpath:!!(document.evaluate),air:!!(window.runtime)},Plugins:{},searchString:function(D){for(var A=0;
A<D.length;A++){var B=D[A].string;var C=D[A].prop;this.versionSearchString=D[A].versionSearch||D[A].identity;
if(B){if(B.indexOf(D[A].subString)!=-1){return D[A].identity}}else{if(C){return D[A].identity}}}},searchVersion:function(B){var A=B.indexOf(this.versionSearchString);
if(A==-1){return }return parseFloat(B.substring(A+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]});
if(window.opera){ForeSee.Browser.Engine={name:"presto",version:(document.getElementsByClassName)?950:925}
}else{if(window.ActiveXObject){ForeSee.Browser.Engine={name:"trident",version:(window.XMLHttpRequest)?5:4}
}else{if(!navigator.taintEnabled){ForeSee.Browser.Engine={name:"webkit",version:(ForeSee.Browser.Features.xpath)?420:419}
}else{if(document.getBoxObjectFor!=null){ForeSee.Browser.Engine={name:"gecko",version:(document.getElementsByClassName)?19:18}
}}}}ForeSee.Browser.Engine[ForeSee.Browser.Engine.name]=ForeSee.Browser.Engine[ForeSee.Browser.Engine.name+ForeSee.Browser.Engine.version]=true;
if(window.orientation!=undefined){ForeSee.Browser.Platform.name="ipod"}ForeSee.Browser.Platform[ForeSee.Browser.Platform.name]=true;
ForeSee.Browser.Request=function(){return ForeSee.$try(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("MSXML2.XMLHTTP")
})};ForeSee.Browser.Features.xhr=!!(ForeSee.Browser.Request());ForeSee.Browser.Plugins.Flash=(function(){var A=(ForeSee.$try(function(){return navigator.plugins["Shockwave Flash"].description
},function(){return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")})||"0 r0").match(/\d+/g);
return{version:parseInt(A[0]||0+"."+A[1]||0),build:parseInt(A[2]||0)}})();ForeSee.Browser.Type.name=ForeSee.Browser.searchString(ForeSee.Browser.dataBrowser)||"unknown";
ForeSee.Browser.Type.version=ForeSee.Browser.searchVersion(navigator.userAgent)||ForeSee.Browser.searchVersion(navigator.appVersion)||"unknown";
ForeSee.Browser.Platform.os=ForeSee.Browser.searchString(ForeSee.Browser.dataOS)||"unknown";ForeSee.$exec=function(B){if(!B){return B
}if(window.execScript){window.execScript(B)}else{var A=document.createElement("script");A.setAttribute("type","text/javascript");
A.text=B;document.fsr$head.appendChild(A);document.fsr$head.removeChild(A)}return B};ForeSee.Native.UID=1;
ForeSee.$uid=(ForeSee.Browser.Engine.trident)?function(A){return(A.fsr$uid||(A.fsr$uid=[ForeSee.Native.UID++]))[0]
}:function(A){return A.fsr$uid||(A.fsr$uid=ForeSee.Native.UID++)};ForeSee.Window=new ForeSee.Native({name:"Window",initialize:function(A){ForeSee.$uid(A);
if(!A.Element){A.Element=ForeSee.$empty;if(ForeSee.Browser.Engine.webkit){A.document.createElement("iframe")
}A.Element.prototype=(ForeSee.Browser.Engine.webkit)?window["[[DOMElement.prototype]]"]:{}}return ForeSee.$extend(A,ForeSee.Window.Prototype)
},afterImplement:function(B,A){window[B]=ForeSee.Window.Prototype[B]=A;ForeSee.Window.Prototype[B]=A
}});ForeSee.Window.Prototype={fsr$family:{name:"window"}};new ForeSee.Window(window);ForeSee.Document=new ForeSee.Native({name:"Document",initialize:function(A){ForeSee.$uid(A);
A.fsr$head=A.getElementsByTagName("head")[0];A.fsr$html=A.getElementsByTagName("html")[0];A.fsr$window=A.defaultView||A.parentWindow;
if(ForeSee.Browser.Engine.trident4){ForeSee.$try(function(){A.execCommand("BackgroundImageCache",false,true)
})}return ForeSee.$extend(A,ForeSee.Document.Prototype)},afterImplement:function(B,A){document[B]=ForeSee.Document.Prototype[B]=A;
ForeSee.Document.Prototype[B]=A}});ForeSee.Document.Prototype={fsr$family:{name:"document"}};new ForeSee.Document(document);
Array.fsr$implement({fsr$indexOf:function(C,D){var A=this.length;for(var B=(D<0)?Math.max(0,A+D):D||0;
B<A;B++){if(this[B]===C){return B}}return -1},fsr$map:function(D,E){var C=[];for(var B=0,A=this.length;
B<A;B++){C[B]=D.call(E,this[B],B,this)}return C},fsr$associate:function(C){var D={},B=Math.min(this.length,C.length);
for(var A=0;A<B;A++){D[C[A]]=this[A]}return D},fsr$contains:function(A,B){return this.fsr$indexOf(A,B)!=-1
},fsr$extend:function(C){for(var B=0,A=C.length;B<A;B++){this.push(C[B])}return this},fsr$include:function(A){if(!this.fsr$contains(A)){this.push(A)
}return this},fsr$flatten:function(){var D=[];for(var B=0,A=this.length;B<A;B++){var C=ForeSee.$type(this[B]);
if(!C){continue}D=D.concat((C=="array"||C=="collection"||C=="arguments")?Array.fsr$flatten(this[B]):this[B])
}return D},fsr$slice:function(){return Array.prototype.slice.apply(this,arguments)}});Function.fsr$implement({fsr$extend:function(A){for(var B in A){this[B]=A[B]
}return this},fsr$create:function(B){var A=this;B=B||{};return function(D){var C=B.arguments;C=(C!=undefined)?ForeSee.$splat(C):Array.fsr$slice(arguments,(B.event)?1:0);
if(B.event){C=[D||window.event].fsr$extend(C)}var E=function(){return A.apply(B.bind||null,C)};if(B.delay){return setTimeout(E,B.delay)
}if(B.periodical){return setInterval(E,B.periodical)}if(B.attempt){return ForeSee.$try(E)}return E()
}},fsr$pass:function(A,B){return this.fsr$create({arguments:A,bind:B})},fsr$attempt:function(A,B){return this.fsr$create({arguments:A,bind:B,attempt:true})()
},fsr$bind:function(B,A){return this.fsr$create({bind:B,arguments:A})},fsr$bindWithEvent:function(B,A){return this.fsr$create({bind:B,event:true,arguments:A})
},fsr$delay:function(B,C,A){return this.fsr$create({delay:B,bind:C,arguments:A})()},fsr$periodical:function(A,C,B){return this.fsr$create({periodical:A,bind:C,arguments:B})()
},fsr$run:function(A,B){return this.apply(B,ForeSee.$splat(A))}});Number.fsr$implement({fsr$toInt:function(A){return parseInt(this,A||10)
}});String.fsr$implement({fsr$test:function(A,B){return((typeof A=="string")?new RegExp(A,B):A).test(this)
},fsr$contains:function(A,B){return(B)?(B+this+B).indexOf(B+A+B)>-1:this.indexOf(A)>-1},fsr$trim:function(){return this.replace(/^\s+|\s+$/g,"")
},fsr$clean:function(){return this.replace(/\s+/g," ").fsr$trim()},fsr$camelCase:function(){return this.replace(/-\D/g,function(A){return A.charAt(1).toUpperCase()
})},fsr$hyphenate:function(){return this.replace(/[A-Z]/g,function(A){return("-"+A.charAt(0).toLowerCase())
})},fsr$capitalize:function(){return this.replace(/\b[a-z]/g,function(A){return A.toUpperCase()})
},fsr$escapeRegExp:function(){return this.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")},fsr$toInt:function(A){return parseInt(this,A||10)
},fsr$stripScripts:function(B){var A="";var C=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){A+=arguments[1]+"\n";
return""});if(B===true){ForeSee.$exec(A)}else{if(ForeSee.$type(B)=="function"){B(A,C)}}return C},fsr$substitute:function(A,B){return this.replace(B||(/\\?\{([^}]+)\}/g),function(D,C){if(D.charAt(0)=="\\"){return D.slice(1)
}return(A[C]!=undefined)?A[C]:""})}});ForeSee.Hash.fsr$implement({fsr$has:Object.prototype.hasOwnProperty,fsr$keyOf:function(B){for(var A in this){if(this.hasOwnProperty(A)&&this[A]===B){return A
}}return null},fsr$extend:function(A){ForeSee.Hash.fsr$each(A,function(C,B){ForeSee.Hash.fsr$set(this,B,C)
},this);return this},fsr$combine:function(A){ForeSee.Hash.fsr$each(A,function(C,B){ForeSee.Hash.fsr$include(this,B,C)
},this);return this},fsr$erase:function(A){if(this.hasOwnProperty(A)){delete this[A]}return this},fsr$get:function(A){return(this.hasOwnProperty(A))?this[A]:null
},fsr$set:function(A,B){if(!this[A]||this.hasOwnProperty(A)){this[A]=B}return this},fsr$include:function(B,C){var A=this[B];
if(A==undefined){this[B]=C}return this},fsr$toQueryString:function(A){var B=[];ForeSee.Hash.fsr$each(this,function(F,E){if(A){E=A+"["+E+"]"
}var D;switch(ForeSee.$type(F)){case"object":D=ForeSee.Hash.fsr$toQueryString(F,E);break;case"array":var C={};
F.fsr$each(function(H,G){C[G]=H});D=ForeSee.Hash.fsr$toQueryString(C,E);break;default:D=E+"="+encodeURIComponent(F)
}if(F!=undefined){B.push(D)}});return B.join("&")}});ForeSee.Hash.fsr$alias({fsr$keyOf:"fsr$indexOf",fsr$hasValue:"fsr$contains"});
ForeSee.Event=new ForeSee.Native({name:"Event",initialize:function(A,F){F=F||window;var K=F.document;
A=A||F.event;if(A.fsr$extended){return A}this.fsr$extended=true;var J=A.type;var G=A.target||A.srcElement;
while(G&&G.nodeType==3){G=G.parentNode}if(J.fsr$test(/key/)){var B=A.which||A.keyCode;var M=ForeSee.Event.Keys.fsr$keyOf(B);
if(J=="keydown"){var D=B-111;if(D>0&&D<13){M="f"+D}}M=M||String.fromCharCode(B).toLowerCase()}else{if(J.match(/(click|mouse|menu)/i)){K=(!K.compatMode||K.compatMode=="CSS1Compat")?K.getElementsByTagName("html")[0]:K.body;
var I={x:A.pageX||A.clientX+K.scrollLeft,y:A.pageY||A.clientY+K.scrollTop};var C={x:(A.pageX)?A.pageX-F.pageXOffset:A.clientX,y:(A.pageY)?A.pageY-F.pageYOffset:A.clientY};
if(J.match(/DOMMouseScroll|mousewheel/)){var H=(A.wheelDelta)?A.wheelDelta/120:-(A.detail||0)/3}var E=(A.which==3)||(A.button==2);
var L=null;if(J.match(/over|out/)){switch(J){case"mouseover":L=A.relatedTarget||A.fromElement;break;
case"mouseout":L=A.relatedTarget||A.toElement}if(!(function(){while(L&&L.nodeType==3){L=L.parentNode
}return true}).fsr$create({attempt:ForeSee.Browser.Engine.gecko})()){L=false}}}}return ForeSee.$extend(this,{event:A,type:J,page:I,client:C,rightClick:E,wheel:H,relatedTarget:L,target:G,code:B,key:M,shift:A.shiftKey,control:A.ctrlKey,alt:A.altKey,meta:A.metaKey})
}});ForeSee.Event.Keys=new ForeSee.Hash({enter:13,up:38,down:40,left:37,right:39,esc:27,space:32,backspace:8,tab:9,"delete":46});
ForeSee.Class=new ForeSee.Native({name:"Class",initialize:function(B){B=B||{};var A=function(E){for(var D in this){this[D]=ForeSee.$unlink(this[D])
}for(var F in ForeSee.Class.Mutators){if(!this[F]){continue}ForeSee.Class.Mutators[F](this,this[F]);
delete this[F]}this.constructor=A;if(E===ForeSee.$empty){return this}var C=(this.initialize)?this.initialize.apply(this,arguments):this;
if(this.options&&this.options.initialize){this.options.initialize.call(this)}return C};ForeSee.$extend(A,this);
A.constructor=ForeSee.Class;A.prototype=B;return A}});ForeSee.Class.fsr$implement({fsr$implement:function(){ForeSee.Class.Mutators.Implements(this.prototype,Array.fsr$slice(arguments));
return this}});ForeSee.Class.Mutators={Implements:function(A,B){ForeSee.$splat(B).fsr$each(function(C){ForeSee.$extend(A,(ForeSee.$type(C)=="class")?new C(ForeSee.$empty):C)
})},Extends:function(self,klass){var instance=new klass(ForeSee.$empty);delete instance.parent;delete instance.parentOf;
for(var key in instance){var current=self[key],previous=instance[key];if(current==undefined){self[key]=previous;
continue}var ctype=ForeSee.$type(current),ptype=ForeSee.$type(previous);if(ctype!=ptype){continue
}switch(ctype){case"function":if(!arguments.callee.caller){self[key]=eval("("+String(current).replace(/\bthis\.parent\(\s*(\))?/g,function(full,close){return"arguments.callee._parent_.call(this"+(close||", ")
})+")")}self[key]._parent_=previous;break;case"object":self[key]=ForeSee.$merge(previous,current)
}}self.parent=function(){return arguments.callee.caller._parent_.apply(this,arguments)};self.parentOf=function(descendant){return descendant._parent_.apply(this,Array.fsr$slice(arguments,1))
}}};ForeSee.Chain=new ForeSee.Class({chain:function(){this.$chain=(this.$chain||[]).fsr$extend(arguments);
return this},callChain:function(){return(this.$chain&&this.$chain.length)?this.$chain.shift().apply(this,arguments):false
},clearChain:function(){if(this.$chain){this.$chain.fsr$empty()}return this}});ForeSee.Events=new ForeSee.Class({fsr$addEvent:function(C,B,A){C=ForeSee.Events.removeOn(C);
if(B!=ForeSee.$empty){this.$events=this.$events||{};this.$events[C]=this.$events[C]||[];this.$events[C].fsr$include(B);
if(A){B.internal=true}}return this},fsr$addEvents:function(A){for(var B in A){this.fsr$addEvent(B,A[B])
}return this},fsr$fireEvent:function(C,B,A){C=ForeSee.Events.removeOn(C);if(!this.$events||!this.$events[C]){return this
}this.$events[C].fsr$each(function(D){D.fsr$create({bind:this,delay:A,"arguments":B})()},this);return this
},fsr$removeEvent:function(B,A){B=ForeSee.Events.removeOn(B);if(!this.$events||!this.$events[B]){return this
}if(!A.internal){this.$events[B].fsr$erase(A)}return this},fsr$removeEvents:function(C){for(var D in this.$events){if(C&&C!=D){continue
}var B=this.$events[D];for(var A=B.length;A--;A){this.fsr$removeEvent(D,B[A])}}return this}});ForeSee.Events.removeOn=function(A){return A.replace(/^on([A-Z])/,function(B,C){return C.toLowerCase()
})};ForeSee.Options=new ForeSee.Class({setOptions:function(){this.options=ForeSee.$merge.fsr$run([this.options].fsr$extend(arguments));
if(!this.fsr$addEvent){return this}for(var A in this.options){if(ForeSee.$type(this.options[A])!="function"||!(/^on[A-Z]/).test(A)){continue
}this.fsr$addEvent(A,this.options[A]);delete this.options[A]}return this}});ForeSee.Document.fsr$implement({fsr$newElement:function(A,B){if(ForeSee.Browser.Engine.trident&&B){["name","type","checked"].fsr$each(function(C){if(!B[C]){return 
}A+=" "+C+'="'+B[C]+'"';if(C!="checked"){delete B[C]}});A="<"+A+">"}return $fsr.element(this.createElement(A)).fsr$set(B)
},fsr$newTextNode:function(A){return this.createTextNode(A)},fsr$getDocument:function(){return this
},fsr$getWindow:function(){return this.defaultView||this.parentWindow},fsr$purge:function(){var C=this.getElementsByTagName("*");
for(var B=0,A=C.length;B<A;B++){ForeSee.Browser.freeMem(C[B])}}});ForeSee.Element=new ForeSee.Native({name:"Element",initialize:function(A,B){var C=ForeSee.Element.Constructors.fsr$get(A);
if(C){return C(B)}if(typeof A=="string"){return document.fsr$newElement(A,B)}return $fsr(A).fsr$set(B)
},afterImplement:function(A,B){if(!Array[A]){ForeSee.Elements.fsr$implement(A,ForeSee.Elements.fsr$multi(A))
}ForeSee.Element.Prototype[A]=B}});ForeSee.Element.Prototype={fsr$family:{name:"element"}};ForeSee.Element.Constructors=new ForeSee.Hash;
ForeSee.Elements=new ForeSee.Native({initialize:function(F,B){B=ForeSee.$extend({ddup:true,cash:true},B);
F=F||[];if(B.ddup||B.cash){var G={},E=[];for(var C=0,A=F.length;C<A;C++){var D=$fsr.element(F[C],!B.cash);
if(B.ddup){if(G[D.fsr$uid]){continue}G[D.fsr$uid]=true}E.push(D)}F=E}return(B.cash)?ForeSee.$extend(F,this):F
}});ForeSee.Elements.fsr$implement({fsr$filter:function(A,B){if(!A){return this}return new ForeSee.Elements(Array.fsr$filter(this,(typeof A=="string")?function(C){return C.match(A)
}:A,B))}});ForeSee.Elements.fsr$multi=function(A){return function(){var B=[];var F=true;for(var D=0,C=this.length;
D<C;D++){var E=this[D][A].apply(this[D],arguments);B.push(E);if(F){F=(ForeSee.$type(E)=="element")
}}return(F)?new ForeSee.Elements(B):B}};ForeSee.Window.fsr$implement({$fsr:function(B,C){if(B&&B.fsr$family&&B.fsr$uid){return B
}var A=ForeSee.$type(B);return($fsr[A])?$fsr[A](B,C,this.document):null},$$fsr:function(A){if(arguments.length==1&&typeof A=="string"){return this.document.fsr$getElements(A)
}var F=[];var C=Array.fsr$flatten(arguments);for(var D=0,B=C.length;D<B;D++){var E=C[D];switch(ForeSee.$type(E)){case"element":E=[E];
break;case"string":E=this.document.fsr$getElements(E,true);break;default:E=false}if(E){F.fsr$extend(E)
}}return new ForeSee.Elements(F)},fsr$getDocument:function(){return this.document},fsr$getWindow:function(){return this
}});$fsr.string=function(C,B,A){C=A.getElementById(C);return(C)?$fsr.element(C,B):null};$fsr.element=function(A,D){ForeSee.$uid(A);
if(!D&&!A.fsr$family&&!(/^object|embed$/i).test(A.tagName)){var B=ForeSee.Element.Prototype;for(var C in B){A[C]=B[C]
}}return A};$fsr.object=function(B,C,A){if(B.toElement){return $fsr.element(B.toElement(A),C)}return null
};$fsr.textnode=$fsr.whitespace=$fsr.window=$fsr.document=ForeSee.$arguments(0);ForeSee.Native.fsr$implement([ForeSee.Element,ForeSee.Document],{fsr$getElement:function(A,B){return $fsr(this.fsr$getElements(A,true)[0]||null,B)
},fsr$getElements:function(A,D){A=A.split(",");var C=[];var B=(A.length>1);A.fsr$each(function(E){var F=this.getElementsByTagName(E.fsr$trim());
(B)?C.fsr$extend(F):C=F},this);return new ForeSee.Elements(C,{ddup:B,cash:!D})}});ForeSee.Element.Storage={fsr$get:function(A){return(this[A]||(this[A]={}))
}};ForeSee.Element.Inserters=new ForeSee.Hash({after:function(B,A){if(!A.parentNode){return }var C=A.nextSibling;
(C)?A.parentNode.insertBefore(B,C):A.parentNode.appendChild(B)},bottom:function(B,A){A.appendChild(B)
}});ForeSee.Element.Inserters.inside=ForeSee.Element.Inserters.bottom;ForeSee.Element.fsr$implement({fsr$getDocument:function(){return this.ownerDocument
},fsr$getWindow:function(){return this.ownerDocument.fsr$getWindow()},fsr$set:function(D,B){switch(ForeSee.$type(D)){case"object":for(var C in D){this.fsr$set(C,D[C])
}break;case"string":var A=ForeSee.Element.Properties.fsr$get(D);(A&&A.fsr$set)?A.fsr$set.apply(this,Array.fsr$slice(arguments,1)):this.fsr$setProperty(D,B)
}return this},fsr$inject:function(B,A){ForeSee.Element.Inserters.fsr$get(A||"bottom")(this,$fsr(B,true));
return this},fsr$dispose:function(){return(this.parentNode)?this.parentNode.removeChild(this):this
},fsr$setProperty:function(D,E){var C=ForeSee.Element.Attributes,B=C.Props[D],A=ForeSee.$defined(E);
if(B&&C.Bools[D]){E=(E||!A)?true:false}else{if(!A){return this.removeProperty(D)}}(B)?this[B]=E:this.setAttribute(D,E);
return this},fsr$setProperties:function(A){for(var B in A){this.fsr$setProperty(B,A[B])}return this
}});ForeSee.Element.Properties=new ForeSee.Hash;ForeSee.Element.Properties.html={fsr$set:function(){return this.innerHTML=Array.fsr$flatten(arguments).join("")
}};ForeSee.Native.fsr$implement([ForeSee.Element,ForeSee.Window,ForeSee.Document],{fsr$addListener:function(B,A){if(this.addEventListener){this.addEventListener(B,A,false)
}else{this.attachEvent("on"+B,A)}return this},fsr$removeListener:function(B,A){if(this.removeEventListener){this.removeEventListener(B,A,false)
}else{this.detachEvent("on"+B,A)}return this},fsr$retrieve:function(B,A){var D=ForeSee.Element.Storage.fsr$get(this.fsr$uid);
var C=D[B];if(ForeSee.$defined(A)&&!ForeSee.$defined(C)){C=D[B]=A}return ForeSee.$pick(C)},fsr$store:function(B,A){var C=ForeSee.Element.Storage.fsr$get(this.fsr$uid);
C[B]=A;return this},fsr$eliminate:function(A){var B=ForeSee.Element.Storage.fsr$get(this.fsr$uid);
delete B[A];return this}});ForeSee.Element.Attributes=new ForeSee.Hash({Props:{html:"innerHTML","class":"className","for":"htmlFor",text:(ForeSee.Browser.Engine.trident)?"innerText":"textContent"},Bools:["compact","nowrap","ismap","declare","noshade","checked","disabled","readonly","multiple","selected","noresize","defer"],Camels:["value","accessKey","cellPadding","cellSpacing","colSpan","frameBorder","maxLength","readOnly","rowSpan","tabIndex","useMap"]});
ForeSee.Browser.freeMem=function(A){if(!A){return }if(ForeSee.Browser.Engine.trident&&(/object/i).test(A.tagName)){for(var B in A){if(typeof A[B]=="function"){A[B]=ForeSee.$empty
}}ForeSee.Element.fsr$dispose(A)}if(A.fsr$uid&&A.fsr$removeEvents){A.fsr$removeEvents()}};(function(A){var C=A.Bools,B=A.Camels;
A.Bools=C=C.fsr$associate(C);ForeSee.Hash.fsr$extend(ForeSee.Hash.fsr$combine(A.Props,C),B.fsr$associate(B.fsr$map(function(D){return D.toLowerCase()
})));A.fsr$erase("Camels")})(ForeSee.Element.Attributes);window.fsr$addListener("unload",function(){window.fsr$removeListener("unload",arguments.callee);
document.fsr$purge();if(ForeSee.Browser.Engine.trident){CollectGarbage()}});ForeSee.Element.Properties.events={fsr$set:function(A){this.fsr$addEvents(A)
}};ForeSee.Native.fsr$implement([ForeSee.Element,ForeSee.Window,ForeSee.Document],{fsr$addEvent:function(E,G){var H=this.fsr$retrieve("events",{});
H[E]=H[E]||{keys:[],values:[]};if(H[E].keys.fsr$contains(G)){return this}H[E].keys.push(G);var F=E,A=ForeSee.Element.Events.fsr$get(E),C=G,I=this;
if(A){if(A.onAdd){A.onAdd.call(this,G)}if(A.condition){C=function(J){if(A.condition.call(this,J)){return G.call(this,J)
}return false}}F=A.base||F}var D=function(){return G.call(I)};var B=ForeSee.Element.NativeEvents[F]||0;
if(B){if(B==2){D=function(J){J=new ForeSee.Event(J,I.fsr$getWindow());if(C.call(I,J)===false){J.stop()
}}}this.fsr$addListener(F,D)}H[E].values.push(D);return this},fsr$removeEvent:function(D,C){var B=this.fsr$retrieve("events");
if(!B||!B[D]){return this}var G=B[D].keys.fsr$indexOf(C);if(G==-1){return this}var A=B[D].keys.splice(G,1)[0];
var F=B[D].values.splice(G,1)[0];var E=ForeSee.Element.Events.fsr$get(D);if(E){if(E.onRemove){E.onRemove.call(this,C)
}D=E.base||D}return(ForeSee.Element.NativeEvents[D])?this.fsr$removeListener(D,F):this},fsr$addEvents:function(A){for(var B in A){if(A.hasOwnProperty(B)){this.fsr$addEvent(B,A[B])
}}return this},fsr$removeEvents:function(B){var A=this.fsr$retrieve("events");if(!A){return this}if(!B){for(var C in A){if(A.hasOwnProperty(C)){this.fsr$removeEvents(C)
}}A=null}else{if(A[B]){while(A[B].keys[0]){this.fsr$removeEvent(B,A[B].keys[0])}A[B]=null}}return this
},fsr$fireEvent:function(D,B,A){var C=this.fsr$retrieve("events");if(!C||!C[D]){return this}C[D].keys.fsr$each(function(E){E.fsr$create({bind:this,delay:A,"arguments":B})()
},this);return this}});ForeSee.Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,load:1,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};
(function(){ForeSee.$check=function(A){var B=A.relatedTarget;if(B==undefined){return true}if(B===false){return false
}return(ForeSee.$type(this)!="document"&&B!=this&&B.prefix!="xul"&&!this.fsr$hasChild(B))};ForeSee.Element.Events=new ForeSee.Hash({mouseenter:{base:"mouseover",condition:ForeSee.$check},mouseleave:{base:"mouseout",condition:ForeSee.$check},mousewheel:{base:(ForeSee.Browser.Engine.gecko)?"DOMMouseScroll":"mousewheel"}})
})();ForeSee.Element.fsr$implement({fsr$hasChild:function(A){A=$fsr(A,true);return(!!A&&ForeSee.$A(this.getElementsByTagName(A.tagName)).fsr$contains(A))
}});(function(){ForeSee.Native.fsr$implement([ForeSee.Document,ForeSee.Window],{fsr$getSize:function(){var C=this.fsr$getWindow();
if(ForeSee.Browser.Engine.presto||ForeSee.Browser.Engine.webkit){return{x:C.innerWidth,y:C.innerHeight}
}var B=A(this);return{x:B.clientWidth,y:B.clientHeight}},fsr$getScroll:function(){var C=this.fsr$getWindow();
var B=A(this);return{x:C.pageXOffset||B.scrollLeft,y:C.pageYOffset||B.scrollTop}},fsr$getScrollSize:function(){var C=A(this);
var B=this.fsr$getSize();return{x:Math.max(C.scrollWidth,B.x),y:Math.max(C.scrollHeight,B.y)}}});
function A(B){var C=B.fsr$getDocument();return(!C.compatMode||C.compatMode=="CSS1Compat")?C.getElementsByTagName("html")[0]:C.body
}})();ForeSee.Element.Events.domready={onAdd:function(A){if(ForeSee.Browser.loaded){A.call(this)}}};
(function(){var A=function(){if(ForeSee.Browser.loaded){return }ForeSee.Browser.loaded=true;window.fsr$fireEvent("domready");
document.fsr$fireEvent("domready")};switch(ForeSee.Browser.Engine.name){case"webkit":(function(){(["loaded","complete"].fsr$contains(document.readyState))?A():arguments.callee.fsr$delay(50)
})();break;case"trident":var B=document.createElement("div");(function(){(ForeSee.$try(function(){B.doScroll("left");
return $fsr(B).fsr$inject(document.body).fsr$set("html","temp").fsr$dispose()}))?A():arguments.callee.fsr$delay(50)
})();break;default:window.fsr$addEvent("load",A);document.fsr$addEvent("DOMContentLoaded",A)}})();
ForeSee.JSON=new ForeSee.Hash({encode:function(B){switch(ForeSee.$type(B)){case"string":return'"'+B.replace(/[\x00-\x1f\\"]/g,ForeSee.JSON.$replaceChars)+'"';
case"array":return"["+String(B.fsr$map(ForeSee.JSON.encode).fsr$filter(ForeSee.$defined))+"]";case"object":case"hash":var A=[];
ForeSee.Hash.fsr$each(B,function(E,D){var C=ForeSee.JSON.encode(E);if(C){A.push(ForeSee.JSON.encode(D)+":"+C)
}});return"{"+A+"}";case"number":case"boolean":return String(B);case false:return"null"}return null
},$specialChars:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},$replaceChars:function(A){return ForeSee.JSON.$specialChars[A]||"\\u00"+Math.floor(A.charCodeAt()/16).toString(16)+(A.charCodeAt()%16).toString(16)
},decode:function(string,secure){if(ForeSee.$type(string)!="string"||!string.length){return null}if(secure&&!(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,""))){return null
}return eval("("+string+")")}});ForeSee.Native.fsr$implement([ForeSee.Hash,Array,String,Number],{fsr$toJSON:function(){return ForeSee.JSON.encode(this)
}});ForeSee.Cookie=new ForeSee.Class({Implements:ForeSee.Options,options:{path:false,domain:false,duration:false,secure:false,document:document},initialize:function(B,A){this.key=B;
this.setOptions(A)},write:function(B){B=encodeURIComponent(B);if(this.options.domain){B+="; domain="+this.options.domain
}if(this.options.path){B+="; path="+this.options.path}if(this.options.duration){var A=new Date();
A.setTime(A.getTime()+this.options.duration*24*60*60*1000);B+="; expires="+A.toGMTString()}if(this.options.secure){B+="; secure"
}this.options.document.cookie=this.key+"="+B;return this},read:function(){var A=this.options.document.cookie.match("(?:^|;)\\s*"+this.key.fsr$escapeRegExp()+"=([^;]*)");
return(A)?decodeURIComponent(A[1]):null},dispose:function(){new ForeSee.Cookie(this.key,ForeSee.$merge(this.options,{duration:-1})).write("");
return this}});ForeSee.Cookie.write=function(B,C,A){return new ForeSee.Cookie(B,A).write(C)};ForeSee.Cookie.read=function(A){return new ForeSee.Cookie(A).read()
};ForeSee.Cookie.dispose=function(B,A){return new ForeSee.Cookie(B,A).dispose()};ForeSee.Hash.Cookie=new ForeSee.Class({Extends:ForeSee.Cookie,options:{autoSave:true},initialize:function(B,A){this.parent(B,A);
this.load()},save:function(){var A=ForeSee.JSON.encode(this.hash);if(!A||A.length>4096){return false
}if(A=="{}"){this.dispose()}else{this.write(A)}return true},load:function(){this.hash=new ForeSee.Hash(ForeSee.JSON.decode(this.read(),true));
return this}});ForeSee.Hash.Cookie.fsr$implement({fsr$get:function(A){return this.hash.fsr$get(A)
},fsr$set:function(A,B){this.hash.fsr$set(A,B);this.save();return this},fsr$erase:function(A){this.hash.fsr$erase(A);
this.save();return this},fsr$empty:function(){this.hash.fsr$empty();this.save();return this}});ForeSee.Asset=new ForeSee.Hash({javascript:function(F,D){D=ForeSee.$extend({onload:ForeSee.$empty,document:document,check:ForeSee.$lambda(true)},D);
var B=new ForeSee.Element("script",{src:F,type:"text/javascript"});var E=D.onload.fsr$bind(B),A=D.check,G=D.document;
delete D.onload;delete D.check;delete D.document;B.fsr$addEvents({load:E,readystatechange:function(){if(ForeSee.Browser.Engine.trident&&["loaded","complete"].fsr$contains(this.readyState)){E()
}}}).fsr$setProperties(D);if(ForeSee.Browser.Engine.webkit419){var C=(function(){if(!ForeSee.$try(A)){return 
}ForeSee.$clear(C);E()}).fsr$periodical(50)}return B.fsr$inject(document.getElementsByTagName("head")[0])
},image:function(C,B){B=ForeSee.$merge({onload:ForeSee.$empty,onabort:ForeSee.$empty,onerror:ForeSee.$empty},B);
var D=new Image();var A=$fsr(D)||new ForeSee.Element("img");["load","abort","error"].fsr$each(function(E){var F="on"+E;
var G=B[F];delete B[F];D[F]=function(){if(!D){return }if(!A.parentNode){A.width=D.width;A.height=D.height
}D=D.onload=D.onabort=D.onerror=null;G.fsr$delay(1,A,A);A.fsr$fireEvent(E,A,1)}});D.src=C;if(A.src!=D.src){A.src=D.src
}if(D&&D.complete){D.onload.fsr$delay(1)}return A.fsr$setProperties(B)},css:function(B,A){return new ForeSee.Element("link",ForeSee.$merge({rel:"stylesheet",media:"screen",type:"text/css",href:B},A)).fsr$inject(document.getElementsByTagName("head")[0])
}});ForeSee.Request=new ForeSee.Class({Implements:[ForeSee.Chain,ForeSee.Events,ForeSee.Options],options:{url:"",data:"",headers:{"X-ForeSee.Requested-With":"XMLHttpForeSee.Request",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:true,format:false,method:"post",link:"ignore",isSuccess:null,emulation:true,urlEncoded:true,encoding:"utf-8",evalScripts:false,evalResponse:false},initialize:function(A){this.xhr=new ForeSee.Browser.Request();
this.setOptions(A);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers=new ForeSee.Hash(this.options.headers)
},onStateChange:function(){if(this.xhr.readyState!=4||!this.running){return }this.running=false;this.status=0;
ForeSee.$try(function(){this.status=this.xhr.status}.fsr$bind(this));if(this.options.isSuccess.call(this,this.status)){this.response={text:this.xhr.responseText,xml:this.xhr.responseXML};
this.success(this.response.text,this.response.xml)}else{this.response={text:null,xml:null};this.failure()
}this.xhr.onreadystatechange=ForeSee.$empty},isSuccess:function(){return((this.status>=200)&&(this.status<300))
},processScripts:function(A){if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader("Content-type"))){return ForeSee.$exec(A)
}return A.fsr$stripScripts(this.options.evalScripts)},success:function(B,A){this.onSuccess(this.processScripts(B),A)
},onSuccess:function(){this.fsr$fireEvent("complete",arguments).fsr$fireEvent("success",arguments).callChain()
},failure:function(){this.onFailure()},onFailure:function(){this.fsr$fireEvent("complete").fsr$fireEvent("failure",this.xhr)
},setHeader:function(A,B){this.headers.fsr$set(A,B);return this},getHeader:function(A){return ForeSee.$try(function(){return this.xhr.getResponseHeader(A)
}.fsr$bind(this))},check:function(A){if(!this.running){return true}switch(this.options.link){case"cancel":this.cancel();
return true;case"chain":this.chain(A.fsr$bind(this,Array.fsr$slice(arguments,1)));return false}return false
},send:function(C){if(!this.check(arguments.callee,C)){return this}this.running=true;var D=ForeSee.$type(C);
if(D=="string"||D=="element"){C={data:C}}var A=this.options;C=ForeSee.$extend({data:A.data,url:A.url,method:A.method},C);
var E=C.data,B=C.url,F=C.method;switch(ForeSee.$type(E)){case"element":E=$fsr(E).fsr$toQueryString();
break;case"object":case"hash":E=ForeSee.Hash.fsr$toQueryString(E)}if(E&&F=="get"){B=B+(B.fsr$contains("?")?"&":"?")+E;
E=null}this.xhr.open(F.toUpperCase(),B,this.options.async);this.xhr.onreadystatechange=this.onStateChange.fsr$bind(this);
this.headers.fsr$each(function(H,G){if(!ForeSee.$try(function(){this.xhr.setRequestHeader(G,H);return true
}.fsr$bind(this))){this.fsr$fireEvent("exception",[G,H])}},this);this.fsr$fireEvent("request");this.xhr.send(E);
if(!this.options.async){this.onStateChange()}return this},cancel:function(){if(!this.running){return this
}this.running=false;this.xhr.abort();this.xhr.onreadystatechange=ForeSee.$empty;this.xhr=new ForeSee.Browser.Request();
this.fsr$fireEvent("cancel");return this}});(function(){var A={};["get","post","put","delete","GET","POST","PUT","DELETE"].fsr$each(function(B){A[B]=function(){var C=Array.fsr$link(arguments,{url:String.type,data:ForeSee.$defined});
return this.send(ForeSee.$extend(C,{method:B.toLowerCase()}))}});ForeSee.Request.fsr$implement(A)
})();ForeSee.Browser.fsr$set("Popup",new ForeSee.Class({Implements:[ForeSee.Options,ForeSee.Events],options:{width:500,height:300,x:50,y:50,toolbar:0,location:0,directories:0,status:0,scrollbars:"auto",resizable:1,name:"popup",blur:false,menubar:1},initialize:function(B,A){this.url=B||false;
this.setOptions(A);if(this.url){this.openWin()}},openWin:function(B){B=B||this.url;var A="toolbar="+this.options.toolbar+",location="+this.options.location+",directories="+this.options.directories+",status="+this.options.status+",scrollbars="+this.options.scrollbars+",resizable="+this.options.resizable+",width="+this.options.width+",height="+this.options.height+",top="+this.options.y+",left="+this.options.x+",menubar="+this.options.menubar;
this.window=window.open(B,this.options.name,A);if(!this.window){this.window=window.open("",this.options.name,A);
this.window.location.href=B}if(!this.options.blur){this.focus.fsr$delay(100,this)}else{this.window.blur()
}return this},focus:function(){if(this.window){this.window.focus()}else{if(this.focusTries<10){this.focus.delay(100,this)
}else{this.blocked=true;this.fsr$fireEvent("onBlock")}}return this},focusTries:0,blocked:null,close:function(){this.window.close();
return this}}));ForeSee.RemoteEvent=new ForeSee.Class({Implements:[ForeSee.Chain,ForeSee.Events,ForeSee.Options],options:{host:"",path:"",url:""},initialize:function(B,A){this.setOptions(A);
this.event=B},onStateChange:function(A){if(!this.running){return }this.running=false;this.status=0;
ForeSee.$try(function(){this.status=A}.fsr$bind(this));if(this.isSuccess()){this.success()}else{this.failure()
}},isSuccess:function(){return(this.status==1)},success:function(){this.onSuccess()},onSuccess:function(){this.fsr$fireEvent("success")
},failure:function(){this.onFailure()},onFailure:function(){this.fsr$fireEvent("failure")},send:function(B){this.running=true;
var A=this;var D=ForeSee.Hash.fsr$toQueryString(B);var C=document.location.protocol+"//"+this.options.host+this.options.path+this.options.url+"?event="+this.event+"&"+D+"&uid="+ForeSee.$time();
new ForeSee.Asset.image(C,{onload:function(E){A.onStateChange(1)},onerror:function(){A.onStateChange(0)
},onabort:function(){A.onStateChange(0)}});return this}});ForeSee.RemoteCookie=new ForeSee.Class({Implements:ForeSee.Options,options:{host:false,path:false,url:false,duration:false},initialize:function(B,A){this.id=B;
this.setOptions(A)},save:function(A,B){if(A&&B){new ForeSee.RemoteEvent("setcookie",this.options).send({id:this.id,name:A,value:B})
}else{if(!B){new ForeSee.RemoteEvent("deletecookie",this.options).send({id:this.id,name:A})}else{if(!A&&!B){new ForeSee.RemoteEvent("deletecookie",this.options).send({id:this.id})
}}}return true},load:function(A){return this}});ForeSee.RemoteCookie.fsr$implement({fsr$get:function(A){this.load(A)
},fsr$set:function(A,B){this.save(A,B);return this},fsr$erase:function(A){this.save(A);return this
},fsr$empty:function(){this.save();return this}});ForeSee.CPPS=new ForeSee.Hash({fsr$set:function(B,C){var A=ForeSee.c().fsr$get("cpps")||{};
A[B]=C;ForeSee.c().fsr$set("cpps",A)},fsr$get:function(B){var A=ForeSee.c().fsr$get("cpps")||{};return A[B]
},fsr$erase:function(B){var A=ForeSee.c().fsr$get("cpps")||{};delete A[B];ForeSee.c().fsr$set("cpps",A)
},fsr$toQueryString:function(){var G=ForeSee.c();var D=G.fsr$get("browser");var F={browser:D.name+" "+D.version,os:D.platform,pv:G.fsr$get("pv"),url:G.fsr$get("current"),locale:G.fsr$get("locale")||"",site:G.fsr$get("site")||"",referrer:G.fsr$get("referrer")||"",terms:G.fsr$get("terms")||""};
var C=G.fsr$get("cpps")||{};var E=new ForeSee.Hash(C);var B=F||{};for(k in B){E.fsr$set(k,B[k])}var A=E.fsr$toQueryString("cpp");
return A}});ForeSee.Service=new ForeSee.Class({Implements:[ForeSee.Chain,ForeSee.Events,ForeSee.Options],options:{},initialize:function(A){this.setOptions(A)
},onStateChange:function(A){if(!this.running){return }this.running=false;this.status=0;ForeSee.$try(function(){this.status=A
}.fsr$bind(this));if(this.isSuccess()){this.success()}else{this.failure()}},isSuccess:function(){return(this.status==1)
},success:function(){this.onSuccess()},onSuccess:function(){this.fsr$fireEvent("complete").fsr$fireEvent("success")
},failure:function(){this.onFailure()},onFailure:function(){this.fsr$fireEvent("complete").fsr$fireEvent("failure")
},ping:function(){this.running=true;var B=this;var D=this.options.params||{};D.protocol=document.location.protocol;
D.uid=ForeSee.$time();var A=ForeSee.Hash.fsr$toQueryString(D);var C=document.location.protocol+"//"+this.options.host+this.options.path+this.options.url+"?"+A;
new ForeSee.Asset.image(C,{onload:function(E){if(E.width==B.options.success){B.onStateChange(1)}else{B.onStateChange(0)
}},onerror:function(){B.onStateChange(0)},onabort:function(){B.onStateChange(0)}});return this},cancel:function(){if(!this.running){return this
}this.running=false;this.fsr$fireEvent("cancel");return this}});ForeSee.services={survey:{host:"www.foreseeresults.com",path:"/survey",url:"/display"},check:{host:"controller.foreseeresults.com",path:"/fsrSurvey",url:"/OTCImg",success:3},event:{host:"event.foreseeresults.com",path:"/fsrsurvey",url:"/processEvent",enabled:false},domain:{host:"www.foreseeresults.com",path:"/survey",url:"/FSRImg",success:3}};
ForeSee.UnsupportedBrowsers={Explorer:5.5,Safari:2,Firefox:1.4};ForeSee.$P=function(){return ForeSee.properties
};ForeSee.c=function(){return new ForeSee.Hash.Cookie("foresee."+ForeSee.site.cookie,{path:"/",domain:ForeSee.site.domain||false})
};ForeSee.log=function(B,A){if(!ForeSee.services.event.enabled){return }new ForeSee.RemoteEvent("logit",{host:ForeSee.services.event.host,path:ForeSee.services.event.path,url:ForeSee.services.event.url}).send({id:"foresee."+ForeSee.site.cookie,msg:B,param:A})
};ForeSee.popNow=function(A){ForeSee.pop(A,"now")};ForeSee.popLater=function(A){ForeSee.pop(A,"later")
};ForeSee.popImmediate=function(){ForeSee.pop(100,"now")};ForeSee.pop=function(D,A){var C=D;if(!C){C=ForeSee.controller.sd.sp
}var B=A;if(!B){B=ForeSee.controller.sd.pop.when}var E=ForeSee.controller.sd.sv;if(!(E<=C)){return 
}if(B=="now"){if(!(ForeSee.controller.surveyShown()&&C<100)){ForeSee.controller.popImmediate()}}else{if(B=="later"){if(!ForeSee.controller.trackerRunning()){ForeSee.controller.popTracker()
}}}};ForeSee.close=function(){ForeSee.controller.cancelTracker()};ForeSee.SurveyController=new ForeSee.Class({Implements:ForeSee.Options,options:{},initialize:function(A){this.setOptions(A);
ForeSee.controller=this},load:function(){if(!ForeSee.enabled){return }var A=this;new ForeSee.Asset.javascript(ForeSee.files+"foresee-surveydef.js",{id:"foresee-surveydef",onload:function(){fsr$dbug.log("Survey Definitions Loaded.");
A.run()}})},run:function(){if(!this.init()){return }var A;this.sd=this.pd;this.sdi=this.pdi;A=this.process();
if(A){return }this.sd=this.cd;this.sdi=this.cdi;A=this.process()},process:function(){if(!this.sd){return false
}if(this.sd.type=="current"){ForeSee.c().fsr$set("sd",{name:this.sd.name,idx:this.sd.idx})}if(this.processTracker()){var A=this;
(function(){A.launch("tracker")}).fsr$delay(1);return true}if(this.processInvite()){var A=this;(function(){A.launch("invite")
}).fsr$delay(1);return true}if(this.sd.type=="current"){this.setupPop();this.setupCancel()}return false
},processTracker:function(){if(!this.shouldTrack()){return false}if(!this.trackerRunning()){return false
}return true},shouldTrack:function(){if(!this.sd.ls){return false}if(this.sd.type=="previous"){if(!(this.sd.pop.when=="later")||!(this.sd.pop.after=="leaving-section")){return false
}}else{if(this.sd.type=="current"){if(!(this.sd.pop.when=="now")){return false}}}return true},trackerRunning:function(){if(ForeSee.$defined(ForeSee.c().fsr$get("tracker"))){return true
}return false},processInvite:function(){if(this.inviteShown()){return false}if(!this.shouldInvite()){return false
}return true},shouldInvite:function(){if(this.sd.exclude){var C=false;if(!C){C=this.checkExclude(this.sd.exclude.local||[],document.location.href)
}if(!C){C=this.checkExclude(this.sd.exclude.referer||[],document.location.referer)}if(C){var D=ForeSee.c();
var B=D.fsr$get("ec");this.sd.ec=B[this.sd.name]=B[this.sd.name]+1;D.fsr$set("ec",B);return false
}}var A=(this.sd.type=="previous")?"onexit":"onentry";if(this.sd.invite.when!=A){return false}if(!this.sd.ls){return false
}if(!(this.sd.sv<=this.sd.criteria.sp)){return false}return true},inviteShown:function(){if(ForeSee.$defined(ForeSee.c().fsr$get("invite"))){return true
}return false},inviteAccepted:function(){if(ForeSee.c().fsr$get("invite")==1){return true}return false
},surveyShown:function(){if(ForeSee.$defined(ForeSee.c().fsr$get("survey"))){return true}return false
},launch:function(A){if(A=="invite"){this.attemptInvite()}else{if(A=="tracker"){this.popImmediate()
}}},checkExclude:function(C,B){for(var A=0,D=C.length;A<D;A++){if(B.match(C[A])){return true}}return false
},attemptInvite:function(){var A=this;var B="invite";if(ForeSee.$P().mode=="hybrid"){B="checkDomain"
}new ForeSee.Service({host:ForeSee.services.check.host,path:ForeSee.services.check.path,url:ForeSee.services.check.url,success:ForeSee.services.check.success,onSuccess:function(){A[B]()
},onFailure:function(){}}).ping()},checkDomain:function(){var A=this;var B="invite";new ForeSee.Service({host:ForeSee.services.domain.host,path:ForeSee.services.domain.path,url:ForeSee.services.domain.url,params:{"do":0},success:ForeSee.services.check.success,onSuccess:function(){A[B]()
},onFailure:function(){}}).ping()},setupPop:function(){if(!this.sd.links){return }if(this.inviteAccepted()&&!this.surveyShown()){this.link(this.sd.links.pop||[],this.popLink)
}},setupCancel:function(){if(!this.sd.links){return }if(this.inviteAccepted()&&!this.surveyShown()){this.link(this.sd.links.cancel||[],this.cancelTracker)
}},link:function(C,B){var A=this;var E=C;var D=0;$$fsr("a").fsr$each(function(H){for(var G=0,F=E.length;
G<F;G++){if(H.href.match(E)){D++;H.fsr$addEvents({click:function(){B.call(A)}});break}}});fsr$dbug.log("linked: "+D)
},init:function(){fsr$dbug.log("==============");var X=ForeSee.c();var B=X.fsr$get("alive")||0;B=B+1;
X.fsr$set("alive",B);this.ralive=true;X=ForeSee.c();B=X.fsr$get("alive");if(!B){fsr$dbug.log("Exit...cookies are not enabled.");
return false}fsr$dbug.log("alive: "+B);if(!this.trackerRunning()){clearInterval(ForeSee.timer)}var Y=ForeSee.Browser;
X.fsr$set("browser",{name:ForeSee.Browser.Type.name,version:ForeSee.Browser.Type.version,platform:ForeSee.Browser.Platform.os});
fsr$dbug.log("browser: "+Y.Type.name+" "+Y.Type.version+" on "+Y.Platform.os);if(ForeSee.UnsupportedBrowsers[Y.Type.name]){if(Y.Type.version<=ForeSee.UnsupportedBrowsers[Y.Type.name]){fsr$dbug.log("Browser not surpported.");
return false}}if(this.validateIP()==0){fsr$dbug.log("Invalid IP Address.");return false}var H;if(ForeSee.$defined(X.fsr$get("finish"))){var W=X.fsr$get("timeout");
var C=((ForeSee.$time()-X.fsr$get("finish"))/1000);fsr$dbug.log("ptimeout: "+W);fsr$dbug.log("loadtime: "+C);
H=(0.9*W)+(0.1*(C*2));if(H<2){H=2}else{if(H>5){H=5}}}else{H=ForeSee.$P().tracker.timeout}X.fsr$set("timeout",H);
fsr$dbug.log("timeout: "+H);var M=X.fsr$get("pv")?X.fsr$get("pv")+1:1;X.fsr$set("pv",M);fsr$dbug.log("pv: "+M);
if(!X.fsr$get("start")){var O;if(O=ForeSee.Cookie.read("foresee.repeatdays",{path:"/",domain:ForeSee.site.domain||false})){fsr$dbug.log("Persistent Cookie Found: "+O);
return false}X.fsr$set("start",ForeSee.$time());var K=this;this.dhtml_win=1;new ForeSee.Asset.javascript(ForeSee.files+"foresee-dhtml-popup.js",{id:"foresee-dhtml-popup",onload:function(){fsr$dbug.log("DHTML popup script loaded (1).");
K.dhtml_win=2}});this.dhtml_css=1;new ForeSee.Asset.css(ForeSee.files+this.css());this.dhtml_css=2;
this.generateid();if(document.referrer&&document.referrer!=""){var D=document.referrer.match(/^(\w+\:\/\/)?(((\w+\.?))+)\//)[2];
X.fsr$set("referrer",D);fsr$dbug.log("referrer: "+D);var F=this.decodeReferrer(document.referrer);
X.fsr$set("terms",F);fsr$dbug.log("search terms: "+F)}}fsr$dbug.log("invite: "+(ForeSee.$pick(X.fsr$get("invite"),"")));
fsr$dbug.log("tracker: "+(ForeSee.$pick(X.fsr$get("tracker")||"")));ForeSee.sv=ForeSee.$random(1,100);
this.sp=new ForeSee.Hash.Cookie("foresee.sp",{path:"/",domain:ForeSee.site.domain||false});var E,G,J,P,U,T;
P=X.fsr$get("current");T=X.fsr$get("cdi");E=document.location.href;X.fsr$set("current",E);this.language();
if(ForeSee.locale){fsr$dbug.log("language: "+ForeSee.locale||"")}this.subsite();if(ForeSee.subsite){fsr$dbug.log("site: "+ForeSee.subsite||"")
}G=this.match(E);if(G.length!=0){fsr$dbug.log("===CURRENT====");var Q=X.fsr$get("lc")||{};var V=X.fsr$get("ec")||{};
for(var S=0,R=G.length;S<R;S++){var A=ForeSee.surveydefs[G[S]];A.idx=G[S];this.criteria(A.criteria);
A.lc=Q[A.name]=Q[A.name]?Q[A.name]+1:1;A.ec=V[A.name]=V[A.name]?V[A.name]:0;A.type="current";this.configLoyalty(A);
var N=this.loyaltyDef(A);var I=this.checkLoyalty(N,A.lc,A.ec);if(I>-1){A.ls=true;if(ForeSee.$type(A.criteria.lf)=="array"){A.criteria.lf=A.criteria.lf[I];
A.criteria.sp=A.criteria.sp[I];A.pop.when=A.pop.when[I]}if(A.pin){var L=X.fsr$get("p")||{};L[A.name]=1;
X.fsr$set("p",L)}}else{A.ls=false;if(ForeSee.$type(A.criteria.lf)=="array"){A.criteria.lf=A.criteria.lf[0];
A.criteria.sp=A.criteria.sp[0];A.pop.when=A.pop.when[0]}}this.configure(A);J=A.idx;X.fsr$set("cdi",A.idx);
this.cd=A;break}X.fsr$set("lc",Q);X.fsr$set("ec",V)}if(T&&(T!=J)){fsr$dbug.log("===PREVIOUS===");
var A=ForeSee.surveydefs[T];A.idx=T;this.criteria(A);A.lc=X.fsr$get("lc")[A.name];A.type="previous";
this.configLoyalty(A);A.ls=true;this.configure(A);this.pd=A}fsr$dbug.log("==============");if(!this.cd&&!this.pd){return false
}return true},configLoyalty:function(A){if(ForeSee.$type(A.criteria.lf)=="number"){A.criteria.lf={v:A.criteria.lf,o:">="}
}},loyaltyDef:function(B){var A=B.criteria.lf;if(ForeSee.$type(B.criteria.lf)=="object"){A=[B.criteria.lf]
}return A},checkLoyalty:function(E,F,C){var B=-1;for(var D=0,A=E.length;D<A;D++){if(E[D].o==">="){if(F>=E[D].v){B=D
}}else{if(E[D].o=="="){if((F-C)==E[D].v){B=D}}else{if(E[D].o==">"){if(F>E[D].v){B=1}}}}}return B},validateIP:function(D){var A=1;
var C=ForeSee.$P().ipexclude;if(!C){return A}var D;if(C.src=="cookie"){if(C.type&&C.type=="client"){D=ForeSee.Cookie.read(C.name,{path:"/",domain:ForeSee.site.domain||false})
}else{D=ForeSee.c().fsr$get("ip")}}else{if(C.src=="variable"){if(C.type&&C.type=="client"){D=window[C.name]
}else{D=ForeSee[C.name]}}}D=D||"";for(var B=0;B<C.ips.length;B++){if(D.match(C.ips[B])){A=0;break
}}return A},configure:function(C){var E=ForeSee.c();fsr$dbug.log("sid: "+C.name);fsr$dbug.log("lc: "+C.lc);
fsr$dbug.log("lf: "+C.criteria.lf.v+" ("+C.criteria.lf.o+") ");C.sv=ForeSee.sv;fsr$dbug.log("sv: "+C.sv);
if(ForeSee.$type(C.criteria.sp)=="array"){C.criteria.sp=C.criteria.sp[(new Date()).getDay()]}var A=(!ForeSee.locale)?C.name:C.name+"-"+ForeSee.locale;
C.criteria.sp=this.sp.fsr$get(A)||this.sp.fsr$get(C.name)||C.criteria.sp;fsr$dbug.log("sp: "+C.criteria.sp);
if(C.invite){C.invite=ForeSee.$merge(ForeSee.$P().invite,C.invite)}C.tracker=ForeSee.$merge(ForeSee.$P().tracker,C.tracker);
C.survey=ForeSee.$merge(ForeSee.$P().survey,C.survey);C.qualifier=ForeSee.$merge(ForeSee.$P().qualifier,C.qualifier);
C.pop=ForeSee.$merge(ForeSee.$P().pop,C.pop);C.repeatdays=ForeSee.$pick(ForeSee.$P().repeatdays,C.repeatdays);
var B=[].fsr$extend(ForeSee.$P().exclude.local);if(C.exclude&&C.exclude.local){C.exclude.local=B.fsr$extend(C.exclude.local)
}else{if(C.exclude){C.exclude.local=B}else{C.exclude={local:B}}}var D=[].fsr$extend(ForeSee.$P().exclude.referer);
if(C.exclude&&C.exclude.referer){C.exclude.referer=D.fsr$extend(C.exclude.referer)}else{if(C.exclude){C.exclude.referer=D
}else{C.exclude={referer:D}}}},unload:function(){if(!ForeSee.enabled){return }if(!this.runload&&this.ralive){this.runload=true;
this.uninit()}return },uninit:function(){var B=ForeSee.c();var A=B.fsr$get("alive")||0;B.fsr$set("alive",(A-1)>0?A-1:0);
B.fsr$set("previous",B.fsr$get("current"));B.fsr$set("finish",ForeSee.$time())},match:function(A){if(!A){return 
}var E=[];var K=ForeSee.surveydefs;var B=ForeSee.c().fsr$get("p")||{};for(var J=0,C,F=K.length,G=0;
J<F;J++){var I=G;C=K[J].include.urls||[];for(var H=0,D=C.length;H<D;H++){if(A.match(C[H])){E[G++]=J;
break}}if(G!=I){break}C=K[J].include.cookies||[];for(var H=0,D=C.length;H<D;H++){var L;if(L=ForeSee.Cookie.read(C[H].name,{path:C[H].path||false,domain:C[H].domain||false})){if(L.match(C[H].value||".")){E[G++]=J;
break}}}if(G!=I){break}C=K[J].include.variables||[];for(var H=0,D=C.length;H<D;H++){var L;if(L=window[C[H].name]){if(L.match(C[H].value)){E[G++]=J;
break}}}if(G!=I){break}if(B[K[J].name]){E[G++]=J}if(G!=I){break}}return E},invite:function(){if(ForeSee.locale){ForeSee.c().fsr$set("locale",ForeSee.locale)
}var A=this;if(this.sd.invite){(function(){ForeSee.log("Invite Shown",ForeSee.c().fsr$get("current"));
A.prepareInvite()}).fsr$delay((this.sd.invite.delay||0)*1000)}else{(function(){A.accepted();A.close()
}).fsr$delay(0)}},prepareInvite:function(){var A=this;if(!ForeSee.$defined(this.dhtml_css)){this.dhtml_css=1;
new ForeSee.Asset.css(ForeSee.files+this.css());this.dhtml_css=2}if(!ForeSee.$defined(this.dhtml_win)){this.dhtml_win=1;
new ForeSee.Asset.javascript(ForeSee.files+"foresee-dhtml-popup.js",{id:"foresee-dhtml-popup",onload:function(){fsr$dbug.log("DHTML popup script loaded (2).");
A.dhtml_win=2;A.showInvite()}})}else{if(this.dhtml_win==1){var B=(function(){if(A.dhtml_win==1){return 
}ForeSee.$clear(B);A.showInvite()}).fsr$periodical(50)}else{if(this.dhtml_win==2){(function(){A.showInvite()
}).fsr$delay(1)}}}},showInvite:function(){var B=this;var A=this.sd.invite;this.page(A);var C={position:{x:A.x,y:A.y},wrapWithUi:true,uiOptions:{width:A.width+"px",baseHref:ForeSee.files,buttons:[{properties:{id:"accept"},text:A.accept,onClick:function(){B.accepted()
}},{properties:{id:"decline"},text:A.decline,onClick:function(){B.declined()}}]},modalOptions:{modalStyle:{"background-color":A.bgcolor,opacity:A.opacity},hideOnClick:A.hideOnClick}};
ForeSee.invite=0;var D;if(A.content){C.content=A.content;D=new ForeSee.StickyWinModal(C)}else{C.url=ForeSee.files+A.url;
D=new ForeSee.StickyWinModal.Ajax(C)}D.fsr$addEvent("onClose",function(){B.close()});if(A.content){D.show()
}else{D.update()}},accepted:function(){ForeSee.invite=1;ForeSee.log("Invite Accepted");ForeSee.c().fsr$set("invite",ForeSee.invite);
if(ForeSee.$P().mode=="hybrid"){new ForeSee.Service({host:ForeSee.services.domain.host,path:ForeSee.services.domain.path,url:ForeSee.services.domain.url,params:{"do":1,rw:this.sd.repeatdays*24*60}}).ping()
}var A=this;A.popAccept()},declined:function(){ForeSee.invite=-1;ForeSee.log("Invite Declined");ForeSee.c().fsr$set("invite",ForeSee.invite)
},close:function(){ForeSee.c().fsr$set("invite",ForeSee.invite);if(this.sd.repeatdays){ForeSee.Cookie.write("foresee.repeatdays",this.sd.repeatdays,{path:"/",domain:ForeSee.site.domain||false,duration:this.sd.repeatdays})
}},popAccept:function(){if(this.sd.pop.when=="later"){if(this.sd.pop.tracker){this.popTracker()}this.setupPop();
this.setupCancel()}else{if(this.sd.pop.when=="now"){ForeSee.c().fsr$set("survey",1);if(!this.sd.pop.what!="qualifier"){this.popSurvey()
}else{this.popQualifier()}}else{if(this.sd.pop.when=="both"){this.popTracker();this.popSurvey()}}}},popImmediate:function(){var A=ForeSee.c();
if(this.trackerRunning()){A.fsr$set("force",1)}else{ForeSee.c().fsr$set("survey",1);if(!this.sd.pop.what!="qualifier"){this.popSurvey()
}else{this.popQualifier()}}},popSurvey:function(){var E=ForeSee.services.survey;var F=this.sd.survey;
var I=this.sd.pop;var B=(window.screen.width-F.width)/2;var H=(window.screen.height-F.height)/2;var J=document.location.protocol;
var K=E.host;var L=E.path;var G=ForeSee.c();var C=new ForeSee.Hash({sid:this.sid(),cid:ForeSee.id,version:ForeSee.version}).fsr$toQueryString();
var D=ForeSee.CPPS.fsr$toQueryString();var A=J+"//"+K+L+E.url+"?"+C+"&"+D;if(F.loading){this.page(ForeSee.$P().loading);
A=ForeSee.files+ForeSee.$P().loading.url+"?url="+A}this.pop("fsrSurvey",A,B,H,F.width,F.height,I.pu);
ForeSee.log("Survey Shown",ForeSee.c().fsr$get("current"))},popTracker:function(){var C=this.sd.tracker;
var A=this.sd.pop;this.page(C);var E=(window.screen.width-C.width)/2;var D=(window.screen.height-C.height)/2;
var B=ForeSee.files+C.url+"?siteid="+ForeSee.siteid+"&files="+ForeSee.files;ForeSee.timer=setInterval(fsr$setAlive,1000);
this.pop("fsrTracker",B,E,D,C.width,C.height,true);ForeSee.log("Tracker Shown",ForeSee.c().fsr$get("current"))
},popQualifier:function(){var F=ForeSee.services.survey;var G=this.sd.qualifier;var J=this.sd.pop;
this.page(G);var C=(window.screen.width-G.width)/2;var I=(window.screen.height-G.height)/2;var K=document.location.protocol;
var L=G.location=="local"?document.location.host:F.host;var M=G.location=="local"?"":F.path;var B=ForeSee.files+G.url;
var H=ForeSee.c();var D=new ForeSee.Hash({version:ForeSee.version}).fsr$toQueryString();var E=ForeSee.CPPS.fsr$toQueryString();
var A=K+"//"+L+M+B+"?"+D+"&"+E;this.pop("fsrQualifier",A,C,I,G.width,G.height,J.pu);ForeSee.log("Qualifier Shown",ForeSee.c().fsr$get("current"))
},popLink:function(){if(!this.surveyShown()){this.popImmediate()}},cancelTracker:function(){if(this.trackerRunning()){var A=window.open("","fsrTracker");
if(A){A.close()}}},sid:function(){var D=ForeSee.c();var B=this.sd.name;var C=this.sd.pop.now;if(C){B=B+"-"+C
}var A=D.fsr$get("locale");if(A){B=B+"-"+A}return B},pop:function(D,C,H,G,F,A,E,B){(function(){new ForeSee.Browser.Popup(C,{name:D,toolbar:0,location:0,directories:0,status:0,scrollbars:1,resizable:1,width:F,height:A,x:H,y:G,blur:E,menubar:0})
}).fsr$delay(B||0)},language:function(){var F=ForeSee.$P().language;if(!F){return }var B=F.locale;
var E;if(F.src=="location"){E=document.location.href}else{if(F.src=="cookie"){if(F.type&&F.type=="client"){E=ForeSee.Cookie.read(F.name,{path:"/",domain:ForeSee.site.domain||false})
}else{E=ForeSee.c().fsr$get("lang")}}else{if(F.src=="variable"){if(F.type&&F.type=="client"){E=window[F.name]
}else{E=ForeSee[F.name]}}}}E=E||"";var C=F.locales||[];for(var D=0,A=C.length;D<A;D++){if(E.match(C[D].match)){B=C[D].locale;
break}}ForeSee.locale=B},page:function(E){var B=ForeSee.c().fsr$get("locale");if(!B){return }var D=E.locales||[];
for(var C=0,A=D.length;C<A;C++){if(D[C].locale==B){if(D[C].url){E.url=D[C].url}if(D[C].content){E.content=D[C].content
}if(D[C].accept){E.accept=D[C].accept}if(D[C].decline){E.decline=D[C].decline}if(D[C].width){E.width=D[C].width
}if(D[C].height){E.height=D[C].height}break}}},criteria:function(E){var B=ForeSee.locale;if(!B){return 
}var D=E.locales||[];for(var C=0,A=D.length;C<A;C++){if(D[C].locale==B){E.sp=D[C].sp;E.lf=D[C].lf;
break}}},subsite:function(){var D=ForeSee.$P().subsites;if(!D){return }var F=ForeSee.c();var C=document.location.href;
var A=-1;for(var B=0,E=D.length;B<E;B++){if(C.match(D[B])){A=B;ForeSee.subsite=D[B];F.fsr$set("site",D[B]);
break}}if(A==-1){ForeSee.subsite="other";F.fsr$set("site","other")}},generateid:function(){if(!ForeSee.services.event.enabled){return 
}new ForeSee.RemoteEvent("getsessionid",{host:ForeSee.services.event.host,path:ForeSee.services.event.path,url:ForeSee.services.event.url}).send({id:"foresee."+ForeSee.site.cookie})
},css:function(){var A=ForeSee.Browser;var B="foresee-invite-flat.css";if(A.Type.name=="Explorer"&&A.Type.version<7){B="foresee-invite-flat.css"
}return B},decodeReferrer:function(A){A=decodeURIComponent(A);var C=null;var B=document.referrer.match(/[?&]q=([^&]*)/)||document.referrer.match(/[?&]p=([^&]*)/)||document.referrer.match(/[?&]query=([^&]*)/);
if(!B){return }var C=unescape(B[1]);if(C){C=C.replace(/\+/g," ")}return C}});new ForeSee.SurveyController({});
window.fsr$addEvent("domready",function(){(function(){ForeSee.controller.load()}).fsr$delay(1)});
window.fsr$addEvent("unload",function(){ForeSee.controller.unload()});