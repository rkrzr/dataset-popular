if(!CBC) { var CBC = {}; }
if(!CBC.APP) { CBC.APP = {}; }
if(!CBC.APP.SC) { CBC.APP.SC = {}; }

CBC.APP.SC.UTIL = function () {
    
    var _listeners = [];

    return {
        
        init : function(params) {

        },

        getElementById : function(id) {
            var el = document.getElementById(id);
            return {
                'el':el,
                tags : function(tag) {
                    return el.getElementsByTagName(tag);
                }
            };
        },

        // WARNING - instead of using this function to set up tracking with a different OmniSuite id, 
        // initialize the variable 'stats_reporting_suite' before including this script in your page. 
        // This way it can be used by cbc_sitecatalyst.js during the initialization process
        // (on line 8, while setting 's_account').
        getSCInstance : function(suiteOverride) {
            var newSCInstance = s_gi((!!suiteOverride)?suiteOverride:'cbc-production');
            s_cbc_sitecatalyst_init(newSCInstance);
            return newSCInstance;
        },

        typecheck : function(obj) {
            
            return {
                'element': !!(obj.nodeType),
                'array' : !!(obj.length && obj.pop), 
                'function' : obj instanceof Function,
                'object' : obj instanceof Object,
                'string' : typeof obj == 'string',
                'number' : typeof obj == 'number',
                'boolean' : typeof obj == 'boolean',
                'undefined' : typeof obj == 'undefined'
            };

        },

        getElementsByClassName : function(className,parentEl,elArray) {
            
            parentEl = parentEl || document.body;
            elArray = elArray || [];
            if(this.typecheck(parentEl).string) {
                parentEl = document.getElementById(parentEl);
            }

            if(!parentEl) { return; }
            
            var children = parentEl.children;

            // use negative look behind
            className = className.replace(/(sclt-)?\*/,function($0,$1) {
                return $1 ? $1 + '.*' : $0;
            });

            var pattern = '^(|.* )'+className+'(| .*)$';
            
            for(var i = 0; i < children.length; i++) {
                var child = children[i];
                if(child.className.match(pattern)) {
                    elArray.push(child);
                }
                if(child.hasChildNodes()) {
                    var elArray = this.getElementsByClassName(className,child,elArray);
                }
            }

            return elArray;

        },

        getAnchor : function(element) {
            return this.findParentTag(element,'a');
        },

        arrayContains : function(_array, _obj) {
            var itemFound = false;
            var i = 0;
            for(i = 0; i < _array.length; i++) {
                if(_array[i] === _obj) {
                    itemFound = true;
                }
            }
            return itemFound;
        },

        each : function(_array,callback) {
            var i = 0;
            for(i = 0; i < _array.length; i++) {
                callback({'array':_array,'index':i,'value':_array[i]});
            }
        },

        addListener : function(params) {
            var element = params.element;
            if(!(this.typecheck(element).element)) { return false; }

            var preventDefault = params.preventDefault;
            var stopPropagation = params.stopPropagation;
            var obj = params.obj;
            var lparams = params.params;
            var callback = params.callback;
            var type = params.type;

            localCallback = function(e) { 
                e = CBC.APP.SC.UTIL.getEventObject(e);
                if(preventDefault) { e.preventDefault(); }
                if(stopPropagation) { e.stopPropagation(); }
                if(obj && lparams) {
                    callback.call(obj,e,lparams);
                } else if (obj) {
                    callback.call(obj,e);
                } else if(lparams) {
                    callback.call(element,e,lparams);
                } else {
                    callback.call(element,e);
                }
            };

            _listeners.push({'type':type,
                             'element':element,
                             'callback':callback,
                             'localCallback':localCallback});

            if(element.addEventListener) {
                element.addEventListener(type,localCallback,false);
                return true;
            } else if(element.attachEvent) {
                return element.attachEvent('on'+type,localCallback);
            } else {
                element['on'+type] = localCallback;
            }
            
        },

        removeListener : function(params) {
            var element = params.element;
            if(!(this.typecheck(element).element)) { return false; }

            var preventDefault = params.preventDefault;
            var stopPropagation = params.stopPropagation;
            var obj = params.obj;
            var lparams = params.params;
            var callback = params.callback;
            var type = params.type;

            var localCallback = null;

            this.each(_listeners,function(p) {
                if((p.value.type === type) && 
                   (p.value.element === element) &&
                   (p.value.callback === callback)
                  ) {
                    localCallback = p.value.localCallback;
                    p.array.splice(p.index,1);
                }
            });

            if(localCallback === null) { return; }

            if(element.removeEventListener) {
                element.removeEventListener(type,localCallback,false);
                return true;
            } else if(element.detachEvent) {
                return element.detachEvent('on'+type,localCallback);
            } else {
                element['on'+type] = null;
            }
        },

        getEventObject : function(e) {
            if(!e) { e = window.event; }

            return {
                originalEvent : e,
                target : e.target || e.srcElement,
                charCode : e.charCode || e.keyCode,
                type : e.type,
                layerX : e.layerX || e.offsetX,
                layerY : e.layerY || e.offsetY,
                clientX : e.clientX,
                clientY : e.clientY,
                fromElement : (e.type=='mouseover') ? e.fromElement || e.relatedTarget : null,
                toElement : (e.type=='mouseout') ? e.toElement || e.relatedTarget : null,
                preventDefault : function() {
                    if(this.originalEvent.preventDefault) {
                        this.originalEvent.preventDefault();
                    } else {
                        this.originalEvent.returnValue = false;
                    }
                },
                stopPropagation : function() {
                    if(this.originalEvent.stopPropagation) {
                        this.originalEvent.stopPropagation();
                    } else {
                        this.originalEvent.cancelBubble = true;
                    }
                }
            };
        },

        stripHTML : function(str) {

            var img = '';
            var maxlength = 50;

            if(/<img .*?(\/>|>)/i.test(str)) {
                img = /<img .*?(?:\/>|>)/i.exec(str)[0];
                if(/alt="[^"]+?"/.test(img)) {
                    str = (/alt="(.*?)"/i).exec(img)[1];
                } else {
                    str = (/src="(.*\/|)(.*?)"/i).exec(img)[2];
                }
            } else {
                str = str.replace(/<.*?>/g,'');
                str = str.replace('/\&amp;/i','');
            }

            str = str.replace(/["]/g,'');

            if(str.length > maxlength) {
                str = str.substr(0,maxlength); 
            }

            return str;
        },

        findParentTag : function(element, tag) {

            if(element.nodeName == tag.toUpperCase()) { return element; }
            
            while(element = element.parentNode) {
                if(element.nodeName == tag.toUpperCase() || element === null) { break; }
            }

            if(element === null) {
                return null;
            } else {
                return element;
            }
        },

        debugListeners : function() {
            for(var i = 0; i < _listeners.length; i++) {
                console.log(_listeners[i]);
            }
        },

        createInterval : function(cb,inte,mx,cnd,fail) {
            var repeater = function(_callback,_interval,_max, _condition,_failure) {
                
                var callback, condition, interval, max, failure;
                if(!!_callback) { callback = _callback; }
                if(!!_condition) { condition = _condition; } else { condition = function() { return true; }; }
                if(!!_interval) { interval = _interval; }
                if(!!_failure) { failure = _failure; } else { failure = function() {}; }
                if(!!_max) { max = _max;} else { max = 0; }

                var count = 0;

                var _repeater = function() { 

                    callback();

                    count++;
                    
                    if(count >= max) {
                        failure();
                    } else if(condition() && (max === 0 || count < max)) {
                        setTimeout(_repeater,interval);
                    }

                };

                return _repeater;

            }(cb,inte,mx,cnd,fail);

            repeater();
        },

        getRadioPopupParams : function() {

            var url = window.location.href;
            var params = {};

            var keyMap = {
                'cbc_radio_one':'radio1',
                'cbc_radio_2':'radio2',
                'documentary':'documentary',
                'cbc_television':'cbc-tv',
                'cbc_news_network':'cbcnn',
                'bold':'bold',
                'sirius_satellite_radio':'sirius'
            };

            var matches = url.match("(#/?|\\?)(.*$)");
            if(!!matches && matches.length > 2) {
                params = this.queryStringToObj(matches[2]);
            }

            var scqs = 'contentarea=radio';

            if(params.networkkey) {
                var key = (!!keyMap[params.networkkey]) ? keyMap[params.networkkey] : params.networkkey;
                scqs += '&subsection1='+key;
            }

            if(params.programkey) {
                scqs += '&subsection2='+params.programkey;
            }

            scqs += '&contenttype=page';

            return scqs;

        },

        queryStringToObj : function (qs){
            var pairs = qs.split(/[;&]/);
            var obj = {};
            for (var i=0; i<pairs.length; i++) {
                var pair = pairs[i].split('=');
                var key = unescape(pair[0].toLowerCase());
                var val = unescape(pair[1]).replace(/\+/g, ' ');
                if (key.length > 0 && val.length > 0) {
                    obj[key] = val;
                }
            }
            return obj;
        },

        arrayFromArguments : function(args) {

            var resultArray = [];

            for(var i = 0; i < args.length; i++) {
                resultArray[i] = args[i];
            }

            return resultArray;
        }
    };
}();

CBC.APP.SC.TIMER = function() {

    _start = null;
    _end = null;

    return {

        start : function() {
            _start = new Date().getTime();
        },

        end : function() {
            _end = new Date().getTime();
        },

        report : function() {
            return _end - _start;
        }
        
    };

}();
