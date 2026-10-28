document.addEventListener('DOMContentLoaded', () => {
  // Terminal interativo CLI
  const termInput = document.getElementById('terminal-input');
  const termHistory = document.getElementById('terminal-history');
  const termScreen = document.getElementById('terminal-screen');

  function getTerminalCommands() {
    const lang = window.currentLang || (typeof currentLang !== 'undefined' ? currentLang : 'pt');
    const t = translations[lang] || translations.pt;

    const helpHeaders = {
      pt: '[ COMANDOS DISPONÍVEIS ]',
      en: '[ AVAILABLE COMMANDS ]',
      es: '[ COMANDOS DISPONIBLES ]',
      fr: '[ COMMANDES DISPONIBLES ]'
    };
    const helpItems = {
      pt: [
        '  help     - Exibe lista de comandos',
        '  icon     - Renderiza arte ASCII',
        '  about    - Sobre Érica Paixão',
        '  skills   - Stack e habilidades',
        '  projects - Resumo de projetos',
        '  contact  - Canais de contato',
        '  theme    - Alterna Modo Claro/Escuro',
        '  clear    - Limpa o terminal'
      ],
      en: [
        '  help     - Shows available commands',
        '  icon     - Renders ASCII art figure',
        '  about    - About Érica Paixão',
        '  skills   - Skills and tech stack',
        '  projects - Featured projects summary',
        '  contact  - Direct contact links',
        '  theme    - Toggles Light/Dark mode',
        '  clear    - Clears terminal history'
      ],
      es: [
        '  help     - Muestra lista de comandos',
        '  icon     - Renderiza arte ASCII',
        '  about    - Sobre Érica Paixão',
        '  skills   - Habilidades y tecnologías',
        '  projects - Resumen de proyectos',
        '  contact  - Canales de contacto',
        '  theme    - Cambia Modo Claro/Oscuro',
        '  clear    - Limpia la terminal'
      ],
      fr: [
        '  help     - Liste des commandes',
        '  icon     - Affiche l\'art ASCII',
        '  about    - À propos d\'Érica Paixão',
        '  skills   - Compétences techniques',
        '  projects - Résumé des projets',
        '  contact  - Canaux de contact',
        '  theme    - Bascule Mode Clair/Sombre',
        '  clear    - Efface le terminal'
      ]
    };

    const header = helpHeaders[lang] || helpHeaders.pt;
    const items = helpItems[lang] || helpItems.pt;

    const aboutHeaders = {
      pt: '[ ÉRICA PAIXÃO // DESENVOLVEDORA FULLSTACK & UI DESIGNER ]',
      en: '[ ÉRICA PAIXÃO // FULLSTACK DEVELOPER & UI DESIGNER ]',
      es: '[ ÉRICA PAIXÃO // DESARROLLADORA FULLSTACK & UI DESIGNER ]',
      fr: '[ ÉRICA PAIXÃO // DÉVELOPPEUSE FULLSTACK & UI DESIGNER ]'
    };

    const aboutDetails = {
      pt: `  Linguagens: Java, Python, C#, JavaScript, HTML5, CSS3, Bash, SVG.\n  Frameworks & Libs: Spring Boot, Node.js, Django, React, Vue, jQuery.\n  Bancos & Infra: PostgreSQL, MySQL, Docker, Linux, Git, GitHub.\n  Design: Figma, Design Systems.`,
      en: `  Languages: Java, Python, C#, JavaScript, HTML5, CSS3, Bash, SVG.\n  Frameworks & Libs: Spring Boot, Node.js, Django, React, Vue, jQuery.\n  Databases & Infra: PostgreSQL, MySQL, Docker, Linux, Git, GitHub.\n  Design: Figma, Design Systems.`,
      es: `  Lenguajes: Java, Python, C#, JavaScript, HTML5, CSS3, Bash, SVG.\n  Frameworks y Libs: Spring Boot, Node.js, Django, React, Vue, jQuery.\n  Bases de datos e Infra: PostgreSQL, MySQL, Docker, Linux, Git, GitHub.\n  Diseño: Figma, Design Systems.`,
      fr: `  Langages: Java, Python, C#, JavaScript, HTML5, CSS3, Bash, SVG.\n  Frameworks & Libs: Spring Boot, Node.js, Django, React, Vue, jQuery.\n  Bases de données & Infra: PostgreSQL, MySQL, Docker, Linux, Git, GitHub.\n  Design: Figma, Design Systems.`
    };

    const contactHeaders = {
      pt: '[ CANAIS DE CONTATO OFICIAIS ]',
      en: '[ OFFICIAL CONTACT CHANNELS ]',
      es: '[ CANALES OFICIALES DE CONTACTO ]',
      fr: '[ CANAUX OFFICIELS DE CONTACT ]'
    };

    const contactPhoneLbl = {
      pt: 'Telefone/WhatsApp',
      en: 'Phone/WhatsApp',
      es: 'Teléfono/WhatsApp',
      fr: 'Téléphone/WhatsApp'
    };

    return {
      help: `${header}\n${items.join('\n')}`,

      icon: ` o   
/\\_/  [ ASCII DEVELOPER // HARDWORKING ]
I7|   Workstation, screen & clean code.`,

      about: `${aboutHeaders[lang] || aboutHeaders.pt}\n  ${t.hero_desc}\n${aboutDetails[lang] || aboutDetails.pt}`,

      skills: `[ TECHNICAL SKILLS // FULLSTACK ]
  > FRONTEND & UI     : HTML5, CSS3, JavaScript (ES6+), React, Vue, jQuery, Canvas 2D
  > BACKEND & APIS    : Python, Java, C#, Node.js, Spring Boot, Django, RESTful APIs
  > BANCOS DE DADOS   : PostgreSQL, MySQL, SQL ANSI, Modelagem Relacional
  > DEVOPS & INFRA    : Git, GitHub, Docker, Linux (Ubuntu/Debian), Bash / Shell
  > UI/UX DESIGN      : Figma, Design Systems, Auto Layout, Wireframing, SVG`,

      projects: () => {
        const repos = window.cachedGithubRepos || (typeof cachedGithubRepos !== 'undefined' ? cachedGithubRepos : null);
        const title = lang === 'en' ? '[ GITHUB REPOSITORIES // @VaporubDev ]' : lang === 'es' ? '[ REPOSITORIOS GITHUB // @VaporubDev ]' : lang === 'fr' ? '[ DÉPÔTS GITHUB // @VaporubDev ]' : '[ REPOSITÓRIOS GITHUB // @VaporubDev ]';
        if (repos && repos.length > 0) {
          const list = repos.map((r, i) => {
            const demo = (typeof window.getRepoDemoUrl === 'function' ? window.getRepoDemoUrl(r) : (typeof getRepoDemoUrl === 'function' ? getRepoDemoUrl(r) : (r.demo_url || r.homepage || '')));
            return `  ${String(i + 1).padStart(2, '0')}. > ${r.name} [${(r.language || 'FULLSTACK').toUpperCase()}]\n      Repo: ${r.html_url}${demo ? '\n      Demo: ' + demo : ''}`;
          }).join('\n\n');
          return `${title}\n\n${list}`;
        }
        return `${title}\n  01. viagem-flow\n  02. automacao-renomear-pdfs\n  03. Five-Night-s-at-Freddy-2`;
      },

      contact: `${contactHeaders[lang] || contactHeaders.pt}
  ${contactPhoneLbl[lang] || 'Telefone/WhatsApp'}: +55 (71) 98727-4921
  Email: florserena.epg203@gmail.com
  GitHub: https://github.com/VaporubDev
  Linkedin: https://www.linkedin.com/in/erica-paixao-gois/
  Instagram: https://www.instagram.com/ericaa_dev`,

      theme: () => {
        const curr = window.currentTheme || (typeof currentTheme !== 'undefined' ? currentTheme : 'dark');
        const next = curr === 'dark' ? 'light' : 'dark';
        if (typeof applyTheme === 'function') { applyTheme(next); } else if (typeof window.applyTheme === 'function') { window.applyTheme(next); }
        if (lang === 'en') return `[ ${next === 'dark' ? 'DARK MODE ACTIVATED' : 'LIGHT MODE ACTIVATED'} ]`;
        if (lang === 'es') return `[ ${next === 'dark' ? 'MODO OSCURO ACTIVADO' : 'MODO CLARO ACTIVADO'} ]`;
        if (lang === 'fr') return `[ ${next === 'dark' ? 'MODE SOMBRE ACTIVÉ' : 'MODE CLAIR ACTIVÉ'} ]`;
        return `[ ${next === 'dark' ? 'MODO ESCURO ATIVADO' : 'MODO CLARO ATIVADO'} ]`;
      },

      clear: () => {
        if (termHistory) termHistory.innerHTML = '';
        return '';
      }
    };
  }

  if (termInput) {
    if (termScreen) {
      termScreen.addEventListener('click', () => {
        termInput.focus();
      });
    }

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim();
        const cmd = rawCmd.toLowerCase();
        termInput.value = '';

        if (!cmd) return;

        const cmdRow = document.createElement('div');
        cmdRow.className = 'term-cmd-row';
        cmdRow.innerHTML = `<span class="cli-prompt">visitor@ascii-portfolio:~$</span> <span>${rawCmd}</span>`;
        termHistory.appendChild(cmdRow);

        const currentCommands = getTerminalCommands();
        let output = '';
        if (currentCommands[cmd]) {
          if (typeof currentCommands[cmd] === 'function') {
            output = currentCommands[cmd]();
          } else {
            output = currentCommands[cmd];
          }
        } else if (cmd.startsWith('cat ')) {
          const target = cmd.slice(4).trim();
          if (target === 'info.json' || target === 'info') {
            if (window.AsciiBackgroundEngine) {
              window.AsciiBackgroundEngine.setCatSpeech("MEOW! ^_^");
              window.AsciiBackgroundEngine.triggerBlink();
            }
            const nameKey = currentLang === 'en' ? 'name' : currentLang === 'es' ? 'nombre' : currentLang === 'fr' ? 'nom' : 'nome';
            output = `{\n  "${nameKey}": "Érica Paixão",\n  "stack": ["Java", "Python", "C#", "JavaScript", "HTML5", "CSS3", "Bash", "Spring Boot", "Node.js", "Django", "React", "Vue", "jQuery", "PostgreSQL", "MySQL", "Linux", "Git", "GitHub", "Docker", "SVG", "Figma"],\n  "tema": "ASCII Minimalist",\n  "status": "Ready for Work",\n  "ascii_cat": "Active in background"\n}`;
          } else {
            output = `cat: ${target}: No such file or directory. Try 'cat info.json' or 'cat'`;
          }
        } else {
          output = `Command not recognized: '${rawCmd}'. Type 'help' for available commands.`;
        }

        if (cmd !== 'clear' && output) {
          const outEl = document.createElement('div');
          outEl.className = 'term-output';
          outEl.textContent = output;
          termHistory.appendChild(outEl);
        }

        if (termScreen) {
          termScreen.scrollTop = termScreen.scrollHeight;
        }
      }
    });
  }
});
