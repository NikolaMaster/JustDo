'use strict';

var path = require('path');

module.exports = {
    entry: {
        main:  './app/app.jsx'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './wwwroot/bundle'),
        publicPath: '/bundle/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}