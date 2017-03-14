const webpack = require('webpack')
const { ProvidePlugin } = webpack
const StatsPlugin = require('stats-webpack-plugin')
const { resolve } = require('path')

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

const OUTPUT_FILENAME_PATTERN = '[name].js'
const OUTPUT_PATH = resolve(`./${DIST}`)
const PUBLIC_PATH = `/${DIST}/`
const FILE_LOADER = {
  test: /\.(png|jpg|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loaders: ['file-loader'],
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
      options: {
        /* your options here */
      }
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

const LOADERS = [
  COFFEE_LOADER,
  MARKDOWN_LOADER,
  TYPESCRIPT_LOADER,
  SOURCEMAPS_LOADER,
  CSS_LOADER,
  SCSS_LOADER,
  FILE_LOADER,
  YAML_LOADER,
]
const WEBPACK_PLUGINS = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new StatsPlugin('stats.json', {
    chunkModules: true,
    exclude: [/node_modules/]
  }),
  new ProvidePlugin({
    $: 'jquery'
  })
]

const devtool = DEV_TOOL
const extensions = RESOLVE_EXTENSIONS
const path = OUTPUT_PATH
const publicPath = PUBLIC_PATH
const filename = OUTPUT_FILENAME_PATTERN
const loaders = LOADERS
const MODULE = { loaders }
const output = {
  filename,
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
  compress: true,
  contentBase: './',
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
    aggregateTimeout: 1000,
    ignored: /node_modules/
  }
}
