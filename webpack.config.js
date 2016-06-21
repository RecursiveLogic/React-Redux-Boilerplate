const packageJSON = require('./package.json')
const webpack = require('webpack')
const webpackClean = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const extractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const env = process.env.NODE_ENV

let base = {
    context: path.join(__dirname, 'client'),
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: /node_modules/,
            root: [path.join(__dirname, 'client')]
        }, {
            test: /\.(scss|css)$/,
            loader: extractTextPlugin.extract(
                'style',
                `css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader`
            )
        }, {
            test: /\.(png|jpg|woff|ttf|eot|svg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(json)$/,
            loader: 'json-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'client', 'index.html'),
            inject: 'body',
            title: packageJSON.name,
            favicon: path.join(__dirname, 'client', 'assets', 'favicon.ico')
        })
    ],
    postcss: function () {
        return [
            require('postcss-inline-media'),
            require('postcss-simple-vars')({
              variables: require(path.join(__dirname, 'client', 'style',
                  'vendor', 'variables.js'))
            }),
            require('precss'),
            require('postcss-flexbox'),
            require('autoprefixer'),
            require('postcss-short'),
        ]
    }
}

if (env === 'development') {
    module.exports = webpackMerge(base, {
        output: {
            filename: 'application.js'
        },
        watch: true,
        devtool: 'eval-source-map',
        plugins: [
            new extractTextPlugin('bundle.css', {
                allChunks: true
            }),
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}

if (env === 'production') {
    module.exports = webpackMerge(base, {
        output: {
            filename: 'bundle.[hash].js'
        },
        plugins: [
            new webpackClean([path.join(__dirname, 'static')]),
            new extractTextPlugin('bundle.[hash].css', {
                allChunks: true
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    })
}
