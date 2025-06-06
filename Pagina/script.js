// --- Declaración global ---
const data0 = [
  {
    id: 'modulo1',
    categoria: 'Diseño',
    titulo: 'Diseño de empaques',
    duracion: '2 Meses',
    descripcion: 'Persuade a los clientes con los diseños de tus empaques, sé profesional y resalta los valores de tu marca',
    link: 'insidemooc.html',
    img: 'Images/img-uno.jpeg'
  },
];
const data1 = [
  {
    id: 'photoshop2024',
    categoria: 'Diseño',
    titulo: 'Photoshop 2024',
    duracion: '2 Meses',
    descripcion: 'Manipula y edita imágenes a nivel profesional con Photoshop. Aprenderás hasta el último detalle para sacar provecho a tus fotografías',
    link: 'insidemooc.html',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png'
  },
  {
    id: 'premiere2024',
    categoria: 'Diseño',
    titulo: 'Premiere Pro 2024',
    duracion: '3 Meses',
    descripcion: 'Edita de manera optima y con resultados increíbles en tu proyectos y videos',
    link: 'insidemooc.html',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg'
  }
];
const data2 = [
  {
    id: 'modulo1',
    categoria: 'Diseño',
    titulo: 'Diseño de empaques',
    duracion: '2 Meses',
    descripcion: 'Persuade a los clientes con los diseños de tus empaques, sé profesional y resalta los valores de tu marca',
    link: 'insidemooc.html',
    img: 'Images/img-uno.jpeg'
  },
  {
    id: 'premiere2024',
    categoria: 'Diseño',
    titulo: 'Premiere Pro 2024',
    duracion: '3 Meses',
    descripcion: 'Edita de manera optima y con resultados increíbles en tu proyectos y videos',
    link: 'insidemooc.html',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg'
  },
  {
    id: 'photoshop2024',
    categoria: 'Diseño',
    titulo: 'Photoshop 2024',
    duracion: '2 Meses',
    descripcion: 'Manipula y edita imágenes a nivel profesional con Photoshop. Aprenderás hasta el último detalle para sacar provecho a tus fotografías',
    link: 'insidemooc.html',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png'
  }
];

// --- Funciones y lógica del sitio ---
async function includeHTML(id, file) {
  const el = document.getElementById(id);
  if (el) {
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;
    return Promise.resolve(); // Devuelve promesa para saber cuándo termina
  }
  return Promise.reject("Elemento no encontrado: " + id);
}

// Esperamos a que navbar y footer se carguen
Promise.all([
  includeHTML("navbar", "navbar.html"),
  includeHTML("footer", "footer.html")
]).then(() => {
  // CAMPANITA DE NOTIFICACIONES
  const bellBtn = document.getElementById('bellBtn');
  const notificationBox = document.getElementById('notificationBox');
  const closeNotif = document.getElementById('closeNotif');

  if (bellBtn && notificationBox && closeNotif) {
    bellBtn.addEventListener('click', () => {
      notificationBox.classList.toggle('d-none');
    });

    closeNotif.addEventListener('click', () => {
      notificationBox.classList.add('d-none');
    });

    document.addEventListener('click', (e) => {
      if (!bellBtn.contains(e.target) && !notificationBox.contains(e.target)) {
        notificationBox.classList.add('d-none');
      }
    });
  }
window.data0 = data0;
window.data1 = data1;
window.data2 = data2;
  // TOAST DE BIENVENIDA
  const icon = document.getElementById('profileIcon');
  const toast = document.getElementById('loginSuccessToast');
  const shouldShow = localStorage.getItem('showLoginSuccess');
  if (icon && toast && shouldShow === 'true') {
    localStorage.removeItem('showLoginSuccess');
    setTimeout(() => {
      toast.classList.remove('d-none');
      toast.style.opacity = '1';
      const iconRect = icon.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      toast.style.position = 'absolute';
      toast.style.top = `${iconRect.bottom + scrollY + 8}px`;
      toast.style.left = `${iconRect.left + scrollX + iconRect.width / 2 - toast.offsetWidth / 2}px`;
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.classList.add('d-none'), 300);
      }, 3500);
    }, 100);
  }

  // Buscador predictivo de moocs
  const todosLosMoocs = [...data0, ...data1, ...data2];
  const buscador = document.getElementById('buscadorMoocs');
  const resultados = document.getElementById('resultadosBusqueda');
  const sugeridoSpan = document.getElementById('autocompleteSugerido');

  let currentIndex = -1;
  let sugerenciasActuales = [];

  if (buscador && resultados && sugeridoSpan) {
    buscador.addEventListener('input', function() {
      const texto = buscador.value;
      const textoLower = texto.trim().toLowerCase();
      resultados.innerHTML = '';
      currentIndex = -1;

      if (textoLower.length === 0) {
        resultados.style.display = 'none';
        sugerenciasActuales = [];
        sugeridoSpan.textContent = '';
        return;
      }

      const encontrados = todosLosMoocs.filter(mooc =>
        mooc.titulo.toLowerCase().includes(textoLower) ||
        mooc.categoria.toLowerCase().includes(textoLower) ||
        mooc.descripcion.toLowerCase().includes(textoLower)
      );

      // Evita duplicados por título
      const encontradosUnicos = [];
      const titulosVistos = new Set();
      encontrados.forEach(mooc => {
        if (!titulosVistos.has(mooc.titulo)) {
          encontradosUnicos.push(mooc);
          titulosVistos.add(mooc.titulo);
        }
      });

      sugerenciasActuales = encontradosUnicos;

      if (encontradosUnicos.length === 0) {
        resultados.style.display = 'none';
        sugeridoSpan.textContent = '';
        return;
      }

      resultados.style.display = 'block';
      encontradosUnicos.forEach((mooc, i) => {
        const enlace = document.createElement('a');
        enlace.href = mooc.link;
        enlace.className = 'list-group-item list-group-item-action d-flex align-items-center gap-2 py-2 px-3 small';
        enlace.tabIndex = -1;

        // Imagen a la izquierda
        const img = document.createElement('img');
        img.src = mooc.img;
        img.alt = mooc.titulo;
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '6px';

        // Texto a la derecha
        const textoSpan = document.createElement('span');
        textoSpan.textContent = `${mooc.titulo} (${mooc.categoria})`;

        enlace.appendChild(img);
        enlace.appendChild(textoSpan);

        enlace.addEventListener('mousedown', function(e) {
          buscador.value = mooc.titulo;
          sugeridoSpan.textContent = '';
          resultados.style.display = 'none';
          window.location.href = mooc.link;
        });
        resultados.appendChild(enlace);
      });

      // Mostrar sugerencia visual en gris (autocomplete tipo YouTube)
      if (encontradosUnicos.length > 0 && texto.length > 0) {
        const sugerido = encontradosUnicos[0].titulo;
        if (sugerido.toLowerCase().startsWith(textoLower) && sugerido.length > texto.length) {
          sugeridoSpan.innerHTML = `<span style="color:inherit;">${texto}</span><span style="color:#bbb;">${sugerido.slice(texto.length)}</span>`;
        } else {
          sugeridoSpan.textContent = '';
        }
      } else {
        sugeridoSpan.textContent = '';
      }
    });

    // Cuando el input pierde foco, borra la sugerencia visual
    buscador.addEventListener('blur', function() {
      sugeridoSpan.textContent = '';
    });

    // Navegación con flechas, tab y enter
    buscador.addEventListener('keydown', function(e) {
      const items = resultados.querySelectorAll('.list-group-item');
      if (!items.length || resultados.style.display === 'none') return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % items.length;
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        items[currentIndex].focus();
        buscador.value = sugerenciasActuales[currentIndex].titulo;
        sugeridoSpan.textContent = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        items[currentIndex].focus();
        buscador.value = sugerenciasActuales[currentIndex].titulo;
        sugeridoSpan.textContent = '';
      } else if (e.key === 'Tab') {
        if (currentIndex >= 0 && items[currentIndex]) {
          e.preventDefault();
          buscador.value = sugerenciasActuales[currentIndex].titulo;
          sugeridoSpan.textContent = '';
          resultados.style.display = 'none';
        } else if (sugerenciasActuales.length > 0) {
          e.preventDefault();
          buscador.value = sugerenciasActuales[0].titulo;
          sugeridoSpan.textContent = '';
          resultados.style.display = 'none';
        }
      } else if (e.key === 'Enter') {
        if (currentIndex >= 0 && items[currentIndex]) {
          window.location.href = sugerenciasActuales[currentIndex].link;
        }
      }
    });

    // Deshabilita Enter si no hay selección
    buscador.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && currentIndex === -1) {
        e.preventDefault();
        return false;
      }
    });

    // Oculta los resultados si se hace clic fuera
    document.addEventListener('click', (e) => {
      if (!buscador.contains(e.target) && !resultados.contains(e.target)) {
        resultados.style.display = 'none';
        currentIndex = -1;
      }
    });
  }

  const btnBuscar = document.getElementById('btnBuscarMooc');
  if (btnBuscar && buscador && resultados) {
    btnBuscar.addEventListener('click', function() {
      const texto = buscador.value.trim().toLowerCase();
      if (!texto) return;

      // Busca los moocs igual que el input
      const encontrados = todosLosMoocs.filter(mooc =>
        mooc.titulo.toLowerCase().includes(texto) ||
        mooc.categoria.toLowerCase().includes(texto) ||
        mooc.descripcion.toLowerCase().includes(texto)
      );

      // Si hay resultados, navega al primero
      if (encontrados.length > 0) {
        window.location.href = encontrados[0].link;
      } else {
        // Opcional: muestra los resultados aunque no navegue
        resultados.innerHTML = '<div class="list-group-item">No se encontraron resultados</div>';
        resultados.style.display = 'block';
      }
    });
  }

  const clearBtn = document.getElementById('clearSearch');
  if (clearBtn && buscador) {
    buscador.addEventListener('input', () => {
      clearBtn.style.display = buscador.value ? 'block' : 'none';
    });
    clearBtn.addEventListener('click', () => {
      buscador.value = '';
      buscador.focus();
      sugeridoSpan.textContent = '';
      resultados.innerHTML = '';
      resultados.style.display = 'none';
      clearBtn.style.display = 'none';
    });
  }

  // Efecto de subrayado en el buscador
  const wrapper = document.getElementById('buscadorMoocs-wrapper');

  if (buscador && wrapper) {
    buscador.addEventListener('focus', () => {
      wrapper.classList.add('underline-active');
    });
    buscador.addEventListener('blur', () => {
      wrapper.classList.remove('underline-active');
    });
  }
}).catch(err => console.error(err));

// Cards
async function cargarCards(data, contenedorId) {
  const response = await fetch('card.html');
  const plantilla = await response.text();
  const contenedor = document.getElementById(contenedorId);

  contenedor.innerHTML = ""; // Limpia antes de agregar nuevas cards

  data.forEach(card => {
    let nuevaCard = plantilla
      .replace('[[CATEGORIA]]', card.categoria)
      .replace('[[TITULO]]', card.titulo)
      .replace('[[DURACION]]', card.duracion)
      .replace('[[DESCRIPCION]]', card.descripcion)
      .replace('[[LINK]]', card.link)
      .replace('[[IMG]]', card.img);

    contenedor.innerHTML += nuevaCard;
  });

  // Asigna el evento del buscador cada vez que se cargan las cards
  const buscador = document.getElementById('buscadorMoocs');
  
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cards-1')) {
    cargarCards(data1, 'cards-1');
  }
  if (document.getElementById('cards-4')) {
    cargarCards(data2, 'cards-4');
  }
  if (document.getElementById('cards-0')) {
    cargarCards(data0, 'cards-0');
  }
});

// Lista de IDs de los módulos
const modulos = [
  "modulo1",
  "modulo2",
  "modulo3",
  "modulo4",
  "modulo5",
  "modulo6",
  "modulo7",
  "extras"
];

// Función para actualizar progreso y guardar en localStorage
function actualizarProgreso(moduloId, porcentaje) {
  const usuarioLogueado = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');
  const btnInscribirse = document.getElementById('btnInscribirse');
  const inscrito = btnInscribirse && btnInscribirse.classList.contains('btn-inscrito');

  if (!usuarioLogueado) {
    mostrarModalLogin();
    return;
  }
  if (!inscrito) {
    alert('Debes inscribirte antes de marcar como completado.');
    return;
  }

  localStorage.setItem(moduloId, porcentaje);
  const barra = document.getElementById(`progress-${moduloId}`);
  if (barra) barra.style.width = porcentaje + "%";
}


// Cargar progreso guardado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogueado = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');

  modulos.forEach(moduloId => {
    const barra = document.getElementById(`progress-${moduloId}`);
    if (!barra) return;

    if (usuarioLogueado) {
      const porcentaje = localStorage.getItem(moduloId);
      barra.style.width = porcentaje ? porcentaje + "%" : "0%";
    } else {
      barra.style.width = "0%";
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    // Verifica si el clic fue en el link con clase 'botondeperfil' o dentro de él
    const perfilBtn = e.target.closest('.botondeperfil');
    if (!perfilBtn) return; // si no, no hace nada

    e.preventDefault();

    const usuarioLogueado = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');
    if (usuarioLogueado) {
      window.location.href = 'profile.html';
    } else {
      // Guarda la página actual para volver después del login
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      window.location.href = 'login.html'; // <-- REDIRECCIÓN A LOGIN
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Limpiar sessionStorage y localStorage
      sessionStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInUser');

      // Opcional: si quieres limpiar todo storage (más agresivo)
      // sessionStorage.clear();
      // localStorage.clear();

      // Redirigir a login
      window.location.href = 'index.html';
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const emailSpan = document.getElementById('userEmail');
  const nameSpan = document.getElementById('userName');

  const email = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');

  if (email) {
    if (emailSpan) emailSpan.textContent = email;
    if (nameSpan) nameSpan.innerHTML = `${email} <i class="bi bi-pencil ms-2 text-success"></i>`;
  } else {
    if (emailSpan) emailSpan.textContent = 'Usuario no identificado';
    if (nameSpan) nameSpan.innerHTML = `Desconocido <i class="bi bi-pencil ms-2 text-success"></i>`;
  }
});

// Mostrar modal de login
function mostrarModalLogin() {
  let modalDiv = document.getElementById('modalLogin');
  if (!modalDiv) {
    modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
      <div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="modalLoginLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-success text-light rounded-4 shadow-lg">
          <div class="modal-header bg-success border-bottom-0 rounded-top-4 text-light">
            <h5 class="modal-title w-100 text-center fw-bold" id="modalLoginLabel">Iniciar sesión</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body px-4 pb-4">
            <form id="miniLoginForm" autocomplete="off" class="needs-validation" novalidate>
              <div class="mb-3">
                <label for="miniLoginEmail" class="form-label text-light fw-semibold">Correo electrónico</label>
                <input type="email" class="form-control" id="miniLoginEmail" placeholder="tu@correo.com" required>
                <div class="invalid-feedback">Por favor ingresa un correo válido.</div>
              </div>
              <div class="mb-3">
                <label for="miniLoginPass" class="form-label text-light fw-semibold">Contraseña</label>
                <input type="password" class="form-control" id="miniLoginPass" placeholder="Tu contraseña" required minlength="6">
                <div class="invalid-feedback">La contraseña debe tener al menos 6 caracteres.</div>
              </div>
              <div class="d-grid mb-2">
                <button type="submit" class="btn btn-outline-success-s text-light fw-semibold py-2 text-success mt-4">Iniciar sesión</button>
              </div>
              <div class="d-flex justify-content-between">
                <a href="#" id="openRegisterModal" class="text-decoration-none link-light fw-semibold small">Registrarse</a>
                <a href="#" class="text-decoration-none link-light fw-semibold small">¿Olvidaste tu contraseña?</a>
              </div>
            </form>
            <div id="miniLoginError" class="text-danger mt-2 d-none">Credenciales incorrectas</div>
            <div class="social-login d-flex justify-content-center align-items-center gap-4 mt-4 text-light fs-4">
              <button type="button" class="btn-social" aria-label="Iniciar sesión con Google">
                <i class="bi bi-google"></i>
              </button>
              <span aria-hidden="true" class="separator">|</span>
              <button type="button" class="btn-social" aria-label="Iniciar sesión con Facebook">
                <i class="bi bi-facebook"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.appendChild(modalDiv);
  }

  const modal = new bootstrap.Modal(document.getElementById('modalLogin'));
  modal.show();

  // Lógica de login
  const form = document.getElementById('miniLoginForm');
  const emailInput = document.getElementById('miniLoginEmail');
  const passwordInput = document.getElementById('miniLoginPass');
  const loginError = document.getElementById('miniLoginError');
  // Si tienes un checkbox para mantener sesión, ponle id="miniKeepSession" en el modal y descomenta la línea siguiente:
  // const keepSession = document.getElementById('miniKeepSession');

  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      loginError.classList.add("d-none");
      emailInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");

      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );
      const userByEmail = users.find(user => user.email === email);

      if (!userByEmail) {
        loginError.textContent = "El correo no está registrado.";
        loginError.classList.remove("d-none");
        emailInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-invalid");
        return;
      }
      if (password.length < 6) {
        loginError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        loginError.classList.remove("d-none");
        emailInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-invalid");
        return;
      }
      if (!matchedUser) {
        loginError.textContent = "La contraseña es incorrecta.";
        loginError.classList.remove("d-none");
        emailInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-invalid");
        return;
      }

      // Login correcto
      emailInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");
      loginError.classList.add("d-none");
      // Si tienes el checkbox de mantener sesión, usa esto:
      // const storage = keepSession && keepSession.checked ? localStorage : sessionStorage;
      // storage.setItem("loggedInUser", email);
      // Si no, solo usa localStorage:
      localStorage.setItem("loggedInUser", email);
      localStorage.setItem('showLoginSuccess', 'true');
      bootstrap.Modal.getInstance(document.getElementById('modalLogin')).hide();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    };
  }

  // Abrir modal de registro desde el link
  document.getElementById('openRegisterModal').onclick = function(e) {
    e.preventDefault();
    bootstrap.Modal.getInstance(document.getElementById('modalLogin')).hide();
    setTimeout(mostrarModalRegister, 350);
  };
}

// Mostrar modal de registro
function mostrarModalRegister() {
  let modalDiv = document.getElementById('modalRegister');
  if (!modalDiv) {
    modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
      <div class="modal fade" id="modalRegister" tabindex="-1" aria-labelledby="modalRegisterLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-success text-light rounded-4 shadow-lg">
            <div class="modal-header bg-success border-bottom-0 rounded-top-4 text-light">
              <h5 class="modal-title w-100 text-center fw-bold" id="modalRegisterLabel">Crear cuenta</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body px-4 pb-4">
              <form id="modalRegisterForm" autocomplete="off" class="needs-validation" novalidate>
                <div class="mb-3">
                  <label for="modalRegisterEmail" class="form-label text-light fw-semibold">Correo electrónico</label>
                  <input type="email" id="modalRegisterEmail" name="email" class="form-control" placeholder="tu@correo.com" required />
                  <div class="invalid-feedback">Por favor ingresa un correo válido.</div>
                </div>
                <div class="mb-3">
                  <label for="modalRegisterPassword" class="form-label text-light fw-semibold">Contraseña</label>
                  <input type="password" id="modalRegisterPassword" name="password" class="form-control" placeholder="Mínimo 8 caracteres" required />
                  <div id="modalRegisterPasswordError" class="text-warning mt-2" style="display:none;"></div>
                  <div class="invalid-feedback">La contraseña debe tener al menos 8 caracteres.</div>
                </div>
                <div class="mb-3">
                  <label for="modalRegisterConfirmPassword" class="form-label text-light fw-semibold">Confirmar contraseña</label>
                  <input type="password" id="modalRegisterConfirmPassword" name="confirmPassword" class="form-control" placeholder="Repite la contraseña" required />
                  <div class="invalid-feedback">Las contraseñas no coinciden.</div>
                </div>
                <div id="modalRegisterError" class="text-warning mt-2" style="display:none;"></div>
                <div class="d-grid mb-2">
                  <button type="submit" class="btn btn-outline-success-s text-light fw-semibold py-2 text-success mt-4">Registrarse</button>
                </div>
              </form>
              <div class="social-login d-flex justify-content-center align-items-center gap-4 mt-4 text-light fs-4">
                <button type="button" class="btn-social" aria-label="Registrarse con Google">
                  <i class="bi bi-google"></i>
                </button>
                <span aria-hidden="true" class="separator">|</span>
                <button type="button" class="btn-social" aria-label="Registrarse con Facebook">
                  <i class="bi bi-facebook"></i>
                </button>
              </div>
              <div class="d-flex justify-content-center mt-4">
                <a href="#" class="text-decoration-none link-light fw-semibold" id="openLoginModal">¿Ya tienes cuenta? Inicia sesión</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }

  const modal = new bootstrap.Modal(document.getElementById('modalRegister'));
  modal.show();

  // Lógica de registro
  const form = document.getElementById('modalRegisterForm');
  const emailInput = document.getElementById('modalRegisterEmail');
  const passwordInput = document.getElementById('modalRegisterPassword');
  const confirmPasswordInput = document.getElementById('modalRegisterConfirmPassword');
  const registerError = document.getElementById('modalRegisterError');
  const passwordError = document.getElementById('modalRegisterPasswordError');

  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      registerError.style.display = "none";
      passwordError.style.display = "none";
      emailInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");
      confirmPasswordInput.classList.remove("is-invalid");

      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some(user => user.email === email);

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        registerError.textContent = "Por favor ingresa un correo válido.";
        registerError.style.display = "block";
        emailInput.classList.add("is-invalid");
        return;
      }
      if (userExists) {
        registerError.textContent = "Este correo ya está registrado. Por favor inicia sesión.";
        registerError.style.display = "block";
        emailInput.classList.add("is-invalid");
        return;
      }
      if (password.length < 8) {
        passwordError.textContent = "La contraseña debe tener al menos 8 caracteres.";
        passwordError.style.display = "block";
        passwordInput.classList.add("is-invalid");
        return;
      }
      if (password !== confirmPassword) {
        passwordError.textContent = "Las contraseñas no coinciden.";
        passwordError.style.display = "block";
        passwordInput.classList.add("is-invalid");
        confirmPasswordInput.classList.add("is-invalid");
        return;
      }

      // Registro correcto
      const newUser = { email, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      form.reset();
      registerError.style.display = "none";
      passwordError.style.display = "none";
      modal.hide();
      setTimeout(() => {
        mostrarModalLogin();
      }, 350);
    };
  }

  // Abrir modal de login desde el link
  document.getElementById('openLoginModal').onclick = function(e) {
    e.preventDefault();
    bootstrap.Modal.getInstance(document.getElementById('modalRegister')).hide();
    setTimeout(mostrarModalLogin, 350);
  };
}
document.addEventListener('DOMContentLoaded', () => {
  const btnInscribirse = document.getElementById('btnInscribirse');
  if (!btnInscribirse) return; // Solo ejecuta en la página de inscripción

  const textoInscribirse = document.getElementById('textoInscribirse');
  const chulitoInscrito = document.getElementById('chulitoInscrito');
  const barra = document.getElementById('barraProgresoInscripcion');
  const moocId = btnInscribirse.getAttribute('data-mooc-id') || 'modulo1';

  function marcarComoInscrito() {
    if (barra) barra.style.width = '100%';
    btnInscribirse.classList.add('btn-inscrito');
    if (textoInscribirse) textoInscribirse.textContent = "Inscrito";
    if (chulitoInscrito) chulitoInscrito.classList.remove('d-none');
    btnInscribirse.disabled = true;
  }

  function estaInscrito() {
    const usuarioLogueado = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');
    if (!usuarioLogueado) return false;
    const inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || {};
    return inscripciones[usuarioLogueado] && inscripciones[usuarioLogueado][moocId];
  }

  // Al cargar, revisa si ya está inscrito
  if (estaInscrito()) {
    marcarComoInscrito();
  }

  // Al hacer click en inscribirse
  btnInscribirse.addEventListener('click', function (e) {
    const usuarioLogueado = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');
    if (!usuarioLogueado) {
      if (barra) setTimeout(() => { barra.style.width = '0%'; }, 700);
      e.preventDefault();
      mostrarModalLogin();
      return false;
    }

    if (barra) barra.style.width = '100%';
    btnInscribirse.classList.add('btn-animando');
    setTimeout(() => { btnInscribirse.classList.remove('btn-animando'); }, 700);

    // Guarda la inscripción correctamente
    let inscripciones = JSON.parse(localStorage.getItem('inscripciones')) || {};
    if (!inscripciones[usuarioLogueado]) inscripciones[usuarioLogueado] = {};
    inscripciones[usuarioLogueado][moocId] = true;
    localStorage.setItem('inscripciones', JSON.stringify(inscripciones));

    marcarComoInscrito();
  });
});
document.addEventListener('click', function(e) {
  const link = e.target.closest('#misMoocsLink');
  if (link) {
    const usuarioLogueado = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');
    if (!usuarioLogueado) {
      e.preventDefault();
      mostrarModalLogin();
      return false;
    }
    // Si está logueado, deja que el enlace funcione normalmente
  }
});
