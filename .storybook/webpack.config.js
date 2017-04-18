module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '']
  },
  module: {
    loaders: [
      {
        test: /.(ts|tsx)/,
        exclude: /node_modules/,
        loader: 'ts'
      }
    ]
  }
}