/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

const host = 'localhost';
const port = 3000;
const extpath = path.join(__dirname, './chrome/extension/');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: { host, port },
  entry: {
    background: [ `${extpath}background` ],
    devpanel: [ `${extpath}devpanel`, `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr` ],
    devtools: [ `${extpath}devtools` ],
    content: [ `${extpath}content` ],
    page: [ `${extpath}page` ],
  },
  output: {
    path: path.join(__dirname, 'dev'),
    filename: '[name].bundle.js',
    publicPath: `http://${host}:${port}/`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.(woff|woff2)$/,
      loader: "url?prefix=font/&limit=5000"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }, {
      test: /\.(jpg|jpeg|png)$/,
      loader: "url?limit=10000&minetype=image/jpg"
    }]
  }
};
