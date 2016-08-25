/* eslint-env node */

/* eslint-disable id-length */
/* eslint-disable no-console */
/* eslint-disable no-undefined */
/* eslint-disable no-unused-vars */

/* eslint max-len: 1 */
/* eslint spaced-comment: 1 */

/* global require:false, exports:false */

'use strict';

const R = require('ramda');
const request = require('request');
const status = require('statuses');

/**
 * <hr style="border:0;height:1px;background:#333;background-image:-webkit-linear-gradient(left, #ccc, #333, #ccc);background-image:-moz-linear-gradient(left, #ccc, #333, #ccc);background-image:-ms-linear-gradient(left, #ccc, #333, #ccc);"/>
 * <p>
 * Simple requestor factory for HTTP GET using the "request" library.
 * </p>
 * <p>
 * A "data generator" requestor => No forwarding of existing data.
 * A typical parallel requestor, or as a starting requestor in a sequence ...
 * </p>
 * <p>
 * <em>Aliases</em>
 * </p>
 * <p>
 * <em>Usage examples</em>
 * </p>
 * <hr style="border:0;height:1px;background:#333;background-image:-webkit-linear-gradient(left, #ccc, #333, #ccc);background-image:-moz-linear-gradient(left, #ccc, #333, #ccc);background-image:-ms-linear-gradient(left, #ccc, #333, #ccc);"/>
 *
 * @see https://github.com/request/request
 * @see https://www.npmjs.com/package/request
 * @param {string|object} requestOptions The URL or a valid request option object
 * @returns {function} An RQ requestor (function continuation/callback)
 * @function
 */
const httpGetFactory = exports.httpGet =
    (requestOptions) => {
        const options = {
            method: 'GET',
            encoding: 'UTF-8',
            headers: {
                'User-Agent': 'request (npm)'
            }
        };
        if (requestOptions) {
            if (R.is(String, requestOptions)) {
                options.uri = requestOptions;

            } else {
                R.forEach((objectKey) => {
                    if (objectKey !== 'headers') {
                        options[objectKey] = requestOptions[objectKey];
                    }
                }, R.keys(requestOptions));

                if (requestOptions.headers) {
                    R.forEach((headerKey) => {
                        options.headers[headerKey] = requestOptions.headers[headerKey];
                    }, R.keys(requestOptions.headers));
                }
            }
        }

        return (callback, callbackArgs) => {
            return request(options, (err, response, body) => {
                if (err) {
                    console.error(`[${new Date().toISOString()} rq-essentials-request.get] ${err}`);
                    return callback(undefined, err);
                }
                if (response.request.href !== options.uri) {
                    const customErrorMsg = `This is a response from '${response.request.href}', but the requested URL was '${options.uri}'. A redirection has probably taken place - this is not supported`;
                    console.error(`[${new Date().toISOString()} rq-essentials-request.get] ${customErrorMsg}`);
                    return callback(undefined, customErrorMsg);
                }
                if (response.statusCode !== status('OK')) {
                    const customErrorMsg = `Unexpected HTTP status code: ${response.statusCode} (only HTTP status code ${status('OK')} OK is supported)`;
                    console.error(`[${new Date().toISOString()} rq-essentials-request.get] ${customErrorMsg}`);
                    return callback(undefined, customErrorMsg);
                }
                return callback(body);
            });
        };
    };
