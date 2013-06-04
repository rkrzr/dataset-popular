//cbc carousel initializer
function _cbc_loadCarousel(o) {
    var containerId = o.containerId || null;
    var direction = o.direction || null;
    var type = o.type || null;
    var slidesVisible = o.slidesVisible || 6;
    var pagination = o.pagination || true;
    var disp;

    if (direction == 'r' || !direction) disp = 1;
    else if (direction == 'l') disp = -1;

    var o = {
        instanceName: containerId,
        cfg: {
            columnsCount: 4,
            placeholderId: containerId,
            containerId: containerId,
            type: type,
            slidesVisible: slidesVisible,
            center: false,
            controls: {
                location: 'BELOW',
                pause: true,
                prevText: 'Show previous slide',
                center: false,
                nextText: 'Show next slide'
            },
            pagination: pagination,
            autoRotate: false,
            showMore: true,
            transition: 'HORIZONTAL',
            duration: 0.25,
            initialDisplacedItems: disp
        }
    };

    var mods = _CBC_LOADER.modules;
    if (!mods.cbc_carousel) mods.cbc_carousel = { type:'js', fullpath:'/i/o/carousel/v11/carousel.js', requires: ['cbc_core','node','anim'] };

    //instantiate the module
    YUI(_CBC_LOADER).use('cbc_carousel', function(Y,result) {
        var instance = new CBC.APP.Carousel();
        instance.init(Y,o);
    });

}
