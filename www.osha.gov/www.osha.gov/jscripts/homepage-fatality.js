 var textArray = new Array(
 escape("3/6/2013 TX - Worker killed after being caught between the gate of a wave pool he was repairing.")
,escape("3/8/2013 VA - Worker struck and killed by steel I-beams while working in unfinished basement.")
,escape("3/11/2013 KS - Employee died when the pump truck he was welding exploded.")
,escape("3/11/2013 NJ - Employee died after falling through roof opening onto steel landing.")
,escape("3/13/2013 LA - Worker killed after being crushed by cylinders that rolled off fork-truck.")
,escape("3/18/2013 CA - Worker crushed and killed after a stack of cylinder racks fell on him.")
,escape("3/18/2013 IN - Worker electrocuted while repairing light fixture.")
,escape("3/18/2013 TX - Employee struck and killed by pipe at drilling rig site.")
,escape("3/20/2013 WV - Worker died after falling from collapsed roof onto a filter device.")
,escape("3/22/2013 VA - Worker died from a fall while installing gutters and replacing window trim.")
,escape("3/26/2013 TX - Employee died when trench collapsed and crushed him.")
,escape("3/27/2013 VA - Worker died when caught between a vertical door counterweight and support structure.")
,escape("3/27/2013 TX - Employee died after falling through skylight while installing HVAC piping")
,escape("3/27/2013 OK - Employee died after falling nearly 50 feet from a bucket while performing tree trimming operations.")
);
  var currentText=Math.floor(Math.random()*textArray.length)
    function changeText() {
    try {
      document.getElementById("fatality").innerHTML = unescape(textArray[currentText++]);
      if (currentText == textArray.length) {
        currentText = 0;
      }
      setTimeout("changeText();", 10000);
    } catch (e) {
      alert("Error: " + e);
    }
  }


