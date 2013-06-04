//add module to modules map
var mods = _CBC_LOADER.modules;
if (!mods.video_json_request) mods.video_json_request = { type:"js", fullpath:"/video/js/JSONRequest.js" };
if (!mods.cbc_playlist) { mods.cbc_playlist = { type:'js', fullpath:'/i/o/playlist/v11/js/playlist.js', requires: ['cbc_core','node','video_json_request'] }; }

//grab the script node, eval and save the settings
var ss = document.getElementsByTagName('script');
var i = ss.length-1;
eval(ss[i].innerHTML);
o.scriptnode = ss[i];
if (!_playlist_settings) var _playlist_settings = [];
_playlist_settings.push(o);

//instantiate the module and add it to CBC.APP.Instances
YUI(_CBC_LOADER).use('cbc_playlist', function(Y,result) {
	var o = _playlist_settings.shift();
	var instance_name = o.instanceName = 'playlist'+Math.floor(Math.random()*999999);
	var instance = CBC.namespace('CBC.APP')[instance_name] = new CBC.APP.Playlist();
	CBC.APP.Instances.add(instance_name,instance);
	instance.init(Y,o);
});