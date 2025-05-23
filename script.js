// script.js

// Slideshow Logic
let slideIndex = 0;
showSlides(); // Start the slideshow on page load

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Increment slideIndex, reset if at the end
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} 
    
    // Remove 'active' class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Display the current slide and mark its dot as active
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    
    // Call showSlides again after 5 seconds for automatic progression
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Manual controls (optional)
function plusSlides(n) {
  showSlidesManual(slideIndex += n);
}

function currentSlide(n) {
  showSlidesManual(slideIndex = n);
}

function showSlidesManual(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


// Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default link behavior (don't navigate to a new page)
            e.preventDefault(); 
            
            // Get the ID of the target content section from the href attribute
            const targetId = e.target.getAttribute('href').substring(1);

            // Remove 'active' class from all navigation links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add 'active' class to the clicked link
            e.target.classList.add('active');

            // Hide all content sections and show only the target one
            contentSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active'); // Show this section
                } else {
                    section.classList.remove('active'); // Hide others
                }
            });
        });
    });

    // Activate the first section on initial page load (e.g., Downloads)
    // This ensures content is visible when the page first loads
    if (contentSections.length > 0) {
        contentSections[0].classList.add('active');
        navLinks[0].classList.add('active');
    }
});
