require('babel-register')()
const { JSDOM } = require('jsdom')

const DOM = new JSDOM()

let exposedProperties = ['window', 'navigator', 'document']

Object.keys(DOM).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties = [...exposedProperties, property]
    global[property] = document.defaultView[property]
  }
})

DOM.navigator = { userAgent: 'node.js' }

documentRef = DOM
