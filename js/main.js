/**
 * E-PORTFOLIO ALEXIS GROS - ENSEEIHT
 * Script principal : Bilinguisme instantané & Navigation responsive
 */

(function () {
  'use strict';

  // 1. GESTION DU BILINGUISME (FR / EN)
  const LANG_STORAGE_KEY = 'n7_portfolio_lang';

  function applyLanguage(lang) {
    const validLang = lang === 'en' ? 'en' : 'fr';
    document.documentElement.setAttribute('lang', validLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, validLang);
    } catch (e) {
      console.warn('Storage inaccessible', e);
    }
  }

  function toggleLanguage() {
    const current = document.documentElement.getAttribute('lang') || 'fr';
    const next = current === 'fr' ? 'en' : 'fr';
    applyLanguage(next);
  }

  // 2. INITIALISATION RAPIDE AU CHARGEMENT
  document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la langue
    let saved = 'fr';
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'en' || stored === 'fr') {
        saved = stored;
      }
    } catch (e) {}
    applyLanguage(saved);

    // Boutons de bascule de langue (tous les éléments avec la classe .lang-toggle-btn)
    document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLanguage();
      });
    });

    // 3. MENU MOBILE BURGER
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        mobileBtn.setAttribute('aria-expanded', isOpen);
        mobileBtn.innerHTML = isOpen ? '✕' : '☰';
      });
    }

    // 4. HIGHLIGHT DU LIEN ACTIF
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || href === `./${currentPath}`)) {
        link.classList.add('active');
      }
    });
  });
})();
