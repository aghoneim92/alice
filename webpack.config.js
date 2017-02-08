module.exports = {
  // devServer: {
  //   hot: true,
  //   compress: true,
  //   contentBase: './',
  // },
  entry: "./src/client/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".scss", ".css", ".json"]
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre"
      }
    ],
  },

  node: {
    fs: 'empty',
  },
};
