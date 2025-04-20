// =======================
// Cargar datos dinámicos del hero desde API (requiere proxy y token)
// =======================
function cargarHeroDesdeAPI() {
  fetch("../api_test.php") // sin rutas absolutas
    .then(response => response.json())
    .then(data => {
      const primerItem = data.data[0];
      document.getElementById('hero-title').textContent = primerItem.titulo.esp;
      document.getElementById('hero-description').textContent = primerItem.descripcion.esp;
    })
    .catch(error => {
      console.error("Error al cargar los datos del hero:", error);
    });
}

// =======================
// Cargar servicios dinámicamente desde API LOCAL usando fetch
// =======================
function cargarServiciosDesdeAPI(modo = 'detallado') {
  fetch('http://localhost/EVA1_BACK_API/')
    .then(response => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      return response.json();
    })
    .then(result => {
      const servicios = result.data;
      const contenedor = document.querySelector('.servicios-grid');
      contenedor.innerHTML = ''; // Limpiar contenido anterior

      servicios.forEach(servicio => {
        const titulo = servicio.nombre || 'Sin nombre';
        const descripcion = servicio.descripcion || 'Descripción no disponible';

        let cardHTML = '';

        if (modo === 'index') {
          cardHTML = `
            <article class="servicio-preview" style="background-image: url('../imagenes/servicio-${servicio.id}.jpg');">
              <div class="overlay">
                <h3>${titulo}</h3>
                <a href="services.html" class="btn-servicio">Más información</a>
              </div>
            </article>`;
        } else {
          cardHTML = `
            <article>
              <h3>${titulo}</h3>
              <p>${descripcion}</p>
            </article>`;
        }

        contenedor.innerHTML += cardHTML;
      });
    })
    .catch(error => {
      console.error("Error al cargar los servicios:", error);
    });
}


// =======================
// Cargar Misión y Visión desde API (requiere proxy y token)
// =======================
function cargarMisionVisionDesdeAPI() {
  fetch("../api_test.php") // usa api_test.php como proxy a la API externa
    .then(response => response.json())
    .then(data => {
      const items = data.data;
      const mision = items.find(item => item.titulo.esp === "Misión");
      const vision = items.find(item => item.titulo.esp === "Visión");

      if (mision) {
        document.getElementById('mision-titulo').textContent = mision.titulo.esp;
        document.getElementById('mision-texto').textContent = mision.descripcion.esp;
      }

      if (vision) {
        document.getElementById('vision-titulo').textContent = vision.titulo.esp;
        document.getElementById('vision-texto').textContent = vision.descripcion.esp;
      }
    })
    .catch(error => {
      console.error("Error al cargar misión y visión:", error);
    });
}
// =======================
// Inicialización al cargar la página
// =======================
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('hero-title')) cargarHeroDesdeAPI();

  if (document.querySelector('.servicios-grid')) {
    const modo = document.body.classList.contains('index') ? 'index' : 'detallado';
    cargarServiciosDesdeAPI(modo);
  }

  if (document.getElementById('mision-titulo') && document.getElementById('vision-titulo')) {
    cargarMisionVisionDesdeAPI();
  }

  // Menú hamburguesa
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Tema día/noche
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? 'Modo Día' : 'Modo Noche';

  themeToggle.addEventListener('click', () => {
    const nuevoTema = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', nuevoTema);
    themeToggle.textContent = nuevoTema === 'dark' ? 'Modo Día' : 'Modo Noche';
    localStorage.setItem('theme', nuevoTema);
  });

  // Validación formulario
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const nombre = document.getElementById('nombre');
      const servicio = document.getElementById('servicio');
      const mensaje = document.getElementById('mensaje');

      if (nombre.value.trim() === '') {
        showError(nombre, 'Por favor ingrese su nombre completo');
        isValid = false;
      } else {
        clearError(nombre);
      }

      if (servicio.value === '') {
        showError(servicio, 'Por favor seleccione un servicio');
        isValid = false;
      } else {
        clearError(servicio);
      }

      if (mensaje.value.trim() === '') {
        showError(mensaje, 'Por favor ingrese un mensaje');
        isValid = false;
      } else {
        clearError(mensaje);
      }

      if (isValid) {
        console.log('Formulario enviado:');
        console.log('Nombre:', nombre.value);
        console.log('Servicio:', servicio.options[servicio.selectedIndex].text);
        console.log('Mensaje:', mensaje.value);

        form.reset();
        alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
      }
    });
  }
});

// =======================
// Funciones auxiliares
// =======================
function showError(input, message) {
  const errorSpan = input.parentElement.querySelector('.error-message');
  errorSpan.textContent = message;
  input.classList.add('error');
}

function clearError(input) {
  const errorSpan = input.parentElement.querySelector('.error-message');
  errorSpan.textContent = '';
  input.classList.remove('error');
}
