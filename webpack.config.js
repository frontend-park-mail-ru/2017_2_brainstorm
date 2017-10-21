"use strict";

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./static/modules/MainApp.js",
    output: {
        path: __dirname + "/static/modules/",
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.pug$/,
                use: "pug-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "./../styles/app.css"
        })
    ],
    node: {
        fs: 'empty'
    }
};
