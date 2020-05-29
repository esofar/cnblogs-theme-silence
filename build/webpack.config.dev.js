const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        './src/silence.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'silence.min.js',
        publicPath: '/pulbic/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    devServer: {
        port: '9000',
        compress: true,
        index: 'default.htm',
        hot: true,
        // open:true, 
        publicPath:"/"
    }
}