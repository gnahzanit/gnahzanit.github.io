document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.nav-button');
  
    function showContent(buttonId, contentId, sectionId) {
        // Hide all contents and reset buttons
        document.querySelectorAll('.content').forEach(content => {
            content.style.display = 'none';
        });
        buttons.forEach(button => {
            const img = button.querySelector('img');
            img.src = button.getAttribute('data-img');
        });
  
        // Show the relevant content
        const content = document.getElementById(contentId);
        content.style.display = 'block';
  
        // Change button image to active
        const activeButton = document.getElementById(buttonId);
        const img = activeButton.querySelector('img');
        img.src = activeButton.getAttribute('data-img-active');
  
        // Show the specified section
        if (sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'block'; // Ensure the section is visible
            }
        }
  
        // Update the URL
        updateUrl(buttonId, sectionId);
    }
  
    function scrollToSectionWithOffset(sectionId) {
      const offset = 90; // Desired offset from the top
  
      switch(sectionId) {
          case 'onionshop':
          case 'sprout':
          case 'thevoid':
              // Scroll to the position
              window.scrollTo({
                  top: 580,
                  behavior: 'smooth'
              });
              break;
          case 'wan':
              window.scrollTo({
                  top: 3215,
                  behavior: 'smooth'
              });
              break;
          case 'cctm':
              window.scrollTo({
                  top: 5120,
                  behavior: 'smooth'
              });
              break;
          default:
              break;
      }
  }
  
    function parseUrlAndNavigate() {
        const hash = window.location.hash.substring(1); // Remove the '#'
        if (hash) {
            const parts = hash.split('&'); // Use '&' to split the URL
            const button = parts[0];
            const section = parts[1] || null;
  
            switch(button) {
                case 'softwaredevelopment':
                      showContent('softwareDevelopmentBtn', 'softwareDevelopmentContent', section ? `${section}` : null);
                      scrollToSectionWithOffset(section);
                      break;
                case 'uiux':
                      showContent('uiUxBtn', 'uiUxContent', section ? `${section}` : null);
                      scrollToSectionWithOffset(section);
                      break;
                case 'games':
                      showContent('gamesBtn', 'gamesContent', section ? `${section}` : null);
                      scrollToSectionWithOffset(section);
                      break;
                default:
                      // Handle default case if needed
                      break;
            }
        }
    }
  
    function updateUrl(buttonId, sectionId) {
        const baseId = buttonId.replace('Btn', '').toLowerCase();
        let newUrl = `${window.location.pathname}#${baseId}`;
        if (sectionId) {
            newUrl += `&${sectionId.replace(baseId, '').toLowerCase()}`;
        }
        history.replaceState(null, '', newUrl); // Update the URL without reloading the page
    }
  
    function handleSectionScroll() {
        const activeButtonId = document.querySelector('.nav-button img[src*="wip1.png"]').closest('.nav-button').id;
        const activeContentId = document.querySelector('.content[style*="block"]').id;
  
        document.querySelectorAll(`#${activeContentId} section`).forEach(section => {
          console.log(section.id, section.getBoundingClientRect());
            const rect = section.getBoundingClientRect();
              if (rect.top >= 0 && rect.top <= window.innerHeight/1.5) {
                updateUrl(activeButtonId, section.id);
            }
        });
    }
  
    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const contentId = button.getAttribute('data-content');
            showContent(button.id, contentId, null);
        });
    });
  
    // Initial navigation based on URL
    parseUrlAndNavigate();
  
    // Listen for hash changes (if navigating within the same page)
    window.addEventListener("hashchange", parseUrlAndNavigate);
  
    // Update URL when scrolling through sections
    window.addEventListener("scroll", handleSectionScroll);
  });
  




// document.addEventListener("DOMContentLoaded", function() {
//   const buttons = document.querySelectorAll('.nav-button');

//   function showContent(buttonId, contentId, sectionId) {
//       // Hide all contents and reset buttons
//       document.querySelectorAll('.content').forEach(content => {
//           content.style.display = 'none';
//       });
//       buttons.forEach(button => {
//           const img = button.querySelector('img');
//           img.src = button.getAttribute('data-img');
//       });

//       // Show the relevant content
//       const content = document.getElementById(contentId);
//       content.style.display = 'block';

//       // Change button image to active
//       const activeButton = document.getElementById(buttonId);
//       const img = activeButton.querySelector('img');
//       img.src = activeButton.getAttribute('data-img-active');

//       // Show the specified section
//       if (sectionId) {
//           const section = document.getElementById(sectionId);
//           if (section) {
//               section.style.display = 'block'; // Ensure the section is visible
//           }
//       }

//       // Update the URL
//       updateUrl(buttonId, sectionId);
//   }

//   function scrollToSectionWithOffset(sectionId) {
//     // const section = document.getElementById(sectionId);
//     const offset = 90; // Desired offset from the top

//     switch(sectionId) {
//         case 'onionshop':
//         case 'sprout':
//         case 'thevoid':
//             // Scroll to the position
//             window.scrollTo({
//                 top: 580,
//                 behavior: 'smooth'
//             });
//             break;
//         case 'wan':
//             window.scrollTo({
//                 top: 3215,
//                 behavior: 'smooth'
//             });
//             break;
//         case 'cctm':
//             window.scrollTo({
//                 top: 5120,
//                 behavior: 'smooth'
//             });
//             break;
//         default:
//             break;
//     }
// }

//   function parseUrlAndNavigate() {
//       const hash = window.location.hash.substring(1); // Remove the '#'
//       if (hash) {
//           const parts = hash.split('#');
//           const button = parts[0];
//           const section = parts[1] || null;

//           switch(button) {
//               case 'softwaredevelopment':
//                     showContent('softwareDevelopmentBtn', 'softwareDevelopmentContent', section ? `${section}` : null);
//                     scrollToSectionWithOffset(section);
//                     break;
//               case 'uiux':
//                     showContent('uiUxBtn', 'uiUxContent', section ? `${section}` : null);
//                     scrollToSectionWithOffset(section);
//                     break;
//               case 'games':
//                     showContent('gamesBtn', 'gamesContent', section ? `${section}` : null);
//                     scrollToSectionWithOffset(section);
//                     break;
//               default:
//                     // Handle default case if needed
//                     break;
//           }
//       }
//   }

//   function updateUrl(buttonId, sectionId) {
//       const baseId = buttonId.replace('Btn', '').toLowerCase();
//       let newUrl = `${window.location.pathname}#${baseId}`;
//       if (sectionId) {
//           newUrl += `#${sectionId.replace(baseId, '').toLowerCase()}`;
//       }
//       history.replaceState(null, '', newUrl); // Update the URL without reloading the page
//   }

//   function handleSectionScroll() {
//       const activeButtonId = document.querySelector('.nav-button img[src*="wip1.png"]').closest('.nav-button').id;
//       const activeContentId = document.querySelector('.content[style*="block"]').id;

//       document.querySelectorAll(`#${activeContentId} section`).forEach(section => {
//         console.log(section.id, section.getBoundingClientRect());
//           const rect = section.getBoundingClientRect();
//             if (rect.top >= 0 && rect.top <= window.innerHeight/1.5) {
//               updateUrl(activeButtonId, section.id);
//           }
//       });
//   }

//   // Handle button clicks
//   buttons.forEach(button => {
//       button.addEventListener('click', () => {
//           const contentId = button.getAttribute('data-content');
//           showContent(button.id, contentId, null);
//       });
//   });

//   // Initial navigation based on URL
//   parseUrlAndNavigate();

//   // Listen for hash changes (if navigating within the same page)
//   window.addEventListener("hashchange", parseUrlAndNavigate);

//   // Update URL when scrolling through sections
//   window.addEventListener("scroll", handleSectionScroll);
// });

