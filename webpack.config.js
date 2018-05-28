const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.ts',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk[name].[chunkhash].js',
  },

  resolve: {extensions: ['.ts', '.js']},

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {loader: 'css-loader', options: {modules: true, minimize: true}},
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  optimization: {
    minimizer: [new UglifyJsPlugin({extractComments: true})],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin(['public']),
    new MiniCSSExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: 'chunk[id].[hash].css',
    }),
    new HTMLPlugin({
      favicon: './public/images/favicon.png',
      minify: {
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      template: './public/index.html',
    }),
    new PreloadWebpackPlugin(),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
