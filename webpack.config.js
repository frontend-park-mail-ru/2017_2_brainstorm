"use strict";

module.exports = {
	entry: "./static/script/MainApp.js",
	output: {
        path: __dirname + "/static/script/",
		filename: "app.js"
	},
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: "pug-loader"
            }
        ]
    },
    node: {
        fs: 'empty'
    }
};
