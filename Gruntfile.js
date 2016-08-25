/* eslint-disable global-require */
/* eslint-disable max-statements */
/* eslint-disable no-inline-comments */

/* eslint spaced-comment: 1 */

'use strict';

module.exports = (grunt) => {
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');

    const projectConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        project: projectConfig,

        eslint: {
            options: {
                baseConfig: 'axbit',

                // Exceeding this threshold is a clear indicator for:
                // - re-assess each file's individual ESLint config (rule disabling and laxing)
                // - re-assess the project-scoped '.eslintrc-server.json' (if exists)
                // - and maybe even re-assess the global-scoped official Axbit ESLint config 'eslint-config-axbit/.eslintrc.json'
                maxWarnings: 10
            },
            src: [
                'Gruntfile.js',
                'index.js',
                'rq-essentials-request.js',
                'test/rq-essentials-request.spec.js'
            ]
        },

        // Server-side/Node.js specs/tests
        mochaTest: {
            options: {
                //reporter: 'spec',         // Default
                //colors: true,
                //quiet: false,             // Default
                //clearRequireCache: false, // Default
                require: 'babel-register'
            },
            src: [
                'test/**/*.spec.js'
            ]
        }
    });

    grunt.registerTask('help', () => {
        grunt.log.writeln('');
        grunt.log.writeln('################################################');
        grunt.log.writeln(`##   ${projectConfig.description} (v${projectConfig.version})`);
        grunt.log.writeln('################################################');
        grunt.log.writeln('');
        grunt.log.writeln('Essential Grunt tasks are:');
        grunt.log.writeln('');
        grunt.log.writeln('   grunt lint        Runs ESLint');
        grunt.log.writeln('   grunt test        Runs all Mocha tests/specification');
        grunt.log.writeln('');
    });

    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('test', ['mochaTest']);

    grunt.registerTask('default', ['help']);
};
