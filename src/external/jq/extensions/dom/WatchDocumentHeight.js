/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/15 - 18:28
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
    var _prevHeight = 0,
        _$watchTarget,
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

    /**
     * @class WatchDocumentHeight
     * @returns {WatchDocumentHeight}
     * @constructor
     */
    function WatchDocumentHeight () {
        if ( typeof _instance !== "undefined" ) {

            return _instance;
        }

        _fps = new FPSManager( 24 );

        _instance = this;
        return _instance;
    }

    /**
     * WatchDocumentHeight へ jQuery object を設定。WatchDocumentHeight を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    WatchDocumentHeight.activate = function ( jQuery ){
        $ = jQuery;
        var $document = $( document ),
            $window = $( window );

        if ( $window.height() > $document.height() ) {
            _$watchTarget = $window;
        } else {
            _$watchTarget = $document;
        }
    };

    /**
     * @method getInstance
     * @returns {WatchDocumentHeight}
     * @static
     */
    WatchDocumentHeight.getInstance = function (){
        if ( typeof _instance === "undefined" ) {

            _instance = new WatchDocumentHeight();
        }

        return _instance;
    };

    /**
     * document height change event
     * @const RESIZE_HEIGHT
     * @type {string}
     * @static
     */
    WatchDocumentHeight.RESIZE = "watchDocumentResizeHeight";

    var p = WatchDocumentHeight.prototype;

    /**
     * Adds the specified event listener.
     * @method addEventListener
     * @param {String} type The string type of the event.
     * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
     * the event is dispatched.
     * @return {Function | Object} Returns the listener for chaining or assignment.
     **/
    p.addEventListener = function ( type, listener ){};
    /**
     * Removes the specified event listener.
     * @method removeEventListener
     * @param {String} type The string type of the event.
     * @param {Function | Object} listener The listener function or object.
     **/
    p.removeEventListener = function (type, listener){};
    /**
     * Removes all listeners for the specified type, or all listeners of all types.
     * @method removeAllEventListeners
     * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
     **/
    p.removeAllEventListeners = function (type){};
    /**
     * Indicates whether there is at least one listener for the specified event type.
     * @method hasEventListener
     * @param {String} type The string type of the event.
     * @return {Boolean} Returns true if there is at least one listener for the specified event.
     **/
    p.hasEventListener = function (type){};
    /**
     * Dispatches the specified event.
     * @method dispatchEvent
     * @param {Object | String} eventObj An object with a "type" property, or a string type. If a string is used,
     * dispatchEvent will construct a generic event object with "type" and "params" properties.
     * @param {Object} [target] The object to use as the target property of the event object. This will default to the
     * dispatching object.
     * @return {Boolean} Returns true if any listener returned true.
     **/
    p.dispatchEvent = function (eventObj, target){};

    EventDispatcher.initialize( p );

    /**
     * FPSManager instance を取得します
     * @method getFPSManager
     * @returns {FPSManager} FPSManager instance を返します
     */
    p.getFPSManager = function (){
        return this._fps;
    };

    /**
     * フレーム毎に呼び出されます。<br>
     * 高さが変更されると WatchDocumentHeight.RESIZE を dispatchEvent し true を返します。
     *
     * @method update
     * @param {boolean} [strong] default false
     * @returns {boolean} true: 高さ変更
     */
    p.update = function ( strong ){
        var h = _$watchTarget.height(),
            isChange = h !== _prevHeight,

            params = {
                strong: strong,
                height: h
            }
        ;

        _prevHeight = h;
        if ( isChange || strong ) {
            // height
            _instance.dispatchEvent( new EventObject( WatchDocumentHeight.RESIZE, params ), _instance );
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

    inazumatv.jq.WatchDocumentHeight = WatchDocumentHeight;
}( this.inazumatv ) );