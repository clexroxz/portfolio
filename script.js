// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ── CURSOR ──
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
    ring.style.borderColor = 'rgba(192,132,252,0.8)';
    dot.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(192,132,252,0.5)';
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ── STARFIELD ──
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({length: 250}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.2,
    o: Math.random() * 0.7 + 0.1,
    speed: Math.random() * 0.3 + 0.05,
    twinkle: Math.random() * Math.PI * 2
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.twinkle += 0.015;
    const opacity = s.o * (0.5 + 0.5 * Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,180,255,${opacity})`;
    ctx.fill();
    s.y -= s.speed;
    if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', initStars);
initStars();
drawStars();

// ── FLOATING PARTICLES ──
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 10 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = (Math.random() * 4 + 2) + 'px';
    p.style.height = p.style.width;
    const colors = ['var(--purple-glow)', 'var(--cyan)', 'var(--blue)', '#a78bfa'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = '0 0 6px currentColor';
    particlesContainer.appendChild(p);
  }
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// ── NAV ACTIVE + SCROLL EFFECT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--purple-glow)' : '';
  });
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ── PROJECT CARD SPOTLIGHT ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
});

// ── SMOOTH SCROLL FOR NAV ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── SEND BUTTON ──
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    sendBtn.textContent = 'Message Sent! 🚀';
    sendBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    sendBtn.style.boxShadow = '0 0 30px rgba(34,197,94,0.4)';
    setTimeout(() => {
      sendBtn.textContent = 'Send Message 🚀';
      sendBtn.style.background = '';
      sendBtn.style.boxShadow = '';
    }, 3000);
  });
}

// ── TILT EFFECT ON STAT BOXES ──
document.querySelectorAll('.stat-box').forEach(box => {
  box.addEventListener('mousemove', e => {
    const rect = box.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    box.style.transform = `translateY(-4px) perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  box.addEventListener('mouseleave', () => {
    box.style.transform = '';
  });
});
