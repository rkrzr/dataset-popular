(function(config){

    if (!config) {
        return;
    }

    var mods = _CBC_LOADER.modules;
    if (!mods.cbc_fluidgallery) mods.cbc_fluidgallery = { type:'js', fullpath:'/i/o/imagegallery/fluidgallery.js', requires: ['cbc_core','node','io-base','json-parse','event','event-move','cbc_fluidgallery_style'] };
    if (!mods.cbc_fluidgallery_style) mods.cbc_fluidgallery_style = { type:'css', fullpath:'/i/o/imagegallery/css/fluidgallery.css'};

    YUI(_CBC_LOADER).use('cbc_fluidgallery', function(Y,result) {

        if (result.success) {

            Y.on('domready', function () {

                var instanceName = config.instanceName = 'fluidgallery'+Math.floor(Math.random()*99999);
                var instance =  CBC.namespace('CBC.APP')[instanceName] = new CBC.APP.FluidGallery();

                instance.init(Y,config);

            });
        }
    });

}(
    (function(ss) {
        var strData = ss[ss.length-1].innerHTML.replace(/^\s+(.*)\s+$/,'$1');
        return (!!strData.length) ? eval('('+strData+')') : null;
    }(document.getElementsByTagName('script')))
));
