/* ========================
   PORTFOLIO SCRIPT
   Noorul Afreed
======================== */

(function () {
  'use strict';

  // ========================
  // NAV SCROLL BEHAVIOR
  // ========================
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ========================
  // MOBILE MENU
  // ========================
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ========================
  // SCROLL REVEAL
  // ========================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========================
  // SMOOTH SCROLL FOR ANCHORS
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ========================
  // PROJECT CARD TILT (subtle)
  // ========================
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-4px) rotateX(${-dy * 2}deg) rotateY(${dx * 2}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  // ========================
  // RESEARCH ITEM HOVER LINE
  // ========================
  const researchItems = document.querySelectorAll('.research-item');

  researchItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      researchItems.forEach(other => {
        if (other !== item) {
          other.style.opacity = '0.45';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      researchItems.forEach(other => {
        other.style.opacity = '';
      });
    });
  });

  // ========================
  // SKILL TAGS STAGGER REVEAL
  // ========================
  const skillTags = document.querySelectorAll('.skill-tag');

  skillTags.forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 0.04}s`;
  });

  // ========================
  // HERO NAME LETTER SPLIT
  // ========================
  // Subtle character-by-character entry for hero name
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    // Already animated via reveal class, keep it clean
  }

  // ========================
  // ACTIVE NAV LINK (scroll spy)
  // ========================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ========================
  // PAGE LOAD — trigger hero
  // ========================
  window.addEventListener('load', () => {
    // Trigger hero reveals immediately
    document.querySelectorAll('.hero .reveal').forEach(el => {
      setTimeout(() => el.classList.add('visible'), 100);
    });
  });

})();
