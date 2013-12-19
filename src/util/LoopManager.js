/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2013/12/13 - 19:11
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * require EventDispatcher, EventObject
 */

( function ( window, inazumatv ){
    "use strict";

    var requestAnimationFrame = window.requestAnimationFrame,
        cancelRequestAnimationFrame = window.cancelRequestAnimationFrame,

        EventDispatcher = inazumatv.EventDispatcher,
        EventObject = inazumatv.EventObject;

    // ---------------------------------------------------
    //  LoopManager
    // ---------------------------------------------------
    var _instanceLoopManager,
        _eventObj,
        _loopId,
        _this;

    /**
     * ループ処理内部関数
     * @for LoopManager
     * @method _loop
     * @private
     */
    function _loop () {
        _loopId = requestAnimationFrame( _loop );
        _instanceLoopManager.dispatchEvent( _eventObj, _this );
    }

    /**
     * Browser default loop(60fps) 毎に dispatchEvent します
     *
     *      var loopInstance =  LoopManager.getInstance();
     *
     *      function onEnterFrame () {
     *          // do something
     *      }
     *
     *      loopInstance.addEventListener( LoopManager.ENTER_FRAME, onEnterFrame );
     *
     * @class LoopManager
     * @returns {LoopManager} LoopManager instance
     * @constructor
     */
    function LoopManager () {
        if ( typeof _instanceLoopManager !== "undefined" ) {

            return _instanceLoopManager;
        }

        _this = this;
        this._started = false;
        _eventObj = new EventObject( LoopManager.ENTER_FRAME, [] );

        _instanceLoopManager = this;
        return _instanceLoopManager;
    }

    /**
     * @static
     * @method getInstance
     * @returns {LoopManager} LoopManager instance
     */
    LoopManager.getInstance = function (){
        if ( typeof _instanceLoopManager === "undefined" ) {

            _instanceLoopManager = new LoopManager();
        }

        return _instanceLoopManager;
    };

    /**
     * event type
     * @const ENTER_FRAME
     * @type {string}
     * @static
     */
    LoopManager.ENTER_FRAME = "loopManagerEnterFrame";

    var p = LoopManager.prototype;

    EventDispatcher.initialize( p );

    /**
     * ループ処理を開始します
     * @method start
     */
    p.start = function (){
        if ( !this._started ) {

            _loop();
            this._started = true;
        }
    };

    /**
     * ループ処理を停止します
     * @method stop
     */
    p.stop = function (){
        cancelRequestAnimationFrame( _loopId );
        this._started = false;
    };

    inazumatv.LoopManager = LoopManager;

}( window.self, this.inazumatv ) );