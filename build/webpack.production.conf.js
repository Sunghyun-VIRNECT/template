const paths = require('./paths')
const { merge } = require('webpack-merge')
const glob = require('glob')
const common = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const entries = {}
const chunks = []
const htmlWebpackPluginArray = []
glob.sync('./src/apps/**/*.ts').forEach(path => {
  const chunk = path.split('./src/')[1].split('.ts')[0]
  entries[chunk] = path
  chunks.push(chunk)

  const filename = chunk
  const htmlConf = {
    filename: filename + '.html',
    template: path.replace(/.ts/g, '.html'),
    inject: 'body',
    favicon: './public/favicon.ico',
    hash: true,
    chunks: ['commons', chunk],
  }
  htmlWebpackPluginArray.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  entry: entries,
  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: '/',
  },

  target: ['web', 'es5'],

  plugins: [
    ...htmlWebpackPluginArray,
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: './src/assets/images',
        //   to: 'assets/images',
        //   noErrorOnMissing: true, 카피떠갈폴더설정하세요
        // },
        {
          from: './public',
          to: '',
          noErrorOnMissing: true,
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
