
// // Create the scene
// import * as THREE from 'three';

//     // Create the scene
//     const scene = new THREE.Scene();

//     // Set up the camera with a perspective view
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     // Create the renderer
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Create the noise and fractal functions
//     const sketchShader = {
//       uniforms: {
//         time: { type: 'f', value: 0.0 },
//         screenWidth: { type: 'f', value: window.innerWidth }
//       },
//       vertexShader: `
//         uniform float time;
//         varying vec2 vUv;
//         varying vec3 vPosition;
//         void main() {
//           vUv = uv;
//           vPosition = position;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform float time;
//         varying vec2 vUv;
//         varying vec3 vPosition;
        
//         float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
//         vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
//         vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

//         float noise(vec3 p){
//             vec3 a = floor(p);
//             vec3 d = p - a;
//             d = d * d * (3.0 - 2.0 * d);

//             vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
//             vec4 k1 = perm(b.xyxy);
//             vec4 k2 = perm(k1.xyxy + b.zzww);

//             vec4 c = k2 + a.zzzz;
//             vec4 k3 = perm(c);
//             vec4 k4 = perm(c + 1.0);

//             vec4 o1 = fract(k3 * (1.0 / 41.0));
//             vec4 o2 = fract(k4 * (1.0 / 41.0));

//             vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
//             vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

//             return o4.y * d.y + o4.x * (1.0 - d.y);
//         }
//         void main() {
//             float n = noise(vPosition + time);
//             gl_FragColor = vec4(n,0, 0.0, 1.0);
//         }

//       `
//     };

//     // Create a plane geometry that matches the window's aspect ratio
//     const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

//     // Create the shader material with the noise effect
//     const material = new THREE.ShaderMaterial(sketchShader);

//     // Create the plane mesh and add it to the scene
//     const plane = new THREE.Mesh(geometry, material);
//     scene.add(plane);

//     // Adjust the camera to fill the entire screen
//     camera.position.z = 3; // Position the camera far enough to see the whole plane

//     // Update camera's aspect ratio based on window size
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     // Handle window resizing
//     window.addEventListener('resize', () => {
//       // Update renderer size
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Update camera aspect ratio and projection matrix
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//     });

//     // Create the animation loop
//     function animate() {
//       requestAnimationFrame(animate);

//       // Update time for the shader
//       material.uniforms.time.value += 0.05;

//       // Render the scene from the perspective of the camera
//       renderer.render(scene, camera);
//     }

//     // Start the animation loop
//     animate();


// // Handle window resizing
// window.addEventListener("resize", () => {
//   camera.left = window.innerWidth / -200;
//   camera.right = window.innerWidth / 200;
//   camera.top = window.innerHeight / 200;
//   camera.bottom = window.innerHeight / -200;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// });
