// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js';
// import {
//   getDatabase,
//   ref,
//   set,
//   onValue,
// } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCPAX2TtBekrmRhw5Bl6MVW_JDJxIosgIU',
//   authDomain: 'boilerplate01.firebaseapp.com',
//   databaseURL: 'https://boilerplate01-default-rtdb.firebaseio.com',
//   projectId: 'boilerplate01',
//   storageBucket: 'boilerplate01.appspot.com',
//   messagingSenderId: '273203137658',
//   appId: '1:273203137658:web:3798ffac3083f2285f3fc3',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
// // console.log('firebase app:', app);

// // Listeners
// var delta = document.getElementById('form');
// if(delta){
// delta.addEventListener('submit', writeUserData);
// }

// // document.getElementById('form').addEventListener('submit', writeUserData);
// // document.getElementById('readDataBtn').addEventListener('click', getData);

// function writeUserData(event) {
//   event.preventDefault();
  
//   const reference = ref(db, 'users/');
//   set(reference, {
//     nameField: document.getElementById('nameField').value,
//     ageField: document.getElementById('ageField').value,
//   });
// }

// function getData() {
//   const userRef = ref(db, 'users');
//   onValue(userRef, (snapshot) => {
//     firebaseData = snapshot.val();
//   });
// }


let datum = document.querySelector('.datum');
let searchbar = document.getElementById('searchbar');
let dataStore = [];
let firebaseData = {};
let rating = document.querySelectorAll('.rating a');

getdata();

function getdata() {
  fetch(
    'https://api.mediastack.com/v1/news?access_key=bff3a86eb00042ed68258f5c86a6318d',
  )
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      dataStore = data.data;
      datum.innerHTML = getHTML(data.data);
    });
}

function updateData() {
  // console.log('mess with data here:', firebaseData);
  // update data here
}

function getHTML(data) {
  return data
    .map(({ title, url, source }) => generateHTML(title, url, source))
    .join('');
}

function generateHTML(title, url, source) {

  return `<div class="datapiece"><h1 class= "link"> <p> Link</p> <a> ${url} </a> </h1><h1 class= "link"> <p> Title </p> ${title}</h1><h1 class= "link"> <p> Source</p> ${source}</h1>
        </div><div class="rating"><a>👍</a> <form id="form"><input type = "text" placeholder = "name" id="nameField">
  <input type = "text" placeholder = "age" id="ageField"></form><button id="submitComment" type="submit" value="Submit">Submit</button></div>`;
}

document.getElementById('submitComment').addEventListener('click', writeUserData);

function noResultHTML() {
  return `<div class="datapiece"><h1 class= "link"> </h1><h1 class= "link"></h1> <h1 class="link">No Results Found</h1> <h1 class= "link"></h1>
      </div>`;
}

searchbar.addEventListener('keyup', function (e) {
  const currentword = e.target.value;
  const filteredData = dataStore.filter((o) => o.title.includes(currentword));
  datum.innerHTML = filteredData.length
    ? getHTML(filteredData)
    : noResultHTML();
});
