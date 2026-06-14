/ Подключение Firebase (CDN ОБЯЗАТЕЛЬНО должен быть в HTML!)
/*
Добавь в <head> каждого HTML:

<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
*/

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AlzaSyDfCJ5ojorbuk_904gVxDb6SSSvjyPmBcc",
    authDomain: "airsim-88c0f.firebaseapp.com",
    projectId: "airsim-88c0f",
    storageBucket: "airsim-88c0f.firebasestorage.app",
    messagingSenderId: "1016804711257",
    appId: "1:1016804711257:web:af85a70820f04f3f9eca48",
    measurementId: "G-7PJRZ3VN5C",
    databaseURL: "https://airsim-88c0f-default-rtdb.firebaseio.com/"
};

// Инициализация
firebase.initializeApp(firebaseConfig);

// База данных
const db = firebase.database();