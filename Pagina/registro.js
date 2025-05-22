(() => {
  'use strict';

  const form = document.getElementById('registerForm');

  form.addEventListener('submit', event => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validaciones del formulario
    if (!form.checkValidity() || password !== confirmPassword) {
      event.preventDefault();
      event.stopPropagation();

      if (password !== confirmPassword) {
        document.getElementById('confirmPassword').setCustomValidity("Las contraseñas no coinciden");
      } else {
        document.getElementById('confirmPassword').setCustomValidity("");
      }

      form.classList.add('was-validated');
      return;
    }

    // Validación pasada: evitar recarga
    event.preventDefault();

    // Guardar en LocalStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Verifica si el email ya está registrado
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      alert("Este correo ya está registrado. Por favor inicia sesión.");
      return;
    }

    // Agregar nuevo usuario
    const newUser = { email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Limpiar formulario y mostrar mensaje
    form.reset();
    form.classList.remove('was-validated');
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  });
})();
