
	function rolloverOn(e,s) {
		var imgName = "resources/images/home/" + s + "_on.gif";
		e.src = imgName;
	}
	
	function rolloverOff(e,s) {
		var imgName = "resources/images/home/" + s + "_off.gif";		
		e.src = imgName;		
	}	

	

	function subRolloverOvr(e,s) {
		var imgName = "resources/images/home/" + s + "_ovr.gif";
		e.src = imgName;
	}
	
	function subRolloverOff(e,s) {
		var imgName = "resources/images/home/" + s + "_off.gif";		
		e.src = imgName;		
	}

    function jsCheck(form){
		document.getElementById("err_msg").innerHTML="";
		var flag = new Boolean(true);
		if(form.name=='install_form')
		{
			var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
			if(regex.test(form.email1.value)==false){
				document.getElementById("err_msg").innerHTML+="<p>Invalid email.</p>";
				flag=false;
			}
			if(form.name1.value=='')
			{
				document.getElementById("err_msg").innerHTML+="<p>Name required.</p>";
				flag=false;
			}
			return flag;
		}
	}
	