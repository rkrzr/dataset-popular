function google_ad_request_done(google_ads) {
        var s = '', i;

        if(google_ads.length == 0) {
                return;
        };        
        
        if (google_ads[0].type == "html") {
                s += google_ads[0].snippet;
        } else { 
                //if (google_ads.length == 1) {
                //        s += renderGoogleTextAd(google_ads[0]);
                //} else if (google_ads.length > 1) {
                if(google_ads.length) {
                        s += '<div class="g_f"><a href=\"' + google_info.feedback_url + '\">Ads by Google</a></div>';
                        for(i = 0; i < google_ads.length; ++i) { 
                                s += renderGoogleTextAd(google_ads[i]);
                        };
                };
        };

        document.write(s);
        return;
};

function renderGoogleTextAd(g) {
        return '<div class="g_a"><a class="g_h" href="' +
                g.url + '">' +
                g.line1 + '</a><br /><span class="g_t">' +
                g.line2 + ' ' +
                g.line3 + '</span><br /><a class="g_l" href="' +
                g.url + '">' +
                g.visible_url + '</a></div>';
};  