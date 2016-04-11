var path = require('path');
var webpack = require('webpack');

const extpath = path.join(__dirname, './chrome/extension/');

module.exports = {
  entry: {
    background: [ `${extpath}background` ],
    devpanel: [ `${extpath}devpanel` ],
    devtools: [ `${extpath}devtools` ],
    content: [ `${extpath}content` ],
    page: [ `${extpath}page` ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
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
}
