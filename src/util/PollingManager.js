/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2013/12/13 - 17:42
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

    var EventDispatcher = inazumatv.EventDispatcher,
        EventObject = inazumatv.EventObject;

    /**
     * 経過時間を管理します
     * <h4>Example</h4>
     * [1]
     * update()の戻り値で判定
     * <br>
     * make instance
     *
     *      var polling1 = new PollingManager( 1000 );
     *      polling1.start();
     *
     * check inside some loop function
     *
     *      function loop () {
     *         requestAnimationFrame( loop );
     *         if ( polling1.update() ) {
     *           // after 1 sec.
     *           // do something
     *         }
     *      }
     *
     *      loop();
     *
     * [2]
     * addEventListener を使う別の方法
     * <br>
     * make instance
     *
     *      var polling1 = new PollingManager( 1000 );
     *      polling1.start();
     *
     *
     * check inside some loop function
     *
     *      function eventHandler () {
     *           // after 1 sec.
     *           // do something
     *      }
     *      polling1.addEventListener( PollingManager.POLLING_PAST, eventHandler );
     *      function loop () {
     *           requestAnimationFrame( loop );
     *           polling1.update()
     *      }
     *
     *      loop();
     *
     * @class PollingManager
     * @param {Number} ms milliseconds 指定
     * @constructor
     */
    function PollingManager ( ms ) {
        this._startTime = 0;
        this._polling = ms;
        this._eventObj = new EventObject( PollingManager.POLLING_PAST );
    }

    /**
     * event type
     * @const POLLING_PAST
     * @type {string}
     * @static
     */
    PollingManager.POLLING_PAST = "pollingManagerPollingPast";

    var p = PollingManager.prototype;

    // mixin
    EventDispatcher.initialize( p );

    /**
     * pollingを開始します
     * @method start
     */
    p.start = function (){
        this._startTime = new Date().getTime();
    };

    /**
     * polling間隔を変更します
     * @method change
     * @param {Number} ms milliseconds 指定
     */
    p.change = function ( ms ){
        this._startTime = 0;
        this._polling = ms;
        this.start();
    };

    /**
     * @method update
     * @returns {boolean} pollingに達した場合はtrueを返します
     */
    p.update = function (){
        var now = new Date().getTime(),
            bool = false,
            _this = this;

        if ( ( now - this._startTime ) >= this._polling ) {

            this._startTime = now;
            bool = true;

            setTimeout( function (){
                _this.dispatchEvent( _this._eventObj );
            }, 0 );
        }

        return bool;
    };

    /**
     * update 関数を破棄します
     * @method destroy
     */
    p.destroy = function (){
        this.update = function (){};
    };

    inazumatv.PollingManager = PollingManager;

}( this.inazumatv ) );