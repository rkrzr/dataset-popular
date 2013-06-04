
(function($) {
    $.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
        s = $.extend({top: 'auto',left: 'auto',width: 'auto',height: 'auto',opacity: true,src: 'javascript:false;'}, s);
        var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' + 'style="display:block;position:absolute;z-index:-1;' + 
        (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') + 'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' + 'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' + 'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' + 'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' + '"/>';
        return this.each(function() {
            if ($(this).children('iframe.bgiframe').length === 0)
                this.insertBefore(document.createElement(html), this.firstChild);
        });
    } : function() {
        return this;
    });
    $.fn.bgIframe = $.fn.bgiframe;
    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }
})(jQuery);

// Attempt to mass fix a few errors
jQuery.fn.extend({
// ############ IE6 PNGFIX ########################
    ie6PNGFix: function()
    {
        if (!(jQuery.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent))) {
            return this;
        }
        return this.each(function() {
          var image = jQuery(this);
          var image_url = image.css('background-image').replace(/url|\(|\)|"/g, '');
          if (image_url.match(/\.png|\.PNG/)) {

            var alphaImageLoader =
              "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
              image_url +
              "', sizingMethod='scale');" ;
              image.attr('style', alphaImageLoader);
            image.css('background-image', 'none');
          }
        });
    },

// ############ IE6 HOVER FIX ########################
    ie6HoverFix: function()
    {
        if (!(jQuery.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent))) {
            return this;
        }
        return this.hover(function() {
      jQuery(this).addClass('hover');
    }, function() {
      jQuery(this).removeClass('hover');
    });
    },

// ############ IMAGE PRELOADER ########################
  backgroundLoadImage: function(src, callback) {
    var self = this;
    var image = jQuery(new Image()).load(function () {
      self.filter('img').each(function() {
        jQuery(this).attr('src', src);
        if (callback) {
          callback.call(this);
        }
      });
    }).attr('src', src);
    return this;
  },

// ############ IMAGE CENTERING ########################
  centerImageToBox: function(maxWidth, maxHeight) {
    return this.filter('img').each(function() {
      var image = jQuery(this);
      // copy src to temporary image so that CSS styles don't influence sizing (eg. in webkit)
      var img = new Image();
      jQuery(img).attr('src', image.attr('src'));
      var scaledHeight = Math.round(img.height * (maxWidth/img.width));
      if (scaledHeight < maxHeight) {
        image.css({width: maxWidth, height: scaledHeight});
        image.css('padding-top', Math.floor(((maxHeight - scaledHeight) / 2)));
      } else {
        var scaledWidth = Math.round(img.width * (maxHeight/img.height));
        image.css({width: scaledWidth, height: maxHeight});
        image.css({display: 'block', margin: 'auto'});
      }
    });
  },

//############ ANIMATION HELPERS ########################
  animDelay: function(delay) {
    return this.queue(function() {
      var e = jQuery(this);
      window.setTimeout(function() { e.dequeue() ; }, delay);
    });
  },

  afterAnim: function(callback) {
    return this.queue(function() { callback(); jQuery(this).dequeue(); });
  }
});


(function(c) {
    var i = c.fn.remove, d = c.browser.mozilla && (parseFloat(c.browser.version) < 1.9);
    c.ui = {version: "1.6rc6",plugin: {add: function(k, l, n) {
                var m = c.ui[k].prototype;
                for (var j in n) {
                    m.plugins[j] = m.plugins[j] || [];
                    m.plugins[j].push([l, n[j]])
                }
            },call: function(j, l, k) {
                var n = j.plugins[l];
                if (!n) {
                    return
                }
                for (var m = 0; m < n.length; m++) {
                    if (j.options[n[m][0]]) {
                        n[m][1].apply(j.element, k)
                    }
                }
            }},contains: function(k, j) {
            return document.compareDocumentPosition ? k.compareDocumentPosition(j) & 16 : k !== j && k.contains(j)
        },cssCache: {},css: function(j) {
            if (c.ui.cssCache[j]) {
                return c.ui.cssCache[j]
            }
            var k = c('<div class="ui-gen"></div>').addClass(j).css({position: "absolute",top: "-5000px",left: "-5000px",display: "block"}).appendTo("body");
            c.ui.cssCache[j] = !!((!(/auto|default/).test(k.css("cursor")) || (/^[1-9]/).test(k.css("height")) || (/^[1-9]/).test(k.css("width")) || !(/none/).test(k.css("backgroundImage")) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(k.css("backgroundColor"))));
            try {
                c("body").get(0).removeChild(k.get(0))
            } catch (l) {
            }
            return c.ui.cssCache[j]
        },hasScroll: function(m, k) {
            if (c(m).css("overflow") == "hidden") {
                return false
            }
            var j = (k && k == "left") ? "scrollLeft" : "scrollTop", l = false;
            if (m[j] > 0) {
                return true
            }
            m[j] = 1;
            l = (m[j] > 0);
            m[j] = 0;
            return l
        },isOverAxis: function(k, j, l) {
            return (k > j) && (k < (j + l))
        },isOver: function(o, k, n, m, j, l) {
            return c.ui.isOverAxis(o, n, j) && c.ui.isOverAxis(k, m, l)
        },keyCode: {BACKSPACE: 8,CAPS_LOCK: 20,COMMA: 188,CONTROL: 17,DELETE: 46,DOWN: 40,END: 35,ENTER: 13,ESCAPE: 27,HOME: 36,INSERT: 45,LEFT: 37,NUMPAD_ADD: 107,NUMPAD_DECIMAL: 110,NUMPAD_DIVIDE: 111,NUMPAD_ENTER: 108,NUMPAD_MULTIPLY: 106,NUMPAD_SUBTRACT: 109,PAGE_DOWN: 34,PAGE_UP: 33,PERIOD: 190,RIGHT: 39,SHIFT: 16,SPACE: 32,TAB: 9,UP: 38}};
    if (d) {
        var f = c.attr, e = c.fn.removeAttr, h = "http://www.w3.org/2005/07/aaa", a = /^aria-/, b = /^wairole:/;
        c.attr = function(k, j, l) {
            var m = l !== undefined;
            return (j == "role" ? (m ? f.call(this, k, j, "wairole:" + l) : (f.apply(this, arguments) || "").replace(b, "")) : (a.test(j) ? (m ? k.setAttributeNS(h, j.replace(a, "aaa:"), l) : f.call(this, k, j.replace(a, "aaa:"))) : f.apply(this, arguments)))
        };
        c.fn.removeAttr = function(j) {
            return (a.test(j) ? this.each(function() {
                this.removeAttributeNS(h, j.replace(a, ""))
            }) : e.call(this, j))
        }
    }
    c.fn.extend({remove: function() {
            c("*", this).add(this).each(function() {
                c(this).triggerHandler("remove")
            });
            return i.apply(this, arguments)
        },enableSelection: function() {
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
        },disableSelection: function() {
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
                return false
            })
        },scrollParent: function() {
            var j;
            if ((c.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                j = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test(c.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            } else {
                j = this.parents().filter(function() {
                    return (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !j.length ? c(document) : j
        }});
    c.extend(c.expr[":"], {data: function(l, k, j) {
            return !!c.data(l, j[3])
        },focusable: function(k) {
            var l = k.nodeName.toLowerCase(), j = c.attr(k, "tabindex");
            return (/input|select|textarea|button|object/.test(l) ? !k.disabled : "a" == l || "area" == l ? k.href || !isNaN(j) : !isNaN(j)) && !c(k)["area" == l ? "parents" : "closest"](":hidden").length
        },tabbable: function(k) {
            var j = c.attr(k, "tabindex");
            return (isNaN(j) || j >= 0) && c(k).is(":focusable")
        }});
    function g(m, n, o, l) {
        function k(q) {
            var p = c[m][n][q] || [];
            return (typeof p == "string" ? p.split(/,?\s+/) : p)
        }
        var j = k("getter");
        if (l.length == 1 && typeof l[0] == "string") {
            j = j.concat(k("getterSetter"))
        }
        return (c.inArray(o, j) != -1)
    }
    c.widget = function(k, j) {
        var l = k.split(".")[0];
        k = k.split(".")[1];
        c.fn[k] = function(p) {
            var n = (typeof p == "string"), o = Array.prototype.slice.call(arguments, 1);
            if (n && p.substring(0, 1) == "_") {
                return this
            }
            if (n && g(l, k, p, o)) {
                var m = c.data(this[0], k);
                return (m ? m[p].apply(m, o) : undefined)
            }
            return this.each(function() {
                var q = c.data(this, k);
                (!q && !n && c.data(this, k, new c[l][k](this, p))._init());
                (q && n && c.isFunction(q[p]) && q[p].apply(q, o))
            })
        };
        c[l] = c[l] || {};
        c[l][k] = function(o, n) {
            var m = this;
            this.namespace = l;
            this.widgetName = k;
            this.widgetEventPrefix = c[l][k].eventPrefix || k;
            this.widgetBaseClass = l + "-" + k;
            this.options = c.extend({}, c.widget.defaults, c[l][k].defaults, c.metadata && c.metadata.get(o)[k], n);
            this.element = c(o).bind("setData." + k, function(q, p, r) {
                if (q.target == o) {
                    return m._setData(p, r)
                }
            }).bind("getData." + k, function(q, p) {
                if (q.target == o) {
                    return m._getData(p)
                }
            }).bind("remove", function() {
                return m.destroy()
            })
        };
        c[l][k].prototype = c.extend({}, c.widget.prototype, j);
        c[l][k].getterSetter = "option"
    };
    c.widget.prototype = {_init: function() {
        },destroy: function() {
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled")
        },option: function(l, m) {
            var k = l, j = this;
            if (typeof l == "string") {
                if (m === undefined) {
                    return this._getData(l)
                }
                k = {};
                k[l] = m
            }
            c.each(k, function(n, o) {
                j._setData(n, o)
            })
        },_getData: function(j) {
            return this.options[j]
        },_setData: function(j, k) {
            this.options[j] = k;
            if (j == "disabled") {
                this.element[k ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", k)
            }
        },enable: function() {
            this._setData("disabled", false)
        },disable: function() {
            this._setData("disabled", true)
        },_trigger: function(l, m, n) {
            var p = this.options[l], j = (l == this.widgetEventPrefix ? l : this.widgetEventPrefix + l);
            m = c.Event(m);
            m.type = j;
            if (m.originalEvent) {
                for (var k = c.event.props.length, o; k; ) {
                    o = c.event.props[--k];
                    m[o] = m.originalEvent[o]
                }
            }
            this.element.trigger(m, n);
            return !(c.isFunction(p) && p.call(this.element[0], m, n) === false || m.isDefaultPrevented())
        }};
    c.widget.defaults = {disabled: false};
    c.ui.mouse = {_mouseInit: function() {
            var j = this;
            this.element.bind("mousedown." + this.widgetName, function(k) {
                return j._mouseDown(k)
            }).bind("click." + this.widgetName, function(k) {
                if (j._preventClickEvent) {
                    j._preventClickEvent = false;
                    return false
                }
            });
            if (c.browser.msie) {
                this._mouseUnselectable = this.element.attr("unselectable");
                this.element.attr("unselectable", "on")
            }
            this.started = false
        },_mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            (c.browser.msie && this.element.attr("unselectable", this._mouseUnselectable))
        },_mouseDown: function(l) {
            if (l.originalEvent.mouseHandled) {
                return
            }
            (this._mouseStarted && this._mouseUp(l));
            this._mouseDownEvent = l;
            var k = this, m = (l.which == 1), j = (typeof this.options.cancel == "string" ? c(l.target).parents().add(l.target).filter(this.options.cancel).length : false);
            if (!m || j || !this._mouseCapture(l)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    k.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(l) && this._mouseDelayMet(l)) {
                this._mouseStarted = (this._mouseStart(l) !== false);
                if (!this._mouseStarted) {
                    l.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function(n) {
                return k._mouseMove(n)
            };
            this._mouseUpDelegate = function(n) {
                return k._mouseUp(n)
            };
            c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (c.browser.safari || l.preventDefault());
            l.originalEvent.mouseHandled = true;
            return true
        },_mouseMove: function(j) {
            if (c.browser.msie && !j.button) {
                return this._mouseUp(j)
            }
            if (this._mouseStarted) {
                this._mouseDrag(j);
                return j.preventDefault()
            }
            if (this._mouseDistanceMet(j) && this._mouseDelayMet(j)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, j) !== false);
                (this._mouseStarted ? this._mouseDrag(j) : this._mouseUp(j))
            }
            return !this._mouseStarted
        },_mouseUp: function(j) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = true;
                this._mouseStop(j)
            }
            return false
        },_mouseDistanceMet: function(j) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - j.pageX), Math.abs(this._mouseDownEvent.pageY - j.pageY)) >= this.options.distance)
        },_mouseDelayMet: function(j) {
            return this.mouseDelayMet
        },_mouseStart: function(j) {
        },_mouseDrag: function(j) {
        },_mouseStop: function(j) {
        },_mouseCapture: function(j) {
            return true
        }};
    c.ui.mouse.defaults = {cancel: null,distance: 1,delay: 0}
})(jQuery)

;
(function(a) {
    a.widget("ui.draggable", a.extend({}, a.ui.mouse, {_init: function() {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            (this.options.cssNamespace && this.element.addClass(this.options.cssNamespace + "-draggable"));
            (this.options.disabled && this.element.addClass(this.options.cssNamespace + "-draggable-disabled"));
            this._mouseInit()
        },destroy: function() {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass(this.options.cssNamespace + "-draggable " + this.options.cssNamespace + "-draggable-dragging " + this.options.cssNamespace + "-draggable-disabled");
            this._mouseDestroy()
        },_mouseCapture: function(b) {
            var c = this.options;
            if (this.helper || c.disabled || a(b.target).is("." + this.options.cssNamespace + "-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(b);
            if (!this.handle) {
                return false
            }
            return true
        },_mouseStart: function(b) {
            var c = this.options;
            this.helper = this._createHelper(b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.element.offset();
            this.offset = {top: this.offset.top - this.margins.top,left: this.offset.left - this.margins.left};
            a.extend(this.offset, {click: {left: b.pageX - this.offset.left,top: b.pageY - this.offset.top},parent: this._getParentOffset(),relative: this._getRelativeOffset()});
            this.originalPosition = this._generatePosition(b);
            this.originalPageX = b.pageX;
            this.originalPageY = b.pageY;
            if (c.cursorAt) {
                this._adjustOffsetFromHelper(c.cursorAt)
            }
            if (c.containment) {
                this._setContainment()
            }
            this._trigger("start", b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager && !c.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.helper.addClass(c.cssNamespace + "-draggable-dragging");
            this._mouseDrag(b, true);
            return true
        },_mouseDrag: function(b, d) {
            this.position = this._generatePosition(b);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!d) {
                var c = this._uiHash();
                this._trigger("drag", b, c);
                this.position = c.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, b)
            }
            return false
        },_mouseStop: function(c) {
            var d = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                d = a.ui.ddmanager.drop(this, c)
            }
            if (this.dropped) {
                d = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert == "invalid" && !d) || (this.options.revert == "valid" && d) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, d))) {
                var b = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    b._trigger("stop", c);
                    b._clear()
                })
            } else {
                this._trigger("stop", c);
                this._clear()
            }
            return false
        },_getHandle: function(b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this == b.target) {
                    c = true
                }
            });
            return c
        },_createHelper: function(c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : (d.helper == "clone" ? this.element.clone() : this.element);
            if (!b.parents("body").length) {
                b.appendTo((d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo))
            }
            if (b[0] != this.element[0] && !(/(fixed|absolute)/).test(b.css("position"))) {
                b.css("position", "absolute")
            }
            return b
        },_adjustOffsetFromHelper: function(b) {
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },_getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body && a.browser.mozilla) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {top: 0,left: 0}
            }
            return {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        },_getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var b = this.element.position();
                return {top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            } else {
                return {top: 0,left: 0}
            }
        },_cacheMargins: function() {
            this.margins = {left: (parseInt(this.element.css("marginLeft"), 10) || 0),top: (parseInt(this.element.css("marginTop"), 10) || 0)}
        },_cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(),height: this.helper.outerHeight()}
        },_setContainment: function() {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment) && e.containment.constructor != Array) {
                var c = a(e.containment)[0];
                if (!c) {
                    return
                }
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            } else {
                if (e.containment.constructor == Array) {
                    this.containment = e.containment
                }
            }
        },_convertPositionTo: function(f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c),left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c)}
        },_generatePosition: function(e) {
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop()))),left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft()))}
        },_clear: function() {
            this.helper.removeClass(this.options.cssNamespace + "-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },_trigger: function(b, c, d) {
            d = d || this._uiHash();
            a.ui.plugin.call(this, b, [c, d]);
            if (b == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return a.widget.prototype._trigger.call(this, b, c, d)
        },plugins: {},_uiHash: function(b) {
            return {helper: this.helper,position: this.position,absolutePosition: this.positionAbs,offset: this.positionAbs}
        }}));
    a.extend(a.ui.draggable, {version: "1.6rc6",eventPrefix: "drag",defaults: {appendTo: "parent",axis: false,cancel: ":input,option",connectToSortable: false,containment: false,cssNamespace: "ui",cursor: "default",cursorAt: false,delay: 0,distance: 1,grid: false,handle: false,helper: "original",iframeFix: false,opacity: false,refreshPositions: false,revert: false,revertDuration: 500,scope: "default",scroll: true,scrollSensitivity: 20,scrollSpeed: 20,snap: false,snapMode: "both",snapTolerance: 20,stack: false,zIndex: false}});
    a.ui.plugin.add("draggable", "connectToSortable", {start: function(b, d) {
            var c = a(this).data("draggable"), e = c.options;
            c.sortables = [];
            a(e.connectToSortable).each(function() {
                a(typeof this == "string" ? this + "" : this).each(function() {
                    if (a.data(this, "sortable")) {
                        var f = a.data(this, "sortable");
                        c.sortables.push({instance: f,shouldRevert: f.options.revert});
                        f._refreshItems();
                        f._trigger("activate", b, c)
                    }
                })
            })
        },stop: function(b, d) {
            var c = a(this).data("draggable");
            a.each(c.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    c.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(b);
                    this.instance.options.helper = this.instance.options._helper;
                    if (c.options.helper == "original") {
                        this.instance.currentItem.css({top: "auto",left: "auto"})
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", b, c)
                }
            })
        },drag: function(c, f) {
            var e = a(this).data("draggable"), b = this;
            var d = function(i) {
                var n = this.offset.click.top, m = this.offset.click.left;
                var g = this.positionAbs.top, k = this.positionAbs.left;
                var j = i.height, l = i.width;
                var p = i.top, h = i.left;
                return a.ui.isOver(g + n, k + m, p, h, j, l)
            };
            a.each(e.sortables, function(g) {
                if (d.call(e, this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(b).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return f.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = e.offset.click.top;
                        this.instance.offset.click.left = e.offset.click.left;
                        this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                        e._trigger("toSortable", c);
                        e.dropped = this.instance.element;
                        this.instance.fromOutside = e
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(c)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._mouseStop(c, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        e._trigger("fromSortable", c);
                        e.dropped = false
                    }
                }
            })
        }});
    a.ui.plugin.add("draggable", "cursor", {start: function(c, d) {
            var b = a("body"), e = a(this).data("draggable").options;
            if (b.css("cursor")) {
                e._cursor = b.css("cursor")
            }
            b.css("cursor", e.cursor)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            if (d._cursor) {
                a("body").css("cursor", d._cursor)
            }
        }});
    a.ui.plugin.add("draggable", "iframeFix", {start: function(b, c) {
            var d = a(this).data("draggable").options;
            a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width: this.offsetWidth + "px",height: this.offsetHeight + "px",position: "absolute",opacity: "0.001",zIndex: 1000}).css(a(this).offset()).appendTo("body")
            })
        },stop: function(b, c) {
            a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            })
        }});
    a.ui.plugin.add("draggable", "opacity", {start: function(c, d) {
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("opacity")) {
                e._opacity = b.css("opacity")
            }
            b.css("opacity", e.opacity)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            if (d._opacity) {
                a(c.helper).css("opacity", d._opacity)
            }
        }});
    a.ui.plugin.add("draggable", "scroll", {start: function(c, d) {
            var b = a(this).data("draggable");
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                b.overflowOffset = b.scrollParent.offset()
            }
        },drag: function(d, e) {
            var c = a(this).data("draggable"), f = c.options, b = false;
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                if (!f.axis || f.axis != "x") {
                    if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight) - d.pageY < f.scrollSensitivity) {
                        c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop + f.scrollSpeed
                    } else {
                        if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
                            c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop - f.scrollSpeed
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth) - d.pageX < f.scrollSensitivity) {
                        c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft + f.scrollSpeed
                    } else {
                        if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
                            c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft - f.scrollSpeed
                        }
                    }
                }
            } else {
                if (!f.axis || f.axis != "x") {
                    if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
                    } else {
                        if (a(window).height() - (d.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
                    } else {
                        if (a(window).width() - (d.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
                        }
                    }
                }
            }
            if (b !== false && a.ui.ddmanager && !f.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
        }});
    a.ui.plugin.add("draggable", "snap", {start: function(c, d) {
            var b = a(this).data("draggable"), e = b.options;
            b.snapElements = [];
            a(e.snap.constructor != String ? (e.snap.items || ":data(draggable)") : e.snap).each(function() {
                var g = a(this);
                var f = g.offset();
                if (this != b.element[0]) {
                    b.snapElements.push({item: this,width: g.outerWidth(),height: g.outerHeight(),top: f.top,left: f.left})
                }
            })
        },drag: function(u, p) {
            var g = a(this).data("draggable"), q = g.options;
            var y = q.snapTolerance;
            var x = p.absolutePosition.left, w = x + g.helperProportions.width, f = p.absolutePosition.top, e = f + g.helperProportions.height;
            for (var v = g.snapElements.length - 1; v >= 0; v--) {
                var s = g.snapElements[v].left, n = s + g.snapElements[v].width, m = g.snapElements[v].top, A = m + g.snapElements[v].height;
                if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                    if (g.snapElements[v].snapping) {
                        (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
                    }
                    g.snapElements[v].snapping = false;
                    continue
                }
                if (q.snapMode != "inner") {
                    var c = Math.abs(m - e) <= y;
                    var z = Math.abs(A - f) <= y;
                    var j = Math.abs(s - w) <= y;
                    var k = Math.abs(n - x) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {top: m - g.helperProportions.height,left: 0}).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {top: A,left: 0}).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {top: 0,left: s - g.helperProportions.width}).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {top: 0,left: n}).left - g.margins.left
                    }
                }
                var h = (c || z || j || k);
                if (q.snapMode != "outer") {
                    var c = Math.abs(m - f) <= y;
                    var z = Math.abs(A - e) <= y;
                    var j = Math.abs(s - x) <= y;
                    var k = Math.abs(n - w) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {top: m,left: 0}).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {top: A - g.helperProportions.height,left: 0}).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {top: 0,left: s}).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {top: 0,left: n - g.helperProportions.width}).left - g.margins.left
                    }
                }
                if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                    (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {snapItem: g.snapElements[v].item})))
                }
                g.snapElements[v].snapping = (c || z || j || k || h)
            }
        }});
    a.ui.plugin.add("draggable", "stack", {start: function(b, c) {
            var e = a(this).data("draggable").options;
            var d = a.makeArray(a(e.stack.group)).sort(function(g, f) {
                return (parseInt(a(g).css("zIndex"), 10) || e.stack.min) - (parseInt(a(f).css("zIndex"), 10) || e.stack.min)
            });
            a(d).each(function(f) {
                this.style.zIndex = e.stack.min + f
            });
            this[0].style.zIndex = e.stack.min + d.length
        }});
    a.ui.plugin.add("draggable", "zIndex", {start: function(c, d) {
            var b = a(d.helper), e = a(this).data("draggable").options;
            if (b.css("zIndex")) {
                e._zIndex = b.css("zIndex")
            }
            b.css("zIndex", e.zIndex)
        },stop: function(b, c) {
            var d = a(this).data("draggable").options;
            if (d._zIndex) {
                a(c.helper).css("zIndex", d._zIndex)
            }
        }})
})(jQuery);

(function(a) {
    a.widget("ui.droppable", {_init: function() {
            var c = this.options, b = c.accept;
            this.isover = 0;
            this.isout = 1;
            this.options.accept = this.options.accept && a.isFunction(this.options.accept) ? this.options.accept : function(e) {
                return e.is(b)
            };
            this.proportions = {width: this.element[0].offsetWidth,height: this.element[0].offsetHeight};
            a.ui.ddmanager.droppables[this.options.scope] = a.ui.ddmanager.droppables[this.options.scope] || [];
            a.ui.ddmanager.droppables[this.options.scope].push(this);
            (this.options.cssNamespace && this.element.addClass(this.options.cssNamespace + "-droppable"))
        },destroy: function() {
            var b = a.ui.ddmanager.droppables[this.options.scope];
            for (var c = 0; c < b.length; c++) {
                if (b[c] == this) {
                    b.splice(c, 1)
                }
            }
            this.element.removeClass(this.options.cssNamespace + "-droppable " + this.options.cssNamespace + "-droppable-disabled").removeData("droppable").unbind(".droppable")
        },_setData: function(b, c) {
            if (b == "accept") {
                this.options.accept = c && a.isFunction(c) ? c : function(e) {
                    return e.is(accept)
                }
            } else {
                a.widget.prototype._setData.apply(this, arguments)
            }
        },_activate: function(c) {
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            (b && this._trigger("activate", c, this.ui(b)))
        },_deactivate: function(c) {
            var b = a.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            (b && this._trigger("deactivate", c, this.ui(b)))
        },_over: function(c) {
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", c, this.ui(b))
            }
        },_out: function(c) {
            var b = a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", c, this.ui(b))
            }
        },_drop: function(c, d) {
            var b = d || a.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
                return false
            }
            var e = false;
            this.element.find(":data(droppable)").not("." + b.options.cssNamespace + "-draggable-dragging").each(function() {
                var f = a.data(this, "droppable");
                if (f.options.greedy && a.ui.intersect(b, a.extend(f, {offset: f.element.offset()}), f.options.tolerance)) {
                    e = true;
                    return false
                }
            });
            if (e) {
                return false
            }
            if (this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", c, this.ui(b));
                return this.element
            }
            return false
        },ui: function(b) {
            return {draggable: (b.currentItem || b.element),helper: b.helper,position: b.position,absolutePosition: b.positionAbs,offset: b.positionAbs}
        }});
    a.extend(a.ui.droppable, {version: "1.6rc6",eventPrefix: "drop",defaults: {accept: "*",activeClass: false,cssNamespace: "ui",greedy: false,hoverClass: false,scope: "default",tolerance: "intersect"}});
    a.ui.intersect = function(q, j, o) {
        if (!j.offset) {
            return false
        }
        var e = (q.positionAbs || q.position.absolute).left, d = e + q.helperProportions.width, n = (q.positionAbs || q.position.absolute).top, m = n + q.helperProportions.height;
        var g = j.offset.left, c = g + j.proportions.width, p = j.offset.top, k = p + j.proportions.height;
        switch (o) {
            case "fit":
                return (g < e && d < c && p < n && m < k);
                break;
            case "intersect":
                return (g < e + (q.helperProportions.width / 2) && d - (q.helperProportions.width / 2) < c && p < n + (q.helperProportions.height / 2) && m - (q.helperProportions.height / 2) < k);
                break;
            case "pointer":
                var h = ((q.positionAbs || q.position.absolute).left + (q.clickOffset || q.offset.click).left), i = ((q.positionAbs || q.position.absolute).top + (q.clickOffset || q.offset.click).top), f = a.ui.isOver(i, h, p, g, j.proportions.height, j.proportions.width);
                return f;
                break;
            case "touch":
                return ((n >= p && n <= k) || (m >= p && m <= k) || (n < p && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));
                break;
            default:
                return false;
                break
        }
    };
    a.ui.ddmanager = {current: null,droppables: {"default": []},prepareOffsets: function(e, g) {
            var b = a.ui.ddmanager.droppables[e.options.scope];
            var f = g ? g.type : null;
            var h = (e.currentItem || e.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var d = 0; d < b.length; d++) {
                if (b[d].options.disabled || (e && !b[d].options.accept.call(b[d].element[0], (e.currentItem || e.element)))) {
                    continue
                }
                for (var c = 0; c < h.length; c++) {
                    if (h[c] == b[d].element[0]) {
                        b[d].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                b[d].visible = b[d].element.css("display") != "none";
                if (!b[d].visible) {
                    continue
                }
                b[d].offset = b[d].element.offset();
                b[d].proportions = {width: b[d].element[0].offsetWidth,height: b[d].element[0].offsetHeight};
                if (f == "mousedown") {
                    b[d]._activate.call(b[d], g)
                }
            }
        },drop: function(b, c) {
            var d = false;
            a.each(a.ui.ddmanager.droppables[b.options.scope], function() {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance)) {
                    d = this._drop.call(this, c)
                }
                if (!this.options.disabled && this.visible && this.options.accept.call(this.element[0], (b.currentItem || b.element))) {
                    this.isout = 1;
                    this.isover = 0;
                    this._deactivate.call(this, c)
                }
            });
            return d
        },drag: function(b, c) {
            if (b.options.refreshPositions) {
                a.ui.ddmanager.prepareOffsets(b, c)
            }
            a.each(a.ui.ddmanager.droppables[b.options.scope], function() {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var e = a.ui.intersect(b, this, this.options.tolerance);
                var g = !e && this.isover == 1 ? "isout" : (e && this.isover == 0 ? "isover" : null);
                if (!g) {
                    return
                }
                var f;
                if (this.options.greedy) {
                    var d = this.element.parents(":data(droppable):eq(0)");
                    if (d.length) {
                        f = a.data(d[0], "droppable");
                        f.greedyChild = (g == "isover" ? 1 : 0)
                    }
                }
                if (f && g == "isover") {
                    f.isover = 0;
                    f.isout = 1;
                    f._out.call(f, c)
                }
                this[g] = 1;
                this[g == "isout" ? "isover" : "isout"] = 0;
                this[g == "isover" ? "_over" : "_out"].call(this, c);
                if (f && g == "isout") {
                    f.isout = 0;
                    f.isover = 1;
                    f._over.call(f, c)
                }
            })
        }}
})(jQuery);

(function(a) {
    a.widget("ui.sortable", a.extend({}, a.ui.mouse, {_init: function() {
            var b = this.options;
            this.containerCache = {};
            (this.options.cssNamespace && this.element.addClass(this.options.cssNamespace + "-sortable"));
            this.refresh();
            this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },destroy: function() {
            this.element.removeClass(this.options.cssNamespace + "-sortable " + this.options.cssNamespace + "-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var b = this.items.length - 1; b >= 0; b--) {
                this.items[b].item.removeData("sortable-item")
            }
        },_mouseCapture: function(e, f) {
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(e);
            var d = null, c = this, b = a(e.target).parents().each(function() {
                if (a.data(this, "sortable-item") == c) {
                    d = a(this);
                    return false
                }
            });
            if (a.data(e.target, "sortable-item") == c) {
                d = a(e.target)
            }
            if (!d) {
                return false
            }
            if (this.options.handle && !f) {
                var g = false;
                a(this.options.handle, d).find("*").andSelf().each(function() {
                    if (this == e.target) {
                        g = true
                    }
                });
                if (!g) {
                    return false
                }
            }
            this.currentItem = d;
            this._removeCurrentsFromItems();
            return true
        },_mouseStart: function(e, f, b) {
            var g = this.options, c = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(e);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {top: this.offset.top - this.margins.top,left: this.offset.left - this.margins.left};
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {click: {left: e.pageX - this.offset.left,top: e.pageY - this.offset.top},parent: this._getParentOffset(),relative: this._getRelativeOffset()});
            this.originalPosition = this._generatePosition(e);
            this.originalPageX = e.pageX;
            this.originalPageY = e.pageY;
            if (g.cursorAt) {
                this._adjustOffsetFromHelper(g.cursorAt)
            }
            this.domPosition = {prev: this.currentItem.prev()[0],parent: this.currentItem.parent()[0]};
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (g.containment) {
                this._setContainment()
            }
            if (g.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", g.cursor)
            }
            if (g.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", g.opacity)
            }
            if (g.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", g.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", e, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!b) {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("activate", e, c._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, e)
            }
            this.dragging = true;
            this.helper.addClass(g.cssNamespace + "-sortable-helper");
            this._mouseDrag(e);
            return true
        },_mouseDrag: function(f) {
            this.position = this._generatePosition(f);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var g = this.options, b = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - f.pageY < g.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop + g.scrollSpeed
                    } else {
                        if (f.pageY - this.overflowOffset.top < g.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop - g.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - f.pageX < g.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft + g.scrollSpeed
                    } else {
                        if (f.pageX - this.overflowOffset.left < g.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft - g.scrollSpeed
                        }
                    }
                } else {
                    if (f.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                    } else {
                        if (a(window).height() - (f.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                        }
                    }
                    if (f.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                    } else {
                        if (a(window).width() - (f.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                        }
                    }
                }
                if (b !== false && a.ui.ddmanager && !g.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, f)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d], c = e.item[0], h = this._intersectsWithPointer(e);
                if (!h) {
                    continue
                }
                if (c != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != c && !a.ui.contains(this.placeholder[0], c) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], c) : true)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
                        this.options.sortIndicator.call(this, f, e)
                    } else {
                        break
                    }
                    this._trigger("change", f, this._uiHash());
                    break
                }
            }
            this._contactContainers(f);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, f)
            }
            this._trigger("sort", f, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },_mouseStop: function(c, d) {
            if (!c) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, c)
            }
            if (this.options.revert) {
                var b = this;
                var e = b.placeholder.offset();
                b.reverting = true;
                a(this.helper).animate({left: e.left - this.offset.parent.left - b.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),top: e.top - this.offset.parent.top - b.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)}, parseInt(this.options.revert, 10) || 500, function() {
                    b._clear(c)
                })
            } else {
                this._clear(c, d)
            }
            return false
        },cancel: function() {
            var b = this;
            if (this.dragging) {
                this._mouseUp();
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass(this.options.cssNamespace + "-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    this.containers[c]._trigger("deactivate", null, b._uiHash(this));
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", null, b._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0])
            }
            if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                this.helper.remove()
            }
            a.extend(this, {helper: null,dragging: false,reverting: false,_noFinalSort: null});
            if (this.domPosition.prev) {
                a(this.domPosition.prev).after(this.currentItem)
            } else {
                a(this.domPosition.parent).prepend(this.currentItem)
            }
            return true
        },serialize: function(d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            a(b).each(function() {
                var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || (/(.+)[-=_](.+)/));
                if (e) {
                    c.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
                }
            });
            return c.join("&")
        },toArray: function(d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            b.each(function() {
                c.push(a(d.item || this).attr(d.attribute || "id") || "")
            });
            return c
        },_intersectsWith: function(m) {
            var e = this.positionAbs.left, d = e + this.helperProportions.width, k = this.positionAbs.top, j = k + this.helperProportions.height;
            var f = m.left, c = f + m.width, n = m.top, i = n + m.height;
            var o = this.offset.click.top, h = this.offset.click.left;
            var g = (k + o) > n && (k + o) < i && (e + h) > f && (e + h) < c;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
                return g
            } else {
                return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
            }
        },_intersectsWithPointer: function(d) {
            var e = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height), c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width), g = e && c, b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (!g) {
                return false
            }
            return this.floating ? (((f && f == "right") || b == "down") ? 2 : 1) : (b && (b == "down" ? 2 : 1))
        },_intersectsWithSides: function(e) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + (e.height / 2), e.height), d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + (e.width / 2), e.width), b = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
            if (this.floating && f) {
                return ((f == "right" && d) || (f == "left" && !d))
            } else {
                return b && ((b == "down" && c) || (b == "up" && !c))
            }
        },_getDragVerticalDirection: function() {
            var b = this.positionAbs.top - this.lastPositionAbs.top;
            return b != 0 && (b > 0 ? "down" : "up")
        },_getDragHorizontalDirection: function() {
            var b = this.positionAbs.left - this.lastPositionAbs.left;
            return b != 0 && (b > 0 ? "right" : "left")
        },refresh: function(b) {
            this._refreshItems(b);
            this.refreshPositions()
        },_getItemsAsjQuery: function(b) {
            var l = this;
            var g = [];
            var e = [];
            if (this.options.connectWith && b) {
                var h = this.options.connectWith.constructor == String ? [this.options.connectWith] : this.options.connectWith;
                for (var d = h.length - 1; d >= 0; d--) {
                    var k = a(h[d]);
                    for (var c = k.length - 1; c >= 0; c--) {
                        var f = a.data(k[c], "sortable");
                        if (f && f != this && !f.options.disabled) {
                            e.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not("." + f.options.cssNamespace + "-sortable-helper"), f])
                        }
                    }
                }
            }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options: this.options,item: this.currentItem}) : a(this.options.items, this.element).not("." + this.options.cssNamespace + "-sortable-helper"), this]);
            for (var d = e.length - 1; d >= 0; d--) {
                e[d][0].each(function() {
                    g.push(this)
                })
            }
            return a(g)
        },_removeCurrentsFromItems: function() {
            var d = this.currentItem.find(":data(sortable-item)");
            for (var c = 0; c < this.items.length; c++) {
                for (var b = 0; b < d.length; b++) {
                    if (d[b] == this.items[c].item[0]) {
                        this.items.splice(c, 1)
                    }
                }
            }
        },_refreshItems: function(b) {
            this.items = [];
            this.containers = [this];
            var h = this.items;
            var o = this;
            var f = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]];
            if (this.options.connectWith) {
                for (var e = this.options.connectWith.length - 1; e >= 0; e--) {
                    var l = a(this.options.connectWith[e]);
                    for (var d = l.length - 1; d >= 0; d--) {
                        var g = a.data(l[d], "sortable");
                        if (g && g != this && !g.options.disabled) {
                            f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {item: this.currentItem}) : a(g.options.items, g.element), g]);
                            this.containers.push(g)
                        }
                    }
                }
            }
            for (var e = f.length - 1; e >= 0; e--) {
                var k = f[e][1];
                var c = f[e][0];
                for (var d = 0, m = c.length; d < m; d++) {
                    var n = a(c[d]);
                    n.data("sortable-item", k);
                    h.push({item: n,instance: k,width: 0,height: 0,left: 0,top: 0})
                }
            }
        },refreshPositions: function(b) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d];
                if (e.instance != this.currentContainer && this.currentContainer && e.item[0] != this.currentItem[0]) {
                    continue
                }
                var c = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
                if (!b) {
                    if (this.options.accurateIntersection) {
                        e.width = c.outerWidth();
                        e.height = c.outerHeight()
                    } else {
                        e.width = c[0].offsetWidth;
                        e.height = c[0].offsetHeight
                    }
                }
                var f = c.offset();
                e.left = f.left;
                e.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    var f = this.containers[d].element.offset();
                    this.containers[d].containerCache.left = f.left;
                    this.containers[d].containerCache.top = f.top;
                    this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                    this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
                }
            }
        },_createPlaceholder: function(d) {
            var b = d || this, e = b.options;
            if (!e.placeholder || e.placeholder.constructor == String) {
                var c = e.placeholder;
                e.placeholder = {element: function() {
                        var f = a(document.createElement(b.currentItem[0].nodeName)).addClass(c || b.currentItem[0].className + " " + b.options.cssNamespace + "-sortable-placeholder").removeClass(b.options.cssNamespace + "-sortable-helper")[0];
                        if (!c) {
                            f.style.visibility = "hidden"
                        }
                        return f
                    },update: function(f, g) {
                        if (c && !e.forcePlaceholderSize) {
                            return
                        }
                        if (!g.height()) {
                            g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!g.width()) {
                            g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                        }
                    }}
            }
            b.placeholder = a(e.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            e.placeholder.update(b, b.placeholder)
        },_contactContainers: function(d) {
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (this._intersectsWith(this.containers[c].containerCache)) {
                    if (!this.containers[c].containerCache.over) {
                        if (this.currentContainer != this.containers[c]) {
                            var h = 10000;
                            var g = null;
                            var e = this.positionAbs[this.containers[c].floating ? "left" : "top"];
                            for (var b = this.items.length - 1; b >= 0; b--) {
                                if (!a.ui.contains(this.containers[c].element[0], this.items[b].item[0])) {
                                    continue
                                }
                                var f = this.items[b][this.containers[c].floating ? "left" : "top"];
                                if (Math.abs(f - e) < h) {
                                    h = Math.abs(f - e);
                                    g = this.items[b]
                                }
                            }
                            if (!g && !this.options.dropOnEmpty) {
                                continue
                            }
                            this.currentContainer = this.containers[c];
                            g ? this.options.sortIndicator.call(this, d, g, null, true) : this.options.sortIndicator.call(this, d, null, this.containers[c].element, true);
                            this._trigger("change", d, this._uiHash());
                            this.containers[c]._trigger("change", d, this._uiHash(this));
                            this.options.placeholder.update(this.currentContainer, this.placeholder)
                        }
                        this.containers[c]._trigger("over", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 1
                    }
                } else {
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
        },_createHelper: function(c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : (d.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!b.parents("body").length) {
                a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0])
            }
            if (b[0] == this.currentItem[0]) {
                this._storedCSS = {width: this.currentItem[0].style.width,height: this.currentItem[0].style.height,position: this.currentItem.css("position"),top: this.currentItem.css("top"),left: this.currentItem.css("left")}
            }
            if (b[0].style.width == "" || d.forceHelperSize) {
                b.width(this.currentItem.width())
            }
            if (b[0].style.height == "" || d.forceHelperSize) {
                b.height(this.currentItem.height())
            }
            return b
        },_adjustOffsetFromHelper: function(b) {
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },_getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body && a.browser.mozilla) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {top: 0,left: 0}
            }
            return {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        },_getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var b = this.currentItem.position();
                return {top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            } else {
                return {top: 0,left: 0}
            }
        },_cacheMargins: function() {
            this.margins = {left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)}
        },_cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(),height: this.helper.outerHeight()}
        },_setContainment: function() {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment)) {
                var c = a(e.containment)[0];
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },_convertPositionTo: function(f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, g = (/(html|body)/i).test(b[0].tagName);
            return {top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c),left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c)}
        },_generatePosition: function(e) {
            var h = this.options, b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop()))),left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft()))}
        },_rearrange: function(g, f, c, e) {
            c ? c[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? f.item[0] : f.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var d = this, b = this.counter;
            window.setTimeout(function() {
                if (b == d.counter) {
                    d.refreshPositions(!e)
                }
            }, 0)
        },_clear: function(d, e) {
            this.reverting = false;
            var f = [], b = this;
            if (!this._noFinalSort) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var c in this._storedCSS) {
                    if (this._storedCSS[c] == "auto" || this._storedCSS[c] == "static") {
                        this._storedCSS[c] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass(this.options.cssNamespace + "-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !e) {
                f.push(function(g) {
                    this._trigger("receive", g, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not("." + this.options.cssNamespace + "-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) {
                f.push(function(g) {
                    this._trigger("update", g, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                if (!e) {
                    f.push(function(g) {
                        this._trigger("remove", g, this._uiHash())
                    })
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    if (a.ui.contains(this.containers[c].element[0], this.currentItem[0]) && !e) {
                        f.push((function(g) {
                            return function(h) {
                                g._trigger("receive", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]));
                        f.push((function(g) {
                            return function(h) {
                                g._trigger("update", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]))
                    }
                }
            }
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (!e) {
                    f.push((function(g) {
                        return function(h) {
                            g._trigger("deactivate", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]))
                }
                if (this.containers[c].containerCache.over) {
                    f.push((function(g) {
                        return function(h) {
                            g._trigger("out", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]));
                    this.containers[c].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                a("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedCursor)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!e) {
                    this._trigger("beforeStop", d, this._uiHash());
                    for (var c = 0; c < f.length; c++) {
                        f[c].call(this, d)
                    }
                    this._trigger("stop", d, this._uiHash())
                }
                return false
            }
            if (!e) {
                this._trigger("beforeStop", d, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!e) {
                for (var c = 0; c < f.length; c++) {
                    f[c].call(this, d)
                }
                this._trigger("stop", d, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },_trigger: function() {
            if (a.widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },_uiHash: function(c) {
            var b = c || this;
            return {helper: b.helper,placeholder: b.placeholder || a([]),position: b.position,absolutePosition: b.positionAbs,offset: b.positionAbs,item: b.currentItem,sender: c ? c.element : null}
        }}));
    a.extend(a.ui.sortable, {getter: "serialize toArray",version: "1.6rc6",defaults: {accurateIntersection: true,appendTo: "parent",cancel: ":input,option",connectWith: false,cssNamespace: "ui",delay: 0,distance: 1,dropOnEmpty: true,forcePlaceholderSize: false,forceHelperSize: false,handle: false,helper: "original",items: "> *",placeholder: false,scope: "default",scroll: true,scrollSensitivity: 20,scrollSpeed: 20,sortIndicator: a.ui.sortable.prototype._rearrange,tolerance: "intersect",zIndex: 1000}})
})(jQuery);

(function(a) {
    a.widget("ui.accordion", {_init: function() {
            var d = this.options, b = this;
            this.running = 0;
            if (d.navigation) {
                var c = this.element.find("a").filter(d.navigationFilter);
                if (c.length) {
                    if (c.filter(d.header).length) {
                        this.active = c
                    } else {
                        this.active = c.parent().parent().prev();
                        c.addClass("ui-accordion-content-active")
                    }
                }
            }
            this.element.addClass("ui-accordion ui-widget ui-helper-reset");
            this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                a(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function() {
                a(this).removeClass("ui-state-hover")
            });
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            this.active = this._findActive(this.active || d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            this.active.next().addClass("ui-accordion-content-active");
            a("<span/>").addClass("ui-icon " + d.icons.header).prependTo(this.headers);
            this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);
            if (a.browser.msie) {
                this.element.find("a").css("zoom", "1")
            }
            this.resize();
            this.element.attr("role", "tablist");
            this.headers.attr("role", "tab").bind("keydown", function(e) {
                return b._keydown(e)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", "0")
            } else {
                this.active.attr("aria-expanded", "true").attr("tabIndex", "0")
            }
            if (!a.browser.safari) {
                this.headers.find("a").attr("tabIndex", "-1")
            }
            if (d.event) {
                this.element.bind((d.event) + ".accordion", function(e) {
                    return b._clickHandler.call(b, e)
                })
            }
        },destroy: function() {
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
            this.headers.find("a").removeAttr("tabindex");
            this.headers.children(".ui-icon").remove();
            this.headers.next().removeClass("ui-accordion-content ui-accordion-content-active")
        },_keydown: function(e) {
            var g = this.options, f = a.ui.keyCode;
            if (g.disabled || e.altKey || e.ctrlKey) {
                return
            }
            var d = this.headers.length;
            var b = this.headers.index(e.target);
            var c = false;
            switch (e.keyCode) {
                case f.RIGHT:
                case f.DOWN:
                    c = this.headers[(b + 1) % d];
                    break;
                case f.LEFT:
                case f.UP:
                    c = this.headers[(b - 1 + d) % d];
                    break;
                case f.SPACE:
                case f.ENTER:
                    return this._clickHandler({target: e.target})
            }
            if (c) {
                a(e.target).attr("tabIndex", "-1");
                a(c).attr("tabIndex", "0");
                c.focus();
                return false
            }
            return true
        },resize: function() {
            var e = this.options, d;
            if (e.fillSpace) {
                if (a.browser.msie) {
                    var b = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                d = this.element.parent().height();
                if (a.browser.msie) {
                    this.element.parent().css("overflow", b)
                }
                this.headers.each(function() {
                    d -= a(this).outerHeight()
                });
                var c = 0;
                this.headers.next().each(function() {
                    c = Math.max(c, a(this).innerHeight() - a(this).height())
                }).height(d - c).css("overflow", "auto")
            } else {
                if (e.autoHeight) {
                    d = 0;
                    this.headers.next().each(function() {
                        d = Math.max(d, a(this).outerHeight())
                    }).height(d)
                }
            }
        },activate: function(b) {
            this._clickHandler({target: this._findActive(b)[0]})
        },_findActive: function(b) {
            return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === false ? a([]) : this.headers.filter(":eq(0)")
        },_clickHandler: function(f) {
            var h = this.options;
            if (h.disabled) {
                return false
            }
            if (!f.target && !h.alwaysOpen) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(h.icons.headerSelected).addClass(h.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var c = this.active.next(), g = {options: h,newHeader: a([]),oldHeader: h.active,newContent: a([]),oldContent: c}, b = (this.active = a([]));
                this._toggle(b, c, g);
                return false
            }
            var d = a(f.target);
            d = a(d.parents(h.header)[0] || d);
            var e = d[0] == this.active[0];
            if (this.running || (h.alwaysOpen && e)) {
                return false
            }
            if (!d.is(h.header)) {
                return
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(h.icons.headerSelected).addClass(h.icons.header);
            this.active.next().addClass("ui-accordion-content-active");
            if (!e) {
                d.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(h.icons.header).addClass(h.icons.headerSelected);
                d.next().addClass("ui-accordion-content-active")
            }
            var b = d.next(), c = this.active.next(), g = {options: h,newHeader: e && !h.alwaysOpen ? a([]) : d,oldHeader: this.active,newContent: e && !h.alwaysOpen ? a([]) : b.find("> *"),oldContent: c.find("> *")}, i = this.headers.index(this.active[0]) > this.headers.index(d[0]);
            this.active = e ? a([]) : d;
            this._toggle(b, c, g, e, i);
            return false
        },_toggle: function(b, i, g, j, k) {
            var d = this.options, m = this;
            this.toShow = b;
            this.toHide = i;
            this.data = g;
            var c = function() {
                if (!m) {
                    return
                }
                return m._completed.apply(m, arguments)
            };
            this._trigger("changestart", null, this.data);
            this.running = i.size() === 0 ? b.size() : i.size();
            if (d.animated) {
                var f = {};
                if (!d.alwaysOpen && j) {
                    f = {toShow: a([]),toHide: i,complete: c,down: k,autoHeight: d.autoHeight || d.fillSpace}
                } else {
                    f = {toShow: b,toHide: i,complete: c,down: k,autoHeight: d.autoHeight || d.fillSpace}
                }
                if (!d.proxied) {
                    d.proxied = d.animated
                }
                if (!d.proxiedDuration) {
                    d.proxiedDuration = d.duration
                }
                d.animated = a.isFunction(d.proxied) ? d.proxied(f) : d.proxied;
                d.duration = a.isFunction(d.proxiedDuration) ? d.proxiedDuration(f) : d.proxiedDuration;
                var l = a.ui.accordion.animations, e = d.duration, h = d.animated;
                if (!l[h]) {
                    l[h] = function(n) {
                        this.slide(n, {easing: h,duration: e || 700})
                    }
                }
                l[h](f)
            } else {
                if (!d.alwaysOpen && j) {
                    b.toggle()
                } else {
                    i.hide();
                    b.show()
                }
                c(true)
            }
            i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1");
            b.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
        },_completed: function(b) {
            var c = this.options;
            this.running = b ? 0 : --this.running;
            if (this.running) {
                return
            }
            if (c.clearStyle) {
                this.toShow.add(this.toHide).css({height: "",overflow: ""})
            }
            this._trigger("change", null, this.data)
        }});
    a.extend(a.ui.accordion, {version: "1.6rc6",defaults: {active: null,autoHeight: true,alwaysOpen: true,animated: "slide",clearStyle: false,event: "click",fillSpace: false,header: "a",icons: {header: "ui-icon-triangle-1-e",headerSelected: "ui-icon-triangle-1-s"},navigation: false,navigationFilter: function() {
                return this.href.toLowerCase() == location.href.toLowerCase()
            }},animations: {slide: function(j, h) {
                j = a.extend({easing: "swing",duration: 300}, j, h);
                if (!j.toHide.size()) {
                    j.toShow.animate({height: "show"}, j);
                    return
                }
                var b = j.toHide.height(), i = j.toShow.height(), c = i / b, d = j.toShow.css("overflow"), e = {}, g = {}, f = ["height", "paddingTop", "paddingBottom"];
                a.each(f, function(k, l) {
                    g[l] = "hide";
                    e[l] = parseFloat(j.toShow.css(l))
                });
                j.toShow.css({height: 0,overflow: "hidden"}).show();
                j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(g, {step: function(l, m) {
                        if (!j.toShow[0]) {
                            return
                        }
                        var k = m.start != m.end ? (m.now - m.start) / (m.end - m.start) : 0, n = k * e[m.prop];
                        if (a.browser.msie || a.browser.opera) {
                            n = Math.ceil(n)
                        }
                        j.toShow[0].style[m.prop] = n + "px"
                    },duration: j.duration,easing: j.easing,complete: function() {
                        if (!j.autoHeight) {
                            j.toShow.css("height", "auto")
                        }
                        j.toShow.css({overflow: d});
                        j.complete()
                    }})
            },bounceslide: function(b) {
                this.slide(b, {easing: b.down ? "easeOutBounce" : "swing",duration: b.down ? 1000 : 200})
            },easeslide: function(b) {
                this.slide(b, {easing: "easeinout",duration: 700})
            }}})
})(jQuery);

(function($) {
    $.extend($.ui, {datepicker: {version: "1.6rc6"}});
    var PROP_NAME = 'datepicker';
    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = 'ui-datepicker-div';
        this._inlineClass = 'ui-datepicker-inline';
        this._appendClass = 'ui-datepicker-append';
        this._triggerClass = 'ui-datepicker-trigger';
        this._dialogClass = 'ui-datepicker-dialog';
        this._disableClass = 'ui-datepicker-disabled';
        this._unselectableClass = 'ui-datepicker-unselectable';
        this._currentClass = 'ui-datepicker-current-day';
        this._dayOverClass = 'ui-datepicker-days-cell-over';
        this.regional = [];
        this.regional[''] = {closeText: 'Done',prevText: 'Prev',nextText: 'Next',currentText: 'Today',monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],dateFormat: 'mm/dd/yy',firstDay: 0,isRTL: false};
        this._defaults = {showOn: 'focus',showAnim: 'show',showOptions: {},defaultDate: null,appendText: '',buttonText: '...',buttonImage: '',buttonImageOnly: false,hideIfNoPrevNext: false,navigationAsDateFormat: false,gotoCurrent: false,changeMonth: false,changeYear: false,showMonthAfterYear: false,yearRange: '-10:+10',showOtherMonths: false,calculateWeek: this.iso8601Week,shortYearCutoff: '+10',minDate: null,maxDate: null,duration: 'normal',beforeShowDay: null,beforeShow: null,onSelect: null,onChangeMonthYear: null,onClose: null,numberOfMonths: 1,showCurrentAtPos: 0,stepMonths: 1,stepBigMonths: 12,altField: '',altFormat: '',constrainInput: true,showButtonPanel: false};
        $.extend(this._defaults, this.regional['']);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>');
    }
    $.extend(Datepicker.prototype, {markerClassName: 'hasDatepicker',log: function() {
        },setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },_attachDatepicker: function(target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute('date:' + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue);
                    } catch (err) {
                        inlineSettings[attrName] = attrValue;
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == 'div' || nodeName == 'span');
            if (!target.id)
                target.id = 'dp' + (++this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == 'input') {
                this._connectDatepicker(target, inst);
            } else if (inline) {
                this._inlineDatepicker(target, inst);
            }
        },_newInst: function(target, inline) {
            var id = target[0].id.replace(/([:\[\]\.])/g, '\\\\$1');
            return {id: id,input: target,selectedDay: 0,selectedMonth: 0,selectedYear: 0,drawMonth: 0,drawYear: 0,inline: inline,dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))};
        },_connectDatepicker: function(target, inst) {
            var input = $(target);
            if (input.hasClass(this.markerClassName))
                return;
            var appendText = this._get(inst, 'appendText');
            var isRTL = this._get(inst, 'isRTL');
            if (appendText)
                input[isRTL ? 'before' : 'after']('<span class="' + this._appendClass + '">' + appendText + '</span>');
            var showOn = this._get(inst, 'showOn');
            if (showOn == 'focus' || showOn == 'both')
                input.focus(this._showDatepicker);
            if (showOn == 'button' || showOn == 'both') {
                var buttonText = this._get(inst, 'buttonText');
                var buttonImage = this._get(inst, 'buttonImage');
                var trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({src: buttonImage,alt: buttonText,title: buttonText}) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == '' ? buttonText : $('<img/>').attr({src: buttonImage,alt: buttonText,title: buttonText})));
                input[isRTL ? 'before' : 'after'](trigger);
                trigger.click(function() {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target)
                        $.datepicker._hideDatepicker();
                    else
                        $.datepicker._showDatepicker(target);
                    return false;
                });
            }
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value;
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key);
            });
            $.data(target, PROP_NAME, inst);
        },_inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName))
                return;
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
                inst.settings[key] = value;
            }).bind("getData.datepicker", function(event, key) {
                return this._get(inst, key);
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst));
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
        },_dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                var id = 'dp' + (++this.uuid);
                this._dialogInput = $('<input type="text" id="' + id + '" size="1" style="position: absolute; top: -100px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $('body').append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst);
            }
            extendRemove(inst.settings, settings || {});
            this._dialogInput.val(dateText);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
            }
            this._dialogInput.css('left', this._pos[0] + 'px').css('top', this._pos[1] + 'px');
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI)
                $.blockUI(this.dpDiv);
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this;
        },_destroyDatepicker: function(target) {
            var $target = $(target);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == 'input') {
                $target.siblings('.' + this._appendClass).remove().end().siblings('.' + this._triggerClass).remove().end().removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress);
            } else if (nodeName == 'div' || nodeName == 'span')
                $target.removeClass(this.markerClassName).empty();
        },_enableDatepicker: function(target) {
            var $target = $(target);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = false;
                $target.siblings('button.' + this._triggerClass).each(function() {
                    this.disabled = false;
                }).end().siblings('img.' + this._triggerClass).css({opacity: '1.0',cursor: ''});
            } 
            else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().removeClass('ui-state-disabled');
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value);
            });
        },_disableDatepicker: function(target) {
            var $target = $(target);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = true;
                $target.siblings('button.' + this._triggerClass).each(function() {
                    this.disabled = true;
                }).end().siblings('img.' + this._triggerClass).css({opacity: '0.5',cursor: 'default'});
            } 
            else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().addClass('ui-state-disabled');
            }
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return (value == target ? null : value);
            });
            this._disabledInputs[this._disabledInputs.length] = target;
        },_isDisabledDatepicker: function(target) {
            if (!target) {
                return false;
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target)
                    return true;
            }
            return false;
        },_getInst: function(target) {
            try {
                return $.data(target, PROP_NAME);
            } 
            catch (err) {
                throw 'Missing instance data for this datepicker';
            }
        },_optionDatepicker: function(target, name, value) {
            var settings = name || {};
            if (typeof name == 'string') {
                settings = {};
                settings[name] = value;
            }
            var inst = this._getInst(target);
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker(null);
                }
                extendRemove(inst.settings, settings);
                var date = new Date();
                extendRemove(inst, {rangeStart: null,endDay: null,endMonth: null,endYear: null,selectedDay: date.getDate(),selectedMonth: date.getMonth(),selectedYear: date.getFullYear(),currentDay: date.getDate(),currentMonth: date.getMonth(),currentYear: date.getFullYear(),drawMonth: date.getMonth(),drawYear: date.getFullYear()});
                this._updateDatepicker(inst);
            }
        },_changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value);
        },_refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst);
            }
        },_setDateDatepicker: function(target, date, endDate) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date, endDate);
                this._updateDatepicker(inst);
                this._updateAlternate(inst);
            }
        },_getDateDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst && !inst.inline)
                this._setDateFromField(inst);
            return (inst ? this._getDate(inst) : null);
        },_doKeyDown: function(event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing)
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(null, '');
                        break;
                    case 13:
                        var sel = $('td.' + $.datepicker._dayOverClass + ', td.' + $.datepicker._currentClass, inst.dpDiv);
                        if (sel[0])
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        else
                            $.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
                        return false;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker(null, $.datepicker._get(inst, 'duration'));
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._clearDate(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._gotoToday(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey)
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, -7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey)
                            $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey)
                            $.datepicker._adjustDate(event.target, +7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = false;
                }
            else if (event.keyCode == 36 && event.ctrlKey)
                $.datepicker._showDatepicker(this);
            else {
                handled = false;
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },_doKeyPress: function(event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, 'constrainInput')) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
            }
        },_showDatepicker: function(input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != 'input')
                input = $('input', input.parentNode)[0];
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input)
                return;
            var inst = $.datepicker._getInst(input);
            var beforeShow = $.datepicker._get(inst, 'beforeShow');
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            $.datepicker._hideDatepicker(null, '');
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog)
                input.value = '';
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight;
            }
            var isFixed = false;
            $(input).parents().each(function() {
                isFixed |= $(this).css('position') == 'fixed';
                return !isFixed;
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop;
            }
            var offset = {left: $.datepicker._pos[0],top: $.datepicker._pos[1]};
            $.datepicker._pos = null;
            inst.rangeStart = null;
            inst.dpDiv.css({position: 'absolute',display: 'block',top: '-1000px'});
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ? 'static' : (isFixed ? 'fixed' : 'absolute')),display: 'none',left: offset.left + 'px',top: offset.top + 'px'});
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, 'showAnim') || 'show';
                var duration = $.datepicker._get(inst, 'duration');
                var postProcess = function() {
                    $.datepicker._datepickerShowing = true;
                    if ($.browser.msie && parseInt($.browser.version, 10) < 7)
                        $('iframe.ui-datepicker-cover').css({width: inst.dpDiv.width() + 4,height: inst.dpDiv.height() + 4});
                };
                if ($.effects && $.effects[showAnim])
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[showAnim](duration, postProcess);
                if (duration == '')
                    postProcess();
                if (inst.input[0].type != 'hidden')
                    inst.input[0].focus();
                $.datepicker._curInst = inst;
            }
        },_updateDatepicker: function(inst) {
            var dims = {width: inst.dpDiv.width() + 4,height: inst.dpDiv.height() + 4};
            var self = this;
            inst.dpDiv.empty().append(this._generateHTML(inst)).find('iframe.ui-datepicker-cover').css({width: dims.width,height: dims.height}).end().find('button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a').bind('mouseout', function() {
                $(this).removeClass('ui-state-hover');
                if (this.className.indexOf('ui-datepicker-prev') != -1)
                    $(this).removeClass('ui-datepicker-prev-hover');
                if (this.className.indexOf('ui-datepicker-next') != -1)
                    $(this).removeClass('ui-datepicker-next-hover');
            }).bind('mouseover', function() {
                if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                    $(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
                    $(this).addClass('ui-state-hover');
                    if (this.className.indexOf('ui-datepicker-prev') != -1)
                        $(this).addClass('ui-datepicker-prev-hover');
                    if (this.className.indexOf('ui-datepicker-next') != -1)
                        $(this).addClass('ui-datepicker-next-hover');
                }
            }).end().find('.' + this._dayOverClass + ' a').trigger('mouseover').end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            if (cols > 1) {
                inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
            } else {
                inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') + 'Class']('ui-datepicker-multi');
            inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl');
            if (inst.input && inst.input[0].type != 'hidden' && inst == $.datepicker._curInst)
                $(inst.input[0]).focus();
        },_checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
            var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();
            offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
            offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight * 2 - viewHeight) : 0;
            return offset;
        },_findPos: function(obj) {
            while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
                obj = obj.nextSibling;
            }
            var position = $(obj).offset();
            return [position.left, position.top];
        },_hideDatepicker: function(input, duration) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME)))
                return;
            if (inst.stayOpen)
                this._selectDate('#' + inst.id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            inst.stayOpen = false;
            if (this._datepickerShowing) {
                duration = (duration != null ? duration : this._get(inst, 'duration'));
                var showAnim = this._get(inst, 'showAnim');
                var postProcess = function() {
                    $.datepicker._tidyDialog(inst);
                };
                if (duration != '' && $.effects && $.effects[showAnim])
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[(duration == '' ? 'hide' : (showAnim == 'slideDown' ? 'slideUp' : (showAnim == 'fadeIn' ? 'fadeOut' : 'hide')))](duration, postProcess);
                if (duration == '')
                    this._tidyDialog(inst);
                var onClose = this._get(inst, 'onClose');
                if (onClose)
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({position: 'absolute',left: '0',top: '-100px'});
                    if ($.blockUI) {
                        $.unblockUI();
                        $('body').append(this.dpDiv);
                    }
                }
                this._inDialog = false;
            }
            this._curInst = null;
        },_tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
        },_checkExternalClick: function(event) {
            if (!$.datepicker._curInst)
                return;
            var $target = $(event.target);
            if (($target.parents('#' + $.datepicker._mainDivId).length == 0) && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
                $.datepicker._hideDatepicker(null, '');
        },_adjustDate: function(id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return;
            }
            this._adjustInstDate(inst, offset + 
            (period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), period);
            this._updateDatepicker(inst);
        },_gotoToday: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear;
            } 
            else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear();
            }
            this._notifyChange(inst);
            this._adjustDate(target);
        },_selectMonthYear: function(id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst['selected' + (period == 'M' ? 'Month' : 'Year')] = inst['draw' + (period == 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target);
        },_clickMonthYear: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear && !$.browser.msie)
                inst.input[0].focus();
            inst._selectingMonthYear = !inst._selectingMonthYear;
        },_selectDay: function(id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return;
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $('a', td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            if (inst.stayOpen) {
                inst.endDay = inst.endMonth = inst.endYear = null;
            }
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            if (inst.stayOpen) {
                inst.rangeStart = this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                this._updateDatepicker(inst);
            }
        },_clearDate: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst.stayOpen = false;
            inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
            this._selectDate(target, '');
        },_selectDate: function(id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input)
                inst.input.val(dateStr);
            this._updateAlternate(inst);
            var onSelect = this._get(inst, 'onSelect');
            if (onSelect)
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
            else if (inst.input)
                inst.input.trigger('change');
            if (inst.inline)
                this._updateDatepicker(inst);
            else if (!inst.stayOpen) {
                this._hideDatepicker(null, this._get(inst, 'duration'));
                this._lastInput = inst.input[0];
                if (typeof (inst.input[0]) != 'object')
                    inst.input[0].focus();
                this._lastInput = null;
            }
        },_updateAlternate: function(inst) {
            var altField = this._get(inst, 'altField');
            if (altField) {
                var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
                var date = this._getDate(inst);
                dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() {
                    $(this).val(dateStr);
                });
            }
        },noWeekends: function(date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ''];
        },iso8601Week: function(date) {
            var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4);
            var firstDay = firstMon.getDay() || 7;
            firstMon.setDate(firstMon.getDate() + 1 - firstDay);
            if (firstDay < 4 && checkDate < firstMon) {
                checkDate.setDate(checkDate.getDate() - 3);
                return $.datepicker.iso8601Week(checkDate);
            } else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) {
                firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
                if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) {
                    return 1;
                }
            }
            return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1;
        },parseDate: function(format, value, settings) {
            if (format == null || value == null)
                throw 'Invalid arguments';
            value = (typeof value == 'object' ? value.toString() : value + '');
            if (value == '')
                return null;
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            var getNumber = function(match) {
                lookAhead(match);
                var origSize = (match == '@' ? 14 : (match == 'y' ? 4 : (match == 'o' ? 3 : 2)));
                var size = origSize;
                var num = 0;
                while (size > 0 && iValue < value.length && value.charAt(iValue) >= '0' && value.charAt(iValue) <= '9') {
                    num = num * 10 + parseInt(value.charAt(iValue++), 10);
                    size--;
                }
                if (size == origSize)
                    throw 'Missing number at position ' + iValue;
                return num;
            };
            var getName = function(match, shortNames, longNames) {
                var names = (lookAhead(match) ? longNames : shortNames);
                var size = 0;
                for (var j = 0; j < names.length; j++)
                    size = Math.max(size, names[j].length);
                var name = '';
                var iInit = iValue;
                while (size > 0 && iValue < value.length) {
                    name += value.charAt(iValue++);
                    for (var i = 0; i < names.length; i++)
                        if (name == names[i])
                            return i + 1;
                    size--;
                }
                throw 'Unknown name at position ' + iInit;
            };
            var checkLiteral = function() {
                if (value.charAt(iValue) != format.charAt(iFormat))
                    throw 'Unexpected literal at position ' + iValue;
                iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        checkLiteral();
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            day = getNumber('d');
                            break;
                        case 'D':
                            getName('D', dayNamesShort, dayNames);
                            break;
                        case 'o':
                            doy = getNumber('o');
                            break;
                        case 'm':
                            month = getNumber('m');
                            break;
                        case 'M':
                            month = getName('M', monthNamesShort, monthNames);
                            break;
                        case 'y':
                            year = getNumber('y');
                            break;
                        case '@':
                            var date = new Date(getNumber('@'));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'"))
                                checkLiteral();
                            else
                                literal = true;
                            break;
                        default:
                            checkLiteral();
                    }
            }
            if (year == -1)
                year = new Date().getFullYear();
            else if (year < 100)
                year += new Date().getFullYear() - new Date().getFullYear() % 100 + 
                (year <= shortYearCutoff ? 0 : -100);
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim)
                        break;
                    month++;
                    day -= dim;
                } while (true);
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
                throw 'Invalid date';
            return date;
        },ATOM: 'yy-mm-dd',COOKIE: 'D, dd M yy',ISO_8601: 'yy-mm-dd',RFC_822: 'D, d M y',RFC_850: 'DD, dd-M-y',RFC_1036: 'D, d M y',RFC_1123: 'D, d M yy',RFC_2822: 'D, d M yy',RSS: 'D, d M y',TIMESTAMP: '@',W3C: 'yy-mm-dd',formatDate: function(format, date, settings) {
            if (!date)
                return '';
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            var formatNumber = function(match, value, len) {
                var num = '' + value;
                if (lookAhead(match))
                    while (num.length < len)
                        num = '0' + num;
                return num;
            };
            var formatName = function(match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
            var output = '';
            var literal = false;
            if (date)
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal)
                        if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                            literal = false;
                        else
                            output += format.charAt(iFormat);
                    else
                        switch (format.charAt(iFormat)) {
                            case 'd':
                                output += formatNumber('d', date.getDate(), 2);
                                break;
                            case 'D':
                                output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                                break;
                            case 'o':
                                var doy = date.getDate();
                                for (var m = date.getMonth() - 1; m >= 0; m--)
                                    doy += this._getDaysInMonth(date.getFullYear(), m);
                                output += formatNumber('o', doy, 3);
                                break;
                            case 'm':
                                output += formatNumber('m', date.getMonth() + 1, 2);
                                break;
                            case 'M':
                                output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case 'y':
                                output += (lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                                break;
                            case '@':
                                output += date.getTime();
                                break;
                            case "'":
                                if (lookAhead("'"))
                                    output += "'";
                                else
                                    literal = true;
                                break;
                            default:
                                output += format.charAt(iFormat);
                        }
                }
            return output;
        },_possibleChars: function(format) {
            var chars = '';
            var literal = false;
            for (var iFormat = 0; iFormat < format.length; iFormat++)
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        chars += format.charAt(iFormat);
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                        case 'm':
                        case 'y':
                        case '@':
                            chars += '0123456789';
                            break;
                        case 'D':
                        case 'M':
                            return null;
                        case "'":
                            if (lookAhead("'"))
                                chars += "'";
                            else
                                literal = true;
                            break;
                        default:
                            chars += format.charAt(iFormat);
                    }
            return chars;
        },_get: function(inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
        },_setDateFromField: function(inst) {
            var dateFormat = this._get(inst, 'dateFormat');
            var dates = inst.input ? inst.input.val() : null;
            inst.endDay = inst.endMonth = inst.endYear = null;
            var date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate;
            } catch (event) {
                this.log(event);
                date = defaultDate;
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst);
        },_getDefaultDate: function(inst) {
            var date = this._determineDate(this._get(inst, 'defaultDate'), new Date());
            var minDate = this._getMinMaxDate(inst, 'min', true);
            var maxDate = this._getMinMaxDate(inst, 'max');
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            return date;
        },_determineDate: function(date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date;
            };
            var offsetString = function(offset, getDaysInMonth) {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || 'd') {
                        case 'd':
                        case 'D':
                            day += parseInt(matches[1], 10);
                            break;
                        case 'w':
                        case 'W':
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case 'm':
                        case 'M':
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break;
                        case 'y':
                        case 'Y':
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break;
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day);
            };
            date = (date == null ? defaultDate : (typeof date == 'string' ? offsetString(date, this._getDaysInMonth) : (typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
            date = (date && date.toString() == 'Invalid Date' ? defaultDate : date);
            if (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
            return this._daylightSavingAdjust(date);
        },_daylightSavingAdjust: function(date) {
            if (!date)
                return null;
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        },_setDate: function(inst, date, endDate) {
            var clear = !(date);
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            date = this._determineDate(date, new Date());
            inst.selectedDay = inst.currentDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
            if (origMonth != inst.selectedMonth || origYear != inst.selectedYear)
                this._notifyChange(inst);
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? '' : this._formatDate(inst));
            }
        },_getDate: function(inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate;
        },_generateHTML: function(inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, 'isRTL');
            var showButtonPanel = this._get(inst, 'showButtonPanel');
            var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
            var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
            var stepMonths = this._get(inst, 'stepMonths');
            var stepBigMonths = this._get(inst, 'stepBigMonths');
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, 'min', true);
            var maxDate = this._getMinMaxDate(inst, 'max');
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--;
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--;
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, 'prevText');
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' + ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' : (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
            var nextText = this._get(inst, 'nextText');
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="jQuery.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' + ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' : (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
            var currentText = this._get(inst, 'currentText');
            var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="jQuery.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>';
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') + 
            (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="jQuery.datepicker._gotoToday(\'#' + inst.id + '\');"' + '>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
            var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var dayNames = this._get(inst, 'dayNames');
            var dayNamesShort = this._get(inst, 'dayNamesShort');
            var dayNamesMin = this._get(inst, 'dayNamesMin');
            var monthNames = this._get(inst, 'monthNames');
            var monthNamesShort = this._get(inst, 'monthNamesShort');
            var beforeShowDay = this._get(inst, 'beforeShowDay');
            var showOtherMonths = this._get(inst, 'showOtherMonths');
            var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
            var endDate = inst.endDay ? this._daylightSavingAdjust(new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
            var defaultDate = this._getDefaultDate(inst);
            var html = '';
            for (var row = 0; row < numMonths[0]; row++) {
                var group = '';
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = ' ui-corner-all';
                    var calender = '';
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group ui-datepicker-group-';
                        switch (col) {
                            case 0:
                                calender += 'first';
                                cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left');
                                break;
                            case numMonths[1] - 1:
                                calender += 'last';
                                cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right');
                                break;
                            default:
                                calender += 'middle';
                                cornerClass = '';
                                break;
                        }
                        calender += '">';
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + 
                    (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') + 
                    (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') + 
                    this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead>' + '<tr>';
                    var thead = '';
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' + '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
                    }
                    calender += thead + '</tr></thead><tbody>';
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += '<tr>';
                        var tbody = '';
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = otherMonth || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + 
                            ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + 
                            (otherMonth ? ' ui-datepicker-other-month' : '') + 
                            ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? ' ' + this._dayOverClass : '') + 
                            (unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + 
                            (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + 
                            (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? ' ' + this._currentClass : '') + 
                            (printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + 
                            ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + 
                            (unselectable ? '' : ' onclick="jQuery.datepicker._selectDay(\'#' + 
                            inst.id + '\',' + drawMonth + ',' + drawYear + ', this);return false;"') + '>' + 
                            (otherMonth ? (showOtherMonths ? printDate.getDate() : '&#xa0;') : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' + 
                            (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') + 
                            (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? ' ui-state-active' : '') + '" href="#">' + printDate.getDate() + '</a>')) + '</td>';
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate);
                        }
                        calender += tbody + '</tr>';
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++;
                    }
                    calender += '</tbody></table>' + (isMultiMonth ? '</div>' : '');
                    group += calender;
                }
                html += group;
            }
            html += (!inst.inline ? buttonPanel : '') + 
            ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
            inst._keyEvent = false;
            return html;
        },_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, secondary, monthNames, monthNamesShort) {
            minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
            var changeMonth = this._get(inst, 'changeMonth');
            var changeYear = this._get(inst, 'changeYear');
            var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = '';
            if (secondary || !changeMonth)
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span> ';
            else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" ' + 'onchange="jQuery.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' + 'onclick="jQuery.datepicker._clickMonthYear(\'#' + inst.id + '\');"' + '>';
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()))
                        monthHtml += '<option value="' + month + '"' + 
                        (month == drawMonth ? ' selected="selected"' : '') + '>' + monthNamesShort[month] + '</option>';
                }
                monthHtml += '</select>';
            }
            if (!showMonthAfterYear)
                html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? '&#xa0;' : '');
            if (secondary || !changeYear)
                html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
            else {
                var years = this._get(inst, 'yearRange').split(':');
                var year = 0;
                var endYear = 0;
                if (years.length != 2) {
                    year = drawYear - 10;
                    endYear = drawYear + 10;
                } else if (years[0].charAt(0) == '+' || years[0].charAt(0) == '-') {
                    year = drawYear + parseInt(years[0], 10);
                    endYear = drawYear + parseInt(years[1], 10);
                } else {
                    year = parseInt(years[0], 10);
                    endYear = parseInt(years[1], 10);
                }
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                html += '<select class="ui-datepicker-year" ' + 'onchange="jQuery.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' + 'onclick="jQuery.datepicker._clickMonthYear(\'#' + inst.id + '\');"' + '>';
                for (; year <= endYear; year++) {
                    html += '<option value="' + year + '"' + 
                    (year == drawYear ? ' selected="selected"' : '') + '>' + year + '</option>';
                }
                html += '</select>';
            }
            if (showMonthAfterYear)
                html += (secondary || changeMonth || changeYear ? '&#xa0;' : '') + monthHtml;
            html += '</div>';
            return html;
        },_adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + (period == 'Y' ? offset : 0);
            var month = inst.drawMonth + (period == 'M' ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + 
            (period == 'D' ? offset : 0);
            var date = this._daylightSavingAdjust(new Date(year, month, day));
            var minDate = this._getMinMaxDate(inst, 'min', true);
            var maxDate = this._getMinMaxDate(inst, 'max');
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == 'M' || period == 'Y')
                this._notifyChange(inst);
        },_notifyChange: function(inst) {
            var onChange = this._get(inst, 'onChangeMonthYear');
            if (onChange)
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst]);
        },_getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, 'numberOfMonths');
            return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
        },_getMinMaxDate: function(inst, minMax, checkRange) {
            var date = this._determineDate(this._get(inst, minMax + 'Date'), null);
            return (!checkRange || !inst.rangeStart ? date : (!date || inst.rangeStart > date ? inst.rangeStart : date));
        },_getDaysInMonth: function(year, month) {
            return 32 - new Date(year, month, 32).getDate();
        },_getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay();
        },_canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
            if (offset < 0)
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
            return this._isInRange(inst, date);
        },_isInRange: function(inst, date) {
            var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
            newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
            var minDate = newMinDate || this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
        },_getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, 'shortYearCutoff');
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {shortYearCutoff: shortYearCutoff,dayNamesShort: this._get(inst, 'dayNamesShort'),dayNames: this._get(inst, 'dayNames'),monthNamesShort: this._get(inst, 'monthNamesShort'),monthNames: this._get(inst, 'monthNames')};
        },_formatDate: function(inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear;
            }
            var date = (day ? (typeof day == 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
        }});
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)
            if (props[name] == null || props[name] == undefined)
                target[name] = props[name];
        return target;
    }
    ;
    function isArray(a) {
        return (a && (($.browser.safari && typeof a == 'object' && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))));
    }
    ;
    $.fn.datepicker = function(options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find('body').append($.datepicker.dpDiv);
            $.datepicker.initialized = true;
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate'))
            return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
        return this.each(function() {
            typeof options == 'string' ? $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
        });
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.6rc6";
})(jQuery);


var jaaulde = window.jaaulde || {};
jaaulde.utils = jaaulde.utils || {};
jaaulde.utils.cookies = (function() 
{
    var cookies = [];
    var defaultOptions = {hoursToLive: null,path: '/',domain: null,secure: false};
    var resolveOptions = function(options) 
    {
        var returnValue;
        if (typeof options !== 'object' || options === null) 
        {
            returnValue = defaultOptions;
        } 
        else 
        {
            returnValue = {hoursToLive: (typeof options.hoursToLive === 'number' && options.hoursToLive > 0 ? options.hoursToLive : defaultOptions.hoursToLive),path: (typeof options.path === 'string' && options.path != '' ? options.path : defaultOptions.path),domain: (typeof options.domain === 'string' && options.domain != '' ? options.domain : defaultOptions.domain),secure: (typeof options.secure === 'boolean' && options.secure ? options.secure : defaultOptions.secure)};
        }
        return returnValue;
    };
    var assembleOptionsString = function(options) 
    {
        options = resolveOptions(options);
        return ((typeof options.hoursToLive == 'number' ? '; expires=' + expiresGMTString(options.hoursToLive) : '') + '; path=' + options.path + 
        (typeof options.domain === 'string' ? '; domain=' + options.domain : '') + 
        (options.secure === true ? '; secure' : ''));
    };
    var expiresGMTString = function(hoursToLive) 
    {
        var dateObject = new Date();
        dateObject.setTime(dateObject.getTime() + (hoursToLive * 60 * 60 * 1000));
        return dateObject.toGMTString();
    };
    var splitCookies = function() 
    {
        cookies = [];
        var pair, name, separated = document.cookie.split(';');
        for (var i = 0; i < separated.length; i++) 
        {
            pair = separated[i].split('=');
            name = pair[0].replace(/^\s*/, '').replace(/\s*$/, '');
            value = decodeURIComponent(pair[1]);
            cookies[name] = value;
        }
        return cookies;
    };
    var constructor = function() {
    };
    constructor.prototype.get = function(cookieName) 
    {
        var returnValue;
        splitCookies();
        if (typeof cookieName === 'string') 
        {
            returnValue = (typeof cookies[cookieName] !== 'undefined') ? cookies[cookieName] : null;
        } 
        else if (typeof cookieName === 'object' && cookieName !== null) 
        {
            returnValue = [];
            for (var item in cookieName) 
            {
                returnValue[cookieName[item]] = (typeof cookies[cookieName[item]] !== 'undefined') ? cookies[cookieName[item]] : null;
            }
        } 
        else 
        {
            returnValue = cookies;
        }
        return returnValue;
    };
    constructor.prototype.set = function(cookieName, value, options) 
    {
        if (typeof value === 'undefined' || value === null) 
        {
            if (typeof options !== 'object' || options === null) 
            {
                options = {};
            }
            value = '';
            options.hoursToLive = -8760;
        }
        var optionsString = assembleOptionsString(options);
        document.cookie = cookieName + '=' + encodeURIComponent(value) + optionsString;
    };
    constructor.prototype.del = function(cookieName, options) 
    {
        if (typeof options !== 'object' || options === null) 
        {
            options = {};
        }
        this.set(cookieName, null, options);
    };
    constructor.prototype.test = function() 
    {
        var returnValue = false, testName = 'cT', testValue = 'data';
        this.set(testName, testValue);
        if (this.get(testName) == testValue) 
        {
            this.del(testName);
            returnValue = true;
        }
        return returnValue;
    };
    constructor.prototype.setOptions = function(options) 
    {
        if (typeof options !== 'object') 
        {
            options = null;
        }
        defaultOptions = resolveOptions(options);
    }
    return new constructor();
})();

(function($) 
{
    if (typeof jQuery !== 'undefined') 
    {
        jQuery.cookies = jaaulde.utils.cookies;
        var extensions = {cookify: function(options) 
            {
                return this.each(function() 
                {
                    var name = '', value = '', nameAttrs = ['name', 'id'], iteration = 0, inputType;
                    while (iteration < nameAttrs.length && (typeof name !== 'string' || name === '')) 
                    {
                        name = jQuery(this).attr(nameAttrs[iteration]);
                        iteration++;
                    }
                    if (typeof name === 'string' || name !== '') 
                    {
                        inputType = jQuery(this).attr('type').toLowerCase();
                        if (inputType !== 'radio' && inputType !== 'checkbox') 
                        {
                            value = jQuery(this).attr('value');
                            if (typeof value !== 'string' || value === '') 
                            {
                                value = null;
                            }
                            jQuery.cookies.set(name, value, options);
                        }
                    }
                    iteration = 0;
                });
            },cookieFill: function() 
            {
                return this.each(function() 
                {
                    var name = '', value, nameAttrs = ['name', 'id'], iteration = 0, nodeType;
                    while (iteration < nameAttrs.length && (typeof name !== 'string' || name === '')) 
                    {
                        name = jQuery(this).attr(nameAttrs[iteration]);
                        iteration++;
                    }
                    if (typeof name === 'string' && name !== '') 
                    {
                        value = jQuery.cookies.get(name);
                        if (value !== null) 
                        {
                            nodeType = this.nodeName.toLowerCase();
                            if (nodeType === 'input' || nodeType === 'textarea') 
                            {
                                jQuery(this).attr('value', value);
                            } 
                            else 
                            {
                                jQuery(this).html(value);
                            }
                        }
                    }
                    iteration = 0;
                });
            },cookieBind: function(options) 
            {
                return this.each(function() {
                    $(this).cookieFill().change(function() 
                    {
                        $(this).cookify(options);
                    });
                });
            }};
        jQuery.each(extensions, function(i) 
        {
            jQuery.fn[i] = this;
        });
    }
})(jQuery);

jQuery(document).ready(function() {
    tb_init('a.thickbox, area.thickbox, input.thickbox');
    if (typeof (tb_pathToImage) != "undefined") {
        imgLoader = new Image();
        imgLoader.src = tb_pathToImage;
    }
});

function tb_init(domChunk) {
    jQuery(domChunk).click(function() {
        var t = this.title || this.name || null;
        var a = this.href || this.alt;
        var g = this.rel || false;
        tb_show(t, a, g);
        this.blur();
        return false;
    });
}

function tb_show(caption, url, imageGroup) {
    try {
        if (typeof document.body.style.maxHeight === "undefined") {
            jQuery("body", "html").css({height: "100%",width: "100%"});
            jQuery("html").css("overflow", "hidden");
            if (document.getElementById("TB_HideSelect") === null) {
                jQuery("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
                jQuery("#TB_overlay").click(tb_remove);
            }
        } else {
            if (document.getElementById("TB_overlay") === null) {
                jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
                jQuery("#TB_overlay").click(tb_remove);
            }
        }
        if (tb_detectMacXFF()) {
            jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack");
        } else {
            jQuery("#TB_overlay").addClass("TB_overlayBG");
        }
        if (caption === null) {
            caption = "";
        }
        jQuery("body").append("<div id='TB_load'></div>");
        if (typeof (tb_pathToImage) != "undefined") {
            jQuery('#TB_load').append("<img src='" + imgLoader.src + "' />");
        }
        jQuery('#TB_load').show();
        var baseURL;
        if (url.indexOf("?") !== -1) {
            baseURL = url.substr(0, url.indexOf("?"));
        } else {
            baseURL = url;
        }
        var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
        var urlType = baseURL.toLowerCase().match(urlString);
        if (urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp') {
            TB_PrevCaption = "";
            TB_PrevURL = "";
            TB_PrevHTML = "";
            TB_NextCaption = "";
            TB_NextURL = "";
            TB_NextHTML = "";
            TB_imageCount = "";
            TB_FoundURL = false;
            if (imageGroup) {
                TB_TempArray = jQuery("a[rel=" + imageGroup + "]").get();
                for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
                    var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
                    if (!(TB_TempArray[TB_Counter].href == url)) {
                        if (TB_FoundURL) {
                            TB_NextCaption = TB_TempArray[TB_Counter].title;
                            TB_NextURL = TB_TempArray[TB_Counter].href;
                            TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
                        } else {
                            TB_PrevCaption = TB_TempArray[TB_Counter].title;
                            TB_PrevURL = TB_TempArray[TB_Counter].href;
                            TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
                        }
                    } else {
                        TB_FoundURL = true;
                        TB_imageCount = "Image " + (TB_Counter + 1) + " of " + (TB_TempArray.length);
                    }
                }
            }
            imgPreloader = new Image();
            imgPreloader.onload = function() {
                imgPreloader.onload = null;
                var pagesize = tb_getPageSize();
                var x = pagesize[0] - 150;
                var y = pagesize[1] - 150;
                var imageWidth = imgPreloader.width;
                var imageHeight = imgPreloader.height;
                if (imageWidth > x) {
                    imageHeight = imageHeight * (x / imageWidth);
                    imageWidth = x;
                    if (imageHeight > y) {
                        imageWidth = imageWidth * (y / imageHeight);
                        imageHeight = y;
                    }
                } else if (imageHeight > y) {
                    imageWidth = imageWidth * (y / imageHeight);
                    imageHeight = y;
                    if (imageWidth > x) {
                        imageHeight = imageHeight * (x / imageWidth);
                        imageWidth = x;
                    }
                }
                TB_WIDTH = imageWidth + 30;
                TB_HEIGHT = imageHeight + 60;
                jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='" + url + "' width='" + imageWidth + "' height='" + imageHeight + "' alt='" + caption + "'/></a>" + "<div id='TB_caption'>" + caption + "<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div>");
                jQuery("#TB_closeWindowButton").click(tb_remove);
                if (!(TB_PrevHTML === "")) {
                    function goPrev() {
                        if (jQuery(document).unbind("click", goPrev)) {
                            jQuery(document).unbind("click", goPrev);
                        }
                        jQuery("#TB_window").remove();
                        jQuery("body").append("<div id='TB_window'></div>");
                        tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
                        return false;
                    }
                    jQuery("#TB_prev").click(goPrev);
                }
                if (!(TB_NextHTML === "")) {
                    function goNext() {
                        jQuery("#TB_window").remove();
                        jQuery("body").append("<div id='TB_window'></div>");
                        tb_show(TB_NextCaption, TB_NextURL, imageGroup);
                        return false;
                    }
                    jQuery("#TB_next").click(goNext);
                }
                document.onkeydown = function(e) {
                    if (e == null) {
                        keycode = event.keyCode;
                    } else {
                        keycode = e.which;
                    }
                    if (keycode == 27) {
                        tb_remove();
                    } else if (keycode == 190) {
                        if (!(TB_NextHTML == "")) {
                            document.onkeydown = "";
                            goNext();
                        }
                    } else if (keycode == 188) {
                        if (!(TB_PrevHTML == "")) {
                            document.onkeydown = "";
                            goPrev();
                        }
                    }
                };
                tb_position();
                jQuery("#TB_load").remove();
                jQuery("#TB_ImageOff").click(tb_remove);
                jQuery("#TB_window").css({display: "block"});
            };
            imgPreloader.src = url;
        } else {
            var queryString = url.replace(/^[^\?]+\??/, '');
            var params = tb_parseQuery(queryString);
            TB_WIDTH = (params['width'] * 1) + 30 || 630;
            TB_HEIGHT = (params['height'] * 1) + 40 || 440;
            ajaxContentW = TB_WIDTH - 30;
            ajaxContentH = TB_HEIGHT - 45;
            if (url.indexOf('TB_iframe') != -1) {
                urlNoQuery = url.split('TB_');
                jQuery("#TB_iframeContent").remove();
                if (params['modal'] != "true") {
                    jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div></div><iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;' > </iframe>");
                } else {
                    jQuery("#TB_overlay").unbind();
                    jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;'> </iframe>");
                }
            } else {
                if (jQuery("#TB_window").css("display") != "block") {
                    if (params['modal'] != "true") {
                        jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a></div></div><div id='TB_ajaxContent' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'></div>");
                    } else {
                        jQuery("#TB_overlay").unbind();
                        if (caption.length > 0) {
                            jQuery("#TB_window").prepend("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a></div></div>");
                        }
                        jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px;'></div>");
                    }
                } else {
                    jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW + "px";
                    jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH + "px";
                    jQuery("#TB_ajaxContent")[0].scrollTop = 0;
                    jQuery("#TB_ajaxWindowTitle").html(caption);
                }
            }
            jQuery("#TB_closeWindowButton").click(tb_remove);
            if (url.indexOf('TB_inline') != -1) {
                jQuery("#TB_ajaxContent").append(jQuery('#' + params['inlineId']).children());
                jQuery("#TB_window").unload(function() {
                    jQuery('#' + params['inlineId']).append(jQuery("#TB_ajaxContent").children());
                });
                tb_position();
                jQuery("#TB_load").remove();
                jQuery("#TB_window").css({display: "block"});
            } else if (url.indexOf('TB_iframe') != -1) {
                tb_position();
                if (jQuery.browser.safari) {
                    jQuery("#TB_load").remove();
                    jQuery("#TB_window").css({display: "block"});
                }
            } else {
                jQuery("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()), function(responseText, textStatus, XMLHttpRequest) {
                    tb_position();
                    jQuery("#TB_load").remove();
                    tb_init("#TB_ajaxContent a.thickbox");
                    jQuery("#TB_window").css({display: "block"});
                    var callback = params['onload'];
                    if (typeof (callback) != 'undefined') {
                        try {
                            window[callback](responseText, textStatus, XMLHttpRequest);
                        } catch (e) {
                        }
                    }
                });
            }
        }
        if (!params['modal']) {
            document.onkeyup = function(e) {
                if (e == null) {
                    keycode = event.keyCode;
                } else {
                    keycode = e.which;
                }
                if (keycode == 27) {
                    tb_remove();
                }
            };
        }
    } catch (e) {
    }
}

function tb_showIframe() {
    jQuery("#TB_load").remove();
    jQuery("#TB_window").css({display: "block"});
}

function tb_remove() {
    jQuery("#TB_imageOff").unbind("click");
    jQuery("#TB_closeWindowButton").unbind("click");
    jQuery('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();
    jQuery("#TB_load").remove();
    if (typeof document.body.style.maxHeight == "undefined") {
        jQuery("body", "html").css({height: "auto",width: "auto"});
        jQuery("html").css("overflow", "");
    }
    document.onkeydown = "";
    document.onkeyup = "";
    return false;
}

function tb_position() {
    jQuery("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2), 10) + 'px',width: TB_WIDTH + 'px'});
    if (!(jQuery.browser.msie && jQuery.browser.version < 7)) {
        jQuery("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2), 10) + 'px'});
    }
}

function tb_parseQuery(query) {
    var Params = {};
    if (!query) {
        return Params;
    }
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) {
            continue;
        }
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}
function tb_getPageSize() {
    var de = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
    arrayPageSize = [w, h];
    return arrayPageSize;
}
function tb_detectMacXFF() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox') != -1) {
        return true;
    }
}
if (typeof Prototype != 'undefined') {
    jQuery.noConflict();
}
function checkExternalImageLoaded() {
    (function($) {
        $(".hotels img").load(function() {
            $(".hotels img").addClass('validImg');
        });
    })(jQuery);
}
jQuery.fn.delay = function(time, func) {
    this.each(function() {
        setTimeout(func, time);
    });
    return this;
};
function lp_toggle_map(mapToggle, mapId) {
    if (jQuery(mapToggle).hasClass('closed')) {
        jQuery('a.toggleMap').removeClass('closed');
        jQuery('a.toggleMap').addClass('open');
        jQuery.cookies.set('lpmaps', 'open');
        if (jQuery('#' + mapId).hasClass('mapReady')) {
            jQuery('#' + mapId).slideToggle('normal', function() {
                show_map(mapId);
            });
        } else {
            jQuery('#' + mapId).slideToggle('normal');
        }
    } else {
        jQuery('a.toggleMap').removeClass('open');
        jQuery('a.toggleMap').addClass('closed');
        jQuery.cookies.del('lpmaps');
        jQuery('#' + mapId).slideToggle('normal');
    }
    return false;
}
function lp_init_map_toggle(mapToggle, mapId) {
    jQuery(mapToggle).click(function() {
        return lp_toggle_map(this, mapId);
    });
    jQuery(mapToggle).attr('style', 'display:block');
    if (jQuery.cookies.get('lpmaps') == 'open') {
        jQuery(mapToggle).removeClass('closed');
        jQuery(mapToggle).addClass('open');
        jQuery('#' + mapId).attr('style', 'display:block');
    }
}

(function($) {
    $(function() {
        var theCarousel = $(".shopCarousel");
        if (theCarousel.length > 0) {
            theCarousel.carousel({speed: 500,visible: 1,auto: null,start: 1});
            var interval = null;
            $('.next', theCarousel).click(function() {
                theCarousel.carousel('next');
            });
            $('.prev', theCarousel).click(function() {
                theCarousel.carousel('prev');
            });
        }
        var listId = $('#destList');
        if (listId.length > 0) {
            listId.find('div:first').css('left', '0');
            $('#destList > li > a').click(function(event) {
                event.preventDefault();
                listId.find('div').css('left', '-9999px');
                listId.find('.current').removeClass('current');
                $(this).next().css('left', '0');
                $(this).parent().addClass('current');
            });
        }
        if ($("#list1a").length > 0) {
            jQuery('#list1a').accordion({header: ".head",animated: "bounceslide",autoheight: false});
        }
        $('button').hover(function() {
            $(this).addClass('ieHover');
        }, function() {
            $(this).removeClass('ieHover');
        });
        $('a.submitBtnShort').hover(function() {
            $(this).addClass('ieHover');
        }, function() {
            $(this).removeClass('ieHover');
        });
        $('a.submitBtnOrange').hover(function() {
            $(this).addClass('ieHover');
        }, function() {
            $(this).removeClass('ieHover');
        });
        $('a').filter(function() {
            var rel = $(this).attr('rel');
            if (!rel || rel.indexOf('external') == -1) {
                return false;
            }
            return true;
        }).click(function() {
            window.open(this.href);
            return false;
        });
        $('.about a[rel="popUp"]').click(function() {
            var features = "height=520,width=760,scrollTo,resizable=1,scrollbars=1,location=0";
            newwindow = window.open(this.href, 'PopUp', features);
            return false;
        });
        $('#map').addClass('mapReady');
        $(".travelWarning").show();
        $(".travelWarning").next().addClass('hidden');
        $(".travelWarning").click(function() {
            $(this).next().removeClass('hidden');
            var $this = $(this);
            if ($this.is('.closed')) {
                $(this).next().slideDown("fast");
                $this.removeClass('closed');
                $this.addClass('reveal');
            } 
            else {
                $(this).next().hide("fast");
                $this.removeClass('reveal');
                $this.addClass('closed');
            }
            return false;
        });
        $(".showMore").show();
        $(".showMore").click(function() {
            var $this = $(this);
            if ($this.is('.closed')) {
                $(".theHiddenContent").slideDown('500');
                $this.removeClass('closed');
                $this.addClass('reveal');
                $('.showMore a strong').html('Hide');
            } 
            else {
                $(".theHiddenContent").slideUp('500');
                $this.removeClass('reveal');
                $this.addClass('closed');
                $('.showMore a strong').html('Show');
            }
            return false;
        });
        if ($("#prHobbies div.autocomplete").length > 0) {
            $("#prHobbies div.autocomplete li").hover(function() {
                $(this).addClass("hover");
            }, function() {
                $(this).removeClass("hover");
            });
        }
        if ($("#j_username").length > 0) {
            $("#j_username").focus();
        }
    });
    $(function() {
        if ($("#prDOB").length > 0) {
            monthSelect = $("#prDOBMonth");
            dateSelect = $("#prDOBDay");
            yearSelect = $("#prDOBYear");
            calendar.init(monthSelect, dateSelect, yearSelect);
        }
    });
    var calendar = {months: ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'],daysInSelectedMonth: 31,init: function(monthSelect, dateSelect, yearSelect) {
            $(monthSelect).change(function() {
                selectedMonth = calendar.getSelectedMonth(this);
                selectedDate = calendar.getSelectedDate($(dateSelect));
                selectedYear = calendar.getSelectedYear($(yearSelect));
                if (selectedMonth == 2 && !calendar.isLeapYear(selectedYear) && selectedYear !== 0) {
                    daysInSelectedMonth = 28;
                } 
                else if (selectedMonth == 2 && calendar.isLeapYear(selectedYear) && (selectedYear !== 0)) {
                    daysInSelectedMonth = 29;
                } 
                else if (selectedMonth !== 0) {
                    daysInSelectedMonth = calendar.months[selectedMonth - 1];
                } 
                else {
                    daysInSelectedMonth = 31;
                }
                calendar.populateDate(daysInSelectedMonth, selectedDate);
                $(dateSelect).val(selectedDate);
            });
            $(yearSelect).change(function() {
                selectedMonth = calendar.getSelectedMonth($(monthSelect));
                selectedDate = calendar.getSelectedDate($(dateSelect));
                selectedYear = calendar.getSelectedYear(this);
                if (selectedMonth == 2 && !calendar.isLeapYear(selectedYear) && selectedYear !== 0) {
                    daysInSelectedMonth = 28;
                } 
                else if (selectedMonth == 2 && calendar.isLeapYear(selectedYear) && selectedYear !== 0) {
                    daysInSelectedMonth = 29;
                } 
                else if (selectedMonth !== 0) {
                    daysInSelectedMonth = calendar.months[selectedMonth - 1];
                } 
                else {
                    daysInSelectedMonth = 31;
                }
                calendar.populateDate(daysInSelectedMonth, selectedDate);
                $(dateSelect).val(selectedDate);
            });
        },isLeapYear: function(theYear) {
            if (theYear % 4 === 0 && theYear !== 0) {
                return true;
            } 
            else {
                return false;
            }
        },getSelectedMonth: function(monthSelect) {
            return $(monthSelect).val();
        },getSelectedDate: function(dateSelect) {
            return $(dateSelect).val();
        },getSelectedYear: function(yearSelect) {
            return $(yearSelect).val();
        },populateDate: function(daysInMonth, daySelected) {
            $("select#prDOBDay option").remove();
            $("select#prDOBDay").append("<option value=\"\">Day:</option>");
            for (i = 1; i <= daysInMonth; i++) {
                var iFormatted = i;
                if (i < 10) {
                    iFormatted = "0" + i;
                }
                $("select#prDOBDay").append("<option value=\"" + iFormatted + "\">" + iFormatted + "</option>");
            }
        },disablejQueryDOBBehaviour: function() {
            $(monthSelect).unbind();
            $(yearSelect).unbind();
        }};
   
    jQuery.extend({first: function(array, callback) {
            var elem = null;
            $.each(array, function(i, e) {
                if (callback(i, e) === true) {
                    elem = e;
                    return false;
                }
            });
            return elem;
        }});
    String.prototype.leftPad = function(length, pad) {
        if (typeof (pad) == 'undefined') {
            pad = ' ';
        }
        var padding = '';
        var n = length - this.length;
        for (var i = 0; i < n; i++) {
            padding += pad;
        }
        return padding + this;
    };
    jQuery.fn.makeacolumnlists = function(settings) {
        settings = jQuery.extend({cols: 2,colWidth: 0,equalHeight: false,startN: 1}, settings);
        if (jQuery('> li', this)) {
            this.each(function() {
                var y = jQuery('.li_container').size(), height = 0, maxHeight = 0, t = jQuery(this), classN = t.attr('class'), listsize = jQuery('> li', this).size(), percol = Math.ceil(listsize / settings.cols), contW = t.width(), bl = (isNaN(parseInt(t.css('borderLeftWidth'), 10)) ? 0 : parseInt(t.css('borderLeftWidth'), 10)), br = (isNaN(parseInt(t.css('borderRightWidth'), 10)) ? 0 : parseInt(t.css('borderRightWidth'), 10)), pl = parseInt(t.css('paddingLeft'), 10), pr = parseInt(t.css('paddingRight'), 10), ml = parseInt(t.css('marginLeft'), 10), mr = parseInt(t.css('marginRight'), 10), col_Width = Math.floor((contW - (settings.cols - 1) * (bl + br + pl + pr + ml + mr)) / settings.cols), eh, border_top, border_bottom;
                if (settings.colWidth) {
                    col_Width = settings.colWidth;
                }
                var colnum = 1, percol2 = percol;
                jQuery(this).addClass('li_cont1').wrap('<div id="li_container' + (++y) + '" class="li_container"></div>');
                if (settings.equalHeight == 'li') {
                    jQuery('> li', this).each(function() {
                        var e = jQuery(this);
                        var border_top = (isNaN(parseInt(e.css('borderTopWidth'), 10)) ? 0 : parseInt(e.css('borderTopWidth'), 10));
                        var border_bottom = (isNaN(parseInt(e.css('borderBottomWidth'), 10)) ? 0 : parseInt(e.css('borderBottomWidth'), 10));
                        height = e.height() + parseInt(e.css('paddingTop'), 10) + parseInt(e.css('paddingBottom'), 10) + border_top + border_bottom;
                        maxHeight = (height > maxHeight) ? height : maxHeight;
                    });
                }
                for (var i = 0; i <= listsize; i++) {
                    if (i >= percol2) {
                        percol2 += percol;
                        colnum++;
                    }
                    eh = jQuery('> li:eq(' + i + ')', this);
                    eh.addClass('li_col' + colnum);
                    if (jQuery(this).is('ol')) {
                        eh.attr('value', '' + (i + settings.startN));
                    }
                    if (settings.equalHeight == 'li') {
                        border_top = (isNaN(parseInt(eh.css('borderTopWidth'), 10)) ? 0 : parseInt(eh.css('borderTopWidth'), 10));
                        border_bottom = (isNaN(parseInt(eh.css('borderBottomWidth'), 10)) ? 0 : parseInt(eh.css('borderBottomWidth'), 10));
                        mh = maxHeight - (parseInt(eh.css('paddingTop'), 10) + parseInt(eh.css('paddingBottom'), 10) + border_top + border_bottom);
                        eh.height(mh);
                    }
                }
                jQuery(this).css({cssFloat: 'left',width: '' + col_Width + 'px'});
                for (colnum = 2; colnum <= settings.cols; colnum++) {
                    if (jQuery(this).is('ol')) {
                        jQuery('li.li_col' + colnum, this).appendTo('#li_container' + y).wrapAll('<ol class="li_cont' + colnum + ' ' + classN + '" style="float:left; width: ' + col_Width + 'px;"></ol>');
                    } else {
                        jQuery('li.li_col' + colnum, this).appendTo('#li_container' + y).wrapAll('<ul class="li_cont' + colnum + ' ' + classN + '" style="float:left; width: ' + col_Width + 'px;"></ul>');
                    }
                }
                if (settings.equalHeight == 'ul' || settings.equalHeight == 'ol') {
                    var fn = function() {
                        var e = jQuery(this);
                        var border_top = (isNaN(parseInt(e.css('borderTopWidth'), 10)) ? 0 : parseInt(e.css('borderTopWidth'), 10));
                        var border_bottom = (isNaN(parseInt(e.css('borderBottomWidth'), 10)) ? 0 : parseInt(e.css('borderBottomWidth'), 10));
                        height = e.height() + parseInt(e.css('paddingTop'), 10) + parseInt(e.css('paddingBottom'), 10) + border_top + border_bottom;
                        maxHeight = (height > maxHeight) ? height : maxHeight;
                    };
                    for (colnum = 1; colnum <= settings.cols; colnum++) {
                        jQuery('#li_container' + y + ' .li_cont' + colnum).each(fn);
                    }
                    for (colnum = 1; colnum <= settings.cols; colnum++) {
                        eh = jQuery('#li_container' + y + ' .li_cont' + colnum);
                        border_top = (isNaN(parseInt(eh.css('borderTopWidth'), 10)) ? 0 : parseInt(eh.css('borderTopWidth'), 10));
                        border_bottom = (isNaN(parseInt(eh.css('borderBottomWidth'), 10)) ? 0 : parseInt(eh.css('borderBottomWidth'), 10));
                        mh = maxHeight - (parseInt(eh.css('paddingTop'), 10) + parseInt(eh.css('paddingBottom'), 10) + border_top + border_bottom);
                        eh.height(mh);
                    }
                }
                jQuery('#li_container' + y).append('<div style="clear:both; overflow:hidden; height:0px;"></div>');
            });
        }
    };
    jQuery.fn.uncolumnlists = function() {
        jQuery('.li_cont1').each(function(i) {
            var j;
            var onecolSize = jQuery('#li_container' + (++i) + ' .li_cont1 > li').size();
            if (jQuery('#li_container' + i + ' .li_cont1').is('ul')) {
                jQuery('#li_container' + i + ' > ul > li').appendTo('#li_container' + i + ' ul:first');
                for (j = 1; j <= onecolSize; j++) {
                    jQuery('#li_container' + i + ' ul:first li').removeAttr('class').removeAttr('style');
                }
                jQuery('#li_container' + i + ' ul:first').removeAttr('style').removeClass('li_cont1').insertBefore('#li_container' + i);
            } else {
                jQuery('#li_container' + i + ' > ol > li').appendTo('#li_container' + i + ' ol:first');
                for (j = 1; j <= onecolSize; j++) {
                    jQuery('#li_container' + i + ' ol:first li').removeAttr('class').removeAttr('style');
                }
                jQuery('#li_container' + i + ' ol:first').removeAttr('style').removeClass('li_cont1').insertBefore('#li_container' + i);
            }
            jQuery('#li_container' + i).remove();
        });
    };
    jQuery(document).ready(function($) {
        $('ul#twoColList').makeacolumnlists({cols: 2,colWidth: 0,equalHeight: false,startN: 1});
    });
})(jQuery);


function omnitureFlashClick(omnitureAccount, vendorName, podName, url) 
{
    if (typeof s_gi != "undefined") {
        var s = s_gi(omnitureAccount);
        s.linkTrackVars = 'prop26,prop27,eVar31,eVar32';
        s.linkTrackEvents = 'None';
        s.prop26 = podName;
        s.prop27 = vendorName;
        s.eVar31 = podName;
        s.eVar32 = vendorName;
        s.tl(this, 'o', 'Homepage :: ' + podName + ' :: ' + vendorName);
    }
    document.location.href = url;
}

jQuery.preloadImages = function() {
    var preloadedImages = [];
    jQuery("meta[name='imagePreload']").each(function() {
        var img = new Image();
        img.src = jQuery(this).attr('content');
        preloadedImages.push(img);
    });
};


window.viewport = {height: function() {
        return jQuery(window).height();
    },width: function() {
        return jQuery(window).width();
    },scrollTop: function() {
        return jQuery(window).scrollTop();
    },scrollLeft: function() {
        return jQuery(window).scrollLeft();
    }};

var Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + 
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + 
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },_utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } 
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } 
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },_utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } 
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } 
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }};

function isUserNewlyRegistered() {
    return jQuery.cookies.get("lpNewUser") ? true : false;
}

function lpSignedInUser(){
	var lpCookie=jQuery.cookies.get("lpCookie");
	if(lpCookie){
		var userCookieVal=lpCookie.split(/#/);
		return userCookieVal?userCookieVal[0]:null;
	}
	var lpNewUser=jQuery.cookies.get("lpNewUser");
	if(lpNewUser){
		return lpNewUser;
	}
}

function setupOmnitureUserInfo(s) {
    if (lpSignedInUser()) {
        s.eVar24 = Base64.encode(lpSignedInUser());
        s.eVar25 = isUserNewlyRegistered() ? "just registered" : "logged in";
    } else {
        s.eVar25 = "guest";
    }
}

var paginationJumpBox = {paramName: "page",queryStringExclude: /^()$/i,totalPages: null};
paginationJumpBox.queryStringToObject = function(queryString) {
    if (queryString.indexOf("?") === 0) {
        queryString = queryString.substring(1);
    }
    var regexp = /([^&=]+)=?([^&]*)/g;
    var resultObject = [];
    var match = regexp.exec(queryString);
    while (match) {
        if (!this.queryStringExclude.test(match[1])) {
            var param = {key: match[1],value: match[2]};
            resultObject.push(param);
        }
        match = regexp.exec(queryString);
    }
    return resultObject;
};

paginationJumpBox.objectToQueryString = function(queryStringObj) {
    var queryString = [];
    for (var index = 0; index < queryStringObj.length; index++) {
        queryString.push(queryStringObj[index]['key'] + "=" + queryStringObj[index]['value']);
    }
    return queryString.join("&");
};

paginationJumpBox.updateOrAddQueryParam = function(queryParams, key, value) {
    var updated = false;
    for (var index = 0; index < queryParams.length; index++) {
        if (queryParams[index]['key'] == key) {
            queryParams[index]['value'] = value;
            updated = true;
        }
    }
    if (!updated) {
        var param = {key: key,value: value};
        queryParams.push(param);
    }
};
paginationJumpBox.changed = function(jumpBoxElm) {
    var jumpBox = jQuery(jumpBoxElm);
    var pageNumber = jumpBox.val();
    var location = window.location;
    if (pageNumber === "" || isNaN(parseInt(pageNumber, 10))) {
        jumpBox.val(jumpBox.attr("alt"));
        jumpBox.removeClass("focusedField");
        return;
    }
    pageNumber = parseInt(pageNumber, 10);
    if (pageNumber <= 0) {
        pageNumber = 1;
    }
    if (this.totalPages && pageNumber > this.totalPages) {
        pageNumber = this.totalPages;
    }
    var queryParams = this.queryStringToObject(location.search);
    this.updateOrAddQueryParam(queryParams, this.paramName, pageNumber);
    var fullLocation = location.protocol + "//" + location.host + location.pathname;
    window.location = fullLocation + '?' + this.objectToQueryString(queryParams) + location.hash;
};



jQuery(document).ready(function($) {
    jQuery(".paginateControls input[type=text]").each(function() {
        jQuery(this).val($(this).attr("alt"));
    });
    jQuery(".paginateControls input[type=text]").focus(function() {
        if (jQuery(this).val() === $(this).attr("alt")) {
            jQuery(this).val("");
            jQuery(this).addClass("focusedField");
        }
    });
    jQuery(".paginateControls input[type=text]").keydown(function(e) {
        if (e.keyCode == 13) {
            paginationJumpBox.changed(this);
        }
    });
    jQuery(".paginateControls input[type=text]").blur(function() {
        paginationJumpBox.changed(this);
        return false;
    });
});


var BrowserDetect = {init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1) {
                    return data[i].identity;
                }
            } 
            else if (dataProp) {
                return data[i].identity;
            }
        }
    },searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },dataBrowser: [{string: navigator.userAgent,subString: "Chrome",identity: "Chrome"}, {string: navigator.vendor,subString: "Apple",identity: "Safari",versionSearch: "Version"}, {string: navigator.userAgent,subString: "Firefox",identity: "Firefox"}, {string: navigator.userAgent,subString: "Netscape",identity: "Netscape"}, {string: navigator.userAgent,subString: "MSIE",identity: "Explorer",versionSearch: "MSIE"}, {string: navigator.userAgent,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}],dataOS: [{string: navigator.platform,subString: "Win",identity: "Windows"}, {string: navigator.platform,subString: "Mac",identity: "Mac"}]};
BrowserDetect.init();
if (BrowserDetect.browser == 'Safari' && BrowserDetect.OS == 'Windows') {
    jQuery(document).ready(function() {
        jQuery("button.lpButton2010").css("padding", "0 14px 0 0");
        jQuery("button.lpButton2010 strong").css("margin-top", "-1px");
        jQuery(".recommend button.lpButton2010 span").css("left", "10px");
    });
}

function TravelServicesTab(continents, travelDeals, travelInsurance) {
    this.show = function() {
        var component = travelInsurance;
        jQuery.each(continents, function(index, continent) {
            if (jQuery.cookies.get("continent") == continent) {
                component = travelDeals;
            }
        });
        jQuery(component).show();
    };
}

jQuery(document).ready(function($) {
    jQuery('ol#globalList li').click(function(e) {
        var target = e.target;
        var href = $(".targetUrl", this).attr("href");
        if (target.tagName != "A" && (typeof href != 'undefined')) {
            window.location = href;
        }
    });
});

jQuery(document).ready(function() {
    if (jQuery('#reportAbuseComment').length) {
        jQuery('#reportAbuseComment').jqEasyCounter({'maxChars': 255,'maxCharsWarning': 200});
    }
});

jQuery(document).ready(function() {
    jQuery.each(['#chapter_or_page_content', '#guidebook_feedback_content', '#poi_suggestion_content', '#poi_feedback_content'], function(index, feedback_type) {
        if (jQuery(feedback_type).length) {
            jQuery(feedback_type).jqEasyCounter({'maxChars': 2000,'maxCharsWarning': 1800});
        }
    });
});

jQuery.fn.toggleClassOnEvent = function(options) {
    jQuery(this).each(function() {
        var onHover = options && options.onHover ? options.onHover : function() {
        };
        var offHover = options && options.offHover ? options.offHover : function() {
        };
        var target = options && options.target ? jQuery(options.target) : jQuery(this);
        if (options.event === 'hover' || options.event === 'tolerantHover') {
            jQuery(this)[options.event](function() {
                target.addClass(options.className);
                onHover.call(this);
            }, function() {
                target.removeClass(options.className);
                offHover.call(this);
            }, options.tolerance, options.tolerancePredicate);
        } 
        else {
            jQuery(this).bind(options.event, function() {
                target.toggleClass(options.className);
            });
        }
    });
    return this;
}

function focusForm(me) {
    if (me == undefined)
        me = "";
    var theElements = document.getElementsByTagName("input");
    for (var i = 0; i < theElements.length; i++) {
        if (theElements[i].className == 'searchText') {
            theElements[i].onfocus = function() {
                if (this.value == me) 
                {
                    this.value = '';
                }
            }
            theElements[i].onblur = function() {
                if (this.value.replace(' ', '') == '') 
                {
                    this.value = me
                }
            }
        }
    }
}

function validateForm(e, m, n, me) 
{
    var theForm = document.getElementById(n);
    if (theForm.search.value == me || theForm.search.value.replace(' ', '') == "") {
        alert(m);
        theForm.search.focus();
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        return false;
    } 
    else {
        return true;
    }
}

(function($) {
    $(document).ready(function() {
        $('div.adTransplant').each(function() {
            var transplantId = this.id;
            var actualId = transplantId.replace(/Transplant_/, '');
            var htmlText = $('#' + transplantId).html();
            var htmlTextArray = htmlText.split('\n');
            htmlText = htmlTextArray.join(' ').replace(/<script[^>]*>.*<\/script>/ig, '');
            $('#' + actualId).prepend(htmlText);
        });
        $('div.defferedContents div.adTransplant :not(script)').remove();
    });
})(jQuery);

function google_afs_request_done(google_ads) {
    google_ads_request_done(google_ads);
}
function google_ad_request_done(google_ads) {
    google_ads_request_done(google_ads);
}
function google_ads_request_done(google_ads) {
    if (google_ads.length == 0) {
        return;
    }
    var feedback_link = typeof (google_info) == "undefined" ? "http://www.google.com/adsense" : google_info.feedback_url;
    jQuery(".sponsoredLinks p").each(function() {
        jQuery(this).append('<a rel="external" href=\"' + feedback_link + '\">Ads by Google</a>');
    });
    jQuery(google_ads).each(function() {
        if (this.type == "text/wide" || this.type == "text") {
            insertAnAd("wideAds", buildAnAd(this));
        } 
        else {
            insertAnAd("narrowAds", buildAnAd(this));
        }
    });
}
function insertAnAd(cssClass, string) {
    var targetDiv = jQuery("div." + cssClass)[0];
    if (targetDiv != null) {
        jQuery(targetDiv).parent().show();
        jQuery(targetDiv).replaceWith(string);
    }
}
function buildAnAd(googleAd) 
{
    var s = '';
    s += '<div><p class="title"><a rel="external" href="' + 
    googleAd.url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' + 
    googleAd.visible_url + '\';return true"> ' + 
    googleAd.line1 + '</a></p> <p>' + 
    googleAd.line2 + ' ' + 
    (typeof (googleAd.line3) != "undefined" ? googleAd.line3 : "") + '</p> <p><a rel="external"  href="' + 
    googleAd.url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' + 
    googleAd.visible_url + '\';return true">' + 
    googleAd.visible_url + '</a></p></div>';
    return s;
}

function randomNumberBetweenOneAndFour() {
    var randomValue = Math.random();
    if (randomValue >= 0 && randomValue < 0.25) {
        return 1
    } else if (randomValue >= 0.25 && randomValue < 0.5) {
        return 2
    } else if (randomValue >= 0.5 && randomValue < 0.75) {
        return 3;
    } else {
        return 4;
    }
}

var lp_test_channel = null;
function setupGoogleAdTest(percentageTrafficTested) {
    var isApplyTest = Math.round(Math.random() * 100) <= percentageTrafficTested;
    if (!isApplyTest) {
        lp_test_channel = null;
        return;
    }
    var testChannel = 'style' + randomNumberBetweenOneAndFour();
    lp_test_channel = testChannel;
    if (google_ad_channel) {
        google_ad_channel = google_ad_channel + ' ' + testChannel;
    }
    jQuery('div.sponsoredLinks.ecomComponent').addClass(testChannel);
}

function buildHeroImages(heroUrlTemplate, lpiMediaUrl, targetClass) {
    if (jQuery('body').hasClass('destinationsLanding') != true) {
        jQuery(targetClass).each(function() {
            var targetId = jQuery(this).text();
            new Hero(heroUrlTemplate.replace('[TARGET_ID]', targetId), lpiMediaUrl).buildImage();
        });
    }
}

function Hero(heroUrl, mediaUrl) {
    this.handleData = function(data) {
      if (data && data.hero) {
        reference = data.hero.reference;
        var refParts = reference.split('-', 2);
        var caption = data.hero.caption;
        image_url = mediaUrl + refParts[0] + "/" + reference + "/93x70.jpg";
        jQuery('span.collectionId:contains("' + data.target + '")').replaceWith('<img src="' + image_url + '" alt="' + caption + '" title="' + caption + '"></img>');
      }
    };
    this.buildImage = function() {
        window['_hero'] = this.handleData;
        jQuery.ajax({type: 'GET',url: heroUrl + ((heroUrl.indexOf('?') < 0) ? '?' : '&') + "callback=_hero",dataType: 'script',cache: true});
    };
}
function formatItem(row) {
    var returnString = row.destinationName;
    if (row.parentCountryName != undefined && row.parentCountryName.length > 0) {
        returnString = returnString + " - " + row.parentCountryName;
    }
    return returnString;
}

function selectItem(li) {
    jQuery('#destAcInput').attr('destinationId', li.extra[0]);
    jQuery('#destAcInput').attr('destinationName', li.innerHTML);
    jQuery('#destAcInput').focus();
}

if (typeof jQuery(document).ready != "undefined") {
    jQuery(document).ready(function() {
        if (typeof dest_url == 'undefined')
            return;
        jQuery("#destAcInput").autocomplete(dest_url + "/destinationName.json", {delay: 400,minChars: 1,matchSubset: 0,onItemSelect: selectItem,formatItem: formatItem,autoFill: true,selectOnly: true});
        jQuery("input[type=text]").blur(function() {
            if (this.value.replace(' ', '') == '') {
                this.value = this.defaultValue
            }
        });
        jQuery("input[type=text]").focus(function() {
            if (this.value == this.defaultValue) {
                this.value = ''
            }
        });
    });
}

function destinationJump(worldguideUrl, li) {
    var input = document.getElementById("destAcInput");
    var id = jQuery('#destAcInput').attr("destinationId");
    var name = jQuery('#destAcInput').attr("destinationName");
    if (id != null && id != undefined) {
        var destId = id;
    }
    if (input.value.replace(' ', '') == '' || input.value == input.defaultValue) {
        alert('Please enter a search term');
        input.focus();
    } 
    else 
    {
        if (destId != null) {
            window.location.href = worldguideUrl + '/destinationRedirector?destId=' + destId;
        } else {
            window.location.href = worldguideUrl + '/destinationRedirector?searchQuery=' + encodeURIComponent(input.value);
        }
    }
}

function validateJumpTo(e) 
{
    var theForm = document.getElementById("destAc");
    if (theForm.destAcInput.value == theForm.destAcInput.defaultValue || theForm.destAcInput.value.replace(' ', '') == "") {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        return false;
    } 
    else
        return true;
}

jQuery.autocomplete = function(input, options) {
    var me = this;
    var $input = jQuery(input).attr("autocomplete", "off");
    if (options.inputClass)
        $input.addClass(options.inputClass);
    var results = document.createElement("div");
    var $results = jQuery(results);
    $results.hide().addClass(options.resultsClass).css("position", "absolute");
    if (options.width > 0)
        $results.css("width", options.width);
    jQuery("body").append(results);
    input.autocompleter = me;
    var timeout = null;
    var prev = "";
    var active = -1;
    var keyb = false;
    var hasFocus = true;
    var lastKeyPressCode = null;
    if (options.data != null) {
        var sFirstChar = "", stMatchSets = {}, row = [];
        for (var i = 0; i < options.data.length; i++) {
            row = ((typeof options.data[i] == "string") ? [options.data[i]] : options.data[i]);
            if (row[0].length > 0) {
                sFirstChar = row[0].substring(0, 1).toLowerCase();
                if (!stMatchSets[sFirstChar])
                    stMatchSets[sFirstChar] = [];
                stMatchSets[sFirstChar].push(row);
            }
        }
    }
    $input.keydown(function(e) {
        lastKeyPressCode = e.keyCode;
        switch (e.keyCode) {
            case 38:
                e.preventDefault();
                moveSelect(-1);
                break;
            case 40:
                e.preventDefault();
                moveSelect(1);
                break;
            case 9:
            case 13:
                if (selectCurrent()) {
                    $input.get(0).blur();
                    e.preventDefault();
                }
                break;
            case 8:
            case 46:
                jQuery('#destAcInput').removeAttr('destinationId');
            default:
                active = -1;
                if (timeout)
                    clearTimeout(timeout);
                timeout = setTimeout(function() {
                    onChange();
                }, options.delay);
                break;
        }
    }).focus(function() {
        hasFocus = true;
    }).blur(function() {
        hasFocus = false;
        hideResults();
    });
    hideResultsNow();
    function onChange() {
        if (lastKeyPressCode == 46 || (lastKeyPressCode > 8 && lastKeyPressCode < 32))
            return $results.hide();
        var v = $input.val();
        if (v == prev)
            return;
        prev = v;
        if (v.length >= options.minChars) {
            $input.addClass(options.loadingClass);
            requestData(v);
        } else {
            $input.removeClass(options.loadingClass);
            $results.hide();
        }
    }
    ;
    function moveSelect(step) {
        var lis = jQuery("li", results);
        if (!lis)
            return;
        active += step;
        if (active < 0) {
            active = 0;
        } else if (active >= lis.size()) {
            active = lis.size() - 1;
        }
        lis.removeClass("ac_over");
        jQuery(lis[active]).addClass("ac_over");
    }
    ;
    function selectCurrent() {
        var li = jQuery("li.ac_over", results)[0];
        if (!li) {
            var $li = jQuery("li", results);
            if (options.selectOnly) {
                if ($li.length == 1)
                    li = $li[0];
            } else if (options.selectFirst) {
                li = $li[0];
            }
        }
        if (li) {
            selectItem(li);
            return true;
        } else {
            return false;
        }
    }
    ;
    function selectItem(li) {
        if (!li) {
            li = document.createElement("li");
            li.extra = [];
            li.selectValue = "";
        }
        var v = jQuery.trim(li.selectValue ? li.selectValue : li.innerHTML);
        input.lastSelected = v;
        prev = v;
        $results.html("");
        $input.val(v);
        hideResultsNow();
        if (options.onItemSelect)
            setTimeout(function() {
                options.onItemSelect(li)
            }, 1);
    }
    ;
    function createSelection(start, end) {
        var field = $input.get(0);
        field.focus();
        if (field.createTextRange) {
            var selRange = field.createTextRange();
            selRange.collapse(true);
            selRange.moveStart("character", start);
            selRange.moveEnd("character", end);
            selRange.select();
        } else if (field.setSelectionRange) {
            field.setSelectionRange(start, end);
        } else {
            if (field.selectionStart) {
                field.selectionStart = start;
                field.selectionEnd = end;
            }
        }
    }
    ;
    function autoFill(sValue, id) {
        if (lastKeyPressCode != 8) {
            $input.val($input.val() + sValue.substring(prev.length));
            createSelection(prev.length, sValue.length);
        }
    }
    ;
    function showResults() {
        var pos = findPos(input);
        var iWidth = (options.width > 0) ? options.width : $input.width();
        $results.css({width: parseInt(iWidth) + "px",top: (pos.y + input.offsetHeight) + "px",left: pos.x + "px"}).show();
    }
    ;
    function hideResults() {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(hideResultsNow, 200);
    }
    ;
    function hideResultsNow() {
        if (timeout)
            clearTimeout(timeout);
        $input.removeClass(options.loadingClass);
        if ($results.is(":visible")) {
            $results.hide();
        }
        if (options.mustMatch) {
            var v = $input.val();
            if (v != input.lastSelected) {
                selectItem(null);
            }
        }
    }
    ;
    function receiveData(q, data) {
        if (data) {
            $input.removeClass(options.loadingClass);
            results.innerHTML = "";
            if (!hasFocus || data.length == 0)
                return hideResultsNow();
            if (jQuery.browser.msie) {
                $results.append(document.createElement('iframe'));
            }
            results.appendChild(dataToDom(data));
            if (options.autoFill && ($input.val().toLowerCase() == q.toLowerCase()))
                autoFill(data[0].destinationName, data[0].id);
            showResults();
        } else {
            hideResultsNow();
        }
    }
    ;
    function parseData(data) {
        if (!data)
            return null;
        var parsed = [];
        parsed = eval(data);
        return parsed;
    }
    ;
    function dataToDom(data) {
        var ul = document.createElement("ul");
        var num = data.length;
        if ((options.maxItemsToShow > 0) && (options.maxItemsToShow < num))
            num = options.maxItemsToShow;
        for (var i = 0; i < num; i++) {
            var row = data[i];
            if (!row)
                continue;
            var li = document.createElement("li");
            if (options.formatItem) {
                li.innerHTML = options.formatItem(row, i, num);
                li.selectValue = row[0];
            } else {
                li.innerHTML = row[0];
                li.selectValue = row[0];
            }
            var extra = [];
            extra[0] = row.id;
            li.extra = extra;
            ul.appendChild(li);
            jQuery(li).hover(function() {
                jQuery("li", ul).removeClass("ac_over");
                jQuery(this).addClass("ac_over");
                active = jQuery("li", ul).indexOf(jQuery(this).get(0));
            }, function() {
                jQuery(this).removeClass("ac_over");
            }).click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                selectItem(this)
            });
        }
        return ul;
    }
    ;
    function requestData(q) {
        if (!options.matchCase)
            q = q.toLowerCase();
        if (options.dataType == 'jsonp') {
            dataType = 'jsonp';
        } else {
            dataType = 'json';
        }
        if ((typeof options.url == "string") && (options.url.length > 0)) {
            jQuery.get(makeUrl(q), function handleJsonData(data) {
                if (dataType != 'jsonp') {
                    data = parseData(data);
                } 
                else {
                    data = data.destinations;
                }
                receiveData(q, data);
            }, dataType);
        } else {
            $input.removeClass(options.loadingClass);
        }
    }
    ;
    function makeUrl(q) {
        var url = options.url + "?searchQuery=" + encodeURI(q);
        for (var i in options.extraParams) {
            url += "&" + i + "=" + encodeURI(options.extraParams[i]);
        }
        return url;
    }
    ;
    function matchSubset(s, sub) {
        if (!options.matchCase)
            s = s.toLowerCase();
        var i = s.indexOf(sub);
        if (i == -1)
            return false;
        return i == 0 || options.matchContains;
    }
    ;
    this.setExtraParams = function(p) {
        options.extraParams = p;
    };
    this.findValue = function() {
        var q = $input.val();
        if (!options.matchCase)
            q = q.toLowerCase();
        if ((typeof options.url == "string") && (options.url.length > 0)) {
            jQuery.get(makeUrl(q), function(data) {
                data = parseData(data)
                findValueCallback(q, data);
            });
        } else {
            findValueCallback(q, null);
        }
    }
    function findValueCallback(q, data) {
        if (data)
            $input.removeClass(options.loadingClass);
        var num = (data) ? data.length : 0;
        var li = null;
        for (var i = 0; i < num; i++) {
            var row = data[i];
            if (row.destinationName.toLowerCase() == q.toLowerCase()) {
                li = document.createElement("li");
                if (options.formatItem) {
                    li.innerHTML = options.formatItem(row, i, num);
                    li.selectValue = row.destinationName;
                } else {
                    li.innerHTML = row.destinationName;
                    li.selectValue = row.destinationName;
                }
                var extra = [];
                extra[1] = row.id;
                li.extra = extra;
            }
        }
        if (options.onFindValue)
            setTimeout(function() {
                options.onFindValue(li)
            }, 1);
    }
    function findPos(obj) {
        var curleft = obj.offsetLeft || 0;
        var curtop = obj.offsetTop || 0;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
        return {x: curleft,y: curtop};
    }
}

jQuery.fn.autocomplete = function(url, options, data) {
    options = options || {};
    options.url = url;
    options.data = ((typeof data == "object") && (data.constructor == Array)) ? data : null;
    options.inputClass = options.inputClass || "ac_input";
    options.resultsClass = options.resultsClass || "ac_results";
    options.lineSeparator = options.lineSeparator || "\n";
    options.cellSeparator = options.cellSeparator || "|";
    options.minChars = options.minChars || 1;
    options.delay = options.delay || 400;
    options.matchCase = options.matchCase || 0;
    options.matchSubset = options.matchSubset || 1;
    options.matchContains = options.matchContains || 0;
    options.mustMatch = options.mustMatch || 0;
    options.extraParams = options.extraParams || {};
    options.loadingClass = options.loadingClass || "ac_loading";
    options.selectFirst = options.selectFirst || false;
    options.selectOnly = options.selectOnly || false;
    options.maxItemsToShow = options.maxItemsToShow || -1;
    options.autoFill = options.autoFill || false;
    options.width = parseInt(options.width, 10) || 0;
    this.each(function() {
        var input = this;
        new jQuery.autocomplete(input, options);
    });
    return this;
}

jQuery.fn.autocompleteArray = function(data, options) {
    return this.autocomplete(null, options, data);
}

jQuery.fn.indexOf = function(e) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == e)
            return i;
    }
    return -1;
};

(function($) {
    $.fn.addOverlay = function(o, callback) {
        return this.each(function() {
            var container = $(this);
            var data = container.data('overlay');
            if (data) {
                data.overlay.remove();
            }
            data = $.extend({speed: 'fast',opacity: 0.6}, o || {});
            var overlay;
            var fadeOn;
            var bgDiv;
            if (jQuery.browser.msie) {
                overlay = $('<iframe /><div><div /></div>');
                fadeOn = overlay.eq(1);
                bgDiv = fadeOn.children();
                bgDiv.css({width: '100%',height: '100%'});
            } else {
                overlay = $('<div />');
                fadeOn = overlay;
                bgDiv = overlay;
            }
            overlay.css({position: 'absolute','z-index': '1000010',top: '0px',left: '0px',height: this.parentNode.scrollHeight,width: '100%',opacity: '0',filter: "alpha(opacity='0')"});
            bgDiv.css({background: 'black',opacity: data.opacity});
            data.overlay = overlay;
            data.fadeOn = fadeOn;
            container.data('overlay', data);
            fadeOn.hide();
            container.append(overlay);
            fadeOn.fadeIn(data.speed, callback);
        });
    };
    $.fn.removeOverlay = function(callback) {
        return this.each(function() {
            var container = $(this);
            var data = container.data('overlay');
            if (data) {
                data.fadeOn.fadeOut('fast', function() {
                    data.overlay.remove();
                    container.removeData('overlay');
                    if (callback) {
                        callback();
                    }
                });
            }
        });
    };
})(jQuery);


(function($) {
    $.extend($.fn, {livequery: function(type, fn, fn2) {
            var self = this, q;
            if ($.isFunction(type))
                fn2 = fn, fn = type, type = undefined;
            $.each($.livequery.queries, function(i, query) {
                if (self.selector == query.selector && self.context == query.context && type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid))
                    return (q = query) && false;
            });
            q = q || new $.livequery(this.selector, this.context, type, fn, fn2);
            q.stopped = false;
            q.run();
            return this;
        },expire: function(type, fn, fn2) {
            var self = this;
            if ($.isFunction(type))
                fn2 = fn, fn = type, type = undefined;
            $.each($.livequery.queries, function(i, query) {
                if (self.selector == query.selector && self.context == query.context && (!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped)
                    $.livequery.stop(query.id);
            });
            return this;
        }});
    $.livequery = function(selector, context, type, fn, fn2) {
        this.selector = selector;
        this.context = context || document;
        this.type = type;
        this.fn = fn;
        this.fn2 = fn2;
        this.elements = [];
        this.stopped = false;
        this.id = $.livequery.queries.push(this) - 1;
        fn.$lqguid = fn.$lqguid || $.livequery.guid++;
        if (fn2)
            fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;
        return this;
    };
    $.livequery.prototype = {stop: function() {
            var query = this;
            if (this.type)
                this.elements.unbind(this.type, this.fn);
            else if (this.fn2)
                this.elements.each(function(i, el) {
                    query.fn2.apply(el);
                });
            this.elements = [];
            this.stopped = true;
        },run: function() {
            if (this.stopped)
                return;
            var query = this;
            var oEls = this.elements, els = $(this.selector, this.context), nEls = els.not(oEls);
            this.elements = els;
            if (this.type) {
                nEls.bind(this.type, this.fn);
                if (oEls.length > 0)
                    $.each(oEls, function(i, el) {
                        if ($.inArray(el, els) < 0)
                            $.event.remove(el, query.type, query.fn);
                    });
            } 
            else {
                nEls.each(function() {
                    query.fn.apply(this);
                });
                if (this.fn2 && oEls.length > 0)
                    $.each(oEls, function(i, el) {
                        if ($.inArray(el, els) < 0)
                            query.fn2.apply(el);
                    });
            }
        }};
    $.extend($.livequery, {guid: 0,queries: [],queue: [],running: false,timeout: null,checkQueue: function() {
            if ($.livequery.running && $.livequery.queue.length) {
                var length = $.livequery.queue.length;
                while (length--)
                    $.livequery.queries[$.livequery.queue.shift()].run();
            }
        },pause: function() {
            $.livequery.running = false;
        },play: function() {
            $.livequery.running = true;
            $.livequery.run();
        },registerPlugin: function() {
            $.each(arguments, function(i, n) {
                if (!$.fn[n])
                    return;
                var old = $.fn[n];
                $.fn[n] = function() {
                    var r = old.apply(this, arguments);
                    $.livequery.run();
                    return r;
                }
            });
        },run: function(id) {
            if (id != undefined) {
                if ($.inArray(id, $.livequery.queue) < 0)
                    $.livequery.queue.push(id);
            } 
            else
                $.each($.livequery.queries, function(id) {
                    if ($.inArray(id, $.livequery.queue) < 0)
                        $.livequery.queue.push(id);
                });
            if ($.livequery.timeout)
                clearTimeout($.livequery.timeout);
            $.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
        },stop: function(id) {
            if (id != undefined)
                $.livequery.queries[id].stop();
            else
                $.each($.livequery.queries, function(id) {
                    $.livequery.queries[id].stop();
                });
        }});
    $.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');
    $(function() {
        $.livequery.play();
    });
    var init = $.prototype.init;
    $.prototype.init = function(a, c) {
        var r = init.apply(this, arguments);
        if (a && a.selector)
            r.context = a.context, r.selector = a.selector;
        if (typeof a == 'string')
            r.context = c || document, r.selector = a;
        return r;
    };
    $.prototype.init.prototype = $.prototype;
})(jQuery);

jQuery(document).ready(function($) {
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
    if ($.browser.msie) {
        $('body').addClass('browserIE');
        $('body').addClass('browserIE' + $.browser.version.substring(0, 1));
    }
    if ($.browser.chrome) {
        $('body').addClass('browserChrome');
        userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
        userAgent = userAgent.substring(0, 1);
        $('body').addClass('browserChrome' + userAgent);
        $.browser.safari = false;
    }
    if ($.browser.safari) {
        $('body').addClass('browserSafari');
        userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
        userAgent = userAgent.substring(0, 1);
        $('body').addClass('browserSafari' + userAgent);
    }
    if ($.browser.mozilla) {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            $('body').addClass('browserFirefox');
            userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
            userAgent = userAgent.substring(0, 1);
            $('body').addClass('browserFirefox' + userAgent);
        } 
        else {
            $('body').addClass('browserMozilla');
        }
    }
    if ($.browser.opera) {
        $('body').addClass('browserOpera');
    }
});
var rsi_segs = [];
var segs_beg = document.cookie.indexOf('rsi_segs=');
if (segs_beg >= 0) {
    segs_beg = document.cookie.indexOf('=', segs_beg) + 1;
    if (segs_beg > 0) {
        var segs_end = document.cookie.indexOf(';', segs_beg);
        if (segs_end == -1) {
            segs_end = document.cookie.length;
        }
        rsi_segs = document.cookie.substring(segs_beg, segs_end).split('|');
    }
}
var segLen = 20;
var segQS = "";
if (rsi_segs.length < segLen) {
    segLen = rsi_segs.length;
}
for (var i = 0; i < segLen; i++) {
    segQS += ("rsi" + "=" + rsi_segs[i] + ";");
} 

window.Modernizr = function(a, b, c) {
    function C(a) {
        j.cssText = a
    }
    function D(a, b) {
        return C(n.join(a + ";") + (b || ""))
    }
    function E(a, b) {
        return typeof a === b
    }
    function F(a, b) {
        return !!~("" + a).indexOf(b)
    }
    function G(a, b) {
        for (var d in a)
            if (j[a[d]] !== c)
                return b == "pfx" ? a[d] : !0;
        return !1
    }
    function H(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c)
                return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }
    function I(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.substr(1), e = (a + " " + p.join(d + " ") + d).split(" ");
        return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), H(e, b, c))
    }
    function K() {
        e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++)
                u[c[d]] = c[d] in k;
            return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++)
                k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : /^color$/.test(f) ? (g.appendChild(k), g.offsetWidth, e = k.value != l, g.removeChild(k)) : e = k.value != l)), t[a[d]] = !!e;
            return t
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var d = "2.5.3", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k = b.createElement("input"), l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "), o = "Webkit Moz O ms", p = o.split(" "), q = o.toLowerCase().split(" "), r = {svg: "http://www.w3.org/2000/svg"}, s = {}, t = {}, u = {}, v = [], w = v.slice, x, y = function(a, c, d, e) {
        var f, i, j, k = b.createElement("div"), l = b.body, m = l ? l : b.createElement("body");
        if (parseInt(d, 10))
            while (d--)
                j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), k.appendChild(j);
        return f = ["&#173;", "<style>", a, "</style>"].join(""), k.id = h, m.innerHTML += f, m.appendChild(k), l || (m.style.background = "", g.appendChild(m)), i = c(k, a), l ? k.parentNode.removeChild(k) : m.parentNode.removeChild(m), !!i
    }, z = function() {
        function d(d, e) {
            e = e || b.createElement(a[d] || "div"), d = "on" + d;
            var f = d in e;
            return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
        }
        var a = {select: "input",change: "input",submit: "form",reset: "form",error: "img",load: "img",abort: "img"};
        return d
    }(), A = {}.hasOwnProperty, B;
    !E(A, "undefined") && !E(A.call, "undefined") ? B = function(a, b) {
        return A.call(a, b)
    } : B = function(a, b) {
        return b in a && E(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function")
            throw new TypeError;
        var d = w.call(arguments, 1), e = function() {
            if (this instanceof e) {
                var a = function() {
                };
                a.prototype = c.prototype;
                var f = new a, g = c.apply(f, d.concat(w.call(arguments)));
                return Object(g) === g ? g : f
            }
            return c.apply(b, d.concat(w.call(arguments)))
        };
        return e
    });
    var J = function(c, d) {
        var f = c.join(""), g = d.length;
        y(f, function(c, d) {
            var f = b.styleSheets[b.styleSheets.length - 1], h = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "", i = c.childNodes, j = {};
            while (g--)
                j[i[g].id] = i[g];
            e.touch = "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch || (j.touch && j.touch.offsetTop) === 9, e.generatedcontent = (j.generatedcontent && j.generatedcontent.offsetHeight) >= 1, e.fontface = /src/i.test(h) && h.indexOf(d.split(" ")[0]) === 0
        }, g, d)
    }(['@font-face {font-family:"font";src:url("https://")}', ["@media (", n.join("touch-enabled),("), h, ")", "{#touch{top:9px;position:absolute}}"].join(""), ['#generatedcontent:after{content:"', l, '";visibility:hidden}'].join("")], ["fontface", "touch", "generatedcontent"]);
    s.flexbox = function() {
        return I("flexOrder")
    }, s["flexbox-legacy"] = function() {
        return I("boxDirection")
    }, s.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !!a.getContext("2d")
    }, s.touch = function() {
        return e.touch
    }, s.geolocation = function() {
        return !!navigator.geolocation
    }, s.hashchange = function() {
        return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }, s.history = function() {
        return !!a.history && !!history.pushState
    }, s.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable" in a || "ondragstart" in a && "ondrop" in a
    }, s.websockets = function() {
        for (var b = -1, c = p.length; ++b < c; )
            if (a[p[b] + "WebSocket"])
                return !0;
        return "WebSocket" in a
    }, s.rgba = function() {
        return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba")
    }, s.hsla = function() {
        return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla")
    }, s.multiplebgs = function() {
        return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
    }, s.backgroundsize = function() {
        return I("backgroundSize")
    }, s.borderradius = function() {
        return I("borderRadius")
    }, s.boxshadow = function() {
        return I("boxShadow")
    }, s.opacity = function() {
        return D("opacity:.55"), /^0.55$/.test(j.opacity)
    }, s.cssanimations = function() {
        return I("animationName")
    }, s.csscolumns = function() {
        return I("columnCount")
    }, s.cssgradients = function() {
        var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));", c = "linear-gradient(left top,#9f9, white);";
        return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), F(j.backgroundImage, "gradient")
    }, s.csstransitions = function() {
        return I("transition")
    }, s.fontface = function() {
        return e.fontface
    }, s.generatedcontent = function() {
        return e.generatedcontent
    }, s.video = function() {
        var a = b.createElement("video"), c = !1;
        try {
            if (c = !!a.canPlayType)
                c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
        } catch (d) {
        }
        return c
    }, s.audio = function() {
        var a = b.createElement("audio"), c = !1;
        try {
            if (c = !!a.canPlayType)
                c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
        } catch (d) {
        }
        return c
    }, s.localstorage = function() {
        try {
            return localStorage.setItem(h, h), localStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.applicationcache = function() {
        return !!a.applicationCache
    }, s.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect
    }, s.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
    };
    for (var L in s)
        B(s, L) && (x = L.toLowerCase(), e[x] = s[L](), v.push((e[x] ? "" : "no-") + x));
    return e.input || K(), e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a)
                B(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c)
                return e;
            b = typeof b == "function" ? b() : b, g.className += " " + (b ? "" : "no-") + a, e[a] = b
        }
        return e
    }, C(""), i = k = null, function(a, b) {
        function g(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }
        function h() {
            var a = k.elements;
            return typeof a == "string" ? a.split(" ") : a
        }
        function i(a) {
            var b = {}, c = a.createElement, e = a.createDocumentFragment, f = e();
            a.createElement = function(a) {
                var e = (b[a] || (b[a] = c(a))).cloneNode();
                return k.shivMethods && e.canHaveChildren && !d.test(a) ? f.appendChild(e) : e
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/\w+/g, function(a) {
                return b[a] = c(a), f.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(k, f)
        }
        function j(a) {
            var b;
            return a.documentShived ? a : (k.shivCSS && !e && (b = !!g(a, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")), f || (b = !i(a)), b && (a.documentShived = b), a)
        }
        var c = a.html5 || {}, d = /^<|^(?:button|form|map|select|textarea)$/i, e, f;
        (function() {
            var a = b.createElement("a");
            a.innerHTML = "<xyz></xyz>", e = "hidden" in a, f = a.childNodes.length == 1 || function() {
                try {
                    b.createElement("a")
                } catch (a) {
                    return !0
                }
                var c = b.createDocumentFragment();
                return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" || typeof c.createElement == "undefined"
            }()
        })();
        var k = {elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS: c.shivCSS !== !1,shivMethods: c.shivMethods !== !1,type: "default",shivDocument: j};
        a.html5 = k, j(b)
    }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.hasEvent = z, e.testProp = function(a) {
        return G([a])
    }, e.testAllProps = I, e.testStyles = y, e.prefixed = function(a, b, c) {
        return b ? I(a, b, c) : I(a, "pfx")
    }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
}(this, this.document), function(a, b, c) {
    function d(a) {
        return o.call(a) == "[object Function]"
    }
    function e(a) {
        return typeof a == "string"
    }
    function f() {
    }
    function g(a) {
        return !a || a == "loaded" || a == "complete" || a == "uninitialized"
    }
    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            (a.t == "c" ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                a != "img" && m(function() {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c])
                    y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }
        var j = j || B.errorTimeout, l = {}, o = 0, r = 0, u = {t: d,s: c,e: f,a: i,x: j};
        y[c] === 1 && (r = 1, y[c] = [], l = b.createElement(a)), a == "object" ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r)
        }, p.splice(e, 0, u), a != "img" && (r || y[c] === 2 ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }
    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i(b == "c" ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), p.length == 1 && h()), this
    }
    function k() {
        var a = B;
        return a.loader = {load: j,i: 0}, a
    }
    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && o.call(a.opera) == "[object Opera]", l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function(a) {
        return o.call(a) == "[object Array]"
    }, x = [], y = {}, z = {timeout: function(a, b) {
            return b.length && (a.timeout = b[0]), a
        }}, A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {url: c,origUrl: c,prefixes: a}, e, f, g;
            for (f = 0; f < d; f++)
                g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++)
                c = x[f](c);
            return c
        }
        function g(a, e, f, g, i) {
            var j = b(a), l = j.autoCallback;
            j.url.split(".").pop().split("?").shift(), j.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]] || h), j.instead ? j.instead(a, e, f, g, i) : (y[j.url] ? j.noexec = !0 : y[j.url] = 1, f.load(j.url, j.forceCSS || !j.forceJS && "css" == j.url.split(".").pop().split("?").shift() ? "c" : c, j.noexec, j.attrs, j.timeout), (d(e) || d(l)) && f.load(function() {
                k(), e && e(j.origUrl, i, g), l && l(j.origUrl, i, g), y[j.url] = 2
            })))
        }
        function i(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))
                        c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        }), g(a, j, b, 0, h);
                    else if (Object(a) === a)
                        for (n in m = function() {
                            var b = 0, c;
                            for (c in a)
                                a.hasOwnProperty(c) && b++;
                            return b
                        }(), a)
                            a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                var a = [].slice.call(arguments);
                                k.apply(this, a), l()
                            } : j[n] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), l()
                                }
                            }(k[n])), g(a[n], j, b, n, h))
                } else
                    !c && l()
            }
            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i)
        }
        var j, l, m = this.yepnope.loader;
        if (e(a))
            g(a, 0, m, 0);
        else if (w(a))
            for (j = 0; j < a.length; j++)
                l = a[j], e(l) ? g(l, 0, m, 0) : w(l) ? B(l) : Object(l) === l && i(l, m);
        else
            Object(a) === a && i(a, m)
    }, B.addPrefix = function(a, b) {
        z[a] = b
    }, B.addFilter = function(a) {
        x.push(a)
    }, B.errorTimeout = 1e4, b.readyState == null && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d)
            k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function() {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d)
            e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, Modernizr.addTest("boxsizing", function() {
    return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7)
});

