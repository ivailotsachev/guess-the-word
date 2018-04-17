const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'react'],
                        plugins: [
                            'babel-plugin-transform-runtime',
                            'babel-plugin-transform-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                } 
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { 
                test: /\.(jpe?g|png|gif|svg)$/i, 
                use: "file-loader" 
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
}