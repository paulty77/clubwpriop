var path = require('path');
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: [
        "babel-polyfill",
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:7000',
        'webpack/hot/only-dev-server',
        './src/index.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'static')
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : [{ loader : 'babel-loader' ,
                options :
                { presets :
                  [
                    ['env', {"modules" : false}],
                    'react'
                  ]
                }
              }, 'eslint-loader']
      },
      {
        test : /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
         test: /\.(gif|png|jpg|svg)$/,
        use : { loader: 'url-loader' , options: {limit: 10000}}
      }
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name : 'vendor',
      minChunks : function (module) {
        return module.userRequest && module.userRequest.indexOf('node_modules') >= 0
      }
    }),
     new ExtractTextPlugin({
      filename : "main.css",
      allChunks : true
    }),
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NamedModulesPlugin()
  ],
  devServer : {
    hot: true,
    contentBase : path.resolve(__dirname, 'static'),
    publicPath : '/',
    port : 7000,
    stats: 'minimal',
    historyApiFallback: true,
    host: 'localhost',
  },
  devtool: 'inline-source-map'
};
