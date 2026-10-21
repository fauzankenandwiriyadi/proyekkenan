// ==========================================
// 1. TOGGLE MENU MOBILE
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
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

    // Tutup menu mobile ketika salah satu link diklik
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
}


// ==========================================
// 2. ANIMASI SCROLL REVEAL
// ==========================================
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


// ==========================================
// 3. ANIMASI COUNTER ANGKA BERULANG
// ==========================================
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


// ==========================================
// 4. INTERAKSI KLIK ESKUL PREVIEW GAMBAR (DENGAN LOADING LOGO BERPUTAR)
// ==========================================
const eskulItems = document.querySelectorAll('.eskul-item');
const eskulModal = document.getElementById('eskulModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const eskulClose = document.querySelector('.eskul-close');

// Buat elemen loading dengan logo sekolah secara dinamis di dalam modal
let modalContainer = document.querySelector('.modal-img-container');
let loadingIndicator = document.createElement('div');
loadingIndicator.className = 'eskul-loading';
loadingIndicator.innerHTML = `
    <img src="aset/logo.png" alt="Loading Logo" class="loading-logo-spin">
    <span>Memuat dokumentasi...</span>
`;
if (modalContainer) {
    modalContainer.appendChild(loadingIndicator);
}

eskulItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        const imgTitle = item.getAttribute('data-title');

        if (modalImg && modalTitle && eskulModal) {
            modalTitle.innerText = imgTitle;
            modalImg.style.opacity = '0'; // Sembunyikan gambar sebentar
            loadingIndicator.classList.add('show-load'); // Munculkan logo berputar
            eskulModal.classList.add('show');

            // Simulasi jeda agar animasi logo terasa mulus dan estetik
            setTimeout(() => {
                modalImg.src = imgSrc;
                modalImg.onload = () => {
                    modalImg.style.opacity = '1';
                    loadingIndicator.classList.remove('show-load');
                };
                // Fallback jika gambar sudah ada di cache browser
                modalImg.style.opacity = '1';
                loadingIndicator.classList.remove('show-load');
            }, 500);
        }
    });
});

function closeModal() {
    if (eskulModal) {
        eskulModal.classList.remove('show');
        loadingIndicator.classList.remove('show-load');
    }
}

if (eskulClose) {
    eskulClose.addEventListener('click', closeModal);
}

// Tutup modal jika pengguna mengklik area luar kotak modal
window.addEventListener('click', (e) => {
    if (e.target === eskulModal) {
        closeModal();
    }
});