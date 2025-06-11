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
                if (content) {
                    content.classList.remove('show');
                }
                const icon = h.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });

            // If the clicked accordion was not active, open it
            if (!isActive) {
                header.classList.add('active');
                if (accordionContent) {
                    accordionContent.classList.add('show');
                }
                if (chevronIcon) {
                    chevronIcon.classList.remove('fa-chevron-down');
                    chevronIcon.classList.add('fa-chevron-up');
                }
            }
        });
    });


    // --- Testimonial Carousel Logic ---
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonialIndex = 0;

    function updateTestimonialCarousel() {
        if (testimonialSlides.length === 0) return;

        currentTestimonialIndex = (currentTestimonialIndex < 0) ? testimonialSlides.length - 1 : currentTestimonialIndex;
        currentTestimonialIndex = (currentTestimonialIndex >= testimonialSlides.length) ? 0 : currentTestimonialIndex;

        const slideWidth = testimonialSlides[0].clientWidth; // Use clientWidth for actual rendered width
        testimonialCarousel.style.transform = `translateX(${-currentTestimonialIndex * slideWidth}px)`;
    }

    // Only attach listeners if elements exist and there's more than one slide
    if (prevButton && nextButton && testimonialCarousel && testimonialSlides.length > 1) {
        prevButton.addEventListener('click', () => {
            currentTestimonialIndex--;
            updateTestimonialCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentTestimonialIndex++;
            updateTestimonialCarousel();
        });

        window.addEventListener('resize', updateTestimonialCarousel);
        updateTestimonialCarousel(); // Initial call
    } else if (testimonialSlides.length <= 1) {
        // If there's 0 or 1 slide, hide navigation buttons
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        // Ensure the single slide is visible
        if (testimonialSlides.length === 1) {
             testimonialSlides[0].style.display = 'block';
        }
    }


    // --- Car Slideshow Logic (Automatic - now for Hero Background) ---
    let heroSlideIndex = 0; // Use a distinct index variable for clarity
    // TARGET THE NEW LOCATION OF SLIDES
    const heroSlides = document.querySelectorAll('.hero-background-slideshow .mySlides');

    function showHeroSlides() {
        if (heroSlides.length === 0) return;

        // Hide all slides first
        heroSlides.forEach(slide => {
            slide.style.display = "none";
        });

        // Increment index, reset if at end
        heroSlideIndex++;
        if (heroSlideIndex > heroSlides.length) {
            heroSlideIndex = 1; // Loop back to the first slide
        }

        // Display current slide
        heroSlides[heroSlideIndex - 1].style.display = "block";

        // Call showHeroSlides again after 4 seconds (slightly longer for background)
        setTimeout(showHeroSlides, 4000); // Changed to 4 seconds for background
    }

    // Only start the slideshow if there are slides
    if (heroSlides.length > 0) {
        // Ensure the first slide is visible immediately on load
        heroSlides[0].style.display = "block";
        heroSlideIndex = 1; // Set index for the next slide to be displayed by setTimeout
        setTimeout(showHeroSlides, 4000); // Start the loop after initial display
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
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('hidden');
    });
});
