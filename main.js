// ─────────────────────────────────────────
// main.js — Adam Jiřík portfolio
// ─────────────────────────────────────────


// ── 1. NAV: stín při scrollu ─────────────

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// ── 2. MOBILNÍ MENU ──────────────────────

const burger    = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

// Zavři menu po kliknutí na odkaz
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});


// ── 3. SCROLL REVEAL ─────────────────────
// Každý element s třídou .reveal se zobrazí
// jakmile přijde do viewportu.

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Po zobrazení přestaneme element sledovat
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,    // spustí se když je 12 % elementu ve viewportu
    rootMargin: '0px 0px -40px 0px'  // trochu dříve než dosáhne spodního okraje
  }
);

revealElements.forEach(el => revealObserver.observe(el));


// ── 4. AKTIVNÍ ODKAZ V NAVIGACI ──────────
// Zvýrazní aktuální sekci v nav při scrollu.

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px'  // "aktivní" = sekce uprostřed obrazovky
  }
);

sections.forEach(s => sectionObserver.observe(s));
