(function(a){a.fn.tinycarousel=function(e){var n={start:1,display:1,axis:"x",controls:true,pager:false,interval:false,intervaltime:5000,animation:true,duration:2000,callback:null};var e=a.extend(n,e);var l=a(this);var h=a(".viewport",l);var g=a(".overview",l);var j=g.children();var f=a(".next",l);var c=a(".prev",l);var k=a(".pager",l);var x,v,q,i,o=true,t=e.axis=="x";return this.each(function(){b()});function b(){var z=a("body");if(z.hasClass("body_External")){z.css("overflow","hidden");j.css("width",h.parents(".slider-code").innerWidth())}x=t?a(j[0]).outerWidth(true):a(j[0]).outerHeight(true);var A=Math.ceil(((t?h.outerWidth():h.outerHeight())/(x*e.display))-1);v=Math.max(1,Math.ceil(j.length/e.display)-A);q=Math.min(v,Math.max(1,e.start))-2;var y={};y[t?"width":"height"]=(x*j.length);g.css(y);if(e.layout=="rtl"&&(navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1||navigator.userAgent.toLowerCase().indexOf("msie 7")!=-1)){h.css(y)}p(1);r()}function m(){if(e.controls){c.toggleClass("disableslider",!(q>0));f.toggleClass("disableslider",!(q+1<v))}}function r(){if(e.controls&&c.length>0&&f.length>0){c.click(function(){p(-1);return false});f.click(function(){p(1);return false})}if(e.pager&&k.length>0){k.click(w)}}function w(z){var y=z.target;if(a(y).hasClass("pagenum")){q=parseInt(y.rel)-1;p(1)}return false}function d(){var y=navigator.userAgent.toLowerCase();if(e.pager&&y.indexOf("msie 6")===-1&&e.pager&&y.indexOf("msie 7")===-1){var z=a(".pagenum",k);z.removeClass("active");a(z[q]).addClass("active");y.indexOf("msie")&&window.setTimeout(function(){a(z[q]).addClass("active")},10)}}function u(y){if(e.interval&&!y){clearInterval(i);i=window.setInterval(function(){o=q+1==v?false:q==0?true:o;p(o?1:-1,true)},e.intervaltime)}}function s(){var z=navigator.userAgent.toLowerCase();if(z.indexOf("msie 6")!=-1||z.indexOf("msie 7")!=-1){if(!k.hasClass("carousel_pager_topnewsside")){var A=a("li",k);var y=0;A.each(function(){y+=a(this).outerWidth(true)});k.css("width",y+"px")}var B="<li style='display:none'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>";k.append(B+B);if(c.hasClass("disableslider")){c.addClass("disableslider_prev")}else{c.removeClass("disableslider_prev")}}}function p(A,z){if(q+A>-1&&q+A<v){q+=A;var y={};if(e.layout=="rtl"){y[t?"right":"top"]=-(q*(x*e.display))}else{y[t?"left":"top"]=-(q*(x*e.display))}a(j[q]).removeClass("hideBgImages");g.animate(y,{queue:false,duration:e.animation?e.duration:0,complete:function(){if(typeof e.callback=="function"){e.callback.call(this,j[q],q)}}});m();d();u(z);s()}}}})(jQuery);;