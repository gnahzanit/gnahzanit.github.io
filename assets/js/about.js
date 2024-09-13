
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollIndicatorLinks = document.querySelectorAll('.scroll-indicator a');
  
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });
  
    scrollIndicatorLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
  });
  