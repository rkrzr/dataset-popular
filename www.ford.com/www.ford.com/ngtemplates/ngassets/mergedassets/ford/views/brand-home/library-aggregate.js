/*!***********************************************************************
 Copyright (C) Unpublished Versata Software, Inc. All rights reserved.
 Versata Software, Inc., Confidential and Proprietary.

 This software is subject to copyright protection
 under the laws of the United States and other countries.

 Unless otherwise explicitly stated, this software is provided
 by Versata "AS IS".
*************************************************************************/
(function(){var e=getPackageForName("com.forddirect.ng.aspects");var d=YAHOO.lang;var b=getPackageForName("com.forddirect.ng.widgets");var a=getPackageForName("com.forddirect.ng.views");a.BaseView=function(){};var c=a.BaseView.prototype;c.init=function(f){if(b.DisclaimerFlip){this.addWidget("disclaimer-flip",b.DisclaimerFlip);}if(b.GetUpdatesFlip){this.addWidget("get-updates-flip",b.GetUpdatesFlip);}this.updateSessionActiveCookie();};c.updateSessionActiveCookie=function(){var f=_instances.cookieManager;var g=f.readCookie("sessionActive");if(!g){var h={path:"/",domain:__params.domain};f.setCookie("sessionActive","true",h);}};c.onLoaderInitComplete=function(){this.handleBrowserHistoryChange();};c.handleBrowserHistoryChange=function(){};d.augmentObject(c,e.Widgetizable);}());
(function(){var c=YAHOO.util;var b=c.Dom;var d=YAHOO.lang;var g=c.Anim;var e=c.CustomEvent;var f=getPackageForName("com.forddirect.ng.util");f.Animation={};var a=function(h){h=h?b.get(h):null;if(h&&h.style.filter){h.style.filter="";}};f.Animation.resetScroll=function(k){var h=40;var j=Math.ceil(b.getDocumentScrollTop()/50);function i(){var l=b.getDocumentScrollLeft();var m=b.getDocumentScrollTop();if(m>0){window.scrollTo(l,Math.min(0,m-j));setTimeout(i,h);}}setTimeout(i,h);};f.Animation.animate=function(i,o){var p=b.get(i);var m=o.attributes||{opacity:{to:0}};var k=o.duration||0.4;var j=o.onCompleteHandler||null;if(p){var l=new g(p,m,k);if(j){var n=o.obj||null;var h=o.override||false;l.subscribe(j,n,h);}l.animate();}};f.Animation.fadeAndHide=function(h){var i=function(){this._prevDisplay=this.style.display;b.setStyle(this,"display","none");};f.Animation.animate(h,{attributes:{opacity:{to:0}},onCompleteHandler:i,obj:h,override:true});};f.Animation.displayAndFade=function(h){var i="";if(h._prevDisplay){i=h._prevDisplay;delete h._prevDisplay;}f.Animation.animate(h,{attributes:{opacity:{to:1}},onCompleteHandler:a,obj:h});};f.Animation.toggleBlocks=function(l,i){var k=b.get(l);if(k){var j=new g(k,{opacity:{to:0}},0.2);var h=new g(k,{opacity:{to:1}},0.2);if(b.getStyle(k,"opacity")!==0){j.onComplete.subscribe(function(){k.style.display="none";if(typeof(i)!=="undefined"){i("fadeOut");}});j.animate();}else{k.style.display="block";h.onComplete.subscribe(function(){a(k);if(typeof(i)!=="undefined"){i("fadeIn");}});h.animate();}}};f.AnimAll=function(l,k,h){var i=false;var j=null;this.useSeconds=true;this.pendingAnimations=0;this.animations=[];this.doComplete=function(){if(!this.isAnimated()){return false;}i=false;var m=new Date()-j;j=null;var n={totalDuration:m};this.onComplete.fire(n);return true;};this.isAnimated=function(){return i;};this.handleComplete=function(){this.pendingAnimations--;if(this.pendingAnimations<=0){this.doComplete();}};this.animate=function(){if(this.isAnimated()){return false;}i=true;j=new Date();var m;for(m=0;m<this.animations.length;m++){var n=this.animations[m];n.animate();}return true;};this.registerAnimation=function(o,n,p,q){var m=new g(o,n,p,q);m.useSeconds=this.useSeconds;m.onComplete.subscribe(this.handleComplete,this,true);this.animations.push(m);this.pendingAnimations=this.animations.length;};this.addConstituents=function(o,q){var p=o.els||[];var m=o.attributes||{};var r=o.method||null;var n;for(n=0;n<p.length;n++){this.registerAnimation(p[n],m,q,r);}};this.init=function(p,o,m){if(m&&m.useSeconds){this.useSeconds=m.useSeconds;}if(d.isArray(p)){var n;for(n=0;n<p.length;n++){this.addConstituents(p[n],o);}}else{this.addConstituents(p,o);}};this.onStart=new e("start",this);this.onComplete=new e("complete",this);this.init(l,k,h);};}());
(function(e){var d,b,f=false,a=false;function c(h){var g=this;jQuery(document).on("click",".payment-estimator-link",function(i){g.launch(i,this);});this.script=h;}d=c.prototype;d.loadScript=function(g){jQuery.ajax(this.script,{cache:true,dataType:"script",success:g,error:function(i,j,h){throw h;}});};d.launch=function(g,m){var n,k,j,q=e(m),h={zipcode:ngbs.u.cookie.zip()||null,make:__params.make||null,model:__params.modelName||null,year:__params.year,plantype:td_site.pricing.getPlanTypeForServices()||"MSRP",trim:null,configToken:null,paymentType:null,type:null},o=["zipcode","make","model","year"];for(n in h){if(h.hasOwnProperty(n)){k=q.data(n.toLowerCase());if(k){h[n]=k;}}}for(n=0,j=o.length;n<j;n++){if(h[o[n]]===null){return;}}if(window.location.href.indexOf("/payments-bridge/")===-1){if((__params.vehicleLifeCycle&&!(__params.vehicleLifeCycle==="launch"||__params.vehicleLifeCycle==="selldown"))||window.location.href.indexOf("cars/focus/focusst")!==-1){return true;}}g.preventDefault();g.stopPropagation();var r=this;var p=function(){fdcc.init(function(){fdcc.spc.reset();fdcc.spc.show(false,h,r.metrics);jQuery("a.credit-link").on("click",function(i){i.stopPropagation();});if(jQuery("body.skin-ford").length>0){jQuery("#fdcc_spc").css("margin-top",jQuery(".globalnav-header").offset().top+jQuery(".globalnav-header").outerHeight());}else{jQuery("#fdcc_spc").css("margin-top",jQuery(".global-wrap-header").offset().top+jQuery(".global-wrap-header").outerHeight());}ngbs._message_bus.send(document.body,"close-flips");});};if(!a&&!f){this.loadScript(p);}else{p();}};d.metrics=function(g,h){if(typeof oMetricsTracker!=="undefined"){oMetricsTracker.paymentEstimator(g,h);}};b=new c(__params.peflip);}(jQuery));