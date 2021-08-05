const path = require('path');

const SRC_DIR = path.join(__dirname, 'Client', 'src', 'components');
const OUT_DIR = path.join(__dirname, 'public');

module.exports = {
  entry: path.join(SRC_DIR, 'index.jsx'),
  output: {
    path: OUT_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.(js$|jsx)$/,
        exclude: /node_modules/,
        use: { //origina: use: 'babel-loader'
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },

  watchOptions: {
    poll: 500,
    ignored: ['./node_modules']
  }
};