const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = mongoose.connect('mongodb://localhost/db_jv_btc', {
  useNewUrlParser: true,
})

mongoose.connection.on('open', () => console.log('Connexion réussie 😁'))

const Constructeurs = require('./schemas/constructeurs.schemas')

const server = express()

server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

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

//POST == Ajout
server.post('/constructeurs/add', (req, res) => {
  Constructeurs.create(req.body)
  res.writeHead(201)
  res.end()
})

//DELETE == Suppression
server.delete('/constructeurs/:id', (req, res) => {
  const id = req.params.id
  Constructeurs.deleteOne({ _id: id }, err => {
    console.log('erreur suppression')
    console.log(err)
    // res.writeHead(409)
  })
  res.writeHead(205)
  res.end()
})

// PUT == Modification
server.put('/constructeurs/:id', (req, res) => {
  const id = req.params.id
  const elem = req.body
  Constructeurs.updateOne({ _id: id }, elem, (err, infos) => {
    if (err) console.log('Erreur de modification')
    res.writeHead(200)
    res.end()
  })
})

// Récupérer un document dans la base via son ID
server.get('/constructeurs/:id', async (req, res) => {
  const id = req.params.id
  let elem = await Constructeurs.findById(id)
  res.json(elem)
})

server.listen(3000)
