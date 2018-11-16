const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



let TARGET = process.env.npm_lifecycle_event;

let common = {
  entry: {
    app: path.resolve(__dirname, 'src/main.js')
  },
  resolve: {
    extensions: ['.scss','.js','.json','.vue'],
    alias: {
      // 别名配置
      // 'common': path.resolve(__dirname, 'src/')
      'component': path.resolve(__dirname, 'src/component'),
      'views': path.resolve(__dirname, 'src/views'),
    }
  },
  module: {
    rules:[
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/css/fonts/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => {
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new VueLoaderPlugin()
  ]
};


if (TARGET === 'dev') {
  module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer: {
      compress: true,
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      quiet: true,
      overlay: {
        errors: true
      },
      open: true
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(gif|jpg|jpeg|png)$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash:7].js'
    }
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(gif|jpg|jpeg|png)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/images/[name].[hash].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash].css'
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    output: {
      // publicPath: 'http://localhost/test3/',
      filename: 'static/js/[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  })
}