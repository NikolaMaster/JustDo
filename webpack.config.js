'use strict';

var path = require('path');

module.exports = {
    entry: './wwwroot/app/app.jsx',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './wwwroot/bundle'),
        publicPath: '/bundle/',
        filename: 'bundle.js'
    },
    devServer:{
        historyApiFallback: true
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
            }
        ]
    }
}