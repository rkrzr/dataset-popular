                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}



(function $vpfn_MGZG$yuJzCTFH8L55Z_rHw5$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
function SlideShow($el,options)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;


var _$el=$el;


var _$listItems;


var _$list;


var _timer;


var _animating=false;

var _numberOfSlides=0;
var _currentSlide=0;
var _paused=false;

this.startIndex=0;
this.frameSpeed=4000;
this.animationSpeed=1000;
this.animationType="fade";

var init=function $vpfn_kiJRwQgl647NOL$EA8xSGQ35$19(options)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_paused=false;

if(options)
{
me.frameSpeed=options.frameSpeed||me.frameSpeed;
me.animationSpeed=options.animationSpeed||me.animationSpeed;
me.animationType=options.animationType||me.animationType;
}


_$el.data("SlideShow",me);

_$listItems=_$el.find("ul.vpslideshow-slides > li");
_$list=_$el.find("ul.vpslideshow-slides");


_numberOfSlides=_$listItems.length;


_$listItems.hide();


if(options.length)
{
me.startIndex=options.startIndex;
}


lazyload(me.startIndex);
getLiForSlide(me.startIndex).show();

_$list.removeClass("vpslideshow-init");

_$el
.addClass("vpslideshow")
.addClass("vpslideshow-slide-"+me.startIndex)
.addClass("vpslideshow-playing");

lazyload((me.startIndex==_numberOfSlides-1)?0:(me.startIndex+1));

_$el.find(".slidebutton").each(function $vpfn_MGZG$yuJzCTFH8L55Z_rHw77$43(index)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$(this).click(function $vpfn_MGZG$yuJzCTFH8L55Z_rHw79$30(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.skipTo(index);
e.preventDefault();
});
});

_$el.find(".playpause").click(function $vpfn_MGZG$yuJzCTFH8L55Z_rHw85$42(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.pause();
e.preventDefault();
});


_$el.on("swipeleft",_.debounce(swipeleftHandler,50));

_$el.on("swiperight",_.debounce(swiperightHandler,50));

detectFrameSize();

showFirstSlide();
};

var swipeleftHandler=function $vpfn_1BqF8SjLJrKit$T2xAiW6g100$31(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.pause(true);
me.move(true,"slideLeft","fast");
};

var swiperightHandler=function $vpfn_IVEd_i2fC97YdVoOSBsxuQ106$32(e)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.pause(true);
me.move(false,"slideRight","fast");
};

var detectFrameSize=function $vpfn_QtMq_AZP3vUEQhw6nE$P5w112$30()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}


var $firstItem=_$listItems.first();
me.frameSize={
width:$firstItem.outerWidth(true),
height:$firstItem.outerHeight(true)
};

if(me.frameSize.height===0||me.frameSize.width===0)
{
setTimeout(100,detectFrameSize);
return;
}

_$el.css(me.frameSize);
};

var showFirstSlide=function $vpfn_AdBJHog7dA6Nt3r$UgysUA131$29()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_currentSlide=me.startIndex;

if(_numberOfSlides>1)
{
window.setTimeout(
function $vpfn_MGZG$yuJzCTFH8L55Z_rHw138$20(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}advance();},
me.frameSpeed);
}
else
{
me.pause(true);
}
};

var getLiForSlide=function $vpfn_82t5OCsevY4AEc66kY5ucQ147$28(slideIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return $(_$listItems[slideIndex]);
};

this.move=function $vpfn_W873hwkVCkEbQJk6NTG85g152$20(forward,animationType,animationSpeed)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

if(typeof forward=="undefined")
{
forward=true;
}

if(typeof animationType=="undefined")
{
animationType=me.animationType;
}

if(typeof animationSpeed=="undefined")
{
animationSpeed=me.animationSpeed;
}



var newSlideIndex=0;

if(forward)
{
newSlideIndex=(_currentSlide==_numberOfSlides-1)?0:_currentSlide+1;
}
else
{
newSlideIndex=(_currentSlide===0)?_numberOfSlides-1:_currentSlide-1;
}

var slidePair=moveTo(newSlideIndex);

_animating=true;





var animationPromise;

if(animationType=="slideLeft"||
animationType=="slideRight")
{




var showObjStartLeft=animationType=="slideLeft"?
me.frameSize.width:
-me.frameSize.width;

var newSlidePromise=slidePair.newSlide
.addClass("top")
.css({left:showObjStartLeft})
.show()
.animate({left:0},animationSpeed)
.promise();

var currentSlidePromise=slidePair.currentSlide
.addClass("top")
.show()
.animate(
{left:-showObjStartLeft},
animationSpeed
)
.promise();

animationPromise=$.when(newSlidePromise,currentSlidePromise);
}
else
{



animationPromise=slidePair.newSlide
.addClass("top")
.fadeIn(me.animationSpeed)
.promise();
}

animationPromise.done(
function $vpfn_MGZG$yuJzCTFH8L55Z_rHw234$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
slidePair.newSlide.show().removeClass("top").css({left:0});
slidePair.currentSlide.hide().removeClass("top").css({left:0});

_animating=false;
});
};

var cancelCurrentAnimation=function $vpfn_EI1EuVsYWTwBMhM$AuyfQg243$37()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_animating)
{
_$listItems.stop(true,true);
_animating=false;
}
};


var advance=function $vpfn_c2XkKiIpBbI2yRXmbhB77A253$22()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(_paused||me.frameSpeed<0)
{
return;
}


me.move();

if(_timer)
{
window.clearTimeout(_timer);
}

_timer=window.setTimeout(
function $vpfn_MGZG$yuJzCTFH8L55Z_rHw269$16()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
advance();
},
me.frameSpeed);
};


var lazyload=function $vpfn_YlgdfggZHKnDtByMpXr8XQ277$23(slideIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
_$list.find("li:eq("+slideIndex+") .lazyload").each(
function $vpfn_MGZG$yuJzCTFH8L55Z_rHw280$16(index)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var $this=$(this);
var currDisplay=$this.css("display");

var len=this.childNodes.length;
for(var i=0;i<len;i++)
{
var node=this.childNodes[i];
if(node.nodeType===8)
{
var $node=$(node.nodeValue).hide();
$this.replaceWith($node);
$node.css("display",currDisplay);
}
}

$this.removeClass("lazyload");
});
};

this.skipTo=function $vpfn_Cm4GjvvHXsp0LYWtc3bjaA301$22(slideIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
me.pause(true);

moveTo(slideIndex);
};

var moveTo=function $vpfn_ziAvBiy_iFWMOTFI$yYVwQ308$21(slideIndex)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(slideIndex>=_numberOfSlides||
slideIndex<0)
{
return null;
}

cancelCurrentAnimation();

lazyload(slideIndex);

var slidePair={
currentSlide:getLiForSlide(_currentSlide),
currentIndex:_currentSlide,
newSlide:getLiForSlide(slideIndex),
newIndex:slideIndex
};

_$el
.removeClass("vpslideshow-slide-"+slidePair.currentIndex)
.addClass("vpslideshow-slide-"+slidePair.newIndex);

slidePair.currentSlide.hide().css({left:0});
slidePair.newSlide.show().css({left:0});

_currentSlide=slidePair.newIndex;


if(_currentSlide<_numberOfSlides-1)
{
lazyload(_currentSlide+1);
}

return slidePair;
};


this.pause=function $vpfn_ds919xBALj$0lgmUTEjEXg346$21(pause)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
if(typeof(pause)=="undefined")
{
pause=!_paused;
}

cancelCurrentAnimation();

_paused=pause;

if(!pause)
{
_$el.removeClass("vpslideshow-paused").addClass("vpslideshow-playing");
advance();
}
else
{
_$el.removeClass("vpslideshow-playing").addClass("vpslideshow-paused");
}
};

init(options);
}SlideShow._vpfn='$vpfn_XWyGu1DgS2RzrhrqVTe4zA7$4';

$.fn.vpSlideshow=function $vpfn_AFGgZ28qcJJy1INZcpz$VQ371$23(method)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var slideShow=this.data("SlideShow");
if(!slideShow)
{
if(method&&typeof method!=="object")
{
$.error("Method "+method+" does not exist on jQuery.vpSlideshow");
}

slideShow=new SlideShow(this,method);
}
else if(slideShow[method]&&typeof(slideShow[method]=="function"))
{
slideShow[method].apply(slideShow,Array.prototype.slice.call(arguments,1));
}

return this;
};

})(jQuery);