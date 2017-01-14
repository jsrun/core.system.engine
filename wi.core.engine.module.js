/**
 *  __          __  _    _____ _____  ______ 
 *  \ \        / / | |  |_   _|  __ \|  ____|
 *   \ \  /\  / /__| |__  | | | |  | | |__   
 *    \ \/  \/ / _ \ '_ \ | | | |  | |  __|  
 *     \  /\  /  __/ |_) || |_| |__| | |____ 
 *      \/  \/ \___|_.__/_____|_____/|______|
 *                                                                            
 *  @author André Ferreira <andrehrf@gmail.com>
 *  @license MIT
 */

"use strict";

module.exports = {    
    /**
     * List module assets
     * @type object
     */
    assets: {
        css: [__dirname + "/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css",
              __dirname + "/tooltipster/dist/css/tooltipster.bundle.min.css",
              __dirname + "/jquery-ui-1.12.1.min.css",
              __dirname + "/wi.core.engine.style.css"],
        js: [__dirname + "/jquery-3.1.1.min.js", 
             __dirname + "/jquery-ui-1.12.1.min.js", 
             __dirname + "/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js",
             __dirname + "/tooltipster/dist/js/tooltipster.bundle.min.js",
             __dirname + "/draggabilly/dist/draggabilly.pkgd.min.js",
             __dirname + "/wi.core.engine.event.js"]
    }
};