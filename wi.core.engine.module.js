/**
 * Core engine module
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @license MIT
 */

module.exports = {    
    /**
     * List module assets
     * @type object
     */
    assets: {
        css: [__dirname + "/jquery.mCustomScrollbar.min.css",
              __dirname + "/wi.core.engine.style.css"],
        js: [__dirname + "/jquery-3.1.1.min.js", 
             __dirname + "/jquery.mCustomScrollbar.concat.min.js",
             __dirname + "/wi.core.engine.event.js"]
    }
}