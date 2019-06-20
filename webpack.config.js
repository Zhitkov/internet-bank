const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : {
        hot: 'webpack-hot-middleware/client',
        app: path.join(__dirname, './src/app').normalize(),
        shared: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'redux-actions',
            'redux-localstorage',
            'redux-logger',
            'redux-thunk',
            'uuid'
        ]
    },
    output : {
        publicPath : '/',
        //path : '/',
        path : path.join(__dirname, './build').normalize(),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devtool : 'source-map',
    module : {
        loaders : [
            {
                test : /\.(js|jsx)$/,
                exclude : /(node_modules|bower_components)/,
                loaders : ['babel-loader?cacheDirectory']
            },
            {
                test : /\.css$/,
                loader : 'style!css?sourceMap'
            },
            {
                test : /\.less$/,
                loader : 'style!css!less'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                include : /\/node_modules\//,
                loader : 'url?name=[1].[ext]?[hash]&regExp=node_modules/(.*)?limit=4096'
            },
            {
                test : /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)/,
                exclude : /\/node_modules\//,
                loader : 'url?name=[path][name].[ext]?[hash]?limit=4096'
            },
            {
                test : /\.json$/,
                exclude : /\/node_modules\//,
                loader : 'json'
            }
        ]
    },

    resolve : {
        extensions : ['', '.js', '.jsx'],
        modulesDirectories : ['src', 'node_modules']
    },

    plugins : [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new HtmlWebpackPlugin({
            template : './src/index.html',
            inject : 'body'
        })
    ]
};