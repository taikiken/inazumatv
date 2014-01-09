/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/14 - 18:59
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( inazumatv ){
    "use strict";

    /**
     * @class Easing
     * @constructor
     * @static
     */
    var Easing = function () {
        throw "Easing cannot be instantiated";
    };

    /**
     * jQuery.easing 拡張 easing
     * quart
     * easeInQuad
     * easeOutQuad
     * easeInOutQuad
     * easeInCubic
     * easeOutCubic
     * easeInOutCubic
     * easeInQuart
     * easeOutQuart
     * easeInOutQuart
     * easeInQuint
     * easeOutQuint
     * easeInOutQuint
     * easeInSine
     * easeOutSine
     * easeInOutSine
     * easeInExpo
     * easeOutExpo
     * easeInOutExpo
     * easeInCirc
     * easeOutCirc
     * easeInOutCirc
     * easeInElastic
     * easeOutElastic
     * easeInOutElastic
     * easeInBack
     * easeOutBack
     * easeInOutBack
     * easeInBounce
     * easeOutBounce
     * easeInOutBounce
     *
     * @type {{activate: Function}}
     */
    Easing = {
        /**
         * Easing plugin を活性化します
         * @method activate
         * @param {jQuery} jQuery
         * @static
         */
        activate: function ( jQuery ){
            var je = jQuery.easing;
            je.quart = function (x, t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            };
            je.easeInQuad = function (x, t, b, c, d) {
                return c*(t/=d)*t + b;
            };
            je.easeOutQuad = function (x, t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            };
            je.easeInOutQuad = function (x, t, b, c, d) {
                if ((t /= d/2) < 1) {return c/2*t*t + b;}
                return -c/2 * ((--t)*(t-2) - 1) + b;
            };
            je.easeInCubic = function (x, t, b, c, d) {
                return c*(t/=d)*t*t + b;
            };
            je.easeOutCubic = function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            };
            je.easeInOutCubic = function (x, t, b, c, d) {
                if ((t /= d/2) < 1) {return c/2*t*t*t + b;}
                return c/2*((t-=2)*t*t + 2) + b;
            };
            je.easeInQuart = function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            };
            je.easeOutQuart = function (x, t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            };
            je.easeInOutQuart = function (x, t, b, c, d) {
                if ((t /= d/2) < 1) {return c/2*t*t*t*t + b;}
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            };
            je.easeInQuint = function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            };
            je.easeOutQuint = function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            };
            je.easeInOutQuint = function (x, t, b, c, d) {
                if ((t /= d/2) < 1) {return c/2*t*t*t*t*t + b;}
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            };
            je.easeInSine = function (x, t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            };
            je.easeOutSine = function (x, t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            };
            je.easeInOutSine = function (x, t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            };
            je.easeInExpo = function (x, t, b, c, d) {
                return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            };
            je.easeOutExpo = function (x, t, b, c, d) {
                return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            };
            je.easeInOutExpo = function (x, t, b, c, d) {
                if (t===0) {return b;}
                if (t===d) {return b+c;}
                if ((t /= d/2) < 1) {return c/2 * Math.pow(2, 10 * (t - 1)) + b;}
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            };
            je.easeInCirc = function (x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            };
            je.easeOutCirc = function (x, t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            };
            je.easeInOutCirc = function (x, t, b, c, d) {
                if ((t /= d/2) < 1) {return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;}
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            };
            je.easeInElastic = function (x, t, b, c, d) {
                var s=1.70158,p= 0,a=c;
                if (t===0) {return b;}
                if ((t/=d)===1) {return b+c;}
                if (!p) {p=d*0.3;}
                if (a < Math.abs(c)) { a=c;s=p/4; }
                else {
                    s = p/(2*Math.PI) * Math.asin (c/a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                }
            };
            je.easeOutElastic = function (x, t, b, c, d) {
                var s=1.70158,p= 0,a=c;
                if (t===0) {return b; }
                if ((t/=d)===1) {return b+c;}
                if (!p) {p=d*0.3;}
                if (a < Math.abs(c)) { a=c; s=p/4; }
                else { s = p/(2*Math.PI) * Math.asin (c/a);
                    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;}
            };
            je.easeInOutElastic = function (x, t, b, c, d) {
                var s=1.70158,p=0,a=c;
                if (t===0) {return b;}
                if ((t /= d/2)===2) {return b+c;}
                if (!p) {p=d*(0.3*1.5);}
                if (a < Math.abs(c)) { a=c;s=p/4; }
                else {
                    s = p/(2*Math.PI) * Math.asin (c/a);
                    if (t < 1) {return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;}
                    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
                }
            };
            je.easeInBack = function (x, t, b, c, d, s) {
                if (s === undefined) {s = 1.70158;}
                return c*(t/=d)*t*((s+1)*t - s) + b;
            };
            je.easeOutBack = function (x, t, b, c, d, s) {
                if (s === undefined) {s = 1.70158;}
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            };
            je.easeInOutBack = function (x, t, b, c, d, s) {
                if (s === undefined) {s = 1.70158; }
                if ((t /= d/2) < 1) {return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;}
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            };
            je.easeInBounce = function (x, t, b, c, d) {
                return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
            };
            je.easeOutBounce = function (x, t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
                }
            };
            je.easeInOutBounce = function (x, t, b, c, d) {
                if (t < d/2) {return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * 0.5 + b;}
                return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * 0.5 + c * 0.5 + b;
            };
        }
    };

    inazumatv.jq.Easing = Easing;
}( this.inazumatv ) );