"use strict";

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./static/modules/MainApp.js",
    output: {
        path: __dirname + "/static/dist/",
        filename: "src/app.js"
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: "pug-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["absolute/path/a", "absolute/path/b"]
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "./../dist/app.css"
        })
    ],
    node: {
        fs: 'empty'
    }
};
