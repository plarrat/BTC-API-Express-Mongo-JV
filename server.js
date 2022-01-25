const express = require('express')
const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://localhost/db_jv_btc', {
  useNewUrlParser: true,
})

mongoose.connection.on('open', () => console.log('Connexion réussie'))

const server = express()

server.get('/', (req, res) => {
  res.writeHead(200)
  res.end('<h1>Bienvenue sur notre API</h1>')
})

server.listen(3000)
