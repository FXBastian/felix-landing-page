// ============================================
// MENU & NAVIGATION
// ============================================

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav a');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('active'));

  navLinks.forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });
}

// Efeito do cursor no link de navegação
navLinks.forEach(link => {
  link.addEventListener('mousemove', (event) => {
    const rect = link.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    link.style.setProperty('--cursor-x', `${x}%`);
    link.style.setProperty('--cursor-y', `${y}%`);
  });

  link.addEventListener('mouseleave', () => {
    link.style.removeProperty('--cursor-x');
    link.style.removeProperty('--cursor-y');
  });
});

// ============================================
// HEADER SHADOW ON SCROLL
// ============================================

const topbar = document.querySelector('.topbar');
let scrollTimeout;

window.addEventListener('scroll', () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  
  if (window.scrollY > 10) {
    topbar.style.background = 'rgba(2, 4, 3, 0.85)';
    topbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
  } else {
    topbar.style.background = 'rgba(2, 4, 3, 0.7)';
    topbar.style.boxShadow = 'none';
  }
  
  scrollTimeout = setTimeout(() => {
    topbar.style.transition = 'all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }, 0);
}, { passive: true });

// ============================================
// REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealElements.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

// ============================================
// SPOTLIGHT EFFECT ON VITRINE CARDS (Desktop only)
// ============================================

const vitrineCards = document.querySelectorAll('.vitrine-card');
const isDesktop = window.matchMedia('(hover: hover)').matches;

if (isDesktop && vitrineCards.length) {
  vitrineCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}

// ============================================
// PAUSE ANIMATIONS WHEN TAB IS NOT VISIBLE
// ============================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.documentElement.style.animationPlayState = 'paused';
  } else {
    document.documentElement.style.animationPlayState = 'running';
  }
});

// ============================================
// SMOOTH SCROLL ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const topbarHeight = topbar ? topbar.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - topbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
