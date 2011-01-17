/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: nightly
*/
YUI.add('jsonp', function(Y) {

var isFunction = Y.Lang.isFunction;

/**
 * <p>Provides a JSONPRequest class for repeated JSONP calls, and a convenience
 * method Y.jsonp(url, callback) to instantiate and send a JSONP request.</p>
 *
 * <p>Both the constructor as well as the convenience function take two
 * parameters: a url string and a callback.</p>
 *
 * <p>The url provided must include the placeholder string
 * &quot;{callback}&quot; which will be replaced by a dynamically
 * generated routing function to pass the data to your callback function.
 * An example url might look like
 * &quot;http://example.com/service?callback={callback}&quot;.</p>
 *
 * <p>The second parameter can be a callback function that accepts the JSON
 * payload as its argument, or a configuration object supporting the keys:</p>
 * <ul>
 *   <li>on - map of callback subscribers
 *      <ul>
 *         <li>success - function handler for successful transmission</li>
 *         <li>failure - function handler for failed transmission</li>
 *         <li>timeout - function handler for transactions that timeout</li>
 *      </ul>
 *  </li>
 *  <li>format  - override function for inserting the proxy name in the url</li>
 *  <li>timeout - the number of milliseconds to wait before giving up</li>
 *  <li>context - becomes <code>this</code> in the callbacks</li>
 *  <li>args    - array of subsequent parameters to pass to the callbacks</li>
 *  <li>allowCache - use the same proxy name for all requests? (boolean)</li>
 * </ul>
 *
 * @module jsonp
 * @class JSONPRequest
 * @constructor
 * @param url {String} the url of the JSONP service
 * @param callback {Object|Function} the default callback configuration or
 *                                   success handler
 */
function JSONPRequest() {
    this._init.apply(this, arguments);
}

JSONPRequest.prototype = {
    /**
     * Number of requests currently pending responses.  Used by connections
     * configured to allowCache to make sure the proxy isn't deleted until
     * the last response has returned.
     *
     * @property _requests
     * @private
     * @type {Number}
     */
    _requests: 0,

    /**
     * Set up the success and failure handlers and the regex pattern used
     * to insert the temporary callback name in the url.
     *
     * @method _init
     * @param url {String} the url of the JSONP service
     * @param callback {Object|Function} Optional success callback or config
     *                  object containing success and failure functions and
     *                  the url regex.
     * @protected
     */
    _init : function (url, callback) {
        this.url = url;

        // Accept a function, an object, or nothing
        callback = (isFunction(callback)) ?
            { on: { success: callback } } :
            callback || {};

        var subs = callback.on || {};

        if (!subs.success) {
            subs.success = this._defaultCallback(url, callback);
        }

        // Apply defaults and store
        this._config = Y.merge({
                context: this,
                args   : [],
                format : this._format,
                allowCache: false
            }, callback, { on: subs });
    },

    /** 
     * Override this method to provide logic to default the success callback if
     * it is not provided at construction.  This is overridden by jsonp-url to
     * parse the callback from the url string.
     * 
     * @method _defaultCallback
     * @param url {String} the url passed at construction
     * @param config {Object} (optional) the config object passed at
     *                        construction
     * @return {Function}
     */
    _defaultCallback: function () {},

    /** 
     * Issues the JSONP request.
     *
     * @method send
     * @param args* {any} any additional arguments to pass to the url formatter
     *              beyond the base url and the proxy function name
     * @chainable
     */
    send : function () {
        var self   = this,
            args   = Y.Array(arguments, 0, true),
            config = self._config,
            proxy  = self._proxy || Y.guid(),
            url;
            
        // TODO: support allowCache as time value
        if (config.allowCache) {
            self._proxy = proxy;

            // In case additional requests are issued before the current request
            // returns, don't remove the proxy.
            self._requests++;
        }

        args.unshift(self.url, 'YUI.Env.JSONP.' + proxy);
        url = config.format.apply(self, args);

        if (!config.on.success) {
            Y.log("No success handler defined.  Aborting JSONP request.", "warn", "jsonp");
            return self;
        }

        function wrap(fn) {
            return (isFunction(fn)) ?
                function (data) {
                    if (!config.allowCache || !--self._requests) {
                        delete YUI.Env.JSONP[proxy];
                    }
                    fn.apply(config.context, [data].concat(config.args));
                } :
                null;
        }

        // Temporary un-sandboxed function alias
        // TODO: queuing
        YUI.Env.JSONP[proxy] = wrap(config.on.success);

        Y.Get.script(url, {
            onFailure: wrap(config.on.failure),
            onTimeout: wrap(config.on.timeout),
            timeout  : config.timeout
        });

        return self;
    },

    /**
     * Default url formatter.  Looks for callback= in the url and appends it
     * if not present.  The supplied proxy name will be assigned to the query
     * param.  Override this method by passing a function as the
     * &quot;format&quot; property in the config object to the constructor.
     *
     * @method _format
     * @param url { String } the original url
     * @param proxy {String} the function name that will be used as a proxy to
     *      the configured callback methods.
     * @param args* {any} additional args passed to send()
     * @return {String} fully qualified JSONP url
     * @protected
     */
    _format: function (url, proxy) {
        return url.replace(/\{callback\}/, proxy);
    }
};

Y.JSONPRequest = JSONPRequest;

/**
 *
 * @method Y.jsonp
 * @param url {String} the url of the JSONP service with the {callback}
 *          placeholder where the callback function name typically goes.
 * @param c {Function|Object} Callback function accepting the JSON payload
 *          as its argument, or a configuration object (see above).
 * @param args* {any} additional arguments to pass to send()
 * @return {JSONPRequest}
 * @static
 */
Y.jsonp = function (url,c) {
    var req = new Y.JSONPRequest(url,c);
    return req.send.apply(req, Y.Array(arguments, 2, true));
};

if (!YUI.Env.JSONP) {
    YUI.Env.JSONP = {};
}


}, '3.3.0' ,{requires:['get','oop']});
