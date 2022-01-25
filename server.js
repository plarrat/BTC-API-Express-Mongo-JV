const express = require('express')

const server = express()

server.get('/', (req, res) => {
  res.writeHead(200)
  res.end('<h1>Bienvenue sur notre API</h1>')
})

server.listen(3000)
