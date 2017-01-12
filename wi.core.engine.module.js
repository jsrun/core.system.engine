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
        css: [__dirname + "/jquery.mCustomScrollbar.min.css",
              __dirname + "/wi.core.engine.style.css"],
        js: [__dirname + "/jquery-3.1.1.min.js", 
             __dirname + "/jquery.mCustomScrollbar.concat.min.js",
             __dirname + "/draggabilly.pkgd.min.js",
             __dirname + "/wi.core.engine.event.js"]
    }
};