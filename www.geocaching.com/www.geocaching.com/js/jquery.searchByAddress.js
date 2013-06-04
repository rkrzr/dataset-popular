var searchCallback = null;
var searchOptions = null;

//function loadGoogleMapsScriptForGeocode() {
//    var script = document.createElement("script");
//    script.type = "text/javascript";
//    script.src = "http://maps.google.com/maps/api/js?v=3&sensor=false&indexing=false&callback=initGeocode";
//    document.documentElement.firstChild.appendChild(script);
//}

function initGeocode(searchValue) {
    var searchBaseUrl = '/seek/nearest.aspx';

    if (typeof searchValue == 'undefined' && searchCallback != null) {
        searchValue = searchCallback;
    }

    if (searchValue == null || $.trim(searchValue).length == 0) {
        alert("A location for '" + searchValue + "' could not be determined");
        if (searchOptions.onNoneFound) {
            searchOptions.onNoneFound();
        }
        return;
    }


    jQuery.getJSON(
        "/api/geocode",
        { q: searchValue },
        function (response) {
            if (response.status == "success") {
                var url = [searchBaseUrl, '?lat=', response.data.lat, '&lng=', response.data.lng, '&dist=', searchOptions.distance, (searchOptions.cFilter.length > 0) ? '&cFilter=' + searchOptions.cFilter : '', (searchOptions.excludeUserFinds == 1) ? '&f=1' : '', (searchOptions.includeChildren == 'y') ? '&children=y' : ''].join('');
                setTimeout(function () {
                    window.location.assign(url);
                }, 0)
            } else if (response.status == "failed") {
                alert("Sorry, I was unable to determine a location for " + searchValue);
            } else {
                alert("Sorry, I was unable to determine a location for " + searchValue);
                if (window.console) {
                    console.log(response);
                }
            }
        });

    return;

    /* OLD Geocoder Code */
    //    var geocoder = new google.maps.Geocoder();

    //    if (geocoder) {
    //        geocoder.geocode({ 'address': searchValue }, function (results, status) {
    //            if (status == google.maps.GeocoderStatus.OK) {
    //                if (results.length > 1) {
    //                    var items = [], item = null;

    //                    for (var p in results) {
    //                        if (results[p].types.length > 0 && results[p].types[0] == 'street_address') {
    //                            var item2 = results[p].geometry.location;
    //                            var url = [searchBaseUrl, '?lat=', item2.lat(), '&lng=', item2.lng(), '&dist=', searchOptions.distance, (searchOptions.cFilter.length > 0) ? '&cFilter=' + searchOptions.cFilter : '', (searchOptions.excludeUserFinds == 1) ? '&f=1' : ''].join('');
    //                            setTimeout(function () {
    //                                window.location.assign(url);
    //                            }, 0)
    //                            return false;
    //                        }

    //                        item = results[p].geometry.location;
    //                        items.push(["<li><a href='", searchBaseUrl, "?lat=", item.lat(), "&lng=", item.lng(), "&dist=", searchOptions.distance, (searchOptions.cFilter.length > 0) ? '&cFilter=' + searchOptions.cFilter : '', (searchOptions.excludeUserFinds == 1) ? '&f=1' : '', "'>", results[p].formatted_address, "</a></li>"].join(''));
    //                    }

    //                    if ($("#uxGeocodeResults").length == 0) {
    //                        $("<div id='uxGeocodeResults' class='WidgetGeocodeResults'><div class='WidgetBody'><p class='AlignCenter'><img src='/images/loading2.gif' alt='Loading' /> Loading</p><p class=\"WidgetFooter\"><small><a href=\"javascript:void(0);\" id=\"uxGeocodeResultsClose\">Close</a></small></p></div></div>").appendTo("body");
    //                        $("input.Search").addClass("DialogOpen");
    //                    }
    //                    var offset = searchBox.offset(),
    //                        height = searchBox.height();

    //                    $('#uxGeocodeResults div').html(['<p class=\"WidgetHeader\"><strong>Multiple Locations Found:</strong></p>', '<ol>', items.join(''), '</ol>', '<p class=\"WidgetFooter\"><small><a href=\"javascript:void(0);\" id=\"uxGeocodeResultsClose\">Close</a></small></p>'].join(''));
    //                    $('#uxGeocodeResults')
    //                            .css({ 'left': offset.left + 'px', 'top': offset.top + height + 7 + 'px' })
    //                            .dialog('option', 'dragable', false)
    //                            .parents('.ui-dialog:first').find('.ui-dialog-titlebar-close').remove();

    //                    $("#uxGeocodeResultsClose").click(function () {
    //                        $("#uxGeocodeResults").remove();
    //                        $("input.Search").removeClass("DialogOpen");
    //                    });

    //                    if (searchOptions.onNoneFound) {
    //                        searchOptions.onNoneFound();
    //                    }

    //                } else {
    //                    var p = results[0];
    //                    var item = p.geometry.location;
    //                    var url = [searchBaseUrl, '?lat=', item.lat(), '&lng=', item.lng(), '&dist=', searchOptions.distance, (searchOptions.cFilter.length > 0) ? '&cFilter=' + searchOptions.cFilter : '', (searchOptions.excludeUserFinds == 1) ? '&f=1' : '', (searchOptions.includeChildren == 'y') ? '&children=y' : ''].join('');
    //                    setTimeout(function () {
    //                        window.location.assign(url);
    //                    }, 0)
    //                }
    //            } else {
    //                alert("A location for '" + searchValue + "' could not be determined");
    //                if (searchsearchOptions.onNoneFound) {
    //                    searchsearchOptions.onNoneFound();
    //                }
    //            }
    //        });
    //    }
}

(function ($) {

    $.fn.searchByAddress = function (searchInputID, options) {
        //set up default options
        var defaults = {
            distance: 25,
            cFilter: '',
            excludeUserFinds: 0,
            includeChildren: 'n'
        }

        if ($.cookie) {
            $.cookie('geocodeCache', null);
        }

        //overide defaults with ones that were passed in
        searchOptions = $.extend({}, defaults, options);
        var geocoder = null;

        searchBox = $('#' + searchInputID);
        searchVal = searchBox.val();

        initGeocode(searchVal);
        //        return this.each(function () {

        //            if (window.google == null || window.google.maps == null) {
        //                searchCallback = searchVal;
        //                loadGoogleMapsScriptForGeocode();
        //            } else {
        //                initGeocode(searchVal);
        //            }
        //            return false;
        //        });
    }
})(jQuery);