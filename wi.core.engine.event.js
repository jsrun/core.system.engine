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

(function(){
    /**
     * Function to get contents by XMLHttpRequest
     * 
     * @param string method (GET|POST|PUT|DELETE)
     * @param string url
     * @param object data
     * @param function cb
     * @return void
     */
    webide.getContents = function(method, url, data, cb){
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){                   
                if(typeof cb === "function")
                    cb(xhr.responseText);
            }
        }; 

        if(method === "POST"){
            var query = [];

            if(typeof data === "object")
                for(var key in data)
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));

            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(query.join('&'));
        }
        else{
            xhr.open(method, url, true);
            xhr.send();
        }   
    };
    
    /**
     * Function to get contents by XMLHttpRequest and return JSON 
     *  
     * @param string method (GET|POST|PUT|DELETE)
     * @param string url
     * @param object data
     * @param function cb
     * @return void
     */
    webide.getContentsJSON = function(method, url, data, cb){
        webide.getContents(method, url, data, function(data){
            cb(JSON.parse(data));
        });
    };
    
    /**
     * Function to send data by XMLHttpRequest
     * 
     * @param string url
     * @param object data
     * @param function cb
     * @return void
     */
    webide.send = function(url, data, cb){
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){                   
                if(typeof cb === "function")
                    cb(xhr.responseText);
            }
        }; 
        
        var query = [];

        if(typeof data === "object")
            for(var key in data)
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(query.join('&')); 
    },
    
    /**
     * Function to create namespace by text
     * 
     * @param string e
     * @return string
     */
    webide.createNamespace = function(e) {
        return e = removeAccents(e), e = e.replace(/(\r\n|\n|\r|\t)/gm, "").replace(":", ""), e = html_entity_decode(e), e = strip_tags(e), e = e.replace(/(,|\.|\(|\))/gim, ""), e = e.replace(/(\s|\/|\\)/gi, "-"), e = e.replace(/\u0000/g, ""), e = e.replace(/('|\")/g, ""), e.toLowerCase()
    };
    
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
        
    function removeAccents(e) {
        return e = e.replace(/&#(\w+);/gi, function(e, r) {
            var a = {xe0: "a", xe1: "a", xe2: "a", xe3: "a", xe4: "a", xe5: "a",
                     xe6: "a", xe8: "e", xe9: "e", xea: "e", xeb: "e", xec: "i",
                     xed: "i", xee: "i", xef: "i", xf2: "o", xf3: "o", xf4: "o",
                     xf5: "o", xf6: "o", xf9: "u", xfa: "u", xfb: "u", xfc: "u",
                     xe7: "c", xf1: "n"};
                 
            return void 0 != a[r.toLowerCase()] && "undefined" != a[r.toLowerCase()] ? a[r.toLowerCase()] : "&" + r + ";"
        })
    }
    
    function html_entity_decode(e, r) {
        var a = {},
            t = "",
            i = "",
            c = "";
        if (i = e.toString(), !1 === (a = get_html_translation_table("HTML_ENTITIES", r))) return !1;
        delete a["&"], a["&"] = "&amp;";
        for (t in a) c = a[t], i = i.split(c).join(t);
        return i = i.split("&#039;").join("'")
    }
    
    function strip_tags(e, r) {
        r = (((r || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
        var a = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            t = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return e.replace(t, "").replace(a, function(e, a) {
            return r.indexOf("<" + a.toLowerCase() + ">") > -1 ? e : ""
        })
    }
    
    function get_html_translation_table(e, r) {
        var a, t = {},
            i = {},
            c = {},
            o = {},
            u = {},
            n = {};
        if (c[0] = "HTML_SPECIALCHARS", c[1] = "HTML_ENTITIES", o[0] = "ENT_NOQUOTES", o[2] = "ENT_COMPAT", o[3] = "ENT_QUOTES", u = isNaN(e) ? e ? e.toUpperCase() : "HTML_SPECIALCHARS" : c[e], n = isNaN(r) ? r ? r.toUpperCase() : "ENT_COMPAT" : o[r], "HTML_SPECIALCHARS" !== u && "HTML_ENTITIES" !== u) throw new Error("Table: " + u + " not supported");
        t[38] = "&amp;", "HTML_ENTITIES" === u && (t[160] = "&nbsp;", t[161] = "&iexcl;", t[162] = "&cent;", t[163] = "&pound;", t[164] = "&curren;", t[165] = "&yen;", t[166] = "&brvbar;", t[167] = "&sect;", t[168] = "&uml;", t[169] = "&copy;", t[170] = "&ordf;", t[171] = "&laquo;", t[172] = "&not;", t[173] = "&shy;", t[174] = "&reg;", t[175] = "&macr;", t[176] = "&deg;", t[177] = "&plusmn;", t[178] = "&sup2;", t[179] = "&sup3;", t[180] = "&acute;", t[181] = "&micro;", t[182] = "&para;", t[183] = "&middot;", t[184] = "&cedil;", t[185] = "&sup1;", t[186] = "&ordm;", t[187] = "&raquo;", t[188] = "&frac14;", t[189] = "&frac12;", t[190] = "&frac34;", t[191] = "&iquest;", t[192] = "&Agrave;", t[193] = "&Aacute;", t[194] = "&Acirc;", t[195] = "&Atilde;", t[196] = "&Auml;", t[197] = "&Aring;", t[198] = "&AElig;", t[199] = "&Ccedil;", t[200] = "&Egrave;", t[201] = "&Eacute;", t[202] = "&Ecirc;", t[203] = "&Euml;", t[204] = "&Igrave;", t[205] = "&Iacute;", t[206] = "&Icirc;", t[207] = "&Iuml;", t[208] = "&ETH;", t[209] = "&Ntilde;", t[210] = "&Ograve;", t[211] = "&Oacute;", t[212] = "&Ocirc;", t[213] = "&Otilde;", t[214] = "&Ouml;", t[215] = "&times;", t[216] = "&Oslash;", t[217] = "&Ugrave;", t[218] = "&Uacute;", t[219] = "&Ucirc;", t[220] = "&Uuml;", t[221] = "&Yacute;", t[222] = "&THORN;", t[223] = "&szlig;", t[224] = "&agrave;", t[225] = "&aacute;", t[226] = "&acirc;", t[227] = "&atilde;", t[228] = "&auml;", t[229] = "&aring;", t[230] = "&aelig;", t[231] = "&ccedil;", t[232] = "&egrave;", t[233] = "&eacute;", t[234] = "&ecirc;", t[235] = "&euml;", t[236] = "&igrave;", t[237] = "&iacute;", t[238] = "&icirc;", t[239] = "&iuml;", t[240] = "&eth;", t[241] = "&ntilde;", t[242] = "&ograve;", t[243] = "&oacute;", t[244] = "&ocirc;", t[245] = "&otilde;", t[246] = "&ouml;", t[247] = "&divide;", t[248] = "&oslash;", t[249] = "&ugrave;", t[250] = "&uacute;", t[251] = "&ucirc;", t[252] = "&uuml;", t[253] = "&yacute;", t[254] = "&thorn;", t[255] = "&yuml;"), "ENT_NOQUOTES" !== n && (t[34] = "&quot;"), "ENT_QUOTES" === n && (t[39] = "&#39;"), t[60] = "&lt;", t[62] = "&gt;";
        for (a in t) t.hasOwnProperty(a) && (i[String.fromCharCode(a)] = t[a]);
        return i
    }
})();