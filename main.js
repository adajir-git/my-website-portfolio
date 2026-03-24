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

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});


// ── 3. SCROLL REVEAL ─────────────────────.

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
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
    rootMargin: '-40% 0px -55% 0px'
  }
);

sections.forEach(s => sectionObserver.observe(s));

// ── 5. CANVAS POZADÍ — částice a vesmírný glare ───────────

const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');

canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';

const PARTICLE_COUNT = 200;
const COLOR = 'rgba(125, 224, 164,';

let particles = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.5 + 0.4,
    dx:    (Math.random() - 0.5) * 0.25,
    dy:    (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.35 + 0.05,
  };
}

function init() {
  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scrollY = window.scrollY;

  const glareCenterY = -scrollY * 0.5; 
  const glareRadius = Math.max(canvas.width, canvas.height) * 0.8;

  const gradient = ctx.createRadialGradient(
    canvas.width / 2, glareCenterY, 0,
    canvas.width / 2, glareCenterY, glareRadius
  );
  
  gradient.addColorStop(0, 'rgba(125, 224, 164, 0.08)');
  gradient.addColorStop(1, 'rgba(14, 14, 15, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fadeRatio = Math.max(0.7, 1 - (scrollY / 1000));

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    
    ctx.fillStyle = COLOR + (p.alpha * fadeRatio) + ')';
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); });

init();
draw();