var firebaseConfig = {
    apiKey: "AIzaSyBUd1tT_CE3TibpZCQ2dsmf9bBPNZ8Ga60",
    authDomain: "krizen-4cc77.firebaseapp.com",
    projectId: "krizen-4cc77",
    storageBucket: "krizen-4cc77.appspot.com",
    messagingSenderId: "710745925047",
    appId: "1:710745925047:web:d906d1ac65eea46cfbb432",
    measurementId: "G-X17CZKGBYC"
    
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const auth =  firebase.auth();
    const database = firebase.firestore();
   
    //signIN function
    function  signIn(){
      var email = document.getElementById("email");
      var password  = document.getElementById("password");
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then(user=> {
        window.open("shopping.html");
        console.log("redirect")
        wrongEmail.style.display = "none"

      })
      .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
      
              if (errorCode === 'auth/user-not-found') {
                 console.log('user not found');
              } else if (errorCode === 'auth/wrong-password') {
                 console.log('Password invalid');
              }
      });
   

    }
  
    //signOut
    function signOut(){
      auth.signOut();
      alert("SignOut Successfully");
    }
  
    //active user to homepage
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        var uid = user.uid;
        alert("Active user ");
      }else{
        
      }
    })

function googleSign(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  function twitterSign(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
  firebase.auth().signInWithRedirect("https://krizen-4cc77.firebaseapp.com/__/auth/handler");
  firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }
   




  firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function addToCart(){
        window.open("cart.html");
}
function checkOut(){
  var fullName=document.getElementById("fname");
  var address=document.getElementById("adr");
  var city=document.getElementById("city");
  var state=document.getElementById("state");
  var zip=document.getElementById("zip");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      database.collection("cart").doc(user.uid).set({
        fullName:fullName.value,
        address:address.value,
        citye:city.value,
        state:state.value,
        zip: zip.value
        
    })
    .then((docRef) => {
      alert("Order Placed");
    })
    .catch((error) => {
        console.log("Error adding document: ", error);
    });
      console.log(user.uid);
    } else {
      // User not logged in or has just logged out.
    }
  });
}

  //signup function
  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(email.value,password.value)
      promise.catch(e=>alert(e.message));
    alert("SignUp Successfully");
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
    var UserName=document.getElementById("UserName");
    var mobileNo=document.getElementById("mobileNo");
    var Age=document.getElementById("Age");
    var email=document.getElementById("email")
        database.collection("users").doc(user.uid).set({
          UserName:UserName.value,
          mobileNo:mobileNo.value,
          Age:Age.value,
          email:email.value
      })
      .then((docRef) => {
          alert("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.log("Error adding document: ", error);
      });
        console.log(user.uid);
      } else {
        // User not logged in or has just logged out.
      }
   });
  }
  