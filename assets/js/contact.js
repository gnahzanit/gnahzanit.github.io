document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const mailtoLink = `mailto:tina.yizhou.zhang@gmail.com?subject=Contact%20from%20${name}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${name}%20(${email})`;
    
    window.location.href = mailtoLink;
  });