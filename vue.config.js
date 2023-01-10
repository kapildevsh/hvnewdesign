
module.exports = {  
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:8000'
      }
    }
  },
};
