var baseConfig = require('./webpack.config');
var merge = require('webpack-merge');
delete baseConfig.entry;

var webpackConfig = merge(baseConfig, {
    // vue: {
    //     loaders: {
    //         js: 'isparta'
    //     }
    // }
    entry: './test/unit/index.js'
});

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage', 'verbose'],
        // this is the entry file for all our tests.
        files: ['./test/unit/index.js'],
        // we will pass the entry file to webpack for bundling.
        preprocessors: {
            './test/unit/index.js': ['webpack']
        },
        coverageReporter: {
            dir: './test/coverage',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'}
            ]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        singleRun: true
    });
};