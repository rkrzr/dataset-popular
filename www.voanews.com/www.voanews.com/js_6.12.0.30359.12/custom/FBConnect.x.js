var FBConnect_ApiURL="https://connect.facebook.net/en_US/all.js";function FBConnect_LoginOnClick(a,d,c){var b=function(){FB.login(function(e){if(e.status==="connected"&&e.authResponse){$("input[id*='UserName']",c).val("Facebook User").hide();$("input[id*='Password']",c).val("dummyPassword").hide();$("input[id*='FBConnectData']",c).val(FB.getUserID()+"|"+FB.getAccessToken());d()}else{$.fancybox.close()}},{scope:"read_stream,publish_stream,email,user_likes"})};if(window.FB){b()}else{FBConnect_SyncInit(a,b)}}function FBConnect_AsyncInit(a){window.fbAsyncInit=function(){FBConnect_init(a)};var c=document.createElement("script");c.async=true;c.src=FBConnect_ApiURL;var b=$("#fb-root");if(b.length===0){$("body").append($("<div>").attr("id","fb-root"))}document.getElementById("fb-root").appendChild(c)}function FBConnect_SyncInit(a,b){$.getScript(FBConnect_ApiURL,function(c,e,d){FBConnect_init(a);b&&b()})}function FBConnect_init(a){FB.init({appId:a,channelURL:"",status:true,cookie:true,oauth:true,xfbml:false})}function FBConnect_logout(a){var b=function(){FB.getLoginStatus(function(c){if(c.status==="connected"){FB.logout()}})};if(a!==""){if(!window.FB){FBConnect_SyncInit(a,b)}else{b()}}}function pangeaSocialIcons(d){if(d&&d.icons){var o=$("<div>").addClass("pangea_social_icons"),l=null,e=new Object(),b=function(s){var v=$(this),i=$(".loadindicator",l),x=function(){window.clearTimeout(window.shwTimer);l.show();var G=v.offset();var B=G.left;var M=G.top;var J=v.outerWidth(true);var E=v.outerHeight(true);var D=l.outerWidth(true);var N=l.outerHeight(true);var I=$(window).scrollTop();var F=$(".shwarrow",l);var L=$(".shwarrow_top",l);var H=$(window).width();var K=Math.round((B+(J/2)-(D/2)));var O=Math.min(H-D,Math.max(0,K))+"px";F.css("visibility","hidden");L.css("visibility","hidden");if(M-N>=I){l.css("top",(M-N)+"px").css("left",O);K>0&&K<=H-D&&F.css("visibility","visible")}else{if(M+E+N<=$(window).height()+I){l.css("top",(M+E)+"px").css("left",O);K>0&&K<=H-D&&L.css("visibility","visible")}else{var C=B-D;l.css("top",I+"px").css("left",(C<0?(B+J):C)+"px")}}},A=function(B){return s.data.location.width>0?s.data.location.width:B},t=function(B){return s.data.location.height>0?s.data.location.height:B},q=function(){return typeof s.data.location==="string"?s.data.location:s.data.location.account},z=function(B,C){i.show().css("left",(B/2)-(i.outerWidth()/2)+"px").css("top",(C/2)-(i.outerHeight()/2)+"px")};i.hide();if(!l){l=$("<div>").addClass("shwcontent").append($("<div>").addClass("shwarrow_top").html("&nbsp;"),$("<div>").addClass("shwarrow_top").addClass("shwarrow2_top").html("&nbsp;"),$("<div>").addClass("shwcontinner"),$("<div>").addClass("shwarrow").html("&nbsp;"),$("<div>").addClass("shwarrow").addClass("shwarrow2").html("&nbsp;"),$("<div>").addClass("loadindicator").html("&nbsp;")).hover(f,c);o.append(l)}if(v.hasClass("shwico_facebook")){if(!e.oFacebook){var y=A(292);var r=t(590);z(y,r);e.oFacebook=$("<iframe>").attr("scrolling","no").attr("frameborder","0").attr("style","border:none; overflow:hidden; width:"+y+"px; height:"+r+"px;").attr("allowTransparency","true").attr("src","http://www.facebook.com/plugins/likebox.php?href="+q()+"&width="+y+"&height="+r+"&colorscheme=light&show_faces=true&border_color&stream=true&header=true").load(function(B){i.hide()});$(".shwcontinner",l).append(e.oFacebook)}h();e.oFacebook.show()}else{if(v.hasClass("shwico_twitter")){if(!e.oTwitter){var w=a();var u=A(250);var p=t(300);z(u,p);$.getScript("http://widgets.twimg.com/j/2/widget.js",function(B,D,C){new TWTR.Widget({id:w,version:2,type:"profile",rpp:4,interval:30000,width:u,height:p,theme:{shell:{background:"#edeff4",color:"#000000"},tweets:{background:"#ffffff",color:"#000000",links:"#1b74a4"}},ready:function(){window.setTimeout(function(){e.oTwitter.css("height","inherit");x();i.hide()},750)},features:{scrollbar:!1,loop:!1,live:!1,hashtags:!0,timestamp:!0,avatars:!1,behavior:"all"}}).render().setUser(q()).start()});e.oTwitter=$("<div>").css("width",u+"px").css("height",p+"px").css("overflow","hidden").attr("id",w);$(".shwcontinner",l).append(e.oTwitter)}h();e.oTwitter.show()}else{if(v.hasClass("shwico_vk")){var p=t(390);if(!e.oVk){var w=a();var u=A(290);z(u,p);$.getScript("http://userapi.com/js/api/openapi.js?34",function(B,D,C){i.hide();VK.Widgets.Group(w,{mode:0,width:u,height:p},q())});e.oVk=$("<div>").css("width",u+"px").css("height",p+"px").attr("id",w);$(".shwcontinner",l).append(e.oVk)}e.oVk.css("height",p+"px").children().css("height",p+"px");h();e.oVk.show()}else{if(!e.oCustom){e.oCustom=$("<div>").html("custom");$(".shwcontinner",l).append(e.oCustom)}h();f();e.oCustom.show()}}}x()},m=function(i){l.hide()},c=function(){window.shwTimer=window.setTimeout(function(){m()},250)},f=function(){window.clearTimeout(window.shwTimer)},n=function(i,p){i.mouseenter({location:p},b).mouseleave(c)},h=function(){for(oc in e){e[oc].hide()}},a=function(){return"sncontanier_"+new Date().getTime()+"_"+Math.floor(Math.random()*99999)};for(var g=0;g<d.icons.length;g++){var j=d.icons[g],k=$("<a>").addClass("shwico").attr("alt",j.name?unescape(j.name):"").html(j.html?j.html:"&nbsp;");if(j.type==="facebook_popup"){k.addClass("shwico_facebook");n(k,j.href)}if(j.type==="twitter_popup"){k.addClass("shwico_twitter");n(k,j.href)}if(j.type==="vk_popup"){k.addClass("shwico_vk");n(k,j.href)}j.customModal&&n(k,j.customModal);if(j.type==="link_button"){j.href&&k.attr("href",!d.isDesign?decodeURIComponent(j.href):"javascript:void(0)")}j.name&&k.attr("title",unescape(j.name));j.style&&k.attr("style",j.style);j.cssClass&&k.addClass(j.cssClass.replace(".","_"));j.target&&k.attr("target",!d.isDesign?j.target:"_self");j.rel&&k.attr("rel",j.rel);if(j.onclick){if(typeof j.onclick==="function"){k.click(j.onclick)}else{k.attr("onclick",j.onclick)}}if(j.customParam&&j.customParam.name&&j.customParam.value){k.attr(j.customParam.name,j.customParam.value)}o.append(k)}$("script:last").after(o)}};;