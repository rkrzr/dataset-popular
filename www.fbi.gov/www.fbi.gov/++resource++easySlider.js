(function($) {

$.fn.randomize = function(childElem) {
  return this.each(function() {
      var $this = $(this);
      var elems = $this.children(childElem);

      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      $this.remove(childElem);  

      for(var i=0; i < elems.length; i++)
        $this.append(elems[i]);      

  });    
}
})(jQuery);

(function($) {
  $.fn.easySlider = function(options){
    var defaults = {      
      prevId : 'prevBtn',
      nextId : 'nextBtn',  
      firstId : 'firstBtn',
      lastId : 'lastBtn',  
      vertical : false,
      speed : 800,
      odd_speed : 0,
      auto : false,
      pause : 2000,
      odd_pause : 0,
      continuous : false,
      goToButtonId : 'goToButton',
      goToRotateAmount : 8,
      effect : 'Slide',
      navigation_type : 'Navigation Buttons',
      fadeNavigation : false,
      navigation_buttons_rendering_type : 'standard',
      resume_play : false,
      randomize: false,
      hoverPause: true
    }; 
    
    var options = $.extend(defaults, options);  
        
    this.each(function() {
      var obj = $(this);
      var locked = false; // lock while moving.
      var container = obj.parent();
      var slide = $("li.slide", container);
      var slides = slide.length;
      var width = slide.width(); 
      var height = slide.height(); 
      var timeout;
      var timer_activated = options.auto; 
      obj.css("overflow","hidden");
      var total_slides = slides-1;
      var current_slide = 0;
      var next_action = function(){};
      var trying = false;
      var skipped_navigation = [];
      var trytimeout;
      var important_job = false;
      
      /* before we even start, let's randomize if specified */
      if(options.randomize){
        $("ul.slider-list", container).randomize("li.slide");
      }

      $("ul.slider-list", container).css('width',slides*width);
      if(!options.vertical){ $("li.slide", container).css('float','left'); }
      if(options.effect == "Crossfade") {
          //Prepare crossfader - stack slides on top of one another
          $("li.slide", container).addClass('crossfade');
          //Place first slide on top of all others
          $("li.slide:first-child", container).addClass('crossfade-current');
      }
      
      //Navigation...
      if(options.navigation_type != "No Buttons"){
        var html = '';
        if(options.navigation_type == "Navigation Buttons"){
          html += "<div id='easySlider-goToButtons'>";
          html += ' <span id="leftb"><a class="leftright" href=\"javascript:void(0);\">&nbsp</a></span>';
          var count = 1;
          for(var i=0; i < total_slides+1; i++){ 
            var add = true;
            if((options.navigation_buttons_rendering_type == 'skip_even' && i % 2 == 1) ||
                  options.navigation_buttons_rendering_type == 'skip_odd' && i % 2 == 0){
              add = false;
              skipped_navigation.push(i);
            }
            if(add){
              html += "<a class=\"nav-button\" id=\"" + options.goToButtonId + i + "\" href=\"javascript:void(0);\">" + count + "</a> ";
              count++;
            }
          }
          html += ' <span id="rightb"><a class="leftright" href=\"javascript:void(0);\">&nbsp</a></span>';
          html += '<div id="pauseplay"></div>';
          html += "</div>";
        } else if(options.navigation_type.indexOf("Bullets") >= 0){
          html += "<div id='easySlider-goToButtons' class='easySlider-goToBullets'>";
          var count = 1;
          for(var i=0; i < total_slides+1; i++){ 
            var add = true;
            if((options.navigation_buttons_rendering_type == 'skip_even' && i % 2 == 1) ||
                  options.navigation_buttons_rendering_type == 'skip_odd' && i % 2 == 0){
              add = false;
              skipped_navigation.push(i);
            }
            if(add){
              html += "<a class=\"nav-button\" id=\"" + options.goToButtonId + i + "\" href=\"javascript:void(0);\">" + "•" + "</a> ";
              count++;
            }
          }
          html += "</div>";
          html += '<span class=\"easybutton\" id="'+ options.prevId +'"><a href=\"javascript:void(0);\">&nbsp</a></span>';
          html += '<span class=\"easybutton\" id="'+ options.nextId +'"><a href=\"javascript:void(0);\">&nbsp</a></span>';
        } else if(options.navigation_type.indexOf("Big") >= 0){
          html += ' <span id="'+ options.prevId +'"><a href=\"javascript:void(0);\">&nbsp</a></span>';
          html += ' <span id="'+ options.nextId +'"><a href=\"javascript:void(0);\">&nbsp</a></span>';
        } else if(options.navigation_type.indexOf("Small") >= 0){
          html += "<div id='smallButtons'>";
          html += ' <span id="'+ options.prevId +'"><a href=\"javascript:void(0);\">&nbsp</a></span>';
          html += ' <span id="'+ options.nextId +'"><a href=\"javascript:void(0);\">&nbsp</a></span>';
          html += "</div>";
        }
        $(obj).after(html);      
        
        //Put buttons on top of stack for crossfader
        if(options.effect == "Crossfade") { 
            $("#slider-container #easySlider-goToButtons, \
               #slider-container #smallButtons").addClass('crossfade-navigation');
        }
      };
      //end nav
          
      $(document).trigger('initSlider', [obj]);
          
      if($.inArray(current_slide, skipped_navigation) != -1){
        current_slide++;
        if(options.vertical){
          $("ul.slider-list").css('marginTop', -height);
        }else{
          $("ul.slider-list").css('marginLeft', -width);
        }
      }
          
      function try_action(){
        trying = true;
        trytimeout = setTimeout(function(){
          if(locked){
            try_action();
          }else if(next_action != null){
            important_job = false;
            next_action();
            next_action = null;
            trying = false;
          }
        }, 100);
      }
          
      function schedule(func, important){
        if(important_job){//currently doing important job, ignore schedule
          return;
        }
        if(important != undefined && important){
          important_job = true;
        }
        next_action = func;
        if(locked){
          if(!trying){
            try_action();
          }
        }else if(!trying){
          func();
          next_action = null;
          important_job = false;
        }
      }
      
      function animate_callback(dir, clicked){
        if($.inArray(current_slide, skipped_navigation) != -1){
          schedule(function(){ animate(dir, clicked, container); });
        }
        locked = false;
        $(document).trigger('endSlideTo', [obj, current_slide]);
      }
      
      $("a","#"+options.nextId, container).click(function(){    
        schedule(function(){ animate("next",true, container); }, true);
      });
      $("a","#"+options.prevId, container).click(function(){    
        schedule(function(){ animate("prev",true, container); }, true);
      }); 
      $("span#leftb a", container).click(function(){    
        schedule(function(){ animate("prev",true, container); }, true);
      });
      $("span#rightb a", container).click(function(){   
        schedule(function(){ animate("next",true, container); }, true);
      });
      $("a","#"+options.firstId, container).click(function(){   
        schedule(function(){ animate("first",true, container); }, true);
      });       
      $("a","#"+options.lastId, container).click(function(){    
        schedule(function(){ animate("last",true, container); }, true);
      }); 
      $("div#easySlider-goToButtons a:not(.leftright)", container).click(function(){
        var number = parseInt($(this).attr('id').substring(options.goToButtonId.length));
        schedule(function(){ animate(number, true, container); }, true);
      });
      
      if(options.navigation_type == "Navigation Buttons" || options.navigation_type == "Navigation Bullets"){
        $("#" + options.goToButtonId + "0", container).addClass('active');
      }
      
      function update_goToButtons(btns){
        if(btns.size() > options.goToRotateAmount){
          /* swap out buttons so it only shows the amount of buttons in the configuration */
          var min = Math.max(current_slide - Math.floor(options.goToRotateAmount/2), 0);
          var max = Math.min(current_slide + Math.floor(options.goToRotateAmount/2), btns.size());
          var diff = max - min;
          if(diff != options.goToRotateAmount){
            min = Math.max(min - (options.goToRotateAmount - diff), 0);
          }
          diff = max - min;
          if(diff != options.goToRotateAmount){
            max = Math.min(max + (options.goToRotateAmount - diff), btns.size());
          }
        
          for(var i = 0; i < min; i++){
            $("#" + options.goToButtonId + i, container).hide();
          }
          for(var i = min; i < max; i++){
            $("#" + options.goToButtonId + i, container).show();
          }
          for(var i = max; i < btns.size(); i++){
            $("#" + options.goToButtonId + i, container).hide();
          }
        }
      }
      
      update_goToButtons($("div#easySlider-goToButtons a:not(.leftright)", container));
      
      function getPause(){
        var pause = options.pause;
        if(current_slide % 2 == 0 && options.odd_pause != 0){
          pause = options.odd_pause;
        }
        return pause;
      }

      if(options.hoverPause){
          $('#slider').mouseenter(function(){ 
            animate("stop", true);
          });
          $('#slider').mouseleave(function(){
            if (options.continuous){
              animate("next",false);
            } else {
              animate("next",true);
            }
          });
        }

      function animate(dir, clicked, container){
        locked = true;
        var previous_slide = current_slide;       
        /* This can all get tricky depending on what nav
           are hidden now */
        switch(dir){
          case "next":
            if(previous_slide >= total_slides){
              if(options.continuous){ current_slide = 0; }
              else{ current_slide = total_slides; }
            }else{
              current_slide++;
            }
            if($.inArray(current_slide, skipped_navigation) != -1){
              if(current_slide == total_slides){
                if($.inArray(0, skipped_navigation) != -1){
                  current_slide = 1;
                }else{
                  current_slide = 0;
                }
              }else{
                current_slide++;
              }
            }
            break; 
          case "prev":
            if(current_slide<=0){
              if(options.continuous){ current_slide = total_slides; }
              else{ current_slide = 0; }
            }else{
              current_slide--;
            }
            if($.inArray(current_slide, skipped_navigation) != -1){
              if(current_slide == 0){ 
                if($.inArray(total_slides, skipped_navigation) != -1){
                  current_slide = total_slides-1;
                }else{
                  current_slide = total_slides
                }
              }else{
                current_slide--;
              }
            }
            break; 
          case "first":
            current_slide = 0;
            break; 
          case "last":
            current_slide = total_slides;
            break; 
          case "stop":
            break;
          default:
            if(typeof(dir) == "number"){
              current_slide = dir;
            }
            break; 
        };  
        
        if((options.navigation_type == "Navigation Buttons" || options.navigation_type == "Navigation Bullets") && $.inArray(current_slide, skipped_navigation) == -1){
          var btns = $("div#easySlider-goToButtons a:not(.leftright)", container);
          btns.removeClass("active");
          $("#" + options.goToButtonId + current_slide, container).addClass('active');
          update_goToButtons(btns);
        }
        
        $(document).trigger('startSlideTo', [obj, current_slide]);
        
        var diff = Math.abs(previous_slide-current_slide);
        var position = (current_slide*width*-1);
        if(options.vertical){
          position = (current_slide*height*-1);
        }

        var speed = options.speed;
        if(current_slide % 2 == 0 && options.odd_speed != 0){
          speed = options.odd_speed;
        }
        
        if(diff != 0){//Only run it if it's moving to another slide.
          if(options.effect == "Slide"){
            var callback = function(){ animate_callback(dir, clicked); };
            
            if(options.continuous && dir == "next" && current_slide < previous_slide){
              // This is the case when we don't want to do a rewind slide on the
              // last slide. To do this, we move around the slides so we can slide on
              // plane correctly
              var last = $("ul.slider-list li.slide:gt(" + (previous_slide-1) + ")", container);
              var margin = "marginLeft";
              var variance = width;
              if(options.vertical){
                margin = "marginTop";
                variance = height;
              }
              variance = variance * last.size();
              last.insertBefore("ul.slider-list li.slide:first", container);
              $("ul.slider-list").css(margin, 0);
              callback = function(){
                last.insertAfter("ul.slider-list li.slide:last", container);
                $("ul.slider-list").css(margin, position+variance);
                animate_callback(dir, clicked);
              }
              position -= variance;
            }else if(options.continuous && dir == "prev" && current_slide > previous_slide){
              var first = $("ul.slider-list li.slide:lt(" + (previous_slide+1) + ")", container);
              var slider_size = (total_slides*width)+width;
              var margin = "marginLeft";
              var variance = width;
              if(options.vertical){
                slider_size = (total_slides*height)+height;
                margin = "marginTop";
                variance = height;
              }
              variance = variance*first.size();
              first.insertAfter("ul.slider-list li.slide:last", container);
              $("ul.slider-list").css(margin, (slider_size*-1)+(variance/first.size()));
              callback = function(){
                first.insertBefore("ul.slider-list li.slide:first", container);
                $("ul.slider-list").css(margin, position-variance);
                animate_callback(dir, clicked);
              }
              position += variance;
            }else{
              speed = (diff*speed)/diff;
            }
            
            if(!options.vertical) {
              $("ul.slider-list",container).animate({ 
                  marginLeft: position
              }, speed, callback);        
            } else {
              p = (current_slide*height*-1);
              $("ul.slider-list",container).animate({ 
                marginTop: position 
              }, speed, callback);          
            }
            
          }else if(options.effect == "Fade"){
            var margin = "marginLeft";
            if(options.vertical){ 
              margin = "marginTop"; 
            }

            $("ul.slider-list", container).fadeOut(Math.ceil(speed/2), function(){
              $(this).css(margin, position).fadeIn(Math.ceil(speed/2), function(){ animate_callback(dir, clicked); });
            });
            
          }else if(options.effect == "Crossfade"){
            
            var next = $("ul.slider-list li.slide:eq(" + current_slide + ")", container);
            var previous = $("ul.slider-list li.slide:eq(" + previous_slide + ")", container);
            
            //Raise next slide in preparation
            $(next).addClass('crossfade-next');
            //Fade out previous slide to next slide underneath
            $(previous).fadeOut(Math.ceil(speed), function(){
               //Place next slide above all others
               $(next).addClass('crossfade-current').removeClass('crossfade-next');
               //Return previous slide to regular position and show in background
               $(this).removeClass('crossfade-current').show();
               animate_callback(dir, clicked);
            });
          }
        }
        
        if(!options.continuous){          
          if(current_slide==total_slides){
            $("a","#"+options.nextId, container).hide();
            $("a","#"+options.lastId, container).hide();
          } else {
            $("a","#"+options.nextId, container).show();
            $("a","#"+options.lastId, container).show();          
          };
          if(current_slide==0){
            $("a","#"+options.prevId, container).hide();
            $("a","#"+options.firstId, container).hide();
          } else {
            $("a","#"+options.prevId, container).show();
            $("a","#"+options.firstId, container).show();
          };          
        };        
        
        if(clicked){ 
          clear_timer(); 
        }
        if((timer_activated && dir=="next" && !clicked) || options.resume_play){
          set_timer(speed+getPause());
        }
      };
      
      function set_timer(duration){
        timeout = setTimeout(function(){
          if(locked){
            set_timer(100);
          }else if(!trying){
            animate("next",false, container);
          }
        }, duration);
        timer_activated = true;
        $('div#pauseplay', container).addClass('pause').removeClass('play');
      }
      
      function clear_timer(){
        clearTimeout(timeout);
        clearTimeout(trytimeout);
        timer_activated = false;
        $('div#pauseplay', container).addClass('play').removeClass('pause');
      }

      if(options.fadeNavigation){
        var selector = "div#smallButtons,div#easySlider-goToButtons,#" + options.prevId + ",#" + options.nextId;
        container.hover(function(){
          $(selector, container).fadeIn('fast');
        }, function(){
          $(selector, container).fadeOut();
        });
      }

      $('div#pauseplay', container).click(function(){
        if(timer_activated){
          clear_timer();
        }else{
          set_timer(getPause());
        }
      });
          
      // init
      if(timer_activated){
        set_timer(getPause());
        $('div#pauseplay', container).addClass('pause');
      }else{
        $('div#pauseplay', container).addClass('play');
      }
      
      if(!options.continuous){          
        $("a","#"+options.prevId, container).hide();
        $("a","#"+options.firstId, container).hide();       
      }
    });
  }
})(jQuery);


