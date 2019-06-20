"use strict";

const config = {};

// config.env = process.env.NODE_ENV || 'local';
config.env =  'local';

switch(config.env) {
    case 'development':
        config.host = '88.99.204.225';
        config.port = '5671';
        config.remoteApiUrl = 'http://37.139.29.63:18888/api/2/';
        break;

    case 'production':
        config.host = '88.99.204.225';
        config.port = '5670';
        config.remoteApiUrl = 'http://192.168.3.10:18888/api/2/';
        break;

    case 'local':
    default:
        config.host = 'localhost';
        config.port = '5671';
        config.remoteApiUrl = 'http://37.139.29.63:18888/api/2/';
        break;
}

module.exports = config;