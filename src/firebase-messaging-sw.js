importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyAotOzRu3AY2MRWVLnw3F0P5Ohh-BTWaDg",
    authDomain: "push-notification-ecbb6.firebaseapp.com",
    projectId: "push-notification-ecbb6",
    storageBucket: "push-notification-ecbb6.appspot.com",
    messagingSenderId: "340187963205",
    appId: "1:340187963205:web:e2f5c796cb23891c37682c",
    measurementId: "G-4BCTP8LH3Z"
});
const messaging = firebase.messaging();