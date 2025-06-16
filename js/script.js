// Portfolio Website JavaScript - Fixed Version

// Initialize AOS (Animate On Scroll) - with error handling
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    } else {
        console.warn('AOS library not found, animations might not work as expected.');
    }
}

// Mobile Navigation Handler
class MobileNavigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.mobileNav = document.getElementById('mobileNav');
        this.init();
    }

    init() {
        // Check if elements exist before attaching listeners
        if (!this.hamburger || !this.mobileNav) {
            console.warn('Mobile navigation elements (hamburger or mobileNav) not found, skipping initialization.');
            return;
        }

        this.hamburger.addEventListener('click', () => this.toggleNav());
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        window.addEventListener('resize', () => this.handleResize());
        
        // Add click listeners to mobile nav links for smooth scrolling and closing menu
        this.mobileNav.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor click behavior
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    this.closeNav(); // Close mobile nav after clicking a link
                }
            });
        });
    }

    toggleNav() {
        this.hamburger.classList.toggle('active');
        this.mobileNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    }

    closeNav() {
        this.hamburger.classList.remove('active');
        this.mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    handleOutsideClick(event) {
        const isClickInsideNav = this.mobileNav.contains(event.target);
        const isClickOnHamburger = this.hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && this.mobileNav.classList.contains('active')) {
            this.closeNav();
        }
    }

    handleResize() {
        // Close mobile nav on resize to larger screen (e.g., from mobile to desktop view)
        if (window.innerWidth > 768 && this.mobileNav.classList.contains('active')) {
            this.closeNav();
        }
    }
}

// Scroll-to-Top Button Handler
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTopBtn';
    button.innerHTML = '&#8593;'; // Up arrow
    document.body.appendChild(button);

    // Style the button (basic inline styles for demonstration, ideally in CSS)
    button.style.cssText = `
        display: none; /* Hidden by default */
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #667eea;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, background-color 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.display = 'block'; // Make it visible first
            setTimeout(() => button.style.opacity = '1', 10); // Then fade in
        } else {
            button.style.opacity = '0'; // Fade out
            setTimeout(() => button.style.display = 'none', 300); // Hide after transition
        }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Performance optimization: Lazy loading for images (if any images use data-src)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    // Use IntersectionObserver for efficient lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Set src from data-src
                    img.classList.remove('lazy'); // Remove lazy class if used for styling
                    observer.unobserve(img); // Stop observing once loaded
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers (e.g., load all images if IntersectionObserver is not supported)
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Function for character-by-character typing effect for the main heading
function setupTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) {
        console.warn('Typing element with ID "typing-text" not found, skipping typing effect.');
        return;
    }

    const textToType = typingElement.getAttribute('data-original-text');
    if (!textToType) {
        console.warn('No text to type found in "data-original-text" attribute for typing element.');
        return;
    }

    // Remove existing AOS attributes and class to prevent conflict with custom animation
    // (This ensures the typing effect doesn't clash with previous AOS settings or unwanted styles)
    typingElement.removeAttribute('data-aos');
    typingElement.removeAttribute('data-aos-duration');
    typingElement.removeAttribute('data-aos-delay');
    typingElement.removeAttribute('class'); // Remove class as it's no longer needed for animation

    // Clear content before typing
    typingElement.textContent = '';
    
    let charIndex = 0;

    function typeNextChar() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex); // Add one character at a time
            charIndex++;
            // Adjust this delay (in milliseconds) to control the speed between characters
            setTimeout(typeNextChar, 70); // Current delay is 70 milliseconds per character
        }
    }
    
    // Start typing after a short initial delay when the page loads
    setTimeout(typeNextChar, 500); // Initial delay of 0.5 seconds before typing starts
}


// Initialize all components when the DOM is fully loaded
// This is the single, combined DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    initializeAOS(); // Initialize AOS library for other elements
    window.mobileNav = new MobileNavigation(); // Initialize mobile navigation
    createScrollToTopButton(); // Create and initialize scroll-to-top button
    lazyLoadImages(); // Initialize lazy loading for images
    setupTypingEffect(); // Initialize the custom typing effect for the heading
    console.log('Portfolio website loaded successfully! 🚀');
});