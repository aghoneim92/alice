const webpack = require('webpack')
const { resolve } = require('path')
const OfflinePlugin = require('offline-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { CheckerPlugin } = require('awesome-typescript-loader')

const { ProvidePlugin } = webpack


const { env } = process

const DEV = env.NODE_ENV === 'development'
const PROD = env.NODE_ENV === 'production'
const MAIN = './src/client/index.tsx'
const DEV_TOOL = PROD ? 'source-map' : 'inline-source-map'
const RESOLVE_EXTENSIONS = ['.ts', '.tsx', '.js']


const main = PROD ? [
  MAIN,
] : [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  MAIN,
]

const DIST = 'dist'

const OUTPUT_FILENAME_PATTERN = PROD ? '[hash].js' : '[name].js'
const OUTPUT_PATH = resolve(`./${DIST}`)
const PUBLIC_PATH = `/${DIST}/`
const FONT_LOADER = {
  test: /\.(eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url-loader',
}
const IMAGE_LOADER = {
  test: /\.(png|jpg|svg)$/,
  loader: 'file-loader',
}
const TYPESCRIPT_LOADER = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  exclude: /node_modules/,
}
const CSS_LOADERS = [
  'style-loader',
  'css-loader?importLoaders=1&sourceMap',
  'postcss-loader?sourceMap',
]
const CSS_LOADER = Object.assign(
  {
    test: /\.css$/,
  },
  DEV ? {
    loader: ExtractTextPlugin.extract(CSS_LOADERS),
  } : {
    loaders: CSS_LOADERS,
  }
)
const SCSS_LOADERS = [
  'style-loader',
  'css-loader?importLoaders=1&sourceMap',
  'sass-loader?sourceMap',
  'postcss-loader?sourceMap',
]
const SCSS_LOADER = Object.assign(
  {
    test: /\.scss$/,
  },
  DEV ? {
    loader: ExtractTextPlugin.extract(SCSS_LOADERS),
  } : {
    loaders: SCSS_LOADERS,
  }
)
const SOURCEMAPS_LOADER = {
  test: /\.js$/,
  loader: 'source-map-loader',
  enforce: 'pre',
  exclude: /node_modules/,
}
const MARKDOWN_LOADER = {
  test: /\.md$/,
  use: [
    {
      loader: "html-loader"
    },
    {
      loader: "markdown-loader",
    }
  ]
}
const YAML_LOADER = {
  test: /\.ya?ml$/,
  loader: 'json-loader!yaml-loader',
}

const COFFEE_LOADER = {
  test: /\.coffee$/,
  loader: 'coffee-loader'
}
const LESS_LOADERS = [
  'style-loader',
  'css-loader?importLoaders=1&sourceMap',
  'less-loader?sourceMap',
  'postcss-loader?sourceMap',
]
const LESS_LOADER = {
  test: /\.less$/,
  loaders: LESS_LOADERS,
}

const LOADERS = [
  COFFEE_LOADER,
  MARKDOWN_LOADER,
  TYPESCRIPT_LOADER,
  SOURCEMAPS_LOADER,
  CSS_LOADER,
  LESS_LOADER,
  SCSS_LOADER,
  FONT_LOADER,
  IMAGE_LOADER,
  YAML_LOADER,
]
const PROD_PLUGINS = PROD ? [
  new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
  }),
  // new UglifyJsPlugin({
  //   sourceMap: true,
  //   beautify: false,
  //   mangle: {
  //     screw_ie8: true,
  //     keep_fnames: true,
  //   },
  //   exclude: /rc-align/,
  //   compress: {
  //       screw_ie8: true
  //   },
  // }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
] : []
const WEBPACK_PLUGINS = [
  new CheckerPlugin(),
  new OfflinePlugin(PROD ?{
    caches: {
      main: [':rest:'],
      additional: [':externals:'],
      optional: ['*.chunk.js']
    },
    safeToUseOptionalCaches: true,
  } : {}),
  new ManifestPlugin({
    fileName: 'push_manifest.json',
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new ProvidePlugin({
    $: 'jquery'
  })
].concat(PROD_PLUGINS)

const devtool = DEV_TOOL
const extensions = RESOLVE_EXTENSIONS
const path = OUTPUT_PATH
const publicPath = PUBLIC_PATH
const filename = OUTPUT_FILENAME_PATTERN
const loaders = LOADERS
const MODULE = { loaders }
const output = {
  filename,
  chunkFilename: '[chunkhash].chunk.js',
  path,
  publicPath,
}
const RESOLVE = { extensions }
const node = {
  fs: 'empty',
}
const plugins = WEBPACK_PLUGINS
const entry = main
const devServer = {
  hot: true,
  hotOnly: true,
  compress: true,
  proxy: {
    '/': {
      target: 'https://localhost:4000',
      secure: false,
    },
  },
  contentBase: false,
}

module.exports = {
  devServer,
  entry: [MAIN],
  node,
  output,
  devtool,
  resolve: RESOLVE,
  module: MODULE,
  plugins,
  watchOptions: {
    aggregateTimeout: 5000,
    ignored: /node_modules/
  }
}
