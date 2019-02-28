let webpack = require('webpack');
let path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
    mode: env == 'production' || env == 'none' ? env : 'development',

  entry: path.resolve(__dirname + '/src/index.js'),

  output: {
    path: path.resolve(__dirname + '/dist/assets'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
              publicPath: 'assets',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      }),
  ],
  optimization: {
    minimizer: []
  }
};
if (env === 'production') {
    module.exports.optimization.minimizer.push(new UglifyJsPlugin());
  }