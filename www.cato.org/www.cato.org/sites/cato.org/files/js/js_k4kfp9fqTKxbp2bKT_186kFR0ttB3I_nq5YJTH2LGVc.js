(function($) {
  Drupal.behaviors.smoothScroll = {
    attach: function(context, settings) {
      $('#content').localScroll({
        hash: true,
        duration: 300
      });
    }
  }
})(jQuery);;
(function ($) {
  Drupal.behaviors.dialogConfig = {
    attach:function (context, settings) {
      $('.dialog-source').dialog({ autoOpen:false });
      $('.dialog-inline').click(function() {
        $($(this).attr('rel')).dialog('open');
      });
      $('.dialog-external').click(function () {
        var $dialog = $('<div></div>').load($(this).attr('href'));
        $($dialog).dialog({
          title:$(this).attr('title')
        });
        return false;
      });
    }
  }
})(jQuery);;
