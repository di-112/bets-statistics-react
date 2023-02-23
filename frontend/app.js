const express = require('express')

const app = express()
const path = require('path')

const port = process.env.PORT || 3000

app.use(express.static('dist'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(port, error => {
  if (error) return console.log('error: ', error)
  return console.log('Server running on post: ', port)
})
