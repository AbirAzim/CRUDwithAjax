const path = require('path');

const config = {
    entry: './src/index.js',
    output: {

        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/dist'

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}

module.exports = config;

