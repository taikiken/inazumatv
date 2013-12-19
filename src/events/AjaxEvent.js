/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
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

    inazumatv.EventDispatcher.initialize( p );


    inazumatv.AjaxEvent = AjaxEvent;

}( this.inazumatv ) );