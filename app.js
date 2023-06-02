const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const formFilePath = path.join(__dirname, 'data', 'form-data.json');

const data = require('./data/data.json');

// Middleware pour traiter les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Définir EJS comme moteur de template
app.set('view engine', 'ejs');

// Définir le dossier des vues
app.set('views', path.join(__dirname, 'views'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.render('index', { data: data });
});

// Route pour la barre de navigation
app.get('/navbar', (req, res) => {
  res.render('/');
});

// Route pour la page test
app.get('/test', (req, res) => {
  res.render('test', { data: data });
});

// Route pour la page du tableau de bord
app.get('/dashboard', (req, res) => {
  fs.readFile(formFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const formData = JSON.parse(data);
      res.render('dashboard', { formData: formData,  data: data });
    }
  });
});

app.post('/submit', (req, res) => {
  const { nom, email } = req.body;
  const formData = { nom, email };

  fs.readFile(formFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      let existingData = [];
      if (data) {
        existingData = JSON.parse(data);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      }
      existingData.push(formData);

      fs.writeFile(formFilePath, JSON.stringify(existingData), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.redirect('/dashboard');
        }
      });
    }
  });
});

// Suppression data 

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.delete('/dashboard/:index', (req, res) => {
  const index = req.params.index;

  fs.readFile(formFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      let existingData = JSON.parse(data);
      if (index >= 0 && index < existingData.length) {
        existingData.splice(index, 1);
      }
      fs.writeFile(formFilePath, JSON.stringify(existingData), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.redirect('/dashboard');
        }
      });
    }
  });
});


app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
