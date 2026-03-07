import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDBkIaHtNokbzfIzR6BZIsX3ckNyYw1B9U",
  authDomain: "kce-college-projects.firebaseapp.com",
  databaseURL:
    "https://kce-college-projects-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kce-college-projects",
  storageBucket: "kce-college-projects.firebasestorage.app",
  messagingSenderId: "1005185553772",
  appId: "1:1005185553772:web:f35cb8fc84053db753cf49",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ================= FETCH FUNCTION =================

function fetchNotifications(path, containerId, sectionId) {

  const dbRef = ref(db, path);

  onValue(dbRef, (snapshot) => {

    const container = document.getElementById(containerId);
    const section = document.getElementById(sectionId);

    container.innerHTML = "";

    if (!snapshot.exists()) {
      section.style.display = "none";
      return;
    }

    section.style.display = "block";

    const dataArray = [];

    snapshot.forEach(child => {
      dataArray.push(child.val());
    });

    // Sort latest first
    dataArray.sort((a, b) => b.timestamp - a.timestamp);

    dataArray.forEach(data => {

      const card = document.createElement("div");
      card.className = "notification-card";

      card.innerHTML = `
        <div class="timestamp"><a href="${data.pdflinks}" target="_blank">PDF</a></div>
        <div class="mainTitle">${data.title}</div>
        <div class="titleMessage">${data.message}</div>
        <div class="time">${data.time}</div>
          `;

      container.appendChild(card);
    });

  });
}

// Call for all 3 types
fetchNotifications("MainNotification", "mainContainer", "mainSection");
fetchNotifications("RegularNotification", "regularContainer", "regularSection");
fetchNotifications("Notices", "noticeContainer", "noticeSection");