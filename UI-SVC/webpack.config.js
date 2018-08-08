const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'public/js/main.js'),
    output: {
        path: path.resolve(__dirname, 'public/js/dist'),
        filename: 'webpacked.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
}