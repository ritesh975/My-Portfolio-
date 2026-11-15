/* =========================================================
   RITESH KUMAR KASAUDHAN — PORTFOLIO INTERACTIONS + ANIMATIONS
   ========================================================= */
(() => {
  const body = document.body;
  const navbar = document.getElementById('navbar');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const toast = document.getElementById('site-toast');
  const progress = document.getElementById('scroll-progress');
  const glow = document.getElementById('cursor-glow');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  body.classList.add('js-ready');

  /* ---------- Toast ---------- */
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 4300);
  };

  /* ---------- Navbar, active section, scroll progress ---------- */
  const updateScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 24);
    let current = 'home';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 190) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    }
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  /* ---------- Mobile menu ---------- */
  const closeMenu = () => {
    if (!hamburger || !menu) return;
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !hamburger.contains(event.target)) closeMenu();
    });
  }

  /* ---------- Typing effect (role line) ---------- */
  const typedEl = document.getElementById('typed');
  const startTyping = () => {
    if (!typedEl || reduceMotion) return;
    const words = (typedEl.dataset.words || '').split('|').filter(Boolean);
    if (!words.length) return;
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, c);
      let delay = deleting ? 38 : 85;
      if (!deleting && c === word.length) { deleting = true; delay = 1500; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      window.setTimeout(tick, delay);
    };
    typedEl.textContent = '';
    tick();
  };

  /* ---------- Count-up numbers ---------- */
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (Number.isNaN(target) || reduceMotion) return;
    const duration = 1600;
    const start = performance.now();
    const frame = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  /* ---------- Scroll reveal (staggered) ---------- */
  const revealItems = [...document.querySelectorAll('.reveal')];
  const homeItems = revealItems.filter((item) => item.closest('.home'));
  const otherItems = revealItems.filter((item) => !item.closest('.home'));

  const showItem = (item, delay = 0) => {
    window.setTimeout(() => {
      item.classList.add('visible');
      item.querySelectorAll('[data-count]').forEach(countUp);
    }, delay);
  };

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        const siblings = item.parentElement ? [...item.parentElement.children].filter((n) => n.classList.contains('reveal')) : [item];
        const idx = Math.max(siblings.indexOf(item), 0);
        const perRow = window.innerWidth > 1100 ? 3 : window.innerWidth > 640 ? 2 : 1;
        showItem(item, (idx % perRow) * 110);
        observer.unobserve(item);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    otherItems.forEach((item) => revealObserver.observe(item));
  } else {
    otherItems.forEach((item) => item.classList.add('visible'));
  }

  /* ---------- Skill bars ---------- */
  const skillBoxes = [...document.querySelectorAll('.skc')];
  const animateSkill = (card) => {
    card.querySelectorAll('.skfill').forEach((bar) => {
      const match = bar.getAttribute('style')?.match(/width\s*:\s*([^;]+)/);
      const width = match?.[1] || '80%';
      bar.style.width = '0';
      window.requestAnimationFrame(() => {
        window.setTimeout(() => { bar.style.width = width; }, 250);
      });
    });
  };
  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateSkill(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    skillBoxes.forEach((card) => skillObserver.observe(card));
  } else {
    skillBoxes.forEach(animateSkill);
  }

  /* ---------- Preloader → hero intro ---------- */
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    body.classList.add('loaded');
    homeItems.forEach((item, i) => showItem(item, 350 + i * 120));
    window.setTimeout(startTyping, 1300);
  };
  const minWait = new Promise((resolve) => window.setTimeout(resolve, reduceMotion ? 0 : 950));
  const loaded = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
  });
  Promise.all([minWait, loaded]).then(start);
  window.setTimeout(start, 2800); // safety net

  /* ---------- Hero particle network (canvas) ---------- */
  const canvas = document.getElementById('net');
  const hero = document.getElementById('home');
  const mouse = { x: -9999, y: -9999 };
  if (canvas && hero && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, points = [], raf = 0, visible = true;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(95, Math.floor((w * h) / 15000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.7 + 0.8,
        c: Math.random() < 0.3 ? '255,107,122' : Math.random() < 0.5 ? '139,107,255' : '59,224,255'
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!reduceMotion) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) { const f = (1 - d2 / 14000) * 0.9; p.x += (dx / Math.sqrt(d2 || 1)) * f; p.y += (dy / Math.sqrt(d2 || 1)) * f; }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},.85)`;
        ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 125) {
            ctx.strokeStyle = `rgba(${p.c},${(1 - dist / 125) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        const mx = p.x - mouse.x, my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 170) {
          ctx.strokeStyle = `rgba(255,184,107,${(1 - md / 170) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    };

    const loop = () => {
      draw();
      raf = visible && !document.hidden && !reduceMotion ? requestAnimationFrame(loop) : 0;
    };
    const run = () => { if (!raf) raf = requestAnimationFrame(loop); };

    resize();
    draw();
    if (!reduceMotion) run();
    let resizeTimer;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { resize(); draw(); }, 150);
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !reduceMotion) run();
      }).observe(hero);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && !reduceMotion) run(); });
  }

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    // Hero parallax
    const heroVisual = document.querySelector('.hero-visual');
    if (hero) {
      hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        if (heroVisual) {
          heroVisual.style.setProperty('--px', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
          heroVisual.style.setProperty('--py', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
        }
      });
      hero.addEventListener('pointerleave', () => {
        mouse.x = mouse.y = -9999;
        if (heroVisual) { heroVisual.style.setProperty('--px', 0); heroVisual.style.setProperty('--py', 0); }
      });
    }

    // Cursor glow (smoothly follows)
    if (glow) {
      let gx = window.innerWidth / 2, gy = window.innerHeight / 2, tx = gx, ty = gy;
      window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; glow.classList.add('on'); });
      document.addEventListener('pointerleave', () => glow.classList.remove('on'));
      const follow = () => {
        gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
        glow.style.transform = `translate(${gx}px,${gy}px)`;
        requestAnimationFrame(follow);
      };
      follow();
    }

    // Card spotlight (+ 3D tilt on project cards)
    const cards = document.querySelectorAll('.skc,.proj-card,.exp-card,.cert-card,.edu-card,.cinfo,.cform');
    cards.forEach((card) => {
      const tilt = card.classList.contains('proj-card');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        if (tilt) {
          const rx = ((y / r.height) - 0.5) * -9;
          const ry = ((x / r.width) - 0.5) * 9;
          card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
        }
      });
      card.addEventListener('pointerleave', () => { if (tilt) card.style.transform = ''; });
    });

    // Magnetic hero buttons
    document.querySelectorAll('.home-btns .btn').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        btn.style.transform = `translate(${dx}px,${dy}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Contact form → opens email app (no backend) ---------- */
/* ---------- Contact form → FormSubmit Email ---------- */

if (form && status) {
  form.addEventListener('submit', (event) => {
    // Do not prevent default form submission
    const name = document.getElementById('fullname')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const mobile = document.getElementById('mobile')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';

    if (!name || !email || !subject || !message) {
      event.preventDefault();
      status.textContent = 'Please fill in all required fields.';
      status.className = 'fst error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      event.preventDefault();
      status.textContent = 'Please enter a valid email address.';
      status.className = 'fst error';
      return;
    }

    status.textContent = 'Sending your message...';
    status.className = 'fst success';
  });
}


  /* ---------- Smooth anchor scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---------- Project demo placeholders ---------- */
  document.querySelectorAll('.demo-placeholder').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const project = link.closest('.proj-card')?.querySelector('h3')?.textContent.trim() || 'This project';
      showToast(`${project}: a live demo link has not been added yet. The project details and GitHub profile link remain available.`);
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
