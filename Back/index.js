const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

let name = '';

// Endpoint pour définir le nom
app.post('/api/name', (req, res) => {
  const { name: userName } = req.body;
  name = userName;
  res.status(201).json({ message: 'Nom enregistré avec succès !!' });
});

// Endpoint pour récupérer le nom
app.get('/api/name', (req, res) => {
  res.status(200).json({ name });
});

// Exporter l'application pour Vercel
module.exports = app;
