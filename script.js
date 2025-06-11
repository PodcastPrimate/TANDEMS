document.addEventListener('DOMContentLoaded', () => {

    // --- Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling;
            const chevronIcon = header.querySelector('i');

            const isActive = header.classList.contains('active');

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

        const slideWidth = testimonialSlides[0].clientWidth;
        // Explicitly set transform property
        testimonialCarousel.style.transform = `translateX(${-currentTestimonialIndex * slideWidth}px)`;
        // Ensure display is block for visible slides if changed by other CSS
        testimonialSlides.forEach((slide, index) => {
            slide.style.display = 'block'; // Ensure all are display:block for measurement
        });
    }

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
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (testimonialSlides.length === 1) {
             testimonialSlides[0].style.display = 'block'; // Ensure single slide is visible
        }
    }


    // --- Car Slideshow Logic (Automatic - for Hero Background) ---
    let heroSlideIndex = 0;
    const heroSlides = document.querySelectorAll('.hero-background-slideshow .mySlides');

    function showHeroSlides() {
        if (heroSlides.length === 0) return;

        heroSlides.forEach(slide => {
            slide.style.display = "none";
        });

        heroSlideIndex++;
        if (heroSlideIndex > heroSlides.length) {
            heroSlideIndex = 1;
        }

        heroSlides[heroSlideIndex - 1].style.display = "block";

        setTimeout(showHeroSlides, 4000);
    }

    if (heroSlides.length > 0) {
        heroSlides[0].style.display = "block";
        heroSlideIndex = 1;
        setTimeout(showHeroSlides, 4000);
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
