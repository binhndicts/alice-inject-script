var path = require('path');

module.exports = {
  mode: 'production',
  entry:  path.resolve(__dirname, 'src/app.ts'),
  output: {
    filename: 'inpage.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts'],
    modules: [
      'node_modules/',
    ]
  },
  module: {
    rules: [{
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      test: /\.tsx?$/,
      loader: "ts-loader"
    }]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
  },
};
