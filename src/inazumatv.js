/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/12 - 16:17
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * inspired by three.js / http://threejs.org and CreateJS / http://createjs.com/
 */

var inazumatv = {};

// polyfill
( function ( self ){
    "use strict";

    // console
    if ( !self.console ) {
        self.console = {
            info: function (){},
            log: function  (){},
            debug: function (){},
            warn: function (){},
            error: function (){},
            table: function (){}
        };
    }

    ( function() {
        // requestAnimationFrame
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
        var lastTime = 0;
        var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
        for( var x = 0, limit = vendors.length; x < limit && !self.requestAnimationFrame; ++x ) {
            self.requestAnimationFrame = self[ vendors[ x ]+'RequestAnimationFrame' ];
            self.cancelAnimationFrame = self[ vendors[ x ]+'CancelAnimationFrame' ] || self[ vendors[ x ]+'CancelRequestAnimationFrame' ];
        }

        if ( !self.requestAnimationFrame ) {
            self.requestAnimationFrame = function( callback ) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
                var id = self.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if ( !self.cancelAnimationFrame ) {
            self.cancelAnimationFrame = function( id ) {
                clearTimeout( id );
            };
        }

        // Object.create
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
        if (!Object.create) {
            Object.create = (function(){
                function F(){}

                return function(o){
                    if (arguments.length !== 1) {
                        throw new Error('Object.create implementation only accepts one parameter.');
                    }
                    F.prototype = o;
                    return new F();
                };
            })();
        }

        // Array.isArray
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
        if(!Array.isArray) {
            Array.isArray = function (vArg) {
                return Object.prototype.toString.call(vArg) === "[object Array]";
            };
        }

        // Array.indexOf
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement , fromIndex) {
                var i,
                    pivot = (fromIndex) ? fromIndex : 0,
                    length;

                if (!this) {
                    throw new TypeError();
                }

                length = this.length;

                if (length === 0 || pivot >= length) {
                    return -1;
                }

                if (pivot < 0) {
                    pivot = length - Math.abs(pivot);
                }

                for (i = pivot; i < length; i++) {
                    if (this[i] === searchElement) {
                        return i;
                    }
                }
                return -1;
            };
        }

        // Array.forEach
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (fn, scope) {
                var i, len;
                for (i = 0, len = this.length; i < len; ++i) {
                    if (i in this) {
                        fn.call(scope, this[i], i, this);
                    }
                }
            };
        }

        // Function.prototype.bind
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {},
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }

        // trim
        // three.js
        String.prototype.trim = String.prototype.trim || function () {

            return this.replace( /^\s+|\s+$/g, '' );

        };
    }());

}( window.self ) );

// ==================================
//  Top Level function
// ==================================

( function ( inazumatv ){
    "use strict";

    /**
     * Top Level
     * 継承に使用します
     * @for inazumatv
     * @method extend
     * @param {Function} P 親クラス
     * @param {Function} C 子クラス
     */
    inazumatv.extend = function ( P, C ) {
        C.prototype = Object.create( P.prototype );
        C.prototype.constructor = C;
    };

    /**
     * Top Level
     * 数値チェック
     * @for inazumatv
     * @method isNumeric
     * @param {*} obj
     * @returns {boolean} true: Number, false: not Number
     */
    function isNumeric ( obj ) {
        return !isNaN( parseFloat( obj ) ) && isFinite( obj );
    }
    inazumatv.isNumeric = isNumeric;

    /**
     * Top Level
     * 範囲指定乱数生成
     * @for inazumatv
     * @method random
     * @param {Number} min 最小値
     * @param {Number} [max] 最大値 optional
     * @returns {Number} min ~ max 間の乱数(Float)を発生させます
     */
    inazumatv.random = function ( min, max ) {
        if ( !isNumeric( max ) ) {
            // max が無い場合は 0 ~ min の範囲
            max = min;
            min = 0;
        }

        return Math.random() * (max - min) + min;
    };

    /**
     * Top Level
     * 配列内の最大数値を返す
     * @for inazumatv
     * @method maxValue
     * @param {Array} arr 検証対象の配列、内部は全部数値
     * @returns {number}
     */
    inazumatv.maxValue = function ( arr ){
        return Math.max.apply(null, arr);
    };

}( inazumatv ) );
