// =======================
// Cargar datos dinámicos del hero desde API con token y CORS proxy
// =======================
function cargarHeroDesdeAPI() {
    const headerParams = {
      'Authorization': 'Bearer ciisa'
    };
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://ciisa.coningenio.cl/v1/about-us/";
  
    $.ajax({
      url: proxyUrl + apiUrl,
      type: "GET",
      dataType: "json",
      headers: headerParams,
      success: function (data) {
        const primerItem = data.data[0];
        $('#hero-title').text(primerItem.titulo.esp);
        $('#hero-description').text(primerItem.descripcion.esp);
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos del hero:", error);
      }
    });
  }
  
  // =======================
  // Cargar servicios dinámicamente desde API
  // =======================
  function cargarServiciosDesdeAPI(modo = 'detallado') {
    const headerParams = {
      'Authorization': 'Bearer ciisa'
    };
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://ciisa.coningenio.cl/v1/services/";
  
    $.ajax({
      url: proxyUrl + apiUrl,
      type: "GET",
      dataType: "json",
      headers: headerParams,
      success: function (data) {
        const servicios = data.data;
        const contenedor = $('.servicios-grid');
        contenedor.empty();
  
        servicios.forEach(servicio => {
          const titulo = servicio.titulo.esp;
          const descripcion = servicio.descripcion.esp;
  
          let card = '';
          if (modo === 'index') {
            card = `
              <article class="servicio-preview" style="background-image: url('/imagenes/servicio-${servicio.id}.jpg');">
                <div class="overlay">
                  <h3>${titulo}</h3>
                  <a href="/paginas/services.html" class="btn-servicio">Más información</a>
                </div>
              </article>
            `;
          } else {
            card = `
              <article>
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
              </article>
            `;
          }
  
          contenedor.append(card);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los servicios:", error);
      }
    });
  }
  
  // =======================
  // Cargar Misión y Visión desde API
  // =======================
  function cargarMisionVisionDesdeAPI() {
    const headerParams = {
      'Authorization': 'Bearer ciisa'
    };
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://ciisa.coningenio.cl/v1/about-us/";
  
    $.ajax({
      url: proxyUrl + apiUrl,
      type: "GET",
      dataType: "json",
      headers: headerParams,
      success: function (data) {
        const items = data.data;
        const mision = items.find(item => item.titulo.esp === "Misión");
        const vision = items.find(item => item.titulo.esp === "Visión");
  
        if (mision) {
          $('#mision-titulo').text(mision.titulo.esp);
          $('#mision-texto').text(mision.descripcion.esp);
        }
  
        if (vision) {
          $('#vision-titulo').text(vision.titulo.esp);
          $('#vision-texto').text(vision.descripcion.esp);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar misión y visión:", error);
      }
    });
  }
  
  // =======================
  // Inicialización al cargar la página
  // =======================
  $(document).ready(function () {
    if ($('#hero-title').length) cargarHeroDesdeAPI();
  
    if ($('.servicios-grid').length) {
      const modo = $('body').hasClass('index') ? 'index' : 'detallado';
      cargarServiciosDesdeAPI(modo);
    }
  
    if ($('#mision-titulo').length && $('#vision-titulo').length) {
      cargarMisionVisionDesdeAPI();
    }
  
    // Menú hamburguesa
    $('#menu-toggle').on('click', function () {
      $('#nav-links').toggleClass('active');
    });
  
    // Tema día/noche
    const themeToggle = $('#theme-toggle');
    const body = $('body');
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.attr('data-theme', savedTheme);
    themeToggle.text(savedTheme === 'dark' ? 'Modo Día' : 'Modo Noche');
  
    themeToggle.on('click', function () {
      const nuevoTema = body.attr('data-theme') === 'dark' ? 'light' : 'dark';
      body.attr('data-theme', nuevoTema);
      themeToggle.text(nuevoTema === 'dark' ? 'Modo Día' : 'Modo Noche');
      localStorage.setItem('theme', nuevoTema);
    });
  
    // Validación de formulario
    $('#contact-form').on('submit', function (e) {
      e.preventDefault();
  
      let isValid = true;
      const nombre = $('#nombre');
      const servicio = $('#servicio');
      const mensaje = $('#mensaje');
  
      if (nombre.val().trim() === '') {
        showError(nombre, 'Por favor ingrese su nombre completo');
        isValid = false;
      } else {
        clearError(nombre);
      }
  
      if (servicio.val() === '') {
        showError(servicio, 'Por favor seleccione un servicio');
        isValid = false;
      } else {
        clearError(servicio);
      }
  
      if (mensaje.val().trim() === '') {
        showError(mensaje, 'Por favor ingrese un mensaje');
        isValid = false;
      } else {
        clearError(mensaje);
      }
  
      if (isValid) {
        console.log('Formulario enviado:');
        console.log('Nombre:', nombre.val());
        console.log('Servicio:', servicio.find('option:selected').text());
        console.log('Mensaje:', mensaje.val());
  
        $('#contact-form')[0].reset();
        alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
      }
    });
  });
  
  // =======================
  // Funciones auxiliares
  // =======================
  function showError(input, message) {
    const formGroup = input.parent();
    const errorMessage = formGroup.find('.error-message');
    errorMessage.text(message);
    input.addClass('error');
  }
  
  function clearError(input) {
    const formGroup = input.parent();
    const errorMessage = formGroup.find('.error-message');
    errorMessage.text('');
    input.removeClass('error');
  }
  