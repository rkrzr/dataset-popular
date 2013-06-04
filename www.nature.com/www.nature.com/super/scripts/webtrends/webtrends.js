// WebTrends SmartSource Data Collector Tag
// Version: 9.3.0     
// Tag Builder Version: 3.1
// Created: 4/25/2011 4:35:11 PM
// Customized: 2011-05-06 by Wes Contreras <wes.contreras@webtrends.com>
// Customizations documented via comments with the string "custom"

function WebTrends(){
	var that=this;
	// begin: user modifiable
	var host=window.location.hostname.toLowerCase();
	if (host.search('nature.com$')!=-1) {
    this.dcsid="dcs0zztfg00000s969s37qoal_2f6z";
	  this.fpcdom=".nature.com";
	} else if (host.search('books.scientificamerican.com$')!=-1) {
	  this.dcsid="dcst1kr4uvz5bdrdygoo2t7rh_3r7q";
	  this.fpcdom=".scientificamerican.com";
	} else if (host.search('scientificamerican.com$')!=-1) {
	  this.dcsid="dcszbiart00000oiar2s6w5ud_4y9j";
	  this.fpcdom=".scientificamerican.com";
	} else if (host.search('sciam.com$')!=-1) {
	  this.dcsid="dcszbiart00000oiar2s6w5ud_4y9j";
	  this.fpcdom=".sciam.com";

	} else {
	  this.dcsid="dcs0zztfg00000s969s37qoal_2f6z";
	  this.fpcdom=host;
	}
	this.domain="statse.webtrendslive.com";
	this.timezone=-5;
	this.onsitedoms="nature.com,blog-msb.embo.org,connotea.org,functionalglycomics.com,labanimal.com,kb.psi-structuralgenomics.org,lipidmaps.org,natureasia.com,naturechina.com.cn,neuroscience-gateway.org,pid.nci.nih.gov,signaling-gateway.org,palgrave-connect.com,www.econolog.net,www.functionalglycomics.org,www.palgrave-journals.com,www.rikenresearch.riken.jp,www.scitable.com,www.iaor-palgrave.com,www.natureprotocols.com,cellmigration.org,scientificamerican.com,sciam.com";
	this.downloadtypes="xls,doc,txt,csv,zip,mp3,mp4,mov,avi,bin,bmp,cdx,cml,css,dat,db,exe,gif,gz,HTM,jar,java,jpg,mol,pkg,png,ppt,psd,rss,sgml,tab,tgz,ttf,utf,xml,rdf";
	this.navigationtag="div,table";
	this.adclickparam="WT.ac";
	this.metanames="Access,citation_title,citation_journal_title,citation_date,citation_volume,citation_issue,citation_doi";
	this.trackevents=true;
	this.trimoffsiteparams=true;
	this.enabled=true;
	this.i18n=false;
	this.fpc="WT_FPC";
	this.paidsearchparams="gclid";
	this.splitvalue="";
	this.preserve=true;
	// end: user modifiable
	this.DCS={};
	this.WT={};
	this.DCSext={};
	this.images=[];
	this.index=0;
	this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
  // Customized behavior to call dcsVar and dcsMeta from constructor so parameters can be modified via inline text
  this.dcsVar();
  this.dcsMeta();
}
WebTrends.prototype.dcsGetId=function(){
	if (this.enabled&&(document.cookie.indexOf(this.fpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
		document.write("<scr"+"ipt type='text/javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+"/"+this.dcsid+"/wtid.js"+"'><\/scr"+"ipt>");
	}
}
WebTrends.prototype.dcsGetCookie=function(name){
	var cookies=document.cookie.split("; ");
	var cmatch=[];
	var idx=0;
	var i=0;
	var namelen=name.length;
	var clen=cookies.length;
	for (i=0;i<clen;i++){
		var c=cookies[i];
		if ((c.substring(0,namelen+1))==(name+"=")){
			cmatch[idx++]=c;
		}
	}
	var cmatchCount=cmatch.length;
	if (cmatchCount>0){
		idx=0;
		if ((cmatchCount>1)&&(name==this.fpc)){
			var dLatest=new Date(0);
			for (i=0;i<cmatchCount;i++){
				var lv=parseInt(this.dcsGetCrumb(cmatch[i],"lv"));
				var dLst=new Date(lv);
				if (dLst>dLatest){
					dLatest.setTime(dLst.getTime());
					idx=i;
				}
			}
		}
		return unescape(cmatch[idx].substring(namelen+1));
	}
	else{
		return null;
	}
}
WebTrends.prototype.dcsGetCrumb=function(cval,crumb,sep){
	var aCookie=cval.split(sep||":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
WebTrends.prototype.dcsGetIdCrumb=function(cval,crumb){
	var id=cval.substring(0,cval.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
WebTrends.prototype.dcsIsFpcSet=function(name,id,lv,ss){
	var c=this.dcsGetCookie(name);
	if (c){
		return ((id==this.dcsGetIdCrumb(c,"id"))&&(lv==this.dcsGetCrumb(c,"lv"))&&(ss==this.dcsGetCrumb(c,"ss")))?0:3;
	}
	return 2;
}
WebTrends.prototype.dcsFPC=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var WT=this.WT;
	var name=this.fpc;
	var dCur=new Date();
	var adj=(dCur.getTimezoneOffset()*60000)+(this.timezone*3600000);
	dCur.setTime(dCur.getTime()+adj);
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	WT.co_f=WT.vtid=WT.vtvs=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	if (document.cookie.indexOf(name+"=")==-1){
		if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
			WT.co_f=gWtId;
		}
		else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
			WT.co_f=gTempWtId;
			WT.vt_f="1";
		}
		else{
			WT.co_f="2";
			var curt=dCur.getTime().toString();
			for (var i=2;i<=(32-curt.length);i++){
				WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
			}
			WT.co_f+=curt;
			WT.vt_f="1";
		}
		if (typeof(gWtAccountRollup)=="undefined"){
			WT.vt_f_a="1";
		}
		WT.vt_f_s=WT.vt_f_d="1";
		WT.vt_f_tlh=WT.vt_f_tlv="0";
	}
	else{
		var c=this.dcsGetCookie(name);
		var id=this.dcsGetIdCrumb(c,"id");
		var lv=parseInt(this.dcsGetCrumb(c,"lv"));
		var ss=parseInt(this.dcsGetCrumb(c,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		var dLst=new Date(lv);
		WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vtid=(typeof(this.vtid)=="undefined")?WT.co_f:(this.vtid||"");
	WT.vtvs=(dSes.getTime()-adj).toString();
	var expiry="; expires="+dExp.toGMTString();
	var cur=dCur.getTime().toString();
	var ses=dSes.getTime().toString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+cur+":ss="+ses+expiry+"; path=/"+(((this.fpcdom!=""))?("; domain="+this.fpcdom):(""));
	var rc=this.dcsIsFpcSet(name,WT.co_f,cur,ses);
	if (rc!=0){
		WT.co_f=WT.vtvs=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
		if (typeof(this.vtid)=="undefined"){
			WT.vtid="";
		}
		WT.vt_f=WT.vt_f_a=rc;
    }
}
// Code section for Generate an Ad View query parameter for every Ad Click link.
WebTrends.prototype.dcsAdSearch=function(){
	if (document.links){
		var param=this.adclickparam+"=";
		var paramlen=param.length;
		var paramre=new RegExp(param,"i");
		var len=document.links.length;
		var pos=end=-1;
		var anch=urlp=value="";
		var urlpre;
		var url=document.URL+"";
		var start=url.search(paramre);
		if (start!=-1){
			end=url.indexOf("&",start);
			urlp=url.substring(start,(end!=-1)?end:url.length);
			urlpre=new RegExp(urlp+"(&|#)","i");
		}
		for (var i=0;i<len;i++){
			if (document.links[i].href){
				anch=document.links[i].href+"";
				if (urlp.length>0){
					anch=anch.replace(urlpre,"$1");
				}
				pos=anch.search(paramre);
				if (pos!=-1){
					start=pos+paramlen;
					end=anch.indexOf("&",start);
					value=anch.substring(start,(end!=-1)?end:anch.length);
          // Customized to avoid duplicate WT.ad values
          if (this.WT.ad==undefined) {
          	this.WT.ad=value;
          } else {
          	if (this.WT.ad.indexOf(value)==-1) {
          		this.WT.ad=this.WT.ad+";"+value;
          	}
          }
					// End customization
				}
			}
		}
	}
}
// Custom dcsIsOnsite function to capture all subdomains of domains in this.onsitedoms
WebTrends.prototype.dcsIsOnsite=function(host){
  if (host.length>0){
    host=host.toLowerCase();
    if (host==this.getHost()) {
      return true;
    } else if (this.onsitedoms.length>0){
      var doms=this.dcsSplit(this.onsitedoms);
      var len=doms.length;
      for (var i=0;i<len;i++){
        pattern = new RegExp(doms[i]+'$');
        if (host.search(pattern)!=-1){
          return true;
        }
      }
    }
  }
  return false;
}
WebTrends.prototype.dcsTypeMatch=function(pth, typelist){
	var type=pth.toLowerCase().substring(pth.lastIndexOf(".")+1,pth.length);
	var types=this.dcsSplit(typelist);
	var tlen=types.length;	
	for (var i=0;i<tlen;i++){
    // Added custom code to if statement to make case insensitive
		if (type.toLowerCase()==types[i].toLowerCase()){
			return true;
		}
	}
	return false;
}
WebTrends.prototype.dcsEvt=function(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e.tagName&&(e.tagName.toLowerCase()!=tag.toLowerCase())){
		e=e.parentElement||e.parentNode;
	}
	return e;
}
WebTrends.prototype.dcsNavigation=function(evt){
	var id="";
	var cname="";
	var elems=this.dcsSplit(this.navigationtag);
	var elen=elems.length;	
	var i,e,elem;
	for (i=0;i<elen;i++){
		elem=elems[i];
		if (elem.length){
			e=this.dcsEvt(evt,elem);
			id=(e.getAttribute&&e.getAttribute("id"))?e.getAttribute("id"):"";
			cname=e.className||"";
			if (id.length||cname.length){
				break;
			}
		}
	}
	return id.length?id:cname;
}
WebTrends.prototype.dcsBind=function(event,func){
	if ((typeof(func)=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, func.wtbind(this), true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, func.wtbind(this));
		}
	}
}
WebTrends.prototype.dcsET=function(){
	var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
	this.dcsBind(e,this.dcsDownload);
	this.dcsBind(e,this.dcsOffsite);
	// Register custom event handler
	this.dcsBind(e,this.dcsByClass);
	this.dcsBind("contextmenu",this.dcsRightClick);
}
WebTrends.prototype.dcsMultiTrack=function(){
	var args=dcsMultiTrack.arguments?dcsMultiTrack.arguments:arguments;
	if (args.length%2==0){
	    this.dcsSaveProps(args);
		this.dcsSetProps(args);
		var dCurrent=new Date();
		this.DCS.dcsdat=dCurrent.getTime();
		this.dcsFPC();
		this.dcsTag();
		this.dcsRestoreProps();
	}
}

WebTrends.prototype.dcsCleanUp=function(){
	this.DCS={};
	this.WT={};
	this.DCSext={};
	if (arguments.length%2==0){
		this.dcsSetProps(arguments);
	}
}
WebTrends.prototype.dcsSetProps=function(args){
	for (var i=0;i<args.length;i+=2){
		if (args[i].indexOf('WT.')==0){
			this.WT[args[i].substring(3)]=args[i+1];
		}
		else if (args[i].indexOf('DCS.')==0){
			this.DCS[args[i].substring(4)]=args[i+1];
		}
		else if (args[i].indexOf('DCSext.')==0){
			this.DCSext[args[i].substring(7)]=args[i+1];
		}
	}
}
WebTrends.prototype.dcsSaveProps=function(args){
	var i,key,param;
	if (this.preserve){
		this.args=[];
		for (i=0;i<args.length;i+=2){
			param=args[i];
			if (param.indexOf('WT.')==0){
				key=param.substring(3);
				this.args[i]=param;
				this.args[i+1]=this.WT[key]||"";
			}
			else if (param.indexOf('DCS.')==0){
				key=param.substring(4);
				this.args[i]=param;
				this.args[i+1]=this.DCS[key]||"";
			}
			else if (param.indexOf('DCSext.')==0){
				key=param.substring(7);
				this.args[i]=param;
				this.args[i+1]=this.DCSext[key]||"";
			}
		}
	}
}
WebTrends.prototype.dcsRestoreProps=function(){
	if (this.preserve){
		this.dcsSetProps(this.args);
		this.args=[];
	}
}
WebTrends.prototype.dcsSplit=function(list){
	var items=list.toLowerCase().split(",");
	var len=items.length;
	for (var i=0;i<len;i++){
		items[i]=items[i].replace(/^\s*/,"").replace(/\s*$/,"");
	}
	return items;
}
// Code section for Track clicks to download links.
WebTrends.prototype.dcsDownload=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    if (this.dcsIsOnsite(hn)&&this.dcsTypeMatch(e.pathname,this.downloadtypes)){
		        var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
		        var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
		        var ttl="";
		        var text=document.all?e.innerText:e.text;
		        var img=this.dcsEvt(evt,"IMG");
		        if (img.alt){
			        ttl=img.alt;
		        }
		        else if (text){
			        ttl=text;
		        }
		        else if (e.innerHTML){
			        ttl=e.innerHTML;
		        }
            // Added custom code to set WT.ndl to 0 for PDFs, 20 for other file types
            if (e.pathname.substr(e.pathname.length-4)=='.pdf'){
              ndl='0';
            } else {
              ndl='20';
            }
            // End customization
            // Added custom parameter WT.ndl alongside WT.dl
		        this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",e.search||"","WT.ti","Download:"+ttl,"WT.dl","20","WT.ndl",ndl,"WT.nv",this.dcsNavigation(evt));
		    }
		}
	}
}
// Code section for Track right clicks to download links.
WebTrends.prototype.dcsRightClick=function(evt){
	evt=evt||(window.event||"");
	if (evt){
		var btn=evt.which||evt.button;
		if ((btn!=1)||(navigator.userAgent.indexOf("Safari")!=-1)){
			var e=this.dcsEvt(evt,"A");
			if ((typeof(e.href)!="undefined")&&e.href){
				if ((typeof(e.protocol)!="undefined")&&e.protocol&&(e.protocol.indexOf("http")!=-1)){
					if ((typeof(e.pathname)!="undefined")&&this.dcsTypeMatch(e.pathname,this.downloadtypes)){
						var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
						var hn=e.hostname?(e.hostname.split(":")[0]):"";
            // Added custom code to set WT.ndl to 0 for PDFs, 20 for other file types
            if (e.pathname.substr(e.pathname.length-4)=='.pdf'){
              ndl='0';
            } else {
              ndl='20';
            }
            // End customization
						// Added custom parameter WT.ndl alongside WT.dl
						this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry","","WT.ti","RightClick:"+pth,"WT.dl","25","WT.ndl",ndl);
					}
				}
			}
		}
	}
}
// Code section for Track clicks to links leading offsite.
WebTrends.prototype.dcsOffsite=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    var pr=e.protocol||"";
		    if ((hn.length>0)&&(pr.indexOf("http")==0)&&!this.dcsIsOnsite(hn)){
			    var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
			    var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			    // Added custom parameter WT.ndl alongside WT.dl
			    this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",this.trimoffsiteparams?"":qry,"DCS.dcsref",window.location,"WT.ti","Offsite:"+hn+pth+(qry.length?("?"+qry):""),"WT.dl","24","WT.ndl","24","WT.nv",this.dcsNavigation(evt));
		    }
		}
	}
}

// Custom helper function to identify array
WebTrends.prototype.isArray=function(v){
	return (v instanceof Array);
}

// Custom function to determine whether node e is or is inside of a node of class n, where n is a string or array
WebTrends.prototype.dcsInClass=function(e, n){
  if (!this.isArray(n)) {
  	n = [n];
  }
  var b=0;
  while (b != 1) {
  	if (e.className) {
   	  var f = e.className.split(" ");
      for (var ni = 0; ni < n.length; ni++) {
      	for (var fi = 0; fi < f.length; fi++) {
      		if (f[fi] == n[ni]) {
      			b = 1;
      			return e;
      		}
      	}
      }
   	}
    e=e.parentElement||e.parentNode;
    if (!e) {
    	return false;
    }
  }
  return false;
}

// Custom function to return rank of node e among siblings of same type as e within ancestor node p
// This function requires the jQuery library. If the jQuery library is not present, it returns an empty string
// Rank is reported as the first link within the node with the same href attribute
WebTrends.prototype.dcsRankInNode=function(e, p){
  if (typeof(jQuery) == 'undefined') return '';
  if (p == e) {
  	return '';
  }
  var $links = $(p).find("a");
  for (i=0;i<$links.length;i++) {
    if ($links[i] == e) {
    	return i+1;
    }
  }
  return '';
}

// Custom event handler to capture all links of a given class when activated with WT.LinkTrackClass
WebTrends.prototype.dcsByClass=function(evt){
  if (this.linktrackclasses) {
    evt=evt||(window.event||"");
    if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
      var e=this.dcsEvt(evt,"A");
      if (e.href&&(parent=this.dcsInClass(e, this.linktrackclasses))){
        var hn=e.hostname?(e.hostname.split(":")[0]):"";
        var pr=e.protocol||"";
        if ((hn.length>0)&&(pr.indexOf("http")==0)){
          if (evt.preventDefault){
            evt.preventDefault();
            this.savehref=e.href;
          }
          var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
          var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
          var trim=true;
          var ttl="";
		      var text=document.all?e.innerText:e.text;
		      var img=this.dcsEvt(evt,"IMG");
		      if (img.alt){
		        ttl=img.alt;
		      }
		      else if (text){
		        ttl=text;
		      }
		      else if (e.innerHTML){
		        ttl=e.innerHTML;
		      }
          var rnk=this.dcsRankInNode(e, parent);
          var src = parent.className;
          // Added custom parameter WT.ndl alongside WT.dl
          this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",trim?"":qry,"WT.ti","Link:"+ttl,"WT.dl","1","WT.ndl","1","WT.nv",this.dcsNavigation(evt),"WT.z_rank",rnk,"WT.action","Link Click","WT.source",src,"WT.destination","Link:"+ttl);
          this.DCS.dcssip=this.DCS.dcsuri=this.DCS.dcsqry=this.WT.ti=this.WT.dl=this.WT.nv=this.WT.ndl=this.WT.z_rank="";
        }
      }
    }
  }
}

// Code section for Enable custom meta tag capture.
WebTrends.prototype.dcsMetaCap = function() {
    var elems;
    if (document.documentElement) {
        elems = document.getElementsByTagName("meta");
    }
    else if (document.all) {
        elems = document.all.tags("meta");
    }
    if (typeof (elems) != "undefined") {
        var names = this.dcsSplit(this.metanames);
        var nlen = names.length;
        var elen = elems.length;
        for (var i = 0; i < elen; i++) {
            var name = elems.item(i).name.toLowerCase();
            var content = elems.item(i).content;
            if ((name.length > 0) && (content.length > 0)) {
                for (var j = 0; j < nlen; j++) {
                    if (name == names[j]) {
                        this.DCSext["meta_" + names[j]] = content;
                        break;
                    }
                }
            }
        }
    }
}

WebTrends.prototype.dcsAdv=function(){
	if (this.trackevents&&(typeof(this.dcsET)=="function")){
		if (window.addEventListener){
			window.addEventListener("load",this.dcsET.wtbind(this),false);
		}
		else if (window.attachEvent){
			window.attachEvent("onload",this.dcsET.wtbind(this));
		}
	}
	this.dcsFPC();
	this.dcsAdSearch();
	this.dcsMetaCap();
}
WebTrends.prototype.dcsVar=function(){
	var dCurrent=new Date();
	var WT=this.WT;
	var DCS=this.DCS;
	WT.tz=parseInt(dCurrent.getTimezoneOffset()/60*-1)||"0";
	WT.bh=dCurrent.getHours()||"0";
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		if (window.RegExp){
			// Modified to use custom getHost method
			var tire=new RegExp("^"+window.location.protocol+"//"+this.getHost()+"\\s-\\s");
			WT.ti=document.title.replace(tire,"");
		}
		else{
			WT.ti=document.title;
		}
	}
	WT.js="Yes";
	WT.jv=(function(){
		var agt=navigator.userAgent.toLowerCase();
		var major=parseInt(navigator.appVersion);
		var mac=(agt.indexOf("mac")!=-1);
		var ff=(agt.indexOf("firefox")!=-1);
		var ff0=(agt.indexOf("firefox/0.")!=-1);
		var ff10=(agt.indexOf("firefox/1.0")!=-1);
		var ff15=(agt.indexOf("firefox/1.5")!=-1);
		var ff20=(agt.indexOf("firefox/2.0")!=-1);
		var ff3up=(ff&&!ff0&&!ff10&!ff15&!ff20);
		var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
		var nn4=(nn&&(major==4));
		var nn6up=(nn&&(major>=5));
		var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
		var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
		var ie5up=(ie&&!ie4);
		var op=(agt.indexOf("opera")!=-1);
		var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
		var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
		var op7up=(op&&!op5&&!op6);
		var jv="1.1";
		if (ff3up){
			jv="1.8";
		}
		else if (ff20){
			jv="1.7";
		}
		else if (ff15){
			jv="1.6";
		}
		else if (ff0||ff10||nn6up||op7up){
			jv="1.5";
		}
		else if ((mac&&ie5up)||op6){
			jv="1.4";
		}
		else if (ie5up||nn4||op5){
			jv="1.3";
		}
		else if (ie4){
			jv="1.2";
		}
		return jv;
	})();
	WT.ct="unknown";
	if (document.body&&document.body.addBehavior){
		try{
			document.body.addBehavior("#default#clientCaps");
			WT.ct=document.body.connectionType||"unknown";
			document.body.addBehavior("#default#homePage");
			WT.hp=document.body.isHomePage(location.href)?"1":"0";
		}
		catch(e){
		}
	}
	if (document.all){
		WT.bs=document.body?document.body.offsetWidth+"x"+document.body.offsetHeight:"unknown";
	}
	else{
		WT.bs=window.innerWidth+"x"+window.innerHeight;
	}
	WT.fv=(function(){
		var i,flash;
		if (window.ActiveXObject){
			for(i=15;i>0;i--){
				try{
					flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
					return i+".0";
				}
				catch(e){
				}
			}
		}
		else if (navigator.plugins&&navigator.plugins.length){
			for (i=0;i<navigator.plugins.length;i++){
				if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
					return navigator.plugins[i].description.split(" ")[2];
				}
			}
		}
		return "Not enabled";
	})();
	WT.slv=(function(){
		var slv="Not enabled";
		try{     
			if (navigator.userAgent.indexOf('MSIE')!=-1){
				var sli = new ActiveXObject('AgControl.AgControl');
				if (sli){
					slv="Unknown";
				}
			}
			else if (navigator.plugins["Silverlight Plug-In"]){
				slv="Unknown";
			}
		}
		catch(e){
		}
		if (slv!="Not enabled"){
			var i,m,M,F;
			if ((typeof(Silverlight)=="object")&&(typeof(Silverlight.isInstalled)=="function")){
				for(i=9;i>0;i--){
					M=i;
					if (Silverlight.isInstalled(M+".0")){
							break;
					}
					if (slv==M){
						break;
					}
				}
				for (m=9;m>=0;m--){
					F=M+"."+m;
					if (Silverlight.isInstalled(F)){
						slv=F;
						break;
					}
					if (slv==F){
						break;
					}
				}
			}
		}
		return slv;
	})();
	if (this.i18n){
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
		else{
			WT.le="unknown";
		}
	}
	WT.tv="9.3.0";
	WT.sp=this.splitvalue;
	// Adding custom parameter WT.ndl alongside WT.dl
	WT.ndl="0";
	WT.dl="0";
	WT.ssl=(window.location.protocol.indexOf('https:')==0)?"1":"0";
	DCS.dcsdat=dCurrent.getTime();
	// Modified to use custom getHost method
	DCS.dcssip=this.getHost();
	DCS.dcsuri=window.location.pathname;
	// Custom code to add trailing slash
	if (DCS.dcsuri.indexOf('.')==-1 && DCS.dcsuri.search(/\/$/)==-1) {
	  DCS.dcsuri=DCS.dcsuri+'/';
	}
	// End custom code
	WT.es=DCS.dcssip+DCS.dcsuri;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
	}
	if (DCS.dcsqry){
		var dcsqry=DCS.dcsqry.toLowerCase();
		var params=this.paidsearchparams.length?this.paidsearchparams.toLowerCase().split(","):[];
		for (var i=0;i<params.length;i++){
			if (dcsqry.indexOf(params[i]+"=")!=-1){
				WT.srch="1";
				break;
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
		}
	}
  // Custom parameters set for Nature
  this.WT.z_srchsubtype=this.getSearchSubtype();
}
WebTrends.prototype.dcsEscape=function(S, REL){
	if (REL!=""){
		S=S.toString();
		for (var R in REL){
 			if (REL[R] instanceof RegExp){
				S=S.replace(REL[R],R);
 			}
		}
		return S;
	}
	else{
		return escape(S);
	}
}
WebTrends.prototype.dcsA=function(N,V){
	if (this.i18n&&(this.exre!="")&&!this.exre.test(N)){
		if (N=="dcsqry"){
			var newV="";
			var params=V.substring(1).split("&");
			for (var i=0;i<params.length;i++){
				var pair=params[i];
				var pos=pair.indexOf("=");
				if (pos!=-1){
					var key=pair.substring(0,pos);
					var val=pair.substring(pos+1);
					if (i!=0){
						newV+="&";
					}
					newV+=key+"="+this.dcsEncode(val);
				}
			}
			V=V.substring(0,1)+newV;
		}
		else{
			V=this.dcsEncode(V);
		}
	}
	return "&"+N+"="+this.dcsEscape(V, this.re);
}
WebTrends.prototype.dcsEncode=function(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}
WebTrends.prototype.dcsCreateImage=function(dcsSrc){
	if (document.images){
		this.images[this.index]=new Image();
		this.images[this.index].src=dcsSrc;
		this.index++;
	}
	else{
		document.write('<img alt="" border="0" name="DCSIMG" width="1" height="1" src="'+dcsSrc+'">');
	}
}
WebTrends.prototype.dcsMeta=function(){
	var elems;
	if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	else if (document.all){
		elems=document.all.tags("meta");
	}
	if (typeof(elems)!="undefined"){
		var length=elems.length;
		for (var i=0;i<length;i++){
			var name=elems.item(i).name;
			var content=elems.item(i).content;
			var equiv=elems.item(i).httpEquiv;
			if (name.length>0){
				if (name.toUpperCase().indexOf("WT.")==0){
					this.WT[name.substring(3)]=content;
				}
				else if (name.toUpperCase().indexOf("DCSEXT.")==0){
					this.DCSext[name.substring(7)]=content;
				}
				else if (name.toUpperCase().indexOf("DCS.")==0){
					this.DCS[name.substring(4)]=content;
				}
			}
		}
	}
	// Custom code to capture tag directives from metatags
  if (this.WT.dirLinkTrackClass) {
  	this.linktrackclasses = this.WT.dirLinkTrackClass.split(" ");
  	this.WT.dirLinkTrackClass = '';
  }
}
WebTrends.prototype.dcsTag=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var WT=this.WT;
	var DCS=this.DCS;
	var DCSext=this.DCSext;
	var i18n=this.i18n;
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+(this.dcsid==""?'':'/'+this.dcsid)+"/dcs.gif?";
	if (i18n){
		WT.dep="";
	}
	for (var N in DCS){
 		if (DCS[N]&&(typeof DCS[N]!="function")){
			P+=this.dcsA(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]&&(typeof WT[N]!="function")){
			P+=this.dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]&&(typeof DCSext[N]!="function")){
			if (i18n){
				WT.dep=(WT.dep.length==0)?N:(WT.dep+";"+N);
			}
			P+=this.dcsA(N,DCSext[N]);
		}
	}
	if (i18n&&(WT.dep.length>0)){
		P+=this.dcsA("WT.dep",WT.dep);
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	this.dcsCreateImage(P);
	this.WT.ad="";
}
WebTrends.prototype.dcsDebug=function(){
	var t=this;
	var i=t.images[0].src;
	var q=i.indexOf("?");
	var r=i.substring(0,q).split("/");
	var m="<b>Protocol</b><br><code>"+r[0]+"<br></code>";
	m+="<b>Domain</b><br><code>"+r[2]+"<br></code>";
	m+="<b>Path</b><br><code>/"+r[3]+"/"+r[4]+"<br></code>";
	m+="<b>Query Params</b><code>"+i.substring(q+1).replace(/\&/g,"<br>")+"</code>";
	m+="<br><b>Cookies</b><br><code>"+document.cookie.replace(/\;/g,"<br>")+"</code>";
	if (t.w&&!t.w.closed){
		t.w.close();
	}
	t.w=window.open("","dcsDebug","width=500,height=650,scrollbars=yes,resizable=yes");
	t.w.document.write(m);
	t.w.focus();
}
WebTrends.prototype.dcsCollect=function(){
    if (this.enabled){
        this.dcsAdv();
        if (typeof(this.dcsCustom)=="function"){
			this.dcsCustom();
        }
        this.dcsTag();
    }
}

// Custom function to get window host
WebTrends.prototype.getHost=function(){
    host = window.location.hostname.toLowerCase();
    //if host starts with www.nature.com but also includes gateway domain (is longer than 14 char)
    if ((host.substr(0,14)=="www.nature.com")&&(host.length>14)) {
        this.DCSext.gateway=host.substr(14,host.length);
        //return trimmed version of host name
        return host.substr(0,14);
    } else {
        //else return full host
        return host;
    }
}

// Custom function to translate arbitrary values
WebTrends.prototype.getContentType=function(raw){
    if (typeof(raw)!="undefined") {
        // Check for values that should be translated to "Academic Journals"
        journals_list = "Acta Pharmacologica Sinica::The American Journal of Gastroenterology::The American Journal of Gastroenterology Supplements::American Journal of Hypertension::Asian Journal of Andrology::Blood Cancer Journal::Bone Marrow Transplantation::British Dental Journal::British Dental Journal Education::British Dental Journal Jobs::British Journal of Cancer::Cancer Gene Therapy::Cell Death & Disease::Cell Death and Differentiation::Cell Research::Cellular & Molecular Immunology::Clinical and Translational Gastroenterology::Clinical Pharmacology & Therapeutics::EMBO reports::European Journal of Clinical Nutrition::European Journal of Human Genetics::Evidence-Based Dentistry::Eye::Gene Therapy::Genes and Immunity::Heredity::Hypertension Research::Immunology and Cell Biology::International Journal of Impotence Research::International Journal of Obesity::The ISME Journal::Journal of Investigative Dermatology Symposium Proceedings::Journal of Cerebral Blood Flow & Metabolism::Journal of Exposure Science and Environmental Epidemiology::Journal of Human Genetics::Journal of Human Hypertension::Journal of Investigative Dermatology::Journal of Perinatology::Kidney International::Kidney International Supplements::Lab Animal::Laboratory Investigation::Leukemia::Leukemia Supplements::Modern Pathology::Molecular Psychiatry::Molecular Systems Biology::Molecular Therapy::Mucosal Immunology::Neuropsychopharmacology::Nutrition & Diabetes::Obesity::Oncogene::Oncogenesis::Polymer Journal::Prostate Cancer and Prostatic Diseases::Spinal Cord::SpinalCord::The EMBO Journal::The Journal of Antibiotics::Vital"
        journals_arr = journals_list.split('::');
        for (tarr in journals_arr) {
            if (raw.toUpperCase() == journals_arr[tarr].toUpperCase()) {
                return "Academic Journals";
            }
        }
        // Check for any other values that should be translated
        trans_list = "Nature=Nature::Nature a - z index=Product Navigation Pages::Nature Biotechnology=Nature Biopharma::Nature Cell Biology=Nature Life Sciences::Nature Chemical Biology=Nature Physical Sciences::Nature Chemistry=Nature Physical Sciences::Nature Genetics=Nature Life Sciences::Nature Geoscience=Nature Physical Sciences::Nature Immunology=Nature Life Sciences::Nature Jobs=Nature Jobs::Nature Materials=Nature Physical Sciences::Nature Medicine=Nature Biopharma::Nature Methods=Nature Methods and Protocols::Nature Methods | Application Notes=Nature Methods and Protocols::Nature Nanotechnology=Nature Physical Sciences::Nature Neuroscience=Nature Life Sciences::Nature News=Nature News::Nature Photonics=Nature Physical Sciences::Nature Physics=Nature Physical Sciences::Nature Protocols=Nature Methods and Protocols::Nature Reviews Cancer=Nature Reviews Life Sciences::Nature Reviews Cardiology=Nature Reviews Clinical Sciences::Nature Reviews Clinical Oncology=Nature Reviews Clinical Sciences::Nature Reviews Drug Discovery=Nature Biopharma::Nature Reviews Endocrinology=Nature Reviews Clinical Sciences::Nature Reviews Gastroenterology and Hepatology=Nature Reviews Clinical Sciences::Nature Reviews Genetics=Nature Reviews Life Sciences::Nature Reviews Immunology=Nature Reviews Life Sciences::Nature Reviews Microbiology=Nature Reviews Life Sciences::Nature Reviews Molecular Cell Biology=Nature Reviews Life Sciences::Nature Reviews Nephrology=Nature Reviews Clinical Sciences::Nature Reviews Neurology=Nature Reviews Clinical Sciences::Nature Reviews Neuroscience=Nature Reviews Life Sciences::Nature Reviews Rheumatology=Nature Reviews Clinical Sciences::Nature Reviews Urology=Nature Reviews Clinical Sciences::Nature Search=Product Navigation Pages::Nature Structural & Molecular Biology=Nature Life Sciences::Nature.com=Product Navigation Pages::Nature Climate Change=Nature Physical Sciences";
        trans_pairs = trans_list.split('::');
        for (tpair in trans_pairs) {
            tp = trans_pairs[tpair].split('=');
            if (raw.toUpperCase() == tp[0].toUpperCase()) {
                return tp[1];
            }
        }
    }
}

// Custom function to identify search subtype, i.e., Google Images vs. Google Scholar vs. Google Web
WebTrends.prototype.getSearchSubtype=function(){
    if (typeof(this.DCS.dcsref)!="undefined") {
        if (this.DCS.dcsref.indexOf('google.') > -1) {
            if (/images\.google\./.test(this.DCS.dcsref) || /\.google\..*\/(images|imgres|imghp|imglanding)/.test(this.DCS.dcsref)) {
                return 'Google Images';
            }
            if (/news\.google\./.test(this.DCS.dcsref) || /\.google\..*\/(nwshp|news)/.test(this.DCS.dcsref)) {
                return 'Google News';
            }
            if (/scholar\.google\./.test(this.DCS.dcsref) || /\.google\..*\/scholar/.test(this.DCS.dcsref)) {
                return 'Google Scholar';
            }
            if (/\.google\..*\/reader/.test(this.DCS.dcsref)) {
                return 'Google Reader';
            }
            if (/\.google\..*\/ig/.test(this.DCS.dcsref)) {
                return 'Google iGoogle';
            }
            if (/\.google\..*\/(search|url|wbhp|cse)/.test(this.DCS.dcsref) || /www\.google\.[^\/]+\/\?/) {
                return 'Google Web';
            }
            return 'Google Other';
        }          
        if (this.DCS.dcsref.indexOf('yahoo.') > -1) {
            return 'Yahoo';
        }
    }
    return '';
}

function dcsMultiTrack(){
	if (typeof(_tag)!="undefined"){
		return(_tag.dcsMultiTrack());
	}
}

function dcsDebug(){
	if (typeof(_tag)!="undefined"){
		return(_tag.dcsDebug());
	}
}

Function.prototype.wtbind = function(obj){
	var method=this;
	var temp=function(){
		return method.apply(obj,arguments);
	};
	return temp;
}