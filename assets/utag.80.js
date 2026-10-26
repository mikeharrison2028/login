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
/** @license Copyright 2017 Bank of America, N.A. All rights reserved. */

/**
 * @fileoverview Bank of America data collection custom events library.
 *
 * @requires window.bactm
 * @requires window.utag_data['Custom_Event_Settings']
 *
 * This library is used to capture DOM elements clicked on the document and
 * uses a set of JSON rules, retrieved from a lookup table, to determine
 * what information should be captured for that element and sent to which
 * provider(s).
 *
 * Version ^1.0 of the library supports the following data collection providers:
 *  - Coremetrics (Manual Link Clicks)
 *  - Google Analytics (Custom Events)
 *  - DART
 *  - Conversion Events
 *
 * window.utag_data['Custom_Event_Settings'] should be valid JSON utilizing the
 * following schema
 *
 * For click events, elements can be found by class (start "el" with a dot [.]) or
 * by ID (start "el" with a hashtag [#]). The lowest element in the click path will
 * be matched.
 *
 * Input and select elements can have onBlur and onChange event listeners added
 * respectively. Use CSS like selectors in the "el" property to identify if the element
 * should get an onBlur or onChange event added. For example, "input#first_name" will
 * have an onBlur event listener added to a element in the DOM with the ID of "first_name"
 * 
 * To see an example of a Workbook/DLE, look in the 'dles' directory. 
 *
 * String properties can use data from the element that matches the rule. To use the
 * data, wrap the variable in curly braces (e.g.: {{ca}}, {{id}}, etc.).
 *
 * Version ^1.3 of the library supports the following variables:
 *  - {{id}} (Captures the ID of the element matched.)
 *  - {{url}} (Captures the HREF of the element matched.)
 *  - {{ca}} (Captures the data-bactmln of the element matched.)
 *  - {{val}} (Captures the value of a select or input element.)
 *  - {{ht}} (Captures the value of a hover duration.)
 *  - {{c.propertyName}} (Captures custom data passed along with a custom event.
 *                        Dot notation is used to access individual properties.)
 */
const _definePlugin = (parent, name, context, definition, optStatus) => {
    // Check if is used inside a "modern" browser, if not, return
    if (!context || !context[parent] || !Array.prototype.filter) {
        return;
    }
  
    context[parent]['plugins'][name] = definition(optStatus);
  };
  
  const _initCustomEvents = (optStatus) => {
      _definePlugin('bactm', 'customEvents', typeof window !== 'undefined' ? window : null, function (optStatus) {

        /**
         * Google Site Tag Setup
         * Only initialize if user opts in for data sharing
        */
        if (optStatus.ccba === true) {
            window.gDataLayer = window.gDataLayer || [];
            window.gtag = function() {
                window.gDataLayer.push(arguments);
            }
            window.gtag('js', new Date());
        }

        const bactm = window.bactm;
        const version = '3.0.1';
        const digitalData = window.digitalData;
        let clickEventListenerAdded = false;
        let hoverDuration = '';
        let allRules = [];
        let parsedRules = {};
        let classSelectors = [];
        let idSelectors = [];
        const acceptedSelectors = ['.', '#'];
        let dle = {};
        let hasScrollTagFired = {};
        const LOG_LEVEL = {
                  OFF: 10,
                  FATAL: 5,
                  ERROR: 4,
                  WARN: 3,
                  INFO: 2,
                  DEBUG: 1
              };

        // ===========================================================================
        // Provider specific handlers.
        // ===========================================================================

        const _fireGoogleAnalyticsPageview = (el, rule, optStatus) => {
            
            //do not fire GA custom event if user opted out of data sharing
            if (optStatus.ccba === false) {
                bactm._log(':: Custom Event :: CCBA is false; Google Analytics pageview blocked.', LOG_LEVEL.DEBUG);
                return;
            }

            //return if gtag does not exist
            if (typeof window.gtag !== 'function') {
                bactm._log('gtag is not a function. Click info not sent to Google Analytics.', LOG_LEVEL.ERROR);
                return;
            }

            // If gaId exists in the DDO, do not fire pageview event from DLE
            // gaId in the DDO can either be a string or array
            if (digitalData?.page?.attributes?.gaId?.length) {
                return;
            }

            rule = rule['ga'];

            const env = bactm_envSelector.match(/^prod\d?$/) ? 'prod': 
                bactm_envSelector === 'dev' ? 'dev' : 'notprod';

            let googleAnalyticsID;

            switch (env) {
                case 'prod':
                    googleAnalyticsID = rule[2];
                    break;
                case 'dev':
                    googleAnalyticsID = rule[0];
                    break;
                case 'notprod':
                    googleAnalyticsID = rule[1];
                    break;
                default:
                    googleAnalyticsID = rule[2];
            }

            googleAnalyticsID = googleAnalyticsID.split('|')[1].trim();
            gtag('config', googleAnalyticsID);
            bactm._log(':: Custom Event :: Handle Google Analytics pageview.', LOG_LEVEL.DEBUG);
        };

        /**
         * If the ga function is available, send a custom event using the data provided.
         * Also send custom event to Adobe Alloy
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _fireGoogleAnalytics = (el, rule, optStatus) => {
            
            //do not fire GA custom event if user opted out of data sharing
            if (optStatus.ccba === false) {
                bactm._log(':: Custom Event :: CCBA is false; Google Analytics event blocked.', LOG_LEVEL.DEBUG);
                return;
            }

            bactm._log(':: Custom Event :: Handle Google Analytics.', LOG_LEVEL.DEBUG);
            if (typeof window.gtag !== 'function') {
                bactm._log('gtag is not a function. Click info not sent to GA.', LOG_LEVEL.ERROR);
                return;
            }

            if (!bactm?.plugins?.google?.analytics) { 
                bactm._log('Google plugin not available.', LOG_LEVEL.ERROR);
                return;        
            }

            var d = rule;
            var config = customDimensions() || {};
            
            var gaPlugin = bactm?.plugins?.google?.analytics;

            if (d.nonInteraction) {
                config.nonInteraction = true;
            }

            /* 
              Alloy team wants to capture the same GA events. The object
              exported to the page is window._satellite
            */
              if (window._satellite && typeof window._satellite.track === "function") {
                _fireAdobeAlloy(d);
            }

            if (gaPlugin){
                gaPlugin.ids.forEach(function (id) {
                    gaPlugin.custom('customEvents', { 'send_to': id,'category': d.category, 'action': d.action, 'label': d.label}, config)
                });
            }
        };

        /**
         * If the window.uetq function is available, send a custom event using the data provided.
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _fireBingUET = (el, rule) => {
            try{
              bactm._log(':: Custom Event :: Handle Bing UET.', LOG_LEVEL.DEBUG);
              if (typeof ba === 'undefined' || typeof bactm.uetq === 'undefined' || typeof bactm.uetq.push !== 'function') {
                  bactm._log('uetq.push is not a function. Tag not sent to Bing.', LOG_LEVEL.INFO);
                  return;
              }
              if (rule.bingUET === true) {
                  bactm.uetq.push('pageLoad');
              } else {
                  bactm.uetq.push({
                      el: rule.bingUET
                  });
              }
          } catch(err) {
              bactm.reportError(err);
          }
        };

        /**
         * If window._satellite.track function exists, send a custom event using the data provided.
         *
         * @private
         * @param {object} customEventRules - The custom event retrieved from bactm
         * @returns {void}
         */
        const _fireAdobeAlloy = (customEventRules) => {
            bactm._log(':: Custom Event :: Handle Adobe Alloy', LOG_LEVEL.DEBUG);

            const category = customEventRules.category;
            const action = customEventRules.action;
            const label = customEventRules.label;
            const pageID = digitalData.page.pageInfo[0].pageID || '';
            const url = window.location.href;

            const alloyData = {
                PageID: pageID,
                URL: url,
                category: category,
                action: action,
                label: label            
            }

            window._satellite.track('workbookCustomEvents', alloyData);

        };

        /**
         * Function to disect and handle scenario based conditionals
         *
         * @private
         * @param {object} scenario - Clicked element which matched the rule.
         * @returns {void}
         */
        const handleScenario = (scenario) => {
            bactm._log(':: Custom Event :: Handle conditional scenario.', LOG_LEVEL.DEBUG);

            try {
                let finalVar = window;
                const variablesToCheck = scenario.valueToCheck.split('.');
                for (var i = 0; i < variablesToCheck.length; i++) {
                    finalVar = finalVar[variablesToCheck[i]];
                }
                if (finalVar === scenario.conditional.value) {
                    _processRule(scenario.result, null);
                }
            } catch (e) {
                bactm._log(e, LOG_LEVEL.ERROR);
                bactm.reportError(err);
            }
        };

        /**
         * Function to process the page level scenario rules
         *
         * @returns {undefined}
         */
        const processScenarios = () => {
            const scenariosToEvaluate = bactm._asArray(parsedRules.pageRules[0].scenarios)

            scenariosToEvaluate.forEach(function (scenario) {
                bactm._log('scenario rule to fire:', scenario, LOG_LEVEL.DEBUG);
                const localScenario = JSON.parse(JSON.stringify(scenario));
                handleScenario(localScenario, null);
            });
        }
        /**
         * If the Coremetrics manual link click function is available, call function using
         * the data provided.
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _fireCoremetricsManualLink = (el, rule) => {
            bactm._log(':: Custom Event :: Coremetrics Manual Link Click', LOG_LEVEL.DEBUG);
            if (typeof bactm_cmCreateManualLinkClickTag !== 'function') {
                bactm._log('bactm_cmCreateManualLinkClickTag is not a function. Click info not sent to CM.', LOG_LEVEL.DEBUG);
                return;
            }

            // get the pageID, first check the history or default back to the first pageInfo object.
            let pageID = '',
                page = digitalData.page || {},
                attr = page.attributes || {},
                history = attr.pageIDHistory || [];

            if (Array.isArray(history) && history.length > 0) {
                pageID = history[history.length - 1].pageID || '';
            } else if (Array.isArray(page.pageInfo)) {
                pageID = page.pageInfo[0].pageID || '';
            }

            const d = rule;
            el = el || {};
            try{
                bactm_cmCreateManualLinkClickTag(el.href || d.href || d.category, d.label, pageID);
            } catch (err) {
                bactm.reportError(err);
            }
        }

        /**
         * For each DART url found in the rule, add an iFrame matching Google's specifications:
         * https://support.google.com/dfa/partner/answer/154049?hl=en
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
  
        const _fireDART = (el, rule, optStatus) => {

            //do not fire DART custom event if user opted out of data sharing
            if (optStatus.ccba === false) {
                bactm._log(':: Custom Event :: CCBA is false; DART event blocked.', LOG_LEVEL.DEBUG);
                return
            }

            bactm._log(':: Custom Event :: Handle DART.', LOG_LEVEL.DEBUG);

            try {
                if (typeof rule['dart'] === 'string') { 
                    // Original string handling
                    dartTags = bactm._asArray({ url: rule['dart'], options: null });
                } else if (rule['dart'] && !Array.isArray(rule['dart']) && typeof rule['dart'] === 'object') {
                    /**
                     * Handle if the rule is an object with a pageview property
                     * 
                     * If the rule is for a pageview, we need to check if standardDART exists in the pageInfo or
                     * page attributes. If it does, we do not want to fire the DART tag from the DLE.
                     **/ 
                    if (rule['dart'].pageview) {
                        const currentPageID = bactm.pageID('current');

                        const currentInfoObject = digitalData?.page?.pageInfo?.find(
                            info => info.pageID === currentPageID
                        );

                        const standardDartPageInfo = currentInfoObject?.standardDART?.length;
                        const standardDartAttributes = digitalData?.page?.attributes?.standardDART?.length;

                        if (standardDartPageInfo || standardDartAttributes) {
                            return;
                        }
                    }
                    dartTags = bactm._asArray({ url: rule['dart'].url, options: null });
                } else {
                    // Fallback for Arrays or other existing formats
                    dartTags = bactm._asArray(rule['dart']);
                }
                if (!dartTags) return false;

                let leadGenEvent = window.dataCollector.find(event => 
                    event.event === 'leadGeneration' && 
                    event.data?.attributes?.leadGenerationId === digitalData.leadGeneration.leadGenerationId
                );

                dartTags.forEach(function (dart) {
                    let src,
                        type,
                        cat,
                        sendTo = dart.url.split(';').slice(1,4);
                    sendTo.forEach(function (param) {
                        if (param.startsWith('src=')) {
                            src = param.split('').slice(4).join('');
                            } else if (param.startsWith('type=')) {
                            type = param.split('').slice(5).join('');
                            } else if (param.startsWith('cat=')) {
                            cat = param.split('').slice(4).join('');
                            } else return;
                    });
                    window.gtag('config', 'DC-' + src);
                    window.gtag('event', 'conversion', {
                        'allow_custom_scripts': true,
                        'u30': bactm.pageID('current'),
                        ...(digitalData.leadGeneration === undefined ? {} : {
                            'dc_custom_params': {
                                'match_id': digitalData.leadGeneration.leadGenerationId
                            },
                            'u31': digitalData.leadGeneration.leadGenerationIdSrc,
                            'u32': digitalData.leadGeneration.leadGenerationId,
                            ...(leadGenEvent !== undefined && leadGenEvent?.data?.products?.[0] ? {
                                'u24': leadGenEvent.data.products[0].category?.primaryCategory || '',
                                'u25': leadGenEvent.data.products[0].productInfo?.productName || '',
                                'u26': leadGenEvent.data.products[0].productInfo?.productID || '',
                            } : {}),
                        }),
                        'send_to': "DC-" + src + "/" + type + "/" + cat + "+unique"
                    });
                });
            } catch (e) {
                bactm._log(e, LOG_LEVEL.ERROR);
            }
        };

        /**
         * For millwardBrown url found in the rule
         * https://github.com/Millward-Brown-Digital/self-hosted-tracking
         *
         * @private
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _fireMillwardBrown = (el, rule) => {
            bactm._log(':: Custom Event :: Handle Millward Brown.', LOG_LEVEL.DEBUG);
  
            const millwardBrown = bactm._asArray(rule['millwardBrown']);
            if (!millwardBrown) return false;
            millwardBrown.forEach(function (mb) {
                bactm.plugins.millwardBrown.initCampaign({
                    "campaignId": mb.campaignId,
                    "details": {
                        "bannerId": mb.bannerId,
                        "control": mb.control
                    }
                })
            });
        }

        /**
         * For pixel tag found in the rule
         *
         *
         * @private
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _firePixelTag = (el, rule) => {
            bactm._log(':: Custom Event :: Handle Pixel Tag.', LOG_LEVEL.DEBUG);
            const eventFired = el ? true : false;
  
            const pixel = bactm._asArray(rule['pixelTag']);
            if (!pixel) return false;

            const firePixelTagHandler = () => {
                pixel.forEach(function (p) {
                    bactm.plugins.pixelTag.firePixelTag(p.url, {
                        "eventFired": eventFired,
                        "cacheBuster": p.cb || true,
                        "startDt": p.startDt || null,
                        "endDt": p.endDt || null
                    });
                });
            }

            if (bactm?.plugins?.pixelTag?.firePixelTag) {
                firePixelTagHandler();
            } else {
                bactm.on('bactm.plugins.pixelTag.ready', firePixelTagHandler);
            }
        }

        /**
         * For each conversion event in the rule, create a conversion using bactm.conversion();
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _fireConversionEvent = (el, rule) => {
            bactm._log(':: Custom Event :: Handle Conversion Events.', LOG_LEVEL.DEBUG);
  
            const pageInfo = bactm._getPageInfo(getCurrentPageInfoArrayIndex(), getCurrentPageviewOptions());
            let eventName;
            const events = bactm._asArray(rule['conversions']);
            events.forEach(function (c) {
                eventName = handleDynamicCategory(c.eventName, pageInfo, c);
                eventName = sanitizeEventName(c.eventName, pageInfo, c.config);
                bactm.conversion({
                    eventName: eventName,
                    actionType: c.actionType,
                    category: c.category
                });
            });
        }

        /**
         * For each beacon event in the rule, fire a pixel for the beacon if the load rule is satisfied
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @param {string} target - The path to the boolean to indicate whether to fire
         * @returns {void}
         */
        const fireBeacon = (el, rule) => {
            try{
                bactm._log(':: Custom Event :: Handle Affliate Beacon Tag.', LOG_LEVEL.DEBUG);
                const beaconFlag = bactm.ddo.get('load_affiliateBeacon', false);
    
                if (beaconFlag) {
                    bactm.plugins.pixelTag.firePixelTag(rule['beacon'], {
                        "cacheBuster": true,
                        "startDt": null,
                        "endDt": null
                    });
                }
            } catch(err) {
                bactm.reportError(err);
            }
        }

        /**
         * Results in triggering a `fireCJ` event which will check whether
         * Commission Junction assets should load to the page
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const fireCJ = (el, rule) => {
            bactm._log(':: Custom Event :: Handle Commission Junction Tag.', LOG_LEVEL.DEBUG);
            bactm.trigger('fireCJ', rule['commissionJunction']);
        }

        /**
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _buildBactmEventTrace = (eventName) => {
            const pageInfoArrayIndex = getCurrentPageInfoArrayIndex();
            const pageInfo = digitalData?.page?.pageInfo?.[pageInfoArrayIndex] || digitalData?.page?.pageInfo?.[0] || {};

            return {
                pageID: pageInfo.pageID,
                requestedEvent: eventName
            };
        }

        const _fireBactmEvent = (el, rule) => {
            bactm._log(':: Custom Event :: Handle bactm event.', LOG_LEVEL.DEBUG);

            const bactmEvents = bactm._asArray(rule['bactm']);
            if (!bactmEvents) {
                bactm._log(':: Custom Event :: No bactm events found on rule.', LOG_LEVEL.DEBUG);
                return;
            }

            bactmEvents.forEach(function (bactmEvent) {
                if (!bactmEvent) {
                    bactm._log(':: Custom Event :: bactm event configuration missing.', LOG_LEVEL.WARN);
                    return;
                }

                let eventNameKey = null;
                if (Object.hasOwn(bactmEvent, 'event')) {
                    eventNameKey = 'event';
                }
                if (!eventNameKey && Object.hasOwn(bactmEvent, 'eventKey')) {
                    eventNameKey = 'eventKey';
                }
                if (!eventNameKey && Object.hasOwn(bactmEvent, 'action')) {
                    eventNameKey = 'action';
                }
                if (!eventNameKey && Object.hasOwn(bactmEvent, 'name')) {
                    eventNameKey = 'name';
                }
                const eventName = eventNameKey ? bactmEvent[eventNameKey] : undefined;
                if (!eventName || typeof eventName !== 'string') {
                    bactm._log(':: Custom Event :: Invalid bactm event name.', bactmEvent, LOG_LEVEL.ERROR);
                    return;
                }

                let detail = bactmEvent.data;

                if (Object.hasOwn(bactmEvent, 'detail')) {
                    detail = bactmEvent.detail;
                }

                const customEventName = eventName.startsWith('bactm.') ? eventName : 'bactm.' + eventName;
                const trace = _buildBactmEventTrace(customEventName);

                try {
                    const customEvent = new globalThis.CustomEvent(customEventName, {
                        detail: detail
                    });
                    customEvent.__bactmTrace = trace;

                    bactm._log(':: Custom Event :: Dispatching ' + customEventName + ' from DLE.', trace, LOG_LEVEL.DEBUG);

                    const dispatchResult = globalThis.dispatchEvent(customEvent);
                    if (!dispatchResult) {
                        bactm._log(':: Custom Event :: Dispatch returned false for ' + customEventName + '.', trace, LOG_LEVEL.WARN);
                        return;
                    }

                    bactm._log(':: Custom Event :: Successfully dispatched ' + customEventName + '.', trace, LOG_LEVEL.INFO);
                } catch (e) {
                    bactm._log(':: Custom Event :: Failed to dispatch ' + customEventName + '.', {
                        trace: trace,
                        error: e
                    }, LOG_LEVEL.ERROR);
                }
            });
        }

        /**
         * Loop over the rule.custom.to array and map the provider to the appropraite
         * handler function. Call the function.
         *
         * @private
         * @param {Node} el - Clicked element which matched the rule.
         * @param {object} rule - The matched rule with the data already inserted.
         * @returns {void}
         */
        const _handleCustom = (el, rule) => {
            const customEvents = bactm._asArray(rule.custom)
            customEvents.forEach(function (customEvent) {
                const localRule = customEvent;
                if (!customEvent || !customEvent.to) return;
  
                const customHandlers = {
                    'ga': (el, rule) => _fireGoogleAnalytics(el, rule, optStatus),
                    'cm': _fireCoremetricsManualLink
                };
  
                customEvent.to.forEach(function (provider) {
                    if (customHandlers[provider]) customHandlers[provider](el, localRule);
                });
            });
  
        }

        // ===========================================================================
        // End provider specific handlers.
        // ===========================================================================
  
        // ===========================================================================
        // Event Listener & Handler functions.
        // ===========================================================================
  
        /**
         * An event handler which can be attached to the document and processes all
         * rules for the element which was clicked.
         *
         * @private
         * @param {MouseEvent} event - The click event which to get its path.
         * @returns {void}
         */
        const _documentClickEventHandler = (e) => {
            bactm._log('Handling a click event on the document.', e, LOG_LEVEL.DEBUG);
  
            const path = _getEventPath(e);
            bactm._log('The path for the element clicked is:', path, LOG_LEVEL.DEBUG);
  
            const matches = path.filter(function (el) {
                const classes = typeof el.className === 'string' ? el.className.split(' ').filter(function (c) {
                    return c.length > 0;
                }) : [];
                const id = el.id || '';
  
                return classes.some(function (v) {
                    return classSelectors.indexOf(v) >= 0;
                }) || idSelectors.indexOf(id) > -1;
            });
  
            // no matches, exit as quickly as possible.
            if (matches.length <= 0) return;
  
            bactm._log('Matches found in DOM click path.', matches, LOG_LEVEL.DEBUG);
            matches.forEach(_processElementInPathMatch);
        }

        /**
         * Adds an event listener to the document capture phase with useCapture set to true.
         *
         * @private
         * @returns {void}
         */
        const _addDocumentClickEventListener = () => {
            bactm._log('Creating global click event listener.', LOG_LEVEL.DEBUG);

            // Check our flag to ensure the event listener hasn't been previously created.
            if (!clickEventListenerAdded) {
                document.addEventListener('click', _documentClickEventHandler, true);
                clickEventListenerAdded = true;
            }
        }

        /**
         * Adds an onBlur event listener to any rules in parsedRules.inputRules.
         *
         * @private
         * @returns {void}
         */
        const _addInputEventListeners = () => {
            if (parsedRules.delegationRules) {
                bactm._log('Creating event delegation on inputs.', LOG_LEVEL.DEBUG)
                _addEventDelegationListeners(parsedRules.inputRules, 'focusout')
            } else{
                bactm._log('Creating event listeners on inputs.', LOG_LEVEL.DEBUG);
                _addEventListeners(parsedRules.inputRules, 'focusout');
            }
            
        }
  
        /**
         * Adds an onChange event listener to any rules in parsedRules.selectRules.
         *
         * @private
         * @returns {void}
         */
        const _addSelectEventListeners = () => {
            if (parsedRules.delegationRules) {
                bactm._log('Creating event delegation on inputs.', LOG_LEVEL.DEBUG)
                _addEventDelegationListeners(parsedRules.selectRules, 'change')
            }else{
                bactm._log('Creating event listeners on select elements.', LOG_LEVEL.DEBUG);
                _addEventListeners(parsedRules.selectRules, 'change');
            }
            
        }
  
        /**
         * Adds hover event listener to any rules in parsedRules.hoverRules.
         *
         * @private
         * @returns {void}
         */
        const _addHoverEventListeners = () => {
            if (parsedRules.delegationRules) {
                bactm._log('Creating event delegation on inputs.', LOG_LEVEL.DEBUG)
                _addEventDelegationListeners(parsedRules.hoverRules, 'hover')
            }else{
                bactm._log('Creating event listeners on hover.', LOG_LEVEL.DEBUG);
                _addEventListeners(parsedRules.hoverRules, 'hover');
            }
            
        }

        const _addEventDelegationListeners  = (rules , event) => {
            if (!Array.isArray(rules)) return;
  
            rules.forEach(function (rule) {
                if (rule.id) {
                    const el = document.querySelector(rule.parent);
                    if (el && el.addEventListener) {
                        if (event === 'hover') {
                            _bindHoverEvent(el, rule);
                        } else {
                            el.addEventListener(event, function (e) {
                                if(e.target.id === rule.id){
                                 _processRulesAgainstElement(this, rule);
                                }
                            });
                        }
                    }
                } else if (rule.class) {
                    const elements = document.querySelector(rule.parent);
  
                    for (var i = 0, Len = elements.length || 0; i < Len; i++) {
                        var el = elements[i];
                        if (el.addEventListener) {
                            if (event === 'hover') {
                                _bindHoverEvent(el, rule);
                            } else {
                                el.addEventListener(event, function (e) {
                                    if(e.target.class === rule.class){
                                        _processRulesAgainstElement(this, rule);
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }

        /**
         * Finds any elements in the DOM that match the rule by ID or by class and adds
         * and event listener to each object in the DOM using the event type specified.
         *
         * @param {array} rules - An array of rules to loop over and find elements in the DOM.
         * @param {string} event - A valid event listener type.
         * @returns {void}
         */
        const _addEventListeners = (rules, event) => {
            if (!Array.isArray(rules)) return;
  
            rules.forEach(function (rule) {
                if (rule.id) {
                    const el = document.getElementById(rule.id);
                    if (el && el.addEventListener) {
                        if (event === 'hover') {
                            _bindHoverEvent(el, rule);
                        } else {
                            el.addEventListener(event, function (e) {
                                _processRulesAgainstElement(this, rule);
                            });
                        }
                    }
                } else if (rule.class) {
                    const elements = document.getElementsByClassName(rule.class);
  
                    for (var i = 0, Len = elements.length || 0; i < Len; i++) {
                        var el = elements[i];
                        if (el.addEventListener) {
                            if (event === 'hover') {
                                _bindHoverEvent(el, rule);
                            } else {
                                el.addEventListener(event, function (e) {
                                    _processRulesAgainstElement(this, rule);
                                });
                            }
                        }
                    }
                }
            });
        }

        /**
         * Adds two event listeners for the element for mouseover and mouseout
         * and calculates the duration of time the element was hovered over.
         *
         * @param {Node} el - Clicked element which matched the rule.
         * @param {array} rules - An array of rules to loop over and find elements in the DOM.
         * @returns {void}
         */
        const _bindHoverEvent = (el, rule) => {
            let storage = {};
            const tracker = {
                get: function (el) {
                    return storage[el + 'On'];
                },
                set: function (el, value) {
                    storage[el + 'On'] = value;
                },
                delete: function (el) {
                    delete storage[el + 'On'];
                }
            }
            const startHover = function (e) {
                tracker.set(this.id, Date.now());
            }
            const endHover = function (e) {
                const end = Date.now(),
                    start = tracker.get(this.id);
                if (end - start > 500) {
                    hoverDuration = (end - start);
                    _processRulesAgainstElement(el, rule);
                }
                tracker.delete(this.id);
  
            }
            el.addEventListener('mouseover', startHover);
            el.addEventListener('mouseout', endHover);
        }

        /**
         *
         */
        const _handleCustomEvent = (details) => {
            bactm._log('bactm.plugins.customEvents handling a customEvent.', LOG_LEVEL.DEBUG);
            if (typeof details === 'undefined' || typeof details.eventKey === 'undefined') return;
  
            const key = details.eventKey;
            const matchedRules = parsedRules.customRules.filter(function (rule) {
                return rule.el.indexOf(key + ':custom') === 0;
            });
  
            if (matchedRules.length === 0) return;
  
            matchedRules.forEach(function (rule) {
                _processRulesAgainstCustomData(rule, details);
            });
        }

        /**
         * Load the settings from the lookup table, parse the JSON and put into an array to work
         * with later.
         *
         * @private
         * @returns {void}
         */
        var _loadSettings = function () {
            bactm._log('Loading click handler settings.', LOG_LEVEL.DEBUG);
  
            // First try to get the settings from the datalayer enrichment: utag_data.customEventSettings
            // If nothing is found there, check for in the lookup table: utag_data.Custom_Event_Settings [deprecated]
            const settings = utag_data['customEventSettings'] || utag_data['Custom_Event_Settings'];
  
            if (!settings) return;
  
            try {
  
                if (typeof settings === 'string' && settings != "") settings = JSON.parse(settings);
  
                // Parse the JSON from the lookup table and map to breakout
                // in a way that is quicker to search once we have an object.
                allRules = bactm._asArray(settings).map(function (rule) {
                    const classSelectorLoc = rule.el.indexOf('.'),
                        idSelectorLoc = rule.el.indexOf('#'),
                        pseudoClassSelectorLoc = rule.el.indexOf(':'),
                        t = classSelectorLoc > -1 ? classSelectorLoc : idSelectorLoc,
                        r = pseudoClassSelectorLoc > -1 ? pseudoClassSelectorLoc : rule.el.length,
                        s = rule.el.substring(t, 1),
                        name = rule.el.substring(t + 1, r);
  
                    rule['id'] = '';
                    rule['class'] = '';
  
                    if (idSelectorLoc > -1) {
                        rule['id'] = name;
                        if (idSelectorLoc === 0) idSelectors.push(name);
                    }
  
                    if (classSelectorLoc > -1) {
                        rule['class'] = name;
                        if (classSelectorLoc === 0) classSelectors.push(name);
                    }
  
                    if (rule.custom) {
                        var customEvents;
                        if (typeof rule.custom !== Array) {
                            customEvents = bactm._asArray(rule.custom);
                        }
                        customEvents.forEach(function (customEvent) {
                            if (!customEvent.category) customEvent.category = '';
                            if (!customEvent.action) customEvent.action = '';
                            if (!customEvent.label) customEvent.label = '{{id}}_{{ca}}';
                        });
                        rule.custom = customEvents;
                    }
  
                    return rule;
                });
            } catch (e) {
                bactm._log('Unable to parse the custom event settings. Valid JSON is required.', LOG_LEVEL.ERROR);
                return;
            }
  
            // Reduce to objects that have a properly formatted 'el' property for clicks.
            parsedRules.clickRules = allRules.filter(function (rule) {
                var s = rule.el ? rule.el.substring(0, 1) : null;
                return s && acceptedSelectors.indexOf(s) > -1;
            });
  
            // Reduce to objects that need to attach to an input element.
            parsedRules.inputRules = allRules.filter(function (rule) {
                return rule.el.indexOf('input') === 0;
            });
  
            // Reduce to objects that need to attach to a select element.
            parsedRules.selectRules = allRules.filter(function (rule) {
                return rule.el.indexOf('select') === 0;
            });
  
            // Reduce to objects that need to attach to a hover element.
            parsedRules.hoverRules = allRules.filter(function (rule) {
                return rule.el.indexOf(':hover') > -1;
            });
  
            // Reduce to objects that need to attach to a hover element.
            parsedRules.scrollRules = allRules.filter(function (rule) {
                return rule.el.indexOf(':scroll') > -1;
            });
  
            // Reduce to objects that need to listen for a custom event.
            parsedRules.customRules = allRules.filter(function (rule) {
                return rule.el.indexOf(':custom') > -1;
            })

            // Reduce to objects that need to attach to an input element.
            parsedRules.delegationRules = allRules[0]?.eventDelegation;
  
            bactm._log('Settings ready:', parsedRules, LOG_LEVEL.DEBUG);
        }

        /**
         * Load the page level from the lookup table, parse the JSON and put into an array to work
         * with later.
         *
         * @private
         * @returns {void}
         */
        const _loadPageSettings = () => {
            bactm._log('Loading page level settings.', LOG_LEVEL.DEBUG);
            settings = utag_data['pageSettings'] || utag.globals.dle.data.pageSettings;
            if (typeof settings === 'string' && settings !== "")
                settings = JSON.parse(settings);
            if (typeof settings !== 'undefined')
                parsedRules.pageRules = bactm._asArray(settings);
        }

        /**
         * Function extracts the pageInfoArrayIndex of the current pageID by filtering through the dataCollector
         *
         * @private
         * @returns {Number} pageInfoArrayIndex
         */
        const getCurrentPageInfoArrayIndex = () => {
            if (!digitalData || !window.dataCollector) return;
            let dataCollectorCopy = [...window.dataCollector].reverse();
            dataCollectorCopy = dataCollectorCopy.filter(function (dataEvent) {
                return dataEvent.event === 'pageview';
            });
            return dataCollectorCopy[0].pageInfoKey !== undefined ? dataCollectorCopy[0].pageInfoKey : 0;
        }

        /**
         * Function extracts the options of the current pageview call by filtering through the dataCollector
         *
         * @private
         * @returns {object} options pageInfoArrayIndex
         */
        const getCurrentPageviewOptions = () => {
            if (!digitalData || !window.dataCollector) return;
            let dataCollectorCopy = [...window.dataCollector].reverse();
            dataCollectorCopy = dataCollectorCopy.filter(function (dataEvent) {
                return dataEvent.event === 'pageview';
            });
            return dataCollectorCopy[0].options ? dataCollectorCopy[0].options : 0;
        }

        /**
         * Mutates the utag_data object to reflect the current page's customEvent configuration
         *
         * @private
         * @returns {void}
         */
        const _updateUtagData = (pageInfoArrayIndex) => {
            if (!digitalData || !window.dataCollector) return;
  
            const pageInfoIndex = pageInfoArrayIndex || getCurrentPageInfoArrayIndex();
            const pageID = (pageInfoIndex && digitalData.page.pageInfo[pageInfoIndex]) ? digitalData.page.pageInfo[pageInfoIndex].pageID : digitalData.page.pageInfo[0].pageID;
  
            const siteSettings = dle['siteSettings'];
            const pageSettings = dle['pageSettings'][pageID];
            let sitePageSettings = {};
  
            for (key in pageSettings) {
                if (siteSettings.hasOwnProperty(key)) {
                    sitePageSettings[key] = pageSettings[key].concat(siteSettings[key]);
                } else {
                    sitePageSettings[key] = pageSettings[key];
                }
            }
  
            for (key in siteSettings) {
                if (!sitePageSettings.hasOwnProperty(key)) {
                    sitePageSettings[key] = siteSettings[key];
                }
            }
  
            if (sitePageSettings.customEventSettings) {
                utag_data.customEventSettings = sitePageSettings.customEventSettings;
            }
            utag_data.pageSettings = sitePageSettings;
        }

        // ===========================================================================
        // End Event Listener & Handler functions.
        // ===========================================================================
  
        // ===========================================================================
        // Helper functions.
        // ===========================================================================
  
        /**
         * This function handles appending information to a conversion event from a dynamically passed categoryID
         *
         * @private
         * @param {string} eventName - The base of the event name.
         * @param {object} pageInfo - The object containing the page level data for the current page.
         * @param {object} conversion - The object containing the configuration for the conversion event.
         * @returns {string} eventName - Complete with additional information appended if needed.
         * @todo update this method to take an option in the conversion.options to indicate that some piece of the category name is needed
         */
        const handleDynamicCategory = (eventName, pageInfo, conversion) => {
            pageInfo || bactm._getPageInfo(getCurrentPageInfoArrayIndex(), getCurrentPageviewOptions());
            if (conversion.actionType === 'complete' && pageInfo.category.indexOf("HL:APP:DMA") > -1 && eventName === "App Start to Submit") {
                eventName = "_" + pageInfo.category.split('_')[2] + " " + eventName;
            }
            return eventName;
        }

        /**
         * This function sanitizes event names for conversion events by appending the AppName in the appropriate place.
         *
         * @private
         * @param {string} eventName - The base of the event name.
         * @param {object} pageInfo - The object containing the page level data for the current page.
         * @param {object} options - Optional configuration object.
         * @returns {string} eventName - Complete with additional information appended if needed.
         */
        const sanitizeEventName = (eventName, pageInfo, options) => {
            let appName = pageInfo.appName || '';
            if (options.appNameOverride) {
                appName = options.appNameOverride;
            }
            if (eventName.indexOf('_') === 0) {
                eventName = appName + eventName;
            } else {
                eventName = appName + ' ' + eventName;
            }
            return eventName;
        }

        /**
         * Take a string, loop over the data provided and replace any instances in the
         * string of the data key wrapped in curly braces with the value in the data object.
         *
         * @private
         * @param {string} s - String value to search and insert data from the data object.
         * @param {object} data - Data used to replace variable references in the string.
         * @returns {string} Value with the replaced data elements.
         */
        const _insertData = (s, data) => {
            if (s.indexOf('{{') === -1 || s.indexOf('}}') === -1) return s;
  
            for (var d in data) {
                if (data.hasOwnProperty(d)) {
                    s = s.replace('{{' + d + '}}', data[d]);
                }
            }
  
            return s;
        }

        /**
         * Recursively loop through all properties on the rule and replace any variables
         * with the data provided in the data object.
         *
         * @private
         * @param {object} rule - The entire rule to be parsed and modified.
         * @param {object} data - Data used to replace variable references in the rule properties.
         * @returns {void}
         */
        const _formatRuleWithData = (rule, data) => {
            for (var r in rule) {
                if (rule.hasOwnProperty(r)) {
                    if (typeof rule[r] === 'string') rule[r] = _insertData(rule[r], data);
                    else if (typeof rule[r] === 'object') _formatRuleWithData(rule[r], data);
                }
            }
        }
  
        /**
         * Return a data object which captures data from the provided element.
         *
         * @private
         * @param {Node} el - HTML element to use as the source for the data object.
         * @returns {object} A data object with properties from the provided element.
         */
        const _getDataFromElement = (el) => {
            return {
                'id': el.id || '',
                'url': el.href || '',
                'ca': el.getAttribute('data-bactmln') || el.getAttribute('data-bactm-ca') || '',
                'ca[0]': (el.getAttribute('data-bactmln') && el.getAttribute('data-bactmln').split('-_-').length > 2) ? el.getAttribute('data-bactmln').split('-_-')[0] : '',
                'ca[1]': (el.getAttribute('data-bactmln') && el.getAttribute('data-bactmln').split('-_-').length > 2) ? el.getAttribute('data-bactmln').split('-_-')[1] : '',
                'ca[2]': (el.getAttribute('data-bactmln') && el.getAttribute('data-bactmln').split('-_-').length > 2) ? el.getAttribute('data-bactmln').split('-_-')[2] : '',
                'val': el.value ? _sanitizeWhitespace(el.value) : '',
                'ht': hoverDuration
            }
        }

        /**
         * Calls all provider handlers required by the rules.
         *
         * @private
         * @param {object} ruleWithData - The entire matched rule with data variables already replaced.
         * @returns {void}
         */
        const _processRule = (ruleWithData, el) => {
            bactm._log('Rule with data:', ruleWithData, LOG_LEVEL.DEBUG);
  
            const ruleHandlers = {
                'bactm': _fireBactmEvent,
                'custom': _handleCustom,
                'ga': _fireGoogleAnalyticsPageview,
                'dart': _fireDART,
                'conversions': _fireConversionEvent,
                'millwardBrown': _fireMillwardBrown,
                'pixelTag': _firePixelTag,
                'bingUET': _fireBingUET,
                'scenarios': processScenarios,
                'beacon': fireBeacon,
                'commissionJunction': fireCJ,
            }
  
            for (var r in ruleWithData) {
                if (ruleWithData.hasOwnProperty(r) && ruleHandlers[r]) ruleHandlers[r](el, ruleWithData, optStatus);
            }
        }
        /**
         * Takes the matched rule, replaces any variables found in string properties using
         * data from the matched element, and calls all provider handlers required by the rules.
         *
         * @private
         * @param {object} rule - The entire matched rule.
         * @param {bool} warmup - Is this just a warmup call? If true, no providers will be called.
         * @returns {void}
         */
        const _processRulesForPage = () => {
            const rulesToFire = bactm._asArray(parsedRules.pageRules)
  
            rulesToFire.forEach(function (rule) {
                bactm._log('rule to fire:', rule, LOG_LEVEL.DEBUG);
                var localRule = JSON.parse(JSON.stringify(rule));
                _processRule(localRule, null);
            });
        }

        /**
         * Takes the matched rule, replaces any variables found in string properties using
         * data from the matched element, and calls all provider handlers required by the rules.
         *
         * @private
         * @param {Node} el - HTML element to use as the source for the data object.
         * @param {object} rule - The entire matched rule.
         * @param {bool} warmup - Is this just a warmup call? If true, no providers will be called.
         * @returns {void}
         */
        const _processRulesAgainstElement = (el, rule, warmup) => {
            // Make a local copy of our rule object so we can process it against this
            // element's data and pass it along to our providers without modifying
            // the underlining rule object.
            const localRule = JSON.parse(JSON.stringify(rule));
  
            const data = _getDataFromElement(el);
            _formatRuleWithData(localRule, data);
  
            // If we are running this just to "warm up" the JIT compiler, we are done here.
            if (warmup) return;
  
            _processRule(localRule, el);
        }
  
        /**
         * Processes the matched element from the click path and determines which rules need to
         * fire based on element's ID and/or class. Calls to process each rule it matches to.
         *
         * @private
         * @param {Node} el - The HTML element which was found in the path to match one or more of the rules.
         * @returns {void}
         */
        const _processElementInPathMatch = (el) => {
            bactm._log('Processing rules for:', el, LOG_LEVEL.DEBUG);
            const classes = typeof el.className === 'string' ? el.className.split(' ').filter(function (c) {
                return c.length > 0;
            }) : [];
            const id = el.id || '';
            const rulesToFire = parsedRules.clickRules.filter(function (rule) {
                return classes.indexOf(rule.class) > -1 || (rule.id && rule.id === id)
            });
  
            rulesToFire.forEach(function (rule) {
                bactm._log('rule to fire:', rule, LOG_LEVEL.DEBUG);
                _processRulesAgainstElement(el, rule);
            });
        }

        /**
         *
         * @private
         * @param {object} rule
         * @param {object} details
         * @returns {void}
         */
        const _processRulesAgainstCustomData = (rule, details) => {
            // Make a local copy of our rule object so we can process it against this
            // element's data and pass it along to our providers without modifying
            // the underlining rule object.
            const localRule = JSON.parse(JSON.stringify(rule));
  
            let data = {};
            for (var key in details) {
                data['c.' + key] = typeof details[key] === 'string' ? details[key] : JSON.stringify(details[key]);
            }
  
            _formatRuleWithData(localRule, data);
            _processRule(localRule);
        }
  
        /**
         * During testing, it was discovered parsing the data templates for each element was slow
         * on first run (~0.2 - ~0.3 milliseconds). By running a "dummy" element through the functions
         * on page load, we are able to "warm up" the JavaScript JIT compiler so subsaquent calls
         * are much faster (~0.02 - ~0.04 milliseconds). Because this all needs to happen as quickly
         * as possible when an element is clicked, every 0.01 of a millisecond is vital.
         *
         * @private
         * @returns {void}
         */
        const _warmUp = () => {
            const el = document.getElementsByTagName('a')[0];
            const rule = parsedRules.clickRules[0];
            if (el && rule) _processRulesAgainstElement(el, rule, true);
        }

        /**
         * Accepts a click event and returns the DOM path of that event.
         *
         * @private
         * @param {MouseEvent} event - The click event which to get its path.
         * @returns {array} path
         */
        const _getEventPath = (event) => {
            let path = [];
            let target = event.target;
  
            while (target.parentNode) {
                path.push(target);
                target = target.parentNode;
            }
  
            return path;
        }
  
        /**
         * Receives a string and returns a string without any whitespace.
         *
         * @private
         * @param {string} value - A string value to have whitespace removed from.
         * @returns {string} value
         */
        const _sanitizeWhitespace = (value) => {
            return value.replace(/\s/g, '');
        }
  
        /**
         */
        const _addScrollListeners = () => {
            bactm._log('Creating event listeners on scroll.', LOG_LEVEL.DEBUG);
            document.addEventListener('scroll', _trackScroll);
        };

        /**
         *
         * @param {number} percentageScrolled
         */
        const _fireScrollTag = (percentageScrolled) => {
            if (!hasScrollTagFired[percentageScrolled]) {
                bactm._log('bactm.plugins.customEvents handling a scroll event @ ' + percentageScrolled, LOG_LEVEL.DEBUG);
                parsedRules.scrollRules.forEach(function (rule) {
                    // slice scrollRules at :, then run string replacement for depth, then check that value against percentageScrolled
                    if (parseInt(rule.el.split(':')[0].replace('depth', ''), 10) === percentageScrolled) {
                        _processRulesAgainstCustomData(rule, {
                            eventKey: "scroll" + percentageScrolled
                        });
                    }
                });
                hasScrollTagFired[percentageScrolled] = true;
            }
        }
  
        /**
         * Tracks scrolling on page.
         * @param {MouseEvent} event
         */
  
        const _trackScroll = (event) => {
            const clientY = Math.ceil(window.pageYOffset + window.innerHeight);
            const documentLength = Math.max(document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
            let percentageScrolled;
            if (documentLength > 0) {
                percentageScrolled = clientY / documentLength;
            } else {
                percentageScrolled = NaN;
            }
  
            if (percentageScrolled >= .25) {
                _fireScrollTag(25);
            }
            if (percentageScrolled >= 0.50) {
                _fireScrollTag(50);
            }
            if (percentageScrolled >= 0.75) {
                _fireScrollTag(75);
            }
            if (percentageScrolled >= 1) {
                _fireScrollTag(100);
            }
            if (isNaN(percentageScrolled)) {
                bactm.log('bactm.plugin.customEvents scroll tracking percentage NaN', LOG_LEVEL.ERROR);
            }
        }

        /**
         * This function processes custom dimensions and adds them to page level tagging
         * @requires digitalData.page.attributes.gaCustomDimension does nothing otherwise
         * @returns {Object} with the custom dimensions mapped according to the Google Analytics Documentation
         */
        const customDimensions = () => {
            if (digitalData.page.attributes.gaCustomDimension) {
                let cdValue = 1;
                let gaCDObject = {};
                for (val in digitalData.page.attributes.gaCustomDimension) {
                    if (cdValue <= 20) {
                        const key = (digitalData.page.attributes.gaCustomDimension[val].indexOf('digitalData') > -1) ? digitalData.page.attributes.gaCustomDimension[val].replace('digitalData.', '') : digitalData.page.attributes.gaCustomDimension[val];
                        let customDimension = bactm.ddo.get(key, "Nothing Here");
                        customDimension = sanitizeDimension(customDimension, key);
                        if (customDimension !== "Nothing Here") {
                            const cdProp = 'dimension' + cdValue;
                            gaCDObject[cdProp] = customDimension;
                            cdValue++;
                        }
                    } else {
                        break;
                    }
                }
                return gaCDObject;
            }
            else return undefined;
        }

        /**
         * This function performs some business mapping to ensure that custom dimension values are strings
         * @param {*} dimension
         * @param {String} key
         * @returns {String} the dimension either mapped to a business friendly string or simply converted to a string
         */
        const sanitizeDimension = (dimension, key) => {
            if (typeof dimension === "boolean" || typeof dimension === "number") {
                switch (key) {
                    case 'user.authenticated':
                        return (dimension === true) ? 'authenticated' : 'unauthenticated';
                    default:
                        return dimension.toString();
                }
            } else {
                return dimension;
            }
        }

        // ===========================================================================
        // End helper functions.
        // ===========================================================================
  
        /**
         * Initialization function fired as soon as library loads.
         * @private
         * @returns {void}
         */
        const _init = () => {
            bactm._log('bactm.plugins.customEvents v' + version + ' initializing.', LOG_LEVEL.INFO);
            if (utag_data['siteSettings'] || utag.globals.dle.data.siteSettings) {
                dle.pageSettings = utag_data['pageSettings'] || utag.globals.dle.data.pageSettings;
                dle.customEventSettings = utag_data['customEventSettings'];
                dle.siteSettings = utag_data['siteSettings'] || utag.globals.dle.data.siteSettings;
                dle.attributes = utag_data['attributes'] || utag.globals.dle.data.attributes;
            }
            bactm.on('initDLEValues', function () {
                if (utag_data['siteSettings'] || utag.globals.dle.data.siteSettings) {
                    _updateUtagData();
                }
                _loadSettings();
                _loadPageSettings();
  
                if (parsedRules.clickRules && parsedRules.clickRules.length > 0) {
                    bactm.ready(_warmUp);
                    bactm.ready(_addDocumentClickEventListener);
                }
  
                if (parsedRules.inputRules && parsedRules.inputRules.length > 0) {
                    bactm.ready(_addInputEventListeners);
                }
  
                if (parsedRules.selectRules && parsedRules.selectRules.length > 0) {
                    bactm.ready(_addSelectEventListeners);
                }
  
                if (parsedRules.hoverRules && parsedRules.hoverRules.length > 0) {
                    bactm.ready(_addHoverEventListeners);
                }
  
                if (parsedRules.customRules && parsedRules.customRules.length > 0) {
                    bactm.on('customEvent', _handleCustomEvent);
                }
  
                if (parsedRules.scrollRules && parsedRules.scrollRules.length > 0) {
                    bactm.ready(_addScrollListeners);
                }
  
                if (parsedRules.pageRules) {
                    bactm.ready(_processRulesForPage);
                }
            });
        }

        /**
         * Initialize our plugin on library load.
         */
        _init();
  
        /**
         * Functions to return publicly.
         */
        return {};
  
    }, optStatus);
  };
  
  
  bactm.on('plugins:OneTrust:C0002:CustomEvents', _initCustomEvents);
  
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
            //u.loader({"type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : 'utag_80' });
            //u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_80' });
          //} else {
            //u.loader_cb();
          //}

          //u.loader({"type" : "img", "src" : u.data.base_url + c.join(u.data.qsp_delim) });

        /* End Loader Function Call */


        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })("80", "bofa.olb");
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

