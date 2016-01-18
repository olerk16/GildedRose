export default {
  entry: [
    'babel-polyfill',  // initialize babel/es6 environment first
    './lib/index.js'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }  // run through babel for es6 features
    ]
  }
}
