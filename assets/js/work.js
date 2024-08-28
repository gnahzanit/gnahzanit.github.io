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