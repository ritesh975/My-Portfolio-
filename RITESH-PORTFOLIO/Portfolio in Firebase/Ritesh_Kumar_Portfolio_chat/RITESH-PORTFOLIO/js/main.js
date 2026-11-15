/* =========================================================
   RITESH KUMAR KASAUDHAN — PORTFOLIO JS
   ========================================================= */
(() => {
  const navbar = document.getElementById('navbar');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('section[id]')];
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-links');

  /* Navbar + active section */
  const updateNav = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* Mobile menu */
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* Reveal animations */
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

  revealItems.forEach((item, index) => {
    if (item.closest('.home')) {
      setTimeout(() => item.classList.add('visible'), 180 + index * 110);
    } else {
      revealObserver.observe(item);
    }
  });

  /* Animate skill bars */
  const skillBoxes = document.querySelectorAll('.skc');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skfill').forEach(bar => {
        const width = bar.getAttribute('style')?.match(/width\s*:\s*([^;]+)/)?.[1] || '80%';
        bar.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = width; }, 120);
        });
      });
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });
  skillBoxes.forEach(box => skillObserver.observe(box));

  /* Contact form: opens the user's email client without requiring a backend. */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const name = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        status.textContent = 'Please fill in all required fields.';
        status.className = 'fst error';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'fst error';
        return;
      }

      /* Replace this address with your preferred email before deployment. */
      const recipient = 'riteshkasaudhan975@gmail.com';
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Mobile: ${mobile || 'Not provided'}\n\n` +
        `${message}`;

      if (recipient === 'your-email@example.com') {
        status.innerHTML = 'Form is ready. Replace <strong>your-email@example.com</strong> in <code>main.js</code> with your email before publishing.';
        status.className = 'fst error';
        return;
      }

      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Opening your email app...';
      status.className = 'fst success';
    });
  }

  /* Lightweight card tilt on desktop */
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.proj-card,.cert-card,.svc-card,.exp-card').forEach(card => {
      card.addEventListener('mousemove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-5px) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* Smooth anchor navigation */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();



/* Project demo placeholders: replace the data-project-demo URLs in index.html. */
document.querySelectorAll('.demo-placeholder').forEach(link => {
  link.addEventListener('click', event => {
    if (link.getAttribute('href') === '#') {
      event.preventDefault();
      const project = link.dataset.projectDemo || 'this project';
      const status = document.getElementById('form-status');
      if (status) {
        status.textContent = `Demo link for ${project} is not added yet. Replace its href/data-project-demo URL in index.html.`;
        status.className = 'fst error';
      }
    }
  });
});
