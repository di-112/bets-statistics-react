const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload')

const isDev = process.env.NODE_ENV === 'development'

const getFileName = ext => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`)

const getCssLoaders = (extra, isModules = true) => {
  const loaders = [isDev ? MiniCssExtractPlugin.loader : 'style-loader', {
    loader: 'css-loader',
    options: isModules
      ? {
        modules: {
          localIdentName: '[local]___[hash:base64:5]',
        },
      }
      : {},
  }, 'postcss-loader']
  if (extra) loaders.push(extra)
  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFileName('js'),
    assetModuleFilename: 'images/[name][hash][ext]',
  },
  devServer: {
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@api': path.resolve(__dirname, 'src/api/index.ts'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@common': path.resolve(__dirname, 'src/common/'),
      '@types': path.resolve(__dirname, 'src/types.ts'),
      '@enums': path.resolve(__dirname, 'src/enums.ts'),
      '@utils': path.resolve(__dirname, 'src/utils.ts'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: { quality: 100 },
              webp: { lossless: 1 },
              avif: { cqLevel: 0 },
            },
          },
        },
      }),
    ],
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      favicon: './public/favicon.png',
      cache: isDev,
    }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.woff2$/,
          attributes: {
            as: 'font',
            type: 'font/woff2',
            crossorigin: true,
          },
        },
        {
          match: /.*\.(png|jpg|gif|mp3|svg)$/,
          attributes: { as: 'image' },
        },
        {
          match: /vendors\.[a-z-0-9]*.css$/,
          attributes: { as: 'style' },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|mp3|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: getCssLoaders('', false),
      },
      {
        test: /\.s[ac]ss/i,
        use: getCssLoaders('sass-loader'),
      },
      {
        test: /\.less/i,
        use: getCssLoaders('less-loader'),
      },
      {
        test: /\.g\.less/i,
        use: getCssLoaders('less-loader', false),
      },
      {
        test: /\.m?(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
}
