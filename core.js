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

var webide = {};
var require = function(name){
    return (window[name]) ? window[name]: function(){};
};

(function($){
    $.fn.extend({
        animateCss: function (animationName, cb) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                
                if(typeof cb == "function")
                    cb();
            });
        }
    });
    
    webide = {
        /**
         * Socket.io server
         * @type object
         */
        io: io(),
        
        /**
         * On load function
         * 
         * @param function fn
         * @return void
         */
        onload: function(fn){ 
            $(fn); 
        },
        
        /**
         * Function to include modules in WebIDE
         * 
         * @param string name
         * @param function fn
         * @param integer pointer
         * @return void
         */
        module: function(name, fn, pointer){
            if(typeof fn == "function"){
                if(fn.toString().length > 0){
                    var dependences = [];
                    var funcArgs = fn.toString().match(/function.*?[\s]\((.*?)\)/i)[1].toString().split(",");

                    for(var key in funcArgs){//Fix spaces
                        if(trim(funcArgs[key]))
                            dependences[key] = trim(funcArgs[key]);
                    }

                    if(dependences.length > 0){
                        var modules = [];

                        for(var key in dependences) 
                            if(this[dependences[key]])
                                modules.push(this[dependences[key]])

                        if(modules.length === dependences.length){
                            fn.apply(this, modules);
                        }
                        else{
                            if(!pointer)
                                pointer = 1;
                            
                            pointer++;
                            
                            if(pointer < 100)
                                setTimeout(function(name, fn, pointer){ webide.module(name, fn, pointer); }, 300, name, fn, pointer);
                            else
                                console.error("Could not load module", name);
                        }
                    }
                    else{
                        fn.apply(this, null);
                    }
                }
            }   
        },
        
        /**
         * Function to extend modules
         * 
         * @param string namespace
         * @param object obj
         * @return void
         */
        extends: function(namespace, obj){
            if(typeof namespace =="string" && typeof obj == "object"){
                this[namespace] = new Object(obj);
                
                for(var key in this)
                    if(typeof this[key] == "function" && key != "onload")
                        this[namespace][key] = this[key];
            }
        },
        
        /**
         * Function to get contents by XMLHttpRequest
         * 
         * @param string method (GET|POST|PUT|DELETE)
         * @param string url
         * @param object data
         * @param function cb
         * @return void
         */
        getContents: function(method, url, data, cb){
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){                   
                    if(typeof cb === "function")
                        cb(xhr.responseText);
                }
            }; 

            if(method === "POST"){
                var query = [];

                if(typeof data === "object"){
                    data.socket = webide.io.id;

                    for(var key in data)
                        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }

                xhr.open(method, url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(query.join('&'));
            }
            else{
                xhr.open(method, url, true);
                xhr.send();
            }   
        },
        
        /**
         * Function to get contents by XMLHttpRequest and return JSON 
         *  
         * @param string method (GET|POST|PUT|DELETE)
         * @param string url
         * @param object data
         * @param function cb
         * @return void
         */
        getContentsJSON: function(method, url, data, cb){
            webide.getContents(method, url, data, function(data){
                cb(JSON.parse(data));
            });
        },
        
        /**
         * Function to send data by XMLHttpRequest
         * 
         * @param string url
         * @param object data
         * @param function cb
         * @return void
         */
        send: function(url, data, cb){
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){                   
                    if(typeof cb === "function")
                        cb(xhr.responseText);
                }
            }; 

            var query = [];

            if(typeof data === "object"){
                data.socket = webide.io.id;

                for(var key in data)
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(query.join('&')); 
        },
        
        /**
         * Functio to send data by XMLHttpRequest in JSON format
         * 
         * @param string url
         * @param object data
         * @param function cb
         * @return void
         */
        sendJSON: function(url, data, cb){
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){                   
                    if(typeof cb === "function")
                        cb(JSON.parse(xhr.responseText));
                }
            }; 

            if(typeof data == "object")
                data.socket = webide.io.id;

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data)); 
        },
        
        /**
         * Function to create namespace by text
         * 
         * @param string e
         * @return string
         */
        createNamespace: function(e) {
            return e = removeAccents(e), e = e.replace(/(\r\n|\n|\r|\t)/gm, "").replace(":", ""), e = html_entity_decode(e), e = strip_tags(e), e = e.replace(/(,|\.|\(|\))/gim, ""), e = e.replace(/(\s|\/|\\)/gi, "-"), e = e.replace(/\u0000/g, ""), e = e.replace(/('|\")/g, ""), e.toLowerCase()
        }
    };
})(jQuery);