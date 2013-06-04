$('document').ready(function() {
  /* We had to use an ajax call rather than the jquery getJSON method to prevent
   * the data being called multiple times.
   */
  $.ajax({
    // domain_name variable is supplied by code sent to DART to curcumvent cross domian issues.
    url : domain_name + '/ads_jobs.json',
    // Tell ajax this is a jsonp call.
    dataType: 'jsonp',
    // Cache is set to true because the jsonp datatype automatically
    // sets cache to false resulting in multiple calls.
    cache: true,
    // jsonp must be set to false to prevent multiple calls.
    jsonp: false,
    // Jquery documentation gives this as jsonpCallback (capital C) at the
    // time of writing this did not work.
    jsonpcallback: 'economist_jobs'
  });
});

function economist_jobs (data) {
  // Check some data came back, if not degrade to default.
  if (data.length == 0) { return; }
  var jobs = new Array();
  $.each(data, function(i, item){
    job = {};
    job['title'] = item.title;
    job['url'] = item.url;
    job['employer'] = item.employer;
    job['hasLogo'] = item.hasLogo;
    if (item.hasLogo == 'true') {
      job['logo'] = item.logo;
    }
    else {
      job['logo'] = "";
    }
    jobs[jobs.length] = job;
  });
  if (jobs.length > 0) {
    var rnd = Math.floor(Math.random()*(jobs.length))+1;
    var job = jobs[rnd];

    if (job['title'].length > 38) {
      job['title_short'] = job['title'].substring(0, 35) + '&hellip;';
    }
    else {
      job['title_short'] = job['title'];
    }

    if (job['hasLogo'] == 'true') {
          $('#jobad').html(logo_theme(job));
    }
    else {
      $('#jobad').html(nologo_theme(job));
    }
  }
};
  
function logo_theme(job) {

  return '<div id="classified_ads_jobs" style="display:inline-block; width:109px; height:109px; vertical-align:top; text-align: center; position:relative; padding:8px; font-family:Verdana,Arial,sans-serif; font-size:62.5%;">' +
  '<img src="' + job['logo'] + '" alt="' + job['employer'] + '" height="50px" border="0"/>' +
  '<a target="_blank" style="text-decoration:none; color:#08526D;" onMouseOver="this.style.textDecoration=\'underline\'" onMouseOut="this.style.textDecoration=\'none\'" title="Read more or apply for ' + job['title'] + '" href="' + job['url'] + '" >' +
  '<h4 style="text-align:left; font-size:11px; color:#08526D; font-weight:normal; margin:1px; height:42px; overflow:hidden;">' + job['title_short'] + '</h4>' +
  '</a>' +
  '<div style="position:absolute; bottom:0; left:13px; border-top: 1px solid #E6E6E6; margin:3px 0 5px;">' +
  '<h6 style="line-height: 12px; font-size:9px; color:#CC0000; margin:3px 0 0;">Jobs.economist.com</h6>' +
  '</div>' +
  '</div>';
}

function nologo_theme(job) {
  
  return '<div id="classified_ads_jobs" style="display:inline-block; width:109px; height:109px; vertical-align:top; text-align: center; position:relative; padding:8px; font-family:Verdana,Arial,sans-serif; font-size:62.5%;">' +
  '<h3 style="font-size:10px; min-height:40px; margin-bottom:0;">' + job['employer'] + '</h3>' +
  '<a target="_blank" style="text-decoration:none; color:#08526D;" onMouseOver="this.style.textDecoration=\'underline\'" onMouseOut="this.style.textDecoration=\'none\'" title="Read more or apply for ' + job['title'] + '" href="' + job['url'] + '" >' +
  '<h4 style="text-align:left; font-size:11px; color:#08526D; font-weight:normal; margin:1px; height:42px; overflow:hidden;">' + job['title_short'] + '</h4>' +
  '</a>' +
    '<div style="position:absolute; bottom:0; left:13px; border-top: 1px solid #E6E6E6; margin:3px 0 5px;">' +
    '<h6 style="line-height: 12px; font-size:9px; color:#CC0000; margin:3px 0 0;">Jobs.economist.com</h6>' +
  '</div>' +
  '</div>';
}