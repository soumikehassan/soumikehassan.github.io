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
        console.warn('AOS library not found');
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
        if (!this.hamburger || !this.mobileNav) {
            console.warn('Mobile navigation elements not found');
            return;
        }

        this.hamburger.addEventListener('click', () => this.toggleNav());
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        window.addEventListener('resize', () => this.handleResize());
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
        // Close mobile nav on resize to larger screen
        if (window.innerWidth > 768 && this.mobileNav.classList.contains('active')) {
            this.closeNav();
        }
    }
}

// Smooth Scrolling Handler
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile nav if open
            if (window.mobileNav && window.mobileNav.mobileNav.classList.contains('active')) {
                window.mobileNav.closeNav();
            }
        });
    });
}

// Header Scroll Effect
function initializeHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Active Navigation Highlighting
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    let ticking = false;

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    });
}

// Typing Effect
function typeWriter(element, text, speed = 100) {
    if (!element || !text) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Typing Effect
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    
    // Add a slight delay before starting the typing effect
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
}

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        if (percent) {
            bar.style.width = percent + '%';
        }
    });
}

// Initialize Skill Bars Observer
function initializeSkillBarsObserver() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(skillsSection);
}

// Parallax Effect
function initializeParallaxEffect() {
    const parallax = document.querySelector('.hero-section');
    if (!parallax) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Project Card Hover Effects
function initializeProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Form Validation
function validateForm(form) {
    if (!form) return false;
    
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    let isValid = true;
    
    // Reset previous error states
    form.querySelectorAll('.error').forEach(error => error.remove());
    
    // Email validation
    if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (message && message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.cssText = `
        color: red;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    error.textContent = message;
    input.parentNode.appendChild(error);
}

// Theme Toggle
function initializeThemeToggle() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function toggleTheme() {
    try {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    } catch (e) {
        console.warn('Unable to save theme preference:', e);
    }
}

// Scroll to Top Button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(button);
    
    let ticking = false;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                button.style.opacity = window.scrollY > 300 ? '1' : '0';
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Scroll to top when clicked
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// Loading Animation
function initializeLoadingAnimation() {
    document.body.classList.add('loading');
    
    // Remove loading class after page is fully loaded
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 500);
}

// Main Initialization Function
function initializePortfolio() {
    // Initialize all components
    initializeAOS();
    window.mobileNav = new MobileNavigation();
    initializeSmoothScrolling();
    initializeHeaderScrollEffect();
    initializeActiveNavigation();
    initializeSkillBarsObserver();
    initializeParallaxEffect();
    initializeProjectCardEffects();
    initializeThemeToggle();
    createScrollToTopButton();
    initializeLazyLoading();
    
    console.log('Portfolio website loaded successfully! 🚀');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Initialize typing effect and loading animation when page loads
window.addEventListener('load', () => {
    initializeTypingEffect();
    initializeLoadingAnimation();
});

// Export functions for global access if needed
window.portfolioUtils = {
    validateForm,
    toggleTheme,
    typeWriter
};