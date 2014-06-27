/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 18:40
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

( function ( inazumatv ){
    "use strict";

    var LoopManager = inazumatv.LoopManager,
        EventDispatcher = inazumatv.EventDispatcher,
        EventObject = inazumatv.EventObject;

    /**
     * FPSを管理します
     *
     *      // 1.auto
     *      var fps24 = new FPSManager( 24 );
     *
     *      function eventHandler () {
     *          // do something
     *      }
     *      fps24.addEventListener( FPSManager.FPS_FRAME, eventHandler );
     *      fps24.start();
     *
     *      // 2.manual
     *      var fps24 = new FPSManager( 24, true );
     *
     *      function eventHandler () {
     *      }
     *      fps24.addEventListener( FPSManager.FPS_FRAME, eventHandler );
     *
     *      function loop () {
     *          requestAnimationFrame( loop );
     *          if ( fps24.update() ) {
     *              // do something
     *          }
     *      }
     *
     *      loop();
     *      ps24.start();
     *
     * @class FPSManager
     * @uses EventDispatcher
     * @param {int} fps frame rate 指定（整数）
     * @param {Boolean} [manual] abort auto start, default: false
     * @constructor
     */
    function FPSManager ( fps, manual ) {
        this.setFPS( fps );
        this._manualStart = !!manual;
        this._eventObj = new EventObject( FPSManager.FPS_FRAME, [] );
        this._loop = LoopManager.getInstance();
        this._boundEnterFrame = this._onEnterFrame.bind( this );
    }

    /**
     * event type
     * @const FPS_FRAME
     * @type {string}
     * @static
     */
    FPSManager.FPS_FRAME = "fpsManagerFpsFrame";

    var p = FPSManager.prototype;

    p.constructor = inazumatv.FPSManager;

    // mixin
    EventDispatcher.initialize( p );

    /**
     * @method getLoopManager
     * @return {LoopManager} LoopManager instance
     */
    p.getLoopManager = function (){
        return this._loop;
    };

    /**
     * _startTime を初期化します
     * @method _resetTime
     * @private
     */
    p._resetTime = function () {
        this._startTime = new Date().getTime();
    };

    /**
     * FPS監視を開始します
     * @method start
     */
    p.start = function (){
        if ( !this._manualStart ) {
            // no manual
            this.setFPS( this._fps );
            this._loop.addEventListener( LoopManager.ENTER_FRAME, this._boundEnterFrame );
            this._loop.start();
        }

        this._resetTime();
    };

    /**
     * FPS監視を停止します
     * @method stop
     */
    p.stop = function (){
        if ( !this._manualStart ) {
            // no manual
            this._loop.removeEventListener( LoopManager.ENTER_FRAME, this._boundEnterFrame );
        }
        this._polling = Number.MAX_VALUE;
    };

    /**
     * FPS監視を復活します
     * @method restore
     */
    p.restore = function (){
        this.changeFPS( this._fps );
    };

    /**
     * update 関数を破棄します
     * @method destroy
     */
    p.destroy = function (){
        this.update = function (){};
    };

    /**
     * FPS値を設定します
     * @method setFPS
     * @param {int} fps frame rate 指定（整数）
     */
    p.setFPS = function ( fps ){
        this._startTime = 0;
        this._polling = 1000 / fps;
        this._fps = fps;
    };

    /**
     * FPS値を変更します
     * @method changeFPS
     * @param {int} fps frame rate 指定（整数）
     */
    p.changeFPS = function ( fps ){
        this.setFPS( fps );
//        this.start();
        this._resetTime();
    };

    /**
     * @method getFPS
     * @return {int|*} 現在のFPSを返します
     */
    p.getFPS = function (){
        return this._fps;
    };

    /**
     * @method update
     * @return {boolean} FPSに達した場合はtrueを返します
     */
    p.update = function (){
        var now = new Date().getTime(),
            bool = false,
            _this = this;

        if ( ( now - _this._startTime ) >= _this._polling ) {

            _this._startTime = now;
            bool = true;

            setTimeout( function (){
                _this.dispatchEvent( _this._eventObj );
            }, 0 );
        }

        return bool;
    };

    /**
     * loop ENTER_FRAME Event Handler
     * @method _onEnterFrame
     * @private
     */
    p._onEnterFrame = function (){
        this.update();
    };

    inazumatv.FPSManager = FPSManager;

}( this.inazumatv ) );