webmd.m.newsletter = window.webmd.m.newsletter || {};

webmd.m.newsletter.one_click = {
	timer: function(){},
    init: function(){
        var self = this,
            $form = $('div.newsletterThurii_rdr').find('form'),
            $email = $form.find('input#newsletter_email'),
            $cbs = $form.find('input:checkbox[name=nls]'),
			$privacy = $form.find('input:checkbox[name=privacy]'),
			$submit = $form.find('button[name=newsletter_submit]');

		if(webmd.status && webmd.status.reg === false && !webmd.cookie.exists('ignoremaint')){
			$form.before('<div class="reg_down">This feature is currently unavailable.  The site is undergoing routine maintenance and will be back shortly.</div>').remove();
			$('.enhanced_nl_link').remove();
			return false;
		}
		
        $email.bind('focus', function(){
           if($(this).val() === 'Enter Email Address'){
               $(this).val('');
           }
        });

        $email.bind('blur', function(){
           if($(this).val() === ''){
               $(this).val('Enter Email Address');
           }
        });
		
		$privacy.click(function(){
			if($(this).is(':checked')){
				$(this).removeClass('error');	
			}
			else{
				$(this).addClass('error');	
			}
		});

        $form.attr('onsubmit', '').unbind('submit').submit(function(){
			$email.removeClass('error');
			$privacy.removeClass('error');
            if($cbs.filter(':checked').length < 1){
                self.displayMsg("Please select a newsletter.");
                return false;
            }

            if(($email.val()) === '' || ($email.val() === 'Enter Email Address')){
                self.displayMsg("Please enter your email address.");
                $email.focus().addClass('error');
                return false;
            }

            if(!/^\s*[a-z0-9\._%+-]+@[-a-z0-9\.]+\.[a-z]{2,4}\s*$/i.test($email.val())){
                self.displayMsg("Please check that you entered a valid email address.");
                $email.focus().addClass('error');
                return false;
            }
			
			if (!$privacy.filter(':checked').length) {
				self.displayMsg('Please acknowledge your agreement.');
				$privacy.addClass('error');
				return false;
			}

            self.submitForm();

            return false;
        });
    },

    displayMsg: function(msg){
        $elem = $('.newsletterThurii_rdr p.newsletterError');
        if(msg){
            $elem.hide();
            $elem.html(msg).fadeIn('slow');
        }
    },

    submitForm: function(){
        var self = this, data, nls, omnitureLink, privacy,
            cb_total_count = 0,
            cb_current_count = 0,
            $form = $('div.newsletterThurii_rdr').find('form'),
            $email = $form.find('input#newsletter_email'),
            $cbs = $form.find('input:checkbox[name=nls]'),
			$privacy = $form.find('input:checkbox[name=privacy]'),
			$submit = $form.find('button[name=newsletter_submit]');

        self.timer = $form.data('timer');
        if(self.timer){
            clearTimeout(self.timer);
        }
        self.timer = setTimeout(function(){
			self.displayMsg("This feature is temporarily unavailable. Please try again later.");
			$privacy.parent().remove();
			$email.remove();
			$submit.remove();
			$('.enhanced_nl_link').remove();
            wmdPageLink('reg-error_l-nl');
        }, 15000);
        $form.data('timer', self.timer);
		
		// set privacy value
		if($privacy.is(':checked')){
			privacy = 1;
		}
		else{
			privacy = 0;
		}
        
        data = {
            nls: '',
            email: $email.val(),
			privacy_policy_accept: privacy
        };
        
        $cbs.filter(':checked').each(function(){
            var nl = $(this).val();
            if(data.nls) {
                data.nls += ',';
            }
            data.nls += nl;
        });

        $.getJSON('https://' + window.location.hostname + '/api/reg/regapi.svc/jsonp/subscribe?callback=?', data, function(o){
            self.jsonResponse(o);
        });

        // onclick="wmdPageLink('nl-multi_0-4')"
        $('.multi_nl_cb').each(function(){
            cb_total_count++;
            if($(this).is(':checked')){
                cb_current_count++;
            }
        });

        wmdPageLink('nl-multie_' + cb_current_count + '-' + cb_total_count);
    },

    jsonResponse: function(o){
        var self = this,
            $form = $('div.newsletterThurii_rdr').find('form'),
            $email = $form.find('input#newsletter_email');

        self.timer = $form.data('timer');
        if(self.timer){
            clearTimeout(self.timer);
        }

        if(o && o.d && o.d.stat === 'success'){
            $form.hide();
            $(".enhanced_nl_link").hide();
            $('.newsletterThurii_rdr h4').hide();
            $('.newsletterThurii_rdr h5').hide();			
            $('.newsletterThurii_rdr p').hide();

            $('.newsletterThurii_rdr h4').html("Thank You").fadeIn('slow');
			$('.newsletterThurii_rdr h6.thanks').html("for Signing Up").fadeIn('slow');
            $('.newsletterThurii_rdr p').removeClass('newsletterError').html("<strong>" + $email.val() + "</strong>, you\'ll receive your first newsletter with our next scheduled circulation!").fadeIn('slow');
            $('.newsletterThurii_rdr .wrapper form').after("<a onclick=\"return sl(this,\'nw\',\'nl-multie_c\')\" href=\"https://member.webmd.com/newsletters/my-newsletters.aspx\">Want more health topics? Click here.</a>");

			//Fade in does not work with iPad; show messaging incase it didnt display yet
            $('.newsletterThurii_rdr h4').show();
            $('.newsletterThurii_rdr p').show();

            if(o.d.code === 3){
                wmdPageLink('reg-success_l-nl');
            }
        } else {
            self.displayMsg("We\'re sorry: an error occurred. <a href=\"https://member.webmd.com/newsletters/newsletters.aspx\" title=\"Subscribe to newsletters\">Click here</a> for newsletters.");
            wmdPageLink('reg-error_l-nl');
        }
    }
}

$(function(){
    webmd.m.newsletter.one_click.init();
});
