var path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = {
  entry: [
        "babel-polyfill",
        './src/index.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
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
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin({
      filename : "main.css",
      allChunks : true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name : 'vendor',
      minChunks : function (module) {
        return module.userRequest && module.userRequest.indexOf('node_modules') >= 0
      }
    }),
    new CopyWebpackPlugin([{
        from : 'static',
        to : path.resolve(__dirname, 'dist')
    }])
  ]
};
