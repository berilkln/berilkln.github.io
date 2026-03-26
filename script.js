const contactBtn = document.getElementById('contactBtn');
const contactSection = document.getElementById('contact');
const toast = document.getElementById('toast');
const form = document.querySelector('.contact-form');
const topbar = document.querySelector('.topbar');

const smoothScroll = (target) => {
  if (!target) return;
  const offset = (topbar?.offsetHeight || 0) + 12;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

contactBtn?.addEventListener('click', () => smoothScroll(contactSection));

document.querySelectorAll('.nav a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    smoothScroll(target);
  });
});

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name') || 'Guest';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      showToast(`${name}, your message was sent. Thanks!`);
      form.reset();
    } else {
      showToast('Could not send. Please reach by email.');
    }
  } catch (error) {
    showToast('Network error: please try again.');
  }
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2600);
}

// Reveal-on-scroll effect for panels
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.panel, .project-card').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  observer.observe(el);
});

// Apply reveal animation once intersecting
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 1 !important; transform: translateY(0) !important; transition: opacity 0.4s ease, transform 0.4s ease; }
`;
document.head.appendChild(style);
