const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const entries = {}
const chunks = []
const htmlWebpackPluginArray = []
glob.sync('./src/apps/**/*.js').forEach(path => {
  const chunk = path.split('./src/')[1].split('.js')[0]
  entries[chunk] = path
  chunks.push(chunk)

  const filename = chunk
  const htmlConf = {
    filename: filename + '.html',
    template: path.replace(/.js/g, '.html'),
    inject: 'body',
    favicon: './src/assets/favicon.ico',
    hash: true,
    chunks: ['commons', chunk],
  }
  htmlWebpackPluginArray.push(new HtmlPlugin(htmlConf))
})

const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].css',
})

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, '../src'),
      assets: path.resolve(__dirname, '../src/assets'),
      virnect: path.resolve(__dirname, '../node_modules/@virnect'),
    },
  },

  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: path.resolve(
          //       __dirname,
          //       '../src/assets/scss/mixin.scss',
          //     ),
          //   },
          // },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|otf|ttf|woff|woff2|svg|ico|pdf)(\?.+)?$/,
        exclude: /(favicon\.png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(mp4|ogg|mp3|pdf|md)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:7].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
    new VueLoaderPlugin(),
    extractCSS,
    ...htmlWebpackPluginArray,
  ],

  // devServer: {
  //   host: 'localhost',
  //   port: 8080,
  //   hot: true,
  // },
}
