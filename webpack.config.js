const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: 'html',
    port: 3000
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [{
        test: /\.(glsl|vert|frag)$/,
        exclude: [/node_modules/],
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          'ts-loader'
        ]
      }
    ]
  }
};