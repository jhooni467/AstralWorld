const state = { mode: "local", page: "explore" };
const content = document.getElementById("appContent");
const nav = document.getElementById("bottomNav");

const navItems = {
  local: [
    { id: "explore", label: "Explora", icon: "✧" },
    { id: "library", label: "Biblioteca", icon: "▤" },
    { id: "settings", label: "Ajustes", icon: "⚙" }
  ],
  online: [
    { id: "home", label: "Inicio", icon: "⌂" },
    { id: "profile", label: "Perfil", icon: "◉" },
    { id: "settings", label: "Ajustes", icon: "⚙" }
  ]
};

function renderNav() {
  nav.innerHTML = navItems[state.mode].map(item => `
    <button class="nav-item ${state.page === item.id ? "active" : ""}" data-page="${item.id}">
      <span class="nav-icon">${item.icon}</span><span>${item.label}</span>
    </button>`).join("");
  nav.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => { state.page = button.dataset.page; render(); });
  });
}

function explorePage() {
  return `
    <section class="hero">
      <span class="eyebrow">Tu espacio audiovisual</span>
      <h1>Explora nuevos mundos.</h1>
      <p>Organiza tus vídeos y descubre contenido desde una experiencia hecha para AstralWorld.</p>
    </section>
    <div class="section-head"><h2>Tu espacio</h2><span class="pill">Modo Local</span></div>
    <div class="action-grid">
      <button class="action-card" data-page="library"><span class="action-icon">▤</span><strong>Biblioteca</strong><small>Tus vídeos en un solo lugar</small></button>
      <button class="action-card" data-page="settings"><span class="action-icon">⚙</span><strong>Personalizar</strong><small>Configura AstralWorld</small></button>
    </div>
    <div class="section-head"><h2>Para comenzar</h2></div>
    <div class="empty-card"><div class="empty-symbol">✧</div><strong>Tu biblioteca está esperando</strong><p>La importación de vídeos llegará en una próxima etapa.</p></div>`;
}

function libraryPage() {
  return `
    <span class="eyebrow">Modo Local</span><h1>Biblioteca</h1>
    <p>Todo tu contenido, organizado en un mismo lugar.</p>
    <input class="search-field" type="search" placeholder="Buscar en tu biblioteca" aria-label="Buscar en tu biblioteca">
    <div class="empty-card" style="margin-top:20px"><div class="empty-symbol">▤</div><strong>Aún no hay vídeos</strong><p>Más adelante podrás importar y organizar tus archivos de vídeo.</p></div>`;
}

function onlineHomePage() {
  return `
    <span class="eyebrow">Modo Online</span><h1>Descubre contenido.</h1>
    <p>Un espacio para explorar vídeos y encontrar algo nuevo.</p>
    <input class="search-field" type="search" placeholder="Buscar vídeos" aria-label="Buscar vídeos">
    <div class="section-head"><h2>Explorar</h2><span class="pill">Próximamente</span></div>
    <div class="empty-card"><div class="empty-symbol">✧</div><strong>Estamos preparando esta sección</strong><p>La búsqueda y reproducción online se desarrollarán en una siguiente etapa.</p></div>`;
}

function profilePage() {
  return `
    <span class="eyebrow">Modo Online</span><h1>Perfil</h1>
    <div class="empty-card"><div class="empty-symbol">◉</div><strong>Tu espacio personal</strong><p>Las opciones de perfil estarán disponibles más adelante.</p></div>`;
}

function settingsPage() {
  return `
    <span class="eyebrow">Personalización</span><h1>Ajustes</h1>
    <h2 style="margin-top:26px">Modo de app</h2>
    <div class="setting-card"><div><strong>Experiencia de AstralWorld</strong><p>Cambia entre tu contenido local y la experiencia online.</p></div><span class="pill">${state.mode === "local" ? "Local" : "Online"}</span></div>
    <div class="mode-switch">
      <button class="mode-button ${state.mode === "local" ? "active" : ""}" data-mode="local">Local</button>
      <button class="mode-button ${state.mode === "online" ? "active" : ""}" data-mode="online">Online</button>
    </div>
    <h2 style="margin-top:30px">Apariencia</h2>
    <div class="setting-card"><div><strong>Aurora Celestial</strong><p>Azul noche, turquesa aurora, menta y dorado.</p></div><span class="pill">Tema actual</span></div>
    <h2 style="margin-top:30px">Aplicación</h2>
    <div class="setting-card"><div><strong>AstralWorld</strong><p>Primera base · Versión 0.1</p></div><span class="pill">Inicial</span></div>`;
}

function render() {
  const pages = {
    explore: explorePage,
    library: libraryPage,
    home: onlineHomePage,
    profile: profilePage,
    settings: settingsPage
  };
  if (!navItems[state.mode].some(item => item.id === state.page)) {
    state.page = state.mode === "local" ? "explore" : "home";
  }
  content.innerHTML = pages[state.page]();
  content.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => { state.page = button.dataset.page; render(); });
  });
  content.querySelectorAll("[data-mode]").forEach(button => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      state.page = state.mode === "local" ? "explore" : "home";
      render();
    });
  });
  renderNav();
}

document.getElementById("headerAction").addEventListener("click", () => {
  const field = content.querySelector('input[type="search"]');
  if (field) field.focus();
  else { state.page = state.mode === "local" ? "library" : "home"; render(); content.querySelector('input[type="search"]')?.focus(); }
});

render();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}