// RetkiLab – automaattinen header + favicon
(function () {
    function injectFavicon() {
      const head = document.head || document.getElementsByTagName('head')[0];
      if (!head.querySelector('link[rel="icon"]')) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = 'favicon.svg';
        head.appendChild(link);
      }
    }
  
    function makeNav() {
      const nav = document.createElement('nav');
      nav.style.display = 'flex';
      nav.style.gap = '10px';
      nav.style.alignItems = 'center';
  
      const home = document.createElement('a');
      home.href = 'index.html';
      home.textContent = 'Etusivu';
      home.className = 'rl-btn';
      home.style.textDecoration = 'none';
  
      const profile = document.createElement('a');
      profile.href = 'profile.html';
      profile.textContent = 'Profiili';
      profile.className = 'rl-btn rl-outline';
      profile.style.textDecoration = 'none';
  
      nav.appendChild(home);
      nav.appendChild(profile);
      return nav;
    }
  
    function injectHeader() {
      const nav = makeNav();
      const existingHeader = document.querySelector('header');
      if (existingHeader) {
        // lisää nav olemassa olevan headerin oikeaan reunaan
        existingHeader.style.display = 'flex';
        existingHeader.style.justifyContent = 'space-between';
        existingHeader.style.alignItems = 'center';
        existingHeader.appendChild(nav);
      } else {
        // jos sivulla ei ole headeria, tehdään sellainen ylös
        const header = document.createElement('header');
        header.style.padding = '14px 18px';
        header.style.borderBottom = '1px solid #1f2937';
        header.style.background = '#0b0d10';
        header.style.position = 'sticky';
        header.style.top = '0';
  
        const h1 = document.createElement('h1');
        h1.textContent = 'RetkiLab';
        h1.style.fontSize = '18px';
        h1.style.margin = '0';
  
        header.appendChild(h1);
        header.appendChild(nav);
        document.body.insertBefore(header, document.body.firstChild);
      }
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      injectFavicon();
      injectHeader();
    });
  })();
  