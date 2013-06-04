if (document.getElementById) {
  var toggle_opened = new Image();
  var toggle_closed = new Image();
  // pre-loading the images
  toggle_opened.src = 'http://img1.blogblog.com/img/triangle_open.gif';
  toggle_closed.src = 'http://img2.blogblog.com/img/triangle_ltr.gif';
  document.write(['<style type="text/css">',
                '.comment-toggler {',
                'background:url(',
                toggle_closed.src,
                ') no-repeat left center;',
                'padding-right:11px;',
                'margin-right:0.1em;',
                'cursor:pointer;',
                'cursor:hand;',
                '}',
                '#blogger-dcom-block dd {',
                'display:none;',
                'margin-top:1em;',
                'padding-left:14px;',
                'margin-left:0.4em;',
                '}',
                '</style>'].join(''));

  // Register old onmousedown function
  var BL_oldonmousedown = document.onmousedown;

  document.onmousedown = function(e) {

    var shouldPropagate = true;

    var target = window.event ? window.event.srcElement : e.target;

    if (target.className == 'comment-toggler') {
      var dt = target.parentNode;
      var dd = dt.nextSibling;

      while (dd.tagName != 'DD') {
        dd = dd.nextSibling;
      }

      if (dd.style.display == 'block') {
        dd.style.display = 'none';
        target.style.backgroundImage = 'url(' + toggle_closed.src + ')';
      } else {
        dd.style.display = 'block';
        target.style.backgroundImage = 'url(' + toggle_opened.src + ')';
      }
      shouldPropagate = false;
    }
    // call old onmousedown function if registered
    if (typeof window.BL_oldonmousedown == 'function') {
      return window.BL_oldonmousedown(e);
    }
    return shouldPropagate;
  };
}

