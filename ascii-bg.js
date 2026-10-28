(function () {
  'use strict';

  // Sprites ASCII
  const ASCII_CAT_F1 = [
    "⠀⠀⠀⠀⢀⠠⠤⠀⢀⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠐⠀⠐⠀⠀⢀⣾⣿⡇⠀⠀⠀⠀⠀⢀⣼⡇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⠀⠀⠀⠀⣴⣿⣿⠇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣇⠀⠀⢀⣾⣿⣿⣿⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠐⠀⡀",
    "⠀⠀⠀⠀⢰⡿⠉⠀⡜⣿⣿⣿⡿⠿⢿⣿⣿⡃⠀⠀⠂⠄⠀",
    "⠀⠀⠒⠒⠸⣿⣄⡘⣃⣿⣿⡟⢰⠃⠀⢹⣿⡇⠀⠀⠀⠀⠀",
    "⠀⠀⠚⠉⠀⠊⠻⣿⣿⣿⣿⣿⣮⣤⣤⣿⡟⠁⠘⠠⠁⠀⠀",
    "⠀⠀⠀⠀⠀⠠⠀⠀⠈⠙⠛⠛⠛⠛⠛⠁⠀⠒⠤⠀⠀⠀⠀",
    "⠨⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠀⠀⠀⠀⠀⠀",
    "⠁⠃⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
  ];

  const ASCII_CAT_F2 = [
    "⠀⠀⠀⠀⢀⠠⠤⠀⢀⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠐⠀⠐⠀⠀⢀⣾⣿⡇⠀⠀⠀⠀⠀⢀⣼⡇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⠀⠀⠀⠀⣴⣿⣿⠇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣇⠀⠀⢀⣾⣿⣿⣿⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠐⠀⡀",
    "⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡃⠀⠀⠂⠄⠀",
    "⠀⠀⠒⠒⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀",
    "⠀⠀⠚⠉⠀⠊⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠘⠠⠁⠀⠀",
    "⠀⠀⠀⠀⠀⠠⠀⠀⠈⠙⠛⠛⠛⠛⠛⠁⠀⠒⠤⠀⠀⠀⠀",
    "⠨⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠀⠀⠀⠀⠀⠀",
    "⠁⠃⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
  ];

  const SPACE_INVADER_CRAB_F1 = [
    "    ▄     ▄    ",
    "     █   █     ",
    "    ▄█████▄    ",
    "   ██ ███ ██   ",
    "  ███████████  ",
    "  █ ▀█████▀ █  ",
    "  █ █     █ █  ",
    "     ▀▄ ▄▀     "
  ];

  const SPACE_INVADER_CRAB_F2 = [
    "    ▄     ▄    ",
    "  ▄  █   █  ▄  ",
    "  █▄███████▄█  ",
    "  ███ ███ ███  ",
    "   █████████   ",
    "    ▄█████▄    ",
    "    █     █    ",
    "   ▀       ▀   "
  ];

  const SPACE_INVADER_SQUID_F1 = [
    "     ▄██▄     ",
    "   ▄██████▄   ",
    "  ██████████  ",
    "  ██ ▀██▀ ██  ",
    "  ██████████  ",
    "    ▄█▀▀█▄    ",
    "   █▀    ▀█   ",
    "    ▀    ▀    "
  ];

  const SPACE_INVADER_SQUID_F2 = [
    "     ▄██▄     ",
    "   ▄██████▄   ",
    "  ██████████  ",
    "  ██ ▀██▀ ██  ",
    "  ██████████  ",
    "    █▀██▀█    ",
    "   █  ▀▀  █   ",
    "    ▀    ▀    "
  ];

  const ASCII_FLOPPY = [
    " .------------. ",
    " | |========| | ",
    " | |========| | ",
    " |            | ",
    " |   [__||]   | ",
    " '------------' "
  ];

  const GLYPH_CHARS = [
    '*', '+', '·', '░', '▒', '1', '0', '<', '>', '/', '{', '}', ';', ':',
    '#', '~', '^', '::', '■', '▀', '▄', '[', ']', '$', '%', '&', '@', '</>'
  ];

  const canvas = document.getElementById('ascii-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = window.devicePixelRatio || 1;

  let targetScrollY = window.pageYOffset || 0;
  let currentScrollY = targetScrollY;
  let lastTargetScrollY = targetScrollY;
  let smoothVelocity = 0;
  let accumulatedScrollDistance = 0;

  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;

  let catBlinkTimer = 0;
  let isCatBlinking = false;

  // Cores da paleta por tema
  function getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    if (isLight) {
      return {
        cat: 'rgba(107, 33, 168, 0.90)',
        catGlow: 'rgba(107, 33, 168, 0.25)',
        crab: 'rgba(107, 33, 168, 0.85)',
        crabGlow: 'rgba(107, 33, 168, 0.25)',
        squid: 'rgba(107, 33, 168, 0.85)',
        squidGlow: 'rgba(107, 33, 168, 0.20)',
        floppy: 'rgba(107, 33, 168, 0.85)',
        floppyGlow: 'rgba(107, 33, 168, 0.25)',
        glyph: 'rgba(107, 33, 168, 0.45)',
        bubble: 'rgba(107, 33, 168, 0.90)'
      };
    }

    return {
      cat: 'rgba(208, 21, 222, 0.65)',
      catGlow: 'rgba(208, 21, 222, 0.50)',
      crab: 'rgba(208, 21, 222, 0.65)',
      crabGlow: 'rgba(208, 21, 222, 0.45)',
      squid: 'rgba(208, 21, 222, 0.60)',
      squidGlow: 'rgba(208, 21, 222, 0.42)',
      floppy: 'rgba(208, 21, 222, 0.65)',
      floppyGlow: 'rgba(208, 21, 222, 0.45)',
      glyph: 'rgba(208, 21, 222, 0.35)', 
      bubble: 'rgba(208, 21, 222, 0.65)'
    };
  }

  let entities = [];
  let glyphParticles = [];

  // Inicialização e posicionamento das entidades
  function initEntities() {
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1200;

    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      4500
    );

    entities = [
      {
        id: 'terminal-cat',
        type: 'cat',
        getX: (w) => (w > 1350 ? w - 240 : (w > 900 ? w - 150 : (w > 600 ? w * 0.68 : w * 0.5))),
        worldY: isMobile ? 320 : 420,
        parallax: 0.40,
        fontSize: isMobile ? 12 : 18,
        floatSpeed: 0.0018,
        floatAmp: 14,
        rotFactor: 0.0006,
        phase: 0
      },

      {
        id: 'space-invader-crab-1',
        type: 'invader-crab',
        getX: (w) => (w > 1350 ? 140 : (w > 800 ? w * 0.12 : 70)),
        worldY: isMobile ? 1000 : 1200,
        parallax: 0.52,
        fontSize: isMobile ? 11 : 16,
        floatSpeed: 0.0022,
        floatAmp: 16,
        rotFactor: 0.0012,
        phase: 1.2
      },

      {
        id: 'space-invader-squid-1',
        type: 'invader-squid',
        getX: (w) => (w > 1350 ? w - 140 : (w > 800 ? w * 0.88 : w - 70)),
        worldY: isMobile ? 1350 : 1600,
        parallax: 0.50,
        fontSize: isMobile ? 11 : 15,
        floatSpeed: 0.002,
        floatAmp: 15,
        rotFactor: 0.001,
        phase: 2.4
      },

      {
        id: 'retro-floppy',
        type: 'floppy',
        getX: (w) => (w > 1350 ? 140 : (w > 800 ? w * 0.10 : 70)),
        worldY: isMobile ? 1500 : 1850,
        parallax: 0.50,
        fontSize: isMobile ? 11 : 18,
        floatSpeed: 0.002,
        floatAmp: 15,
        rotFactor: 0.001,
        phase: 3.6
      },

      {
        id: 'space-invader-crab-2',
        type: 'invader-crab',
        getX: (w) => (w > 1350 ? w - 140 : (w > 800 ? w * 0.88 : w - 70)),
        worldY: isMobile ? 2200 : 2700,
        parallax: 0.50,
        fontSize: isMobile ? 11 : 16,
        floatSpeed: 0.0024,
        floatAmp: 14,
        rotFactor: 0.0012,
        phase: 4.8
      }
    ];

    glyphParticles = [];
    const glyphCount = isMobile ? 36 : 72;

    for (let i = 0; i < glyphCount; i++) {
      glyphParticles.push({
        char: GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)],
        relX: Math.random(),
        worldY: Math.random() * (pageHeight + 400),
        parallax: 0.18 + Math.random() * 0.45,
        fontSize: 10 + Math.floor(Math.random() * 8),
        opacity: 0.45 + Math.random() * 0.45,
        floatSpeed: 0.001 + Math.random() * 0.002,
        floatAmp: 8 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.15
      });
    }
  }

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    initEntities();
  }

  // Captura de eventos (scroll, mouse e redimensionamento)
  window.addEventListener('scroll', () => {
    targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - width / 2) * 0.025;
    targetMouseY = (e.clientY - height / 2) * 0.025;
  }, { passive: true });

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // Funções de desenho das entidades no canvas
  function drawCat(cat, screenX, screenY, time, colors) {
    ctx.save();
    ctx.translate(screenX + mouseX * 0.5, screenY + mouseY * 0.5);

    const tilt = Math.max(-0.08, Math.min(0.08, smoothVelocity * cat.rotFactor));
    ctx.rotate(tilt);

    ctx.font = `bold ${cat.fontSize}px 'JetBrains Mono', 'Segoe UI Symbol', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colors.cat;
    ctx.shadowColor = colors.catGlow;
    ctx.shadowBlur = 12;

    const currentSprite = isCatBlinking ? ASCII_CAT_F2 : ASCII_CAT_F1;
    const lineHeight = cat.fontSize * 1.15;
    const startY = -(currentSprite.length * lineHeight) / 2;

    for (let i = 0; i < currentSprite.length; i++) {
      ctx.fillText(currentSprite[i], 0, startY + i * lineHeight);
    }

    ctx.restore();
  }

  function drawSpaceInvaderCrab(invader, screenX, screenY, colors) {
    ctx.save();
    ctx.translate(screenX + mouseX * 0.7, screenY + mouseY * 0.7);

    const tilt = Math.max(-0.14, Math.min(0.14, smoothVelocity * invader.rotFactor));
    ctx.rotate(tilt);

    const stepCycle = Math.floor((accumulatedScrollDistance * 0.04 + invader.phase * 2) % 2);
    const sprite = stepCycle === 0 ? SPACE_INVADER_CRAB_F1 : SPACE_INVADER_CRAB_F2;

    ctx.font = `bold ${invader.fontSize}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colors.crab;
    ctx.shadowColor = colors.crabGlow;
    ctx.shadowBlur = 12;

    const lineHeight = invader.fontSize * 1.05;
    const startY = -(sprite.length * lineHeight) / 2;

    for (let i = 0; i < sprite.length; i++) {
      ctx.fillText(sprite[i], 0, startY + i * lineHeight);
    }

    ctx.restore();
  }

  function drawSpaceInvaderSquid(invader, screenX, screenY, colors) {
    ctx.save();
    ctx.translate(screenX + mouseX * 0.6, screenY + mouseY * 0.6);

    const tilt = Math.max(-0.14, Math.min(0.14, smoothVelocity * invader.rotFactor));
    ctx.rotate(tilt);

    const stepCycle = Math.floor((accumulatedScrollDistance * 0.035 + invader.phase * 2) % 2);
    const sprite = stepCycle === 0 ? SPACE_INVADER_SQUID_F1 : SPACE_INVADER_SQUID_F2;

    ctx.font = `bold ${invader.fontSize}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colors.squid;
    ctx.shadowColor = colors.squidGlow;
    ctx.shadowBlur = 10;

    const lineHeight = invader.fontSize * 1.05;
    const startY = -(sprite.length * lineHeight) / 2;

    for (let i = 0; i < sprite.length; i++) {
      ctx.fillText(sprite[i], 0, startY + i * lineHeight);
    }

    ctx.restore();
  }

  function drawFloppy(floppy, screenX, screenY, colors) {
    ctx.save();
    ctx.translate(screenX + mouseX * 0.5, screenY + mouseY * 0.5);

    const tilt = Math.max(-0.1, Math.min(0.1, smoothVelocity * floppy.rotFactor));
    ctx.rotate(tilt);

    ctx.font = `bold ${floppy.fontSize}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colors.floppy;
    ctx.shadowColor = colors.floppyGlow || colors.catGlow;
    ctx.shadowBlur = 10;

    const lineHeight = floppy.fontSize * 1.15;
    const startY = -(ASCII_FLOPPY.length * lineHeight) / 2;

    for (let i = 0; i < ASCII_FLOPPY.length; i++) {
      ctx.fillText(ASCII_FLOPPY[i], 0, startY + i * lineHeight);
    }

    ctx.restore();
  }

  // Loop de animação (scroll, parallax e renderização)
  function render(timestamp) {

    const scrollDelta = targetScrollY - currentScrollY;
    currentScrollY += scrollDelta * 0.082;


    const rawVelocity = targetScrollY - lastTargetScrollY;
    smoothVelocity += (rawVelocity - smoothVelocity) * 0.14;
    lastTargetScrollY = targetScrollY;


    accumulatedScrollDistance += Math.abs(rawVelocity) * 0.18 + 0.15;


    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const isScrolling = Math.abs(smoothVelocity) > 0.4;

    // Intervalo entre piscadas (4s), mantendo a piscada rápida e nítida (120ms)
    const catCycle = timestamp % 4000;
    isCatBlinking = catCycle < 120;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const colors = getThemeColors();


    for (let i = 0; i < glyphParticles.length; i++) {
      const p = glyphParticles[i];
      const screenY = p.worldY - currentScrollY * p.parallax + Math.sin(timestamp * p.floatSpeed + p.phase) * p.floatAmp;

      
      if (screenY >= -50 && screenY <= height + 50) {
        const screenX = (p.relX * width + p.driftX * timestamp * 0.02) % width;
        ctx.save();
        ctx.font = `${p.fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = colors.glyph;
        ctx.globalAlpha = p.opacity;
        ctx.fillText(p.char, screenX, screenY);
        ctx.restore();
      }
    }


    for (let i = 0; i < entities.length; i++) {
      const ent = entities[i];


      const floatY = Math.sin(timestamp * ent.floatSpeed + ent.phase) * ent.floatAmp;
      const screenY = (ent.worldY - currentScrollY * ent.parallax) + floatY;

      if (screenY >= -450 && screenY <= height + 450) {
        const screenX = typeof ent.getX === 'function' ? ent.getX(width) : ent.relX * width;

        switch (ent.type) {
          case 'cat':
            drawCat(ent, screenX, screenY, timestamp, colors);
            break;
          case 'invader-crab':
            drawSpaceInvaderCrab(ent, screenX, screenY, colors);
            break;
          case 'invader-squid':
            drawSpaceInvaderSquid(ent, screenX, screenY, colors);
            break;
          case 'floppy':
            drawFloppy(ent, screenX, screenY, colors);
            break;
        }
      }
    }

    requestAnimationFrame(render);
  }


  resizeCanvas();
  requestAnimationFrame(render);

  // API global exposta para interações externas (terminal, eventos)
  window.AsciiBackgroundEngine = {
    setCatSpeech: function (text) {
      const cat = entities.find(e => e.id === 'terminal-cat');
      if (cat) cat.speechText = text;
    },
    triggerBlink: function () {
      isCatBlinking = true;
      catBlinkTimer = 0;
    },
    getEntities: function () {
      return entities;
    }
  };

})();
