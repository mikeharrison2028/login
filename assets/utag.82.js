//~~tv:20010.20230630
//~~tc: Tealium Custom Container
//~~tc: Updated Tealium loader to 4.35 version

/*
  Tealium Custom Container Notes:
  - Add sending code between "Start Tag Sending Code" and "End Tag Sending Code".
  - Add JavaScript tag library code between "Start Tag Library Code" and "End Tag Library Code".
  - Add JavaScript code only, do not add HTML code in this file.
  - Remove any <script> and </script> tags from the code you place in this file.

  Loading external JavaScript files (Loader):
  - If you need to load an additional external JavaScript file, un-comment the singe-line JavaScript comments ("//") within the following Loader sections near the bottom of this file:
      - "Start Loader Function Call"
      - "End Loader Function Call"
      - "Start Loader Callback Function"
      - "End Loader Callback Function"
  - After un-commenting, insert the path to the external JavaScript file you want to load.
  - Finally, within the Loader callback function, insert the JavaScript code that should run after the external JavaScript file has loaded.
*/

/* Start Tag Library Code */
/* End Tag Library Code */

//tealium universal tag - utag.sender.custom_container ut4.0.202609260011, Copyright 2026 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {view: 1};

    u.initialized = false;

      u.map={};
  u.extend=[function(a,b){ try{ if(1){
/**
 * bactm.plugin.googleDartTag
 * 
 * 
 * Immediately Invoked Function Expression
 * Tealium bootstrap
 * 
 * Author: Mallika Ektare
 * 
 * Google DART plugin captures events, processes them and sends them off to designated analytic tool.
 * Events can be: pageviews, custom events (DLE/Workbook rules), and click events. Click events are defined in Tealium's
 * lookup table and/or within the digitalData object, and are separate from DLE events.
 * 
 * Use Cases:
 *     1) DART tracks pageviews, clicks, and DLE events
 *     2) DART tracks only pageviews
 *     3) DART tracks only clicks or DLE events, but no pageviews. 
 * 
 * These events can be passed to the plugin with various formats. These are the examples:
 * 
 *      standardDART can come in either an array or string format:
 *          ['https://1359940.fls.doubleclick.net/activityi;src=1359940;type=mlwm-725;cat=2018_00k;ord=1;num=1']
 *          'https://1359940.fls.doubleclick.net/activityi;src=1359940;type=mlwm-725;cat=2018_00k;ord=1;num=1'
 *      
 *      custom event DLE rule:
 *      { ... dart: ';src=1359940;type=sdlpb511;cat=2016_0;ord=1', ...}

 * 
 * Adapter class handles a lot of the internal processing that is required before we can fire of the DART tag.
 * Google's DART fireDartTag() is made for public use.
 * 
 */
const fireDartTag = (optStatus) => {

    //do not fire dart if ccba is false
    if (optStatus.ccba === false) return;

    (function(parent, name, context, definition) {
        // Check if is used inside a "modern" browser, if not, return
        if (!context || !context[parent] || !Array.prototype.filter) {
            return;
        }
    
        context[parent]['plugins'][name] = definition();
    })('bactm', 'googleDartTag', typeof window !== 'undefined' ? window : null, function() {
        
        const bactm = window.bactm;
        const version = '1.0.1';
        const LOG_LEVEL = {
            OFF     : 10,
            FATAL   : 5,
            ERROR   : 4,
            WARN    : 3,
            INFO    : 2,
            DEBUG   : 1
        };

        bactm._log('bactm.plugins.googleDartTag v' + version + ' initializing.', LOG_LEVEL.INFO);

        /**
         *  Log events for pageviews, custom events (DLE/Workbook events), click events from tealium DART
         *  lookup table, 
         */
        const DART_LOG = {
            PAGEVIEW: {
                SUCCESS: 'Firing pageview DART tag',
                ERROR: 'There was an error when trying to fire the DART pageview'
            },
            CUSTOM_EVENT: {
                SUCCESS: 'Firing custom event DART tag',
                ERROR: 'There was an error when trying to fire the custom event DART'      
            },
            CLICK_EVENT: {
                SUCCESS: 'Firing click event DART tag',
                ERROR: 'There was an error when trying to fire DART click event'      
            },
            DEFAULT: {
                SUCCESS: 'Firing DART tag',
                ERROR: 'There was an error when trying to fire the DART tag'
            }
        };

        if(!digitalData) return;

        //setup global site tab snippet
        window.gDataLayer = window.gDataLayer || [];

        window.gtag = function() {
            window.gDataLayer.push(arguments);
        }
        window.gtag('js', new Date());

       /**
         * Adapter
         * Information and methods used across the classes
         * 
         * @class
         * @returns {typeof Adapter}
       */
        function Adapter () {}

        Adapter.prototype.process = {

            /**
             * Return standardDART array from DDO.
             * 
             * In the DDO, data can be found under pageInfo or page.attributes, and a spanish version can exist.
             * Most cases the dart URL is an array. Rarely, we find one set as a string.
             * 
             * @param {object} details Object from listener callback
             * @returns {array} (example: ['https://1359940.fls.doubleclick.net/activityi;src=1359940;type=mlwm-725;cat=2018_00k;ord=1;num=1'])
             */
            findStandardDartURL: function(details) {
                const pageInfo = (details?.pageInfo?.standardDART?.length) ? 
                                  details.pageInfo : digitalData.page.pageInfo[details.pageInfoArrayIndex];
                const pageAttributes = digitalData.page.attributes;

                const dartFromPageInfo = this.checkForVariable(pageInfo.standardDART);
                const dartFromAttributesEn = this.checkForVariable(pageAttributes.standardDART);
                const dartFromAttributesEs = this.checkForVariable(pageAttributes.standardDARTes);

                if (pageInfo.language == 'es' && dartFromAttributesEs){
                    return pageAttributes.standardDARTes;
                } else if (dartFromPageInfo) {
                    return pageInfo.standardDART;
                } else if (dartFromAttributesEn){
                    return pageAttributes.standardDART;
                } else {
                    return null;
                }
            },
            /**
             * Extract dart params from URL and returns an array of object with key-value pairs.
             * 
             * Example:
             *    Valid inputs: array or string
             *      array: ['https://1359940.fls.doubleclick.net/activityi;src=1359940;type=mlwm-725;cat=2018_00k;ord=1;num=1']
             *      string: 'https://1359940.fls.doubleclick.net/activityi;src=1359940;type=mlwm-725;cat=2018_00k;ord=1;num=1'
             *    Output: [{src: 1359940, type: mlwm-725, cat: 2018_00k, ord: 1, num: 1, ... }]
             * 
             * @param {array || string} dartUrl
             * @returns {array} dartUrlParams
             */
            extractParamsFromDartURL: function(dartUrl) {
                if(typeof dartUrl !== 'undefined'){

                    //standardDART value can sometimes be a string, not an array. So we'll turn it into an array. 
                    if (typeof dartUrl === 'string') dartUrl = bactm._asArray(dartUrl);

                    try {
                        let dartUrlParams = [];
                        dartUrl.forEach( (url,index) => {
                            if (!this.isAcceptableUrl(url)) {
                                bactm._log('The DART URL provided is not a valid URL. No action was taken.', url, LOG_LEVEL.ERROR);
                                return;
                            }

                            let paramObj = { url: url };

                            //strip the parameters from the dart url; split, remove base path, and remove falsy values like ""
                            params = url.split(';').slice(1).filter(Boolean);
                            params.forEach( param => {
                                const [key,value] = param.split('=');
                                paramObj[key] = value; 
                            });

                            //grab values from DDO.cart, if they exist
                            //Prop definitions: https://horizon.bankofamerica.com/docs/pages/viewpage.action?pageId=830862698
                            const cart = digitalData.cart;
                            if (cart) {

                                const cartAttributes = digitalData.cart.attributes;
                                const applicationID = cart.applicationID || cartAttributes.applicationId;

                                //set appID for both u3 & match_id. u3 is legacy, match_id is new
                                if (applicationID) {
                                    paramObj.u3 = applicationID;
                                    paramObj.match_id = applicationID;
                                }

                                if (cartAttributes.sourceCode) paramObj.u18 = cartAttributes.sourceCode;

                                //set values u24-u27
                                if (cart.item && cart.item.length > 0) {
                                    const productItem = digitalData.cart.item[index];
                                    const productInfo = productItem.productInfo;

                                    if (productItem?.category?.primaryCategory) paramObj.u24 = productItem.category.primaryCategory;
                                    if (productInfo?.productName) paramObj.u25 = productInfo.productName;
                                    if (productInfo?.productID) paramObj.u26 = productInfo.productID;
                                    if (productInfo?.subChannel) paramObj.u33 = productInfo.subChannel;
                                }
                                if (cartAttributes.status) paramObj.u27 = cartAttributes.status;
                            }

                            if (!paramObj.num){
                                const ranNum = Math.random() * 10000000000000;
                                paramObj.num = ranNum;
                            }

                            dartUrlParams.push(paramObj);
                        });
                        return dartUrlParams;
                    } catch(e){
                        bactm._log('There was an error when trying to fire the DART tag.', e, LOG_LEVEL.ERROR);
                    }
                }
            },
            /**
             * Returns an array of object with key-value pairs for dart params.
             * @param {array} dartTags
             *
             * Example:
             *    Input: [ { options: null, url: ";src=1359940;type=sdlpb511;cat=2016_0;ord=1"} ] //semi-colon separated
             *    or
             *    Input [ { options: null, url: "src=1359940|type=sdlpb511|cat=2016_0|ord=1"} ] //pipe separated
             * 
             *    Resulting output: [{src: 1359940, type: mlwm-725, cat: 2018_00k, ord: 1, ... }]
             * 
             * @returns {array} dartUrlParams
             */
            extractParamsFromCustomEvent: function(dartTags) {
                let dartUrlParams = [];
                dartTags.forEach( dartObj => {

                    let paramObj = {};
                    const regex = /(\w+)=([^;|]+)/g;

                    const matches = dartString.match(regex); //returns array of matches ie: ['src=1359940', 'type=sdlpb511', 'cat=2016_0' ... ]
                    if (matches) {
                        matches.forEach( match => {
                            const [key,value] = match.split("="); //split match by '=' ie: [src,1239940]
                            paramObj[key] = value; //add it to the object
                        })
                    }
                    
                    dartUrlParams.push(paramObj);
                });
                return dartUrlParams;
            },
            setupClickDart: function() {
                //gather clickable element info, queue them up in event listeners
                const clickDartParameters = adapter.process.clickDartLookupTable() || adapter.process.findClickDartDDO();
                if (clickDartParameters.length) adapter.process.setupClickEvenListeners(clickDartParameters);
            },
            /**
             * Method collects values under utag_data['dart_lookup_click_element']
             * 
             * @returns {array} dartUrlsForElements
             */
            clickDartLookupTable: function() {
                try{
                    let dartUrlsForElements = [];
                    let lookupTable = utag_data['dart_lookup_click_element'];
                    if(typeof lookupTable === 'undefined') return;

                    if (lookupTable != "undefined") {
                        lookupTable = utag_data['dart_lookup_click_element']; //string
                    }

                    //Now look for values in DDO
                    dartUrlsForElements = this.findClickDartDDO();

                    //push them all onto an array
                    lookupTable.split('|').forEach(function(dart) {
                        dartUrlsForElements.push(dart);
                    });
                    return dartUrlsForElements;
                  } catch (err) {
                    bactm.reportError(err);
                  }
            },
            /**
             * Method returns values under ddo.page.pageInfo.clickDART or ddo.page.attributes.clickDART, if they exist.
             * 
             * @returns {array} ddoClickDART
             */
            findClickDartDDO: function() {
                digitalData.page = digitalData.page || {};
                digitalData.page.pageInfo = digitalData.page.pageInfo || [];

                const pv = dataCollector.filter(function(d){return d.event === 'pageview'});
                const pageInfoKey = pv[pv.length -1].pageInfoKey;
        
                if(digitalData.page.pageInfo.length > 0 && digitalData.page.pageInfo[pageInfoKey] &&
                    digitalData.page.pageInfo[pageInfoKey].hasOwnProperty('clickDART')) return bactm._asArray(digitalData.page.pageInfo[pageInfoKey].clickDART);
        
                digitalData.page.attributes = digitalData.page.attributes || {};
                const ddoClickDART =  digitalData.page.attributes.clickDART ? bactm._asArray(digitalData.page.attributes.clickDART) : [];
                return ddoClickDART;
            },
            /**
             * Set up event listeners for clicks once a match is found for element id, class, or name.
             * A dart url is associated to each one. Once the event is triggered, fire off the dart
             * tag for dart url. 
             * 
             * @param {array} clickDartParams 
             */
            setupClickEvenListeners: function(clickDartParams) {

                clickDartParams.forEach( item => {
                    const dartDetails = item.split('-_-');
                    if (dartDetails.length < 2) return;

                    const selector = dartDetails[0]
                    const dartUrl = dartDetails[1];
                    let element = '';
                    let elements = '';
                  
                    if(!this.isAcceptableUrl(dartUrl)) return;

                    if(selector.indexOf('class>') > -1) {
                        selector = selector.split('>')[1];
                        elements = document.getElementsByClassName(selector);
                        if(!elements || elements.length === 0) return;
                        elements.forEach( element => {
                            this.addClickEventListener(element, dartUrl);
                        })
                    }
        
                    element = document.getElementById(selector);
                    if(element) {
                        this.addClickEventListener(element, dartUrl);
                    }
        
                    elements = document.getElementsByName(selector);
                    elements.forEach( element => {
                        this.addClickEventListener(element, dartUrl);                       
                    });
                });
            },
            addClickEventListener: function(el, dartUrl) {
                if(el.addEventListener) {
                    el.addEventListener('click', function() {
                        const dartParams = adapter.process.extractParamsFromDartURL(bactm._asArray(dartUrl));
                        bactm.plugins.googleDartTag.fireDartTag(dartParams, 'clickEvent');
                    });
                }                
            },
            isAcceptableUrl: function(str) {
                if (!str) return false;
                return str.indexOf('http') > -1 && str.indexOf('://') > -1;
            },
            checkForVariable: function(variable) {
                if ( (typeof variable === 'string' && this.isAcceptableUrl(variable)) || 
                     (Array.isArray(variable) && variable.length > 0 && this.isAcceptableUrl(variable[0]))){
                    return true;
                } else {
                    return false;
                }
            }
        }; //end adapter process object

        //instantiate adapter
        const adapter = new Adapter();

        function GoogleDartTag() {
            /**
             * Need to setup listeners for late pageviews and handling of single page applications
             */
            bactm.on('setupDartTags', this.initializePageview.bind(this));
            bactm.on('initClickAttributes', adapter.process.setupClickDart);
        };
        /**
         * If standardDART url in DDO exists, fire initial pageview event.
         * @param {object} details 
         * 
         */
        GoogleDartTag.prototype.initializePageview = function(details) {

            if (adapter.process.findStandardDartURL(details)){
                const dartUrl = adapter.process.findStandardDartURL(details);
                const dartParameters = adapter.process.extractParamsFromDartURL(dartUrl);
                this.fireDartTag(dartParameters, 'pageview');
            } else {
                bactm._log("No standardDART url for pageload", LOG_LEVEL.INFO);
            }
        };
        /**
         * Method fires a dart tag to its designated endpoint. 
         * 
         * @param {array} dartParameters 
         * @param {string} type 
         * 
        */
        GoogleDartTag.prototype.fireDartTag = function(dartParameters, type) {

            let options = {
                allow_custom_scripts: true,
                dc_custom_params: {}
            };

            // Custom event format is different, so process it
            if (type === 'customEvent') {
                dartParameters = adapter.process.extractParamsFromCustomEvent(dartParameters);
            }

            dartParameters.forEach( param => {

                if (param.qty) options.qty = param.qty;
                if (param.cost) options.value = param.cost;

                if (param.ord) options.dc_custom_params.ord = param.ord;
                if (param.num) options.dc_custom_params.num = param.num;
                if (param.dc_lat) options.dc_custom_params.dc_lat = param.dc_lat;
                if (param.tag_for_child_directed_treatment) {
                    options.dc_custom_params.tag_for_child_directed_treatment = param.tag_for_child_directed_treatment;
                }
                if (param.match_id) options.dc_custom_params.match_id = param.match_id;
                if (param.u3) options.u3 = param.u3;
                if (param.u18) options.u18 = param.u18;
                if (param.u24) options.u24 = param.u24;
                if (param.u25) options.u25 = param.u25;
                if (param.u26) options.u26 = param.u26;
                if (param.u27) options.u27 = param.u27;
                if (param.u33) options.u33 = param.u33;
                options.u30 = bactm.pageID('current');

                options.send_to = "DC-" + param.src + "/" + param.type + "/" + param.cat + "+unique";

                try {
                    bactm._log('-----------------FIRE DART TAG--------------------------', LOG_LEVEL.INFO);
                    gtag('config', 'DC-' + param.src);
                    gtag('event', 'conversion', options);

                    if (type === 'pageview') { //log events
                        bactm._log(DART_LOG.PAGEVIEW.SUCCESS, LOG_LEVEL.INFO);
                        bactm._log('dartUrl: ', param.url, LOG_LEVEL.INFO);
                        bactm._log('dartParameters: ', dartParameters, LOG_LEVEL.INFO);
                        bactm._log('options: ', options, LOG_LEVEL.INFO);
                    } else if (type === 'customEvent'){
                        bactm._log(DART_LOG.CUSTOM_EVENT.SUCCESS, LOG_LEVEL.INFO);
                        bactm._log('custom event params: ', param, LOG_LEVEL.INFO);
                    } else if (type === 'clickEvent') {
                        bactm._log(DART_LOG.CLICK_EVENT.SUCCESS, LOG_LEVEL.INFO);
                        bactm._log('click event DART url: ', param.url, LOG_LEVEL.INFO);
                    } else {
                        bactm._log(DART_LOG.DEFAULT.SUCCESS, LOG_LEVEL.INFO);
                    }
                } catch (e) {
                    if (type === 'pageview') { // log errors
                        bactm._log(DART_LOG.PAGEVIEW.ERROR, e, LOG_LEVEL.ERROR);
                    } else if (type === 'customEvent'){
                        bactm._log(DART_LOG.CUSTOM_EVENT.ERROR, e, LOG_LEVEL.ERROR);
                    } else if (type === 'clickEvent') {
                        bactm._log(DART_LOG.CLICK_EVENT.ERROR, LOG_LEVEL.ERROR);
                    } else {
                        bactm._log(DART_LOG.DEFAULT.SUCCESS, LOG_LEVEL.INFO);
                    }
                }

            });

        }//end GoogleDartTag

        /** instantiate Google Dart Tag */
        const googleDartTag = new GoogleDartTag();

        /** bactm.plugin.googleDartTag */
        return {
            fireDartTag: googleDartTag.fireDartTag.bind(googleDartTag)
        }
    });
}

bactm.on('plugins:OneTrust:C0004:DynamicDartLoader', fireDartTag);
} } catch(e){ utag.DB(e) }  }];


    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, i;

        u.data = {
          /* Initialize default tag parameter values here */
          /* Examples: */
          /* "account_id" : "1234567" */
          /* "base_url" : "//insert.your.javascript.library.url.here.js" */
          /* A value mapped to "account_id" or "base_url" in TiQ will replace these default values. */
        };


        /* Start Tag-Scoped Extensions Code */
        /* Please Do Not Edit This Section */
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
        /* End Tag-Scoped Extensions Code */


        /* Start Mapping Code */
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }
        /* End Mapping Code */


        /* Start Tag Sending Code */

          // Insert your tag sending code here.

        /* End Tag Sending Code */


        /* Start Loader Callback Function */
        /* Un-comment the single-line JavaScript comments ("//") to use this Loader callback function. */

        //u.loader_cb = function () {
          //u.initialized = true;
          /* Start Loader Callback Tag Sending Code */

            // Insert your post-Loader tag sending code here.

          /* End Loader Callback Tag Sending Code */
        //};

        /* End Loader Callback Function */


        /* Start Loader Function Call */
        /* Un-comment the single-line JavaScript comments ("//") to use Loader. */

          //if (!u.initialized) {
            //u.loader({"type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : 'utag_82' });
            //u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_82' });
          //} else {
            //u.loader_cb();
          //}

          //u.loader({"type" : "img", "src" : u.data.base_url + c.join(u.data.qsp_delim) });

        /* End Loader Function Call */


        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })("82", "bofa.olb");
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

