/* ─── NAV SCROLL ─── */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── HAMBURGER ─── */
const burger = document.getElementById('hamburger');
const mMenu  = document.getElementById('mobileMenu');

function closeMenu() {
  burger.classList.remove('open');
  mMenu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  const open = !mMenu.classList.contains('open');
  mMenu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

mMenu.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));

/* ─── BOTTOM NAV ACTIVE STATE ─── */
const bnMap = {
  'bn-home': document.getElementById('home'),
  'bn-proj': document.getElementById('projects'),
  'bn-serv': document.getElementById('services'),
  'bn-cont': document.getElementById('contact'),
};

function updateBN() {
  const y = window.scrollY + window.innerHeight * 0.35;
  let activeId = 'bn-home';
  Object.entries(bnMap).forEach(([id, sec]) => {
    if (sec && sec.offsetTop <= y) activeId = id;
  });
  Object.keys(bnMap).forEach(id => {
    document.getElementById(id)?.classList.toggle('active', id === activeId);
  });
}
window.addEventListener('scroll', updateBN, { passive: true });

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── SERVICES ACCORDION (mobile only) ─── */
document.querySelectorAll('.service-item').forEach(item => {
  item.querySelector('.service-header').addEventListener('click', () => {
    if (window.innerWidth >= 768) return; // desktop: no accordion
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.service-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ─── HERO IMAGE PAN ─── */
setTimeout(() => {
  document.getElementById('heroBg')?.classList.add('loaded');
}, 80);
