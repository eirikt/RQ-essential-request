/* eslint-env node */
/* eslint-disable global-require */
/* global require:false, module:false */

'use strict';

module.exports = {
    version: require('./package').version,
    get: require('./rq-essentials-request').httpGet
};
