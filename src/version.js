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
    s.version = /*version*/"0.9.12"; // injected by build process

    /**
     * The build date for this release in UTC format.
     * @property buildDate
     * @type String
     * @static
     **/
    s.buildDate = /*date*/"Wed, 18 Feb 2015 06:40:37 GMT"; // injected by build process

})( this.inazumatv );
