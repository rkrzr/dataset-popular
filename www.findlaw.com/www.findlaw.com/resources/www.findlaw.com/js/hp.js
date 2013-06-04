$(document).ready(function(){
    $('a#advSearchLink').click(function() {
        $('#advSearchContent').slideToggle('fast');
        return false;
    });
	$('.hidejs').show();
});
/* Temporarily hide the "tabber" class so it does not "flash"
   on the page as plain HTML. After tabber runs, the class is changed
   to "tabberlive" and it will appear. */
document.write('<style type="text/css">.tabber{display:none;}<\/style>');