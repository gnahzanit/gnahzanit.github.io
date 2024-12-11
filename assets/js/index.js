import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import anime from 'animejs/lib/anime.es.js';
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);



// Initialize SplitType with the correct CSS selector
const h1_lines = new SplitType("#title-text", { types: 'lines' });

// GSAP timeline to animate each line
const title_timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".title-and-cat",
    start: "top-=1",
    end: "bottom 90%",
    toggleActions: "play complete none complete", // Ensure animation completes on scroll
    onUpdate: (self) => {
      // If user scrolls past the trigger, ensure animation finishes
      if (self.progress >= 1) {
        title_timeline.progress(1); // Set timeline to complete
      }
    },
  },
});


// Add a 'split-line' class to each line
h1_lines.lines.forEach((line, index) => {
  console.log(line); // Verify lines are split correctly
  line.classList.add('split-line');
});

// Animate the first word
title_timeline.from("#hello", {
    yPercent: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3',
  });
  
  // Animate the remaining words (starts after the first word finishes)
  title_timeline.from("#name", {
    yPercent: 100,
    opacity: 0,
    duration: 0.5,
    ease: 'power3',
  }, "start");
  
  title_timeline.from(".highlight", {
      yPercent: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power3',
    }, "start");
    title_timeline.from("#brief-intro", {
        y: 20,          // Start below the original position
        opacity: 0,     // Start invisible
        delay: 0.5,
        duration: 0.5,  // Animation duration for each word
        ease: "power3", // Smooth easing
    }); // Delay each word based on its index
    title_timeline.from("#my-care", {
        y: 20,          // Start below the original position
        opacity: 0,     // Start invisible
        delay: 0.5,
        duration: 0.5,  // Animation duration for each word
        ease: "power3", // Smooth easing
    }); // Delay each word based on its index

    title_timeline.to({}, { duration: 1 });

// Split the text into words
const fluffy_text = new SplitType('#its-fluffy', { types: 'words' });

// Animate each word
fluffy_text.words.forEach((word, index) => {
  // Add a class for styling/debugging (optional)
  word.classList.add('split-word');

  // Animate the "hop" effect
  title_timeline.from(word, {
    y: 20,          // Start below the original position
    opacity: 0,     // Start invisible
    duration: 0.1,  // Animation duration for each word
    ease: "elastic", // Smooth easing
    stagger: 0.1,   // Staggered delay between words
  }); // Delay each word based on its index
});

title_timeline.from("#arrow-container", {
    y: 20,          // Start below the original position
    opacity: 0,     // Start invisible
    delay: 0.5,
    duration: 1,  // Animation duration for each word
    ease: "elastic", // Smooth easing
}); // Delay each word based on its index

  anime({
    targets: '#arrow-path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'linear',
    duration: 900,
    endDelay: 8000,
    loop: true,
  });

  anime({
    targets: ['#arrow-shape'],
    opacity: [0, 1],
    easing: 'linear',
    duration: 50,
    delay: 900,
    endDelay: 7950,
    loop: true,
  });

  title_timeline.from("#fluffy", {
    y: 20,          // Start below the original position
    opacity: 0,     // Start invisible
    duration: 2,  // Animation duration for each word
    ease: "power4", // Smooth easing
  });


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create a GSAP timeline
const timeline = gsap.timeline();

// Select all cards
const cards = document.querySelectorAll('.on-scroll');

// Animate each card independently
cards.forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card, // Each card acts as its own trigger
      start: "top 85%", // Animation starts when the card enters the viewport
      end: "bottom 10%", // Ends when the card nears the bottom
      scrub: false, // No scroll-scrubbing, plays on trigger
      markers: true,
    },
    opacity: 0, // Fade in effect
    y: 50, // Slide up from 50px below
    duration: 0.3, // Slightly increased duration for smoother effect
    ease: "power3.out", // Smooth easing
  });
});



function blinkCat() {
    const image = document.getElementById('fluffy');
    // Simulate a blink by briefly changing the image source
    image.src = 'assets/images/page-specific-images/home-page/fluffy-pet.PNG';
    // Return to the original image after a short delay (blink duration)
    setTimeout(() => {
        image.src = 'assets/images/page-specific-images/home-page/fluffy-unpet.PNG';
        // After the blink, schedule the next blink with a random interval
        scheduleNextBlink();
    }, 200); // Blink duration: 200ms
}
function scheduleNextBlink() {
    // Generate a random interval between 1500ms and 6500ms
    const randomInterval = Math.floor(Math.random() * (6500 - 1500 + 1)) + 1500;
    setTimeout(blinkCat, randomInterval);
}
// Start the first blink
blinkCat();

const highlight = document.querySelector('.highlight');
const bg = highlight.querySelector('.bg');

const b1 = "linear-gradient(217deg, rgba(255, 136, 24, .9), rgba(255, 136, 24, 0) 70.71%), linear-gradient(127deg, rgba(251, 189, 76, .9), rgba(251, 189, 76, 0) 70.71%), linear-gradient(336deg, rgba(255, 221, 122, .9), rgba(255, 221, 122, 0) 70.71%)";

const b2 = "linear-gradient(17deg, rgba(255, 136, 24, .7), rgba(255, 136, 24, 0) 70.71%), linear-gradient(200deg, rgba(251, 189, 76, .9), rgba(251, 189, 76, .2) 70.71%), linear-gradient(336deg, rgba(255, 221, 122, .8), rgba(255, 221, 122, 0.1) 70.71%)";

// Ensure background and animations work
// highlight.addEventListener('mouseenter', () => {
//     const bg_timeline = gsap.timeline();

//     bg_timeline.to(bg, {
//         width: "100%", // Animate width from 0% to 100%
//         duration: 0.2,
//         ease: "power1.out",
//     });
//     bg_timeline.fromTo(bg, {background: b1}, {ease: "none", duration: 6, background: b2, repeat: -1, yoyo: true});
// });

// highlight.addEventListener('mouseleave', () => {
//     gsap.to(bg, {
//         width: "0%", // Animate width back to 0%
//         duration: 0.2,
//         ease: "power1.in",
//     });
// });
