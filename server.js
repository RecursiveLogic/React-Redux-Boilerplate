const express = require('express')
const app = express()
const path = require('path')
const staticPath = path.join(__dirname, 'static')

app.use(express.static(staticPath))

app.get('*', (req, res) => {
    res.sendFile('index.html', {
        root: staticPath
    })
})

app.listen(process.env.PORT || 8080, () => {
    console.log('🌎Listening on port:', process.env.PORT || 8080)
})
