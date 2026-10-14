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

// Logika Animasi Angka Berulang (Naik Saat Dilihat, Reset Saat Keluar Layar)
const counters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats-section');

function runCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = target / 40; // Kecepatan hitungan naik

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

const observerOptions = {
    root: null,
    threshold: 0.3 // Berjalan ketika 30% bagian statistik terlihat di layar
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ketika dilihat (masuk layar dari arah mana pun), jalankan hitungan naik
            counters.forEach(counter => {
                counter.innerText = '0'; // Reset ke 0 sebelum naik
                runCounter(counter);
            });
        } else {
            // Ketika tidak dilihat (keluar layar ke atas/bawah), reset ke 0 kembali
            counters.forEach(counter => {
                counter.innerText = '0';
            });
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}