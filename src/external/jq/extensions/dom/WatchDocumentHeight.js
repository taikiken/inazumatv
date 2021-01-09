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
( function( window, inazumatv ) {
  'use strict';
  var
    document = window.document,
    /**
       * @property _prevHeight
       * @type {number}
       * @private
       */
    _prevHeight = 0,
    // _$watchTarget,
    _instance,
    /**
       * FPSManager instance, default frame rate is 24.
       * @property _fps
       * @type {FPSManager}
       * @static
       * @private
       */
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
    $,
    _max = Math.max;

  /**
     * @class WatchDocumentHeight
     * @uses EventDispatcher
     * @return {WatchDocumentHeight}
     * @constructor
     */
  function WatchDocumentHeight() {
    if ( typeof _instance !== 'undefined' ) {

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
  WatchDocumentHeight.activate = function( jQuery ) {
    $ = jQuery;
    var $document = $( document.body ),
      $window = $( window );

    this._$document = $document;
    this._$window = $window;

    // if ( $window.height() > $document.height() ) {
    //    _$watchTarget = $window;
    //} else {
    //    _$watchTarget = $document;
    //}
  };

  /**
     * @method getInstance
     * @uses EventDispatcher
     * @return {WatchDocumentHeight}
     * @static
     */
  WatchDocumentHeight.getInstance = function() {
    if ( typeof _instance === 'undefined' ) {

      _instance = new WatchDocumentHeight();
    }

    return _instance;
  };

  /**
     * document height change event
     * @event RESIZE_HEIGHT
     * @type {string}
     * @static
     */
  WatchDocumentHeight.RESIZE = 'watchDocumentResizeHeight';

  var p = WatchDocumentHeight.prototype;

  p.constructor = inazumatv.WatchDocumentHeight;

  EventDispatcher.initialize( p );

  /**
     * FPSManager instance を取得します
     * @method getFPSManager
     * @return {FPSManager} FPSManager instance を返します
     */
  p.getFPSManager = function() {
    return this._fps;
  };

  /**
     * フレーム毎に呼び出されます。<br>
     * 高さが変更されると WatchDocumentHeight.RESIZE を dispatchEvent し true を返します。
     *
     * @method update
     * @param {boolean} [strong] default false
     * @return {boolean} true: 高さ変更
     */
  p.update = function( strong ) {
    var
      $window = this._$window,
      $document = this._$document,
      h,
      isChange,
      params;

    // if ( $window.height() > $document.height() ) {
    //    _$watchTarget = $window;
    //} else {
    //    _$watchTarget = $document;
    //}
    //
    // h = _$watchTarget.height();
    h = _max( $window.height(), $document.height() );
    isChange = h !== _prevHeight;

    params = {
      strong: strong,
      height: h
    };

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
  p.fire = function() {
    this.update( true );
  };

  /**
     * 監視を開始します
     * @method start
     */
  p.start = function() {
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
  p.stop = function() {
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
  p._onEnterFrame = function() {
    _instance.update();
  };

  inazumatv.jq.WatchDocumentHeight = WatchDocumentHeight;
}( window, window.inazumatv ) );
