module.exports = {
  productionSourceMap: false,
  publicPath: '/pwa/',
  pwa: {
    name: 'PokéAPI Demo',
    shortName: 'PokéAPI Demo',
    themeColor: '#badafa',
    msTileColor: '#badafa',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'transparent',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    }
  }
}
