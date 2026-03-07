 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDBkIaHtNokbzfIzR6BZIsX3ckNyYw1B9U",
      authDomain: "kce-college-projects.firebaseapp.com",
      databaseURL: "https://kce-college-projects-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "kce-college-projects",
      storageBucket: "kce-college-projects.firebasestorage.app",
      messagingSenderId: "1005185553772",
      appId: "1:1005185553772:web:f35cb8fc84053db753cf49",
      measurementId: "G-KX5FDLYJCG"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    window.createNotification = function () {

      const title = document.getElementById("title").value.trim();
      const message = document.getElementById("message").value.trim();
      const pdflinks = document.getElementById("pdflinks").value.trim();

      const selectedType = document.querySelector('input[name="type"]:checked');

      if (!title || !message || !pdflinks || !selectedType) {
        alert("Please fill all fields and select notification type");
        return;
      }

      const notificationType = selectedType.value;

      const now = new Date();
      const formattedTime = now.toLocaleString();

      const newRef = push(ref(db, notificationType));

      set(newRef, {
        title: title,
        message: message,
        pdflinks: pdflinks,
        time: formattedTime,
        timestamp: Date.now()
      }).then(() => {

        document.getElementById("title").value = "";
        document.getElementById("message").value = "";
        document.getElementById("pdflinks").value = "";
        document.querySelectorAll('input[name="type"]').forEach(r => r.checked = false);

        setTimeout(() => {
         alert("Notification added Successfully!");
        }, 0);

      }).catch((error) => {
        alert("Error: " + error.message);
      });
    }