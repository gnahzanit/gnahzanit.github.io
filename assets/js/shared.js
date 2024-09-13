const channel = new BroadcastChannel('preload-channel');

// Check if assets are already loaded
if (!localStorage.getItem('assetsPreloaded')) {
    loadAssets(); // Preload assets
    localStorage.setItem('assetsPreloaded', 'true');
    channel.postMessage('assetsPreloaded'); // Notify other tabs
} else {
    console.log('Assets already preloaded.');
}

// Listen for messages from other tabs
channel.onmessage = (event) => {
    if (event.data === 'assetsPreloaded') {
        console.log('Assets preloaded in another tab.');
    }
};

async function loadAssets() {
    try {
        const response = await fetch('assets/list.json');
        const assets = await response.json();
        let loadedAssets = 0;

        function assetLoaded() {
            loadedAssets++;
            if (loadedAssets === assets.length) {
                console.log("All assets loaded.");
                document.getElementById('loading-container').classList.add('hidden');
                setTimeout(() => window.location.href = 'home.html', 500); // Redirect after loading
            }
        }

        function loadAsset(asset) {
            return new Promise((resolve, reject) => {
                const fileExtension = asset.split('.').pop().toLowerCase();
                const assetUrl = `${asset}`;

                if (asset.toLowerCase().includes('.ds_store')) {
                    resolve(); // Ignore .DS_Store files
                    return;
                }

                if (['jpg', 'png', 'gif', 'jpeg', 'bmp', 'svg', 'webp'].includes(fileExtension)) {
                    const img = new Image();
                    img.src = assetUrl;
                    img.onload = assetLoaded;
                    img.onerror = reject;
                } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
                    const video = document.createElement('video');
                    video.src = assetUrl;
                    video.preload = 'auto';
                    video.onloadeddata = assetLoaded;
                    video.onerror = reject;
                } else if (fileExtension === 'css') {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = assetUrl;
                    link.onload = assetLoaded;
                    link.onerror = reject;
                    document.head.appendChild(link);
                } else if (fileExtension === 'js') {
                    const script = document.createElement('script');
                    script.src = assetUrl;
                    script.onload = assetLoaded;
                    script.onerror = reject;
                    document.body.appendChild(script);
                } else if (['ttf', 'woff', 'woff2'].includes(fileExtension)) {
                    const fontFace = new FontFace('CustomFont', `url(${assetUrl})`);
                    fontFace.load().then((loadedFontFace) => {
                        document.fonts.add(loadedFontFace);
                        assetLoaded();
                    }).catch(reject);
                } else if (fileExtension === 'pdf') {
                    const pdfRequest = new XMLHttpRequest();
                    pdfRequest.open('GET', assetUrl, true);
                    pdfRequest.responseType = 'blob';
                    pdfRequest.onload = assetLoaded;
                    pdfRequest.onerror = reject;
                    pdfRequest.send();
                } else {
                    console.log(`${assetUrl} not recognized as a loadable asset.`);
                    resolve();
                }
            });
        }

        await Promise.all(assets.map(asset => loadAsset(asset)));
    } catch (error) {
        console.error('Error loading assets:', error);
    }
}



const cursor = document.querySelector("[data-cursor]");

window.addEventListener("mousemove", function(e) {
  const posX = e.clientX;
  const posY = e.clientY;
  cursor.style.left = `${posX}px`;
  cursor.style.top = `${posY}px`;
})

document.addEventListener('mouseover', (e) => {
  if (e.target.id === "fluffy") {
    cursor.style.backgroundImage = `url('assets/images/mouse/fluffy-mouse.gif')`;
  } else if (e.target.id === 'open-in-tab' || e.target.classList.contains('ep-proj-links')) {
    cursor.style.backgroundImage = `url('assets/images/mouse/open-in-tab-mouse.png')`;
  } else if (e.target.id === 'cursor-alt' || e.target.id === 'button-one' || e.target.id === 'button-two' || e.target.id === 'button-three' || e.target.id === 'art-img' || e.target.id === 'works-img' || e.target.id === 'about-img' || e.target.id === 'contact-img' || e.target.id === 'home-img') {
    cursor.style.backgroundImage = `url('assets/images/mouse/pointer-mouse.gif')`;
  } else {
    // cursor.style.backgroundImage = `url('assets/images/mouse/default-mouse.png')`;
    cursor.style.backgroundImage = `url('assets/images/mouse/fluffy-mouse.gif')`;
  }
});

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

    if (image) {
        image.addEventListener('mouseover', function() {
        this.src = newSrc;
        });
        image.addEventListener('mouseout', function() {
            this.src = oldSrc;
        });
    }
}

changeImage('home-img', 'assets/images/navbar/home.png', 'assets/images/navbar/home-onhov.png');
changeImage('about-img', 'assets/images/navbar/about.png', 'assets/images/navbar/about-onhov.png');
changeImage('works-img', 'assets/images/navbar/works.png', 'assets/images/navbar/works-onhov.png');
changeImage('art-img', 'assets/images/navbar/art.png', 'assets/images/navbar/art-onhov.png');
changeImage('contact-img', 'assets/images/navbar/contact.png', 'assets/images/navbar/contact-onhov.png');
