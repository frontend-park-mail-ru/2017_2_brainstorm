module.exports = {
	entry: "./static/script/MainApp.js",
	output: {
		filename: "./static/script/app.js"
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
