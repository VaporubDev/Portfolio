document.addEventListener('DOMContentLoaded', () => {
  // Favicon dinâmico
  function generateAsciiFavicon() {
    let faviconEl = document.getElementById('dynamic-favicon');
    if (!faviconEl) {
      faviconEl = document.createElement('link');
      faviconEl.id = 'dynamic-favicon';
      faviconEl.rel = 'icon';
      document.head.appendChild(faviconEl);
    }
    faviconEl.type = 'image/svg+xml';
    faviconEl.href = 'favicon.svg';
  }

  try {
    generateAsciiFavicon();
  } catch (err) {
    console.warn('Favicon generation fallback:', err);
  }

  // Gerenciamento de tema (Claro / Escuro)
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeText = document.getElementById('theme-text');
  let currentTheme = localStorage.getItem('ascii_theme') || 'dark';

  function applyTheme(theme) {
    currentTheme = theme;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ascii_theme', theme);
    updateThemeButtonText();
  }

  function updateThemeButtonText() {
    const t = translations[currentLang] || translations.pt;
    const isDark = currentTheme === 'dark';
    const icon = isDark ? '☾' : '☼';
    const rawText = isDark ? t.theme_dark : t.theme_light;
    const word = rawText.replace(/[\[\]☾☼]/g, '').trim();
    if (themeText) {
      themeText.innerHTML = `[ <span class="theme-icon">${icon}</span><span class="theme-word"> ${word}</span> ]`;
    }
    if (themeToggle) {
      themeToggle.setAttribute('title', t.theme_title);
    }
  }

  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  window.applyTheme = applyTheme;
  window.updateThemeButtonText = updateThemeButtonText;
  window.currentTheme = currentTheme;

  // Efeito de digitação no Hero
  const typedEl = document.querySelector('.typed-text');
  const phrases = [
    'cat developer_manifest.json',
    'cat about_me.txt',
    'npm test',
    'git commit -m "feat: backend api & ui"',
    'echo "Do banco de dados ao pixel"'
  ];

  let phraseIdx = 0;
  let charIdx = phrases[0].length;
  let isDeleting = true;

  function typeLoop() {
    if (!typedEl) return;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }
  typeLoop();

  // Envio do formulário de contato com feedback visual
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const submitBtn = document.getElementById('btn-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const t = translations[currentLang] || translations.pt;
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const message = document.getElementById('message')?.value || '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t.contact_btn_sending;
      }

      // Prepara envio via mailto para garantir contato real
      const subject = encodeURIComponent(`[Contato Portfólio] Mensagem de ${name}`);
      const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
      const mailtoUrl = `mailto:florserena.epg203@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        window.open(mailtoUrl, '_blank');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = t.contact_btn_send;
        }

        if (toastText) {
          toastText.textContent = t.contact_toast;
        }

        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3500);
        }
      }, 600);
    });
  }

  // Destaque de navegação ativa ao rolar
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.ascii-nav-item, .ascii-mobile-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const h = sec.offsetHeight;
      const top = sec.offsetTop - 100;
      const id = sec.getAttribute('id');

      if (scrollY > top && scrollY <= top + h) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Toggle e interações do Menu Mobile
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavItems = document.querySelectorAll('.ascii-mobile-item, .mobile-cta-btn');

  if (menuToggle && mobileMenu) {
    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      const iconSpan = menuToggle.querySelector('.menu-icon-text');
      if (iconSpan) iconSpan.textContent = '[ ☰ ]';
    }

    function toggleMobileMenu() {
      const willOpen = !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', willOpen);
      menuToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      const iconSpan = menuToggle.querySelector('.menu-icon-text');
      if (iconSpan) iconSpan.textContent = willOpen ? '[ ✕ ]' : '[ ☰ ]';
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileNavItems.forEach(item => {
      item.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }
});

