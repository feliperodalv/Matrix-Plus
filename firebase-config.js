// assets/js/firebase-config.js

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA_m8t2-rlFpbXF68JWK3qL8nhwY3ENBq4",
    authDomain: "matrixplus-films.firebaseapp.com",
    projectId: "matrixplus-films",
    storageBucket: "matrixplus-films.appspot.com",  // ⚡ corrigido (.app → .appspot.com)
    messagingSenderId: "755999011546",
    appId: "1:755999011546:web:cfa48f46869337e752abe3",
    measurementId: "G-5Y35PREFVY"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Inicializar autenticação
  const auth = firebase.auth();
  const db = firebase.firestore();