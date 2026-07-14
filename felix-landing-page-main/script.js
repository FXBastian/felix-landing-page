const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const revealElements = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav a');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('active'));

  navLinks.forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });
}

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
