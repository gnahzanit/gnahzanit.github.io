document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button-one').addEventListener('click', function() {
        changeButtonImage('image-one', 'assets/images/website-logo.png');
        showContent('content-one');
    });

    document.getElementById('button-two').addEventListener('click', function() {
        changeButtonImage('image-two', 'assets/images/website-logo.png');
        showContent('content-two');
    });

    document.getElementById('button-three').addEventListener('click', function() {
        changeButtonImage('image-three', 'assets/images/website-logo.png');
        showContent('content-three');
    });

    showContent('content-one'); // Show default content on load
});

function showContent(contentId) {
    document.querySelectorAll('.content-item').forEach(function(content) {
        content.classList.remove('active');
    });
    document.getElementById(contentId).classList.add('active');
}

function changeButtonImage(imageId, activeImage) {
    // Reset all button images to default
    document.getElementById('image-one').src = 'assets/images/wip-inv.png'; // Default image for button one
    document.getElementById('image-two').src = 'assets/images/wip-inv.png'; // Default image for button two
    document.getElementById('image-three').src = 'assets/images/wip-inv.png'; // Default image for button three

    // Change the clicked button's image to the active image
    document.getElementById(imageId).src = activeImage;
}
