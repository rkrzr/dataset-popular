$(function() {

  $('img[alt="front"]').each(function() {
    var frontA = $(this).parent();
    var frontDiv = frontA.parent();
    if (!frontDiv.hasClass("separator")) return;

    var backDiv = frontDiv.next();
    while (backDiv.find("img").length == 0) backDiv = backDiv.next();
    var backImg = backDiv.find("img:first");
    if (backImg.attr('alt') != "back") return;

    var backA = backImg.parent();
    backA.insertAfter(frontA);
    backDiv.remove();
    frontDiv.addClass("flipit");

  })

  $('.flipit').each(function() {
    var frontSecret = $(this).children('a:first-child');
    var backSecret = $(this).children('a:last-child');

    //frontSecret.attr('style', '');
    //backSecret.attr('style', '');

    frontSecret.css('display', 'block');
    backSecret.css('display', 'none');

    //$(this).children().each(function() {
    //  if (!($(this).is(frontSecret) || $(this).is(backSecret))) $(this).remove();
    //});

    var imageWidth = frontSecret.find('img').width();
    var imageHeight = frontSecret.find('img').height();

    var flipImage = $('<img style="position:relative;width:50px;height:35px;margin-left:' + (10 + imageWidth) + 'px;padding-left:2px;margin-bottom:' + -1 * imageHeight + 'px" src="http://www.postsecretcommunity.com/misc/flipit.png">');
    flipImage.insertBefore($(this));

    var showBack = function() {
      frontSecret.css('display', 'none');
      backSecret.css('display', 'block');
    };

    var showFront = function() {
      backSecret.css('display', 'none');
      frontSecret.css('display', 'block');
    };

    flipImage.click(function() {
      if (frontSecret.css('display') == 'none') showFront();
      else showBack();
    });

    frontSecret.mouseover(function() {
      showBack();
      flipImage.css('visibility', 'hidden');
    });

    backSecret.mouseout(function() {
      showFront();
      flipImage.css('visibility', 'visible');
    });

  });

  $('.post-body a').each(function() {
      var isFloat = false;
      if ($(this).css('float') == "left" && $(this).parent().hasClass('separator') && !$(this).parent().hasClass('flipit') &&
          $(this).parent().css('text-align') != "left") {
        isFloat = true;
      }
      //if (!$(this).parent().hasClass('separator')) {
      //  isFloat = false;
      //}
      var target = $(this).attr('href');
      if (target.indexOf('bp.blogspot.com') >= 0 && target.indexOf('1600-h') < 0) {
        //console.log($(this).attr('href'));

        if ($(this).css('display') == 'none') {
          $(this).css({ position: "absolute", visibility: "hidden", display: "block" });
        }

        var imageWidth = $(this).find('img').width();
        var imageHeight = $(this).find('img').height();

        if ($(this).css('visibility') == 'hidden') {
          $(this).css({ position: "", visibility: "", display: "none" });
        }


        var newDiv = $('<div style="display:none;position:relative;width:100px;height:' + (imageHeight) + 'px;margin-left:' + (8 + imageWidth - (isFloat ? 38 : 0)) + 'px;padding-left:2px;margin-bottom:' + (-1 * imageHeight) + 'px"></div>');

        var facebook_button = $('<a title="Share on Facebook" href="http://www.facebook.com/sharer.php?s=100&p[title]=PostSecret%20Sunday%20Secrets&p[summary]=Secret%20from%20PostSecret.com&p[url]=' + encodeURIComponent(target) + '&p[images][0]=' + target + '" target="_blank"><span style="margin-top:12px;background-image: url(http://www.postsecretcommunity.com/misc/ps_social_icons.png);background-position: 0px 0px; height: 24px; width: 24px;display: inline-block;"></span></a><br>');

        var twitter_button = $('<a href="https://twitter.com/share?text=I%20found%20this%20secret%20on%20PostSecret.com&url=' + encodeURIComponent(target) + '" title="Share on Twitter" target="_blank"><span style="background-image: url(http://www.postsecretcommunity.com/misc/ps_social_icons.png);background-position: -24px 0px; height: 24px; width: 24px;display: inline-block;"></span></a><br>');

        var pinterest_button = $('<a href="http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.postsecret.com%2F&media=' + encodeURIComponent(target) + '&description=Secret%20from%20PostSecret.com" title="Share on Pinterest" target="_blank"><span style="background-image: url(http://www.postsecretcommunity.com/misc/ps_social_icons.png);background-position: -48px 0px; height: 24px; width: 24px;display: inline-block;"></span></a><br>');

        var tumblr_button = $('<a href="http://www.tumblr.com/share/photo?source=' + encodeURIComponent(target) + '&caption=Secret%20from%20PostSecret.com&clickthru=' + encodeURIComponent(target) + '" title="Share on Tumblr" target="_blank"><span style="background-image: url(http://www.postsecretcommunity.com/misc/ps_social_icons.png);background-position: -72px 0px; height: 24px; width: 24px;display: inline-block;"></span></a><br>');

        var reddit_button = $('<a target="_blank" title="Share on Reddit" href="http://www.reddit.com/submit?url=' + encodeURIComponent(target) + '&title=Secret%20from%20PostSecret.com"><span style="background-image: url(http://www.postsecretcommunity.com/misc/ps_social_icons.png);background-position: -96px 0px; height: 24px; width: 24px;display: inline-block;"></span></a><br>');

        newDiv.append(facebook_button);
        newDiv.append(twitter_button);
        newDiv.append(pinterest_button);
        newDiv.append(tumblr_button);
        newDiv.append(reddit_button);


        if ($(this).parent().hasClass('flipit')) {
          if ($(this).is("a:last-child")) newDiv.insertBefore($(this).parent());
          else return;
        }
        else newDiv.insertBefore($(this));

        $(this).mouseover(function() {
              newDiv.css('display', 'block');
        });
        $(this).mouseout(function() {
              newDiv.css('display', 'none');
        });

        newDiv.mouseover(function() {
              newDiv.css('display', 'block');
        });
        newDiv.mouseout(function() {
              newDiv.css('display', 'none');
        });

      }
    });
});