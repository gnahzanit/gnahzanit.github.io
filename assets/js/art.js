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


// document.addEventListener('DOMContentLoaded', function() {
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImage = document.getElementById('lightbox-image');
//     const closeBtn = document.getElementById('close-btn');
//     const prevBtn = document.getElementById('prev-btn');
//     const nextBtn = document.getElementById('next-btn');
//     const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
//     let currentIndex = 0;

//     galleryImages.forEach((image, index) => {
//         image.addEventListener('click', () => {
//             lightbox.classList.remove('hidden');
//             lightboxImage.src = image.src.replace('thumbnail', 'large'); // Assuming you have large versions of the images
//             currentIndex = index;
//         });
//     });

//     closeBtn.addEventListener('click', () => {
//         lightbox.classList.add('hidden');
//     });

//     prevBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
//         lightboxImage.src = galleryImages[currentIndex].src.replace('thumbnail', 'large');
//     });

//     nextBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex + 1) % galleryImages.length;
//         lightboxImage.src = galleryImages[currentIndex].src.replace('thumbnail', 'large');
//     });
// });

