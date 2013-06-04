                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;

}




vp.define("vp.sales.nav.TaxInclusiveSwitch");

vp.sales.nav.TaxInclusiveSwitch.Skin=vp.widget.RichTooltip.skins.Message;
vp.sales.nav.TaxInclusiveSwitch.RecurringTooltip=false;
vp.sales.nav.TaxInclusiveSwitch.RenderingStrategies=vp.widget.RichTooltip.renderingStrategies.Left;

(function $vpfn_5chSM3pfBZkYGihkVngigQ14$1($)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}



var TAX_INCLUSIVE_ON_FLAG="1";




var TAX_INCLUSIVE_OFF_FLAG="0";

var TOOLTIP_WAS_SHOWN="1";

var COOKIE_NAME="PSC";
var SESSION_COOKIE_NAME="SITE";
var TAX_INCLUSIVITY_SUBCOOKIE_NAME="TXI";
var TOOLTIP_SUBCOOKIE_NAME="TXIT";

$(document).ready(function $vpfn_5chSM3pfBZkYGihkVngigQ33$22(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
configureLink();
configureDropDown();
});




var configureLink=function $vpfn_eZQn6Na79MVnLX7jPSOHTg41$24()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var $switchLink=$("#taxInclusiveSwitchLink").click(toggleTaxInclusiveSwitchAndRefreshPage);

if(shouldShowTooltip()&&$switchLink.length>0)
{
showTooltip($switchLink[0]);
}
};

var configureDropDown=function $vpfn_ptxm3y7BeUwxZjsV_Z_CEA51$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var $dropDown=$("#taxInclusiveSwitchDropDown");

if($dropDown.length===0)
{
return;
}

$(".taxInclusiveDropDownItem").click(function $vpfn_5chSM3pfBZkYGihkVngigQ60$45(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}dropdownItemSelected(e,TAX_INCLUSIVE_ON_FLAG);});
$(".taxExclusiveDropDownItem").click(function $vpfn_5chSM3pfBZkYGihkVngigQ61$45(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}dropdownItemSelected(e,TAX_INCLUSIVE_OFF_FLAG);});

if(shouldShowTooltip()&&$dropDown.length>0)
{
showTooltip($dropDown[0]);
}
};

var toggleTaxInclusiveSwitchAndRefreshPage=function $vpfn_KjF$TAWy77nSpnUUET7q7w69$49()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var newTaxInclusiveFlag=getOppositeTaxInclusiveFlag(getCurrentTaxInclusiveFlag());

asyncTrackTaxInclusiveSwitchChange(newTaxInclusiveFlag,function $vpfn_5chSM3pfBZkYGihkVngigQ73$64(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
saveTaxInclusiveFlag(newTaxInclusiveFlag);
window.location.reload(true);
});
};




var asyncTrackTaxInclusiveSwitchChange=function $vpfn_3Fq8DaYxSBeyQcJx6aEPvQ82$45(newTaxInclusiveFlag,callback)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
$.ajax({
url:"/tax-inclusivity-switch.aspx?t="+newTaxInclusiveFlag
}).done(callback);
};




var getOppositeTaxInclusiveFlag=function $vpfn_milyW1q9Z3k8wyKkRezKxQ92$38(currentTaxInclusiveFlag)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return currentTaxInclusiveFlag===TAX_INCLUSIVE_ON_FLAG?TAX_INCLUSIVE_OFF_FLAG:TAX_INCLUSIVE_ON_FLAG;
};




var getCurrentTaxInclusiveFlag=function $vpfn_WcjnFiaVsPDEpwe6lJpPIA100$37()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return getTaxInclusiveFlagAndSaveDefault(false);
};

var getDefaultTaxInclusiveFlag=function $vpfn_OHH0zBMa0YgPiI$jTTdYwQ105$37()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var eltWithDefaultValue=$('.tax-inclusivity-current-value');

if(eltWithDefaultValue.length===0)
{
return TAX_INCLUSIVE_ON_FLAG;
}

return eltWithDefaultValue.val();
};

var saveTaxInclusiveFlag=function $vpfn_Afqnv_cy2TCpIM8yLJcbAQ117$31(taxInclusiveFlag)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.cookies.setSubValue(COOKIE_NAME,TAX_INCLUSIVITY_SUBCOOKIE_NAME,taxInclusiveFlag,null,true);
};








var getTaxInclusiveFlagAndSaveDefault=function $vpfn_z1Ab8hajPIDBqi9zPV8kNQ129$44(shouldSaveDefault)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var currentTaxInclusiveFlag=vp.cookies.getSubValue(COOKIE_NAME,TAX_INCLUSIVITY_SUBCOOKIE_NAME);

if(currentTaxInclusiveFlag!==TAX_INCLUSIVE_ON_FLAG&&
currentTaxInclusiveFlag!==TAX_INCLUSIVE_OFF_FLAG)
{
currentTaxInclusiveFlag=getDefaultTaxInclusiveFlag();

if(shouldSaveDefault)
{
saveTaxInclusiveFlag(currentTaxInclusiveFlag);
}
}

return currentTaxInclusiveFlag;
};

var shouldShowTooltip=function $vpfn_LIp0MocdXNT6MNEk$9_FzQ147$28()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
return!wasToolTipShown();
};

var wasToolTipShown=function $vpfn_nc$xhHHv5ReFr6A$cuUVDQ152$26()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var tooltipCookieValue;
if(vp.sales.nav.TaxInclusiveSwitch.RecurringTooltip)
{
tooltipCookieValue=vp.cookies.getSubValue(SESSION_COOKIE_NAME,TOOLTIP_SUBCOOKIE_NAME);
}
else
{
tooltipCookieValue=vp.cookies.getSubValue(COOKIE_NAME,TOOLTIP_SUBCOOKIE_NAME);
}

if(tooltipCookieValue!==TOOLTIP_WAS_SHOWN)
{
return false;
}

return true;
};

var showTooltip=function $vpfn_cExhH96ldmYuE1OHwc8uIw172$22(oTriggerElement)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var $tooltipTaxMessage=$(".tooltip-tax-message");
var vatTooltip=new vp.widget.RichTooltip(oTriggerElement,$tooltipTaxMessage[0]);
vatTooltip.skin=vp.sales.nav.TaxInclusiveSwitch.Skin;
vatTooltip.renderingStrategy=vp.sales.nav.TaxInclusiveSwitch.RenderingStrategies;
vatTooltip.setBehavior(window.TOOLTIP_BEHAVIOR_HIDE_CUSTOM);

if(vp.sales.nav.TaxInclusiveSwitch.RecurringTooltip)
{
setRecurringTooltipStyle(vatTooltip);
}
else
{
setFirstVisitTooltipStyle(vatTooltip);
}

vatTooltip.show();

if(vp.sales.nav.TaxInclusiveSwitch.RecurringTooltip)
{

$(".richtooltip-close").click(function $vpfn_5chSM3pfBZkYGihkVngigQ194$42(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
setRecurringTooltipAsClosed();
});
}
else
{
vatTooltip.hideAfterDelay();
setFirstVisitTooltipAsClosed();
}
};

var setRecurringTooltipStyle=function $vpfn_giUmiaNTLrMh_dngTbAmlg205$35(vatTooltip)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vatTooltip.height=26;

$('.tooltip-tax-message').css('display','inline');
$('.tooltip-tax-message').css('font-weight','bold');
var textWidth=$('.tooltip-tax-message').width();
$('.tooltip-tax-message').css('display','none');


var tooltipWidth=20+textWidth+5+16+20;

vatTooltip.width=tooltipWidth;
};

var setFirstVisitTooltipStyle=function $vpfn_$W4e0JXUXPSsiRvl6MRExQ220$36(vatTooltip)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vatTooltip.width=180;
vatTooltip.delay=10000;
};

var setRecurringTooltipAsClosed=function $vpfn_TZbtMAvUnerptod2ok_hEQ226$38()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.cookies.setSubValue(SESSION_COOKIE_NAME,TOOLTIP_SUBCOOKIE_NAME,TOOLTIP_WAS_SHOWN);
};

var dropdownItemSelected=function $vpfn_TmrORBDnY2TzhFbhGd86aA231$31(e,selectedItemCookieValue)
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}

e.preventDefault();

var currentTaxInclusiveFlag=getCurrentTaxInclusiveFlag();

if(currentTaxInclusiveFlag!==selectedItemCookieValue)
{
toggleTaxInclusiveSwitchAndRefreshPage();
}else
{

window.location.reload(false);
}
};

var setFirstVisitTooltipAsClosed=function $vpfn_$jdxcIrca_5SJ7Ffr4mAOg248$39()
{if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.cookies.setSubValue(COOKIE_NAME,TOOLTIP_SUBCOOKIE_NAME,TOOLTIP_WAS_SHOWN,null,true);
};
})(jQuery);
