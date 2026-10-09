/* ── AFRICA UNTAMED ── */

// ── CUSTOM CURSOR ────────────────────────────────────────
function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;
  
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
  
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
  
    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
  
    // Hover effect
    document.querySelectorAll('a, button, .chapter-dot').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }
  
  // ── PROGRESS BAR ────────────────────────────────────────
  function initProgressBar() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
  
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + '%';
    });
  }
  
  // ── NAVBAR SCROLL ────────────────────────────────────────
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
  
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }
  
  // ── CHAPTER DOTS ────────────────────────────────────────
  function initChapterDots() {
    const dots = document.querySelectorAll('.chapter-dot');
    const chapters = document.querySelectorAll('.chapter');
  
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        const target = chapters[index];
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    function updateDots() {
      const midpoint = window.innerHeight * 0.5;
  
      chapters.forEach((chapter, i) => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= midpoint && rect.bottom >= midpoint) {
          dots.forEach(d => d.classList.remove('active'));
          if (dots[i]) dots[i].classList.add('active');
        }
      });
    }
  
    window.addEventListener('scroll', updateDots);
    updateDots();
  }
  
  // ── SCROLL REVEAL ────────────────────────────────────────
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  
    elements.forEach(el => observer.observe(el));
  }
  
  // ── HERO PARALLAX ────────────────────────────────────────
  function initHeroParallax() {
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg) return;
  
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
      }
    });
  }
  
  // ── COUNTER ANIMATION ───────────────────────────────────
  function initCounters() {
    const counters = document.querySelectorAll('.count-up');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
  
    counters.forEach(el => observer.observe(el));
  }
  
  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
  
    const timer = setInterval(() => {
      step++;
      // Ease out
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(target * eased);
  
      el.textContent = current.toLocaleString() + suffix;
  
      if (step >= steps) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      }
    }, duration / steps);
  }
  
  // ── SECTION PARALLAX (on scroll) ─────────────────────────
  function initSectionParallax() {
    // Only on desktop
    if (window.innerWidth <= 768) return;
  
    const sections = document.querySelectorAll('.chapter-bg');
  
    window.addEventListener('scroll', () => {
      sections.forEach(bg => {
        const section = bg.parentElement;
        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight;
  
        if (rect.bottom > 0 && rect.top < viewH) {
          const progress = (viewH - rect.top) / (viewH + rect.height);
          const offset = (progress - 0.5) * 80;
          bg.style.transform = `translateY(${offset}px)`;
        }
      });
    }, { passive: true });
  }
  
  // ── SMOOTH SCROLL FOR NAV LINKS 
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
  
  // ── INIT ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initProgressBar();
    initNavbar();
    initChapterDots();
    initScrollReveal();
    initHeroParallax();
    initCounters();
    initSectionParallax();
    initSmoothScroll();
  });