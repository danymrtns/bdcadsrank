const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

const formFilePath = path.join(__dirname, 'data', 'form-data.json');

const data = require('./data/data.json');

// Middleware pour traiter les données du formulaire
app.use(express.urlencoded({ extended: false }));

// Définir EJS comme moteur de template
app.set('view engine', 'ejs');

// Définir le dossier des vues
app.set('views', path.join(__dirname, 'views'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.render('index', { data: data });
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

// Route pour la page du tableau de bord
// app.get('/test', (req, res) => {
//   fs.readFile(formFilePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     } else {
//       const formData = JSON.parse(data);
//       res.render('test', { formData: formData,  data: data });
//     }
//   });
// });

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

// Fonction pour générer un numéro de bon de commande aléatoire
function generateOrderNumber() {
  const randomNumber = Math.floor(Math.random() * 1000000) + 1; // Génère un nombre aléatoire entre 1 et 1 000 000
  const orderNumber = `ADS${randomNumber.toString().padStart(6, '0')}`; // Format du numéro de bon de commande, par exemple: CMD-000123
  return orderNumber;
}

// Page de confirmation qui affiche les informations envoyées
app.post('/confirmation', (req, res) => {
  const { nom, email, client, montant, url, telephone, raisonSocial } = req.body;

  const montantNum = parseFloat(montant);
  // Date
  const currentDate = new Date().toLocaleDateString('fr-FR');
  // Numéro de BDC (bon de commande)
  const orderNumber = generateOrderNumber();
  // Calcul Montant
  const vat = montantNum * 0.2;
  const totalAmount = montantNum + vat;
  const monthlyPayment = totalAmount;

  // Extraire les informations du commercial
  const commercialInfo = client.split('-');
  const commercialNom = commercialInfo[0];
  const commercialEmail = commercialInfo[1];
  const commercialTelephone = commercialInfo[2];

  res.render('confirmation', { nom, email, client, montant: montantNum, vat, totalAmount, monthlyPayment, currentDate, orderNumber, commercialNom, commercialEmail, commercialTelephone, url, telephone, raisonSocial, navbar: 'navbar'  });
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


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${port}`);
});
