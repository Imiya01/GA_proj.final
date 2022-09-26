const rating = document.querySelectorAll('.rating a');

rating.forEach((thumbs, index) => {
  thumbs.addEventListener('click', () => {
    console.log(`star ${index + 1} was clicked`);
  });
});
