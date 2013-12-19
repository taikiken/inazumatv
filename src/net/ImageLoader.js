/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2013/12/13 - 17:17
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * require LoadManager, EventDispatcher, EventObject
 */
( function ( inazumatv ){
    "use strict";

    var EventObject = inazumatv.EventObject,
        EventDispatcher = inazumatv.EventDispatcher,
        LoadManager = inazumatv.LoadManager;

    /**
     * 画像ロードヘルパークラスです
     * @class ImageLoader
     * @param {Array} imageList [pathToImage,...]
     * @constructor
     */
    function ImageLoader ( imageList ) {
        /**
         * LoadManager instance
         * @type {LoadManager}
         * @private
         */
        this._manager = new LoadManager();
        /**
         * 画像パスリスト
         * @type {Array}
         * @private
         */
        this._imageList = imageList;
    }

    /**
     * @const COMPLETE
     * @type {string}
     * @static
     */
    ImageLoader.COMPLETE = "imageLoaderComplete";
    /**
     * @const COMPLETE
     * @type {string}
     * @static
     */
    ImageLoader.PROGRESS = "imageLoaderProgress";
    /**
     * @const ERROR
     * @type {string}
     * @static
     */
    ImageLoader.ERROR = "imageLoaderError";
    /**
     * @const Start
     * @type {string}
     * @static
     */
    ImageLoader.START = "imageLoaderStart";

    var p = ImageLoader.prototype;

    // mixin
    EventDispatcher.initialize( p );

    /**
     * 画像ロードを開始します
     */
    p.start = function (){
        var manager = this._manager,
            imageList = this._imageList,
            i, limit,
            _this = this
            ;

        for ( i = 0, limit = imageList.length; i < limit; i++ ) {

            var img = imageList[ i ];
            manager.add( img );
        }

        // progress
        manager.onProgress = function ( e ) {
            _this.dispatchEvent( new EventObject( ImageLoader.PROGRESS, e ), this );
        };

        // error
        manager.onError = function ( e ) {
            _this.dispatchEvent( new EventObject( ImageLoader.ERROR, e ), this );
        };

        // complete
        manager.onComplete = function ( e ) {
            _this.dispatchEvent( new EventObject( ImageLoader.COMPLETE, e ), this );
        };

        // start
        manager.start();
        _this.dispatchEvent( new EventObject( ImageLoader.START ), this );
    };

    inazumatv.ImageLoader = ImageLoader;

}( this.inazumatv ) );