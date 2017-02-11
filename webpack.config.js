const webpack = require('webpack')

const cssLoaders = [
  'style-loader',
  'css-loader?importLoaders=1&sourceMap',
  'postcss-loader?sourceMap',
]

const sassLoaders = [
  'style-loader',
  'css-loader?importLoaders=1&sourceMap',
  'sass-loader?sourceMap',
  'postcss-loader?sourceMap',
]

const { env } = process

const DEV = env.NODE_ENV === 'development'
const PROD = env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    hot: true,
    compress: true,
    contentBase: './',
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    "./src/client/index.tsx",
  ],
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: '/dist/',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: process.env.NODE_ENV === 'production' ? "source-map" : 'inline-source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".scss", ".css", ".json"],
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|eot|svg|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['file-loader'],
      },
      Object.assign(
        {
          test: /\.css$/,
        },
        DEV ? {
          loader: ExtractTextPlugin.extract(cssLoaders),
        } : {
          loaders: cssLoaders,
        }
      ),
      Object.assign(
        {
          test: /\.scss$/,
        },
        DEV ? {
          loader: ExtractTextPlugin.extract(sassLoaders),
        } : {
          loaders: sassLoaders,
        }
      ),
    ],
  },

  node: {
    fs: 'empty',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        minChunks: function (module) {
           // this assumes your vendor imports exist in the node_modules directory
           return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
  ],
};
