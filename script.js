// Toggle Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// --- ANIMASI SCROLL REVEAL ---
const observerOptions = {
    root: null,
    threshold: 0.15
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    scrollObserver.observe(el);
});

// --- ANIMASI COUNTER ANGKA BERULANG ---
const counters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats-section');

function runCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = target / 40; 

    function updateCount() {
        count += speed;
        if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 30);
        } else {
            counter.innerText = target;
        }
    }
    updateCount();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => {
                counter.innerText = '0';
                runCounter(counter);
            });
        } else {
            counters.forEach(counter => {
                counter.innerText = '0';
            });
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}