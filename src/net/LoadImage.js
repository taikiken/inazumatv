/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/06/18 - 18:56
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window ){
    "use strict";
    var document = window.document,
        inazumatv = window.inazumatv,
        EventObject = inazumatv.EventObject,
        EventDispatcher = inazumatv.EventDispatcher;

    inazumatv.LoadImage = ( function (){
        /**
         * 画像を読み込みイベントを発火します
         * @class LoadImage
         * @uses EventDispatcher
         * @param {string} path
         * @constructor
         */
        function LoadImage ( path ) {
          /**
           * @property _path
           * @type {string}
           * @private
           */
          this._path = path;
        }

        /**
         * 画像読み込み完了イベント
         * @for LoadImage
         * @event COMPLETE
         * @static
         * @type {string}
         */
        LoadImage.COMPLETE = "load_image_complete";
        /**
         * 画像読み込みエラーイベント
         * @for LoadImage
         * @event ERROR
         * @static
         * @type {string}
         */
        LoadImage.ERROR = "load_image_error";

        var p = LoadImage.prototype;

        p.constructor = inazumatv.LoadImage;

        EventDispatcher.initialize( p );

        /**
         * 画像読み込みを開始します
         * @method load
         */
        p.load = function () {
            var path = this._path,
                img = new Image(),
                _this = this,
                modern = typeof document.addEventListener !== "undefined",
                done = false;

            function dispose () {
                if ( !modern && done ) {

                    return false;
                }

                if ( modern ) {
                    // modern browser
                    img.removeEventListener( "load", complete );
                    img.removeEventListener( "error", error );
                } else {
                    // legacy
                    img.detachEvent( "onload", complete );
                    img.detachEvent( "onerror", error );
                }

                return true;
            }

            function complete () {
                if ( !dispose() ) {

                    return;
                }

                _this.dispatchEvent( new EventObject( LoadImage.COMPLETE, [ img ] ), _this );
            }

            function error () {
                if ( !dispose() ) {

                    return;
                }

                _this.dispatchEvent( new EventObject( LoadImage.ERROR, [ img ] ), _this );
            }

            if ( modern ) {
                // modern browser
                img.addEventListener( "load", complete, false );
                img.addEventListener( "error", error, false );
            } else {
                // legacy
                img.attachEvent( "onload", complete );
                img.attachEvent( "onerror", error );
            }

            img.src = path;
        };

        return LoadImage;
    }() );
}( window ) );