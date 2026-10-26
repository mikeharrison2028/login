//~~tv:20010.20140827
//~~tc: Tealium Custom Container

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

    // Start Tealium loader 4.32
    // Please do not modify
    if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {'view' : 1};

    u.initialized = false;

      u.map={};
  u.extend=[function(a,b){ try{ if(1){b['reportURI']='https://glassbox-hlx-igw.bankofamerica.com/glassbox/reporting/aab600df-ed6d-5f46-dada-9c5376520067/cls_report'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){b['reportURI']='https://glassbox-hlx-igw.bankofamerica.com/glassbox/reporting/aab600df-ed6d-5f46-dada-9c5376520067/cls_report'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
(function (parent, name, context, definition) {
  // Check if is used inside a "modern" browser, if not, return
  if (!context || !context[parent] || !Array.prototype.filter) {
    return;
  }
  context[parent]['plugins'][name] = definition();
})('bactm', 'glassbox', typeof window !== 'undefined' ? window : null, function () {
  try {
    const parent = 'bactm',
      ba = window[parent],
      version = '3.1.0',
      ddo = window.digitalData,
      udo = b,
      LOG_LEVEL = {
        OFF: 10,
        FATAL: 5,
        ERROR: 4,
        WARN: 3,
        INFO: 2,
        DEBUG: 1
      };
    if (!ddo) return;

    /**
      * Glassbox Integration Script
      *
      * This script dynamically loads Glassbox configuration and source code based on the current environment and page context.
      * It uses async/await to ensure configurations are loaded in the correct order, with robust error handling and fallback logic.
      *
      * @module GlassboxIntegration
    */

    /**
      * Environment constants and configuration.
      * Determines Glassbox domains, source URLs, and environment flags.
    */
    const glassboxObjInDdo = ddo?.page?.attributes?.glassbox || {};
    const gbInfo = {
      sourceCode: '/detector/common/current7/detector-bootstrap.min.js',
      prod: {
        domain: 'https://glassbox-hlx-igw.bankofamerica.com',
        mapSrc: '/detector/conf/vtim/prodGbProfileMap.js',
        hash: 'sha384-zqmYsAZbp/W6HFYEW6u4wSC6F4G/WjhOJZaoYiTQvQDQ5B+z9PpzK5TMceQerosS',
      },
      notprod: {
        domain: 'https://glassbox-hlx-igw-np.bankofamerica.com',
        mapSrc: '/detector/conf/vtim/notProdGbProfileMap.js',
        hash: 'sha384-xTNJzJZohHnYS7lVr/6qhxWahblusBTVcdhIFCSwxTRN73iNhAMCX8vCX31D/JfA',
      }
    };
    const { tealium_profile, tealium_environment } = window.utag_data;
    const prodRegexer = /^(review)?prod\d?$/;
    const isProd = prodRegexer.test(tealium_environment) ? true : false;
    const glassboxDomain = isProd ? gbInfo.prod.domain : gbInfo.notprod.domain;
    // Use bactm to get the correct codebase URL for Glassbox source code
    const glassboxSourceCodeSrc = glassboxDomain + gbInfo.sourceCode;
    const glassboxSourceIntegrity = isProd ? gbInfo.prod.hash : gbInfo.notprod.hash;
    const glassboxProfileMapSrc = glassboxDomain + (isProd ? gbInfo.prod.mapSrc : gbInfo.notprod.mapSrc);

    const ddoDeclaredGlassboxProfileName = glassboxObjInDdo?.gbProfile !== undefined ? glassboxObjInDdo?.gbProfile : null;

    // Default config
    window._cls_config = {
      domRecordEnabled: false,
      domTamperingGraceTime: 5000,
      reportURI: udo.reportURI,
      interceptAjax: true,
      ajaxRecordMetadata: "always",
      ajaxRecordRequestBody: "never",
      ajaxRecordRequestHeaders: "always",
      ajaxRecordResponseBody: "never",
      ajaxRecordResponseHeaders: "always",
      ajaxRecordStats: "always",
      ajaxCaptureRequestCookie: true,
      ajaxResponseBodyMaxLength: -1,
      ajaxMaskRequestBody:
        [
          {
            predicate: "always",
            transformations:
              [
                { type: "jsonfield", search: "dateOfBirth", replace: "XXXXX" },
                { type: "jsonfield", search: "newPassword", replace: "XXXXX" },
                { type: "jsonfield", search: "securityPin", replace: "XXXX" },
                { type: "jsonfield", search: "answer", replace: "XXXX" },
                { type: "jsonfield", search: "pin", replace: "XXXX" },
                { type: "jsonfield", search: "displayId", replace: "XXXX" },
                { type: "jsonfield", search: "taxId", replace: "XXXX" },
                { type: "jsonfield", search: "id", replace: "XXXX" },
                { type: "jsonfield", search: "tin", replace: "XXXX" },
                { type: "jsonfield", search: "accountNumber", replace: "XXXX" },
                { type: "jsonfield", search: "accountnumber", replace: "XXXX" },
                { type: "jsonfield", search: "debitCardAccountNumber", replace: "XXXX" },
                { type: "jsonfield", search: "debitCardExpMonth", replace: "XXXX" },
                { type: "jsonfield", search: "debitCardExpYear", replace: "XXXX" },
                { type: "jsonfield", search: "debitCardCVV", replace: "XXXX" },
                { type: "jsonfield", search: "birthDateDisplay", replace: "XXXX" }
              ]
          }
        ],
      ajaxMaskResponseBody:
        [
          {
            predicate: "always",
            transformations:
              [
                { type: "jsonfield", search: "dateOfBirth", replace: "XXXXX" },
                { type: "jsonfield", search: "newPassword", replace: "XXXXX" },
                { type: "jsonfield", search: "securityPin", replace: "XXXX" },
                { type: "jsonfield", search: "answer", replace: "XXXX" },
                { type: "jsonfield", search: "pin", replace: "XXXX" },
                { type: "jsonfield", search: "displayId", replace: "XXXX" },
                { type: "jsonfield", search: "taxId", replace: "XXXX" },
                { type: "jsonfield", search: "id", replace: "XXXX" },
                { type: "jsonfield", search: "tin", replace: "XXXX" },
                { type: "jsonfield", search: "number", replace: "XXXX" },
                { type: "jsonfield", search: "accountNumber", replace: "XXXX" },
                { type: "jsonfield", search: "accountnumber", replace: "XXXX" },
                { type: "jsonfield", search: "fromAccountNum", replace: "XXXX" },
                { type: "jsonfield", search: "formattedAccountNumber", replace: "XXXX" },
                { type: "jsonfield", search: "routingNumber", replace: "XXXX" },
                { type: "jsonfield", search: "wireRoutingNumber", replace: "XXXX" },
                { type: "jsonfield", search: "displayId", replace: "XXXX" },
                { type: "jsonfield", search: "taxIDNumber", replace: "XXXX" },
                { type: "jsonfield", search: "birthDateDisplay", replace: "XXXX" }
              ]
          }
        ],
      /* END ajax */
      /* BEGIN behavior */
      idleEventTimeInterval: -1,
      iframesAutoInject: true,
      recordHovers: true,
      recordMouseMoves: true,
      recordScrolls: true,
      reportToStorageAfterUnload: true,
      /* END behavior */
      /*BEGIN MASKING*/
      //Value Masking (INPUT)
      valueMaskingMode: "whitelist",
      maskWhitelistValueById: [],
      maskBlacklistValueById: [],
      maskWhitelistValueByClass: ["gb_unmask"],
      maskBlacklistValueByClass: ["gb_mask"],
      valueWhitelistMaskSimpleSelector: [],
      valueBlacklistMaskSimpleSelector: [],
      //DOM Masking
      domMaskingMode: "blacklist",
      domWhitelistMaskContentById: [],
      domBlacklistMaskContentById: [],
      domWhitelistMaskContentByClass: ["gb_unmask"],
      domBlacklistMaskContentByClass: ["gb_mask"],
      domWhitelistMaskSimpleSelector: [],
      domBlacklistMaskSimpleSelector:
        [
          "#ssn",
          "#ssNumber",
          "img[src^='https://smetrics'\]",
          ".gis-mask", ".tl-private",
          ".gis-mask-original",
          ".gis-mask-input",
          ".gis-mask-value",
          "[data-field-type='mmddyyyy']",
          "[data-field-type= 'ssn']",
          '[data-field-type="email"]',
          '[data-field-type="phonePrefill"]',
          '[data-field-type="phone"]',
          '[data-field-type="date"]',
          ".gis-masked",
          ".gis-masking",
          "#zz_ssn",
          "#zz_ssn_show",
          "#account_number_masked_gen3"
        ],
      /*END MASKING*/
      /* BEGIN extra */
      captureGlobalObjects: [],
      clientAttributesEnabled: true,
      clientAttributeMaxLength: 500,
      resourcesRecordEnabled: true,
      domIncludeCSSSelector: true,
      // resource recording
      resourcesRecordEnabled: true,
      resourceRecordCssOnly: false, //set to false to enable all resouce recording
      resourcesRecordCount: 1, // max 5
      resourcesRecordChance: 0.5, // between 0-1 def:0.5
      resourcesRecordAllowCors: false, //defalut false
      /* Struggle Recording start*/
      collectStruggles: true,
      collectFormStruggles: true,
      /* Struggle Recording end*/
      /* BEGIN page performance */
      resourceTimingRecordEnabled: true,
      resourceTimingRecordEnabledByChance: 0.05,
      webVitalsRecordEnabled: true,
      /* END page performance */

      /* BEGIN exposure */
      recordScrollReach: true,
      /* END exposure */

      /* BEGIN form tracking IM */
      domFormAnalysisReporting: true,
      domFormValidationTracking: true,
      /* END form tracking IM */

      /* BEGIN window property */
      pageAttributesEnabled: true,
      /* END window property */
      /* END extra */
      /* END Configuration */
    };

    // ---------- START Common Utilities ----------

    /**
      * Creates and injects a script tag into the document head.
      * Ensures the script is only added once per ID.
      *
      * @function _createAndInjectScriptTag
      * @param {String} id - The id attribute for the script tag.
      * @param {String} src - The src attribute for the script tag.
      * @param {String} integrity - The integrity attribute for the script tag.
      * @returns {Promise<void>} Resolves when the script loads, rejects on error.
    */
        const _createAndInjectScriptTag = function (id, src, integrity = null) {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          return resolve()
        }
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.type = 'text/javascript';
        if (integrity) {
          script.integrity = integrity;
          script.crossOrigin = 'anonymous';
        }
        script.onload = () => resolve();
        script.onerror = err => reject(err);
        document.head.appendChild(script);
      });
    };

    /**
      * Parses a URL into its domain and URI segments.
      *
      * @function _parseUrl
      * @param {String} url - The URL to parse.
      * @returns {Object} An object with 'domain' (String) and 'segments' (Array of Strings).
    */
    const _parseUrl = function (url) {
      const urlObj = new URL(url);
      const domain = urlObj.origin;
      const segments = urlObj.pathname.split('/').filter(Boolean);
      const queryParams = urlObj.search.split('&').filter(Boolean);
      return { domain, segments, queryParams };
    };

    // ---------- END Common Utilities ----------

    // ---------- START GB Utilities ----------

    /**
      * Maps the current URL to a Glassbox profile name using the profile map.
      *
      * @function _getProfileNameFromProfileMap
      * @returns {String|null} The derived profile name, or null if not found.
    */
    const _getProfileNameFromProfileMap = function () {
      const { domain, segments, queryParams } = _parseUrl(window.location.href);
      const profileMap = window.vtimConfigs.glassbox?.profileMap || {};
      if (!profileMap) return null;
      let node = profileMap[domain];
      let lastConfig = node ? node.config : null;

      for (const segment of segments) {
        if (!node || !node.children) break;
        node = node.children[segment] || node.children['*'] || null;
        if (node?.config) lastConfig = node.config;
      };

      for (const queryParam of queryParams) {
        if (!node || !node.children)
              break;
        if (!node?.children?.[queryParam] && !node.children['*']) {
              continue;
        }
        node = node.children[queryParam] || node.children['*'];
        if (node?.config) lastConfig = node.config;
      };

      return lastConfig;
    };

    /**
      * Merges an override object into the current Glassbox config.
      *
      * @function _updateClsConfig
      * @param {Object} overrideObject - The object to merge into window._cls_config.
    */
    const _updateClsConfig = (overrideObject) => {
      window._cls_config = Object.assign(window._cls_config, overrideObject);
    };

    /**
      * Ensures the glassbox config object exists in the DDO, initializing as needed.
      *
      * @function _initGlassboxObjedctInDdo
      * @returns {Object} The initialized glassbox config object.
    */
    const _initGlassboxObjectInVtimConfigs = () => { 
      
      // Ensure primary vtimConfigs storage exists
      window.vtimConfigs = window.vtimConfigs || {};
      window.vtimConfigs.glassbox = window.vtimConfigs.glassbox || {};
      window.vtimConfigs.glassbox.config = window.vtimConfigs.glassbox.config || {};

      return window.vtimConfigs.glassbox;
    };

    /**
     * Removes all dynamically injected Glassbox config scripts from the DOM,
     * except for the main Glassbox source code script.
     * 
     * Config scripts are identified by IDs starting with '_glassbox_config-' or 'gb_profile-map'
     * The Glassbox source code script (e.g., id="_cls_injector") is not removed.
     * 
     * Note for debugging: once the scripts are removed from the DOM they will no longer be searchable and
     * will be removed from the sources panel. You can still access all scripts form the network panel.
     * Search for "glassbox" to see all scripts loaded for that instance.
     * 
     * @function _cleanupGlassboxConfigScripts
     * @returns {void}
     */
    const _cleanupGlassboxConfigScripts = () => {
      const scripts = document.querySelectorAll('script[id^="_glassbox_config-"], script#gb_profile-map');
      scripts.forEach(script => script.parentNode.removeChild(script));
    }

    // ---------- END GB Utilities ----------

    /**
      * Initializes the Glassbox integration.
      * Loads the profile map, determines the profile name, loads the corresponding config,
      * and finally loads the Glassbox source code. All steps use async/await with error handling.
      *
      * @function _init
      * @returns {void}
    */
    const _init = async function () {
      ba._log('glassbox plugin v' + version + ' initializing.', LOG_LEVEL.INFO);

      // Set initial value for ddo.page.attributes.glassbox.config.
      // The value of ...glassbox.config will be modified frequently as more configs are sourced to the page.
      let configObject = _initGlassboxObjectInVtimConfigs();
      // After each update we merge it's value into the current state of window._cls_config
      _updateClsConfig(configObject.config);

      try {
        try {
          await _createAndInjectScriptTag('gb_profile-map', glassboxProfileMapSrc);
        } catch (err) {
          bactm.log('Glassbox: unable to load profile map. Checking for pre-defined profile name in DDO', LOG_LEVEL.WARN);
        }

        // map page to profile name and fetch config.js
        const profileName = _getProfileNameFromProfileMap();
        if (profileName) {
          const scriptSrc = glassboxDomain + '/detector/conf/' + profileName + '/config.js';
          try {
            await _createAndInjectScriptTag('_glassbox_config-' + profileName, scriptSrc);
            _updateClsConfig(window.vtimConfigs.glassbox.config || {});
          } catch (err) {
            bactm.log('Glassbox: error loading config from src: ' + scriptSrc, LOG_LEVEL.WARN);
          }
        }

        // Check for ddo defined profile name and fetch config or return immediately
        if (ddoDeclaredGlassboxProfileName) {
          const scriptSrc = glassboxDomain + '/detector/conf/' + ddoDeclaredGlassboxProfileName + '/config.js';
          try {
            await _createAndInjectScriptTag('_glassbox_config-' + ddoDeclaredGlassboxProfileName, scriptSrc);
            _updateClsConfig(window.vtimConfigs.glassbox.config || {});
          } catch (err) {
            bactm.log('Glassbox: error loading config from src: ' + scriptSrc, LOG_LEVEL.WARN);
          }
        }
      } finally {
        // Remove all non functional glassbox scripts from the DOM
        _cleanupGlassboxConfigScripts();
        // Allow GBE team to disable glassbox on the page. If not we will always load Glassbox to the page.
        if (window.vtimConfigs.glassbox.disable) return;

        try {
          await _createAndInjectScriptTag('_cls_injector', glassboxSourceCodeSrc, glassboxSourceIntegrity);
          bactm.log('Glassbox: initialization complete', LOG_LEVEL.INFO);
        } catch (err) {
          bactm.log('Glassbox: error initializing source code', LOG_LEVEL.ERROR);
        }
      }
    };
    /**
     * Initialize our plugin on library load.
     */
    _init();

    /**
     * Functions to return publicly.
     */
    return { init: _init };
  } catch (e) {
    bactm.reportError(e)
  }

});
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
            //u.loader({"type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : 'utag_28' });
            //u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_28' });
          //} else {
            //u.loader_cb();
          //}

          //u.loader({"type" : "img", "src" : u.data.base_url + c.join(u.data.qsp_delim) });

        /* End Loader Function Call */


        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })("28", "bofa.olb");
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

