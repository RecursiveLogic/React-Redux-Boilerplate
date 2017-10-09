const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackClean = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const { NODE_ENV } = process.env

const base = {
  context: path.join(__dirname, 'client'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'static')
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(scss|css)$/,
      loader: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"',
          'postcss-loader'
        ]
      })
    }, {
      test: /\.(png|jpg|jpeg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
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
      title: 'New Project',
      favicon: path.join(__dirname, 'client', 'assets', 'favicon.ico')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, 'client'),
        postcss: [
          require('postcss-inline-media'),
          require('postcss-simple-vars')({
            variables: require(
              path.join(__dirname, 'client', 'styles', 'variables.js')
            )
          }),
          require('precss'),
          require('postcss-flexbox'),
          require('autoprefixer'),
          require('postcss-short')
        ]
      }
    })
  ]
}

if (NODE_ENV === 'development') {
  module.exports = webpackMerge(base, {
    output: {
      filename: 'application.js'
    },
    watch: true,
    devtool: 'eval-source-map',
    plugins: [
      new extractTextPlugin({
        filename: 'bundle.css',
        allChunks: true
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if (NODE_ENV === 'production') {
  module.exports = webpackMerge(base, {
    output: {
      filename: 'bundle.[hash].js',
      publicPath: '/'
    },
    plugins: [
      new webpackClean([path.join(__dirname, 'static')]),
      new extractTextPlugin({
        filename: 'bundle.[hash].css',
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
