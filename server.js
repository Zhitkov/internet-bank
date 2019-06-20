"use strict";

const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();
const config = require('./server_config');

const HOST = config.host;
const PORT = config.port;
const NODE_ENV = config.env;

let compiledAppPath;

switch(NODE_ENV) {
    case 'local':
        const webpack = require('webpack');
        const webpackConfig = require('./webpack.config');
        const compiler = webpack(webpackConfig);

        var history = require('connect-history-api-fallback');
        app.use(history());
        app.use(require('webpack-dev-middleware')(compiler, {
            withCredentials: false,
            noInfo: true,
            quiet: false,
            lazy: false,
            watchOptions: {
                aggregateTimeout: 300,
                poll: true
            },
            publicPath: '/',
            stats: {
                colors: true
            }
        }));
        app.use(require('webpack-hot-middleware')(compiler));
        break;

    case 'development':
    default:
        compiledAppPath = path.join(__dirname, './build/').normalize();
        app.use('/', express.static(compiledAppPath));
        break;
}

app.use('/api', httpProxy({
    target: config.remoteApiUrl,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api': ''
    }
}));

app.use(express.static('public'));

app.listen(PORT, function() {
    console.log(`[hacu Internet bank app] - ${NODE_ENV} server listening at ${HOST}:${PORT}`);
});
