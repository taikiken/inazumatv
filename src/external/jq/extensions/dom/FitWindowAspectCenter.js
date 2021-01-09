/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/17 - 14:10
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function( inazumatv ) {
  'use strict';
  var
    isNumeric = inazumatv.isNumeric,
    _int = parseInt,
    _ceil = Math.ceil,
    _max = Math.max,
    WatchWindowSize,
    /**
       * jQuery alias
       * @property $
       * @type {jQuery}
       * @private
       * @static
       */
    $;

  /**
     * window幅に比率を保ち拡大縮小し、常に中央を表示します。
     *
     * @class FitWindowAspectCenter
     * @param {jQuery} $element jQuery object, 対象エレメント
     * @param {Number} [minWidth] default 0
     * @param {Number} [minHeight] default 0
     * @constructor
     */
  function FitWindowAspectCenter( $element, minWidth, minHeight ) {
    if ( !isNumeric( minWidth ) ) {
      minWidth = 0;
    }
    if ( !isNumeric( minHeight ) ) {
      minHeight = 0;
    }
    /**
         * @property _watch
         * @type {WatchDocumentHeight}
         * @private
         */
    this._watch = WatchWindowSize.getInstance();
    /**
         * @property _$element
         * @type {jQuery}
         * @private
         */
    this._$element = $element;
    /**
         * @property _minWidth
         * @type {Number}
         * @private
         */
    this._minWidth = minWidth;
    /**
         * @property _minHeight
         * @type {Number}
         * @private
         */
    this._minHeight = minHeight;
    /**
         * @property _elementWidth
         * @type {Number}
         * @private
         */
    this._elementWidth = _int( $element.width(), 10 );
    /**
         * @property _elementHeight
         * @type {Number}
         * @private
         */
    this._elementHeight = _int( $element.height(), 10 );
    /**
         * @property _boundOnResize
         * @type {function(this:FitWindowAspectCenter)|*}
         * @private
         */
    this._boundOnResize = this._onResize.bind( this );
  }

  /**
     * FitWindowAspectCenter へ jQuery object を設定。FitWindowAspectCenter を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
  FitWindowAspectCenter.activate = function( jQuery ) {
    $ = jQuery;
    WatchWindowSize = inazumatv.jq.WatchWindowSize;
    WatchWindowSize.activate( jQuery );
  };

  var p = FitWindowAspectCenter.prototype;

  p.constructor = FitWindowAspectCenter;

  /**
     * @deprecated
     * @method getWatchWindowSize
     * @return {WatchWindowSize} WatchWindowSize instance
     */
  p.getWatchWindowSize = function() {
    // return this._watch;
    console.warn( 'deprecated, use watch()' );
    return this.watch();
  };

  /**
     * @method watch
     * @return {WatchDocumentHeight|*|FitWindowAspectCenter._watch}
     */
  p.watch = function() {

    return this._watch;
  };

  /**
     * 監視を開始します
     * @method listen
     * @return {FitWindowAspectCenter}
     */
  p.listen = function() {
    var watch = this._watch;
    // this._boundOnResize = this._onResize.bind( this );
    watch.addEventListener( WatchWindowSize.RESIZE, this._boundOnResize );
    watch.start();

    return this;
  };

  /**
     * 監視を止めます
     * @method abort
     * @return {FitWindowAspectCenter}
     */
  p.abort = function() {
    this._watch.removeEventListener( WatchWindowSize.RESIZE, this._boundOnResize );

    return this;
  };

  /**
     * @method setElementWidth
     * @param {Number} w DOMElement width
     * @return {FitWindowAspectCenter}
     */
  p.setElementWidth = function( w ) {
    if ( isNumeric( w ) ) {
      this._elementWidth = w;
    }

    return this;
  };

  /**
     * @method setElementHeight
     * @param {Number} h DOMElement height
     * @return {FitWindowAspectCenter}
     */
  p.setElementHeight = function( h ) {
    if ( isNumeric( h ) ) {
      this._elementHeight = h;
    }

    return this;
  };

  /**
     * @method setMinHeight
     * @param {Number} h Minimum height
     * @return {FitWindowAspectCenter}
     */
  p.setMinHeight = function( h ) {
    if ( isNumeric( h ) ) {
      this._minHeight = h;
    }

    return this;
  };

  /**
     * @method setMinWidth
     * @param {Number} w Minimum width
     * @return {FitWindowAspectCenter}
     */
  p.setMinWidth = function( w ) {
    if ( isNumeric( w ) ) {
      this._elementWidth = w;
    }

    return this;
  };

  /**
     * Event Handler, Window width or height resize
     * @method _onResize
     * @param {EventObject} eventObject
     * @protected
     */
  p._onResize = function( eventObject ) {
    var
      ew = this._elementWidth,
      eh = this._elementHeight,
      params = eventObject.params[ 0 ],
      window_w = Math.ceil( params.width ),
      window_h = Math.ceil( params.height ),
      w,
      h,
      aspect_w,
      aspect_h,
      aspect,
      after_w, after_h, sub_w, sub_h;

    w = _max( window_w, this._minWidth );
    h = _max( window_h, this._minHeight );
    aspect_w = w / ew;
    aspect_h = h / eh;
    aspect = _max( aspect_w, aspect_h );

    // 計算後のwidth, height
    after_w = _ceil( ew * aspect );
    after_h = _ceil( eh * aspect );
    sub_w = (window_w - after_w) * 0.5;
    sub_h = (window_h - after_h) * 0.5;

    // this._$element.width( after_w ).height( after_h ).css( { left: sub_w + "px", top: sub_h + "px" } );
    this._$element.css( { width: after_w + 'px', height: after_h + 'px', left: sub_w + 'px', top: sub_h + 'px' } );
  };

  inazumatv.jq.FitWindowAspectCenter = FitWindowAspectCenter;

}( this.inazumatv ) );
