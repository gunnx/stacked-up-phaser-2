const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = (env) => {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProduction = nodeEnv === 'production';

  return {
    entry: {
      app: [
        'babel-polyfill', path.resolve(__dirname, 'src/index.js')
      ],
      vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
    },
    devtool: 'cheap-source-map',
    output: {
      pathinfo: !isProduction,
      path: path.resolve(__dirname, 'public/assets'),
      publicPath: '/assets',
      filename: 'js/bundle.js'
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'js/vendor.js',
        minChunks: Infinity
      }),
      new BrowserSyncPlugin({
        host: process.env.IP || 'localhost',
        port: process.env.PORT || 3000,
        server: {
          baseDir: ['./', './public']
        }
      }),
      new HtmlWebpackPlugin({
        title: 'Stacked-Up',
        filename: `${__dirname}/public/index.html`,
        template: `${__dirname}/src/template.ejs`
      }),
      new CopyWebpackPlugin([{
        from: 'src/assets'
      }])
    ],
    module: {
      rules: [{
        test: /src\/.*\.js$/, loader: 'babel-loader'
      },{
        test: /pixi\.js/, loader: 'expose-loader?PIXI'
      },{
        test: /phaser-split\.js$/, loader: 'expose-loader?Phaser'
      },{
        test: /p2\.js/, loader: 'expose-loader?p2'
      }]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    resolve: {
      alias: {
        'phaser': phaser,
        'pixi': pixi,
        'p2': p2
      }
    }
  };
};
