
module.exports = {
  transpileDependencies: ["vuetify"],
  // productionSourceMap: false,
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:5050'
      }
    }
  },
};
