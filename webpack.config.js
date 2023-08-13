const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    target: 'web',
    // entry: path.join(__dirname, 'src', 'main.js'),
    entry: '@/main.js',
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            "@": path.join(__dirname, "./src")
        }
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css)$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.jpg|\.png|\.jpeg|\.svg|\.ttf|\.woff$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './img',
                        publicPath: '@/imgs'
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: "url-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        })
    ],
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'src', 'index.html'),
            },
            {
                directory: path.join(__dirname, 'src', 'imgs'),
                publicPath: '/imgs',
            },
            {
                directory: path.join(__dirname, 'src', 'audio'),
                publicPath: '/audio',
            }
        ],
        compress: true,
        port: 8888,
    },
}