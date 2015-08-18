module.exports = {
  entry: './main.js',
  output: {
    filename: './build/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(bower_components|node_modules)/,
        loader: 'babel'
      }
    ]
  }
};
