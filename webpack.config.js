const path = require('path');

module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'public/js')
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  },
  {
    entry: './src/index.scss',
    output: {
      filename: 'index.css',
      path: path.resolve(__dirname, 'public/css')
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            "sass-loader"
          ],
        }
      ],
    },
  }
];

