
    // Your web app's Firebase configuration
    var firebaseConfig = {
        // Your web app's Firebase configuration
  
    apiKey: "AIzaSyDlOagakkHp7aAKyd3YUR3GbZ23LEcwGnE",
    authDomain: "auth-1344c.firebaseapp.com",
    projectId: "auth-1344c",
    storageBucket: "auth-1344c.appspot.com",
    messagingSenderId: "376919232071",
    appId: "1:376919232071:web:3d7dbcc4ae89396f2a2b62"
  };
  // YOUR FIREBASE CREDENTIALS HERE 
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const fs = firebase.firestore();