# 🖥️ Érica Paixão // Portfólio ASCII & Terminal Interativo

> Portfólio temático retrô minimalista construído puramente com caracteres monoespaçados (ASCII), Vanilla JavaScript, animações em Canvas 2D e integração dinâmica com a API do GitHub.

🔗 **[Acesse o Portfólio Online](https://vaporubdev.github.io/Portfolio/)**

<video src="preview_portfolio.mp4" controls="controls" width="100%" muted="muted" loop="loop">
  Seu navegador não suporta reprodução de vídeo. <a href="preview_portfolio.mp4">Baixar vídeo</a>
</video>

---

```text
  _____      _                     _            
 | ____|_ __(_) ___ __ _        __| | _____   __
 |  _| | '__| |/ __/ _` |      / _` |/ _ \ \ / /
 | |___| |  | | (_| (_| |  _  | (_| |  __/\ V / 
 |_____|_|  |_|\___\__,_| (_)  \__,_|\___| \_/  
```

## ✨ Destaques do Projeto

- **Interatividade Retro (CRT & ASCII Art):** Design estético inspirado em consoles clássicos dos anos 80/90, com efeito scanline/CRT sutil e tipografia *JetBrains Mono*.
- **Terminal CLI Embutido:** Console interativo funcional que responde a comandos como `help`, `about`, `skills`, `projects`, `contact`, `theme`, `clear` e `cat info.json`.
- **Canvas 2D Reativo:** Motor gráfico leve em Canvas renderizando partículas, parallax e sprites temáticos reativos ao movimento do cursor e à rolagem da página.
- **Integração Dinâmica com GitHub:** Consumo em tempo real da API pública do GitHub para listar projetos, tags, métricas e screenshots dos repositórios.
- **Suporte Multilíngue (i18n):** Tradução instantânea e sem recarregamento para 4 idiomas: **Português (PT-BR)**, **Inglês (EN)**, **Espanhol (ES)** e **Francês (FR)**.
- **Light & Dark Mode:** Alternância nativa de temas com paletas contrastantes e persistência das preferências no `localStorage`.
- **Zero Dependências Pesadas:** Construído 100% com tecnologias nativas da web, garantindo carregamento ultrarrápido e pontuação máxima em métricas de performance (Lighthouse).

---

## 🛠️ Tecnologias Utilizadas

- **Estrutura & Semântica:** HTML5 Semântico
- **Estilos & Layout:** Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Media Queries)
- **Lógica & Interatividade:** JavaScript Puro (ES6+)
- **Animações Gráficas:** HTML5 Canvas API (2D Context com DPR scaling)
- **Serviços & APIs:** GitHub REST API, API MyMemory Translation

---

## 📂 Estrutura do Repositório

```text
├── index.html       # Estrutura principal da aplicação e seções
├── style.css        # Variáveis de tema CRT, tipografia, grid e componentes
├── script.js        # Lógica principal, tema, digitação e formulário
├── projects.js      # Integração com a API do GitHub, filtros e previews
├── terminal.js      # Interpretador de comandos do terminal interativo
├── translate.js     # Dicionários de internacionalização (PT, EN, ES, FR)
├── ascii-bg.js      # Motor gráfico em Canvas 2D e sprites ASCII
├── favicon.svg      # Favicon vetorial com o avatar da desenvolvedora
└── README.md        # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto é desenvolvido com código web puro, não há etapa complexa de build:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/VaporubDev/Portfolio.git
   ```

2. **Abra a pasta do projeto:**
   ```bash
   cd Portfolio
   ```

3. **Inicie um servidor estático local** (para habilitar o carregamento assíncrono de módulos e assets):
   - Com **VS Code**: utilize a extensão **Live Server** clicando com o botão direito em `index.html` > *Open with Live Server*.
   - Com **Node.js**:
     ```bash
     npx serve .
     ```
   - Com **Python**:
     ```bash
     python -m http.server 8000
     ```

4. Acesse no navegador em `http://localhost:8000` (ou na porta indicada pelo servidor).

---

## 📬 Contato & Conexões

- **GitHub:** [@VaporubDev](https://github.com/VaporubDev)
- **LinkedIn:** [erica-paixao-gois](https://www.linkedin.com/in/erica-paixao-gois/)
- **Instagram:** [@ericaa_dev](https://www.instagram.com/ericaa_dev)
- **Email:** [florserena.epg203@gmail.com](mailto:florserena.epg203@gmail.com)

---

Desenvolvido com carinho e código limpo por **Érica Paixão**. © 2026

