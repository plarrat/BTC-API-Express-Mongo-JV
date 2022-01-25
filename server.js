const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = mongoose.connect('mongodb://localhost/db_jv_btc', {
  useNewUrlParser: true,
})

mongoose.connection.on('open', () => console.log('Connexion réussie 😁'))

const Constructeurs = require('./schemas/constructeurs.schemas')

const server = express()

server.use(cors())

server.get('/', (req, res) => {
  res.writeHead(200)
  res.end('<h1>Bienvenue sur notre API</h1>')
})

server.get('/constructeurs', (req, res) => {
  Constructeurs.find({}, (err, constructeurs) => {
    if (err) {
      console.log('Erreur lors de la récupération des constructeurs')
      console.log(err)
    } else {
      console.log(constructeurs)
      res.json(constructeurs)
    }
  })
})

server.listen(3000)
