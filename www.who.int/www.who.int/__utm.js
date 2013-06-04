//-- Urchin Tracking Module II (UTM II),$Revision: 1.6 $,
//-- Copyright 2003 Urchin Software Corporation, All Rights Reserved.

/*--------------------------------------------------
   UTM II User Settings
--------------------------------------------------*/
var __utmfsc=1;                 /*-- set client info flag (1=on|0=off) --*/
var __utmdn="auto";             /*-- (auto|none|domain) set the domain name for cookies --*/
var __utmhash="on";             /*-- (on|off) unique domain hash for cookies --*/
var __utmgifpath="/__utm.gif";  /*-- set the web path to the __utm.gif file --*/
var __utmtimeout="1800";        /*-- set the inactive session timeout in seconds --*/

/*--------------------------------------------------
   UTM II Campaign Tracking Settings
--------------------------------------------------*/
var __utmctm=1;                 /*-- set campaign tracking module (1=on|0=off) --*/
var __utmcto="15768000";        /*-- set the campaign timeout in seconds (6 month default) --*/

var __utmccn="utm_campaign";    /*-- campaign name --*/
var __utmcpr="utm_program";     /*-- campaign program --*/
var __utmcrs="utm_refsite";     /*-- campaign referral site --*/
var __utmcrl="utm_refloc";      /*-- campaign referral location --*/
var __utmctr="utm_term";        /*-- campaign term/keyword --*/
var __utmcct="utm_content";     /*-- campaign content --*/

var __utmcui="utm_userid";      /*-- campaign userid --*/
var __utmccu="utm_custom";      /*-- campaign custom field --*/

/*--------------------------------------------------
   Don't modify below this point
--------------------------------------------------*/
var __utmf,__utmdh,__utmd,__utmdom="",__utmu,__utmjv="-",__utmfns;

if (!__utmf) {
   var __utma,__utmb,__utmc;
   var __utmexp="",__utms="",__utmst=0,__utmlf=0;

   /*--------------------------------------------------
      get useful information
   --------------------------------------------------*/
   __utmdh = __utmSetDomain();                               /*--- set the domain and get the domain hash ---*/
   __utma  = document.cookie.indexOf("__utma="+__utmdh);     /*--- cookie a ---*/
   __utmb  = document.cookie.indexOf("__utmb="+__utmdh);     /*--- cookie b ---*/
   __utmc  = document.cookie.indexOf("__utmc="+__utmdh);     /*--- cookie c ---*/
   __utmu  = Math.round(Math.random() * 4294967295);         /*--- unique number ---*/
   __utmd  = new Date();                                     /*--- current date/time epoch ---*/
   __utmst = Math.round(__utmd.getTime()/1000);              /*--- session time ---*/

   if (__utmdn && __utmdn != "") { __utmdom = " domain="+__utmdn+";"; } /*--- domain ---*/
   /*--- timeout ---*/
   if (__utmtimeout && __utmtimeout != "") {
      __utmexp = new Date(__utmd.getTime()+(__utmtimeout*1000));
      __utmexp = " expires="+__utmexp.toGMTString()+";";
   }

   /*--------------------------------------------------
      grab cookies from the commandline
   --------------------------------------------------*/
   __utms = document.location.search;
   if (__utms && __utms != "" && __utms.indexOf("__utma=") >= 0) {
      __utma = __utmGetCookie(__utms,"__utma=","&");
      __utmb = __utmGetCookie(__utms,"__utmb=","&");
      __utmc = __utmGetCookie(__utms,"__utmc=","&");
      if (__utma != "-" && __utmb != "-" && __utmc != "-") __utmlf = 1;
      else if (__utma != "-")                              __utmlf = 2;
   }

   /*--------------------------------------------------
      based on the logic set cookies
   --------------------------------------------------*/
   if (__utmlf == 1) { 
      document.cookie="__utma="+__utma+"; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;";
      document.cookie="__utmb="+__utmb+"; path=/;"+__utmexp;
      document.cookie="__utmc="+__utmc+"; path=/;";
      __utmfns=1;
   } else if (__utmlf == 2) { 
      __utma = __utmFixA(__utms,"&",__utmst); 
      document.cookie="__utma="+__utma+"; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;";
      document.cookie="__utmb="+__utmdh+"; path=/;"+__utmexp;
      document.cookie="__utmc="+__utmdh+"; path=/;"
      __utmfns=1;
   } else if (__utma >= 0 && __utmb >= 0 && __utmc >= 0) { 
      document.cookie="__utmb="+__utmdh+"; path=/;"+__utmexp+__utmdom;
   } else if (__utma >=0) { 
      __utma = __utmFixA(document.cookie,";",__utmst); 
      document.cookie="__utma="+__utma+"; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;"+__utmdom;
      document.cookie="__utmb="+__utmdh+"; path=/;"+__utmexp+__utmdom;
      document.cookie="__utmc="+__utmdh+"; path=/;"+__utmdom;
      __utmfns=1;
   } else if (__utma < 0 && __utmb < 0 && __utmc < 0) { 
      __utma = __utmCheckUTMI(__utmd); 
      if (__utma == "-")  __utma = __utmdh+"."+__utmu+"."+__utmst+"."+__utmst+"."+__utmst+".1"; 
      else                __utma = __utmdh+"."+__utma;
      document.cookie="__utma="+__utma+"; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;"+__utmdom;
      document.cookie="__utmb="+__utmdh+"; path=/;"+__utmexp+__utmdom;
      document.cookie="__utmc="+__utmdh+"; path=/;"+__utmdom;
      __utmfns=1;
   } else {
      __utma = __utmdh+"."+__utmu+"."+__utmst+"."+__utmst+"."+__utmst+".1";
      document.cookie="__utma="+__utma+"; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;"+__utmdom;
      document.cookie="__utmb="+__utmdh+"; path=/;"+__utmexp+__utmdom;
      document.cookie="__utmc="+__utmdh+"; path=/;"+__utmdom;
      __utmfns=1;
   }
   __utmSetInfo();
   __utmf = 1;
}

function __utmSetInfo() {
   var __utmr="-",__utmp;
   var __utmi = new Image(1,1);
   var __utmsrc = __utmgifpath+"?";
   var loc = document.location;
   __utmr = document.referrer;
   if (!__utmr || __utmr == "") { __utmr = "-"; } 
   else { 
      __utmp = __utmr.indexOf(document.domain); 
      if ((__utmp >= 0) && (__utmp <= 8)) { __utmr = "0"; }
      if (__utmr.indexOf("[") == 0 && __utmr.lastIndexOf("]") == (__utmr.length-1)) { __utmr = "-"; }
   }
   __utmsrc += "utmn="+__utmu;
   if (__utmfsc && __utmfns) {__utmsrc += __utmGetClientInfo(); }
   if (__utmctm)             {__utmsrc += __utmSetCampaignInfo(); }
   __utmsrc += "&utmr="+__utmr+"&utmp="+loc.pathname+loc.search;
   __utmi.src = __utmsrc;
   return 0;
}

function __utmSetCampaignInfo() {
    var __utmcc = "";
    var __utmtmp = "-";
    var __utmcnew = "&utmcn=1";
    var __utmx = document.location.search;
    var __utmz = document.cookie.indexOf("__utmz="+__utmdh);
    if (__utmz > -1) {
       __utmz = __utmGetCookie(document.cookie,"__utmz=",";");
    } else { __utmz = "-"; }

    /*--- check for campaign info ---*/
    __utmtmp = __utmGetCookie(__utmx,__utmccn+"=","&");
    if (__utmtmp == "-" || __utmtmp == "") { return ""; }
    __utmcc += "utmccn="+__utmtmp;
    __utmtmp = __utmGetCookie(__utmx,__utmcpr+"=","&"); if (__utmtmp != "-" && __utmtmp != "") __utmcc += "|utmcpr="+__utmtmp;
    __utmtmp = __utmGetCookie(__utmx,__utmcrs+"=","&"); if (__utmtmp != "-" && __utmtmp != "") __utmcc += "|utmcrs="+__utmtmp;
    __utmtmp = __utmGetCookie(__utmx,__utmcrl+"=","&"); if (__utmtmp != "-" && __utmtmp != "") __utmcc += "|utmcrl="+__utmtmp;
    __utmtmp = __utmGetCookie(__utmx,__utmctr+"=","&"); if (__utmtmp != "-" && __utmtmp != "") __utmcc += "|utmctr="+__utmtmp;
    __utmtmp = __utmGetCookie(__utmx,__utmcct+"=","&"); if (__utmtmp != "-" && __utmtmp != "") __utmcc += "|utmcct="+__utmtmp;

    /*--- check if campaign is already set ---*/
    if (!__utmfns && __utmz.indexOf(__utmcc) != -1) __utmcnew = "";


    /*--- check for userid in cookie ---*/
    __utmtmp = __utmGetCookie(__utmx,__utmcui+"=","&"); 
    if (__utmtmp != "-" && __utmtmp != "") { 
       __utmcc += "|utmcui="+__utmtmp;
    } else {
       __utmtmp = __utmGetCookie(__utmz,"utmcui=","|"); 
       if (__utmtmp != "-" && __utmtmp != "") { __utmcc += "|utmcui="+__utmtmp; } 
    }

    /*--- check for email in cookie ---*/
    __utmtmp = __utmGetCookie(__utmx,__utmccu+"=","&"); 
    if (__utmtmp != "-" && __utmtmp != "") { 
       __utmcc += "|utmccu="+__utmtmp;
    } else {
       __utmtmp = __utmGetCookie(__utmz,"utmccu=","|"); 
       if (__utmtmp != "-" && __utmtmp != "") { __utmcc += "|utmccu="+__utmtmp; } 
    }

    /*--- set the cookie ---*/
    if (!__utmcto || __utmcto == "") { __utmcto = "15768000"; }
    var __utmcx = new Date(__utmd.getTime()+(__utmcto*1000));
    __utmcx = " expires="+__utmcx.toGMTString()+";";
    document.cookie="__utmz="+__utmdh+"."+__utmst+"."+__utmcc+"; path=/; "+__utmcx+__utmdom;

    /*--- set the new campaign flag  ---*/
    return __utmcnew;
}

function __utmGetClientInfo() {
   var __utmtmp="-",__utmsr="-",__utmsa="-",__utmsc="-",__utmbs="-",__utmul="-";
   var __utmje=1,__utmce=1,__utmtz=0;
   if (self.screen) { 
      __utmsr = screen.width+"x"+screen.height;
      __utmsa = screen.availWidth+"x"+screen.availHeight;
      __utmsc = screen.colorDepth+"-bit";
   } else if (self.java) {
      var __utmjk = java.awt.Toolkit.getDefaultToolkit();
      var __utmjksize = __utmjk.getScreenSize();       
      __utmsr = __utmjksize.width+"x"+__utmjksize.height;
   } 
   if( typeof( window.innerWidth ) == 'number' ) {
      __utmbs = window.innerWidth+"x"+window.innerHeight;
   } else { 
     if (document.documentElement && 
       (document.documentElement.offsetHeight || document.documentElement.offsetWidth ) ) {
        __utmbs = document.documentElement.offsetWidth+"x"+document.documentElement.offsetHeight;
     } else if (document.body && (document.body.offsetWidth || document.body.offsetHeight) ) {
        __utmbs = document.body.offsetWidth+"x"+document.body.offsetHeight;
     } 
   }
   for (var i=5;i>=0;i--) {
      var __utmtmp = "<script language='JavaScript1."+i+"'>__utmjv='1."+i+"';</script>"; 
      document.write(__utmtmp);
      if (__utmjv != "-") break;
   }
   if (navigator.language) { __utmul = navigator.language.toLowerCase(); }
   else if (navigator.browserLanguage) { __utmul = navigator.browserLanguage.toLowerCase(); }
   __utmje = navigator.javaEnabled()?1:0;
   if (document.cookie.indexOf("__utmb=") < 0) { __utmce = "0"; }
   if (document.cookie.indexOf("__utmc=") < 0) { __utmce = "0"; }
   __utmtz = __utmd.getTimezoneOffset();
   __utmtz = __utmTZConvert(__utmtz);
   __utmtmp ="";
   __utmtmp += "&utmsr="+__utmsr+"&utmsa="+__utmsa+"&utmsc="+__utmsc+"&utmbs="+__utmbs;
   __utmtmp += "&utmul="+__utmul+"&utmje="+__utmje+"&utmce="+__utmce+"&utmtz="+__utmtz+"&utmjv="+__utmjv;
   return __utmtmp;
}
function __utmLinker(__utmlink) {
   var __utmlp,__utmi,__utmi2,__utmta="-",__utmtb="-",__utmtc="-",__utmtz="-";

   if (__utmlink && __utmlink != "") { 
      if (document.cookie) {
         __utmta = __utmGetCookie(document.cookie,"__utma="+__utmdh,";");
         __utmtb = __utmGetCookie(document.cookie,"__utmb="+__utmdh,";");
         __utmtc = __utmGetCookie(document.cookie,"__utmc="+__utmdh,";");
         __utmtz = __utmGetCookie(document.cookie,"__utmz="+__utmdh,";");
         __utmlp = "__utma="+__utmta+"&__utmb="+__utmtb+"&__utmc="+__utmtc+"&__utmz="+__utmtz;
      }
      if (__utmlp) {
         if (__utmlink.indexOf("?") <= -1) { document.location = __utmlink+"?"+__utmlp; }
         else { document.location = __utmlink+"&"+__utmlp; }
      } else { document.location = __utmlink; }
   }
}
function __utmGetCookie(__utmclist,__utmcname,__utmcsep) {
   if (!__utmclist || __utmclist == "") return "-";
   if (!__utmcname || __utmcname == "") return "-";
   if (!__utmcsep  || __utmcsep  == "") return "-";
   var __utmi, __utmi2, __utmi3, __utmtc="-";

   __utmi = __utmclist.indexOf(__utmcname);
   __utmi3 = __utmcname.indexOf("=")+1;
   if (__utmi > -1) { 
      __utmi2 = __utmclist.indexOf(__utmcsep,__utmi); if (__utmi2 < 0) { __utmi2 = __utmclist.length; }
      __utmtc = __utmclist.substring((__utmi+__utmi3),__utmi2); 
   }
   return __utmtc;
}
function __utmSetDomain() {
   if (!__utmdn || __utmdn == "" || __utmdn == "none") { __utmdn = ""; return 1; }
   if (__utmdn == "auto") {
      var __utmdomain = document.domain;
      if (__utmdomain.substring(0,4) == "www.") {
         __utmdomain = __utmdomain.substring(4,__utmdomain.length);
      }
      __utmdn = __utmdomain;
   }
   if (__utmhash == "off") return 1;
   return __utmHash(__utmdn);
}
function __utmHash(__utmd) {
   if (!__utmd || __utmd == "") return 1;
   var __utmhash=0, __utmg=0;
   for (var i=__utmd.length-1;i>=0;i--) {
      var __utmc = parseInt(__utmd.charCodeAt(i)); 
      __utmhash = ((__utmhash << 6) & 0xfffffff) + __utmc + (__utmc << 14);
      if ((__utmg = __utmhash & 0xfe00000) != 0) __utmhash = (__utmhash ^ (__utmg >> 21));
   }
   return __utmhash;
}
function __utmFixA(__utmcs,__utmsp, __utmst) {
   if (!__utmcs || __utmcs == "") return "-";
   if (!__utmsp || __utmsp == "") return "-";
   if (!__utmst || __utmst == "") return "-";
   var __utmt = __utmGetCookie(__utmcs,"__utma=",__utmsp);
   var __utmlt=0;
   var __utmns=0;
   var __utmi=0;

   if ((__utmi=__utmt.lastIndexOf(".")) > 9) {
      __utmns = __utmt.substring(__utmi+1,__utmt.length);
      __utmns = (__utmns*1)+1;
      __utmt = __utmt.substring(0,(__utmi));

      if ((__utmi = __utmt.lastIndexOf(".")) > 7) {
         __utmlt = __utmt.substring(__utmi+1,__utmt.length);
         __utmt = __utmt.substring(0,(__utmi));
      }

      if ((__utmi = __utmt.lastIndexOf(".")) > 5) {
         __utmt = __utmt.substring(0,(__utmi));
      }
      __utmt += "."+__utmlt+"."+__utmst+"."+__utmns;
   }
   return __utmt;
}

function __utmCheckUTMI(__utmd) {
   var __utm1A = new Array();
   var __utmlst=0,__utmpst=0,__utmlvt=0,__utmlu=0,__utmi=0,__utmpi=0;
   var __utmap = "-";
   var __utmld = "";
   var __utmt2;
   var __utmt = document.cookie;

   while((__utmi = __utmt.indexOf("__utm1=")) >= 0) {
      __utm1A[__utm1A.length] = __utmGetCookie(__utmt,"__utm1=",";");
      __utmt = __utmt.substring(__utmi+7,__utmt.length);
   }
   if (__utm1A.length) {
      var __utmcts = Math.round(__utmd.getTime()/1000);
      var __utmlex = " expires="+__utmd.toGMTString()+";";
      __utmt = document.cookie; 
      if ((__utmi = __utmt.lastIndexOf("__utm3=")) >= 0) {
         __utmlst = __utmt.substring(__utmi,__utmt.length);
         __utmlst = __utmGetCookie(__utmlst,"__utm3=",";");
      }
      if ((__utmi = __utmt.lastIndexOf("__utm2=")) >= 0) {
         __utmpst = __utmt.substring(__utmi,__utmt.length);
         __utmpst = __utmGetCookie(__utmpst,"__utm2=",";");
      }
      for (var i=0;i<__utm1A.length;i++) {
         __utmt = __utm1A[i];
         if ((__utmi = __utmt.lastIndexOf(".")) >= 0) {
            __utmt2 = (__utmt.substring(0,__utmi))*1;
            __utmt  = (__utmt.substring(__utmi+1,__utmt.length))*1;
            if (__utmlvt == 0 || __utmt < __utmlvt) { 
               __utmlvt = __utmt;
               __utmlu  = __utmt2;
            }
         }
      }
      if (__utmlvt && __utmlst) { 
         if (!__utmpst ||  __utmpst > __utmlst) __utmpst = __utmlst;
         __utmap = __utmlu+"."+__utmlvt+"."+__utmpst+"."+__utmlst+".2"; 
      } else if (__utmlvt) { 
         if (!__utmpst || __utmpst > __utmcts) __utmpst = __utmcts;
         __utmap = __utmlu+"."+__utmlvt+"."+__utmpst+"."+__utmcts+".2";
      }
      __utmld = __utmt = document.domain;
      __utmi=__utmpi=0;
      while((__utmi = __utmt.indexOf(".",__utmpi+1)) >= 0) {
         if (__utmpi>0) __utmld = __utmt.substring(__utmpi+1,__utmt.length);
         __utmld = " domain="+__utmld+";"; 
         document.cookie="__utm1=1; path=/;"+__utmlex+__utmld;
         document.cookie="__utm2=1; path=/;"+__utmlex+__utmld;
         document.cookie="__utm3=1; path=/;"+__utmlex+__utmld;
         __utmpi=__utmi;
      }
      document.cookie="__utm1=1; path=/;"+__utmlex;
      document.cookie="__utm2=1; path=/;"+__utmlex;
      document.cookie="__utm3=1; path=/;"+__utmlex;
   }
   return __utmap;
}

function __utmTZConvert(__utmmz) {
   var __utmhr=0,__utmmn=0,__utmsg='+';
   if (__utmmz && __utmmz != "") {
      if (__utmmz <= 0) {__utmsg='+'; __utmmz*=-1; }
      else {__utmsg='-'; __utmmz*=1; }
      __utmhr = Math.floor((__utmmz/60)); 
      __utmmn = Math.floor((__utmmz%60)); 
   }
   if (__utmhr < 10) __utmhr = "0"+__utmhr;
   if (__utmmn < 10) __utmmn = "0"+__utmmn;
   return __utmsg+__utmhr+__utmmn;
}
