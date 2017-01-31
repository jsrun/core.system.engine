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
    assetsCore: {
        css: [__dirname + "/node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css",
              __dirname + "/node_modules/tooltipster/dist/css/tooltipster.bundle.min.css",
              __dirname + "/jquery-ui-1.12.1.min.css"],
        js: [__dirname + "/node_modules/jquery/dist/jquery.min.js", 
             __dirname + "/jquery-ui-1.12.1.min.js", 
             __dirname + "/node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js",
             __dirname + "/node_modules/tooltipster/dist/js/tooltipster.bundle.min.js",
             __dirname + "/lodash.min.js",
             __dirname + "/lib.js",
             __dirname + "/core.js"]
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
    bootstrap: function(io, _){         
        io.on('connection', function(socket){ 
            if(!_.clients[socket.id]){
                _.clients[socket.id] = socket; 
                    
                socket.hasEvent = function(event){//Function to prevent the same event from being instantiated several times
                    try{ return (_._events[event]); }
                    catch(e){ return false; }
                };
                
                for(let key in _.events)
                    _.events[key](socket);
            }
        });
    }
};