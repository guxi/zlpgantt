module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip'
    }
  ],
  plugins: [
    ['@electron-forge/plugin-webpack', {
      devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
      mainConfig: './webpack.main.config.js',
      renderer: {


        config: './webpack.renderer.config.js',
        entryPoints: [{
          name: 'main_window',
          html: './src/index.html',
          js: './src/renderer.js'
        }]
      }
    }]
  ],
}