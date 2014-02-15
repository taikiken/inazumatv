/**
 * @module inazumatv
 */
(function( inazumatv ) {
    "use strict";

    /**
     * Static class holding library specific information such as the version and buildDate of
     * the library.
     * @class inazumatv
     **/
    var s = inazumatv.build = inazumatv.build || {};

    /**
     * The version string for this release.
     * @property version
     * @type String
     * @static
     **/
    s.version = /*version*/"0.8.13"; // injected by build process

    /**
     * The build date for this release in UTC format.
     * @property buildDate
     * @type String
     * @static
     **/
    s.buildDate = /*date*/"Sat, 15 Feb 2014 12:20:04 GMT"; // injected by build process

})( this.inazumatv );
