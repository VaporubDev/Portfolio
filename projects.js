// Integração com a API do GitHub e gerenciamento de filtros de projetos
const GITHUB_USERNAME = 'VaporubDev';
let cachedGithubRepos = null;
let currentProjectFilter = 'all';

function getRepoDemoUrl(repo) {
  if (!repo) return '';
  const candidate = repo.demo_url || repo.homepage || '';
  if (!candidate || typeof candidate !== 'string' || candidate.trim() === '') return '';

  let url = candidate.trim();
  if (url.includes('figma.com')) {
    return url;
  }
  if (url.includes('vaporubberg.github.io')) {
    url = url.replace('vaporubberg.github.io', 'vaporubdev.github.io');
  }
  return url;
}

window.GITHUB_USERNAME = GITHUB_USERNAME;
window.cachedGithubRepos = cachedGithubRepos;
window.getRepoDemoUrl = getRepoDemoUrl;

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização da grid de projetos e eventos
  const projectsGrid = document.querySelector('.projects-ascii-grid');
  const fallbackProjectsHtml = projectsGrid ? projectsGrid.innerHTML : '';
  const filterBtns = document.querySelectorAll('.ascii-filter-btn');

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Identifica se o repositório é claramente um site (linguagem HTML/CSS, deploy no github.io ou tópicos de web)
  function isWebsiteRepo(repo) {
    if (!repo) return false;
    const lang = (repo.language || '').toLowerCase();
    const topics = (repo.topics || []).map(t => String(t).toLowerCase());
    const name = (repo.name || '').toLowerCase();
    const demoUrl = getRepoDemoUrl(repo).toLowerCase();
    const homepage = (repo.homepage || '').toLowerCase();

    const hasWebDeploy = demoUrl.includes('github.io') || homepage.includes('github.io');
    const hasHtmlCss = lang === 'html' || lang === 'css' || topics.includes('html') || topics.includes('css') || topics.includes('html5') || topics.includes('css3');
    const isKnownSite = name.includes('freddy') || name.includes('viagem') || name.includes('sabor') || name.includes('portifolio') || name.includes('portfolio');
    const hasWebTopic = topics.includes('web') || topics.includes('landing') || topics.includes('spa');

    return hasHtmlCss || hasWebDeploy || isKnownSite || hasWebTopic;
  }

  // Identifica a categoria do repositório para suportar os filtros da interface (web, ui, scripts)
  function getRepoCategory(repo) {
    const topics = (repo.topics || []).map(t => String(t).toLowerCase());
    const homepage = (repo.homepage || '').toLowerCase();
    const demoUrl = (repo.demo_url || '').toLowerCase();
    const figmaUrl = (repo.figma_url || '').toLowerCase();
    const lang = (repo.language || '').toLowerCase();
    const name = (repo.name || '').toLowerCase();
    const desc = (repo.description || '').toLowerCase();

    // Link ou tópico explícito de Figma
    const hasFigmaLink = homepage.includes('figma.com') ||
      demoUrl.includes('figma.com') ||
      figmaUrl.includes('figma.com') ||
      topics.includes('figma');

    const isWeb = isWebsiteRepo(repo);

    // Se tiver apenas C#, apenas Python, Shell, ou apenas JS sem ser site -> script/automação
    const isScript = lang === 'python' ||
      lang === 'shell' ||
      lang === 'bash' ||
      lang === 'c#' ||
      lang === 'csharp' ||
      (lang === 'javascript' && !isWeb) ||
      topics.includes('python') ||
      topics.includes('c#') ||
      topics.includes('csharp') ||
      topics.includes('automation') ||
      topics.includes('script') ||
      topics.includes('tools') ||
      name.includes('automacao') ||
      name.includes('script') ||
      desc.includes('script') ||
      desc.includes('automação') ||
      desc.includes('automation');

    const cats = [];
    if (isWeb) cats.push('web');
    if (hasFigmaLink) cats.push('ui');
    if (isScript) cats.push('scripts');

    return cats.join(' ') || (isScript ? 'scripts' : 'web');
  }

  // Mapeamento específico de tecnologias reais por repositório
  const repoTechTags = {
    'Portfolio': ['[HTML5]', '[CSS3]', '[JAVASCRIPT]', '[CANVAS]'],
    'Portifolio': ['[HTML5]', '[CSS3]', '[JAVASCRIPT]', '[CANVAS]'],
    'automacao-renomear-pdfs': ['[PYTHON]', '[PYPDF]', '[REGEX]', '[AUTOMATION]'],
    'viagem-flow': ['[JAVASCRIPT]', '[LOCALSTORAGE]', '[DOM]', '[FIGMA]'],
    'Five-Night-s-at-Freddy-2': ['[HTML5]', '[JAVASCRIPT]', '[DOM]', '[WEB_GAME]'],
    'SaborDoBrasil': ['[HTML5]', '[CSS3]', '[RESPONSIVE]', '[SEMANTIC_WEB]']
  };

  // Gera tags técnicas reais ([TAG]) substituindo tags genéricas
  function getRepoTags(repo) {
    if (repo && repo.name && repoTechTags[repo.name]) {
      return repoTechTags[repo.name];
    }

    const tags = [];
    if (repo.language) {
      tags.push(`[${repo.language.toUpperCase()}]`);
    }

    const textToSearch = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();

    const techKeywords = [
      { key: 'java', tag: '[JAVA]' },
      { key: 'python', tag: '[PYTHON]' },
      { key: 'c#', tag: '[C#]' },
      { key: 'csharp', tag: '[C#]' },
      { key: 'javascript', tag: '[JAVASCRIPT]' },
      { key: 'react', tag: '[REACT]' },
      { key: 'vue', tag: '[VUE]' },
      { key: 'jquery', tag: '[JQUERY]' },
      { key: 'node', tag: '[NODE.JS]' },
      { key: 'spring', tag: '[SPRING]' },
      { key: 'django', tag: '[DJANGO]' },
      { key: 'postgres', tag: '[POSTGRESQL]' },
      { key: 'mysql', tag: '[MYSQL]' },
      { key: 'docker', tag: '[DOCKER]' },
      { key: 'linux', tag: '[LINUX]' },
      { key: 'bash', tag: '[BASH]' },
      { key: 'git', tag: '[GIT]' },
      { key: 'github', tag: '[GITHUB]' },
      { key: 'svg', tag: '[SVG]' },
      { key: 'figma', tag: '[FIGMA]' },
      { key: 'pypdf', tag: '[PYPDF]' },
      { key: 'regex', tag: '[REGEX]' },
      { key: 'automation', tag: '[AUTOMATION]' },
      { key: 'automação', tag: '[AUTOMATION]' },
      { key: 'localstorage', tag: '[LOCALSTORAGE]' },
      { key: 'dom', tag: '[DOM]' },
      { key: 'api', tag: '[REST_API]' },
      { key: 'sql', tag: '[SQL]' },
      { key: 'css', tag: '[CSS3]' },
      { key: 'html', tag: '[HTML5]' }
    ];

    techKeywords.forEach(({ key, tag }) => {
      if (tags.length < 4 && textToSearch.includes(key) && !tags.includes(tag)) {
        tags.push(tag);
      }
    });

    if (repo.topics && Array.isArray(repo.topics)) {
      repo.topics.forEach(t => {
        const customTag = `[${t.toUpperCase()}]`;
        if (tags.length < 4 && !tags.includes(customTag) && t !== 'clean_code' && t !== 'online') {
          tags.push(customTag);
        }
      });
    }

    if (tags.length < 2) {
      tags.push(repo.language === 'Python' ? '[CLI_TOOL]' : '[FRONTEND]');
    }

    return tags.slice(0, 4);
  }

  // Gera a janela ASCII padronizada com o ícone da desenvolvedora e status
  function generateAsciiPreview(repo, typeTag) {
    const pad = (s, l) => (s + ' '.repeat(l)).slice(0, l);
    const safeName = (repo.name || 'PROJECT').toUpperCase().slice(0, 22);
    const demoUrl = getRepoDemoUrl(repo);
    const safeLang = (repo.language || (typeTag === 'PYT' ? 'PYTHON' : 'FULLSTACK')).toUpperCase().slice(0, 14);
    const status = (demoUrl && demoUrl.trim() !== '') ? 'ONLINE' : 'PUBLIC';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;

    const l0 = '┌' + '─'.repeat(38) + '┐';
    const l1 = '│ ' + pad(`[${typeTag}] ${safeName}`, 36) + ' │';
    const l2 = '├' + '─'.repeat(38) + '┤';
    const l3 = '│   o   ' + pad(`STATUS: [${status}]`, 30) + ' │';
    const l4 = '│  /\\_/ ' + pad(`LANG: ${safeLang}`, 30) + ' │';
    const l5 = '│  I7|  ' + pad(`STARS: ${stars} | FORKS: ${forks}`, 30) + ' │';
    const l6 = '└' + '─'.repeat(38) + '┘';

    return `${l0}\n${l1}\n${l2}\n${l3}\n${l4}\n${l5}\n${l6}`;
  }

  function formatCardTopBar(idx, lang) {
    const num = String(idx + 1).padStart(2, '0');
    const labels = {
      pt: `PROJETO_${num}`,
      en: `PROJECT_${num}`,
      es: `PROYECTO_${num}`,
      fr: `PROJET_${num}`
    };
    const label = labels[lang] || `PROJETO_${num}`;
    const prefix = `+--[ ${label} ]`;
    const dashes = Math.max(2, 38 - prefix.length);
    return `${prefix}${'-'.repeat(dashes)}+`;
  }

  const repoDescriptions = {
    'Portfolio': {
      pt: 'Portfólio temático retrô minimalista com ASCII Art, Canvas 2D e terminal CLI interativo.',
      en: 'Retro minimalist ASCII art portfolio featuring an interactive CLI terminal and reactive 2D Canvas animations.',
      es: 'Portafolio retro minimalista con arte ASCII, terminal CLI interactivo y animaciones Canvas 2D.',
      fr: 'Portfolio rétro minimaliste avec art ASCII, terminal CLI interactif et animations Canvas 2D.'
    },
    'Portifolio': {
      pt: 'Portfólio temático retrô minimalista com ASCII Art, Canvas 2D e terminal CLI interativo.',
      en: 'Retro minimalist ASCII art portfolio featuring an interactive CLI terminal and reactive 2D Canvas animations.',
      es: 'Portafolio retro minimalista con arte ASCII, terminal CLI interactivo y animaciones Canvas 2D.',
      fr: 'Portfolio rétro minimaliste avec art ASCII, terminal CLI interactif et animations Canvas 2D.'
    },
    'viagem-flow': {
      en: 'Interactive travel management application with payment tracking and associated tasks, built purely with HTML, CSS (native Dark Mode), and JavaScript.',
      es: 'Aplicación interactiva de gestión de viajes, estado de pagos y tareas asociadas, construida puramente con HTML, CSS (con Modo Oscuro nativo) y JavaScript.',
      fr: 'Application interactive de gestion de voyages, suivi des paiements et tâches associées, conçue uniquement avec HTML, CSS (Mode Sombre natif) et JavaScript.'
    },
    'automacao-renomear-pdfs': {
      en: 'Python script for data extraction and automated renaming of PDFs using pypdf and Regular Expressions (Regex).',
      es: 'Script de Python para extracción de datos y renombrado automatizado de PDFs utilizando pypdf y Expresiones Regulares (Regex).',
      fr: 'Script Python pour l\'extraction de données et le renommage automatisé de fichiers PDF avec pypdf et Expressions Régulières (Regex).'
    },
    'Five-Night-s-at-Freddy-2': {
      en: 'Interactive web project recreating Five Nights at Freddy\'s 2 (FNAF 2) using HTML, CSS, and JavaScript technologies.',
      es: 'Proyecto interactivo para crear un sitio web del juego Five Nights at Freddy\'s 2 (FNAF 2) utilizando tecnologías HTML, CSS y JavaScript.',
      fr: 'Projet interactif de création d\'un site web du jeu Five Nights at Freddy\'s 2 (FNAF 2) en utilizando les technologies HTML, CSS et JavaScript.'
    },
    'SaborDoBrasil': {
      pt: 'Interface web gastronômica valorizando a culinária brasileira com design limpo.',
      en: 'Gastronomic web interface celebrating Brazilian cuisine with a clean and responsive design.',
      es: 'Interfaz web gastronómica que destaca la cocina brasileña con un diseño limpio y responsivo.',
      fr: 'Interface web gastronomique valorisant la cuisine brésilienne avec un design épuré et réactif.'
    }
  };

  // Mapeamento de screenshots e prints reais diretamente dos repositórios
  const repoRealPreviews = {
    'Portfolio': 'preview_portfolio.png',
    'Portifolio': 'preview_portfolio.png',
    'Five-Night-s-at-Freddy-2': 'https://raw.githubusercontent.com/VaporubDev/Five-Night-s-at-Freddy-2/main/Preview_fnaf2.jpeg',
    'SaborDoBrasil': 'https://raw.githubusercontent.com/VaporubDev/SaborDoBrasil/main/assets/Telas_SPA/index.png',
    'viagem-flow': 'https://raw.githubusercontent.com/VaporubDev/viagem-flow/master/plane_adventure.png'
  };

  const dynamicDescCache = {};

  async function translateDescAsync(repoName, text, targetLang) {
    const cacheKey = `${repoName}_${targetLang}`;
    if (dynamicDescCache[cacheKey] || !text) return;
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|${targetLang}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.responseData && data.responseData.translatedText) {
          const translated = data.responseData.translatedText;
          dynamicDescCache[cacheKey] = translated;
          if (currentLang === targetLang) {
            const cardEl = document.querySelector(`.project-ascii-card[data-repo-name="${repoName}"] .proj-desc`);
            if (cardEl) {
              cardEl.textContent = translated;
            }
          }
        }
      }
    } catch (e) {}
  }

  function getRepoDescription(repo, lang) {
    const t = translations[lang] || translations.pt;
    const rawDesc = (repo.description || '').trim();
    if (lang === 'pt') {
      return rawDesc || repoDescriptions[repo.name]?.pt || t.proj_fallback_desc || 'Repositório público disponível no GitHub.';
    }

    if (repoDescriptions[repo.name] && repoDescriptions[repo.name][lang]) {
      return repoDescriptions[repo.name][lang];
    }
    const cacheKey = `${repo.name}_${lang}`;
    if (dynamicDescCache[cacheKey]) {
      return dynamicDescCache[cacheKey];
    }
    if (!rawDesc) {
      return t.proj_fallback_desc || 'Repositório público disponível no GitHub.';
    }
    translateDescAsync(repo.name, rawDesc, lang);
    return rawDesc;
  }

  function renderProjectCards(repos) {
    if (!projectsGrid || !repos || repos.length === 0) return;
    const t = translations[currentLang] || translations.pt;

    const cardsHtml = repos.map((repo, idx) => {
      const isSite = isWebsiteRepo(repo);
      const category = getRepoCategory(repo);
      const topBar = formatCardTopBar(idx, currentLang);
      const isScript = category.includes('scripts');
      const isUiFilter = currentProjectFilter === 'ui' && category.includes('ui');
      const typeTag = isUiFilter ? 'UI' : (isScript ? (repo.language ? repo.language.toUpperCase().slice(0, 3) : 'CLI') : (repo.language ? repo.language.toUpperCase().slice(0, 3) : 'WEB'));
      const asciiPreview = generateAsciiPreview(repo, typeTag);
      const title = `&gt; ${escapeHtml(repo.name)}`;
      const desc = escapeHtml(getRepoDescription(repo, currentLang));
      const tags = getRepoTags(repo).map(tag => `<span class="ptag">${escapeHtml(tag)}</span>`).join('\n              ');

      const figmaLink = (repo.figma_url || (repo.homepage && repo.homepage.includes('figma.com') ? repo.homepage : '') || (repo.demo_url && repo.demo_url.includes('figma.com') ? repo.demo_url : '')).trim();
      const webDemo = (repo.demo_url && !repo.demo_url.includes('figma.com') ? repo.demo_url : '').trim();

      const activeDemoUrl = (currentProjectFilter === 'ui' && figmaLink) ? figmaLink : (webDemo || figmaLink);
      const isFigma = activeDemoUrl.includes('figma.com');
      const hasDemo = activeDemoUrl && activeDemoUrl.trim() !== '';
      const demoBtnText = isFigma ? (t.proj2_figma || '[➔ VER NO FIGMA]') : (t.proj1_demo || '[► VER DEMO]');
      const demoBtn = hasDemo
        ? `<a href="${escapeHtml(activeDemoUrl)}" target="_blank" rel="noopener noreferrer" class="ascii-btn ascii-btn-sm ascii-btn-highlight" data-i18n-role="demo">${demoBtnText}</a>`
        : `<span class="ascii-btn ascii-btn-sm" style="opacity: 0.45; cursor: not-allowed;" title="${t.proj_no_demo_tip || 'Deploy não cadastrado no repositório'}" data-i18n-role="demo">${t.proj1_demo || '[► VER DEMO]'}</span>`;

      const repoBtn = `<a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="ascii-btn ascii-btn-sm" data-i18n-role="repo">${t.proj1_repo || '[➔ REPOSITÓRIO]'}</a>`;
      const previewImg = repo.preview_image || repoRealPreviews[repo.name] || '';

      return `
        <!-- GitHub Project Card ${idx + 1} -->
        <div class="project-ascii-card" data-category="${category}" data-repo-name="${escapeHtml(repo.name)}" data-language="${escapeHtml(repo.language || '')}" data-is-site="${isSite ? 'true' : 'false'}" data-has-demo="${hasDemo ? 'true' : 'false'}" data-preview-image="${escapeHtml(previewImg)}">
          <div class="card-bar-top">${topBar}</div>
          <div class="card-ascii-content">
            <div class="project-ascii-preview">
<pre>
${asciiPreview}
</pre>
            </div>
            <h3 class="proj-name">${title}</h3>
            <p class="proj-desc">${desc}</p>
            <div class="proj-tags">
              ${tags}
            </div>
            <div class="proj-actions">
              ${demoBtn}
              ${repoBtn}
            </div>
          </div>
          <div class="card-bar-bottom">+-------------------------------------+</div>
        </div>`;
    }).join('\n');

    projectsGrid.innerHTML = cardsHtml;
    applyProjectFilter(currentProjectFilter);
  }

  function showProjectsLoading() {
    if (!projectsGrid) return;
    const t = translations[currentLang] || translations.pt;
    projectsGrid.innerHTML = `
      <div class="project-ascii-card" style="opacity: 0.85;">
        <div class="card-bar-top">+--[ GITHUB_SYNC ]--------------------+</div>
        <div class="card-ascii-content">
          <div class="project-ascii-preview">
<pre>
┌──────────────────────────────────────┐
│ [GITHUB API] SYNCING...              │
├──────────────────────────────────────┤
│   o   STATUS: [CONNECTING]           │
│  /\_/ SYNC: BUSCANDO REPOS...        │
│  I7|  AGUARDE UM INSTANTE...         │
└──────────────────────────────────────┘
</pre>
          </div>
          <h3 class="proj-name">${t.proj_loading_title || '&gt; Sincronizando com GitHub...'}</h3>
          <p class="proj-desc">${t.proj_loading_desc || 'Buscando os repositórios públicos mais recentes diretamente da API...'}</p>
          <div class="proj-tags">
            <span class="ptag">[FETCHING]</span>
            <span class="ptag">[GITHUB_API]</span>
          </div>
          <div class="proj-actions">
            <span class="ascii-btn ascii-btn-sm" style="opacity: 0.5; pointer-events: none;">[ AGUARDE ]</span>
          </div>
        </div>
        <div class="card-bar-bottom">+-------------------------------------+</div>
      </div>
    `;
  }

  function applyProjectFilter(filter) {
    currentProjectFilter = filter;
    const cards = document.querySelectorAll('.project-ascii-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-category') || 'web';
      if (filter === 'all' || cat.includes(filter)) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      currentProjectFilter = filter;
      if (cachedGithubRepos && cachedGithubRepos.length > 0) {
        renderProjectCards(cachedGithubRepos);
      } else {
        applyProjectFilter(filter);
      }
    });
  });

  async function findLinksInReadme(repoName, defaultBranch = 'main') {
    const branches = [defaultBranch, 'main', 'master'];
    for (const b of Array.from(new Set(branches))) {
      try {
        const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${b}/README.md`;
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          let figmaUrl = '';
          let webDemoUrl = '';
          let previewImageUrl = '';

          const figmaMatch = text.match(/https?:\/\/(www\.)?figma\.com\/(design|proto|file)\/[^\s\)\"\'\`]+/i);
          if (figmaMatch) {
            figmaUrl = figmaMatch[0].trim();
          }
          const match = text.match(/https?:\/\/[a-zA-Z0-9_\-.]+\.github\.io\/[^\s\)\"\'\`]+/i);
          if (match) {
            webDemoUrl = match[0].trim().replace('vaporubberg.github.io', 'vaporubdev.github.io');
          }

          // Extração automática de print/GIF real do projeto diretamente do README do repositório
          const imgHtmlMatch = text.match(/<img[^>]+src=["']([^"']+)["']/i);
          const imgMdMatch = text.match(/!\[.*?\]\(([^)\s]+)\)/i);
          const rawImg = (imgHtmlMatch ? imgHtmlMatch[1] : (imgMdMatch ? imgMdMatch[1] : '')).trim();

          if (rawImg) {
            if (rawImg.startsWith('http://') || rawImg.startsWith('https://')) {
              previewImageUrl = rawImg;
            } else {
              const cleanPath = rawImg.replace(/^\.?\//, '');
              previewImageUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${b}/${cleanPath}`;
            }
          }

          return { figmaUrl, webDemoUrl, previewImageUrl };
        }
      } catch (e) {}
    }
    return { figmaUrl: '', webDemoUrl: '', previewImageUrl: '' };
  }

  async function fetchGithubProjects() {
    const cacheKey = `github_repos_v12_${GITHUB_USERNAME}`;

    try {
      const stored = sessionStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedGithubRepos = parsed;
        window.cachedGithubRepos = parsed;
          renderProjectCards(cachedGithubRepos);
          return;
        }
      }
    } catch (e) {
      console.warn('Erro ao ler cache de repos:', e);
    }

    showProjectsLoading();

    try {
      const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`GitHub API HTTP ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('Resposta inválida do GitHub');
      }

      let filtered = data.filter(r => !r.fork && r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase());
      if (filtered.length === 0) {
        filtered = data.filter(r => !r.fork);
      }
      if (filtered.length === 0) {
        filtered = data;
      }

      const formattedRepos = await Promise.all(filtered.map(async r => {
        const rawHomepage = (r.homepage || '').trim();
        const { figmaUrl, webDemoUrl, previewImageUrl } = await findLinksInReadme(r.name, r.default_branch || 'main');

        let figmaLink = '';
        if (rawHomepage.includes('figma.com')) {
          figmaLink = rawHomepage;
        } else if (figmaUrl) {
          figmaLink = figmaUrl;
        }

        let demoUrl = '';
        if (webDemoUrl) {
          demoUrl = webDemoUrl;
        } else if (rawHomepage.includes('github.io')) {
          demoUrl = rawHomepage.replace('vaporubberg.github.io', 'vaporubdev.github.io');
        } else if (figmaLink) {
          demoUrl = figmaLink;
        }

        const previewImg = previewImageUrl || repoRealPreviews[r.name] || '';

        return {
          ...r,
          demo_url: demoUrl,
          figma_url: figmaLink,
          homepage: rawHomepage || demoUrl,
          preview_image: previewImg
        };
      }));

      cachedGithubRepos = formattedRepos;
      window.cachedGithubRepos = formattedRepos;
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(formattedRepos));
      } catch (e) {}

      renderProjectCards(cachedGithubRepos);
    } catch (err) {
      console.warn('[GitHub Projects API] Erro ao carregar repositórios:', err);
      const fallbackRepos = [
        {
          name: 'Portfolio',
          description: 'Portfólio temático retrô minimalista com ASCII Art, Canvas 2D e terminal CLI interativo.',
          language: 'JavaScript',
          demo_url: 'https://vaporubdev.github.io/Portfolio/',
          homepage: 'https://vaporubdev.github.io/Portfolio/',
          figma_url: '',
          preview_image: 'preview_portfolio.png',
          html_url: 'https://github.com/VaporubDev/Portfolio',
          topics: ['portfolio', 'ascii', 'terminal', 'retro', 'canvas', 'web'],
          stargazers_count: 0,
          forks_count: 0
        },
        {
          name: 'Five-Night-s-at-Freddy-2',
          description: 'Jogo interativo Five Nights at Freddy\'s 2 adaptado para web com tema retrô.',
          language: 'HTML',
          demo_url: 'https://vaporubdev.github.io/Five-Night-s-at-Freddy-2/',
          homepage: 'https://vaporubdev.github.io/Five-Night-s-at-Freddy-2/',
          figma_url: '',
          preview_image: 'https://raw.githubusercontent.com/VaporubDev/Five-Night-s-at-Freddy-2/main/Preview_fnaf2.jpeg',
          html_url: 'https://github.com/VaporubDev/Five-Night-s-at-Freddy-2',
          topics: ['game', 'fnaf'],
          stargazers_count: 0,
          forks_count: 0
        },
        {
          name: 'viagem-flow',
          description: 'Sistema web para planejamento e fluxo intuitivo de viagens com interface responsiva.',
          language: 'JavaScript',
          demo_url: 'https://vaporubdev.github.io/viagem-flow/',
          homepage: 'https://vaporubdev.github.io/viagem-flow/',
          figma_url: 'https://www.figma.com/design/oafKYaI5IKfEznTb2JGFMu/Untitled?node-id=0-1&t=pLJVHSvxAs1nrbm8-1',
          preview_image: 'https://raw.githubusercontent.com/VaporubDev/viagem-flow/master/plane_adventure.png',
          html_url: 'https://github.com/VaporubDev/viagem-flow',
          topics: ['travel', 'flow', 'figma'],
          stargazers_count: 0,
          forks_count: 0
        },
        {
          name: 'SaborDoBrasil',
          description: 'Interface web gastronômica valorizando a culinária brasileira com design limpo.',
          language: 'HTML',
          demo_url: '',
          homepage: '',
          figma_url: '',
          preview_image: 'https://raw.githubusercontent.com/VaporubDev/SaborDoBrasil/main/assets/Telas_SPA/index.png',
          html_url: 'https://github.com/VaporubDev/SaborDoBrasil',
          topics: ['web', 'landing'],
          stargazers_count: 0,
          forks_count: 0
        },
        {
          name: 'automacao-renomear-pdfs',
          description: 'Script utilitário em Python para automação de tarefas e organização de arquivos PDF.',
          language: 'Python',
          demo_url: '',
          homepage: '',
          figma_url: '',
          preview_image: '',
          html_url: 'https://github.com/VaporubDev/automacao-renomear-pdfs',
          topics: ['python', 'automation'],
          stargazers_count: 0,
          forks_count: 0
        }
      ];

      cachedGithubRepos = fallbackRepos;
      window.cachedGithubRepos = fallbackRepos;
      renderProjectCards(cachedGithubRepos);
    }
  }

  fetchGithubProjects();

  // Controle do preview flutuante (popover) ao passar o mouse
  const popover = document.getElementById('project-preview-popover');
  const popoverTitle = document.getElementById('popover-title');
  const popoverImg = document.getElementById('popover-img');
  const popoverSpinner = document.getElementById('popover-spinner');
  const popoverCli = document.getElementById('popover-cli');
  const popoverCaption = document.getElementById('popover-caption');
  const popoverBadge = document.getElementById('popover-badge') || popover?.querySelector('.popover-badge');
  const popoverTag = document.getElementById('popover-tag') || popover?.querySelector('.popover-tag');

  function showProjectPreview(triggerEl) {
    if (!popover) return;
    const card = triggerEl.closest('.project-ascii-card');
    if (!card) return;

    const repoName = card.getAttribute('data-repo-name') || card.querySelector('.proj-name')?.textContent.replace(/^>\s*/, '').trim() || 'PROJETO';
    const previewImgUrl = card.getAttribute('data-preview-image') || repoRealPreviews[repoName] || '';
    const isSite = card.getAttribute('data-is-site') === 'true';
    const lang = (card.getAttribute('data-language') || '').toLowerCase();

    if (popoverTitle) popoverTitle.textContent = `+--[ PREVIEW: ${repoName.toUpperCase().slice(0, 18)} ]`;

    // Função interna para renderizar o estado de loading / aguardando informações adicionais para sites
    function renderSiteLoadingState() {
      if (popoverImg) popoverImg.style.display = 'none';
      if (popoverSpinner) popoverSpinner.style.display = 'none';
      if (popoverBadge) popoverBadge.textContent = '[ LOADING ]';
      if (popoverTag) popoverTag.textContent = '[ AGUARDANDO DADOS ]';
      if (popoverCaption) popoverCaption.textContent = `> ${repoName} (aguardando informações adicionais)`;
      if (popoverCli) {
        popoverCli.style.display = 'block';
        popoverCli.textContent = `┌────────────────────────────────────┐\n│ [WEB INTERFACE] SYNC PENDENTE...   │\n├────────────────────────────────────┤\n│   o   STATUS: [AGUARDANDO DADOS]   │\n│  /\\_/ DEPLOY: GITHUB.IO OU PRINT   │\n│  I7|  CARREGANDO INFORMAÇÕES...    │\n└────────────────────────────────────┘\n> Aguardando deploy ou print no README`;
      }
    }

    // Se é claramente um site (tem HTML/CSS, deploy ou interface web)
    if (isSite) {
      if (previewImgUrl) {
        if (popoverCli) popoverCli.style.display = 'none';
        if (popoverBadge) popoverBadge.textContent = '[ REAL_UI ]';
        if (popoverTag) popoverTag.textContent = '[ ASSET REAL ]';
        if (popoverCaption) popoverCaption.textContent = `> ${repoName} (print real do projeto)`;
        if (popoverSpinner) {
          popoverSpinner.style.display = 'block';
          popoverSpinner.textContent = '[ CARREGANDO INTERFACE... ]';
        }
        if (popoverImg) {
          popoverImg.classList.remove('loaded');
          popoverImg.style.display = 'block';
          popoverImg.src = previewImgUrl;
          popoverImg.onload = () => {
            if (popoverSpinner) popoverSpinner.style.display = 'none';
            popoverImg.classList.add('loaded');
          };
          popoverImg.onerror = () => {
            // Se a imagem falhar ao carregar, exibe o estado de loading aguardando dados
            renderSiteLoadingState();
          };
        }
      } else {
        // Site sem imagem ou sem link do github.io: exibe loading aguardando informações adicionais
        renderSiteLoadingState();
      }
    } else {
      // Repositório de automação e script (C#, JS puro, Python, Shell)
      if (popoverImg) popoverImg.style.display = 'none';
      if (popoverSpinner) popoverSpinner.style.display = 'none';
      if (popoverBadge) popoverBadge.textContent = '[ SCRIPT ]';
      if (popoverTag) popoverTag.textContent = '[ AUTOMATION ]';
      if (popoverCaption) popoverCaption.textContent = `> ${repoName} (script de automação)`;

      if (popoverCli) {
        popoverCli.style.display = 'block';
        if (lang === 'c#' || lang === 'csharp') {
          popoverCli.textContent = `> dotnet run --project Automation.csproj\n[BUILD] Compilando rotinas C#... [OK]\n[EXEC] Executando serviço em segundo plano...\n[TASK] Processando registros de automação...\n[STATUS] Rotina finalizada com sucesso!`;
        } else if (lang === 'javascript' || lang === 'node') {
          popoverCli.textContent = `> node index.js\n[INIT] Inicializando script de automação...\n[RUN] Processando pipelines assíncronos...\n[DATA] Validação de dados concluída...\n[STATUS] Script finalizado com sucesso!`;
        } else if (lang === 'shell' || lang === 'bash') {
          popoverCli.textContent = `> ./automation.sh\n[BASH] Iniciando script de automação...\n[CRON] Processando rotina em lote...\n[STATUS] Execução concluída com código 0.`;
        } else {
          popoverCli.textContent = `> python renomear.py\n[SCAN] Varrendo pasta de comprovantes...\n[EXTRACT] Lendo PDFs com pypdf...\n[REGEX] Favorecido identificado:\n        "MARIA SILVA SANTOS"\n[RENAME] -> 2026_02_MARIA_SILVA.pdf [OK]\n[STATUS] 142 arquivos renomeados com sucesso!`;
        }
      }
    }

    positionPopover(triggerEl);
    popover.classList.add('visible');
    popover.setAttribute('aria-hidden', 'false');
  }

  function hideProjectPreview() {
    if (!popover) return;
    popover.classList.remove('visible');
    popover.setAttribute('aria-hidden', 'true');
  }

  function positionPopover(targetEl) {
    if (!popover) return;
    const rect = targetEl.getBoundingClientRect();
    const popoverWidth = 320;
    const popoverHeight = 240;

    let left = rect.left + (rect.width / 2) - (popoverWidth / 2);
    left = Math.max(16, Math.min(left, window.innerWidth - popoverWidth - 16));

    let top = rect.top - popoverHeight - 12;
    if (top < 16) {
      top = rect.bottom + 12;
    }

    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
  }

  if (projectsGrid) {
    projectsGrid.addEventListener('mouseover', (e) => {
      const trigger = e.target.closest('.proj-name, [data-i18n-role="demo"], [data-i18n$="_demo"], [data-i18n$="_figma"], [data-i18n$="_app"]');
      if (trigger) {
        showProjectPreview(trigger);
      }
    });

    projectsGrid.addEventListener('mouseout', (e) => {
      const trigger = e.target.closest('.proj-name, [data-i18n-role="demo"], [data-i18n$="_demo"], [data-i18n$="_figma"], [data-i18n$="_app"]');
      if (trigger) {
        hideProjectPreview();
      }
    });
  }


  window.renderProjectCards = renderProjectCards;
});

