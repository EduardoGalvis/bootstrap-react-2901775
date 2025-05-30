(() => {
  'use strict';

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerError = document.getElementById('registerError');
    const passwordError = document.getElementById('passwordError');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Limpiar estados previos
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

      // Validación de correo
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

      // Validación de contraseña
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

      // Si todo está bien, registrar usuario
      const newUser = { email, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      form.reset();
      registerError.style.display = "none";
      passwordError.style.display = "none";
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      window.location.href = "login.html";
    });

    // Limpia el error al escribir
    emailInput.addEventListener("input", () => {
      emailInput.classList.remove("is-invalid");
      registerError.style.display = "none";
    });
    passwordInput.addEventListener("input", () => {
      passwordInput.classList.remove("is-invalid");
      passwordError.style.display = "none";
      confirmPasswordInput.classList.remove("is-invalid");
    });
    confirmPasswordInput.addEventListener("input", () => {
      confirmPasswordInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");
      passwordError.style.display = "none";
    });
  });
})();
