// const { initializeApp, cert } = require('firebase-admin/app')
// const { getFirestore } = require('firebase-admin/firestore')

// const serviceAccount = require('./creds.json')

// initializeApp({
//     credential: cert(serviceAccount)
// })

// const db = getFirestore()

// module.exports = { db }

const admin = require('firebase-admin');

const serviceAccount = require('./creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bdcadsrank.firebaseio.com'
});

const db = admin.firestore();

module.exports = { db };
