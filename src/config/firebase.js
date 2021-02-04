import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyA_sn3MHh3aLOQ2G1ud-59xfjHv5O9A3D0",
    authDomain: "blood-d37f3.firebaseapp.com",
    databaseURL: "https://blood-d37f3.firebaseio.com",
    projectId: "blood-d37f3",
    storageBucket: "blood-d37f3.appspot.com",
    messagingSenderId: "132046034981",
    appId: "1:132046034981:web:77e78453c7b5b8c7b987cc",
    measurementId: "G-RL0K70MKTK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const auth = firebase.auth()
  // const db = firebase.firestore()

  const SignUpUser = (email,password) => 
  {
    return auth.createUserWithEmailAndPassword(email,password)
  }

  const authenticateUserLogin = (email,password) => 
  {
    return auth.signInWithEmailAndPassword(email,password)
  }

  const getData = (id) =>
  {
    return firebase.firestore().collection('User').where('id', '==', id).get()
  }
  
  export {
    SignUpUser,
    authenticateUserLogin,
    getData,
    firebase
  }

