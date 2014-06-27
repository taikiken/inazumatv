/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/06/18 - 21:07
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
    var inazumatv = window.inazumatv,
        LoadImage = inazumatv.LoadImage,
        EventObject = inazumatv.EventObject,
        EventDispatcher = inazumatv.EventDispatcher;

    inazumatv.BulkLoader = ( function (){
        /**
         * 複数画像を読み込みます
         * @class BulkLoader
         * @uses EventDispatcher
         * @param {Array} paths 画像パス配列
         * @constructor
         */
        function BulkLoader ( paths ) {
            this._paths = paths;
            this._connections = 6;
            this._boundLoad = this._load.bind( this );
            this._boundError = this._error.bind( this );
        }

        /**
         * 個別画像ロード完了時イベント
         * @const LOAD
         * @static
         * @type {string}
         */
        BulkLoader.LOAD = "bulk_loader_load";
        /**
         * 個別画像ロードエラー時イベント
         * @const ERROR
         * @static
         * @type {string}
         */
        BulkLoader.ERROR = "bulk_loader_error";
        /**
         * 全画像ロード完了時イベント
         * @const COMPLETE
         * @static
         * @type {string}
         */
        BulkLoader.COMPLETE = "bulk_loader_complete";

        var p = BulkLoader.prototype;

        p.constructor = inazumatv.BulkLoader;

        EventDispatcher.initialize( p );

        /**
         * 接続数を設定します
         * @method setConnections
         * @param {int} n
         */
        p.setConnections = function ( n ) {
            this._connections = n;
        };

        /**
         * 読み込みを開始します
         * @method start
         */
        p.start = function () {
            var paths = this._paths,

                limit = this._connections,
                count = 0;

            this._loading = 0;

            while( paths.length > 0 ) {
                if ( count >=  limit ) {
                    // connections limit
                    break;
                }

                this._next();
                ++count;
            }
        };

        /**
         * @method _done
         * @private
         */
        p._done = function () {
            // all done
            this.dispatchEvent( new EventObject( BulkLoader.COMPLETE ), this );
        };

        /**
         * @method _next
         * @private
         */
        p._next = function () {
            // next load
            var paths = this._paths,
                path = paths.shift();

            this._get( path );
        };

        /**
         * @method _dispose
         * @param {LoadImage} target
         * @private
         */
        p._dispose = function ( target ) {

            target.removeEventListener( LoadImage.COMPLETE, this._boundLoad );
            target.removeEventListener( LoadImage.ERROR, this._boundError );
        };

        /**
         * @method _load
         * @param {EventObject} e
         * @private
         */
        p._load = function ( e ) {
            this._dispose( e.target );

            this.dispatchEvent( new EventObject( BulkLoader.LOAD, e.params ) );

            this._check();
        };

        /**
         * @method _error
         * @param {EventObject} e
         * @private
         */
        p._error = function ( e ) {
            this._dispose( e.target );

            this.dispatchEvent( new EventObject( BulkLoader.ERROR, e.params ) );

            this._check();
        };

        /**
         * @method _check
         * @private
         */
        p._check = function () {
            var paths = this._paths;



            --this._loading;

            if ( this._loading <= 0 ) {

                if ( paths.length > 0 ) {
                    // next image
                    this._next();
                } else {
                    // all done
                    this._done();
                }
            }
        };

        /**
         * @method _get
         * @param {string} path
         * @private
         */
        p._get = function ( path ) {
            var loader;

            loader = new LoadImage( path );
            loader.addEventListener( LoadImage.COMPLETE, this._boundLoad );
            loader.addEventListener( LoadImage.ERROR, this._boundError );

            ++this._loading;
            loader.load();
        };

        return BulkLoader;
    }() );

}( window ) );