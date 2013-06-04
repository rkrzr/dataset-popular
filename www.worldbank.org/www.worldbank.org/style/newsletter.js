function quickUserCheck()
{
	 if (document.Quick.emailid.value == "") 
	 {
    	     alert("Please Enter EMAIL ID");     
        	 document.Quick.emailid.focus();
	         return false;
          
	 }
	 else if(!validateEmail(document.Quick.emailid.value)) 
	 { 
          strError = "Enter a valid Email address "; 
          alert(strError); 
          document.Quick.emailid.focus();
          document.Quick.emailid.select();
          return false; 
	 }  

	    str   = new String(document.Quick.emailid.value);
    	atPos =  str.indexOf("@");
	    dotPos = str.indexOf(".");
    	if(str.substring(atPos+1,dotPos+1)==".")
	    {
               strError = "Enter a valid Email address "; 
               alert(strError); 
               return false;
	    }
		//Below two lines un commented in order to resolve NLR-208 : Anand
	 	 document.Quick.REQ_TYPE.value = "QUICK_USER";
 		// document.Quick.action = document.Quick.QUICK_USER.value;
	 	// document.Quick.submit();
}  
function validateEmail(email)
{

    if(email.length <= 0)
	{
	  return true;
	}
    var splitted = email.match("^(.+)@(.+)$");
    if(splitted == null) return false;
    if(splitted[1] != null )
    {
      var regexp_user=/^\"?[\w-_\.]*\"?$/;
      if(splitted[1].match(regexp_user) == null) return false;
    }
    if(splitted[2] != null)
    {
      var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
      if(splitted[2].match(regexp_domain) == null) 
      {
	    var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
	    if(splitted[2].match(regexp_ip) == null) return false;
      }// if
      return true;
    }
return false;
}
 