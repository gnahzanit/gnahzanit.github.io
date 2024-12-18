import * as THREE from 'three';

// Create the scene
var scene = new THREE.Scene();
scene.background = new THREE.Color('#F7F4F0');
scene.fog = null;

var camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight);
camera.position.set(0, 0, 15);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setAnimationLoop(animationLoop);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", (event) => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

var light = new THREE.DirectionalLight('white', 3);
light.position.copy(camera.position);
scene.add(light);

// Parameters for particles
const N = 20000;
const p = [];
const textureLoader = new THREE.TextureLoader();

// Load all textures and then create the particles
const particleTextures = [
    textureLoader.load('assets/images/texture/Untitled_Artwork.png', textureLoadedCallback),
];

// Track if all textures are loaded
let texturesLoaded = 0;

function textureLoadedCallback(texture) {
    texturesLoaded++;
    console.log(`Texture loaded: ${texture}`);
    if (texturesLoaded === particleTextures.length) {
        createParticles();
    }
}

function createParticles() {
    console.log("Creating particles...");

    // Define color palette (3 colors)
    const colors = [
        new THREE.Color(0xc2b5a6), // Red
        new THREE.Color(0xc4beb8), // Green
        new THREE.Color(0xd7cbbc), // Blue
    ];

    // Create particles with fixed positions
    for (let i = 0; i < N; i++) {
        // Create a sprite material for each particle, assign texture here
        const randomTextureIndex = Math.floor(Math.random() * particleTextures.length);
        const texture = particleTextures[randomTextureIndex];
        console.log(`Assigning texture to particle ${i}:`, randomTextureIndex);

        // ⭐ Create a Canvas to rotate the texture
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to match texture size
        canvas.width = texture.image.width;
        canvas.height = texture.image.height;

        // Draw the texture to the canvas
        ctx.drawImage(texture.image, 0, 0);

        // Apply random rotation to the canvas context
        const randomRotation = Math.random() * -5; // Random rotation between 0 and 90 degrees
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.save(); // Save the current context state
        ctx.translate(canvas.width / 2, canvas.height / 2); // Move to the center
        ctx.rotate(THREE.MathUtils.degToRad(randomRotation)); // Rotate by random amount
        ctx.drawImage(texture.image, -canvas.width / 2, -canvas.height / 2); // Draw the image at the center
        ctx.restore(); // Restore the context to its original state

        // Create a new texture from the rotated canvas
        const rotatedTexture = new THREE.CanvasTexture(canvas);

        // Randomly choose a color from the palette
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Create the sprite material with the rotated texture and random color
        const spriteMaterial = new THREE.SpriteMaterial({
            map: rotatedTexture, // Use the rotated texture
            transparent: true, // Enable transparency for smooth fade-in
            opacity: 0.5, // Set opacity to 50%
            depthWrite: false, // Prevent overwriting for blending
            // blending: THREE.NormalBlending, // Additive blending for glowing effect
            color: randomColor // Apply the random color
        });
        

        const particle = new THREE.Sprite(spriteMaterial);

        // Calculate the aspect ratio of the texture (width / height)
        const aspectRatio = texture.image.width / texture.image.height;

        // Define a fixed height for the particle
        const spriteHeight = 0.1;

        // Set the particle scale according to the aspect ratio and fixed height
        particle.scale.set(spriteHeight * aspectRatio, spriteHeight, 1); // This ensures the texture isn't stretched

        // Set a fixed random position on screen for each particle
        particle.position.set(
            (Math.random() - 0.5) * 20, // Random X position
            (Math.random() - 0.5) * 20, // Random Y position
            0 // Z position stays fixed
        );

        // Store a random appearance toggle time
        particle.appearanceToggleTime = Math.random() * 3;

        // Store the initial opacity state
        particle.isVisible = 0.5; // Randomly determine if the particle starts visible or not

        console.log(`Particle ${i} initialized at position:`, particle.position);

        p.push(particle);
        scene.add(particle);
    }
}

// If textures are already loaded, create the particles immediately
if (texturesLoaded === particleTextures.length) {
    createParticles();
}

// Define the animation loop
function animationLoop(t) {
    t = t / 1000; // Convert time to seconds

    for (let i = 0; i < p.length; i++) {
        const particle = p[i];
        particle.material.opacity = 0.3; // Set constant opacity to 50%

        // Randomly toggle visibility at different intervals
        if (Math.random() < 0.001) { // 1% chance to toggle visibility each frame
            particle.isVisible = !particle.isVisible;
            // Store the time when visibility was toggled
            particle.visibilityToggleTime = t;
        }

        if (particle.isVisible) {
            // Fade in effect
            const timeSinceToggle = t - particle.visibilityToggleTime; // Time since toggle visibility
            const fadeInSpeed = 0.01; // Slow down the fade-in speed
            const opacity = Math.min(timeSinceToggle * fadeInSpeed, 0.3); // Fade in gradually, until 0.3 opacity
            particle.material.opacity = opacity;
        } 
        else {
            // Fade out effect
            const timeSinceToggle = t - particle.visibilityToggleTime; // Time since toggle visibility
            const fadeOutSpeed = 0.01; // Slow down the fade-out speed
            const opacity = Math.max(0, 0.3 - (timeSinceToggle * fadeOutSpeed)); // Fade out gradually
            particle.material.opacity = opacity;
        }
    }

    renderer.render(scene, camera);
}



    // // Create the scene
    // const scene = new THREE.Scene();

    // // Set up the camera with a perspective view
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // // Create the renderer
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    // // Create the noise and fractal functions
    // const sketchShader = {
    //   uniforms: {
    //     time: { type: 'f', value: 0.0 },
    //     screenWidth: { type: 'f', value: window.innerWidth }
    //   },
    //   vertexShader: `
    //     uniform float time;
    //     varying vec2 vUv;
    //     varying vec3 vPosition;
    //     void main() {
    //       vUv = uv;
    //       vPosition = position;
    //       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //     }
    //   `,
    //   fragmentShader: `
    //     uniform float time;
    //     varying vec2 vUv;
    //     varying vec3 vPosition;

    //     float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    //     vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    //     vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

    //     float noise(vec3 p){
    //         vec3 a = floor(p);
    //         vec3 d = p - a;
    //         d = d * d * (3.0 - 2.0 * d);

    //         vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    //         vec4 k1 = perm(b.xyxy);
    //         vec4 k2 = perm(k1.xyxy + b.zzww);

    //         vec4 c = k2 + a.zzzz;
    //         vec4 k3 = perm(c);
    //         vec4 k4 = perm(c + 1.0);

    //         vec4 o1 = fract(k3 * (1.0 / 41.0));
    //         vec4 o2 = fract(k4 * (1.0 / 41.0));

    //         vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    //         vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    //         return o4.y * d.y + o4.x * (1.0 - d.y);
    //     }

    //     void main() {
    //         // Zoom in the noise by scaling the position (making the features larger) // CHANGED
    //         float zoomFactor = 2.0; // Adjust this value to control zoom level // CHANGED
    //         float n = noise(vPosition / zoomFactor + time / 10.0); // CHANGED

    //         /// Define pastel color shades
    //         vec3 lightColor = vec3(247.0 / 255.0, 244.0 / 255.0, 240.0 / 255.0); // rgb(247, 244, 240)
    //         vec3 darkColor = vec3(255.0 / 255.0, 203.0 / 255.0, 156.0 / 255.0);
    //         // Blend between light and dark colors based on noise
    //         vec3 pastelColor = mix(lightColor, darkColor, n * 0.5 + 0.5); // Mix the two colors

    //         gl_FragColor = vec4(pastelColor, 1.0);
    //     }


    //   `
    // };

    // // Create a plane geometry that matches the window's aspect ratio
    // const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

    // // Create the shader material with the noise effect
    // const material = new THREE.ShaderMaterial(sketchShader);

    // // Create the plane mesh and add it to the scene
    // const plane = new THREE.Mesh(geometry, material);
    // scene.add(plane);

    // // Adjust the camera to fill the entire screen
    // camera.position.z = 3; // Position the camera far enough to see the whole plane

    // // Update camera's aspect ratio based on window size
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();

    // // Handle window resizing
    // window.addEventListener('resize', () => {
    //   // Update renderer size
    //   renderer.setSize(window.innerWidth, window.innerHeight);

    //   // Update camera aspect ratio and projection matrix
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    // });

    // // Create the animation loop
    // function animate() {
    //   requestAnimationFrame(animate);

    //   // Update time for the shader
    //   material.uniforms.time.value += 0.05;

    //   // Render the scene from the perspective of the camera
    //   renderer.render(scene, camera);
    // }

    // // Start the animation loop
    // animate();


// Handle window resizing
window.addEventListener("resize", () => {
  camera.left = window.innerWidth / -200;
  camera.right = window.innerWidth / 200;
  camera.top = window.innerHeight / 200;
  camera.bottom = window.innerHeight / -200;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
