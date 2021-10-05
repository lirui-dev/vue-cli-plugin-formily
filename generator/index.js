module.exports = (api, options, preset) => {
  api.extendPackage({
    dependencies: {
      '@formily/reactive': '^2.0.0-rc.12',
      '@formily/core': '^2.0.0-rc.12',
      '@formily/vue': '^2.0.0-rc.12',
    }
  })

  if (api.invoking) {
    console.log(options)
    if (options.installUIComponent.includes('Element')) {
      api.extendPackage({
        dependencies: {
          '@formily/element': '^2.0.0-rc.12',
          'element-ui': '^2.15.6',
          'babel-plugin-import': '^v1.13.3',
          'babel-plugin-component': '^v1.1.1',
          "lodash": "^4.17.21",
        },
        babel: {
          plugins: [
            [
              "component",
              {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
              }
            ],
            [
              "import",
              {
                "libraryName": "@formily/element",
                "libraryDirectory": "esm",
                "style": true
              }
            ]
          ]
        },
      })
    }
    if (options.installUIComponent.includes('Vant')) {
      api.extendPackage({
        dependencies: {
          '@formily/vant': '^2.0.0-rc.12',
          'vant': '^2.12.29',
          'babel-plugin-import': '^v1.13.3',
          "lodash": "^4.17.21",
        },
        babel: {
          plugins: [
            [
              "import",
              {
                "libraryName": "vant",
                "libraryDirectory": "es",
                "style": true
              }
            ],
            // [
            //   "import",
            //   {
            //     "libraryName": "@formily/vant",
            //     "libraryDirectory": "esm",
            //     "style": true
            //   }
            // ],
          ]
        },
      })
    }
  }

  api.render('./template')
}