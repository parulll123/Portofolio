/* =========================================================
   FAHRUL RIDHO — PORTFOLIO SCRIPT
   Vanilla JS — no dependencies
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile hamburger menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------- 3. Smooth scrolling for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- 4. Active navigation link based on section in view ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.dataset.section === id);
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    rootMargin: '-40% 0px -50% 0px', // trigger when section is roughly centered
    threshold: 0
  });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- 5. Scroll reveal animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach((el, i) => {
      // slight stagger for elements revealed together
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      revealObserver.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 6. Back-to-top button ---------- */
  const backToTop = document.getElementById('backToTop');

  const handleBackToTop = () => {
    if (window.scrollY > 480) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };
  handleBackToTop();
  window.addEventListener('scroll', handleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});