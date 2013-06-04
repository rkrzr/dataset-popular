
$(document).ready(function(){

    $("#btnSearch").click(function(){
        $("#txtError").css("display", "none");
        getForecastResults();
        return false;
    });
    $("#inputstring").maxLength = 120;
    
    $("#inputstring").blur(function()
    {
        if(this.value=='')
        {
            this.style.color='#999999'; 
            this.value='Enter location ...';
        }
    });
    $("#inputstring").focus(function()
    {
        if(this.value=='Enter location ...')
        {
            this.value=''; 
            this.style.color = '#000000';
        }
    });
    $("#btnCloseError").click(function(){
        $("#txtError").css('display', 'none');
        $("#errorNoResults").css('display', 'none');
        $("#errorMultipleResults").css('display', 'none');
        $("#errorChoices").css('display', 'none');
        $("#btnCloseError").css('display', 'none'); 
    });
});

function getForecastResults()
{
    var searchQuery = $("#inputstring").val();
    var patt1=new RegExp("^[0-9]{5}$");
    
    if (patt1.test(searchQuery) == true)
    {
        useZipcodeLookup()
    }
    else
    {
        useGoogleGeocode();  
    }
}

function useZipcodeLookup()
{
    var searchQuery = $("#inputstring").val();
    
    $.get('/widgets/zipcodeMap.php', {zip: searchQuery, ajax: 'true'}, function(result){
        if (result != 'false')
        {
            var resCoords;
            try
            {
                resCoords = $.parseJSON(result);
            }
            catch(err)
            {
                useGoogleGeocode();
                return;
            }
            var link = getPointLink(resCoords.lat, resCoords.lon);
            submitSearchForm(link);
        }
        else
        {
            useGoogleGeocode();
        }
    });
}

function useGoogleGeocode()
{
    var searchQuery = $("#inputstring").val();
    var myfcstGeocoder = new google.maps.Geocoder();
    
    myfcstGeocoder.geocode( { 'address': searchQuery, 'region': 'us'}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK) 
        {
            var oidArray = [];
            var result;
            if (results.length > 1) //More than 1 result
            {
                var bad = false;
                for (var i=0; i < results.length; i++) 
                {
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
                    $("#txtError").css('display', 'block');
                    $("#errorNoResults").css('display', 'none');
                    $("#errorMultipleResults").css('display', 'block');
                    $("#errorChoices").css('display', 'block');
                    $("#btnCloseError").css('display', 'block');
                    var choiceText = "";
                    var innerText = "";
                    var href = ""
                    var atag = "";
                    for (i=0; i < oidArray.length; i++) 
                    {
                        href = getPointLink(oidArray[i].geometry.location.lat(), oidArray[i].geometry.location.lng()) + "&searchresult=" + escape(oidArray[i].formatted_address);
                        innerText = oidArray[i].formatted_address;

                        atag = '<a href="' + href + '">' + innerText + '</a>';
                        choiceText += atag + "<br />";
                        $("#errorChoices").html(choiceText);
                    }
                    return false;
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

            var link = getPointLink(result.geometry.location.lat(), result.geometry.location.lng()) + "&searchresult=" + escape(result.formatted_address);
            submitSearchForm(link);
            return true;
        }
        else
        {
            $("#txtError").css('display', 'block');
            $("#errorNoResults").css('display', 'block');
            $("#errorMultipleResults").css('display', 'none');
            $("#errorChoices").css('display', 'none');
            $("#btnCloseError").css('display', 'block');
            return false;
        } 
    });
}

function submitSearchForm(link)
{
    var form = $("#inputstring").closest("form");
    form.attr("action", link);
    form.attr("method", 'post');
    form.submit();
}

function getPointLink(lat, lon)
{
    var list='?lat='+lat+'&lon='+lon+'&site='+'all'+'&smap=1';
    return 'http://forecast.weather.gov/MapClick.php'+list;
}

