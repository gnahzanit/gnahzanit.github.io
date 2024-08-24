const loader = document.getElementById("loading-screen");
window.addEventListener("load", function(){
    loader.style.display = "none";
})

document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.querySelector('#copyright-year').textContent = year;
  });

function changeImage(id, oldSrc, newSrc) {
const image = document.getElementById(id);
image.addEventListener('mouseover', function() {
  this.src = newSrc;
});
image.addEventListener('mouseout', function() {
    this.src = oldSrc;
  });
}

changeImage('home-img', 'assets/images/navbar/home.png', 'assets/images/navbar/home-onhov.png');
changeImage('about-img', 'assets/images/navbar/about.png', 'assets/images/navbar/about-onhov.png');
changeImage('works-img', 'assets/images/navbar/works.png', 'assets/images/navbar/works-onhov.png');
changeImage('art-img', 'assets/images/navbar/art.png', 'assets/images/navbar/art-onhov.png');
changeImage('contact-img', 'assets/images/navbar/contact.png', 'assets/images/navbar/contact-onhov.png');
