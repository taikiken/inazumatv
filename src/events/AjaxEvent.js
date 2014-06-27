/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/15 - 2:55
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

    /**
     * Ajax access Event, EventDispatcher mixin
     *
     * addEventListener
     * removeEventListener
     * removeAllEventListeners
     * hasEventListener
     * dispatchEvent
     *
     * @class AjaxEvent
     * @uses EventDispatcher
     * @constructor
     * @static
     */
    function AjaxEvent () {}

    /**
     * @const COMPLETE
     * @type {string}
     * @static
     */
    AjaxEvent.COMPLETE = "ajaxEventComplete";

    /**
     * @const ERROR
     * @type {string}
     * @static
     */
    AjaxEvent.ERROR = "ajaxEventERROR";

    var p = AjaxEvent.prototype;

    p.constructor = AjaxEvent;

    inazumatv.EventDispatcher.initialize( p );

    inazumatv.AjaxEvent = AjaxEvent;

}( this.inazumatv ) );