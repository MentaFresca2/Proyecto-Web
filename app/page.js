export default function Page() {
  return (
    <>
      {/* ── NAV ── */}
      <nav className="site-nav">
        <div className="site-nav-inner">
          <div className="logo">
            PYMES<span>HUB</span>
          </div>
          <div className="nav-links">
            <a href="#herramientas">Herramientas</a>
            <a href="#ventajas">Ventajas</a>
            <a href="#instalacion">Instalacion</a>
            <a href="#arquitectura">Arquitectura</a>
          </div>
          {/* Menu movil con CSS puro, sin hooks */}
          <details className="mobile-menu-details">
            <summary className="mobile-menu-btn" aria-label="Abrir menu">
              <span /><span /><span />
            </summary>
            <div className="mobile-menu">
              <a href="#herramientas">Herramientas</a>
              <a href="#ventajas">Ventajas</a>
              <a href="#instalacion">Instalacion</a>
              <a href="#arquitectura">Arquitectura</a>
            </div>
          </details>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-badge">Open Source + Docker</div>
        <h1>
          {"Digitaliza tu PYME con "}
          <em>herramientas libres</em>
        </h1>
        <p>
          Un hub de aplicaciones open source listas para desplegar en tu red local con Docker.
          Sin costes de licencia, sin complicaciones, con tus datos bajo tu control.
        </p>
        <div className="hero-buttons">
          <a href="#herramientas" className="btn-primary">Ver herramientas</a>
          <a href="#instalacion" className="btn-secondary">Guia de instalacion</a>
        </div>
      </header>

      {/* ── HERRAMIENTAS ── */}
      <section id="herramientas" className="section section-alt">
        <div className="section-inner">
          <h2 className="section-title">Herramientas incluidas</h2>
          <p className="section-subtitle">
            Cada herramienta cubre una necesidad habitual de la PYME y se despliega con un solo comando.
          </p>
          <div className="tools-grid">

            <div className="tool-card">
              <div className="tool-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              </div>
              <h3>Planka</h3>
              <span className="tool-tag">{"Organizacion \u00b7 Puerto 1337"}</span>
              <p>Gestion visual de proyectos tipo Kanban. Organiza tareas por columnas y estados, similar a Trello pero autoalojado.</p>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3>Rocket.Chat</h3>
              <span className="tool-tag">{"Comunicacion \u00b7 Puerto 3000"}</span>
              <p>Plataforma de mensajeria interna para equipos. Chat en tiempo real, canales y mensajes directos en tu propia red.</p>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3>Snipe-IT</h3>
              <span className="tool-tag">{"Inventario \u00b7 Puerto 8080"}</span>
              <p>Gestion de activos e inventario. Controla equipos, licencias y accesorios de tu empresa de forma centralizada.</p>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3>Wiki.js</h3>
              <span className="tool-tag">{"Documentacion \u00b7 Puerto 3001"}</span>
              <p>Wiki moderna y potente para documentar procesos, manuales y conocimiento interno de la empresa.</p>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3>SuiteCRM</h3>
              <span className="tool-tag">{"CRM \u00b7 Puerto 8081"}</span>
              <p>Gestion de relaciones con clientes. Seguimiento de contactos, oportunidades y ventas sin costes de licencia.</p>
            </div>

            <div className="tool-card">
              <div className="tool-icon">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              </div>
              <h3>Nextcloud</h3>
              <span className="tool-tag">{"Almacenamiento \u00b7 Puerto 8082"}</span>
              <p>Almacenamiento en la nube autoalojado. Comparte archivos, calendarios y contactos dentro de tu red local.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── VENTAJAS ── */}
      <section id="ventajas" className="section">
        <div className="section-inner">
          <h2 className="section-title">Por que PYMES HUB</h2>
          <p className="section-subtitle">
            Pensado para empresas que necesitan digitalizarse sin complicaciones ni grandes inversiones.
          </p>
          <div className="features-grid">

            <div className="feature-item">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3>Codigo abierto</h3>
              <p>Todas las herramientas son open source: sin costes de licencia, sin bloqueo con proveedores y con total control sobre tus datos.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3>Docker simplificado</h3>
              <p>Cada herramienta se despliega con un simple docker compose up. Sin configuraciones complicadas ni dependencias rotas.</p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              </div>
              <h3>Datos persistentes</h3>
              <p>Los volumenes de Docker garantizan que tus datos se mantienen aunque reinicies o recrees los contenedores.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── INSTALACION ── */}
      <section id="instalacion" className="section section-alt">
        <div className="section-inner">
          <h2 className="section-title">Instalacion en 4 pasos</h2>
          <p className="section-subtitle">
            No necesitas conocimientos avanzados. Si puedes abrir una terminal, puedes desplegar PYMES HUB.
          </p>
          <div className="steps-grid">

            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Instala Docker y Docker Compose</h3>
              <p>Asegurate de tener Docker Desktop instalado en tu equipo o servidor. En Windows puedes usar WSL2 como backend.</p>
              <div className="step-code">docker --version && docker compose version</div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Descarga el paquete de herramientas</h3>
              <p>Descarga el archivo ZIP con los ficheros docker-compose.yml preconfigurados para cada herramienta.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Levanta los servicios</h3>
              <p>Navega a la carpeta de la herramienta que quieras usar y ejecuta el comando para iniciar los contenedores.</p>
              <div className="step-code">docker compose up -d</div>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Accede desde tu navegador</h3>
              <p>{"Abre tu navegador y escribe la ip de el ordenador donde hallas instalado docker seguido de : y el puerto de la herramienta. Por ejemplo, para Planka seria:"}</p>
              <div className="step-code">tuip:1337</div>
              <a href="/tutorial-ip" className="ip-help-link">(si no sabes cual es tu IP, clica aqui)</a>
            </div>

          </div>
        </div>
      </section>
     
      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <p>{"PYMES HUB \u2014 Proyecto fin de grado por Ruben Gutierrez Ramirez"}</p>
        <p className="footer-sub">{"CESUR \u00b7 Sistemas Microinformaticos y Redes"}</p>
      </footer>
    </>
  )
}
