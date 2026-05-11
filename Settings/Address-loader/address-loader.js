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
  
  // ফায়ারবেস ইনিশিয়ালাইজ করা
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  
  // ডাটা সিঙ্ক করার ফাংশন
  function syncSchoolData() {
    const nameElements = document.querySelectorAll('.school_name');
    const addressElements = document.querySelectorAll('.contact-address');
    
    // settings কালেকশনের school_info ডকুমেন্ট থেকে ডাটা নেওয়া হচ্ছে
    db.collection("settings").doc("school_info")
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          
          // স্কুল নাম আপডেট (যদি school_name ফিল্ড থাকে)
          if (data.school_name) {
            nameElements.forEach(el => {
              el.innerText = data.school_name;
            });
          }
          
          // ঠিকানা আপডেট (যদি address ফিল্ড থাকে)
          if (data.address) {
            addressElements.forEach(el => {
              el.innerText = data.address;
            });
          }
        } else {
          console.log("ডকুমেন্টটি খুঁজে পাওয়া যায়নি!");
        }
      }, (error) => {
        console.error("ডাটা লোড করতে সমস্যা হয়েছে: ", error);
      });
  }
  
  // পেজ লোড হলে রান হবে
  window.addEventListener('DOMContentLoaded', syncSchoolData);
})();