var lp_ss = document.getElementsByTagName('script');
var lp_ss_index = lp_ss.length-1;
var lp_ss_node = lp_ss[lp_ss_index];
var mods = _CBC_LOADER.modules;
if (!mods.newslp) mods.newslp = { type:'js', fullpath:'/i/news/v10/js/lp/lp.js', requires: ['node','cbc_core','cbc_socialmedia','io-base','event-custom'] };
YUI(_CBC_LOADER).use('newslp', function(Y,result) {
	var instance_name = 'newslp';
	var instance = CBC.namespace('CBC.APP')[instance_name] = new CBC.APP.NewsLP();
	CBC.APP.Instances.add(instance_name,instance);
	instance.init(Y,{script:lp_ss_node});
});