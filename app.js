const express = require('express');
const { FieldValue } = require('firebase-admin').firestore;
const fs = require('fs');
const path = require('path');
const port = 3000;
const admin = require('firebase-admin');
const serviceAccount = require('./creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
// Le reste de votre code...


const formFilePath = path.join(__dirname, "data", "form-data.json")

app.use(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));

// Middleware pour traiter les données du formulaire
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Définir EJS comme moteur de template
app.set("view engine", "ejs");

// Définir le dossier des vues
app.set("views", path.join(__dirname, "views"));

// Données du tableau de bord
let formData = [];

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.render("index", { data: formData });
});

// Route pour la page du tableau de bord
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { formData });
});

// Route pour soumettre le formulaire
app.post('/submit', (req, res) => {
  const { nom, email } = req.body;
  const newFormData = { nom, email };

  db.collection('formData').add(newFormData)
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});



// // Route pour supprimer une donnée du tableau de bord
// app.delete('/dashboard/:index', (req, res) => {
//   const index = req.params.index;

//   db.ref('formData').once('value')
//     .then((snapshot) => {
//       const formDataSnapshot = snapshot.val();
//       const formDataKeys = Object.keys(formDataSnapshot);

//       if (index >= 0 && index < formDataKeys.length) {
//         const keyToDelete = formDataKeys[index];
//         db.ref('formData').child(keyToDelete).remove()
//           .then(() => {
//             res.sendStatus(204);
//           })
//           .catch((error) => {
//             console.error(error);
//             res.sendStatus(500);
//           });
//       } else {
//         res.sendStatus(404);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });


// Fonction pour générer un numéro de bon de commande aléatoire
function generateOrderNumber() {
  const randomNumber = Math.floor(Math.random() * 1000000) + 1;
  const orderNumber = `ADS${randomNumber.toString().padStart(6, "0")}`;
  return orderNumber;
}

// Page de confirmation qui affiche les informations envoyées
app.post("/confirmation", (req, res) => {
  const { nom, email, client, montant, url, telephone, raisonSocial } =
    req.body;

  const montantNum = parseFloat(montant);
  const currentDate = new Date().toLocaleDateString("fr-FR");
  const orderNumber = generateOrderNumber();
  const vat = montantNum * 0.2;
  const totalAmount = montantNum + vat;
  const monthlyPayment = totalAmount;

  const commercialInfo = client.split("-");
  const commercialNom = commercialInfo[0];
  const commercialEmail = commercialInfo[1];
  const commercialTelephone = commercialInfo[2];

  res.render("confirmation", {
    nom,
    email,
    client,
    montant: montantNum,
    vat,
    totalAmount,
    monthlyPayment,
    currentDate,
    orderNumber,
    commercialNom,
    commercialEmail,
    commercialTelephone,
    url,
    telephone,
    raisonSocial,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${port}`);
});
