const path = require('path')
const paths = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const sassOptions = [
  { loader: 'css-loader', options: { sourceMap: true } },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      config: {
        path: 'postcss.config.js',
      },
    },
  },
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
        '../node_modules/@virnect/ui-assets/stylesheets/abstracts/_mixins.scss',
      ),
    },
  },
]

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      components: path.resolve(__dirname, '../src/components/'),
      assets: path.resolve(__dirname, '../src/assets/'),
      images: path.resolve(__dirname, '../src/images/'),
      virnect: path.resolve(__dirname, '../node_modules/@virnect'),
      languages: path.resolve(__dirname, '../src/languages'),
    },
  },
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              'css-hot-loader',
              MiniCssExtractPlugin.loader,
              ...sassOptions,
            ],
          },
        },
      },
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.scss|css$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, ...sassOptions],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}
