module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: 'file-loader?name=icons/[name].[ext]'
    });
    config.module.rules.push({
      test: /\.mp4$/,
      use: 'file-loader?name=videos/[name].[ext]'
    });
    return config;
  }
};
