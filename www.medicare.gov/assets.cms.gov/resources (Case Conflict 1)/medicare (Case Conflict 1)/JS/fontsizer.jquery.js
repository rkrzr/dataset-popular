function fontResizer(){function c(){$("a.smallFont").removeClass("currFont");$("a.medFont").removeClass("currFont");$("a.largeFont").removeClass("currFont");$("body").removeClass("smallFont").removeClass("medFont").removeClass("largeFont")}function a(g){var f=new Date();f.setTime(f.getTime()+(7*24*60*60*1000));var e="; expires="+f.toGMTString();document.cookie="fontSizer="+g+e+"; path=/"}$("a.smallFont").click(function(){c();$("body").addClass("smallFont");$("a.smallFont").addClass("currFont");a("smallFont");return false});$("a.medFont").click(function(){c();$("body").addClass("medFont");$("a.medFont").addClass("currFont");a("medFont");return false});$("a.largeFont").click(function(){c();$("body").addClass("largeFont");$("a.largeFont").addClass("currFont");a("largeFont");return false});function b(e){if(document.cookie.length>0){c_start=document.cookie.indexOf(e+"=");if(c_start!=-1){c_start=c_start+e.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""}var d=b("fontSizer");if(d!=""){$("body").addClass(d);if(d=="smallFont"){$("a.smallFont").addClass("currFont")}else{if(d=="largeFont"){$("a.largeFont").addClass("currFont")}else{$("a.medFont").addClass("currFont")}}}else{$("body").addClass("smallFont");$("a.smallFont").addClass("currFont")}};