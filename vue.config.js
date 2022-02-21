module.exports = {
  pwa: {
    name: 'My Assistant',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/firebase-messaging-sw.js',
      // ...other Workbox options...
    }
  }
}