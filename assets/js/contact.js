document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('message');

    textarea.addEventListener('input', function () {
        this.style.height = 'auto'; // Reset the height to auto so it can shrink if needed
        this.style.height = (this.scrollHeight) + 'px'; // Set the height to the scroll height
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // const errorMessage = document.getElementById('error-message');

    // Email regex pattern
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate the email
    // if (!emailPattern.test(email)) {
    //     event.preventDefault(); // Prevent form submission
    //     errorMessage.textContent = "Please enter a valid email address.";
    //     errorMessage.style.display = "block";
    // } else {
        // errorMessage.style.display = "none"; // Hide error message if valid
        const mailtoLink = `mailto:tina.yizhou.zhang@gmail.com?subject=Contact%20from%20${name}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${name}%20(${email})`;
    
        window.location.href = mailtoLink;
    });