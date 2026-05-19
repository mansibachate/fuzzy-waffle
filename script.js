// ===== CUSTOM CURSOR =====
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .collab-card, .why-item, .analyst-item, .reel-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ===== NAVBAR =====
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
    });
});

// ===== ACTIVE NAV =====
function updateActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 130;
    sections.forEach(section => {
        const id   = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!link) return;
        const inView = scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight;
        link.classList.toggle('active', inView);
    });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
        const delay    = siblings.indexOf(entry.target) * 100;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== HERO PARALLAX =====
const heroImg = document.querySelector('.hero-photo-wrap img');
if (heroImg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrolled * 0.12}px)`;
        }
    }, { passive: true });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
        });
    });
});

// ===== REELS DRAG SCROLL =====
const reelsScroll = document.querySelector('.reels-scroll-wrap');
if (reelsScroll) {
    let isDown = false, startX, scrollLeft;

    reelsScroll.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - reelsScroll.offsetLeft;
        scrollLeft = reelsScroll.scrollLeft;
        reelsScroll.style.cursor = 'grabbing';
    });

    reelsScroll.addEventListener('mouseleave', () => { isDown = false; reelsScroll.style.cursor = 'grab'; });
    reelsScroll.addEventListener('mouseup',    () => { isDown = false; reelsScroll.style.cursor = 'grab'; });

    reelsScroll.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x    = e.pageX - reelsScroll.offsetLeft;
        const walk = (x - startX) * 1.5;
        reelsScroll.scrollLeft = scrollLeft - walk;
    });
}
