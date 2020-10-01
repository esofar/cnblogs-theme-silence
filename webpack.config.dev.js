const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'silence.js',
    },
    devServer: {
        port: 3050,
        progress: true,
        open: true,
        hot: true,
        compress: false,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'silence.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.html',
            filename: 'index.html',
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/post.html',
            filename: 'post.html',
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/archive.html',
            filename: 'archive.html',
            hash: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
            '@modules': path.resolve('src/modules'),
            '@consts': path.resolve('src/consts'),
            '@templates': path.resolve('src/templates')
        },
    },
};