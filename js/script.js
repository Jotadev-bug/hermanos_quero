// Initialize smooth scrolling with Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// GSAP + Lenis Integration
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const video = document.getElementById('hero-video');

    // Play video by default
    if (video) {
        video.play().catch(e => console.log("Auto-play prevented:", e));
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hover Cards Logic
    const hoverLinks = document.querySelectorAll('.nav-link[data-hover]');
    const cardsContainer = document.getElementById('hover-cards-container');

    // Follow the mouse
    window.addEventListener('mousemove', (e) => {
        // We set the exact cursor X/Y coordinates as CSS variables
        if (cardsContainer.classList.contains('active-coleccion') || cardsContainer.classList.contains('active-eventos')) {
            // Add a little offset so the cursor doesn't block the very center of the cards
            cardsContainer.style.left = (e.clientX) + 'px';
            cardsContainer.style.top = (e.clientY + 120) + 'px'; // Increased offset to move it below mouse
        }
    });

    hoverLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const hoverTarget = link.getAttribute('data-hover');
            // Remove any existing active classes
            cardsContainer.className = 'hover-cards-container';
            // Add the new active class if it exists for this link
            if (hoverTarget === 'coleccion' || hoverTarget === 'eventos') {
                cardsContainer.classList.add(`active-${hoverTarget}`);
            }
        });

        link.addEventListener('mouseleave', () => {
            cardsContainer.className = 'hover-cards-container';
        });
    });

    // Initial load animation for hero content
    gsap.from(".navbar", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1
    });

    gsap.from("#hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3
    });

    gsap.from("#hero-bottom", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8
    });

    // CRITICAL SCROLL TRIGGER ANIMATION
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#inicio", // Fixed ID to match HTML
            start: "top top",
            end: "+=120%",
            scrub: 1, // Smooth scrubbing
            pin: true,
        }
    });

    // 1. Text fades and moves up
    tl.to("#hero-content", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "none"
    }, 0);

    // 2. Video container scales down beautifully with rounded corners
    tl.to("#video-container", {
        scale: 0.8,
        borderRadius: "2rem",
        duration: 2,
        ease: "power1.inOut"
    }, 0);

    // 3. Bottom controls fade out
    tl.to("#hero-bottom", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "none"
    }, 0);
});
