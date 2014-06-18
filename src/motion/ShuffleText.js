/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 16:58
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
/**
 * ShuffleText by Yasunobu Ikeda. Feb 3, 2012
 * Visit http://clockmaker.jp/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 Yasunobu Ikeda
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
// -----------------------------------
//  original code by clockMaker's  ShuffleText.js
//  http://clockmaker.jp/blog/2012/02/html5_shuffletext/
//
//  modified by (at)taikiken
// -----------------------------------
( function ( inazumatv ){
    "use strict";

    var rand = Math.random,
        floor = Math.floor,

        FPSManager = inazumatv.FPSManager;

    /**
     * テキストをシャッフルし表示します
     * @class ShuffleText
     * @constructor
     */
    function ShuffleText () {
        this._boundUpdate = this.update.bind( this );
        this._fps = new FPSManager( 60 );
    }

    var p = ShuffleText.prototype;

    /**
     * @method initialize
     * @param {*} element DOMElement
     */
    p.initialize = function ( element ){
        this._element = element;
    };

    /**
     * ランダムテキストに用いる文字列
     * @property sourceRandomCharacter
     * @type {string}
     * @default ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
     * */
    p.sourceRandomCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    p.setRandomChar = function ( randomChar ){
        this.sourceRandomCharacter = randomChar;
    };
    /**
     * 空白に用いる文字列
     * @property emptyCharacter
     * @type {string}
     * @default "*"
     * */
    p.emptyCharacter = "*";
    /**
     * フレームレート
     * @property fps
     * @type {Number}
     * @default 60
     * */
    p.fps = 60;
    /**
     * 再生中かどうかを示すブール値
     * @property isRunning
     * @type {boolean}
     * */
    p.isRunning = false;
    /**
     * エフェクトの実行時間(millisecond)
     * @property duration
     * @type {Number}
     * @default 500 (500ms)
     * */
    p.duration = 500;

    /**
     * @method setDuration
     * @param {Number} ms millisecond
     */
    p.setDuration = function ( ms ){
        this.duration = ms;
    };

    p._originalStr = "";
    p._originalLength = "";
    p._intervalId = 0;
    p._timeCurrent = 0;
    p._timeStart = 0;
    p._randomIndex = [];

    /**
     * テキストを設定します。
     * @method setText
     * @param {string} text
     */
    p.setText = function ( text ) {
        this._originalStr = text;
        this._originalLength = text.length;
    };

    /**
     *
     * 再生を開始します。
     * @method start
     * @param {boolean=false} [is_keep]
     * */
    p.start = function ( is_keep ) {
        var element = this._element;

        if (typeof element === "undefined") {
            return;
        }

        is_keep = !!is_keep;

        this._keep = is_keep;

        if ( this.isRunning ) {
            this.stop( true );
        }

//        p._randomIndex = [];
        this._randomIndex = [];

        var str = "",
            random_index = this._randomIndex,
            empty_char = this.emptyCharacter,
            origin_length = this._originalLength;

        this._endStr = this._originalStr;

        for ( var i = 0; i < origin_length; i++ ) {

            var rate = i / origin_length;
//            p._randomIndex[ i ] = Math.random() * ( 1 - rate ) + rate;
            random_index[ i ] = rand() * ( 1 - rate ) + rate;

            str += empty_char;
        }

        var _fps = this._fps;

        _fps.changeFPS( this.fps );
        _fps.addEventListener( FPSManager.FPS_FRAME, this._boundUpdate );

//        this._intervalId = setInterval(Delegate.create( this._onInterval, this ), 1000 / p.fps );
//        this._intervalId = setInterval( this._onInterval.bind( this ) , 1000 / this.fps );
        this.isRunning = true;

        if ( !is_keep ) {
            element.innerHTML = str;
        }

        this._timeStart = new Date().getTime();
        _fps.start();
    };

    /**
     * 停止します。
     * @method stop
     * */
    p.stop = function ( strong ) {
        strong = !!strong;

        if ( this.isRunning ) {

//            clearInterval(this._intervalId);
            this._fps.removeEventListener( FPSManager.FPS_FRAME, this._boundUpdate );
            this._fps.stop();

//            this.isRunning = false;
            if ( strong ) {
//                this._element.innerHTML = this._originalStr;
                this._element.innerHTML = this._endStr;
            }
        }

        this.isRunning = false;
    };

    /**
     *
     * @private
     * @method _onInterval
     */
//    p._onInterval = function () {
    p.update = function () {
        var timeCurrent = new Date().getTime() - this._timeStart,
            percent = timeCurrent / this.duration,
            random_index = this._randomIndex,
            origin_str = this._originalStr,
            empty_char = this.emptyCharacter,
            random_char = this.sourceRandomCharacter,
            random_char_length = random_char.length,
            is_keep = this._keep;

        this._timeCurrent = timeCurrent;

        var str = "";
        for ( var i = 0, limit = this._originalLength; i < limit; i++ ) {
//
//            if ( percent >= random_index[ i ] ) {
//
////                str += this._originalStr.charAt(i);
//                str += origin_str.charAt(i);
//
//            } else if ( percent < random_index[ i ] / 3 ) {
//
//                str += empty_char;
//            } else {
//
////                str += this.sourceRandomCharacter.charAt( Math.floor( Math.random() * ( this.sourceRandomCharacter.length ) ) );
//                str += random_char.charAt( floor( rand() * ( random_char_length ) ) );
//            }
            if ( percent >= random_index[ i ] ) {

//                str += this._originalStr.charAt(i);
                str += origin_str.charAt(i);

            } else {
                if ( !is_keep ) {
                    if ( percent < random_index[ i ] / 3 ) {

                        str += empty_char;
                    } else {

//                str += this.sourceRandomCharacter.charAt( Math.floor( Math.random() * ( this.sourceRandomCharacter.length ) ) );
                        str += random_char.charAt( floor( rand() * ( random_char_length ) ) );
                    }
                } else {

                    if ( percent < random_index[ i ] / 3 ) {

                        str += origin_str.charAt(i);
                    } else {

                        str += random_char.charAt( floor( rand() * ( random_char_length ) ) );
                    }
                }
            }
        }

////        str = this._originalStr;
//        this._element.innerHTML = str;
//        this.onChange( str );
//
//        if ( percent > 1 ) {
//            // complete
////            clearInterval( this._intervalId );
////            this.isRunning = false;
//            this.stop();
//            this.onComplete();
//        }
//
////        else {
////
////            this._element.innerHTML = str;
////            this.onChange( str );
////        }

        this._element.innerHTML = str;
        this.onChange( str );

        if ( percent > 1 ) {

//            str = this._originalStr;
//            clearInterval( this._intervalId );
//            this.isRunning = false;
            this.stop( true );
            this.onComplete();

            return;
        }
    };

    /**
     * shuffle 終了 callback 関数, override して使用します
     * @method onComplete
     */
    p.onComplete = function () {

    };

    p.onChange = function ( str ) {

    };

//    /**
//     * @private
//     * @static
//     * @type {{create: Function}}
//     */
//    var Delegate = {
//        /**
//         * スコープを移譲した関数を作成します。
//         * @param {Function} func 実行したい関数
//         * @param {*} thisObj 移譲したいスコープ
//         * @return {Function} 移譲済みの関数
//         * @private
//         * @static
//         */
//        create:function ( func, thisObj ) {
//            var del = function () {
//                return func.apply( thisObj, arguments );
//            };
//            //情報は関数のプロパティとして定義する
//            del.func = func;
//            del.thisObj = thisObj;
//            return del;
//        }
//    };

    inazumatv.ShuffleText = ShuffleText;

}( this.inazumatv ) );