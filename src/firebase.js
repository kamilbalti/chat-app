import firebase from "firebase"
var firebaseConfig = {
    apiKey: "AIzaSyCxBtzQZHugqKFn8I3Ztb6IshyqFwaVCmo",
    authDomain: "website-32599.firebaseapp.com",
    projectId: "website-32599",
    storageBucket: "website-32599.appspot.com",
    messagingSenderId: "460546011640",
    appId: "1:460546011640:web:f501f706d4cb699802260d",
    measurementId: "G-2TZ1P8RSZR"
  };


  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


export default firebase;