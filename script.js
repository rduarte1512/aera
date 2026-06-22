const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const glow = document.querySelector('.cursor-glow');
const sections = document.querySelectorAll('.section-hidden');
const form = document.querySelector('.newsletter-form');
const formMessage = document.querySelector('.form-message');

document.getElementById('year').textContent = new Date().getFullYear();

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('mousemove', event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

sections.forEach(section => observer.observe(section));

document.querySelectorAll('.magnetic').forEach(button => {
  button.addEventListener('mousemove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px) scale(1.03)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  formMessage.textContent = 'Obrigada! Em breve recebes novidades da Aera.';
  form.reset();
});

import('./demo.js');
