/* =================================================================
   Amharic Bible App Website - JavaScript
   ================================================================= */

// --------------------------------------------------------------
// 1. Initialize Libraries & Loading State
// --------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading class
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    // Initialize libraries
    AOS.init({ duration: 1000, once: true });
    feather.replace();
    
    // Initialize theme
    initializeTheme();
});

// --------------------------------------------------------------
// 2. Mobile Navigation Toggle
// --------------------------------------------------------------
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// --------------------------------------------------------------
// 3. Header Scroll & Active Link
// --------------------------------------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function onScroll() {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
    
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') == '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', onScroll);

// --------------------------------------------------------------
// 4. Typed.js – Hero subtitle animation
// --------------------------------------------------------------
const typedEl = document.getElementById('typed');
const phrases = ["I Build Modern Mobile Apps.", "I Solve Problems with Code.", "I Create User-Friendly Experiences."];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typeSpeed = 80, deleteSpeed = 50, pause = 1500;

function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => isDeleting = true, pause);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

// --------------------------------------------------------------
// 5. Screenshot Carousel Functionality
// --------------------------------------------------------------
let currentSlideIndex = 0;
const totalSlides = 8;
const track = document.querySelector('.screenshot-track');
const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    const slideWidth = 250 + 32; // width + gap
    const translateX = -currentSlideIndex * slideWidth;
    track.style.transform = `translateX(${translateX}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;
    updateCarousel();
}

function currentSlide(slideIndex) {
    currentSlideIndex = slideIndex - 1;
    updateCarousel();
}

// Auto-play carousel
setInterval(() => {
    changeSlide(1);
}, 4000);

// --------------------------------------------------------------
// 6. Theme Toggle Functionality
// --------------------------------------------------------------
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    body.setAttribute('data-theme', newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Add transition effect
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// --------------------------------------------------------------
// 7. Custom cursor trail
// --------------------------------------------------------------
const trail = document.getElementById('cursorTrail');
if (window.matchMedia("(min-width: 1024px)").matches) {
    let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
    const speed = 0.2;
    document.addEventListener('mousemove', e => { 
        mouseX = e.clientX; 
        mouseY = e.clientY; 
    });
    function animateTrail() {
        trailX += (mouseX - trailX) * speed;
        trailY += (mouseY - trailY) * speed;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
} else {
    trail.style.display = 'none';
}
