require('babel-register')()
const { JSDOM } = require('jsdom')

const exposedProperties = ['window', 'navigator', 'document']
const DOM = new JSDOM()

Object.keys(DOM).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties = [...exposedProperties, property]
    global[property] = document.defaultView[property]
  }
})

DOM.navigator = { userAgent: 'node.js' }

documentRef = DOM
