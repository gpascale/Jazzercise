const Path = require('path');
const IS_DEBUG_BUILD = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractSASS = new ExtractTextPlugin(`/css/index.css`);

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/,  }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
}

module.exports = {
  context: __dirname,
  devtool: IS_DEBUG_BUILD ? "inline-sourcemap" : null,

  // Entry Point
  entry: (IS_DEBUG_BUILD ?
    // FOR DEBUG BUILDS, USE HOT RELOADING
    [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      Path.join(__dirname, 'src/js/index.jsx')
    ] :
    // IN PRODUCTION, DON'T
    Path.join(__dirname, 'src/js/index.jsx')
  ),

  // Put the built application in dist/
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: '/js/bundle.js',
  },

  // Define loaders
  module: {
    loaders: [
	{ test: /\.css$/, loader: 'style!css', },
	{ test: /.jsx?$/, loaders: [ 'babel-loader' ], include: Path.join(__dirname, 'src') },
	{ test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=assets/fonts/[hash].[ext]' },
	{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?hash=sha512&digest=hex&name=assets/images/[hash].[ext]' },
      ].concat(
	(IS_DEBUG_BUILD ?
	  [
	    { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
	  ] :
	  [
	    { test: /\.scss$/, loader: ExtractSASS.extract(['css', 'sass']) }
	  ]
	)
      )
  },

  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    modulesDirectories: [ 'node_modules', __dirname ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, 'src/html/index.html'),
    }),
    new webpack.ProvidePlugin({
      'Raphael': 'raphael'
    }),
  ].concat(
  IS_DEBUG_BUILD ?
    // DEBUG PLUGINS
    [
      new webpack.HotModuleReplacementPlugin()
    ] :
    // PRODUCTION PLUGINS
    [
      ExctractSASS
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
  ),

  devServer: {
    contentBase: Path.join(__dirname, 'dist/'),
    hot: true,
    port: 8080,
    inline: true,
    progress: true,
    historyApiFallback: true,
  }
};