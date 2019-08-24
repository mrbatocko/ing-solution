const path = require('path');

module.exports = {
  style: {
    css: {
      loaderOptions: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname) + '/src'
    }
  },
  eslint: {
    configure: {
      rules: {
        "import/no-webpack-loader-syntax": "off"
      }
    }
  }
}