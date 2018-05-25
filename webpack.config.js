const HTMLPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
  entry: './src/index.ts',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].js',
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
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new HTMLPlugin({
      favicon: './public/images/favicon.png',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      template: './public/index.html',
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: 'chunk.[hash].css',
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
