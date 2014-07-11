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
    s.version = /*version*/"0.9.2"; // injected by build process

    /**
     * The build date for this release in UTC format.
     * @property buildDate
     * @type String
     * @static
     **/
    s.buildDate = /*date*/"Mon, 30 Jun 2014 08:33:35 GMT"; // injected by build process

})( this.inazumatv );
