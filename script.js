// ============================================
// 1. PRELOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('gone');
    }, 1200);
});


// ============================================
// 2. NAVBAR STICKY + ACTIVE LINK
// ============================================
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    const backTop = document.getElementById('backTop');
    if (window.scrollY > 500) {
        backTop.classList.add('show');
    } else {
        backTop.classList.remove('show');
    }
});


// ============================================
// 3. HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});


// ============================================
// 4. DARK / LIGHT THEME TOGGLE
// ============================================
const themeBtn = document.getElementById('themeBtn');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeBtn.innerHTML = isLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


// ============================================
// 5. TYPEWRITER EFFECT (Customized for Satyam)
// ============================================
const typedEl = document.getElementById('typed');
const words   = [
    'Web Developer',
    'Frontend Developer',
    'Coder',
    'Tech Enthusiast',
    'Learner'
];
let wIndex = 0;
let cIndex = 0;
let deleting = false;

function typeEffect() {
    const word = words[wIndex];

    if (deleting) {
        typedEl.textContent = word.substring(0, cIndex - 1);
        cIndex--;
    } else {
        typedEl.textContent = word.substring(0, cIndex + 1);
        cIndex++;
    }

    let speed = deleting ? 60 : 110;

    if (!deleting && cIndex === word.length) {
        speed = 1800;
        deleting = true;
    } else if (deleting && cIndex === 0) {
        deleting = false;
        wIndex = (wIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();


// ============================================
// 6. SKILL BARS ANIMATION
// ============================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-w') + '%';
        }
    });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ============================================
// 7. PROJECT FILTER
// ============================================
const filterBtns  = document.querySelectorAll('.filter');
const projCards   = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projCards.forEach(card => {
            const cat = card.getAttribute('data-cat');
            if (filter === 'all' || cat === filter) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});


// ============================================
// 8. EXPERIENCE TABS
// ============================================
const expTabs = document.querySelectorAll('.exp-tab');

expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        expTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-tab');

        document.getElementById('work').classList.add('hidden');
        document.getElementById('edu').classList.add('hidden');
        document.getElementById(target).classList.remove('hidden');
    });
});


// ============================================
// 9. SCROLL ANIMATIONS (Fade In Up)
// ============================================
const animEls = document.querySelectorAll(
    '.proj-card, .info-card, .skill-item, .tool-box, .t-card, .c-item, .about-img-box'
);

animEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 80);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

animEls.forEach(el => fadeObserver.observe(el));


// ============================================
// 10. CONTACT FORM SUBMIT
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn  = contactForm.querySelector('.btn-full');
    const orig = btn.innerHTML;

    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled  = true;

    setTimeout(() => {
        btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

        setTimeout(() => {
            btn.innerHTML        = orig;
            btn.style.background = '';
            btn.disabled         = false;
            contactForm.reset();
        }, 3000);
    }, 2000);
});


// ============================================
// 11. BACK TO TOP
// ============================================
document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================
// 12. TAB TITLE CHANGE
// ============================================
document.addEventListener('visibilitychange', () => {
    document.title = document.hidden
        ? '👋 Come back!'
        : 'Satyam Kumar | Portfolio';
});