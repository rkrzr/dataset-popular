var jQueryScriptAdded = false;
var myfcstGeocoder;
var myfcstLoading;
var oidArray;


function initForecast()
{
    latlon = null;
    lat = null;
    lon = null;
    var zip = 0;
    if ($.cookie('myForecast') != null)
    {
        latlon = $.cookie('myForecast').split(",");
        lat = latlon[0];
        lon = latlon[1];
        if (latlon[2] != undefined)
        {
            zip = latlon[2];
        }
    }
    if ($.cookie("myForecastsess"))
    {
        latlon = $.cookie('myForecastsess').split(",");
        lat = latlon[0];
        lon = latlon[1];
        if (latlon[2] != undefined)
        {
            zip = latlon[2];
        }
    }
    if (latlon != null)
    {
        hideMyfcstForm();
        showMyfcstLoading();
        requestWidget(lat, lon, zip);
        showMyfcstFcst();
    }
    else
    {
        showMyfcstForm();
    }
}

function initJQuery() 
{
    // do our onload function
    $(function() 
    {

        /* attach a submit handler to the form */
        $("#myfcst-form").live('submit', function(event) 
        {
            event.preventDefault();
            getForecast();
            return false;
        });


        $("#myfcst-location-input").live('focusin', function(event) 
        {
            if ($(this).val() == 'City, ST') 
            {
                $(this).val('');
            }

            return true;
        });


        $("#myfcst-location-input").live('focusout', function(event) 
        {
            if ($(this).val() == '') 
            {
                $(this).val('City, ST');
            }

            return true;
        });


        $("#myfcst .myfcst-multi").live('click', function(event) 
        {
            $("#myfcst").find("#myfcst-location-input").val(oidArray[$(this).attr('oid')].geometry.location).attr('value',oidArray[$(this).attr('oid')].geometry.location);
            hideMyfcstMulti();
            getForecast();
            
            return false;
        });

        $("#myfcst-change-location").live('click', function (event) 
        {
            changeLocation();
        });
    });
}

function changeLocation()
{
    $.removeCookie("myForecast", {
        path: '/'
    });
    $.removeCookie("myForecastsess", {
        path: '/'
    });
    $("#myfcst-error").html("");
    hideMyfcstFcst();
    hideMyfcstMulti();
    hideMyfcstLoading();
    showMyfcstForm();
}

function getForecast() {
    hideMyfcstForm();
    showMyfcstLoading();

    myfcstGeocoder.geocode( {
        'address': $("#myfcst-location-input").val(), 
        'region': 'us'
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) 
        {
            var lat, lon, result, bad;
            if (results.length > 1) 
            {
                oidArray = [];

                for (var i=0; i < results.length; i++) 
                {
                    bad = false;
                    for(var j = 0; j < results[i].types.length; j++)
                    {
                        if (results[i].types[j] == 'colloquial_area')
                        {
                            bad = true;
                        }
                    }
                    if (bad == false)
                    {
                        oidArray.push(results[i]);
                    }
                    bad = false;
                }
                if (oidArray.length > 1)
                {
                    var newHTML = '<span id="myfcst-title">More than one location matched your submission</span><div class="myfcst-hr"></div><ul style="list-style: inherit;">';

                    for (i=0; i < results.length; i++) 
                    {
                        newHTML += '<li><span class="myfcst-multi" oid="'+i+'">'+results[i].formatted_address+'</span></li>';
                    }

                    newHTML += '</ul><div id="cancelMulti" onclick="changeLocation()">Cancel</div>';

                    $("#myfcst-multi-result").html(newHTML);
                    showMyfcstMulti();
                    hideMyfcstLoading();
                    hideMyfcstForm();
                    return;
                }
                if (oidArray.length == 1)
                {
                    result = oidArray[0];
                }
            } 
            else 
            {
                result = results[0];
            }
            
            lat = result.geometry.location.lat();
            lon = result.geometry.location.lng();
            var zip = $("#myfcst-location-input").val();
            
            var patt1=new RegExp("^[0-9]{5}$");
            if (patt1.test(zip) == false)
            {
                zip = 0;
            }

            requestWidget(lat, lon, zip);
            
        } else {
            $("#myfcst-error").html("Location not found. Please try again.");
            hideMyfcstLoading();
            showMyfcstForm();
        }
    });


    return false;
}

function requestWidget(lat, lon, zip)
{
    myfcstRemember = ($('#myfcst-remember').is(':checked')) ? true : false;
    var data = '&lat='+lat+'&lon='+lon;
    var cookieVal = lat + "," + lon;
    if (zip != 0)
    {
        data = data+'&zip='+zip;
        cookieVal = cookieVal + ',' + zip;
    }
    $.ajax({
        type: 'GET',
        url: '/widgets/MyForecastWidget.php',
        data: data,
        complete: function (jqXHR, textStatus) {

            hideMyfcstLoading();
            if (textStatus == 'success') {
                if (jqXHR.responseText == "failure")
                {
                    showMyfcstForm();
                    $.removeCookie("myForecast", {path: '/'});
                    $.removeCookie("myForecastsess", {path: '/'});
                    $("#myfcst-error").html("Sorry, no forecast found. Please try again.");
                }
                else
                {
                    if (myfcstRemember == true)
                    {
                        $.cookie("myForecast", cookieVal, {
                            expires: 30, 
                            path: '/'
                        });
                    }
                    $.cookie("myForecastsess", cookieVal, {path: "/"});
                    showMyfcstFcst();
                    $("#myfcst-form").css("display", "none");
                    $("#myfcst-fcst").html(jqXHR.responseText);
                }
      
            } else {
                showMyfcstForm();
                $("#myfcst-error").html("Service unavailable. Please try again.");
            }
      
            return false;
        }
    });
}


function showMyfcstForm()
{
    $("#myfcst-location-input").val("City, ST");
    $("#myfcst-form").css("display", "block");
}

function hideMyfcstForm()
{
    $("#myfcst-form").css("display", "none");
}

function showMyfcstFcst()
{
    $("#myfcst-fcst").css("display", "block");
}

function hideMyfcstFcst()
{
    $("#myfcst-fcst").html("");
    $("#myfcst-fcst").css("display", "none");
}

function showMyfcstMulti()
{
    $("#myfcst-multi-result").css("display", "block");
}

function hideMyfcstMulti()
{
    $("#myfcst-multi-result").css("display", "none");
}

function showMyfcstLoading()
{
    $("#myfcst-loading").css("display", "block");
}

function hideMyfcstLoading()
{
    $("#myfcst-loading").css("display", "none");
}

function showLoading(show) {
    show = (show != undefined) ? show : false;

    if (show) {
        myfcstLoading = setInterval('$("#myfcst-loading").fadeOut(500).delay(500).fadeIn(500);',1500);
    } else {
         clearInterval(myfcstLoading);
        $("#myfcst-loading").css("display", "none");
    
    }
}

function initializeGeocoder () {
    myfcstGeocoder = new google.maps.Geocoder();
}

$(document).ready(function(){
    
    initializeGeocoder()
    initJQuery();
    initForecast();

});

