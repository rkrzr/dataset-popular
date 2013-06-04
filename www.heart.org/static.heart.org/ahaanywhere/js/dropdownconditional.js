	$(document).ready(function(){
						
					
			var currentCount = 0;
			var setSingleColWidth = 250;
			var setTripleColWidth = 750;
			var menuOffset = 100;
			var theMaxBoundary = 960;
			var theMaxSinglePos = theMaxBoundary - setSingleColWidth - 10;
			var theMaxTriplePos = theMaxBoundary - setTripleColWidth - 10;
		
			
			$('#jsddm li.tab').each(function(){
			
				currentCount++;
				var olCount = $(this).children("div").children("div").children("div").children("div").children("ol").length;
				var theMegaContainer = $(this).children("div.megaContainer");
				
				if (olCount == 0){
					$(theMegaContainer).width(setSingleColWidth+"px");
				}
				
				olCount = 0;
				
				//get menuContainer width
				var theCurrentWidth = $(theMegaContainer).width();
				var setPosition = currentCount*menuOffset;
				var setPosition2 = setPosition - menuOffset;
				var checkPosition = setPosition + theCurrentWidth;
				
				$(theMegaContainer).css("top","38px");

				//check if the checkPosition is less than theMaxBoundary
				if(parseInt(checkPosition) < parseInt(theMaxBoundary)){
					$(theMegaContainer).css("left",setPosition2);
				}else{
					
					//outside theMaxBoundary
					//set Max Position depends on the width of the theCurrentWidth
					//if it is 250 then set the left position to theMaxSinglePos - 700
					//else set left position to the theMaxTriplePos - 200
					if(parseInt(theCurrentWidth) == parseInt(setSingleColWidth)){
						$(theMegaContainer).css("left",theMaxSinglePos);
					}else{
						$(theMegaContainer).css("left",theMaxTriplePos);
					}
				
				}
				
			});
			
			
			});