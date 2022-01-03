const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const glob = require('glob')
const { VueLoaderPlugin } = require('vue-loader')
const { Base64 } = require('js-base64')

const extractCSS = new MiniCssExtractPlugin({
  filename: '[name].css',
})

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, '../src'),
      virnect: path.resolve(__dirname, '../node_modules/@virnect'),
      assets: path.resolve(__dirname, '../src/assets'),
      root: path.resolve(__dirname, '../'),
      api: path.join(__dirname, '../src/api'),
      apps: path.join(__dirname, '../src/apps'),
      components: path.join(__dirname, '../src/components'),
      mixins: path.join(__dirname, '../src/mixins'),
      languages: path.join(__dirname, '../src/languages'),
      // lib: path.join(__dirname, '../src/lib'),
      configs: path.join(__dirname, '../src/configs'),
      layouts: path.join(__dirname, '../src/layouts'),
      routers: path.join(__dirname, '../src/routers'),
      stores: path.join(__dirname, '../src/stores'),
      // element: path.join(__dirname, '../theme/'),
      tests: path.join(__dirname, '../tests/'),
    },
  },

  entry: './src/apps/main.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
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
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(
                __dirname,
                '../src/assets/scss/mixin.scss',
              ),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|otf|ttf|woff|woff2|svg|svgz|ico|pdf|rss|xml|txt)(\?.+)?$/,
        exclude: /(favicon\.png|VIRNECT_ROI\.svg)$/,
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
      // pdfkit
      {
        test: /VIRNECT_ROI\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/[name].[hash:7].[ext]',
              generator: (content, mimetype) => {
                return `data:${mimetype},${Base64.encode(content)}`
              },
            },
          },
        ],
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
    new HtmlPlugin({
      template: './src/apps/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
    new VueLoaderPlugin(),
    extractCSS,
    // ...htmlWebpackPluginArray,
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
  },
}
