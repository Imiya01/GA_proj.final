import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js';
import {
  getDatabase,
  set,
  get,
  update,
  remove,
  ref,
  child
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCPAX2TtBekrmRhw5Bl6MVW_JDJxIosgIU',
  authDomain: 'boilerplate01.firebaseapp.com',
  databaseURL: 'https://boilerplate01-default-rtdb.firebaseio.com',
  projectId: 'boilerplate01',
  storageBucket: 'boilerplate01.appspot.com',
  messagingSenderId: '273203137658',
  appId: '1:273203137658:web:3798ffac3083f2285f3fc3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

document.getElementById('submit').addEventListener('click', writeUserData);
document.getElementById('readDataBtn').addEventListener('click', getData);
document.getElementById('update').addEventListener('click', updateData);
document.getElementById('delete').addEventListener('click', deleteData);


function writeUserData(event) {
  event.preventDefault();
  const selectedReview = document.getElementById('selectedReview').value;
  const rating = document.getElementById('rating').value;
  const reference = ref(db, 'Reviewers/');
  set(reference, {
      selectedReview,
      rating,
      userID: userID.value
  })
  .then(()=>{
    alert("Review added successfully");
})
.catch((error)=>{
    alert(error);
});
}


function getData() {
  const dbref = ref(db);

  get(child(dbref, "Reviewers/" + userID.value))
  .then((snapshot)=>{
      if(snapshot.exists()){
        findID.innerHTML = "Review Title: " + snapshot.val().selectedReview;
        findRating.innerHTML = "Comment: " + snapshot.val().rating;
      } else {
          alert("No data found");
      }
  })
  .catch((error)=>{
      alert(error)
  })
  
}

function updateData(){
  update(ref(db, "Reviewers/"+ userID.value),{
      rating: updateRating.value
  })
  .then(()=>{
      alert("Data updated successfully");
  })
  .catch((error)=>{
      alert(error);
  });
}

function deleteData(){
  remove(ref(db, "Reviewers/"+ userID.value))
  .then(()=>{
      alert("Data deleted successfully");
  })
  .catch((error)=>{
      alert(error);
  });
}

