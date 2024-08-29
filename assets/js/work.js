document.addEventListener('DOMContentLoaded', function () {
    showContent('content-one');
});

document.getElementById('button-one').addEventListener('click', function() {
    showContent('content-one');
});

document.getElementById('button-two').addEventListener('click', function() {
    showContent('content-two');
});

document.getElementById('button-three').addEventListener('click', function() {
    showContent('content-three');
});

function showContent(contentId) {
    document.querySelectorAll('.content-item').forEach(function(content) {
        content.classList.remove('active');
    });
    document.getElementById(contentId).classList.add('active');
}



document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
  
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`nav a[href="#${section.id}"]`).classList.add('active');
      } else {
        document.querySelector(`nav a[href="#${section.id}"]`).classList.remove('active');
      }
    });
  });
  