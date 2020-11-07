const path = require('path')

const root = [__dirname, '..']

module.exports = {
  entry: {
    popup: path.join(...root, 'src/popup/index.tsx'),
    content: path.join(...root, 'src/content/index.ts'),
    options: path.join(...root, 'src/options/index.ts'),
  },
  output: {
    path: path.join(...root, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(...root, 'src/'),
      '@popup': path.resolve(...root, 'src/popup'),
    },
  },
}
