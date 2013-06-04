sst = {
	st: function(e,n){
		e.blur();
		var ul = e.parentNode.parentNode;
		var tc = e.parentNode.className;
		var tn = document.getElementById(n);
		sst.gc(ul.className,tn,"div")[0].style.display="none";
		sst.gc(tc,tn,"div")[0].style.display="";
		ul.className = tc;
	},
	gc: function(sC,n,t){
		if(n==null)n=document;			
		if(t==null)t='*';
		var cE=new Array();
		var els=n.getElementsByTagName(t);
		var elsLen=els.length;
		var p=new RegExp("(^|\\s)"+sC+"(\\s|$)");
		for(i=0,j=0;i<elsLen;i++){if(p.test(els[i].className)){cE[j]=els[i];j++;}}
		return cE;
	}	
};