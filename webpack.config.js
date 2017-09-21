const Path = require('path');
const IS_DEBUG_BUILD = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('/css/index.css');

console.log('DEBUG_BUILD:', IS_DEBUG_BUILD);

const cssRoot = (IS_DEBUG_BUILD ? ('root=' + Path.join(__dirname)) : '');

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/,  }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = {
  context: __dirname,
  devtool: IS_DEBUG_BUILD ? 'inline-cheap-eval-sourcemap' : false,

  // Entry Point
  entry: (IS_DEBUG_BUILD ?
    // FOR DEBUG BUILDS, USE HOT RELOADING
    [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3113',
      'webpack/hot/only-dev-server',
      Path.join(__dirname, 'client/js/index.jsx')
    ] :
    // IN PRODUCTION, DON'T
    Path.join(__dirname, 'client/js/index.jsx')
  ),

  // Put the built application in dist/
  output: {
    path: Path.join(__dirname, 'dist/webpack'),
    filename: (IS_DEBUG_BUILD ? 'js/[name].bundle.js' : 'js/[name].bundle.[chunkhash].js'),
    publicPath: '/'
  },

  // Define loaders
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              modules: true,
              sourceMap: true,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          }
        ]
      },
      { test: /.jsx?$/, loaders: [ 'babel-loader' ], include: Path.join(__dirname, 'client') },
      { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=assets/fonts/[hash].[ext]' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]' },
      { test: /soundfont\/.*js$/i, loader: 'file-loader?name=assets/soundfont/[name].[ext]' },
    ].concat(
      (IS_DEBUG_BUILD ?
        [
          { test: /\.scss$/, loaders: ['style-loader', 'css-loader?' + cssRoot, 'sass-loader'] }
        ] :
        [
          {
            test: /\.scss$/,
            loader: ExtractSASS.extract({
              use: [ 'css-loader', 'sass-loader' ],
              publicPath: '/'
            })
          }
        ]
      )
    )
  },

  resolve: {
    extensions: [ '.js', '.jsx' ],
    modules: [ 'node_modules', Path.join(__dirname, 'client') ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      'Raphael': 'raphael'
    }),
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, 'client/html/index.html'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.indexOf('node_modules') >= 0;
      }
    })
  ].concat(
    IS_DEBUG_BUILD
      // DEBUG PLUGINS
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
      // PRODUCTION PLUGINS
      : [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
          filename: 'chunk-manifest.json',
          manifestVariable: 'webpackManifest',
          inlineManifest: true
        }),
        new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, sourcemap: false }),
        new webpack.BundleAnalyzerPlugin({
          analyzerMode: 'static',
          filename: '../webpack_bundle_report.html'
        })
      ]
  ),

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3113,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3114',
        secure: false
      }
    }
  }
};
