export default function TutorialIP() {
  return (
    <div className="tutorial-page">
      <a href="/" className="tutorial-back">{"← Volver a PYMES HUB"}</a>

      <h1>Como ver tu IP privada en Windows</h1>
      <p className="tutorial-intro">
        Tu IP privada es la direccion que identifica a tu ordenador dentro de tu red local (la red de tu casa u oficina).
        Es diferente a tu IP publica, que es la que te identifica en Internet. Para acceder a las herramientas de PYMES HUB
        desde otros equipos de tu misma red, necesitas conocer esta direccion.
      </p>

      <div className="tutorial-steps">

        <div className="tutorial-step">
          <div className="tutorial-step-num">1</div>
          <div>
            <h2>Abre el menu Inicio</h2>
            <p>
              Pulsa la tecla <strong>Windows</strong> de tu teclado (la que tiene el logo de Windows, abajo a la izquierda)
              o haz clic en el icono de Inicio en la barra de tareas.
            </p>
          </div>
        </div>

        <div className="tutorial-step">
          <div className="tutorial-step-num">2</div>
          <div>
            <h2>Busca &quot;cmd&quot;</h2>
            <p>
              Escribe <strong>cmd</strong> directamente con el teclado (no hace falta buscar donde escribir, al pulsar
              las teclas aparecera un cuadro de busqueda). Te aparecera un resultado llamado
              <strong> Simbolo del sistema</strong> o <strong>Command Prompt</strong>. Haz clic en el para abrirlo.
            </p>
            <div className="tutorial-note">
              Se abrira una ventana negra con texto blanco. Es la terminal de Windows, no te preocupes, no puede pasar nada malo.
            </div>
          </div>
        </div>

        <div className="tutorial-step">
          <div className="tutorial-step-num">3</div>
          <div>
            <h2>Escribe el comando ipconfig</h2>
            <p>
              En esa ventana negra, escribe exactamente lo siguiente y pulsa <strong>Enter</strong>:
            </p>
            <div className="tutorial-code">ipconfig</div>
          </div>
        </div>

        <div className="tutorial-step">
          <div className="tutorial-step-num">4</div>
          <div>
            <h2>Busca tu direccion IPv4</h2>
            <p>
              Apareceran varios bloques de texto. Busca el que dice <strong>Adaptador de Ethernet</strong> o
              <strong> Adaptador de LAN inalambrica Wi-Fi</strong> (dependiendo de si estas conectado por cable o por WiFi).
              Dentro de ese bloque, busca la linea que dice:
            </p>
            <div className="tutorial-code">Direccion IPv4. . . . . . . . . . . : 192.168.X.X</div>
            <p>
              Ese numero (por ejemplo <strong>192.168.1.45</strong>) es tu IP privada. Es la direccion que otros equipos
              de tu red pueden usar para conectarse a las herramientas que tengas corriendo con Docker.
            </p>
          </div>
        </div>

        <div className="tutorial-step">
          <div className="tutorial-step-num">5</div>
          <div>
            <h2>Usa tu IP para acceder desde otros equipos</h2>
            <p>
              Si quieres acceder a Planka desde otro ordenador de tu red, en vez de escribir <strong>localhost</strong>
              en el navegador, escribe tu IP privada. Por ejemplo:
            </p>
            <div className="tutorial-code">http://192.168.1.45:1337</div>
            <div className="tutorial-note">
              Recuerda: <strong>localhost</strong> solo funciona en el mismo ordenador donde corren los contenedores.
              Para acceder desde otros equipos de la red, usa tu IP privada.
            </div>
          </div>
        </div>

      </div>

      <div className="tutorial-summary">
        <h2>Resumen rapido</h2>
        <ol>
          <li>Pulsa la tecla Windows</li>
          <li>{"Escribe cmd y pulsa Enter"}</li>
          <li>{"Escribe ipconfig y pulsa Enter"}</li>
          <li>{"Busca \"Direccion IPv4\" → ese es tu IP privada"}</li>
        </ol>
      </div>

      <a href="/#instalacion" className="tutorial-back-bottom">{"← Volver a la guia de instalacion"}</a>
    </div>
  )
}
