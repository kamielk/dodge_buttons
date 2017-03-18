var webpack = require('webpack');
var path = require('path');
var webpackPlugins = [];

//webpackPlugins.push( new webpack.optimize.UglifyJsPlugin());

var config = require('./build.config');

module.exports = {
    target: 'web',
    entry: './src/js/index.js',
    output: {
        path: config.buildDir + path.sep + 'js',
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                loader: 'webpack-replace',
                query: {
                    search: '${BACKEND_SERVER_URL}',
                    replace: config.baseUrl
                }
            }
        ]
    },

    devServer: {
        iframe: false,
        inline: true,
        progress: true,
        contentBase: config.buildDir,
        host: 'localhost',
        port: 9000
    }
};
