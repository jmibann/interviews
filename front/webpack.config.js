const path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: __dirname,
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env'
          ]
        }
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'url-loader?limit=10000&mimetype=application/font-woff' }]
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'url-loader?limit=10000&mimetype=application/octet-stream' }]
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: "url-loader?limit=10000&mimetype=image/svg+xml" }]
      }
    ]
  },
  watchOptions: {
    poll: true
  }
};
