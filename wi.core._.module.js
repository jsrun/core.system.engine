/**
 *  __          __  _    _____ _____  ______     
 *  \ \        / / | |  |_   _|  __ \|  ____|    
 *   \ \  /\  / /__| |__  | | | |  | | |__       
 *    \ \/  \/ / _ \ '_ \ | | | |  | |  __|      
 *     \  /\  /  __/ |_) || |_| |__| | |____     
 *      \/  \/ \___|_.__/_____|_____/|______|    
 *                                        ______ 
 *                                       |______|
 *                                                                            
 *  @author André Ferreira <andrehrf@gmail.com>
 *  @license MIT
 */

"use strict";

module.exports = {  
    /**
     * List of clients in socket.io
     * @type object
     */
    clients: {},
    
    /**
     * List of events to socket.io
     * @type array
     */
    events: [],
    
    /**
     * List module assets
     * @type object
     */
    assets: {
        css: [__dirname + "/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css",
              __dirname + "/tooltipster/dist/css/tooltipster.bundle.min.css",
              __dirname + "/jquery-ui-1.12.1.min.css",
              __dirname + "/wi.core._.style.css"],
        js: [__dirname + "/jquery-3.1.1.min.js", 
             __dirname + "/jquery-ui-1.12.1.min.js", 
             __dirname + "/lodash-4.17.4.min.js",
             __dirname + "/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js",
             __dirname + "/tooltipster/dist/js/tooltipster.bundle.min.js",
             __dirname + "/draggabilly/dist/draggabilly.pkgd.min.js",
             __dirname + "/wi.core._.event.js"]
    },
    
    /**
     * Function to configure new events to sockets
     * 
     * @param function fn
     * @return void
     */
    setSocketsEvents: function(fn){
        for(let key in this.clients)
            if(typeof fn == "function")
                fn(this.clients[key]);
        
        if(typeof fn == "function")
            this.events.push(fn);
    },
    
    /**
     * Function to get a socket object
     * 
     * @param string id
     * @return object|null
     */
    getSocket: function(id){
        try{ return (this.clients[id]) ? this.clients[id] : null; } catch(e) { return null; }
    },
    
    /**
     * Module startup function
     * 
     * @param object app
     * @return this
     */
    bootstrap: function(_this){ 
        var __this = this; 
        
        _this.io.on('connection', function(socket){ 
            if(!__this.clients[socket.id]){
                __this.clients[socket.id] = socket; 
                
                //Function to prevent the same event from being instantiated several times
                socket.hasEvent = function(event){
                    try{ return (this._events[event]); }
                    catch(e){ return false; }
                };
                
                for(let key in __this.events)
                    __this.events[key](socket);
            }
        });
    }
};