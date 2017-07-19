const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractCSS = new ExtractTextPlugin('stylesheets/[name]-css.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-less.css');

const getPlugins = () => {
  const plugins = [];

  const nodeEnv = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  });

  const clearDist = new CleanWebpackPlugin(['dist'], {
    root: `${__dirname}/client`,
    verbose: true,
    dry: false,
  });

  const uglifyPlugin = new UglifyJSPlugin({
    compressor: {
      warnings: false,
    },
    minimize: true,
  });

  const favicon = new FaviconsWebpackPlugin({
    logo: './client/src/images/favicon.png',
    prefix: 'dist/icons-[hash]/',
    emitStats: false,
    statsFilename: 'iconstats-[hash].json',
    persistentCache: true,
    inject: true,
    background: '#fff',
    title: 'Weather Forecast',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: true,
    },
  });

  const html = new HtmlWebpackPlugin({
    inject: 'body',
    excludeChunks: ['index'],
    filename: 'index.html',
    template: './client/src/index.html',
  });

  plugins.push(nodeEnv);
  plugins.push(clearDist);
  plugins.push(extractCSS);
  plugins.push(extractLESS);
  plugins.push(uglifyPlugin);
  plugins.push(favicon);
  plugins.push(html);

  return plugins;
};

const webpackConfig = {
  entry: {
    index: [`${__dirname}/client/src/scripts/index.jsx`],
  },
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: getPlugins(),
  externals: {},
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [/client/],
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2015', 'react'],
          compact: false,
        },
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader']),
      },
      {
        test: /\.less$/,
        // loader: 'style-loader!css-loader!less-loader',
        use: extractLESS.extract(['css-loader', 'less-loader']),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=./client/dist/images/[hash].[ext]',
          'image-webpack-loader?{ optipng: {optimizationLevel: 7}, gifsicle: {interlaced: false}, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}',
        ],
      },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

module.exports = webpackConfig;
