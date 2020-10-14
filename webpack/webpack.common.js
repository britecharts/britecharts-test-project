const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js'),
    esModules: Path.resolve(__dirname, '../src/scripts/esmodules.js'),
    cjsModules: Path.resolve(__dirname, '../src/scripts/cjsmodules.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../public'), to: 'public' }] }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'cdn.html',
      template: Path.resolve(__dirname, '../src/cdn.html'),
      excludeChunks: [ 'cjsModules', 'esModules' ]
    }),
    new HtmlWebpackPlugin({
      filename: 'es-modules.html',
      template: Path.resolve(__dirname, '../src/es-modules.html'),
      excludeChunks: [ 'cjsModules' ]
    }),
    new HtmlWebpackPlugin({
      filename: 'cjs-modules.html',
      template: Path.resolve(__dirname, '../src/cjs-modules.html'),
      excludeChunks: [ 'esModules' ]
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
