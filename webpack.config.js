const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('stylesheets/[name]-css.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-less.css');

const getPlugins = () => {
  const plugins = [];

  const nodeEnv = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  });

  plugins.push(nodeEnv);
  plugins.push(extractCSS);
  plugins.push(extractLESS);

  return plugins;
};

const webpackConfig = {
  entry: {
    index: [`${__dirname}/client/src/scripts/index.jsx`],
  },
  output: {
    path: path.join(__dirname, 'client/dist'),
    sourceMapFilename: 'debugging/[file].map',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: getPlugins(),
  externals: {},
  devtool: 'eval',
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
        test: /\.json$/,
        use: 'json-loader',
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
