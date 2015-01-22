/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/17 - 12:17
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
    var _height = 0,
        _width = 0,
        _$window,
        _instance,
        _fps,
        _isStart = false,

        EventObject = inazumatv.EventObject,
        EventDispatcher = inazumatv.EventDispatcher,
        FPSManager = inazumatv.FPSManager,
        /**
         * jQuery alias
         * @property $
         * @type {jQuery}
         * @private
         * @static
         */
        $
    ;

    // @class WatchWindowSize
    /**
     * @class WatchWindowSize
     * @uses EventDispatcher
     * @return {WatchWindowSize} WatchWindowSize instance
     * @constructor
     * @singleton
     */
    function WatchWindowSize () {

        if ( typeof _instance !== "undefined" ) {

            return _instance;
        }

        _fps = new FPSManager( 24 );

        _instance = this;
        return _instance;
    }

    /**
     * WatchWindowSize へ jQuery object を設定。WatchWindowSize を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    WatchWindowSize.activate = function ( jQuery ){
        $ = jQuery;
        _$window = $( window );
    };

    /**
     * @method getInstance
     * @return {WatchDocumentHeight}
     * @static
     */
    WatchWindowSize.getInstance = function (){
        if ( typeof _instance === "undefined" ) {

            _instance = new WatchWindowSize();
        }

        return _instance;
    };

    /**
     * window width change Event
     * @event RESIZE_WIDTH
     * @type {string}
     * @static
     */
    WatchWindowSize.RESIZE_WIDTH = "watchWindowSizeResizeWidth";
    /**
     * window height change Event
     * @event RESIZE_HEIGHT
     * @type {string}
     * @static
     */
    WatchWindowSize.RESIZE_HEIGHT = "watchWindowSizeResizeHeight";
    /**
     * window width or height change Event
     * @event RESIZE
     * @type {string}
     * @static
     */
    WatchWindowSize.RESIZE = "watchWindowSizeResize";

    var p = WatchWindowSize.prototype;

    p.constructor = inazumatv.WatchWindowSize;

    EventDispatcher.initialize( p );

    /**
     * FPSManager instance を取得します
     * @method getFPSManager
     * @return {FPSManager} FPSManager instance を返します
     */
    p.getFPSManager = function (){
        return this._fps;
    };

    /**
     * window size を監視し変更があるとイベントを発生させます。
     * @param {boolean=false} [strong] 強制的にイベントを発生させる default: false
     * @return {boolean} true: window size 変更あり
     */
    p.update = function ( strong ){
        var w = _$window.width(),
            h = _$window.height(),

            isWidthChange = w !== _width,
            isHeightChange = h !== _height,
            isChange = isWidthChange || isHeightChange,

            params = {
                strong: strong,
                width: w,
                height: h
            }
            ;

        _width = w;
        _height = h;

        if ( strong ) {
            // width
            _instance.dispatchEvent( new EventObject( WatchWindowSize.RESIZE_WIDTH, params ), _instance );
            // height
            _instance.dispatchEvent( new EventObject( WatchWindowSize.RESIZE_HEIGHT, params ), _instance );
            // both
            _instance.dispatchEvent( new EventObject( WatchWindowSize.RESIZE, params ), _instance );
        } else if ( isChange ) {
            // both
            _instance.dispatchEvent( new EventObject( WatchWindowSize.RESIZE, params ), _instance );
        } else if ( isWidthChange ) {
            // width
            _instance.dispatchEvent( new EventObject( WatchWindowSize.RESIZE_WIDTH, params ), _instance );
        } else if ( isHeightChange ) {
            // height
            _instance.dispatchEvent( new EventObject( WatchWindowSize.RESIZE_HEIGHT, params ), _instance );
        }

        return isChange;
    };

    /**
     * 強制的にEventを発火
     * @method fire
     */
    p.fire = function (){
        this.update( true );
    };

    /**
     * 監視を開始します
     * @method start
     */
    p.start = function (){
        this.fire();

        if ( !_isStart ) {
            _fps.addEventListener( FPSManager.FPS_FRAME, _instance._onEnterFrame );
            _fps.start();
            _isStart = true;
        }
    };

    /**
     * 監視を止めます
     * @method stop
     */
    p.stop = function (){
        _fps.removeEventListener( FPSManager.FPS_FRAME, _instance._onEnterFrame );
        _fps.stop();
        _isStart = false;
    };

    /**
     * FPSManager.ENTER_FRAME Event Handler<br>
     * default 24fps
     *
     * @method _onEnterFrame
     * @private
     */
    p._onEnterFrame = function (){
        _instance.update();
    };

    inazumatv.jq.WatchWindowSize = WatchWindowSize;

}( this.inazumatv ) );