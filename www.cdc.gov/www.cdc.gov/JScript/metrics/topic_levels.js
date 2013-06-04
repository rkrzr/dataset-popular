function PageLocationInHierarchy() {
	this.azEntry = new String;
	this.level = new Array(6);

	this.setAzEntry = function(entryText) { this.azEntry = entryText; }
	this.setLevel = function(lvl,lvl_str) {
		if((lvl > 5)||(lvl < 0)) { }
		else if(typeof this.level[lvl]=="undefined") {
			this.level[lvl]=lvl_str;
		}
		else { }
	}
	this.setLevel1 = function(level_1) { this.setLevel(0,level_1); }
	this.setLevel2 = function(level_2) { this.setLevel(1,level_2); }
	this.setLevel3 = function(level_3) { this.setLevel(2,level_3); }
	this.setLevel4 = function(level_4) { this.setLevel(3,level_4); }
	this.setLevel5 = function(level_5) { this.setLevel(4,level_5); }
	this.setLevel6 = function(level_6) { this.setLevel(5,level_6); }
	this.isLevel = function(lvl) {
		if((lvl < 0) || (lvl > 5)) { }
		else if(lvl >= 0) {
			if((typeof this.level[lvl])!="string") {
				return false;
			}
			else {
				return true;
			}
		}
	}

	this.getAzEntry = function() { return this.azEntry; }
	this.getLevel = function(lvl) { if (this.isLevel(lvl, false)) { return this.level[lvl]; } }
	this.getHierarchy=function() { 
		var gap,gap_lvl;
		gap=false;
		gap_lvl=0;
		this.siteCatalyst=this.getLevel(0)
		for(i=1;i<this.level.length;i++) {
			if(this.isLevel(i)) {
				this.siteCatalyst += "~" + this.getLevel(i);
			}
			else {
				gap = false;
				for(j=i+1; j < this.level.length; j++) {
					if(this.isLevel(j, false)) {
						gap = true;
					}
				}
				if(gap) { this.siteCatalyst += "~"; }
			}
		}
		return this.siteCatalyst;
	}
}

function updateVariables(s)
{
	s.hier1 = siteCatalyst.getHierarchy();
	var az = siteCatalyst.getAzEntry();
	// Make sure they set an A-Z entry before trying to set this prop.
	if (az && az.length > 0)
		s.prop45 = az;
	s.prop22 = siteCatalyst.getLevel(0);
	s.prop23 = siteCatalyst.getLevel(1);
	s.prop24 = siteCatalyst.getLevel(2);
	s.prop25 = siteCatalyst.getLevel(3);
	s.prop43 = siteCatalyst.getLevel(4);
	s.prop44 = siteCatalyst.getLevel(5);
}

function showDebugInfo(arg){}

var siteCatalyst = new PageLocationInHierarchy();
var verbose = false;