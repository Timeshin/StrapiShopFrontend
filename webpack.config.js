const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@/styles': path.resolve(__dirname, 'src/styles/'),
      '@/components': path.resolve(__dirname, 'src/components/'),
      '@/actions': path.resolve(__dirname, 'src/redux/actions'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/layouts': path.resolve(__dirname, 'src/layouts/'),
      '@/config': path.resolve(__dirname, 'src/config/'),
      '@/pages': path.resolve(__dirname, 'src/pages/'),
      '@/modules': path.resolve(__dirname, 'src/modules/'),
      '@/types': path.resolve(__dirname, 'src/types/'),
      '@/hooks': path.resolve(__dirname, 'src/hooks/'),
      '@/helpers': path.resolve(__dirname, 'src/helpers/'),
      '@/redux': path.resolve(__dirname, 'src/redux/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
          exclude: /node_modules|\.d\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
            compilerOptions: {
            noEmit: false,
           },
          },
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: `.env.${process.env.NODE_ENV}`
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'public/manifest.json', to: 'manifest.json' },
          { from: 'public/logo192.png', to: 'logo192.png' },
          { from: 'public/logo512.png', to: 'logo512.png' }
      ]
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    })
  ],
  devServer: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:1337'
      }
    },
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
}
