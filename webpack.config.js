const { resolve } = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  // optimize: { CommonsChunkPlugin },
} = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

require('./src/lib/gen-readme.js')

module.exports = {
  devServer: {
    hot: true,
  },
  devtool: 'source-map',
  entry: {
    main: PROD ? [
      './src/index.js',
    ] : [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
  },
  externals: {
    'react-electron-web-view': 'react-electron-web-view',
  },
  output: {
    filename: '[name].js',
    path: resolve('./dist'),
    publicPath: PROD ? './dist/' : '/dist/',
    libraryTarget: PROD ? 'commonjs2' : 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: [
          resolve('./node_modules'),
        ],
      },
      {
        test: /\.css$/,
        loaders: /* ExtractTextPlugin.extract({
        loader: */ [
          'style-loader',
          'css-loader?modules&importLoaders=1&sourceMap',
          'postcss-loader?sourceMap',
        ],
        /* }), */
      },
      {
        test: /\.scss$/,
        loaders: /* ExtractTextPlugin.extract({
        loader: */[
          'style-loader',
          'css-loader?importLoaders=1&sourceMap',
          'sass-loader?sourceMap',
          'postcss-loader?sourceMap',
        ],
        /*}),*/
      },
      {
        test: /\.(png|jpg)$/,
        loaders: [
          'file-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /.md$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    // new ExtractTextPlugin({
    //   filename: 'bundle.css',
    //   allChunks: true,
    // }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/webpack-dev-server/dist/main',
      },
      {
        reload: false,
      }
    ),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ],
}
