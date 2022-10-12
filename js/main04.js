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
            // document.getElementById('submitComment').addEventListener('click', writeUserData);
        });
}


function getHTML(data) {
    return data
        .map(({ title, url, source }) => generateHTML(title, url, source))
        .join('');
}

function selectReview(e) {
    document.getElementById('selectedReview').value = e.target.innerText;
}

function generateHTML(title, url, source) {

    return `<div class="datapiece">
    <h1 class= "link"> 
    <p> Link</p> <a href='${url}'> See more </a> </h1>
    <h1 class= "link"> 
    <p> Click on the title below to select, then add comment in the review section above</p> <span class='rating' onclick='selectReview(event)'><a>${title}</a> </span>
    </h1>
    <h1 class= "link"> 
    <p> Source</p> ${source}</h1>
        </div>`;
}


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