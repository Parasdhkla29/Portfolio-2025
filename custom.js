/* ==========================================================
   PARAS DHAKLA — Video Editor Portfolio
   Main JavaScript
   ========================================================== */

(function () {
  'use strict';

  /* ---- Loader -------------------------------------------- */
  const loader    = document.getElementById('loader');
  const loaderCount = document.getElementById('loaderCount');
  const loaderFill  = document.getElementById('loaderFill');

  let count = 0;
  const tickInterval = setInterval(() => {
    count += Math.random() > 0.7 ? 2 : 1;
    if (count > 100) count = 100;

    loaderCount.textContent  = String(count).padStart(2, '0');
    loaderFill.style.width   = count + '%';

    if (count >= 100) {
      clearInterval(tickInterval);
      setTimeout(finishLoad, 400);
    }
  }, 22);

  function finishLoad() {
    loader.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    loader.style.opacity    = '0';
    loader.style.transform  = 'translateY(-6px)';
    setTimeout(() => {
      loader.style.display = 'none';
      startHeroAnimation();
    }, 700);
  }

  /* ---- Custom Cursor ------------------------------------- */
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (window.matchMedia('(hover: hover)').matches) {
    let mx = -200, my = -200;
    let rx = -200, ry = -200;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
    });

    (function lerpCursor() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(lerpCursor);
    })();

    const hoverTargets = 'a, button, .work-card, .value-card, .creator-card, .stack-item';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
  }

  /* ---- Navigation ---------------------------------------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburger / mobile menu
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
  });

  /* ---- Ticker -------------------------------------------- */
  const tickerItems = [
    'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut',
    'Color Grading', 'Motion Graphics', 'Instagram Reels', 'Storytelling',
    'Hook Writing', 'Sound Design', 'Transitions', 'Viral Content',
    'B-Roll Cuts', 'Caption Design', 'Audio Sync', 'Cinematic Grade'
  ];

  const tickerTrack = document.getElementById('tickerTrack');
  const duped = [...tickerItems, ...tickerItems]; // duplicate for seamless loop

  duped.forEach(text => {
    const div = document.createElement('div');
    div.className = 'ticker-item';
    div.innerHTML = `<div class="ticker-dot"></div>${text}`;
    tickerTrack.appendChild(div);
  });

  /* ---- Creators Carousel --------------------------------- */
  const creatorsData = [
    { name: 'Arjun Sharma',  handle: '@arjun.sharma',  niche: 'Lifestyle', initials: 'AS', color: '#00e5ff' },
    { name: 'Priya Kapoor',  handle: '@priya.kapoor',  niche: 'Fashion',   initials: 'PK', color: '#ff2d78' },
    { name: 'Rohan Mehta',   handle: '@rohan.mehta',   niche: 'Fitness',   initials: 'RM', color: '#4ade80' },
    { name: 'Anika Gupta',   handle: '@anika.gupta',   niche: 'Travel',    initials: 'AG', color: '#f59e0b' },
    { name: 'Dev Patel',     handle: '@dev.patel',     niche: 'Comedy',    initials: 'DP', color: '#8b5cf6' },
    { name: 'Sanya Singh',   handle: '@sanya.singh',   niche: 'Beauty',    initials: 'SS', color: '#ec4899' },
    { name: 'Karan Verma',   handle: '@karan.verma',   niche: 'Tech',      initials: 'KV', color: '#06b6d4' },
    { name: 'Mia Reddy',     handle: '@mia.reddy',     niche: 'Food',      initials: 'MR', color: '#f97316' },
    { name: 'Isha Nair',     handle: '@isha.nair',     niche: 'Dance',     initials: 'IN', color: '#a855f7' },
    { name: 'Nikhil Bose',   handle: '@nikhil.bose',   niche: 'Vlogs',     initials: 'NB', color: '#14b8a6' },
    { name: 'Tanya Rawat',   handle: '@tanya.rawat',   niche: 'Skincare',  initials: 'TR', color: '#fb7185' },
    { name: 'Sahil Khan',    handle: '@sahil.khan',    niche: 'Fitness',   initials: 'SK', color: '#34d399' },
  ];

  const creatorsTrack = document.getElementById('creatorsTrack');
  // duplicate for infinite scroll
  const allCreators = [...creatorsData, ...creatorsData];

  allCreators.forEach(c => {
    const card = document.createElement('div');
    card.className = 'creator-card';
    card.innerHTML = `
      <div class="creator-avatar" style="background:${hexAlpha(c.color, 0.12)};border:2px solid ${hexAlpha(c.color, 0.35)};color:${c.color};">
        ${c.initials}
      </div>
      <div class="creator-name">${c.name}</div>
      <div class="creator-handle">${c.handle}</div>
      <span class="creator-niche" style="color:${c.color};background:${hexAlpha(c.color, 0.10)};border:1px solid ${hexAlpha(c.color, 0.25)};">${c.niche}</span>
    `;
    creatorsTrack.appendChild(card);
  });

  /* ---- Stack Grid ---------------------------------------- */
  const stackData = [
    { name: 'Adobe Premiere Pro', category: 'Primary Editor',   icon: '🎬', bg: '#1a1a2e' },
    { name: 'After Effects',      category: 'Motion Graphics',  icon: '✨', bg: '#1a1a2e' },
    { name: 'DaVinci Resolve',    category: 'Color Grading',    icon: '🎨', bg: '#1a0d0a' },
    { name: 'CapCut',             category: 'Quick Edits',      icon: '✂️', bg: '#0a0a0a' },
    { name: 'Photoshop',          category: 'Thumbnails',       icon: '🖼️', bg: '#0a1a2e' },
    { name: 'Illustrator',        category: 'Vector Graphics',  icon: '📐', bg: '#1a0d00' },
    { name: 'Frame.io',           category: 'Review & Collab',  icon: '🔗', bg: '#001a1a' },
    { name: 'Notion',             category: 'Project Mgmt',     icon: '📋', bg: '#111' },
    { name: 'Audacity',           category: 'Audio Cleanup',    icon: '🎵', bg: '#0d1a0d' },
    { name: 'VN Editor',          category: 'Mobile Edits',     icon: '📱', bg: '#0a0a1a' },
  ];

  const stackGrid = document.getElementById('stackGrid');
  stackData.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'stack-item reveal';
    item.style.transitionDelay = (i * 0.05) + 's';
    item.innerHTML = `
      <div class="stack-icon" style="background:${s.bg};">${s.icon}</div>
      <div>
        <div class="stack-name">${s.name}</div>
        <div class="stack-category">${s.category}</div>
      </div>
    `;
    stackGrid.appendChild(item);
  });

  /* ---- Intersection Observer (Scroll Reveals) ------------ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  // Observe all .reveal elements (including dynamically added stack items)
  function observeReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  observeReveal();

  /* ---- Hero animations (after loader) -------------------- */
  function startHeroAnimation() {
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.7, delay: 0.1 })
        .from('#heroName',   { opacity: 0, y: 70, duration: 1 }, '-=0.4')
        .to('#heroName',     { opacity: 1 })
        .from('.hero-role',  { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
        .from('#heroDesc',   { opacity: 0, y: 18, duration: 0.6 }, '-=0.4')
        .from('#heroActions',{ opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
        .from('#heroStats .hero-stat-pill', {
          opacity: 0, x: 20, stagger: 0.1, duration: 0.5
        }, '-=0.4')
        .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.2')
        .from('.ticker-wrap',      { opacity: 0, duration: 0.5 }, '-=0.3');

      // Parallax on hero content
      gsap.to('.hero-content', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Value cards stagger on scroll
      gsap.from('.value-card', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.value-grid',
          start: 'top 80%'
        }
      });

      // Work cards
      gsap.from('.work-card', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.work-grid',
          start: 'top 80%'
        }
      });

    } else {
      // Fallback: just show hero without GSAP
      const heroEls = document.querySelectorAll('#heroEyebrow, #heroName, .hero-role, #heroDesc, #heroActions, .scroll-indicator, .ticker-wrap');
      heroEls.forEach(el => {
        el.style.opacity    = '1';
        el.style.transform  = 'none';
        el.style.transition = 'none';
      });
    }

    // Trigger observer again for any newly added DOM nodes
    observeReveal();
  }

  /* ---- Active nav link on scroll ------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) {
        current = sec.getAttribute('id');
      }
    });
    navLinksAll.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--cyan)'
        : '';
    });
  }, { passive: true });

  /* ---- Utility ------------------------------------------- */
  function hexAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

})();
