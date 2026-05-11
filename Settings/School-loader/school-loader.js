// Firebase SDKs (v8) Load করার জন্য (যদি HTML-এ লোড করা না থাকে)
// এটি অটোমেটিক আপনার সব পেজে ফায়ারবেস সাপোর্ট দেবে
(function() {
  const firebaseConfig = {
    apiKey: "AIzaSyCA6d95VTLNo_FAEzJCoOzuEhHCl5LeSqk",
    authDomain: "school-menejment.firebaseapp.com",
    projectId: "school-menejment",
    storageBucket: "school-menejment.firebasestorage.app",
    messagingSenderId: "348342436525",
    appId: "1:348342436525:web:41fc72cb02f824baa3bc24",
    measurementId: "G-GS91N1J5SH"
  };
  
  // ফায়ারবেস চেক করে ইনিশিয়ালাইজ করা
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  
  // মেইন ফাংশন যা নাম আপডেট করবে
  function syncSchoolName() {
    const elements = document.querySelectorAll('.school_name');
    
    db.collection("settings").doc("school_info")
      .onSnapshot((doc) => {
        if (doc.exists) {
          const name = doc.data().school_name;
          elements.forEach(el => {
            el.innerText = name;
          });
        }
      });
  }
  
  // পেজ লোড হলে রান হবে
  window.addEventListener('DOMContentLoaded', syncSchoolName);
})();