document.addEventListener('DOMContentLoaded', () => {
  // Terminal interativo CLI
  const termInput = document.getElementById('terminal-input');
  const termHistory = document.getElementById('terminal-history');
  const termScreen = document.getElementById('terminal-screen');

  function getTerminalCommands() {
    const t = translations[currentLang] || translations.pt;
    return {
      help: `[ COMANDOS DISPONÍVEIS // AVAILABLE COMMANDS ]
  help       - ${currentLang === 'pt' ? 'Exibe esta lista de comandos' : currentLang === 'es' ? 'Muestra la lista de comandos' : currentLang === 'fr' ? 'Affiche la liste des commandes' : 'Shows available commands list'}
  icon       - ${currentLang === 'pt' ? 'Renderiza a arte ASCII da foto' : currentLang === 'es' ? 'Renderiza el arte ASCII' : currentLang === 'fr' ? 'Affiche le personnage ASCII' : 'Renders the ASCII figure'}
  about      - ${currentLang === 'pt' ? 'Informações sobre Érica Paixão' : currentLang === 'es' ? 'Información sobre Érica Paixão' : currentLang === 'fr' ? 'À propos d\'Érica Paixão' : 'About Érica Paixão'}
  skills     - ${currentLang === 'pt' ? 'Lista completa de habilidades' : currentLang === 'es' ? 'Lista de habilidades' : currentLang === 'fr' ? 'Compétences techniques' : 'Technical skills'}
  projects   - ${currentLang === 'pt' ? 'Resumo dos projetos' : currentLang === 'es' ? 'Resumen de proyectos' : currentLang === 'fr' ? 'Liste des projets' : 'Projects list'}
  contact    - ${currentLang === 'pt' ? 'Canais de comunicação direta' : currentLang === 'es' ? 'Canales de contacto' : currentLang === 'fr' ? 'Informations de contact' : 'Direct contact channels'}
  theme      - ${currentLang === 'pt' ? 'Alterna entre Modo Claro e Escuro' : currentLang === 'es' ? 'Alterna entre Modo Claro y Oscuro' : currentLang === 'fr' ? 'Bascule Mode Clair et Sombre' : 'Toggles Light and Dark Mode'}
  clear      - ${currentLang === 'pt' ? 'Limpa o histórico deste terminal' : currentLang === 'es' ? 'Limpia el terminal' : currentLang === 'fr' ? 'Efface le terminal' : 'Clears terminal history'}`,

      icon: ` o   
/\\_/  [ ASCII DEVELOPER // HARDWORKING ]
I7|   Workstation, screen & clean code.`,

      about: `[ ÉRICA PAIXÃO // FULLSTACK DEVELOPER & UI/UX DESIGNER ]
  ${t.hero_desc}
  Linguagens: Java, Python, C#, JavaScript, HTML5, CSS3, Bash, SVG.
  Frameworks & Libs: Spring Boot, Node.js, Django, React, Vue, jQuery.
  Bancos & Infra: PostgreSQL, MySQL, Docker, Linux, Git, GitHub.
  Design: Figma, Design Systems.`,

      skills: `[ TECHNICAL SKILLS // FULLSTACK ]
  > FRONTEND / JS, REACT, VUE, JQUERY, HTML5, CSS3, SVG   ${t.skill_bar_1}
  > BACKEND / JAVA, PYTHON, C#, NODE.JS, SPRING, DJANGO   ${t.skill_bar_2}
  > BASES DE DADOS / POSTGRESQL, MYSQL & SQL              ${t.skill_bar_3}
  > DEVOPS & INFRA / DOCKER, LINUX, BASH, GIT & GITHUB    ${t.skill_bar_4}
  > APIS RESTFUL & ARQUITETURA                            ${t.skill_bar_5}
  > UI/UX DESIGN / FIGMA & SVG                            ${t.skill_bar_6}`,

      projects: () => {
        const repos = window.cachedGithubRepos || (typeof cachedGithubRepos !== 'undefined' ? cachedGithubRepos : null);
        if (repos && repos.length > 0) {
          const list = repos.map((r, i) => {
            const demo = (typeof window.getRepoDemoUrl === 'function' ? window.getRepoDemoUrl(r) : (typeof getRepoDemoUrl === 'function' ? getRepoDemoUrl(r) : (r.demo_url || r.homepage || '')));
            return `  ${String(i + 1).padStart(2, '0')}. > ${r.name} [${(r.language || 'FULLSTACK').toUpperCase()}]\n      Repo: ${r.html_url}${demo ? '\n      Demo: ' + demo : ''}`;
          }).join('\n\n');
          return `[ REPOSITÓRIOS GITHUB // @${GITHUB_USERNAME} ]\n\n${list}`;
        }
        return `[ REPOSITÓRIOS GITHUB ]\n  01. viagem-flow\n  02. automacao-renomear-pdfs\n  03. Five-Night-s-at-Freddy-2`;
      },

      contact: `[ CONTACT ]
  Email: florserena.epg203@gmail.com
  GitHub: https://github.com/VaporubDev
  Linkedin: https://www.linkedin.com/in/erica-paixao-gois/
  Instagram: https://www.instagram.com/ericaa_dev`,

      theme: () => {
        const curr = window.currentTheme || (typeof currentTheme !== 'undefined' ? currentTheme : 'dark');
        const next = curr === 'dark' ? 'light' : 'dark';
        if (typeof applyTheme === 'function') { applyTheme(next); } else if (typeof window.applyTheme === 'function') { window.applyTheme(next); }
        return `[ ${next === 'dark' ? 'MODO ESCURO / DARK MODE' : 'MODO CLARO / LIGHT MODE'} ]`;
      },

      clear: () => {
        if (termHistory) termHistory.innerHTML = '';
        return '';
      }
    };
  }

  if (termInput) {
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
