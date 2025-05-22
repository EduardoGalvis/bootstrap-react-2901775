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
  // Ya cargó el navbar y el footer, ahora sí podemos acceder a sus elementos
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
  } else {
    console.warn("Elementos de la campana no encontrados");
  }
}).catch(err => console.error(err));


// Cards
async function cargarCards(data, contenedorId) {
  const response = await fetch('card.html');
  const plantilla = await response.text();
  const contenedor = document.getElementById(contenedorId);

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
}

document.addEventListener('DOMContentLoaded', () => {
  const data1 = [
    {
      categoria: 'Diseño',
      titulo: 'Photoshop 2024',
      duracion: '2 Meses',
      descripcion: 'Manipula y edita imágenes a nivel profesional con Photoshop. Aprenderás hasta el último detalle para sacar provecho a tus fotografías',
      link: 'intromooc.html',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png'
    },
    {
      categoria: 'Diseño',
      titulo: 'Premiere Pro 2024',
      duracion: '3 Meses',
      descripcion: 'Edita de manera optima y con resultados increíbles en tu proyectos y videos',
      link: 'intromooc.html',
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg'
    }
  ];
  const data2 = [
    {
      categoria: 'Diseño',
      titulo: 'Diseño de empaques',
      duracion: '2 Meses',
      descripcion: 'Persuade a los clientes con los diseños de tus empaques, sé profesional y resalta los valores de tu marca',
      link: 'intromooc.html',
      img: 'Images/img-uno.jpeg'
    },
    {
      categoria: 'Diseño',
      titulo: 'Premiere Pro 2024',
      duracion: '3 Meses',
      descripcion: 'Edita de manera optima y con resultados increíbles en tu proyectos y videos',
      link: 'intromooc.html',
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg'
    },
    {
      categoria: 'Diseño',
      titulo: 'Photoshop 2024',
      duracion: '2 Meses',
      descripcion: 'Manipula y edita imágenes a nivel profesional con Photoshop. Aprenderás hasta el último detalle para sacar provecho a tus fotografías',
      link: 'intromooc.html',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png'
    },
    {
      categoria: 'Diseño',
      titulo: 'Premiere Pro 2024',
      duracion: '3 Meses',
      descripcion: 'Edita de manera optima y con resultados increíbles en tu proyectos y videos',
      link: 'intromooc.html',
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg'
    }
  ];

  if (document.getElementById('cards-1')) {
    cargarCards(data1, 'cards-1');
  }
  if (document.getElementById('cards-4')) {
    cargarCards(data2, 'cards-4');
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
  if (!usuarioLogueado) {
    if (!usuarioLogueado) {
  window.location.href = 'login.html';
  return;
}

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
      window.location.href = 'login.html';
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
Promise.all([
  includeHTML("navbar", "navbar.html"),
  includeHTML("footer", "footer.html")
]).then(() => {
  // Código de la campana
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
  } else {
    console.warn("Elementos de la campana no encontrados");
  }

  // Mostrar TOAST luego de cargar navbar
  const icon = document.getElementById('profileIcon');
  const toast = document.getElementById('loginSuccessToast');

  const storage = localStorage.getItem('showLoginSuccess') ? localStorage : sessionStorage;
  const shouldShow = storage.getItem('showLoginSuccess');

  if (icon && toast && shouldShow === 'true') {
    storage.removeItem('showLoginSuccess');

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
  } else {
    console.log('No se muestra toast porque falta icon, toast o showLoginSuccess no es true');
  }

}).catch(err => console.error(err));

Promise.all([
  includeHTML("navbar", "navbar.html"),
  includeHTML("footer", "footer.html")
]).then(() => {
  // Asumiendo que el enlace de "Mis MOOCS" tiene id="misMoocsLink"
const misMoocsLink = document.getElementById('misMoocsLink');

if (misMoocsLink) {
  misMoocsLink.addEventListener('click', (e) => {
    const usuarioLogueado = sessionStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser');
    if (!usuarioLogueado) {
      e.preventDefault();
      window.location.href = 'moocs.html';
    }
  });
}
});
