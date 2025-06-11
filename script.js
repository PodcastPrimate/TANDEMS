document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling;
            const chevronIcon = header.querySelector('i');

            // Check if this accordion is currently active
            const isActive = header.classList.contains('active');

            // Close all accordions first (this ensures only one is open at a time)
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                const content = h.nextElementSibling;
                if (content) { // Check if content exists
                    content.classList.remove('show');
                }
                const icon = h.querySelector('i');
                if (icon) { // Check if icon exists
                    icon.classList.remove('fa-chevron-up'); // Ensure it's down
                    icon.classList.add('fa-chevron-down');
                }
            });

            // If the clicked accordion was not active, open it
            if (!isActive) {
                header.classList.add('active');
                if (accordionContent) { // Check if content exists
                    accordionContent.classList.add('show');
                }
                if (chevronIcon) { // Check if icon exists
                    chevronIcon.classList.remove('fa-chevron-down');
                    chevronIcon.classList.add('fa-chevron-up'); // Point up when active
                }
            }
            // If it was already active, the "close all" step above will have closed it.
        });
    });


    // --- Testimonial Carousel Logic ---
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonialIndex = 0;

    function updateTestimonialCarousel() {
        if (testimonialSlides.length === 0) return; // Exit if no slides

        // Ensure currentTestimonialIndex is within bounds
        if (currentTestimonialIndex < 0) currentTestimonialIndex = testimonialSlides.length - 1;
        if (currentTestimonialIndex >= testimonialSlides.length) currentTestimonialIndex = 0;

        // Use clientWidth which is more reliable for scrollable elements
        const slideWidth = testimonialSlides[0].clientWidth;
        testimonialCarousel.style.transform = `translateX(${-currentTestimonialIndex * slideWidth}px)`;
    }

    if (prevButton && nextButton && testimonialCarousel && testimonialSlides.length > 0) { // Only attach listeners if elements exist
        prevButton.addEventListener('click', () => {
            currentTestimonialIndex--;
            updateTestimonialCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentTestimonialIndex++;
            updateTestimonialCarousel();
        });

        // Initialize carousel on resize and load
        window.addEventListener('resize', updateTestimonialCarousel);
        updateTestimonialCarousel();
    }


    // --- Car Slideshow Logic (Automatic) ---
    let slideIndex = 0;
    const carSlides = document.querySelectorAll('.mySlides');

    function showSlides() {
        if (carSlides.length === 0) return; // Exit if no slides

        // Hide all slides first
        carSlides.forEach(slide => {
            slide.style.display = "none";
        });

        // Increment index, reset if at end
        slideIndex++;
        if (slideIndex > carSlides.length) {
            slideIndex = 1; // Loop back to the first slide
        }

        // Display current slide
        carSlides[slideIndex - 1].style.display = "block";

        // Call showSlides again after 3 seconds (adjust as needed)
        setTimeout(showSlides, 3000);
    }

    // Only start the slideshow if there are slides
    if (carSlides.length > 0) {
        // Ensure the first slide is visible immediately on load
        carSlides[0].style.display = "block";
        slideIndex = 1; // Set index for the next slide to be displayed by setTimeout
        setTimeout(showSlides, 3000); // Start the loop after initial display
    }


    // --- Scroll Animation for Sections ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Optional: remove when not visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('hidden'); // Add initial hidden class for animation
    });
});
