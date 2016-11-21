const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080
const staticPath = path.join(__dirname, 'static')

app.use(express.static(staticPath))

app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: staticPath
  })
})

app.listen(port, () => console.log('🌎 Listening on port:', port))
