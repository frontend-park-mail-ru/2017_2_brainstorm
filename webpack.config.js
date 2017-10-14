"use strict";

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./static/script/MainApp.js",
    output: {
        path: __dirname + "/static/script/",
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
