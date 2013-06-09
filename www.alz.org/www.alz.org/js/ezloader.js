var ez_strictHTML=1;
var ez_usefx = 0;
var ez_isMac = (navigator.appVersion.indexOf("Mac") != -1);
var ez_NN4 = document.layers?1:0;
var ez_IE4 = document.getElementById?0:1;
var ez_OPR = (navigator.userAgent.indexOf("Opera")!=-1)?1:0;
var ez_OPR7 = 0;
var ez_NS6 = (document.getElementById && !document.all && !ez_OPR)?1:0;
if (ez_OPR) {
    temp = navigator.userAgent.split("Opera");
    if (temp[1].substring(0,1) == "/") {temp = temp[1].split("/");}
    ver = parseFloat(temp[1]);
    if (ver >= 7) ez_OPR7 = 1;
    if (ver < 7) ez_strictHTML=0;
}
if (navigator.appVersion.indexOf("MSIE")>-1) {
    temp = navigator.appVersion.split("MSIE");
    ver = parseFloat(temp[1]);
    if ((ver >= 5.5) && !ez_NS6 && !ez_OPR && !ez_isMac) ez_usefx = 1;
    if (ver<6 && !ez_isMac && !ez_OPR && !ez_NS6) ez_strictHTML=0;
}

if(ez_NN4) {
    document.write("<SCR" + "IPT  SRC='/js/ezmenuns.js' TYPE='text/javascript'><\/SCR" + "IPT>");
} else {
    document.write("<SCR" + "IPT  SRC='/js/ezmenuie.js' TYPE='text/javascript'><\/SCR" + "IPT>");
}