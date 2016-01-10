var webpack = require('webpack');

// Bundle entry point
var entry = ['./components/App.jsx'];

// Necessary webpack loaders for converting our content:
var webpackLoaders = [
  'babel-loader',
  __dirname + '/lib/latex-loader',
  __dirname + '/lib/pre-loader',
  __dirname + '/lib/p-loader'
];

// Dev mode: make certain concessions to speed up dev work:
if(process.argv.indexOf("--prod") === -1) {
  // use the webpack hot Reload server:
  entry.push('webpack/hot/dev-server');

  // allow textareas in  dev mode:
  webpackLoaders.push(__dirname + '/lib/textarea-loader');
}

// And the final config that webpack will read in.
module.exports = {
  entry:  entry,
  output: {
    path: __dirname,
    filename: 'article.js'
  },
  module: {
    loaders: [
      { test: /\.(png|gif)$/, loader: "file?name=images/packed/[hash].[ext]" },
      { test: /\.less$/, loader: "style!css!less" },
      {
        test: /.jsx?$/,
        include: /components/,
        loaders: webpackLoaders
      }
    ]
  },
};
