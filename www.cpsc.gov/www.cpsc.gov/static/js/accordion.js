$(document).ready(function () {
	$('#railAccordion a.heading').click(function () {
		$(this).css('outline','none');
		if($(this).parent().hasClass('current')) {
			$(this).siblings('ul').slideUp('slow',function () {
				$(this).parent().removeClass('current');
			});
		} else {
			$('#railAccordion li.current ul').slideUp('slow',function () {
				$(this).parent().removeClass('current');
			});
			$(this).siblings('ul').slideToggle('slow',function () {
				$(this).parent().toggleClass('current');
			});
		}
		return false;
	});
});