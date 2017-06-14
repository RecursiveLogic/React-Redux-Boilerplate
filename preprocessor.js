const hook = require('css-modules-require-hook')
const sass = require('node-sass')

hook({
  extensions: [ '.css' ],
  generateScopedName: '[local]___[hash:base64:5]',
  preprocessCss: (data, file) => sass.renderSync({ file }).css
})
