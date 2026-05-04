"use client";

import { useState } from "react";
import JSZip from "jszip";

export default function Page() {
  const apps = [
    {
      name: "Planka",
      href: "http://localhost:3000",
      tag: "Organización · Puerto 3000",
      file: "/Planka.yml",
      zipPath: "Planka/docker-compose.yml",
      description:
        "Gestión visual de proyectos tipo Kanban. Organiza tareas por columnas y estados, similar a Trello pero autoalojado.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      name: "Mattermost",
      href: "http://localhost:8065",
      tag: "Comunicación · Puerto 8065",
      file: "/Mattermost.yml",
      zipPath: "Mattermost/docker-compose.yml",
      description:
        "Plataforma de mensajería interna para equipos. Chat en tiempo real, canales y mensajes directos en tu propia red.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      name: "Homebox",
      href: "http://localhost:3100",
      tag: "Inventario · Puerto 3100",
      file: "/Homebox.yml",
      zipPath: "Homebox/docker-compose.yml",
      description:
        "Gestión de activos e inventario. Controla equipos, licencias y accesorios de tu empresa de forma centralizada.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      name: "Wiki.js",
      href: "http://localhost:3001",
      tag: "Documentación · Puerto 3001",
      file: "/Wikijs.yml",
      zipPath: "WikiJS/docker-compose.yml",
      description:
        "Wiki moderna y potente para documentar procesos, manuales y conocimiento interno de la empresa.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      name: "SuiteCRM",
      href: "http://localhost:8085",
      tag: "CRM · Puerto 8085",
      file: "/SuiteCRM.yml",
      zipPath: "SuiteCRM/docker-compose.yml",
      description:
        "Gestión de relaciones con clientes. Seguimiento de contactos, oportunidades y ventas sin costes de licencia.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "Nextcloud",
      href: "http://localhost:8086",
      tag: "Almacenamiento · Puerto 8086",
      file: "/Nextcloud.yml",
      zipPath: "Nextcloud/docker-compose.yml",
      description:
        "Almacenamiento en la nube autoalojado. Comparte archivos, calendarios y contactos dentro de tu red local.",
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
    },
  ];

  const createDefaultSelection = () =>
    Object.fromEntries(apps.map((app) => [app.name, true]));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApps, setSelectedApps] = useState(createDefaultSelection());
  const [isDownloading, setIsDownloading] = useState(false);

  const openDownloadModal = () => {
    setSelectedApps(createDefaultSelection());
    setIsModalOpen(true);
  };

  const closeDownloadModal = () => {
    if (isDownloading) return;
    setIsModalOpen(false);
  };

  const toggleApp = (name) => {
    setSelectedApps((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const selectedCount = apps.filter((app) => selectedApps[app.name]).length;

  const downloadSelectedApps = async () => {
    const chosenApps = apps.filter((app) => selectedApps[app.name]);

    if (!chosenApps.length) {
      alert("Selecciona al menos una herramienta.");
      return;
    }

    try {
      setIsDownloading(true);

      const zip = new JSZip();

      for (const app of chosenApps) {
        const response = await fetch(app.file);
        if (!response.ok) {
          throw new Error(`No se pudo cargar ${app.file}`);
        }

        const blob = await response.blob();
        zip.file(app.zipPath, blob);
      }

      const batResponse = await fetch("/Instalador.bat");
      if (batResponse.ok) {
        const batBlob = await batResponse.blob();
        zip.file("Instalador.bat", batBlob);
      }

      const readme = `PYMES HUB

Herramientas seleccionadas:
${chosenApps.map((app) => `- ${app.name} (${app.href})`).join("\n")}

Pasos:
1. Extrae este ZIP.
2. Ejecuta Instalador.bat como administrador.
3. Abre las aplicaciones en sus puertos correspondientes.

Puertos:
${chosenApps.map((app) => `- ${app.name}: ${app.href}`).join("\n")}
`;

      zip.file("README.txt", readme);

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "PYMESHUB-seleccionado.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("No se pudo generar el ZIP. Revisa que los .yml estén en /public/yml.");
    } finally {
      setIsDownloading(false);
    }
  };


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
            <a href="#instalacion">Instalación</a>
            <a href="#arquitectura">Arquitectura</a>
          </div>

          <details className="mobile-menu-details">
            <summary className="mobile-menu-btn" aria-label="Abrir menú">
              <span />
              <span />
              <span />
            </summary>
            <div className="mobile-menu">
              <a href="#herramientas">Herramientas</a>
              <a href="#ventajas">Ventajas</a>
              <a href="#instalacion">Instalación</a>
              <a href="#arquitectura">Arquitectura</a>
            </div>
          </details>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-badge">Open Source + Docker</div>
        <h1>
          Digitaliza tu PYME con <em>herramientas libres</em>
        </h1>
        <p>
          Un hub de aplicaciones open source listas para desplegar en tu equipo con Docker Desktop,
          de forma sencilla y con tus datos bajo tu control.
        </p>
        <div className="hero-buttons">
          <a href="#herramientas" className="btn-primary">Ver herramientas</a>
          <a href="#instalacion" className="btn-secondary">Guía de instalación</a>
          <button
            type="button"
            onClick={openDownloadModal}
            className="btn-secondary"
          >
            Descargar instalador
          </button>
        </div>
      </header>

      {/* ── HERRAMIENTAS ── */}
      <section id="herramientas" className="section section-alt">
        <div className="section-inner">
          <h2 className="section-title">Herramientas incluidas</h2>
          <p className="section-subtitle">
            Haz clic sobre cualquier aplicación para abrirla directamente en su puerto local.
          </p>

          <div className="tools-grid">
            {apps.map((app) => (
              <a
                key={app.name}
                href={app.href}
                target="_blank"
                rel="noreferrer"
                className="tool-card-link"
              >
                <div className="tool-card">
                  <div className="tool-icon">{app.icon}</div>
                  <h3>{app.name}</h3>
                  <span className="tool-tag">{app.tag}</span>
                  <p>{app.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENTAJAS ── */}
      <section id="ventajas" className="section">
        <div className="section-inner">
          <h2 className="section-title">Por qué PYMES HUB</h2>
          <p className="section-subtitle">
            Pensado para empresas que necesitan digitalizarse sin complicaciones ni grandes inversiones.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3>Código abierto</h3>
              <p>
                Todas las herramientas son open source, sin costes de licencia y con control total sobre los datos.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3>Instalación automatizada</h3>
              <p>
                El instalador prepara Docker Desktop, configura archivos y levanta los servicios automáticamente.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrap">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h3>Datos persistentes</h3>
              <p>
                Los volúmenes de Docker permiten conservar la información aunque los contenedores se reinicien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTALACION ── */}
      <section id="instalacion" className="section section-alt">
        <div className="section-inner">
          <h2 className="section-title">Instalación en 3 pasos</h2>
          <p className="section-subtitle">
            El proceso está automatizado para que solo tengas que ejecutar el instalador,
            introducir los datos y abrir las aplicaciones.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Ejecuta el instalador</h3>
              <p>
                Abre el archivo Instalador.bat como administrador. Si Docker Desktop no está instalado,
                el script lo instalará y reiniciará el equipo.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Introduce los datos después del reinicio</h3>
              <p>
                Cuando el equipo se reinicie, el instalador continuará automáticamente y te pedirá
                el correo, el usuario y la contraseña del administrador.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Abre cada aplicación en su puerto</h3>
              <p>
                Cuando termine la instalación, abre cada herramienta en su dirección local correspondiente
                o en su dirección <a
                  className="text-primary underline underline-offset-2 hover:text-accent transition-colors duration-200"
                  href="/tutorial-ip"
                >ip</a> si prefieres acceder desde otro dispositivo dentro de la misma red local.
              </p>
              <div className="step-code">Ejemplo: http://localhost:1337</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARQUITECTURA ── */}
      <section id="arquitectura" className="section">
        <div className="section-inner">
          <h2 className="section-title">Arquitectura</h2>
          <p className="section-subtitle">
            Flujo visual del despliegue y acceso a las aplicaciones dentro del contenedor Docker.
          </p>

          <div className="arch-flow">
            <div className="arch-node user">
              <div className="arch-node-title">Usuario</div>
              <div className="arch-node-text">Ejecuta el instalador y accede desde el navegador</div>
            </div>

            <div className="arch-arrow-vertical">↓</div>

            <div className="arch-node hub">
              <div className="arch-node-title">PYMES Hub</div>
              <div className="arch-node-text">Origen de las imágenes necesarias para el despliegue</div>
            </div>

            <div className="arch-arrow-vertical">↓</div>

            <div className="arch-stack">
              <div className="arch-stack-header">
                <div>
                  <div className="arch-stack-title">Docker</div>
                  <div className="arch-stack-subtitle">Servicios desplegados en local</div>
                </div>
                <div className="arch-stack-badge">Docker Desktop</div>
              </div>

              <div className="arch-apps-grid">
                {apps.map((app) => (
                  <a
                    key={`arch-${app.name}`}
                    href={app.href}
                    target="_blank"
                    rel="noreferrer"
                    className="arch-app-card"
                  >
                    <div className="arch-app-top">
                      <span className="arch-app-name">Contenedor {app.name}</span>
                      <span className="arch-app-port">
                        Puerto {app.href.replace("http://localhost:", "")}
                      </span>
                    </div>
                    <div className="arch-app-url">{app.href}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t border-border bg-card px-6 py-8 text-center">
        <h3 className="text-2xl font-extrabold text-primary">
          PYMES<span className="text-foreground font-light">HUB</span>
        </h3>

        <p className="mt-3 text-base font-semibold text-foreground">
          Proyecto intermodular por Ruben Gutierrez Ramirez
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          CESUR · Sistemas Microinformáticos y Redes
        </p>
      </footer>

      {/* ── MODAL DESCARGA ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeDownloadModal}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Selecciona las herramientas
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Marca las aplicaciones que quieres incluir en el ZIP.
                </p>
              </div>

              <button
                type="button"
                onClick={closeDownloadModal}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {apps.map((app) => (
                <label
                  key={`check-${app.name}`}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedApps[app.name]}
                    onChange={() => toggleApp(app.name)}
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{app.name}</div>
                    <div className="text-sm text-slate-500">{app.tag}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-5 text-sm text-slate-600">
              Seleccionadas: <strong>{selectedCount}</strong> de {apps.length}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDownloadModal}
                disabled={isDownloading}
                className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={downloadSelectedApps}
                disabled={isDownloading}
                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDownloading ? "Generando ZIP..." : "Descargar ZIP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}